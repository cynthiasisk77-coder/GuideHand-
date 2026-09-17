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

import * as Speech from 'expo-speech';

/**
 * Slower than the default. A person following a step while doing it needs time
 * to act between sentences, and a panicked person needs it more.
 */
export const CALM_RATE = 0.92;

export interface ReadOptions {
  onDone?: () => void;
  onError?: () => void;
}

/**
 * Speaks text, stopping anything already being read. Two voices talking over
 * each other is worse than silence.
 */
export function readAloud(text: string, options: ReadOptions = {}): void {
  const clean = tidyForSpeech(text);
  if (!clean) {
    options.onDone?.();
    return;
  }
  Speech.stop();
  Speech.speak(clean, {
    rate: CALM_RATE,
    onDone: options.onDone,
    onStopped: options.onDone,
    onError: options.onError ?? options.onDone,
  });
}

export function stopReading(): void {
  Speech.stop();
}

export async function isReading(): Promise<boolean> {
  try {
    return await Speech.isSpeakingAsync();
  } catch {
    return false;
  }
}

/**
 * Written text has marks that a voice reads as noise. A citation like "[1]"
 * becomes "bracket one", a bullet becomes a pause that never ends, and a
 * measurement like "1/2" is read as "one slash two".
 */
export function tidyForSpeech(text: string): string {
  return text
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
