// Reading an answer out loud.
//
// This is not a convenience. The situations this app is for are the ones where
// somebody's hands are busy — holding pressure on a wound, doing compressions,
// carrying a child — or where the light is gone, or where they are frightened
// enough that reading a screen is genuinely hard. Being able to hear the steps
// instead of reading them is the difference between guidance you can use and
// guidance you can only look at.
//
// expo-speech uses the operating system's own voice, which is already on the
// phone. No download, no account, and it keeps working with no signal.
//
// Android's text-to-speech fails silently in three separate ways, and this file
// exists to close all three. It accepts no text longer than
// Speech.maxSpeechInputLength and simply says nothing past it; stop() is
// asynchronous, so speaking immediately after it can cancel the thing you just
// asked for; and a phone with no voice data installed reports no error at all,
// it just stays quiet. None of the three raise, so none of them were visible
// until someone pressed the button on a real phone and heard nothing.

import * as Speech from 'expo-speech';

/**
 * Slower than the default. A person following a step while doing it needs time
 * to act between sentences, and a panicked person needs it more.
 */
export const CALM_RATE = 0.92;

/**
 * Android refuses anything past Speech.maxSpeechInputLength (commonly 4000
 * characters) by saying nothing whatsoever. Staying well under it costs
 * nothing, and an article read aloud goes past it easily.
 */
const CHUNK_LIMIT = Math.min(Speech.maxSpeechInputLength ?? 4000, 3500);

export interface ReadOptions {
  onDone?: () => void;
  /** Called when the phone cannot speak — usually no voice data installed. */
  onError?: () => void;
}

// Each call to readAloud claims a new number. A chunk that finishes after
// someone has pressed stop finds its number is stale and does not queue the
// next one, which is what stops a cancelled article carrying on talking.
let currentRun = 0;

/**
 * Speaks text, stopping anything already being read. Two voices talking over
 * each other is worse than silence.
 */
export async function readAloud(text: string, options: ReadOptions = {}): Promise<void> {
  const chunks = chunkForSpeech(tidyForSpeech(text));
  if (chunks.length === 0) {
    options.onDone?.();
    return;
  }

  // Awaited, not fired and forgotten. Speaking into an unfinished stop() is
  // how the first chunk gets cancelled by the thing that was meant to clear
  // the way for it.
  const run = ++currentRun;
  try {
    await Speech.stop();
  } catch {
    // Nothing was speaking. That is the normal case.
  }
  if (run !== currentRun) return;

  speakFrom(chunks, 0, run, options);
}

function speakFrom(chunks: string[], index: number, run: number, options: ReadOptions): void {
  if (run !== currentRun) return;
  if (index >= chunks.length) {
    options.onDone?.();
    return;
  }

  Speech.speak(chunks[index], {
    rate: CALM_RATE,
    // Named explicitly. A phone with no default speech locale set picks
    // nothing and says nothing, which looks exactly like a broken button.
    language: 'en-US',
    onDone: () => speakFrom(chunks, index + 1, run, options),
    onStopped: () => {
      // A stop is deliberate: report finished, but do not queue what is left.
      if (run === currentRun) options.onDone?.();
    },
    onError: () => {
      if (run === currentRun) (options.onError ?? options.onDone)?.();
    },
  });
}

export function stopReading(): void {
  // Invalidating the run first means any chunk still in flight will not queue
  // its successor, even though stop() itself takes a moment to land.
  currentRun += 1;
  void Speech.stop().catch(() => {});
}

export async function isReading(): Promise<boolean> {
  try {
    return await Speech.isSpeakingAsync();
  } catch {
    return false;
  }
}

/**
 * Whether this phone can speak at all.
 *
 * Plenty of Android phones ship with no text-to-speech voice data until
 * something asks for it, and in that state speak() does nothing and reports
 * nothing. Asking first is the only way to tell the difference between a
 * broken button and a phone that simply has no voice yet.
 */
