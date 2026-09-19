// The games Max hosts on a long night, with nothing in them that needs the
// model: a trivia round from a hand-written bank, riddles, a word chain, and
// the check-in lines. All of it works on a phone that has never downloaded
// Max's brain, which is most phones.
//
// Pure. No React, no native code, so every rule here is tested on a desk.

import { CHECK_IN_LINES } from '@/content/nightWatch/checkIns';
import { RIDDLES, type Riddle } from '@/content/nightWatch/riddles';
import { TALK_PROMPTS } from '@/content/nightWatch/talk';
import { TRIVIA, type TriviaQuestion } from '@/content/nightWatch/trivia';
import { CHAIN_WORDS } from '@/content/nightWatch/words';

// --- Answer checking ---------------------------------------------------------

const NUMBER_WORDS: Record<string, string> = {
  zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: '10',
  eleven: '11', twelve: '12', thirteen: '13', fourteen: '14', fifteen: '15', sixteen: '16', seventeen: '17', eighteen: '18',
  nineteen: '19', twenty: '20', thirty: '30', forty: '40', fifty: '50', sixty: '60', seventy: '70', eighty: '80', ninety: '90',
  hundred: '100',
};

/** Lowercase, no punctuation, no leading article, number words as digits. */
export function normalizeAnswer(text: string): string {
  const cleaned = text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^(the|a|an|its|it is|its the|it s) /, '');
  const words = cleaned.split(' ').map((w) => NUMBER_WORDS[w] ?? w);
  return words.join(' ').replace(/,/g, '');
}

/** True when what they said matches any accepted answer, forgivingly. */
export function answerMatches(given: string, accepted: readonly string[]): boolean {
  const g = normalizeAnswer(given);
  if (!g) return false;
  return accepted.some((a) => {
    const n = normalizeAnswer(a);
    if (g === n) return true;
    // "the blue whale, I think" still counts; "whale" for "blue whale" is
    // decided by the bank listing it, not by us.
    return (n.length >= 3 || /^\d+$/.test(n)) && new RegExp(`(^| )${escape(n)}( |$)`).test(g);
  });
}

