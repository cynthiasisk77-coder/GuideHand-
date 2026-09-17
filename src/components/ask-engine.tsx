import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { models, useLLMChatSession } from 'react-native-executorch';

import { Icon } from '@/components/icon';
import { ReadAloudButton } from '@/components/read-aloud-button';
import { Fonts } from '@/constants/calm';
import { buildAskContext, citedArticles, SourceArticle, SYSTEM_PROMPT } from '@/lib/askContext';
import { AskModelChoice, AskModelKey } from '@/lib/askModels';

// The one place the library's model table is read. Kept in this file because
// this file is the native-only half — the web build resolves ask-engine.web.tsx
// instead and never loads any of it.
function configFor(key: AskModelKey): unknown {
  return models.llm[key];
}

interface Palette {
  bg: string;
  card: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  blue: string;
  blueSoft: string;
  sage: string;
  sageSoft: string;
  danger: string;
  dangerSoft: string;
  plum: string;
  plumSoft: string;
}

interface AskEngineProps {
  model: AskModelChoice;
  c: Palette;
  onChangeModel: () => void;
  /** A question carried over from the search box, so nobody retypes it. */
  initialQuestion?: string;
}

type Phase =
  | { kind: 'idle' }
  | { kind: 'thinking' }
  | { kind: 'answered'; answer: string; articles: SourceArticle[] }
  | { kind: 'nothing-found'; question: string };

/**
 * The model half of Ask. Mounted only once a model has been chosen — the
 * download starts on mount, so this component existing is what commits a person
 * to the download.
 */
