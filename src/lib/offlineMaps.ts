// Real offline maps: pick an area, download it, use it with no signal at all.
//
// Not instructions for downloading a map in some other app. The tiles land in
// this app's own storage and render from there, so the map works in a basement,
// in a dead zone, in airplane mode, with the towers down.
//
// Tiles come from OpenFreeMap, which serves OpenStreetMap data as vector tiles
// with no API key, no account and no request limit. That matters here: a map
// that stops working when a key expires or a free tier runs out is not a
// preparedness feature.

import type { Coords } from '@/lib/geo';

export const OFFLINE_MAPS_KEY = 'guidehand.offline-maps.v1';

/**
 * OpenStreetMap street data, styled for legibility. Keyless by design —
 * nothing here depends on an account that can lapse.
 */
export const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

/** Credit that must be shown wherever these tiles are drawn. */
export const MAP_ATTRIBUTION = '© OpenStreetMap contributors · OpenFreeMap';

export interface MapRegion {
  id: string;
  name: string;
  center: Coords;
  radiusMiles: number;
  minZoom: number;
  maxZoom: number;
  /** When the download finished. Absent while it is still running. */
  downloadedAt?: number;
  /** Bytes actually stored, once known. */
  bytes?: number;
}

/** Bottom-left and top-right corners, the order MapLibre wants them. */
export interface Bounds {
  sw: Coords;
  ne: Coords;
}

// ---------------------------------------------------------------------------
// How big an area, and how much will it cost to hold
// ---------------------------------------------------------------------------

const MILES_PER_DEGREE_LAT = 69.055;

/** A square box around a point, sized in miles. */
export function boundsAround(center: Coords, radiusMiles: number): Bounds {
  const dLat = radiusMiles / MILES_PER_DEGREE_LAT;
  // Lines of longitude converge toward the poles, so a mile is worth more
  // degrees the further north you are.
  const milesPerDegreeLon = MILES_PER_DEGREE_LAT * Math.cos((center.latitude * Math.PI) / 180);
  const dLon = radiusMiles / Math.max(0.01, milesPerDegreeLon);
  return {
    sw: { latitude: center.latitude - dLat, longitude: center.longitude - dLon },
    ne: { latitude: center.latitude + dLat, longitude: center.longitude + dLon },
  };
}

function tileX(longitude: number, zoom: number): number {
  return ((longitude + 180) / 360) * 2 ** zoom;
}

