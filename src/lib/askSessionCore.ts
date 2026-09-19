/**
 * One question at a time, and nothing carried over between them.
 *
 * The library's chat session remembers every question and answer and sends
 * the whole conversation to the model again with each new question. That is
 * what a chat wants. It is the opposite of what Max wants: each question
 * arrives with its own articles — around 1,300 tokens of them — so by the
 * second or third question the model was being handed more than it can hold.
 * Here every question starts the model from zero with the standing
 * instructions and that one question, and only that.
 *
 * It also settles who is talking. The model can do one thing at a time, and
 * asking it something while it is still writing throws "Runner is already in
 * use" — which is exactly what happened when the voice button committed the
 * same words twice. Now a new question stops whatever is being written, waits
 * for the model to actually let go, and then goes.
 *
 * Nothing in this file touches the phone. The native half — the model, its
 * thread, the chat template — is in askSession.ts. This is the part that can
 * be run on a desk, so it is.
 */

export interface AskStats {
  numPromptTokens: number;
  numGeneratedTokens: number;
  inferenceStartMs: number;
  inferenceEndMs: number;
}

export interface AskAnswer {
  /** Everything the model wrote, with the end-of-text marker left out. */
  text: string;
  /** Absent when the question never reached the model (see `superseded`). */
  stats?: AskStats;
  /** True when stop() or a newer question cut this one off. */
  stoppedEarly: boolean;
  /** True when a newer question arrived before this one started, so it was skipped. */
  superseded: boolean;
}

export interface AskSession {
  /**
   * Answers one question from scratch. Whatever the model is writing right now
   * is stopped first.
   * @param question The full prompt for this question: articles and all.
   * @param onToken Each piece of the answer as it is written.
   */
  ask(question: string, onToken?: (token: string) => void): Promise<AskAnswer>;
  /** Stops the answer being written. The pending ask() resolves with what it has. */
  stop(): void;
  /** The most tokens the model can hold at once: prompt and answer together. */
  readonly contextWindow: number;
  dispose(): void;
}

/**
 * The generation settings a one-question session must run with.
 *
 * The engine's `echo` setting is ON by default and repeats the prompt back
 * through the token callback as if the model had written it. The library's
 * chat session never notices, because the only thing it hands generate() is
 * a one-line assistant header. This session hands it the whole prompt —
 * instructions, articles and all — and on a real phone every word of that
 * came back as "the answer" and was read out loud. Off, always, whatever the
 * caller passes.
 */
export function oneShotGenerationConfig<T extends object>(config: T): T & { echo: false } {
  return { ...config, echo: false };
}

export interface AskSessionParts<P> {
  runner: {
    /** Empties the model's memory of the previous question. */
    reset(): void;
    /** Asks the model to stop writing. Only lands once it is actually writing. */
    stop(): void;
  };
  /** Turns a question into whatever the model needs to be handed. */
  render(question: string): P;
  /** Runs the model on its own thread and resolves when it is done or stopped. */
  generate(prompt: P, onToken?: (token: string) => void): Promise<{ response: string; stats: AskStats }>;
  /** Tidy-up after every question, finished or not. */
  afterTurn?(): void;
  contextWindow: number;
  dispose(): void;
  /** How often stop() is repeated at a busy model, in milliseconds. */
  nudgeEveryMs?: number;
}

export function buildAskSession<P>(parts: AskSessionParts<P>): AskSession {
  const { runner, render, generate, afterTurn, contextWindow, dispose } = parts;
  const nudgeEveryMs = parts.nudgeEveryMs ?? 100;

  // Questions run strictly one after another, in the order asked.
  let chain: Promise<unknown> = Promise.resolve();
  // The ticket of the newest question. An older one still waiting its turn is
  // skipped rather than answered into the void.
  let latest = 0;
  // The question the model is on right now, if any.
  let current: { run: Promise<unknown>; nudge?: ReturnType<typeof setInterval> } | undefined;
  let stopAsked = false;

  const quietStop = () => {
    try {
      runner.stop();
    } catch {
      // Already disposed. Nothing left to stop.
    }
  };

  const interrupt = () => {
    if (!current) return;
    stopAsked = true;
    if (current.nudge) return;
    // A stop lands only while tokens are being written; one sent while the
    // prompt is still being read in is thrown away when writing begins. So it
    // is repeated until the run actually lets go.
    quietStop();
    const nudge = setInterval(quietStop, nudgeEveryMs);
    current.nudge = nudge;
    const done = () => clearInterval(nudge);
    void current.run.then(done, done);
  };

  const runOne = async (
    ticket: number,
    question: string,
    onToken?: (token: string) => void
  ): Promise<AskAnswer> => {
    if (ticket !== latest) {
      return { text: '', stoppedEarly: true, superseded: true };
    }
    stopAsked = false;
    runner.reset();
    const prompt = render(question);
    const run = generate(prompt, onToken);
    current = { run };
    try {
      const { response, stats } = await run;
      return { text: response, stats, stoppedEarly: stopAsked, superseded: false };
    } finally {
      current = undefined;
      try {
        afterTurn?.();
      } catch {
        // Disposed underneath a question that was still being written. The
        // answer, or the error, is what matters; the tidy-up is not.
      }
    }
  };

  return {
    contextWindow,
    ask(question, onToken) {
      const ticket = ++latest;
      interrupt();
      const turn = chain.then(() => runOne(ticket, question, onToken));
      chain = turn.then(
        () => undefined,
        () => undefined
      );
      return turn;
    },
    stop() {
      interrupt();
    },
    dispose,
  };
}
