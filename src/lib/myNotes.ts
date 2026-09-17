// Your own writing, answerable by the app's own AI.
//
// The app ships with 427 articles and can download more, and all of them are
// about what is generally true. None of them know where your well shutoff is,
// which neighbour has the tractor, how the generator has to be coaxed, or what
// your mother is actually allergic to. That knowledge is the most valuable
// thing in any household and it lives in somebody's head.
//
// A note written here goes into the same registry downloaded packs go into, so
// it becomes searchable and the AI can answer from it and cite it — without a
// single change to the AI. It never leaves the phone, and it is stored
// encrypted like everything else personal.

import { MY_NOTES_KEY } from '@/lib/personalData';
import { secureGetItem, secureSetItem } from '@/lib/secureData';
import type { ContentPack } from '@/lib/packTypes';

/** The shelf your own notes sit on. Its own name so they are never mistaken for the app's. */
export const MY_NOTES_CATEGORY = 'Your Own Notes';
export const MY_NOTES_PACK_ID = 'my-notes';

export interface MyNote {
  id: string;
  title: string;
  /** One line per step or paragraph, the same shape every article uses. */
  guidance: string[];
  updatedAt: number;
}

export function newNoteId(): string {
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function emptyNote(): MyNote {
  return { id: newNoteId(), title: '', guidance: [], updatedAt: Date.now() };
}

/** Blank lines are how people space their typing; they are not content. */
export function linesFromText(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function textFromLines(guidance: string[]): string {
  return guidance.join('\n');
}

/** A note with no title or nothing written in it is a draft, not a note. */
export function isUsable(note: MyNote): boolean {
  return note.title.trim().length > 0 && note.guidance.length > 0;
}

export function parseNotes(raw: string | null | undefined): MyNote[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((n): n is Record<string, unknown> => !!n && typeof n === 'object')
      .map((n) => ({
        id: String(n.id ?? newNoteId()),
        title: String(n.title ?? ''),
        guidance: Array.isArray(n.guidance) ? n.guidance.map(String).filter(Boolean) : [],
        updatedAt: typeof n.updatedAt === 'number' ? n.updatedAt : 0,
      }));
  } catch {
    return [];
  }
}

export async function loadMyNotes(): Promise<MyNote[]> {
  try {
    return parseNotes(await secureGetItem(MY_NOTES_KEY));
  } catch {
    return [];
  }
}

export async function saveMyNotes(notes: MyNote[]): Promise<void> {
  await secureSetItem(MY_NOTES_KEY, JSON.stringify(notes));
}

/**
 * The notes dressed as a content pack, which is the only thing the registry
 * knows how to hold. Nothing downstream needs to learn what a note is — search
 * and the AI already read packs.
 *
 * Half-written notes are left out: an article with a title and no body would
 * show up in search as a dead end.
 */
export function notesAsPack(notes: MyNote[]): ContentPack | undefined {
  const usable = notes.filter(isUsable);
  if (usable.length === 0) return undefined;
  return {
    id: MY_NOTES_PACK_ID,
    name: 'Your own notes',
    version: 1,
    license: 'Yours. Written on this phone, stored encrypted, never sent anywhere.',
    attribution: 'You',
    articles: usable.map((note) => ({
      title: note.title.trim(),
      category: MY_NOTES_CATEGORY,
      priority: 'P1',
      // Named plainly so that when the AI cites it, it is obvious the answer
      // came from the household rather than from a sourced article.
      sources: ['Your own note'],
      guidance: note.guidance,
    })),
  };
}
