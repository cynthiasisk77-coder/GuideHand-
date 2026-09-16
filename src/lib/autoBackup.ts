// Backups that happen on their own.
//
// A backup you have to remember to press is a backup that does not happen. The
// phone goes in a lake eight months later and the one file was made in March.
// So the app keeps its own rolling history without being asked, and it tells
// the person out loud when their off-device copy has gone stale.
//
// Two different jobs, because they protect against two different disasters:
//
//   Snapshots, here, are automatic and local. They cover the common disaster —
//   a delete that was meant to be a rename, a bad edit, a screen that dropped
//   a list. Instant, free, no thought required. They do NOT survive the phone.
//
//   The exported file covers the real disaster: the phone is gone. That one
//   has to leave the device, so it needs a person to decide where it goes.
//   What this module can do is stop that decision from being made once and
//   forgotten — it tracks the age of the last export so the app can say so.

import AsyncStorage from '@react-native-async-storage/async-storage';

import { BACKUP_SECTIONS } from '@/lib/personalData';
import { decryptString, secureGetItem, secureSetItem } from '@/lib/secureData';

const SNAPSHOT_INDEX_KEY = 'guidehand.snapshots.index.v1';
const SNAPSHOT_PREFIX = 'guidehand.snapshot.';
const LAST_EXPORT_KEY = 'guidehand.backup.lastExport.v1';

/** How many automatic snapshots to keep. Enough to walk back past a bad day. */
export const MAX_SNAPSHOTS = 12;

/** Don't write a new snapshot more often than this — editing a list shouldn't spam them. */
const MIN_SNAPSHOT_GAP_MS = 5 * 60 * 1000;

export interface SnapshotMeta {
  id: string;
  takenAt: number;
  /** What changed to cause it, for showing a recognisable list. */
  trigger: string;
  /** Rough size, so a person can see what they are holding. */
  bytes: number;
  /** Section label to item count, e.g. { Medicines: 4 }. */
  contents: Record<string, number>;
}

function snapshotId(at: number): string {
  return `${SNAPSHOT_PREFIX}${at}`;
}

