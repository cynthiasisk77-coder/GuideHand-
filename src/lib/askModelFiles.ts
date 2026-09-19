// The one place the library's model table is read.
//
// models.llm.LFM2_5_350M is not a model. It is a container of hardware
// variants — XNNPACK_8DA4W, XNNPACK_FP16, MLX_INT4 — with a DEFAULT that picks
// the right one for the device. Handing the container straight to the session
// passes an object with no file paths in it, and the download dies on the
// phone with "Missing argument \"path\"".
//
// This returned `unknown` before, which is why that shipped: the session takes
// its config loosely, so nothing objected until a real device tried to fetch a
// file from a path that was not there. The explicit return type below is the
// actual fix — the container has no modelPath, so handing it over again is now
// a compile error rather than a download that fails in somebody's hands.
//
// Native only. react-native-executorch cannot load in a browser, so every
// component that imports this has a .web.tsx stand-in that does not.

import { models } from 'react-native-executorch';

import type { AskModelKey } from '@/lib/askModels';

export type ResolvedModel = {
  readonly modelPath: string;
  readonly tokenizerPath: string;
  readonly tokenizerConfigPath: string;
};

export function configFor(key: AskModelKey): ResolvedModel {
  return models.llm[key].DEFAULT;
}

/**
 * Download progress as a whole percentage, whichever way the library reports it.
 *
 * It showed "Downloading — 10000%" on a real phone, which is what happens when
 * a value that is already 0-100 gets multiplied by a hundred. Rather than bet
 * on which convention the library uses — and have it break again if that
 * changes — anything at or under 1 is read as a fraction and anything above it
 * as a percentage already. Clamped, because a progress bar whose width is
 * "10000%" is how that bug got on screen in the first place.
 */
export function percentOf(progress: number | undefined): number {
  if (!progress || progress <= 0) return 0;
  const percent = progress <= 1 ? progress * 100 : progress;
  return Math.min(100, Math.round(percent));
}
