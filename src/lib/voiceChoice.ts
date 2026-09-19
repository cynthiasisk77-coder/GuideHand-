// Which voice Max speaks with.
//
// Two kinds. The phone's own voices are already there and cost nothing, but
// most phones ship with one flat one and never mention the others. Max's own
// voice is a small neural model that lives on the phone once downloaded and
// sounds like a person; it is the answer to "can she have a more human voice".
//
// Plain data and storage only. No native imports here, so the web build and
// every screen that shows a voice name stay clear of the model code.

import AsyncStorage from '@react-native-async-storage/async-storage';

/** The voices shipped in the English language pack, named as the model names them. */
export type NaturalVoiceId = 'af_heart' | 'af_sarah' | 'am_michael';

export type VoiceChoice =
  | {
      kind: 'phone';
      /** The phone's own identifier for the voice. Absent means whatever the phone uses by default. */
      identifier?: string;
      /** How it was shown on the picker, so the choice can be named back to her. */
      label?: string;
    }
  | { kind: 'natural'; voice: NaturalVoiceId };

export type VoiceGender = 'woman' | 'man';

export interface NaturalVoiceOption {
  id: NaturalVoiceId;
  name: string;
  /** Said plainly on the picker. A name alone told nobody which was which. */
  gender: VoiceGender;
  about: string;
}

/**
 * The three worth offering out of the pack's six. The model's own voice sheet
 * grades Heart an A, Sarah and Michael a C+; the other three are D or below
 * and sound it. Two women's voices and a man's, because some people would
 * rather be told what to do by a man, and they should get to choose.
 */
export const NATURAL_VOICES: readonly NaturalVoiceOption[] = [
  { id: 'af_heart', name: 'Heart', gender: 'woman', about: 'Warm and even. The most natural voice in the set.' },
  { id: 'af_sarah', name: 'Sarah', gender: 'woman', about: 'Lighter and brisker. Not as polished as Heart.' },
  { id: 'am_michael', name: 'Michael', gender: 'man', about: 'Low and steady.' },
];

/** "a woman's voice" / "a man's voice", for labels. */
export function voiceGenderLabel(gender: VoiceGender): string {
  return gender === 'man' ? 'a man’s voice' : 'a woman’s voice';
}

/** One download covers both natural voices. Rounded up from the real file sizes. */
export const NATURAL_VOICE_SIZE = 'about 350 MB';

export const VOICE_KEY = 'guidehand.max-voice.v1';

export const PHONE_DEFAULT: VoiceChoice = { kind: 'phone' };

// Kept in memory once read, so reading an answer aloud does not wait on
// storage every time.
let cached: VoiceChoice | undefined;

export function voiceChoiceNow(): VoiceChoice | undefined {
  return cached;
}

export function parseVoiceChoice(raw: string | null | undefined): VoiceChoice {
  if (!raw) return PHONE_DEFAULT;
  try {
    const value = JSON.parse(raw) as Partial<VoiceChoice> | null;
    if (!value || typeof value !== 'object') return PHONE_DEFAULT;
    if (value.kind === 'natural') {
      const known = NATURAL_VOICES.find((v) => v.id === (value as { voice?: string }).voice);
      return known ? { kind: 'natural', voice: known.id } : PHONE_DEFAULT;
    }
    if (value.kind === 'phone') {
      const identifier = typeof value.identifier === 'string' && value.identifier ? value.identifier : undefined;
      const label = typeof value.label === 'string' && value.label ? value.label : undefined;
      return identifier ? { kind: 'phone', identifier, label } : PHONE_DEFAULT;
    }
  } catch {
    // Not ours. The default is the phone's voice, which always exists.
  }
  return PHONE_DEFAULT;
}

export async function loadVoiceChoice(): Promise<VoiceChoice> {
  try {
    const raw = await AsyncStorage.getItem(VOICE_KEY);
    cached = parseVoiceChoice(raw);
  } catch {
    cached = PHONE_DEFAULT;
  }
  return cached;
}

export async function saveVoiceChoice(choice: VoiceChoice): Promise<void> {
  cached = choice;
  await AsyncStorage.setItem(VOICE_KEY, JSON.stringify(choice)).catch(() => {});
}

export function sameVoice(a: VoiceChoice, b: VoiceChoice): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === 'natural' && b.kind === 'natural') return a.voice === b.voice;
  if (a.kind === 'phone' && b.kind === 'phone') return (a.identifier ?? '') === (b.identifier ?? '');
  return false;
}

/** What to call a choice on screen. */
export function describeVoiceChoice(choice: VoiceChoice): string {
  if (choice.kind === 'natural') {
    const voice = NATURAL_VOICES.find((v) => v.id === choice.voice);
    return voice ? `${voice.name} (${voiceGenderLabel(voice.gender)})` : 'Natural voice';
  }
  return choice.identifier ? (choice.label ?? 'A phone voice') : 'The phone’s usual voice';
}

// --- The phone's own voices ---------------------------------------------

/** The shape expo-speech reports. Mirrored here so this file needs no import from it. */
export interface PhoneVoiceInfo {
  identifier: string;
  name: string;
  quality: string;
  language: string;
}

export interface PhoneVoiceRow {
  identifier: string;
  /** "Voice 1", "Voice 2"… The phone's own names are codes nobody can read. */
  label: string;
  /** Which English, and anything worth knowing. */
  detail: string;
  /** A voice that only works with signal. Marked, because this app is for when there is none. */
  needsSignal: boolean;
  /** The phone rates it above its plain voices. */
  better: boolean;
}

const ENGLISH: Record<string, string> = {
  'en-us': 'American English',
  'en-gb': 'British English',
  'en-au': 'Australian English',
  'en-in': 'Indian English',
  'en-ie': 'Irish English',
  'en-ca': 'Canadian English',
  'en-nz': 'New Zealand English',
  'en-za': 'South African English',
};

function englishName(language: string): string {
  const key = language.toLowerCase().replace('_', '-');
  return ENGLISH[key] ?? (key.startsWith('en') ? 'English' : language);
}

/**
 * Turns the phone's voice list into rows a person can choose between.
 *
 * English voices only, when the phone has any; local ones before the ones
 * that phone home; the phone's better-rated voices first within that. Numbered
 * in that order, because "en-us-x-tpf-local" is not a name.
 */
export function describePhoneVoices(voices: readonly PhoneVoiceInfo[]): PhoneVoiceRow[] {
  const english = voices.filter((v) => (v.language ?? '').toLowerCase().startsWith('en'));
  const pool = english.length > 0 ? english : voices;
  const rows = pool.map((v) => ({
    identifier: v.identifier,
    better: v.quality === 'Enhanced',
    needsSignal: /network/i.test(v.identifier) || /network/i.test(v.name),
    language: v.language ?? '',
  }));
  rows.sort((a, b) => {
    if (a.needsSignal !== b.needsSignal) return a.needsSignal ? 1 : -1;
    if (a.better !== b.better) return a.better ? -1 : 1;
    if (a.language !== b.language) return a.language < b.language ? -1 : 1;
    return a.identifier < b.identifier ? -1 : 1;
  });
  return rows.map((r, i) => {
    const parts = [englishName(r.language)];
    if (r.better) parts.push('the phone rates it higher');
    if (r.needsSignal) parts.push('needs signal');
    return {
      identifier: r.identifier,
      label: `Voice ${i + 1}`,
      detail: parts.join(' · '),
      needsSignal: r.needsSignal,
      better: r.better,
    };
  });
}
