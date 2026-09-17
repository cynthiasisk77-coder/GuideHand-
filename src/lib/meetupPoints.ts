// Meeting places — the spots a family agrees on before anything goes wrong.
//
// Two screens touch these now: Family Meetup, which lists them and points you
// at one, and Offline Maps, where you tap the spot on the map rather than
// typing what its coordinates are. Before this file existed both screens
// carried their own copy of the storage key and their own idea of the shape,
// which is how one screen quietly stops seeing what the other saved.
//
// They are stored encrypted, like everything else personal in this app.

import { MEETUP_POINTS_KEY } from '@/lib/personalData';
import { secureGetItem, secureSetItem } from '@/lib/secureData';

export interface MeetupPoint {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  note: string;
}

/**
 * Date.now() and Math.random() cannot be called from a component body — the
 * React Compiler's purity rule flags it — so id minting lives out here.
 */
export function newMeetupPointId(): string {
  return `meet-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Anything stored by an older build, or half-written, is dropped rather than trusted. */
export function parseMeetupPoints(raw: string | null | undefined): MeetupPoint[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (p): p is Record<string, unknown> =>
          !!p && typeof p === 'object' &&
          typeof (p as Record<string, unknown>).latitude === 'number' &&
          typeof (p as Record<string, unknown>).longitude === 'number'
      )
      .map((p) => ({
        id: String(p.id ?? newMeetupPointId()),
        label: String(p.label || 'Meeting place'),
        latitude: p.latitude as number,
        longitude: p.longitude as number,
        note: String(p.note ?? ''),
      }));
  } catch {
    return [];
  }
}

export async function loadMeetupPoints(): Promise<MeetupPoint[]> {
  try {
    return parseMeetupPoints(await secureGetItem(MEETUP_POINTS_KEY));
  } catch {
    return [];
  }
}

/**
 * Adds one place and returns the full list.
 *
 * It re-reads before writing on purpose. The map screen does not hold the list
 * in state, and writing a one-item array over the top of four saved places
 * would lose the other three.
 */
export async function appendMeetupPoint(point: MeetupPoint): Promise<MeetupPoint[]> {
  const existing = await loadMeetupPoints();
  const next = [...existing, point];
  await secureSetItem(MEETUP_POINTS_KEY, JSON.stringify(next));
  return next;
}
