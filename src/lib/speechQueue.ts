/**
 * Plays synthesized speech as it is made.
 *
 * The natural voice hands back audio one phrase at a time, each taking a
 * moment to make. Waiting for the whole answer before saying a word would put
 * a long silence in front of every sentence Max speaks. So each phrase is
 * queued for the speaker the moment it exists, and the first one starts
 * playing while the rest are still being made.
 *
 * Nothing in this file touches the speaker or the model. The audio queue and
 * the buffers are handed in, which is what lets the timing here be tested on
 * a desk. The shape follows the library's own gallery app, which plays the
 * same voice the same way.
 */

export interface PcmChunk {
  readonly audio: Float32Array;
  readonly sampleRate: number;
}

/** The slice of an audio buffer queue this needs. */
export interface BufferQueueLike<B> {
  enqueueBuffer(buffer: B): string;
  start(when?: number, offset?: number): void;
  stop(when?: number): void;
  clearBuffers(): void;
  onBufferEnded: ((event: { bufferId: string; isLastBufferInQueue: boolean }) => void) | null | undefined;
}

export interface PlayHandle {
  /**
   * Settles once the last phrase has been heard, or once stop() was called
   * AND the phrase being made at that moment has finished being made — the
   * model can only make one thing at a time, so the next request has to
   * wait for that before it can start.
   */
  readonly done: Promise<void>;
  /** Silence now. Whatever was queued is dropped. */
  stop(): void;
}

export function playChunks<B>(
  chunks: AsyncIterable<PcmChunk>,
  queue: BufferQueueLike<B>,
  makeBuffer: (chunk: PcmChunk) => B,
  hooks: { onFirstAudio?: () => void } = {}
): PlayHandle {
  let stopped = false;
  let started = false;
  let streamDone = false;
  let lastEnqueued: string | undefined;
  let lastEnded: string | undefined;

  let resolvePlayed: () => void = () => {};
  const played = new Promise<void>((resolve) => {
    resolvePlayed = resolve;
  });

  const settleIfFinished = () => {
    if (!streamDone) return;
    // Nothing was ever queued, or the last thing queued has been heard.
    if (lastEnqueued === undefined || lastEnded === lastEnqueued) resolvePlayed();
  };

  queue.onBufferEnded = (event) => {
    lastEnded = event.bufferId;
    settleIfFinished();
  };

  const stop = () => {
    if (stopped) return;
    stopped = true;
    try {
      queue.clearBuffers();
    } catch {
      // Already gone.
    }
    try {
      queue.stop();
    } catch {
      // Already stopped.
    }
    resolvePlayed();
  };

  const feed = (async () => {
    for await (const chunk of chunks) {
      if (stopped) break;
      lastEnqueued = queue.enqueueBuffer(makeBuffer(chunk));
      if (!started) {
        started = true;
        queue.start(0, 0);
        hooks.onFirstAudio?.();
      }
    }
    streamDone = true;
    settleIfFinished();
  })();

  const done = (async () => {
    try {
      await feed;
    } catch (error) {
      stop();
      throw error;
    }
    await played;
  })();

  return { done, stop };
}