export async function hasVoiceAsync(): Promise<boolean> {
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    return voices.length > 0;
  } catch {
    // Some devices throw rather than returning an empty list. Assume a voice
    // exists and let the attempt itself be the test — a button that works is
    // better than one hidden on a guess.
    return true;
  }
}

/**
 * Breaks text into pieces the speech engine will actually accept, splitting at
 * sentence ends so the pauses land where a reader would put them.
 */
export function chunkForSpeech(text: string, limit: number = CHUNK_LIMIT): string[] {
  const clean = text.trim();
  if (!clean) return [];
  if (clean.length <= limit) return [clean];

  const chunks: string[] = [];
  let current = '';

  // Keep the punctuation with the sentence it ends, so a chunk boundary never
  // swallows a full stop.
  for (const sentence of clean.split(/(?<=[.!?])\s+/)) {
    for (const piece of splitLongPiece(sentence, limit)) {
      if (!current) {
        current = piece;
      } else if (current.length + 1 + piece.length <= limit) {
        current += ' ' + piece;
      } else {
        chunks.push(current);
        current = piece;
      }
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

/** A single sentence longer than the limit, broken at word boundaries. */
function splitLongPiece(piece: string, limit: number): string[] {
  if (piece.length <= limit) return [piece];

  const out: string[] = [];
  let current = '';
  for (const word of piece.split(/\s+/)) {
    // A single "word" longer than the limit is not language, it is a URL or a
    // run of punctuation. Cut it rather than let it silence the whole chunk.
    if (word.length > limit) {
      if (current) {
        out.push(current);
        current = '';
      }
      for (let i = 0; i < word.length; i += limit) out.push(word.slice(i, i + limit));
      continue;
    }
    if (!current) current = word;
    else if (current.length + 1 + word.length <= limit) current += ' ' + word;
    else {
      out.push(current);
      current = word;
    }
  }
  if (current) out.push(current);
  return out;
}

/**
 * Written text has marks that a voice reads as noise. A citation like "[1]"
 * becomes "bracket one", a bullet becomes a pause that never ends, and a
 * measurement like "1/2" is read as "one slash two".
 */
export function tidyForSpeech(text: string): string {
  return stripModelArtifacts(text)
    // Citations belong on screen, not in the ear.
    .replace(/\[(\d+)\]/g, '')
    // Bullets and dashes at the start of a line are punctuation for the eye.
    .replace(/^[\s]*[-•*·]\s*/gm, '')
    // A voice should say "one half", not "one slash two".
    .replace(/\b(\d+)\/(\d+)\b/g, (_m, a, b) => spokenFraction(Number(a), Number(b)))
    // Degrees, which otherwise get read as "degree F".
    .replace(/(\d)\s*°\s*F\b/gi, '$1 degrees Fahrenheit')
    .replace(/(\d)\s*°\s*C\b/gi, '$1 degrees Celsius')
    // Collapse the whitespace a screen layout leaves behind.
    .replace(/\s*\n\s*/g, '. ')
    .replace(/\.\s*\.\s*/g, '. ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Removes the chat-template markers a language model can emit as ordinary
 * text — "<|start_header_id|>assistant<|end_header_id|>" and friends. They are
 * scaffolding the model is supposed to keep to itself; read aloud they are
 * gibberish, and on screen they make a working answer look broken.
 */
export function stripModelArtifacts(text: string): string {
  return text
    .replace(/<\|[^|>]*\|>/g, '\n')
    // The role name is left stranded once its markers are gone.
    .replace(/^\s*(assistant|system|user)\s*$/gim, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const SIMPLE_FRACTIONS: Record<string, string> = {
  '1/2': 'one half',
  '1/3': 'one third',
  '2/3': 'two thirds',
  '1/4': 'one quarter',
  '3/4': 'three quarters',
  '1/8': 'one eighth',
};

function spokenFraction(numerator: number, denominator: number): string {
  const key = `${numerator}/${denominator}`;
  return SIMPLE_FRACTIONS[key] ?? `${numerator} out of ${denominator}`;
}
