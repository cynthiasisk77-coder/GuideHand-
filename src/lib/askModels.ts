// The models a person can choose to download.
//
// Medium is the one to recommend, and that was measured, not guessed. The same
// three models were run on a desk with the exact prompts the app builds. The
// 350M one answered "my sister is having a panic attack" with one sentence,
// parroted the instructions back, and invented steps that are in no article
// ("place a hand on her chest", "elevate the injured arm"). The 1B one wrote a
// warm, cited answer from the articles, used the person's name, and said what
// the article says. A model that makes things up is worse than no model in an
// app whose whole promise is that Max reads you your own vetted page; so
// Small stays available for phones that cannot take Medium, labelled for what
// it is.

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
      'Quickest to download and lightest on the battery, but too small to trust: on a desk test it answered in one line and wandered off the articles. Only if the phone cannot take Medium.',
    recommended: false,
    modelKey: 'LFM2_5_350M',
  },
  {
    id: 'llama3.2-1b',
    name: 'Medium',
    size: 'about 1 GB',
    summary:
      'The one to pick. Warm, uses your name, stays on the articles and says which one it read. Heavier on the battery and slower to answer than Small.',
    recommended: true,
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

// Remembers that a model finished downloading at least once on this phone.
//
// The screen could not tell downloading from loading, so every time Ask was
// opened it said "Starting the download… keep this screen open and stay on
// Wi-Fi" while it was really just reading a file already sitting on the phone.
// That is a several-gigabyte model being loaded into memory, which takes a few
// seconds and no network at all. Keyed by model id.
export const READY_ONCE_PREFIX = 'guidehand.ask-model-downloaded.';
