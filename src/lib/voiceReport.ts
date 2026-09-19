// What actually did the talking, in words a person can read.
//
// On a real phone a man's voice was chosen and a woman's came out. Max's own
// voice had quietly failed and the phone's stood in for it, and nothing on any
// screen said so. Every time something is read aloud, readAloud now records
// which voice spoke and, when it was not the one chosen, why. This file turns
// that record into a sentence.
//
// Pure: no native imports, so it can be checked on a desk and shown anywhere.

import type { NaturalVoiceState } from '@/lib/naturalVoice';
import { describeVoiceChoice, type VoiceChoice } from '@/lib/voiceChoice';

export interface VoiceReport {
  /** The voice that was asked for. */
  chosen: VoiceChoice;
  /** The voice that actually spoke. */
  used: 'natural' | 'phone';
  /** Why the phone's voice stood in, when it did. */
  reason?: string;
  at: number;
}

/** Why Max's own voice could not be used, from the state it was in. */
export function whyNotNatural(state: NaturalVoiceState, name: string): string {
  switch (state.kind) {
    case 'absent':
      return `${name}’s own voice is not on this phone yet. Download it on the voice screen.`;
    case 'downloading':
      return `${name}’s own voice is still downloading (${state.percent}%).`;
    case 'loading':
      return `${name}’s own voice is still loading. Try again in a moment.`;
    case 'error':
      return `${name}’s own voice could not start: ${state.message}`;
    case 'ready':
      return `${name}’s own voice was not ready in time.`;
  }
}

/** Why Max's own voice stopped partway through, from the error it raised. */
export function couldNotSpeak(message: string, name: string): string {
  return `${name}’s own voice could not speak: ${message}`;
}

/** True when the phone's voice stood in for a chosen natural one. The case worth showing. */
export function isStandIn(report: VoiceReport | undefined): report is VoiceReport {
  return report !== undefined && report.used === 'phone' && report.chosen.kind === 'natural';
}

export function describeVoiceReport(report: VoiceReport, name: string): string {
  const chosen = describeVoiceChoice(report.chosen);
  if (report.used === 'natural') return `${name} is speaking with ${chosen}.`;
  if (report.chosen.kind === 'natural') {
    return `The phone’s own voice is speaking instead of ${chosen}. ${report.reason ?? ''}`.trim();
  }
  const plain = chosen.startsWith('The ') ? `the ${chosen.slice(4)}` : chosen;
  return `${name} is speaking with ${plain}.`;
}
