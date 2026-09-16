// Backing up everything a person has put into GuideHand, into one file they
// keep themselves.
//
// No account, no server, nothing of ours in the middle. The file goes wherever
// they want it — emailed to themselves, dropped on a USB stick, kept in a
// folder. Their medicine list and passport photographs never touch anyone
// else's computer, which is the whole reason the app stores them locally to
// begin with.
//
// A backup that includes document photographs is protected with a password of
// their choosing, because that file will end up somewhere less careful than the
// phone — an inbox, a cloud drive. A backup without photographs holds a supply
// checklist, a medicine list and a map coordinate, so it is written in the
// clear and needs no password to read back later.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { gcm } from '@noble/ciphers/aes.js';
import { pbkdf2Async } from '@noble/hashes/pbkdf2.js';
import { sha256 } from '@noble/hashes/sha2.js';
import * as Crypto from 'expo-crypto';

import { BACKUP_SECTIONS, DOCUMENT_PHOTOS_KEY } from '@/lib/personalData';
import { secureGetItem, secureSetItem } from '@/lib/secureData';

export const BACKUP_FORMAT = 'guidehand-backup';
export const BACKUP_VERSION = 1;

// High enough to make guessing a weak password expensive, low enough that a
// backup on an older phone still finishes in a couple of seconds.
const KDF_ITERATIONS = 200_000;
const SALT_BYTES = 16;
const NONCE_BYTES = 12;
const KEY_BYTES = 32;

/** The plain contents of a backup: each storage key mapped to its JSON text. */
export type BackupPayload = Record<string, string>;

export interface BackupFile {
  format: typeof BACKUP_FORMAT;
  version: number;
  createdAt: string;
  includesDocuments: boolean;
  encrypted: boolean;
  /** Present only when encrypted. */
  kdf?: { name: 'pbkdf2-sha256'; iterations: number; salt: string };
  nonce?: string;
  /** Ciphertext when encrypted, the payload itself when not. */
  data: string | BackupPayload;
}

// --- small helpers --------------------------------------------------------

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return globalThis.btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = globalThis.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function deriveKey(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  return pbkdf2Async(sha256, new TextEncoder().encode(password), salt, {
    c: iterations,
    dkLen: KEY_BYTES,
  });
}

// --- creating a backup ----------------------------------------------------

/** Reads everything out of storage, decrypted, ready to be written to a file. */
export async function collectBackupPayload(includeDocuments: boolean): Promise<BackupPayload> {
  const payload: BackupPayload = {};
  for (const section of BACKUP_SECTIONS) {
    if (!includeDocuments && section.key === DOCUMENT_PHOTOS_KEY) continue;
    const value = await secureGetItem(section.key);
    if (value !== undefined) payload[section.key] = value;
  }
  return payload;
}

export interface BuildBackupOptions {
  includeDocuments: boolean;
  /** Required when documents are included; ignored otherwise. */
  password?: string;
}

export type BuildBackupResult =
  | { ok: true; text: string; bytes: number; sections: number }
  | { ok: false; reason: string };

/**
 * Builds the backup file's text. Including document photographs requires a
 * password — refusing rather than silently writing passports into a plain file
 * is the point.
 */
export async function buildBackup(options: BuildBackupOptions): Promise<BuildBackupResult> {
  const { includeDocuments, password } = options;

  if (includeDocuments && (!password || password.length < 8)) {
    return { ok: false, reason: 'A backup with document photos needs a password of at least 8 characters.' };
  }

  const payload = await collectBackupPayload(includeDocuments);
  if (Object.keys(payload).length === 0) {
    return { ok: false, reason: "There's nothing saved in GuideHand yet, so there is nothing to back up." };
  }

  let file: BackupFile;

  if (includeDocuments && password) {
    const salt = Crypto.getRandomBytes(SALT_BYTES);
    const nonce = Crypto.getRandomBytes(NONCE_BYTES);
    const key = await deriveKey(password, salt, KDF_ITERATIONS);
    const plaintext = new TextEncoder().encode(JSON.stringify(payload));
    const ciphertext = gcm(key, nonce).encrypt(plaintext);
    file = {
      format: BACKUP_FORMAT,
      version: BACKUP_VERSION,
      createdAt: new Date().toISOString(),
      includesDocuments: true,
      encrypted: true,
      kdf: { name: 'pbkdf2-sha256', iterations: KDF_ITERATIONS, salt: bytesToBase64(salt) },
      nonce: bytesToBase64(nonce),
      data: bytesToBase64(ciphertext),
    };
  } else {
    file = {
      format: BACKUP_FORMAT,
      version: BACKUP_VERSION,
      createdAt: new Date().toISOString(),
      includesDocuments: false,
      encrypted: false,
      data: payload,
    };
  }

  const text = JSON.stringify(file, null, 2);
  return {
    ok: true,
    text,
    bytes: new TextEncoder().encode(text).length,
    sections: Object.keys(payload).length,
  };
}

