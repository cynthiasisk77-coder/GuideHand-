// Web stand-in. There is no tile store in a browser tab, and importing the
// native module here would throw during server rendering and take every route
// down with it — the same failure the AI engine had.

import type { Coords } from '@/lib/geo';

export interface RegionSpec {
  id: string;
  center: Coords;
  radiusMiles: number;
  minZoom: number;
  maxZoom: number;
}

export function downloadRegion(_spec: RegionSpec, _onProgress: (percent: number) => void): Promise<string> {
  return Promise.reject(new Error('Downloading maps needs the installed phone app.'));
}

export async function listPackIds(): Promise<string[]> {
  return [];
}

export async function removeRegion(_id: string): Promise<void> {
  // Nothing stored here to remove.
}
