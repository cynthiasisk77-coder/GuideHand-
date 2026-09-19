// Max's own voice: a small speech model that lives on the phone.
//
// The phone's built-in voices are flat, and she said so. This is the Kokoro
// model from the same library the answers come from — about 350 MB once,
// then it works with no signal like everything else here — and it sounds
// like a person. It is optional: nothing downloads until she asks for it on
// the voice screen, and until then Max uses the phone's voice.
//
// One copy for the whole app, not one per screen. A voice is used from the
// Ask screen and from every article's "Read it to me", and loading 350 MB
// into memory twice to serve both would be absurd.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AudioContext } from 'react-native-audio-api';
import {
  createKokoroTextToSpeech,
  download,
  KOKORO_SAMPLE_RATE,
  models,
  type KokoroTextToSpeech,
} from 'react-native-executorch';
import { createWorkletRuntime, type WorkletRuntime } from 'react-native-worklets';

import { playChunks, type PlayHandle } from '@/lib/speechQueue';
import type { NaturalVoiceId } from '@/lib/voiceChoice';

export type NaturalVoiceState =
  | { kind: 'absent' }
  | { kind: 'downloading'; percent: number }
  | { kind: 'loading' }
  | { kind: 'ready' }
  | { kind: 'error'; message: string };

// Remembers that the files finished downloading once, the same way Ask
// remembers its model. Reading an answer aloud must never start a 350 MB
// download on its own; only the voice screen may do that.
const DOWNLOADED_KEY = 'guidehand.natural-voice.downloaded.v1';

// A touch under the model's natural pace. Someone following a step while
// doing it needs a beat between sentences.
const NATURAL_SPEED = 0.95;

// The English pack, on the CPU. The model table's DEFAULT picks this on
// Android anyway; naming it keeps the choice visible.
const PACK = models.textToSpeech.KOKORO.EN_US.XNNPACK_FP32;
type Voice = KokoroTextToSpeech<keyof typeof PACK.voices>;

// Its own thread, made the first time the voice is loaded. The answer model
// runs on the library's default one, and sharing it would make the voice
// wait for a whole answer to be written before it could say a word.
let voiceThread: WorkletRuntime | undefined;
function thread(): WorkletRuntime {
  voiceThread ??= createWorkletRuntime({ name: 'GuideHandVoice' });
  return voiceThread;
}

let state: NaturalVoiceState = { kind: 'absent' };
const listeners = new Set<(state: NaturalVoiceState) => void>();
let engine: Voice | undefined;
let preparing: Promise<boolean> | undefined;

function setState(next: NaturalVoiceState) {
  state = next;
  listeners.forEach((listener) => listener(next));
}

export function naturalVoiceSupported(): boolean {
  return true;
}

export function naturalVoiceState(): NaturalVoiceState {
  return state;
}

export function subscribeNaturalVoice(listener: (state: NaturalVoiceState) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function isNaturalVoiceReady(): boolean {
  return engine !== undefined;
}

export async function isNaturalVoiceOnPhone(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(DOWNLOADED_KEY)) === 'yes';
  } catch {
    return false;
  }
}

/**
 * Downloads the voice if allowed and not yet on the phone, then loads it.
 * Resolves true once it can speak. Safe to call from anywhere, any number of
 * times: one download, one load, everybody waits on the same one.
 */
export function prepareNaturalVoice(options: { allowDownload: boolean }): Promise<boolean> {
  if (engine) return Promise.resolve(true);
  if (preparing) return preparing;
  preparing = (async () => {
    try {
      const onPhone = await isNaturalVoiceOnPhone();
      if (!onPhone && !options.allowDownload) return false;
      setState({ kind: 'downloading', percent: onPhone ? 100 : 0 });
      const files = await download(PACK, {
        onProgress: (progress) => {
          // Reported as a fraction. Shown as a percentage, never past 100.
          const percent = Math.max(0, Math.min(100, Math.round(progress * 100)));
          setState({ kind: 'downloading', percent });
        },
      });
      await AsyncStorage.setItem(DOWNLOADED_KEY, 'yes').catch(() => {});
      setState({ kind: 'loading' });
      engine = await createKokoroTextToSpeech(files, thread());
      setState({ kind: 'ready' });
      return true;
    } catch (error) {
      setState({ kind: 'error', message: error instanceof Error ? error.message : String(error) });
      return false;
    } finally {
      preparing = undefined;
    }
  })();
  return preparing;
}

// --- Speaking --------------------------------------------------------------

let context: AudioContext | undefined;
let current: PlayHandle | undefined;
// Speaking happens strictly one thing after another: the model refuses to
// make two things at once, so a new request waits for the old one to let go.
let chain: Promise<unknown> = Promise.resolve();

async function speaker(): Promise<AudioContext> {
  if (!context || context.state === 'closed') {
    context = new AudioContext({ sampleRate: KOKORO_SAMPLE_RATE });
  }
  if (context.state === 'suspended') await context.resume();
  return context;
}

/** Silence now, and tell the model to stop making more. */
export function stopNatural(): void {
  try {
    engine?.synthesizeStop();
  } catch {
    // Nothing being made.
  }
  current?.stop();
  current = undefined;
}

/**
 * Says the text in Max's voice, stopping anything already being said.
 * onDone fires when the last word has been heard; onError, with the reason,
 * when the voice could not speak at all, so the caller can fall back to the
 * phone's and say why.
 */
export function speakNaturally(
  text: string,
  voice: NaturalVoiceId,
  handlers: { onDone?: () => void; onError?: (message: string) => void }
): Promise<void> {
  stopNatural();
  const run = chain.then(async () => {
    const tts = engine;
    if (!tts) {
      handlers.onError?.('the voice is not loaded');
      return;
    }
    let source: ReturnType<AudioContext['createBufferQueueSource']> | undefined;
    try {
      const ctx = await speaker();
      source = ctx.createBufferQueueSource();
      source.connect(ctx.destination);
      const handle = playChunks(tts.synthesize(text, { voice, speed: NATURAL_SPEED }), source, (chunk) => {
        const buffer = ctx.createBuffer(1, chunk.audio.length, chunk.sampleRate);
        buffer.copyToChannel(chunk.audio as Float32Array<ArrayBuffer>, 0);
        return buffer;
      });
      current = handle;
      await handle.done;
      if (current === handle) {
        current = undefined;
        handlers.onDone?.();
      }
    } catch (error) {
      handlers.onError?.(error instanceof Error ? error.message : String(error));
    } finally {
      try {
        source?.disconnect();
      } catch {
        // Already disconnected.
      }
    }
  });
  chain = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}
