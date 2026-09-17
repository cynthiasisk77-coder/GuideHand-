// Who the app is talking to.
//
// Everything in here is written for a generic person, because an article has
// to be. But the person reading it at three in the morning is not generic —
// they have a name, and a body with a history. An app that knows somebody is
// asthmatic, or carries an EpiPen, or is on a blood thinner, can point at the
// part of the article that matters to them instead of handing over the same
// page it hands everyone.
//
// This is the most sensitive thing in the app. It is stored encrypted, it is
// never sent anywhere, and the model reading it runs on the phone.

import { ABOUT_YOU_KEY } from '@/lib/personalData';
import { secureGetItem, secureSetItem } from '@/lib/secureData';

export interface AboutYou {
  /** What to call them. Used to address them directly. */
  name: string;
  /** Anything they want the app to know — in their own words. */
  about: string;
  allergies: string;
  conditions: string;
  medications: string;
  bloodType: string;
}

export function emptyAboutYou(): AboutYou {
  return { name: '', about: '', allergies: '', conditions: '', medications: '', bloodType: '' };
}

export function parseAboutYou(raw: string | null | undefined): AboutYou {
  if (!raw) return emptyAboutYou();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return emptyAboutYou();
    const r = parsed as Record<string, unknown>;
    const text = (value: unknown) => (typeof value === 'string' ? value : '');
    return {
      name: text(r.name),
      about: text(r.about),
      allergies: text(r.allergies),
      conditions: text(r.conditions),
      medications: text(r.medications),
      bloodType: text(r.bloodType),
    };
  } catch {
    return emptyAboutYou();
  }
}

export async function loadAboutYou(): Promise<AboutYou> {
  try {
    return parseAboutYou(await secureGetItem(ABOUT_YOU_KEY));
  } catch {
    return emptyAboutYou();
  }
}

export async function saveAboutYou(about: AboutYou): Promise<void> {
  await secureSetItem(ABOUT_YOU_KEY, JSON.stringify(about));
}

/** True when there is anything worth telling the model. */
export function hasAnything(about: AboutYou): boolean {
  return Object.values(about).some((value) => value.trim().length > 0);
}

/**
 * The profile as a few lines for the model, or an empty string when there is
 * nothing to say.
 *
 * Deliberately terse. This rides on top of the articles in a context window of
 * about two thousand tokens, and every line spent here is a line of actual
 * guidance that does not fit.
 */
export function aboutYouLines(about: AboutYou): string {
  const lines: string[] = [];
  const add = (label: string, value: string) => {
    const trimmed = value.trim();
    if (trimmed) lines.push(`- ${label}: ${trimmed}`);
  };
  add('Name', about.name);
  add('Allergic to', about.allergies);
  add('Ongoing conditions', about.conditions);
  add('Takes', about.medications);
  add('Blood type', about.bloodType);
  add('Also', about.about);
  return lines.join('\n');
}
