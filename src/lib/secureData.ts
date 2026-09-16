// Encryption for the personal things people keep in GuideHand: photographs of
// passports and IDs, a medicine list, and where a family agreed to meet.
//
// How it works, in order:
//
//   1. The first time the app runs, it makes one random 256-bit key.
//   2. That key is put in expo-secure-store, which is the iOS Keychain and the
//      Android Keystore — storage the operating system protects with hardware,
//      separate from ordinary app data.
//   3. Everything sensitive is encrypted with that key using AES-256-GCM before
//      it is written. GCM also authenticates: altered ciphertext fails to
//      decrypt rather than returning quietly wrong data.
//
// What this protects against: someone copying the app's data off the phone,
// pulling it out of a device backup, or reading it from a stolen unlocked
// device's filesystem. Without the key from the Keychain it is noise.
//
// What it does not protect against on its own: a person holding the unlocked
// phone who simply opens GuideHand. That is what the separate lock on the
// Document Photos screen is for.
//
// The cipher is @noble/ciphers — pure JavaScript, audited, no native build
// step. Randomness comes from expo-crypto, which uses the platform's secure
// generator rather than Math.random.

import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gcm } from '@noble/ciphers/aes.js';

const KEY_NAME = 'guidehand.data.key.v1';
const KEY_BYTES = 32; // AES-256
const NONCE_BYTES = 12; // Standard for GCM
const ENVELOPE_VERSION = 1;

/** What gets written to storage in place of the plain value. */
interface Envelope {
  v: number;
  alg: 'aes-256-gcm';
  n: string; // nonce, base64
  d: string; // ciphertext, base64
}

function isEnvelope(value: unknown): value is Envelope {
  if (typeof value !== 'object' || value === null) return false;
  const e = value as Record<string, unknown>;
  return e.alg === 'aes-256-gcm' && typeof e.n === 'string' && typeof e.d === 'string';
}

// --- base64 helpers -------------------------------------------------------
// React Native has global atob/btoa, but they are byte-oriented, so binary has
// to go through latin1 rather than being handed over as text.

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  const CHUNK = 0x8000; // Avoids blowing the argument limit on large photos.
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

function utf8ToBytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function bytesToUtf8(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

// --- key management -------------------------------------------------------

let cachedKey: Uint8Array | undefined;

/**
 * The device's data key, made once and kept in the OS keychain from then on.
 * Never leaves the device and is never written into ordinary app storage.
 */
async function getOrCreateKey(): Promise<Uint8Array> {
  if (cachedKey) return cachedKey;

  const existing = await SecureStore.getItemAsync(KEY_NAME);
  if (existing) {
    cachedKey = base64ToBytes(existing);
    return cachedKey;
  }

  const fresh = Crypto.getRandomBytes(KEY_BYTES);
  await SecureStore.setItemAsync(KEY_NAME, bytesToBase64(fresh), {
    // The key is only needed while someone is actually using the phone, and
    // this keeps it out of iCloud Keychain and off other devices.
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
  cachedKey = fresh;
  return cachedKey;
}

/** True when this device is able to encrypt — false on web, where there's no keychain. */
export async function isEncryptionAvailable(): Promise<boolean> {
  try {
    return await SecureStore.isAvailableAsync();
  } catch {
    return false;
  }
}

// --- encrypt / decrypt ----------------------------------------------------

export async function encryptString(plaintext: string): Promise<string> {
  const key = await getOrCreateKey();
  const nonce = Crypto.getRandomBytes(NONCE_BYTES);
  const ciphertext = gcm(key, nonce).encrypt(utf8ToBytes(plaintext));
  const envelope: Envelope = {
    v: ENVELOPE_VERSION,
    alg: 'aes-256-gcm',
    n: bytesToBase64(nonce),
    d: bytesToBase64(ciphertext),
  };
  return JSON.stringify(envelope);
}

/**
 * Decrypts a stored value. Anything that isn't an envelope is returned as-is:
 * that is how data saved before this feature existed keeps working, and it gets
 * re-written encrypted the next time it changes.
 */
export async function decryptString(stored: string): Promise<string> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch {
    return stored; // Not JSON at all — leave it alone.
  }
  if (!isEnvelope(parsed)) return stored;

  const key = await getOrCreateKey();
  const plain = gcm(key, base64ToBytes(parsed.n)).decrypt(base64ToBytes(parsed.d));
  return bytesToUtf8(plain);
}

// --- the storage calls screens actually use -------------------------------

/**
 * Reads and decrypts a value. Returns undefined when nothing is stored, and
 * also when the stored value cannot be decrypted — a corrupted or tampered
 * record reads as absent rather than throwing into a render.
 */
export async function secureGetItem(key: string): Promise<string | undefined> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return undefined;
    return await decryptString(raw);
  } catch {
    return undefined;
  }
}

/** Encrypts and stores a value. Falls back to plain storage only where encryption isn't possible. */
export async function secureSetItem(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, await encryptString(value));
  } catch {
    // Better to keep someone's medicine list than to lose it because the
    // keychain was unavailable. Web dev builds take this path.
    await AsyncStorage.setItem(key, value);
  }
}

export async function secureRemoveItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

/**
 * Re-writes any of these keys that are still stored in the clear. Run once at
 * startup so data saved before this feature existed doesn't sit unencrypted
 * until the person happens to edit it.
 */
export async function encryptLegacyData(keys: string[]): Promise<number> {
  if (!(await isEncryptionAvailable())) return 0;
  let converted = 0;
  for (const key of keys) {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (raw === null) continue;
      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        continue;
      }
      if (isEnvelope(parsed)) continue; // Already done.
      await AsyncStorage.setItem(key, await encryptString(raw));
      converted += 1;
    } catch {
      // Leave that key as it was and carry on with the others.
    }
  }
  return converted;
}
