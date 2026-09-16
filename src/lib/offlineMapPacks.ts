// Downloading and holding real map tiles on the phone.
//
// Native-only: MapLibre's offline store is a database managed by native code.
// The .web.ts beside this file is what the browser build gets, so nothing here
// can take down the rest of the app off a phone.

import { OfflineManager } from '@maplibre/maplibre-react-native';

import type { Coords } from '@/lib/geo';
import { boundsAround, MAP_STYLE_URL, toMapLibreBounds } from '@/lib/offlineMaps';

export interface RegionSpec {
  id: string;
  center: Coords;
  radiusMiles: number;
  minZoom: number;
  maxZoom: number;
}

// MapLibre defaults to a 6,000 tile ceiling, which is a courtesy to hosts that
// meter requests. OpenFreeMap does not meter, and 6,000 tiles will not cover a
// town at street level — so the ceiling is raised to something that can.
let configured = false;
function configureOnce(): void {
  if (configured) return;
  OfflineManager.setTileCountLimit(250_000);
  OfflineManager.setProgressEventThrottle(400);
  configured = true;
}

/**
 * Downloads an area and resolves with the pack's native id once it is complete.
 * The id is generated natively, so it is what gets stored — a locally invented
 * one would not match what the tile store actually holds.
 */
export function downloadRegion(spec: RegionSpec, onProgress: (percent: number) => void): Promise<string> {
  configureOnce();
  const bounds = boundsAround(spec.center, spec.radiusMiles);

  return new Promise<string>((resolve, reject) => {
    let settled = false;

    OfflineManager.createPack(
      {
        mapStyle: MAP_STYLE_URL,
        bounds: toMapLibreBounds(bounds),
        minZoom: spec.minZoom,
        maxZoom: spec.maxZoom,
        metadata: { guidehandId: spec.id, radiusMiles: spec.radiusMiles },
      },
      (pack, status) => {
        onProgress(status.percentage);
        if (!settled && (status.state === 'complete' || status.percentage >= 100)) {
          settled = true;
          OfflineManager.removeListener(pack.id);
          resolve(pack.id);
        }
      },
      (pack, error) => {
        if (settled) return;
        settled = true;
        OfflineManager.removeListener(pack.id);
        // Half a region is worse than none: it looks downloaded and then has
        // holes exactly where you needed it.
        OfflineManager.deletePack(pack.id).catch(() => {});
        reject(new Error(error.message || 'The download stopped before it finished.'));
      }
    ).catch(reject);
  });
}

/** Which packs the tile store actually holds right now. */
export async function listPackIds(): Promise<string[]> {
  try {
    const packs = await OfflineManager.getPacks();
    return packs.map((pack) => pack.id);
  } catch {
    return [];
  }
}

export async function removeRegion(id: string): Promise<void> {
  await OfflineManager.deletePack(id);
}
