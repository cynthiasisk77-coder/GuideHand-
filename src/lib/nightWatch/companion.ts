// Max keeping somebody company. Not advice; company.
//
// Ask hands the model articles and forbids it to speak from memory, because
// medicine from a small model's memory is how people get hurt. Night Watch is
// the other job: a person alone at 3 a.m. with a generator to watch, who does
// not need a page read to them, they need somebody to talk to. So the rules
// here are about manner, and the one hard rule is the same as Ask's, turned
// around: when they ask what to DO about something, Max does not answer from
// memory; she sends them to Ask, where the app's own page is waiting.
//
// The conversation goes to the model as real turns through its own chat
// template, not as a transcript pasted into one message. On the desk, the
// pasted transcript made the 1B model carry on writing both sides of the
// conversation like a script; as turns, it answers once and stops.
//
// Pure. The prompt is built here and tested on a desk against the real model.

import { buildAskContext } from '@/lib/askContext';
import type { ChatTurn } from '@/lib/askSessionCore';

export const COMPANION_PROMPT = [
  'You are Max, the warm, friendly, steady friend inside the GuideHand app, keeping',
  'somebody company through a long night: a power cut, a storm, a watch over a',
  'generator or a sick relative. Tonight you are company, not a manual.',
  '',
  'How you talk: like a kind friend at the kitchen table. Short, warm, plain,',
  'curious about them. Two to four sentences, unless they ask for a story. Ask a',
  'gentle question back now and then. Say their name once if you know it. Play',
  'along with word games and riddles when they want them. Write only your own',
  'reply, as Max, and then stop. Never write their side of the conversation.',
  '',
  'No empty comfort. Never say "calm down", "I understand", "don\'t cry", "it could',
  'be worse", "everything will be fine", or "stay positive". When it is a hard',
  'night, say so, and stay with the next five minutes.',
  '',
  'Rules you must follow exactly:',
  '- If they ask what to do about an injury, a symptom, a danger, a medicine, or',
  '  a repair, do not answer from memory. Say that Ask Max can read them the',
  "  app's own page on it, and keep them company while they go there.",
  '- If you are not sure of a fact, say you are not sure.',
  '- Never pretend to know where they are or what time it is unless they said.',
  '- Keep each reply short. The person may be tired.',
].join('\n');

export interface Turn {
  who: 'you' | 'max';
  text: string;
}

/** What the model may hold of the conversation, in characters. Roughly 600 tokens. */
export const TRANSCRIPT_CHARS = 2400;

/** How much a reply may run to, in tokens. Stories get the long one. */
export const REPLY_TOKENS = 160;
export const STORY_TOKENS = 420;
/** Warmer than Ask's 0.3: conversation and stories want some life in them. */
export const COMPANION_TEMPERATURE = 0.6;

export function wantsStory(text: string): boolean {
  return /\b(story|tale|once upon)\b/i.test(text);
}

/**
 * The recent conversation as chat turns, oldest first, the oldest dropped
 * when it gets long. The model answers as the assistant.
 */
export function historyTurns(turns: readonly Turn[], limit: number = TRANSCRIPT_CHARS): ChatTurn[] {
  const kept: ChatTurn[] = [];
  let size = 0;
  for (let i = turns.length - 1; i >= 0; i--) {
    const text = turns[i].text.trim();
    if (!text) continue;
    if (size + text.length > limit) break;
    kept.unshift({ role: turns[i].who === 'you' ? 'user' : 'assistant', content: text });
    size += text.length;
  }
  return kept;
}

export interface CompanionInput {
  system: string;
  history: ChatTurn[];
  user: string;
  temperature: number;
  maxNewTokens: number;
}

/**
 * Something the model is not allowed to answer from memory, which the app
 * has a real page about. When this finds one, the screen shows the page and
 * offers Ask, before the model's reply, so nobody takes companionship for
 * guidance. The model is told too, in the turn itself: a small model follows
 * a note in front of it better than a rule three screens up.
 */
export interface Bridge {
  title: string;
  categorySlug: string;
  topicSlug: string;
}

export function buildCompanionInput(turns: readonly Turn[], latest: string, name?: string, bridge?: Bridge): CompanionInput {
  const first = firstName(name);
  const system = first ? `${COMPANION_PROMPT}\n\nTheir name is ${first}.` : COMPANION_PROMPT;
  const asked = latest.trim();
  const story = wantsStory(asked);
  // A note in the turn itself. On the desk the 1B model answered "tell me a
  // story" with "You want a story?"; told plainly, in front of it, it tells
  // one. Told nothing more, it made the person the hero of it, and then kept
  // narrating in the next turn, so the notes say that too.
  const justToldStory = !story && wasStory(turns[turns.length - 1]);
  const note = bridge
    ? `(Note for Max: GuideHand has its own page on this, called "${bridge.title}". Do not give steps or advice yourself. Tell them that page is waiting in Ask Max, and keep them company.)`
    : story
      ? '(Note for Max: they asked for a story. Tell one now, eight to twelve sentences, gentle, with an ending, about made-up characters, not about them. No questions back until it is told.)'
      : justToldStory
        ? '(Note for Max: the story is finished. Answer as yourself now, to them, in two to four plain sentences.)'
        : '';
  const user = note ? `${asked}\n\n${note}` : asked;
  return {
    system,
    history: historyTurns(turns),
    user,
    temperature: COMPANION_TEMPERATURE,
    maxNewTokens: story ? STORY_TOKENS : REPLY_TOKENS,
  };
}

