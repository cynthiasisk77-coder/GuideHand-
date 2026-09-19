/**
 * The native half of Ask: the model, its thread, and the chat template.
 *
 * Built from the library's own public pieces — the downloader that already
 * has the model file on the phone, the runner, the template renderer — rather
 * than its chat session, because the chat session keeps a conversation and Max
 * must not. See askSessionCore.ts for why, and for everything that does not
 * need a phone.
 */

import RNBlobUtil from 'react-native-blob-util';
import { scheduleOnRN } from 'react-native-worklets';
import { createResourceScope, llm, useModel, useResourceDownload, wrapAsync } from 'react-native-executorch';

import { AskSession, buildAskSession } from '@/lib/askSessionCore';

export type { AskAnswer, AskSession, AskStats } from '@/lib/askSessionCore';

export interface AskModelFiles {
  readonly modelPath: string;
  readonly tokenizerPath: string;
  readonly tokenizerConfigPath: string;
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

export async function createAskSession(
  files: AskModelFiles,
  systemPrompt: string,
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

    return buildAskSession<llm.Prompt>({
      runner,
      contextWindow,
      render: (question) =>
        preprocessor.process(
          [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: question },
          ],
          2,
          { addGenPrompt: true }
        ),
      generate: (prompt, onToken) => generate(runner, prompt, { genConfig, eosToken, onToken }),
      afterTurn: () => preprocessor.clear(),
      dispose: scope.dispose,
    });
  } catch (error) {
    scope.dispose();
    throw error;
  }
}

/**
 * Downloads the model if it is not on the phone yet, loads it, and hands back
 * a session that answers one question at a time. Same download and cache as
 * the library's own hook, so a model already on the phone is not fetched again.
 */
export function useAskSession(files: AskModelFiles, systemPrompt: string, genConfig: llm.LLMGenerationConfig) {
  const { resource, downloadProgress, downloadError } = useResourceDownload(files);
  const { model: session, error } = useModel(
    (ready: AskModelFiles) => createAskSession(ready, systemPrompt, genConfig),
    resource
  );
  return {
    isReady: !!session,
    session,
    error: downloadError || error,
    downloadProgress,
  };
}
