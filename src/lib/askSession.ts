/**
 * The native half of Ask: the model, its thread, and the chat template.
 *
 * Built from the library's own public pieces — the downloader that already
 * has the model file on the phone, the runner, the template renderer — rather
 * than its chat session, because the chat session keeps a conversation and Max
 * must not. See askSessionCore.ts for why, and for everything that does not
 * need a phone.
 *
 * One model in memory, however many screens want it. Ask and Night Watch both
 * talk to Max, and a 1 GB model loaded twice is a phone that falls over. So a
 * session is shared: the first screen to ask for a model loads it, later
 * screens get the same one, and it is let go only when the last of them has
 * gone — after a short grace, so hopping from Ask to Night Watch does not
 * unload and reload the whole thing in between.
 */

import { useEffect, useSyncExternalStore } from 'react';
import RNBlobUtil from 'react-native-blob-util';
import { scheduleOnRN } from 'react-native-worklets';
import { createResourceScope, download, llm, wrapAsync } from 'react-native-executorch';

import { AskInput, AskSession, buildAskSession, oneShotGenerationConfig } from '@/lib/askSessionCore';

export type { AskAnswer, AskInput, AskSession, AskStats, ChatTurn } from '@/lib/askSessionCore';

export interface AskModelFiles {
  readonly modelPath: string;
  readonly tokenizerPath: string;
  readonly tokenizerConfigPath: string;
}

/** What a session hands the model for one question: the rendered prompt and the settings to write it with. */
interface Rendered {
  readonly prompt: llm.Prompt;
  readonly genConfig: llm.LLMGenerationConfig;
}

/**
 * Runs on the model's own thread, so the screen keeps drawing while it writes.
 * Everything it needs comes in as arguments: a worklet cannot reach back into
 * this file.
 */
function generateOnce(
  runner: llm.LLMRunner,
  prompt: llm.Prompt,
  options: {
    readonly genConfig: llm.LLMGenerationConfig;
    readonly eosToken: string;
    readonly onToken?: (token: string) => void;
  }
): { readonly response: string; readonly stats: llm.LLMGenerationStats } {
  'worklet';
  const { genConfig, eosToken, onToken } = options;
  let response = '';
  const stats = runner.generate(prompt, genConfig, (token: string) => {
    if (token === eosToken) return;
    response += token;
    if (onToken) scheduleOnRN(onToken, token);
  });
  return { response, stats };
}

/**
 * Loads a model that is already on the phone and hands back a session that
 * answers one question at a time. Every question carries its own standing
 * instructions; `defaultSystem` is used when a plain string is asked.
 */
export async function createAskSession(
  files: AskModelFiles,
  defaultSystem: string,
  genConfig: llm.LLMGenerationConfig
): Promise<AskSession> {
  const scope = createResourceScope();
  try {
    const rawConfig = await RNBlobUtil.fs.readFile(files.tokenizerConfigPath, 'utf8');
    const { chatTemplate, eosToken } = llm.parseTokenizerConfig(JSON.parse(rawConfig));
    const preprocessor = scope.track(llm.createChatPreprocessor({ chatTemplate }));
    const runner = scope.track(
      await wrapAsync(llm.createLLMRunner)(files.modelPath, files.tokenizerPath, [])
    );
    const generate = wrapAsync(generateOnce);
    // Read once, while nothing is running: the model is idle at this point and
    // the question is how much it can hold, which never changes.
    const contextWindow = runner.getKVCacheState().maxSeqLen;

    return buildAskSession<Rendered>({
      runner,
      contextWindow,
      render: (question: AskInput): Rendered => {
        const system = typeof question === 'string' ? defaultSystem : question.system;
        const user = typeof question === 'string' ? question : question.user;
        const overrides: llm.LLMGenerationConfig =
          typeof question === 'string'
            ? {}
            : {
                ...(question.temperature !== undefined ? { temperature: question.temperature } : {}),
                ...(question.maxNewTokens !== undefined ? { maxNewTokens: question.maxNewTokens } : {}),
              };
        const history = typeof question === 'string' ? [] : (question.history ?? []);
        const messages = [
          { role: 'system' as const, content: system },
          ...history.map((turn) => ({ role: turn.role, content: turn.content })),
          { role: 'user' as const, content: user },
        ];
        return {
          // Every message counted as new: the whole prompt is rendered from
          // scratch, which is the point of a session that carries nothing over.
          prompt: preprocessor.process(messages, messages.length, { addGenPrompt: true }),
          genConfig: oneShotGenerationConfig({ ...genConfig, ...overrides }),
        };
      },
      generate: (rendered, onToken) =>
        generate(runner, rendered.prompt, { genConfig: rendered.genConfig, eosToken, onToken }),
      afterTurn: () => preprocessor.clear(),
      dispose: scope.dispose,
    });
  } catch (error) {
    scope.dispose();
    throw error;
  }
}

