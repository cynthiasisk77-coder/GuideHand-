// Managing downloadable content packs: what's available, what's installed,
// downloading, removing, and loading installed packs back into the app.
//
// Design rule throughout: no network call is ever required for the app to work.
// The catalog is bundled, so the screen has something to show with the grid
// down; a network fetch only ever *refreshes* it. Installed packs are read from
// local storage and never re-fetched.

import AsyncStorage from '@react-native-async-storage/async-storage';

import { BUNDLED_PACK_CATALOG } from '@/content/packCatalog';
import { registerPacks } from '@/lib/packRegistry';
import { getPackStorage } from '@/lib/packStorage';
import { loadMyNotes, notesAsPack } from '@/lib/myNotes';
import {
  ContentPack,
  InstalledPack,
  PackCatalog,
  PackListing,
  parseContentPack,
  parsePackCatalog,
} from '@/lib/packTypes';

const INDEX_KEY = 'guidehand.packs.index.v1';
const CATALOG_CACHE_KEY = 'guidehand.packs.catalog.v1';

// Where the published catalog lives. EXPO_PUBLIC_PACK_CATALOG_URL points a
// build at a different catalog — a staging copy, or a local one while testing —
// without touching this file.
export const CATALOG_URL =
  process.env.EXPO_PUBLIC_PACK_CATALOG_URL ??
  'https://cynthiasisk77-coder.github.io/GuideHand-/packs/catalog.json';

const CATALOG_TIMEOUT_MS = 8000;
const PACK_TIMEOUT_MS = 60000;

export interface CatalogResult {
  catalog: PackCatalog;
  /** How we got it — the UI says so plainly rather than implying it's fresh. */
  source: 'network' | 'cache' | 'bundled';
}

// ---------------------------------------------------------------------------
// Installed-pack bookkeeping
// ---------------------------------------------------------------------------