function escape(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// --- Picking without repeats ------------------------------------------------

/** A shuffled copy. Fisher-Yates with the caller's random, so tests can pin it. */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export interface TriviaRound {
  questions: TriviaQuestion[];
  index: number;
  score: number;
}

export const TRIVIA_ROUND_SIZE = 10;

export function newTriviaRound(random: () => number = Math.random): TriviaRound {
  return { questions: shuffle(TRIVIA, random).slice(0, TRIVIA_ROUND_SIZE), index: 0, score: 0 };
}

export interface TriviaResult {
  correct: boolean;
  /** What Max says. */
  line: string;
  round: TriviaRound;
  finished: boolean;
}

export function answerTrivia(round: TriviaRound, given: string): TriviaResult {
  const q = round.questions[round.index];
  const correct = answerMatches(given, q.answers);
  const right = q.answers[0];
  const shown = /^[0-9]/.test(right) ? right : right.charAt(0).toUpperCase() + right.slice(1);
  const line = correct
    ? `${pick(RIGHT_LINES, round.index)}${q.note ? ' ' + q.note : ''}`
    : `Not that one. It's ${shown}.${q.note ? ' ' + q.note : ''}`;
  const next: TriviaRound = { ...round, index: round.index + 1, score: round.score + (correct ? 1 : 0) };
  return { correct, line, round: next, finished: next.index >= next.questions.length };
}

/** They gave up on this one. Max says the answer and moves on; no score. */
export function skipTrivia(round: TriviaRound): TriviaResult {
  const q = round.questions[round.index];
  const right = q.answers[0];
  const shown = /^[0-9]/.test(right) ? right : right.charAt(0).toUpperCase() + right.slice(1);
  const next: TriviaRound = { ...round, index: round.index + 1 };
  return { correct: false, line: `It's ${shown}.${q.note ? ' ' + q.note : ''}`, round: next, finished: next.index >= next.questions.length };
}

const RIGHT_LINES = ["That's it.", 'Yes.', 'Right.', 'You know that one.', 'Got it.', 'Exactly.'];

function pick<T>(items: readonly T[], seed: number): T {
  return items[Math.abs(seed) % items.length];
}

/** What Max says when the round is done. */
export function triviaSummary(round: TriviaRound): string {
  const n = round.questions.length;
  if (round.score === n) return `${n} out of ${n}. Nobody beats that.`;
  if (round.score >= n * 0.7) return `${round.score} out of ${n}. Good going.`;
  if (round.score >= n * 0.4) return `${round.score} out of ${n}. Not bad for the middle of the night.`;
  return `${round.score} out of ${n}. The questions were unfair. Another round?`;
}

// --- Riddles -----------------------------------------------------------------

export function newRiddleSet(random: () => number = Math.random): Riddle[] {
  return shuffle(RIDDLES, random);
}

export function riddleMatches(riddle: Riddle, given: string): boolean {
  return answerMatches(given, riddle.answers);
}

// --- Word chain ---------------------------------------------------------------

export interface ChainState {
  /** Every word played so far, in order, lowercase. */
  words: string[];
  /** Whose turn it is next. */
  turn: 'you' | 'max';
}

export type ChainVerdict =
  | { ok: true; state: ChainState; maxWord?: string; line: string }
  | { ok: false; line: string };

export function lastLetter(word: string): string {
  return word.charAt(word.length - 1);
}

/** Max opens with a word. */
export function startChain(random: () => number = Math.random): ChainState {
  const first = CHAIN_WORDS[Math.floor(random() * CHAIN_WORDS.length)];
  return { words: [first], turn: 'you' };
}

/** Max's reply to their word: a word starting with its last letter, unused. Undefined when she has none left. */
export function maxChainWord(state: ChainState, random: () => number = Math.random): string | undefined {
  const need = lastLetter(state.words[state.words.length - 1]);
  const used = new Set(state.words);
  const options = CHAIN_WORDS.filter((w) => w.startsWith(need) && !used.has(w));
  if (options.length === 0) return undefined;
  return options[Math.floor(random() * options.length)];
}

/**
 * Their turn. A word must start with the last letter of the previous one, be
 * letters only, three or more of them, and not already played. Nobody checks
 * the dictionary at 3 a.m.; Max takes their word for it.
 */
export function playChainWord(state: ChainState, raw: string, random: () => number = Math.random): ChainVerdict {
  const word = raw.trim().toLowerCase().replace(/[^a-z]/g, '');
  const previous = state.words[state.words.length - 1];
  const need = lastLetter(previous);
  if (word.length < 3) return { ok: false, line: 'Three letters or more, and just the one word.' };
  if (!word.startsWith(need)) return { ok: false, line: `It has to start with ${need.toUpperCase()}, the last letter of "${previous}".` };
  if (state.words.includes(word)) return { ok: false, line: `"${word}" has been played. Another one.` };
  const afterYou: ChainState = { words: [...state.words, word], turn: 'max' };
  const reply = maxChainWord(afterYou, random);
  if (!reply) {
    return { ok: true, state: { words: afterYou.words, turn: 'you' }, line: `"${word}". I've got nothing for ${lastLetter(word).toUpperCase()}. You win that one. Again?` };
  }
  const next: ChainState = { words: [...afterYou.words, reply], turn: 'you' };
  return { ok: true, state: next, maxWord: reply, line: `"${word}". Mine is "${reply}". You need ${lastLetter(reply).toUpperCase()}.` };
}

// --- Talk ------------------------------------------------------------------------

export function talkPrompts(random: () => number = Math.random): string[] {
  return shuffle(TALK_PROMPTS, random);
}

// --- Check-ins ----------------------------------------------------------------------

export const CHECK_IN_INTERVALS_MIN = [15, 30, 60] as const;
export type CheckInInterval = (typeof CHECK_IN_INTERVALS_MIN)[number];

/** "2:40 AM" in the phone's own words. */
export function clockWords(date: Date): string {
  const h = date.getHours();
  const m = date.getMinutes();
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m < 10 ? '0' : ''}${m} ${h < 12 ? 'AM' : 'PM'}`;
}

/** The same, from a timestamp. For a screen that keeps the time as a number. */
export function clockWordsAt(ms: number): string {
  return clockWords(new Date(ms));
}

/** A word about daylight, when the hour has one. */
export function dawnWords(date: Date): string {
  const h = date.getHours();
  if (h >= 0 && h < 4) return 'Daylight is a few hours off.';
  if (h >= 4 && h < 6) return 'Daylight is getting close.';
  if (h >= 6 && h < 8) return 'It is nearly light.';
  return '';
}

/** The nth check-in line, filled in for this moment. */
export function checkInLine(n: number, now: Date): string {
  const raw = CHECK_IN_LINES[Math.abs(n) % CHECK_IN_LINES.length];
  return raw
    .replace('{time}', clockWords(now))
    .replace('{dawn}', dawnWords(now))
    .replace(/\s{2,}/g, ' ')
    .replace(/^\.\s*/, '')
    .trim();
}