export async function getSnapshots(): Promise<SnapshotMeta[]> {
  try {
    const raw = await AsyncStorage.getItem(SNAPSHOT_INDEX_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeSnapshotIndex(list: SnapshotMeta[]): Promise<void> {
  await AsyncStorage.setItem(SNAPSHOT_INDEX_KEY, JSON.stringify(list));
}

function countItems(json: string): number {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) return parsed.length;
    if (parsed && typeof parsed === 'object') return Object.keys(parsed).length;
    return 0;
  } catch {
    return 0;
  }
}

/**
 * Takes a snapshot of everything personal, if enough has changed and enough
 * time has passed. Safe to call on every save — it decides for itself whether
 * there is anything worth keeping.
 */
export async function maybeSnapshot(trigger: string, now: number): Promise<SnapshotMeta | undefined> {
  const existing = await getSnapshots();
  const newest = existing[0];

  if (newest && now - newest.takenAt < MIN_SNAPSHOT_GAP_MS) return undefined;

  const payload: Record<string, string> = {};
  const contents: Record<string, number> = {};
  for (const section of BACKUP_SECTIONS) {
    const value = await secureGetItem(section.key);
    if (value === undefined) continue;
    payload[section.key] = value;
    const count = countItems(value);
    if (count > 0) contents[section.label] = count;
  }

  if (Object.keys(payload).length === 0) return undefined;

  // A snapshot of nothing protects nothing. Screens write an empty list back
  // as they mount, and without this that worthless copy becomes the newest
  // snapshot — and then the rate limit below suppresses the real one that
  // follows seconds later, when the person actually enters something.
  if (Object.keys(contents).length === 0) return undefined;

  const body = JSON.stringify(payload);

  // Nothing actually changed since the last one — don't fill the phone with
  // twelve identical copies of the same afternoon.
  if (newest) {
    const previous = await AsyncStorage.getItem(snapshotId(newest.takenAt));
    if (previous !== null) {
      try {
        if ((await secureGetItemRaw(previous)) === body) return undefined;
      } catch {
        // Unreadable previous snapshot; take a new one.
      }
    }
  }

  const meta: SnapshotMeta = {
    id: snapshotId(now),
    takenAt: now,
    trigger,
    bytes: body.length,
    contents,
  };

  await secureSetItem(meta.id, body);

  const next = [meta, ...existing].slice(0, MAX_SNAPSHOTS);
  const dropped = [meta, ...existing].slice(MAX_SNAPSHOTS);
  for (const old of dropped) {
    await AsyncStorage.removeItem(old.id).catch(() => {});
  }
  await writeSnapshotIndex(next);
  return meta;
}

// Snapshots go through the same encryption as everything else, so comparing
// against the previous one means decrypting it first.
async function secureGetItemRaw(stored: string): Promise<string> {
  return decryptString(stored);
}

/**
 * What screens call after saving. Fire and forget: it decides for itself
 * whether anything is worth keeping, and a failure here must never stop the
 * actual save from having worked.
 *
 * Call this from the .then() of the save, never beside it. This reads storage
 * to build the snapshot, so running it alongside an unfinished write captures
 * the value that is being replaced — a snapshot of the state you were trying
 * to preserve the app out of.
 */
export function notePersonalDataChanged(trigger: string): void {
  maybeSnapshot(trigger, Date.now()).catch(() => {});
}

export type SnapshotRestoreResult =
  | { ok: true; restored: string[] }
  | { ok: false; reason: string };

/** Puts a snapshot back. Reads everything before writing anything. */
export async function restoreSnapshot(id: string): Promise<SnapshotRestoreResult> {
  let payload: Record<string, string>;
  try {
    const body = await secureGetItem(id);
    if (!body) return { ok: false, reason: 'That saved copy is no longer on this phone.' };
    payload = JSON.parse(body);
  } catch {
    return { ok: false, reason: 'That saved copy could not be read. Nothing was changed.' };
  }

  const entries = Object.entries(payload).filter(([, v]) => typeof v === 'string');
  if (entries.length === 0) return { ok: false, reason: 'That saved copy is empty.' };

  const restored: string[] = [];
  for (const [key, value] of entries) {
    await secureSetItem(key, value);
    restored.push(BACKUP_SECTIONS.find((s) => s.key === key)?.label ?? key);
  }
  return { ok: true, restored };
}

export async function deleteSnapshot(id: string): Promise<void> {
  await AsyncStorage.removeItem(id).catch(() => {});
  const existing = await getSnapshots();
  await writeSnapshotIndex(existing.filter((s) => s.id !== id));
}

// --- tracking the off-device copy -----------------------------------------

export async function recordExport(at: number): Promise<void> {
  await AsyncStorage.setItem(LAST_EXPORT_KEY, String(at));
}

export async function getLastExport(): Promise<number | undefined> {
  try {
    const raw = await AsyncStorage.getItem(LAST_EXPORT_KEY);
    if (!raw) return undefined;
    const value = Number(raw);
    return Number.isFinite(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

/** After this long without an off-device copy, the app says so rather than assuming. */
export const STALE_EXPORT_DAYS = 30;

export interface ExportAge {
  /** Undefined when they have never made one. */
  days?: number;
  stale: boolean;
  never: boolean;
  text: string;
}

export function describeExportAge(lastExport: number | undefined, now: number): ExportAge {
  if (lastExport === undefined) {
    return {
      stale: true,
      never: true,
      text: 'You have never saved a copy off this phone. If the phone goes, everything in GuideHand goes with it.',
    };
  }
  const days = Math.floor((now - lastExport) / (24 * 60 * 60 * 1000));
  if (days <= 0) {
    return { days, stale: false, never: false, text: 'You saved a copy off this phone today.' };
  }
  if (days === 1) {
    return { days, stale: false, never: false, text: 'You saved a copy off this phone yesterday.' };
  }
  const stale = days >= STALE_EXPORT_DAYS;
  return {
    days,
    stale,
    never: false,
    text: stale
      ? `It has been ${days} days since you saved a copy off this phone. Anything added since then only exists here.`
      : `You saved a copy off this phone ${days} days ago.`,
  };
}
