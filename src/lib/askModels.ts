// The models a person can choose to download.
//
// Deliberately weighted toward the small end. This app's whole situation is a
// phone that may have to last days on whatever charge it has, so a model that
// answers a bit better while eating the battery twice as fast is the wrong
// trade here — and because every answer is grounded in GuideHand's own
// articles, a small model is doing comprehension rather than recall, which is
// the thing small models are actually good at.

// Deliberately no import from react-native-executorch. That package is native
// code, and reaching for it here would pull TurboModuleRegistry into every
// screen that shows this list — which on the web takes down the whole app, not
// just this feature. So this file holds plain data, and the model itself is
// looked up inside the engine, which only ever loads on a phone.

/** Names in the library's own model table. Resolved on the device. */
export type AskModelKey = 'LFM2_5_350M' | 'LLAMA3_2_1B' | 'LLAMA3_2_3B';

export interface AskModelChoice {
  id: string;
  name: string;
  /** Plain-language size. Approximate — the exact download varies by device. */
  size: string;
  summary: string;
  /** True for the one most people should pick. */
  recommended: boolean;
  modelKey: AskModelKey;
}

export const ASK_MODELS: AskModelChoice[] = [
  {
    id: 'lfm2-350m',
    name: 'Small',
    size: 'about 300 MB',
    summary:
      'Quickest to download, lightest on the battery. Good at reading your articles back in plain words, which is what it is here to do.',
    recommended: true,
    modelKey: 'LFM2_5_350M',
  },
  {
    id: 'llama3.2-1b',
    name: 'Medium',
    size: 'about 1 GB',
    summary:
      'Writes more naturally and handles a vague question better. Noticeably heavier on the battery and slower to answer.',
    recommended: false,
    modelKey: 'LLAMA3_2_1B',
  },
  {
    id: 'llama3.2-3b',
    name: 'Large',
    size: 'about 2.5 GB',
    summary:
      'The best answers, and the worst fit for an emergency. Long download, heavy storage, and it will drain a phone you may not be able to recharge.',
    recommended: false,
    modelKey: 'LLAMA3_2_3B',
  },
];

export function findAskModel(id: string | null | undefined): AskModelChoice | undefined {
  if (!id) return undefined;
  return ASK_MODELS.find((m) => m.id === id);
}

export const ASK_MODEL_KEY = 'guidehand.ask.model.v1';