export function AskEngine({ model, c, onChangeModel, initialQuestion }: AskEngineProps) {
  const router = useRouter();
  const [question, setQuestion] = useState(initialQuestion ?? '');
  const [phase, setPhase] = useState<Phase>({ kind: 'idle' });
  const [streamed, setStreamed] = useState('');

  const llm = useLLMChatSession(configFor(model.modelKey) as never, {
    // The grounding instruction is pinned as the system message so it survives
    // every turn rather than being something the model can talk itself out of.
    initialMessages: [{ role: 'system', content: SYSTEM_PROMPT }],
    // Each question stands alone with its own articles; carrying history over
    // would let an earlier answer contaminate the next one.
    resetOnTurn: true,
    generationConfig: { maxNewTokens: 320 },
  });

  const ask = useCallback(async () => {
    const context = buildAskContext(question);

    // The safety rule: nothing relevant found means the model is never asked.
    if (context.empty) {
      setPhase({ kind: 'nothing-found', question: question.trim() });
      return;
    }
    if (!llm.sendMessage) return;

    setPhase({ kind: 'thinking' });
    setStreamed('');
    let collected = '';
    try {
      await llm.sendMessage(context.prompt, (token) => {
        collected += token;
        setStreamed(collected);
      });
      setPhase({
        kind: 'answered',
        answer: collected.trim(),
        articles: citedArticles(collected, context.articles),
      });
    } catch {
      // A failed generation still leaves the articles, which are the real
      // answer anyway — show them rather than showing nothing.
      setPhase({ kind: 'answered', answer: '', articles: context.articles });
    }
  }, [question, llm]);

  const openArticle = (article: SourceArticle) => {
    router.push({
      pathname: '/article/[category]/[topic]',
      params: { category: article.categorySlug, topic: article.topicSlug },
    });
  };

  // --- still downloading -------------------------------------------------
  if (!llm.isReady) {
    const pct = Math.round((llm.downloadProgress ?? 0) * 100);
    return (
      <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
        {llm.error ? (
          <>
            <Text style={[styles.cardLabel, { color: c.danger }]}>That didn&apos;t work</Text>
            <Text style={[styles.body, { color: c.textSecondary }]}>{String(llm.error.message ?? llm.error)}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={onChangeModel}
              style={({ pressed }) => [styles.button, { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 }]}>
              <Text style={[styles.buttonText, { color: c.blue }]}>Pick a different one</Text>
            </Pressable>
          </>
        ) : (
          <>
            <View style={styles.downloadRow}>
              <ActivityIndicator color={c.blue} />
              <Text style={[styles.cardLabel, { color: c.text }]}>
                {pct > 0 ? `Downloading — ${pct}%` : 'Starting the download…'}
              </Text>
            </View>
            <View style={[styles.progressTrack, { backgroundColor: c.cardBorder }]}>
              <View style={[styles.progressFill, { backgroundColor: c.blue, width: `${Math.max(pct, 2)}%` }]} />
            </View>
            <Text style={[styles.body, { color: c.textSecondary }]}>
              {model.name} · {model.size}. Keep this screen open and stay on Wi-Fi. It only downloads once — after
              that it works with no signal at all.
            </Text>
          </>
        )}
      </View>
    );
  }

  // --- ready -------------------------------------------------------------
  return (
    <>
      <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="What's happening? Say it plainly."
          placeholderTextColor={c.textSecondary}
          multiline
          style={[styles.input, { color: c.text, borderColor: c.cardBorder }]}
        />
        <Pressable
          accessibilityRole="button"
          disabled={phase.kind === 'thinking' || question.trim().length < 2}
          onPress={ask}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: c.blueSoft,
              opacity: pressed || phase.kind === 'thinking' || question.trim().length < 2 ? 0.5 : 1,
            },
          ]}>
          {phase.kind === 'thinking' ? (
            <ActivityIndicator size="small" color={c.blue} />
          ) : (
            <Icon name="search" size={16} color={c.blue} />
          )}
          <Text style={[styles.buttonText, { color: c.blue }]}>
            {phase.kind === 'thinking' ? 'Reading your articles…' : 'Ask'}
          </Text>
        </Pressable>
      </View>

      {phase.kind === 'thinking' && streamed.length > 0 ? (
        <View style={[styles.card, { backgroundColor: c.card, borderColor: c.blue }]}>
          <Text style={[styles.answer, { color: c.text }]}>{streamed}</Text>
        </View>
      ) : null}

      {phase.kind === 'nothing-found' ? (
        <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
          <Text style={[styles.cardLabel, { color: c.text }]}>Nothing in GuideHand covers that</Text>
          <Text style={[styles.body, { color: c.textSecondary }]}>
            No article matched &quot;{phase.question}&quot;, so there was nothing to answer from — and GuideHand
            will not make something up. Try different words, or browse the categories.
          </Text>
        </View>
      ) : null}

      {phase.kind === 'answered' ? (
        <>
          {phase.answer.length > 0 ? (
            <View style={[styles.card, { backgroundColor: c.card, borderColor: c.blue, borderLeftWidth: 5 }]}>
              <Text style={[styles.answer, { color: c.text }]}>{phase.answer}</Text>
              <ReadAloudButton text={phase.answer} color={c.blue} background={c.blueSoft} />
            </View>
          ) : (
            <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
              <Text style={[styles.body, { color: c.textSecondary }]}>
                Couldn&apos;t finish writing an answer, but these are the articles it was reading. They are the real
                guidance — open them directly.
              </Text>
            </View>
          )}

          <Text style={[styles.sourcesLabel, { color: c.blue }]}>FROM THESE ARTICLES</Text>
          {phase.articles.map((article) => (
            <Pressable
              key={article.topicSlug}
              accessibilityRole="button"
              onPress={() => openArticle(article)}
              style={({ pressed }) => [
                styles.sourceRow,
                {
                  backgroundColor: c.card,
                  borderColor: article.priority === 'P0' ? c.danger : c.cardBorder,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}>
              <View style={styles.sourceText}>
                <Text style={[styles.sourceTitle, { color: c.text }]}>{article.title}</Text>
                <Text style={[styles.sourceMeta, { color: c.textSecondary }]}>{article.categoryName}</Text>
              </View>
              <Icon name="chevron" size={18} color={c.textSecondary} />
            </Pressable>
          ))}
        </>
      ) : null}

      <Pressable accessibilityRole="button" onPress={onChangeModel} style={styles.changeLink}>
        <Text style={[styles.changeLinkText, { color: c.textSecondary }]}>
          Using the {model.name.toLowerCase()} model · change or remove
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 10, gap: 10 },
  cardLabel: { fontSize: 14, fontFamily: Fonts.bodyBold },
  body: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
    lineHeight: 21,
    minHeight: 76,
    textAlignVertical: 'top',
    fontFamily: Fonts.body,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 11,
    paddingVertical: 12,
  },
  buttonText: { fontSize: 14.5, fontFamily: Fonts.bodyBold },
  downloadRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressTrack: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 3 },
  answer: { fontSize: 15, lineHeight: 22.5, fontFamily: Fonts.body },
  sourcesLabel: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 2,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  sourceText: { flex: 1, minWidth: 0, gap: 1 },
  sourceTitle: { fontSize: 14.5, fontFamily: Fonts.displaySemibold },
  sourceMeta: { fontSize: 12, fontFamily: Fonts.body },
  changeLink: { paddingVertical: 12, alignItems: 'center' },
  changeLinkText: { fontSize: 12.5, fontFamily: Fonts.body, textDecorationLine: 'underline' },
});