/** A turn of Max's long enough to have been a story. */
export function wasStory(turn: Turn | undefined): boolean {
  return !!turn && turn.who === 'max' && turn.text.length > 500;
}

/**
 * They are asking what to DO. That question never goes to the model: Max
 * answers with a fixed line and the app's page, whatever the model might
 * have said. On the desk, told to point at the page, the model said "I'm
 * not sure, it's a pretty uncomfortable feeling" to a tight chest. A rule
 * that depends on a small model obeying it is not a rule.
 */
const ASKING_FOR_STEPS = /\b(how (do|can|should|would) (i|we|you)|what (do|should|can) (i|we) do|what (should|do) i|should (i|we)|is it (safe|ok|okay|normal|bad)|can (i|we)|what if|help me|what('s| is) wrong|do i need|what (does|do) (this|that|it) mean)\b/i;

export function asksForSteps(text: string): boolean {
  return ASKING_FOR_STEPS.test(text);
}

/** Max's own line for a what-do-I-do question. Never the model's. */
export function handOffLine(bridge: Bridge | undefined, name?: string): string {
  const first = firstName(name);
  const who = first ? `${first}, that` : 'That';
  if (bridge) {
    return `${who} is one I won't answer from memory. GuideHand has its own page on it, "${bridge.title}", and Ask Max will read it to you. Go there, and I'm right here after.`;
  }
  return `${who} is one I won't answer from memory. Ask Max searches the app's own pages for it; take it there, and I'm right here after.`;
}

const ACTION_WORDS = /\b(how (do|can|should) i|what (do|should) i do|should i|is it (safe|ok|okay)|can i|what if|help|hurt|hurts|bleeding|pain|fever|sick|vomit|breath|breathe|chest|burn|cut|broke|broken|poison|medicine|pill|dose|leak|leaking|smell|smoke|gas|generator|carbon|flood|freezing|frostbite|shock|unconscious|choking|allerg)\b/i;

export function findBridge(text: string): Bridge | undefined {
  if (!ACTION_WORDS.test(text)) return undefined;
  const context = buildAskContext(text);
  if (context.empty || context.articles.length === 0) return undefined;
  const top = context.articles[0];
  return { title: top.title, categorySlug: top.categorySlug, topicSlug: top.topicSlug };
}

/**
 * The model's reply with the script trimmed off it. Even as chat turns a
 * small model sometimes labels its line "Max:" or carries on into "Cynthia:
 * ...". Everything from the first line that belongs to somebody else is cut,
 * a label on Max's own line is dropped, and stage directions in brackets or
 * asterisks go too. What is left is what Max said.
 */
export function tidyReply(raw: string, name?: string): string {
  const first = firstName(name);
  const others = ['Them', 'You', 'User', 'Human', 'Person', 'Assistant', 'Max'].concat(first ? [first] : []);
  const label = new RegExp(`^\\s*(?:${others.map(escapeRegExp).join('|')})\\s*(?:\\([^)]*\\))?\\s*:\\s*`, 'i');
  const lines = raw
    .replace(/<\|[^|>]*\|>/g, '\n')
    .replace(/^\s*(assistant|system|user)\s*$/gim, '')
    .split('\n');
  const kept: string[] = [];
  let seenWords = false;
  for (const line of lines) {
    let text = line.trim();
    if (!text) {
      if (kept.length > 0 && kept[kept.length - 1] !== '') kept.push('');
      continue;
    }
    // Stage directions: "*leans in*", "(smiles)".
    if (/^\*[^*]+\*$/.test(text) || /^\([^)]+\)$/.test(text)) continue;
    const m = text.match(label);
    if (m) {
      const who = m[0].replace(/[:\s()]/g, '').toLowerCase();
      const isMax = who.startsWith('max') || who.startsWith('assistant');
      // Somebody else's line, after Max has spoken: the script starts here.
      if (!isMax && seenWords) break;
      text = text.slice(m[0].length);
      // "Max: Cynthia: ..." is Max addressing them; the second label goes too.
      let again = text.match(label);
      while (again) {
        text = text.slice(again[0].length);
        again = text.match(label);
      }
      if (!text) continue;
      if (!isMax) {
        // The reply opened as the other person and there is nothing of Max's
        // yet. Take the words, since that is all there is, and stop there.
        kept.push(text);
        break;
      }
    }
    kept.push(text);
    seenWords = true;
  }
  return kept
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function firstName(name?: string): string | undefined {
  const trimmed = name?.trim();
  return trimmed ? trimmed.split(/\s+/)[0] : undefined;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Max's opening line for the night. */
export function opener(name?: string, now: Date = new Date()): string {
  const first = firstName(name);
  const h = now.getHours();
  const late = h >= 22 || h < 5;
  const hello = first ? `Hi ${first}, it's Max.` : "Hi, it's Max.";
  return late
    ? `${hello} It's late and I'm not going anywhere. Talk to me, or pick something from below and we'll pass the time.`
    : `${hello} I'm here for as long as you want. Talk to me, or pick something from below and we'll pass the time.`;
}