// --- One shared session per model ------------------------------------------

interface Shared {
  /** How many screens are holding this model right now. */
  users: number;
  session?: AskSession;
  error?: Error;
  /** Download progress as the library reports it (0..1), or 100 once loading. */
  progress: number;
  /** What screens read. Replaced, never mutated, whenever anything above changes. */
  snapshot: AskSessionState;
  /** Set when the last user leaves; cancelled if another arrives in time. */
  release?: ReturnType<typeof setTimeout>;
}

export interface AskSessionState {
  readonly isReady: boolean;
  readonly session?: AskSession;
  readonly error?: Error;
  readonly downloadProgress: number;
}

const NOTHING_YET: AskSessionState = { isReady: false, downloadProgress: 0 };

const shared = new Map<string, Shared>();

// Long enough to walk from Ask to Night Watch and back; short enough that a
// closed screen does not pin a gigabyte in memory for long.
const RELEASE_GRACE_MS = 20_000;

function keyOf(files: AskModelFiles): string {
  return files.modelPath;
}

// Screens subscribe by model key, not by entry: a screen can be subscribed
// before its entry exists and after it has been let go.
const listeners = new Map<string, Set<() => void>>();

function subscribe(key: string, listener: () => void): () => void {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(listener);
  return () => {
    set?.delete(listener);
    if (set?.size === 0) listeners.delete(key);
  };
}

function snapshotOf(key: string): AskSessionState {
  return shared.get(key)?.snapshot ?? NOTHING_YET;
}

function notify(key: string, entry: Shared): void {
  entry.snapshot = {
    isReady: !!entry.session,
    session: entry.session,
    error: entry.error,
    downloadProgress: entry.progress,
  };
  listeners.get(key)?.forEach((listener) => listener());
}

async function load(entry: Shared, files: AskModelFiles, defaultSystem: string, genConfig: llm.LLMGenerationConfig) {
  const key = keyOf(files);
  try {
    const ready = await download(files, {
      onProgress: (progress) => {
        entry.progress = progress;
        notify(key, entry);
      },
    });
    entry.progress = 100;
    notify(key, entry);
    const session = await createAskSession(ready as AskModelFiles, defaultSystem, genConfig);
    if (entry.users === 0 && !entry.release) {
      // Everyone left while it was loading. Do not keep it.
      session.dispose();
      shared.delete(key);
      return;
    }
    entry.session = session;
  } catch (error) {
    entry.error = error instanceof Error ? error : new Error(String(error));
  }
  notify(key, entry);
}

function acquire(files: AskModelFiles, defaultSystem: string, genConfig: llm.LLMGenerationConfig): Shared {
  const key = keyOf(files);
  let entry = shared.get(key);
  if (!entry) {
    entry = { users: 0, progress: 0, snapshot: NOTHING_YET };
    shared.set(key, entry);
    notify(key, entry);
    void load(entry, files, defaultSystem, genConfig);
  }
  if (entry.release) {
    clearTimeout(entry.release);
    entry.release = undefined;
  }
  entry.users += 1;
  return entry;
}

function release(files: AskModelFiles, entry: Shared): void {
  entry.users -= 1;
  if (entry.users > 0) return;
  entry.release = setTimeout(() => {
    entry.release = undefined;
    if (entry.users > 0) return;
    const key = keyOf(files);
    shared.delete(key);
    try {
      entry.session?.dispose();
    } catch {
      // Already gone.
    }
    listeners.get(key)?.forEach((listener) => listener());
  }, RELEASE_GRACE_MS);
}

/**
 * The shared session for a model: downloads it if it is not on the phone yet,
 * loads it once, and hands the same session to every screen that asks. Same
 * download and cache as the library's own hook, so a model already on the
 * phone is not fetched again.
 */
export function useAskSession(files: AskModelFiles, defaultSystem: string, genConfig: llm.LLMGenerationConfig): AskSessionState {
  const key = keyOf(files);
  // Holding and letting go are side effects, so they live in an effect; what
  // the screen reads is the shared entry's snapshot, through React's own
  // external-store hook, so nothing here sets state or reads a ref in render.
  useEffect(() => {
    const current = acquire(files, defaultSystem, genConfig);
    return () => release(files, current);
    // The model files are the identity; the instructions and settings only
    // matter to the first screen that loads it, and every question carries
    // its own anyway.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return useSyncExternalStore(
    (onChange) => subscribe(key, onChange),
    () => snapshotOf(key),
    () => NOTHING_YET
  );
}
