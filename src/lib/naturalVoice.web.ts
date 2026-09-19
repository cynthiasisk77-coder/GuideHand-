// The browser has no on-device voice model. Every question here is answered
// "no", and the picker shows only the browser's own voices.

import type { NaturalVoiceId } from '@/lib/voiceChoice';

export type NaturalVoiceState =
  | { kind: 'absent' }
  | { kind: 'downloading'; percent: number }
  | { kind: 'loading' }
  | { kind: 'ready' }
  | { kind: 'error'; message: string };

export function naturalVoiceSupported(): boolean {
  return false;
}

export function naturalVoiceState(): NaturalVoiceState {
  return { kind: 'absent' };
}

export function subscribeNaturalVoice(_listener: (state: NaturalVoiceState) => void): () => void {
  return () => {};
}

export function isNaturalVoiceReady(): boolean {
  return false;
}

export async function isNaturalVoiceOnPhone(): Promise<boolean> {
  return false;
}

export async function prepareNaturalVoice(_options: { allowDownload: boolean }): Promise<boolean> {
  return false;
}

export async function speakNaturally(
  _text: string,
  _voice: NaturalVoiceId,
  handlers: { onDone?: () => void; onError?: () => void }
): Promise<void> {
  handlers.onError?.();
}

export function stopNatural(): void {}