/** A filename with the date in it, so a folder of backups sorts and reads sensibly. */
export function backupFileName(date: Date = new Date()): string {
  const stamp = date.toISOString().slice(0, 10);
  return `guidehand-backup-${stamp}.json`;
}

// --- reading a backup back in ---------------------------------------------

export interface BackupInfo {
  createdAt: string;
  encrypted: boolean;
  includesDocuments: boolean;
  version: number;
}

export type InspectResult =
  | { ok: true; info: BackupInfo; file: BackupFile }
  | { ok: false; reason: string };

/**
 * Checks a file is a GuideHand backup and reports what's in it, without
 * restoring anything — so the person can be told what they're about to
 * overwrite before it happens.
 */
export function inspectBackup(text: string): InspectResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, reason: "That file isn't readable. Make sure you picked a GuideHand backup file." };
  }
  if (typeof parsed !== 'object' || parsed === null) {
    return { ok: false, reason: "That file isn't a GuideHand backup." };
  }

  const f = parsed as Record<string, unknown>;
  if (f.format !== BACKUP_FORMAT) {
    return { ok: false, reason: "That file isn't a GuideHand backup." };
  }
  if (typeof f.version !== 'number' || f.version > BACKUP_VERSION) {
    return {
      ok: false,
      reason: 'That backup was made by a newer version of GuideHand. Update the app and try again.',
    };
  }
  if (f.data === undefined || f.data === null) {
    return { ok: false, reason: 'That backup file is empty or incomplete.' };
  }

  return {
    ok: true,
    file: parsed as BackupFile,
    info: {
      createdAt: typeof f.createdAt === 'string' ? f.createdAt : 'unknown',
      encrypted: f.encrypted === true,
      includesDocuments: f.includesDocuments === true,
      version: f.version,
    },
  };
}

export type RestoreResult =
  | { ok: true; restored: string[] }
  | { ok: false; reason: string; wrongPassword?: boolean };

/**
 * Writes a backup's contents back into storage, re-encrypted for this device.
 * Nothing is written until the whole file has been read and decrypted, so a
 * wrong password or a damaged file leaves what's already on the phone alone.
 */
export async function restoreBackup(file: BackupFile, password?: string): Promise<RestoreResult> {
  let payload: BackupPayload;

  if (file.encrypted) {
    if (!password) return { ok: false, reason: 'This backup needs its password.', wrongPassword: true };
    if (!file.kdf || !file.nonce || typeof file.data !== 'string') {
      return { ok: false, reason: 'That backup file is damaged and cannot be read.' };
    }
    try {
      const key = await deriveKey(password, base64ToBytes(file.kdf.salt), file.kdf.iterations);
      const plain = gcm(key, base64ToBytes(file.nonce)).decrypt(base64ToBytes(file.data));
      payload = JSON.parse(new TextDecoder().decode(plain));
    } catch {
      // GCM refuses to decrypt with the wrong key, which is what a wrong
      // password produces — so this is almost always a typo, not a broken file.
      return {
        ok: false,
        reason: "That password didn't open the backup. Nothing on your phone was changed.",
        wrongPassword: true,
      };
    }
  } else {
    if (typeof file.data !== 'object' || file.data === null) {
      return { ok: false, reason: 'That backup file is damaged and cannot be read.' };
    }
    payload = file.data as BackupPayload;
  }

  const entries = Object.entries(payload).filter(([, v]) => typeof v === 'string');
  if (entries.length === 0) {
    return { ok: false, reason: 'That backup has nothing in it to restore.' };
  }

  const restored: string[] = [];
  for (const [key, value] of entries) {
    await secureSetItem(key, value);
    const label = BACKUP_SECTIONS.find((s) => s.key === key)?.label ?? key;
    restored.push(label);
  }
  return { ok: true, restored };
}

/** What's currently on the phone, for showing before a restore replaces it. */
export async function summarizeCurrentData(): Promise<{ label: string; count: number }[]> {
  const summary: { label: string; count: number }[] = [];
  for (const section of BACKUP_SECTIONS) {
    if (section.key === 'guidehand.family-meetup.active.v1') continue; // Bookkeeping, not content.
    try {
      const raw = await secureGetItem(section.key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      const count = Array.isArray(parsed) ? parsed.length : Object.keys(parsed ?? {}).length;
      if (count > 0) summary.push({ label: section.label, count });
    } catch {
      // A section we can't read is one we can't summarize; leave it out.
    }
  }
  return summary;
}

/** Clears every personal section. Used only behind an explicit confirmation. */
export async function clearAllPersonalData(): Promise<void> {
  await AsyncStorage.multiRemove(BACKUP_SECTIONS.map((s) => s.key));
}