function tileY(latitude: number, zoom: number): number {
  const rad = (latitude * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 2 ** zoom;
}

/** How many map tiles a box covers across a zoom range. */
export function tileCount(bounds: Bounds, minZoom: number, maxZoom: number): number {
  let total = 0;
  for (let z = minZoom; z <= maxZoom; z++) {
    const x1 = Math.floor(tileX(bounds.sw.longitude, z));
    const x2 = Math.floor(tileX(bounds.ne.longitude, z));
    // Tile Y counts downward from the north pole, so the north edge is the
    // smaller number.
    const y1 = Math.floor(tileY(bounds.ne.latitude, z));
    const y2 = Math.floor(tileY(bounds.sw.latitude, z));
    total += (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
  }
  return total;
}

// Vector tiles are small at low zoom (a whole county in a few kilobytes) and
// fat at high zoom where every building is drawn. Across a mixed urban and
// rural range, OpenFreeMap's street style averages roughly 8-12 KB a tile.
// The high end of that is used deliberately: a download that turns out
// smaller than promised is a good surprise, the reverse is not.
const AVERAGE_TILE_BYTES = 12_000;

export function estimateBytes(bounds: Bounds, minZoom: number, maxZoom: number): number {
  return tileCount(bounds, minZoom, maxZoom) * AVERAGE_TILE_BYTES;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1_000_000) return `${Math.max(1, Math.round(bytes / 1000))} KB`;
  if (bytes < 1_000_000_000) return `${Math.round(bytes / 1_000_000)} MB`;
  return `${(bytes / 1_000_000_000).toFixed(1)} GB`;
}

// ---------------------------------------------------------------------------
// The sizes on offer
// ---------------------------------------------------------------------------

export interface RegionSize {
  id: string;
  label: string;
  /** Half-width of the square, in miles. */
  radiusMiles: number;
  minZoom: number;
  maxZoom: number;
  note: string;
}

/**
 * Zoom governs the download far more than radius does: each level up quadruples
 * the tile count, so a careless maxZoom turns a town into half a gigabyte.
 *
 * Zoom 15 already draws every street with its name, which is what navigating on
 * foot or by car actually needs. Zoom 16 adds building footprints — worth it
 * over a few miles, not worth four times the download over a county. The low
 * end stays wide because those tiles cost almost nothing and are what let you
 * pull back and see which way is out.
 */
export const REGION_SIZES: RegionSize[] = [
  {
    id: 'neighborhood',
    label: 'Right around here',
    radiusMiles: 5,
    minZoom: 8,
    maxZoom: 16,
    note: 'Your own streets, down to the buildings.',
  },
  {
    id: 'town',
    label: 'My town and out',
    radiusMiles: 15,
    minZoom: 7,
    maxZoom: 15,
    note: 'Every street named, across the area you actually move in.',
  },
  {
    id: 'county',
    label: 'The wider area',
    radiusMiles: 40,
    minZoom: 7,
    maxZoom: 14,
    note: 'Roads out of the area, and the towns along them.',
  },
  {
    id: 'evacuation',
    label: 'Evacuation range',
    radiusMiles: 100,
    minZoom: 6,
    maxZoom: 12,
    note: 'Major routes over a long distance. Highways, not side streets.',
  },
];

export function sizeById(id: string): RegionSize | undefined {
  return REGION_SIZES.find((size) => size.id === id);
}

export function regionId(): string {
  return `region-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/** What MapLibre wants: a flat [west, south, east, north], per the GeoJSON RFC. */
export function toMapLibreBounds(bounds: Bounds): [number, number, number, number] {
  return [bounds.sw.longitude, bounds.sw.latitude, bounds.ne.longitude, bounds.ne.latitude];
}

/** A [longitude, latitude] pair — MapLibre puts longitude first. */
export function toLngLat(point: Coords): [number, number] {
  return [point.longitude, point.latitude];
}

/** True when a coordinate falls inside a downloaded area. */
export function contains(region: MapRegion, point: Coords): boolean {
  const bounds = boundsAround(region.center, region.radiusMiles);
  return (
    point.latitude >= bounds.sw.latitude &&
    point.latitude <= bounds.ne.latitude &&
    point.longitude >= bounds.sw.longitude &&
    point.longitude <= bounds.ne.longitude
  );
}

/**
 * Same place, same size: one map. Downloading the same spot five times left
 * five rows and five sets of tiles, and the first fix for that only caught the
 * sixth — it ran when a new download finished and never looked at the rows
 * already on the phone. This runs when the list loads, keeps the newest of
 * each set, and hands back the ids whose tiles should go.
 */
export function collapseDuplicates(regions: MapRegion[]): { keep: MapRegion[]; drop: string[] } {
  const key = (r: MapRegion) =>
    `${r.center.latitude.toFixed(2)},${r.center.longitude.toFixed(2)}:${r.radiusMiles}`;
  // A name somebody typed ("Livingston") beats one the app made up ("The wider
  // area — saved 17/09/2026"). The freshest tiles are kept; the human name
  // travels with them.
  const typed = (r: MapRegion) =>
    !REGION_SIZES.some((size) => r.name === size.label || r.name.startsWith(`${size.label} —`)) &&
    !/\d+\.\d+\s*,\s*-?\d+\.\d+/.test(r.name);
  const newest = new Map<string, MapRegion>();
  const bestName = new Map<string, string>();
  for (const r of regions) {
    const k = key(r);
    const current = newest.get(k);
    if (!current || (r.downloadedAt ?? 0) > (current.downloadedAt ?? 0)) newest.set(k, r);
    if (typed(r) && !bestName.has(k)) bestName.set(k, r.name);
  }
  const keepIds = new Set([...newest.values()].map((r) => r.id));
  return {
    keep: regions
      .filter((r) => keepIds.has(r.id))
      .map((r) => (bestName.has(key(r)) ? { ...r, name: bestName.get(key(r)) as string } : r)),
    drop: regions.filter((r) => !keepIds.has(r.id)).map((r) => r.id),
  };
}