export async function getInstalledPacks(): Promise<InstalledPack[]> {
  try {
    const raw = await AsyncStorage.getItem(INDEX_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeInstalledPacks(packs: InstalledPack[]): Promise<void> {
  await AsyncStorage.setItem(INDEX_KEY, JSON.stringify(packs));
}

export async function getInstalledBytes(): Promise<number> {
  const packs = await getInstalledPacks();
  return packs.reduce((total, p) => total + (p.bytes || 0), 0);
}

export async function getFreeSpace(): Promise<number | undefined> {
  return getPackStorage().freeSpace();
}

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

async function fetchJsonWithTimeout(url: string, timeoutMs: number): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Server responded ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

/**
 * The catalog of available packs. Tries the network, falls back to the last
 * copy we saw, then to the copy compiled into the app — so this never fails and
 * never leaves the screen empty, whatever the network is doing.
 */
export async function loadCatalog(): Promise<CatalogResult> {
  try {
    const raw = await fetchJsonWithTimeout(CATALOG_URL, CATALOG_TIMEOUT_MS);
    const catalog = parsePackCatalog(raw);
    if (catalog) {
      await AsyncStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify(catalog)).catch(() => {});
      return { catalog, source: 'network' };
    }
  } catch {
    // Offline, or the host is down, or it served something unreadable. All of
    // those mean the same thing here: use what we already have.
  }

  try {
    const cached = await AsyncStorage.getItem(CATALOG_CACHE_KEY);
    if (cached) {
      const catalog = parsePackCatalog(JSON.parse(cached));
      if (catalog) return { catalog, source: 'cache' };
    }
  } catch {
    // Fall through to bundled.
  }

  return { catalog: BUNDLED_PACK_CATALOG, source: 'bundled' };
}

// ---------------------------------------------------------------------------
// Download / install / remove
// ---------------------------------------------------------------------------

export type InstallResult =
  | { ok: true; pack: InstalledPack }
  | { ok: false; reason: string };

/**
 * Downloads and installs a pack. The pack is validated before anything is
 * written, so a truncated or malformed download leaves the installed set
 * exactly as it was.
 */
export async function installPack(listing: PackListing): Promise<InstallResult> {
  let raw: unknown;
  try {
    raw = await fetchJsonWithTimeout(listing.url, PACK_TIMEOUT_MS);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Download failed';
    return {
      ok: false,
      reason:
        message === 'Aborted' || message.includes('abort')
          ? 'That took too long. Check your Wi-Fi and try again.'
          : `Could not download it: ${message}`,
    };
  }

  const pack = parseContentPack(raw);
  if (!pack) {
    return { ok: false, reason: "That file didn't look like a content pack, so nothing was saved." };
  }
  if (pack.id !== listing.id) {
    return { ok: false, reason: 'That file is a different pack than the one listed. Nothing was saved.' };
  }

  const contents = JSON.stringify(pack);
  try {
    await getPackStorage().write(pack.id, contents);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return { ok: false, reason: `Could not save it to this device: ${message}` };
  }

  const installed: InstalledPack = {
    id: pack.id,
    name: pack.name,
    version: pack.version,
    license: pack.license,
    attribution: pack.attribution,
    articleCount: pack.articles.length,
    bytes: byteLength(contents),
    installedAt: Date.now(),
  };

  const existing = await getInstalledPacks();
  await writeInstalledPacks([...existing.filter((p) => p.id !== pack.id), installed]);
  await loadInstalledPacksIntoRegistry();

  return { ok: true, pack: installed };
}

export async function removePack(id: string): Promise<void> {
  await getPackStorage().remove(id);
  const existing = await getInstalledPacks();
  await writeInstalledPacks(existing.filter((p) => p.id !== id));
  await loadInstalledPacksIntoRegistry();
}

/**
 * Reads every installed pack off local storage into the registry. Called once
 * at startup and again after any install or removal. A pack that has gone
 * missing or become unreadable is skipped rather than taking the others down.
 */
export async function loadInstalledPacksIntoRegistry(): Promise<ContentPack[]> {
  const installed = await getInstalledPacks();
  const storage = getPackStorage();
  const loaded: ContentPack[] = [];

  for (const entry of installed) {
    try {
      const text = await storage.read(entry.id);
      if (!text) continue;
      const pack = parseContentPack(JSON.parse(text));
      if (pack) loaded.push(pack);
    } catch {
      // A single bad pack must not stop the rest from loading.
    }
  }

  const mine = notesAsPack(await loadMyNotes());
  registerPacks(mine ? [...loaded, mine] : loaded);
  return loaded;
}

// UTF-8 byte length, so the size we report is the size on disk rather than the
// character count — they differ as soon as content has an accent or a dash.
function byteLength(text: string): number {
  if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(text).length;
  let bytes = 0;
  for (let i = 0; i < text.length; i++) {
    const code = text.codePointAt(i)!;
    if (code < 0x80) bytes += 1;
    else if (code < 0x800) bytes += 2;
    else if (code < 0x10000) bytes += 3;
    else {
      bytes += 4;
      i++;
    }
  }
  return bytes;
}

// ---------------------------------------------------------------------------
// View model for the screen
// ---------------------------------------------------------------------------

export type PackState = 'available' | 'installed' | 'update-available';

export interface PackRow {
  listing: PackListing;
  state: PackState;
  installed?: InstalledPack;
}

export function buildPackRows(catalog: PackCatalog, installed: InstalledPack[]): PackRow[] {
  return catalog.packs.map((listing) => {
    const match = installed.find((p) => p.id === listing.id);
    if (!match) return { listing, state: 'available' as const };
    return {
      listing,
      installed: match,
      state: listing.version > match.version ? ('update-available' as const) : ('installed' as const),
    };
  });
}

/**
 * Packs the person has installed that the catalog no longer lists. They still
 * work and still take up space, so the screen has to account for them.
 */
export function findOrphanedPacks(catalog: PackCatalog, installed: InstalledPack[]): InstalledPack[] {
  return installed.filter((p) => !catalog.packs.some((listing) => listing.id === p.id));
}
