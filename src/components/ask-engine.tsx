import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Icon } from '@/components/icon';
import { ReadAloudButton } from '@/components/read-aloud-button';
import { VoiceInput } from '@/components/voice-input';
import { Fonts } from '@/constants/calm';
import { AI_NAME, buildAskContext, citedArticles, SourceArticle, SYSTEM_PROMPT } from '@/lib/askContext';
import { AskModelChoice, READY_ONCE_PREFIX } from '@/lib/askModels';
import { configFor, percentOf } from '@/lib/askModelFiles';
import { SPEAKS_KEY } from '@/lib/maxSpeaks';
import { useAskSession } from '@/lib/askSession';
import { AboutYou, hasAnything, loadAboutYou } from '@/lib/aboutYou';
import { requestUnlock } from '@/lib/deviceLock';
import { isProfileUnlocked, loadProfileAccess, markProfileUnlocked, ProfileAccess } from '@/lib/profileAccess';
import { readAloud, stopReading, stripModelArtifacts, subscribeVoiceReport, voiceReportNow } from '@/lib/readAloud';
import { describeVoiceReport, isStandIn, type VoiceReport } from '@/lib/voiceReport';

/**
 * Whether what came back is an answer or just punctuation.
 *
 * "[1]" is not an answer, and neither is "[1] [2]." — but on screen they look
 * like the model said something, which is worse than it plainly failing. Two
 * real words is the bar.
 */
function hasRealWords(text: string): boolean {
  const words = text
    .replace(/\[\d+\]/g, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1);
  return words.length >= 2;
}

interface Palette {
  bg: string;
  card: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  blue: string;
  blueText: string;
  blueSoft: string;
  sage: string;
  sageText: string;
  sageSoft: string;
  danger: string;
  dangerText: string;
  dangerSoft: string;
  plum: string;
  plumText: string;
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
  | { kind: 'thinking'; question: string }
  | {
      kind: 'answered';
      question: string;
      answer: string;
      articles: SourceArticle[];
      /** What the model actually wrote when it was rejected as not an answer. */
      raw?: string;
      /** The error, verbatim, when generation threw. */
      failure?: string;
      /** prompt tokens · tokens written · seconds. Temporary readout. */
      note?: string;
      /** She tapped stop, or asked something else, before it finished. */
      stoppedEarly?: boolean;
    }
  | { kind: 'nothing-found'; question: string };

// The most an answer may run to. Long enough for the urgent thing and the
// steps after it; short enough that a wrong turn is over quickly. echo is
// off here too, though the session forces it off regardless: on, the engine
// repeats the whole prompt back as the answer (see askSessionCore.ts).
// Temperature 0.3, measured rather than guessed. The medium model was run on a
// desk with the app's exact prompts: at the library's sampling default it
// invented things that are in no article ("a parked car with the engine
// running", "if her heart rate is above 100"); at 0.3 it mostly read the
// articles back, warmly, and cited them. Lower still turns it into a list.
const GENERATION = { maxNewTokens: 320, echo: false, temperature: 0.3 };

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
  // Read once when the screen opens. It is small, and re-reading it for every
  // question would put a decrypt in front of an answer somebody is waiting on.
  const [about, setAbout] = useState<AboutYou | undefined>(undefined);
  // undefined until we have read the flag: neither message is shown before we
  // know which one is true.
  const [alreadyHave, setAlreadyHave] = useState<boolean | undefined>(undefined);
  // undefined until read, so the first answer does not decide for itself.
  const [speaks, setSpeaks] = useState<boolean | undefined>(undefined);
  // Who actually did the talking, so a stand-in voice is never a mystery.
  const [voiceReport, setVoiceReport] = useState<VoiceReport | undefined>(voiceReportNow());
  const greeted = useRef(false);
  // Whether Max may read the profile right now. The profile itself is always
  // loaded — that is how the screen knows one exists — but it is only handed to
  // Max when the About You setting allows it, or the phone has been unlocked
  // during this run of the app.
  const [access, setAccess] = useState<ProfileAccess | undefined>(undefined);
  const [profileOpen, setProfileOpen] = useState(isProfileUnlocked());
  const [unlocking, setUnlocking] = useState(false);
  const mayUseProfile = access === 'always' || profileOpen;
  const usable = mayUseProfile ? about : undefined;

  useEffect(() => {
    let alive = true;
    loadAboutYou().then((saved) => {
      if (alive) setAbout(saved);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    AsyncStorage.getItem(SPEAKS_KEY)
      .then((v) => alive && setSpeaks(v !== 'no'))
      .catch(() => alive && setSpeaks(true));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    loadProfileAccess().then((v) => alive && setAccess(v));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => subscribeVoiceReport(setVoiceReport), []);

  const unlockForMax = async () => {
    setUnlocking(true);
    const result = await requestUnlock(`Let ${AI_NAME} use your details`);
    if (result.ok || result.reason === 'unavailable') {
      markProfileUnlocked();
      setProfileOpen(true);
    }
    setUnlocking(false);
  };

  const setSpeaksAndRemember = (next: boolean) => {
    setSpeaks(next);
    AsyncStorage.setItem(SPEAKS_KEY, next ? 'yes' : 'no').catch(() => {});
  };

  useEffect(() => {
    let alive = true;
    AsyncStorage.getItem(READY_ONCE_PREFIX + model.id)
      .then((flag) => {
        if (alive) setAlreadyHave(flag === 'yes');
      })
      .catch(() => {
        if (alive) setAlreadyHave(false);
      });
    return () => {
      alive = false;
    };
  }, [model.id]);

  // Every question starts the model from zero: the standing instructions and
  // that one question. The library's chat session was used before, and it
  // quietly re-sent every earlier question and answer along with each new one
  // — its "resetOnTurn" empties the model's memory, not the history it is
  // re-fed — so the second question was already carrying the first.
  const engine = useAskSession(configFor(model.modelKey), SYSTEM_PROMPT, GENERATION);

  const firstName = usable?.name.trim().split(/\s+/)[0] ?? '';
  const greeting = firstName
    ? `Hi ${firstName}, it's ${AI_NAME}. I'm right here. Tell me what's going on and we'll take it one step at a time.`
    : `Hi, it's ${AI_NAME}. I'm right here. Tell me what's going on and we'll take it one step at a time.`;

  // Said out loud once per visit, only when speaking is on and only once the
  // profile has been read, so it does not greet a stranger and then learn her
  // name a moment later.
  useEffect(() => {
    if (!engine.isReady || speaks !== true || about === undefined || access === undefined || greeted.current) return;
    greeted.current = true;
    void readAloud(greeting, {});
  }, [engine.isReady, speaks, about, access, greeting]);

  // Written the first time this model is usable, so the next open knows the
  // file is already here and says so.
  useEffect(() => {
    if (!engine.isReady) return;
    // Only the write. Setting the flag in state here would be a needless
    // re-render: once the model is ready this card is not on screen at all,
    // and the next time the screen opens the value is read back from storage.
    AsyncStorage.setItem(READY_ONCE_PREFIX + model.id, 'yes').catch(() => {});
  }, [engine.isReady, model.id]);

  // Only the newest question gets to touch the screen. An older one that is
  // still finishing, or was cut off to make room, resolves quietly.
  const turn = useRef(0);

  const stopMax = () => {
    engine.session?.stop();
    stopReading();
  };

  const ask = useCallback(
    async (spoken?: string) => {
      const asked = (spoken ?? question).trim();
      if (asked.length < 2) return;
      // The box empties the moment a question goes. She had to delete the old
      // one by hand before every new question; now the question moves to the
      // answer card, and tapping it there puts it back to change.
      setQuestion('');
      stopReading();
      const context = buildAskContext(asked, usable);

      // The safety rule: nothing relevant found means the model is never asked.
      if (context.empty) {
        setPhase({ kind: 'nothing-found', question: asked });
        return;
      }
      const session = engine.session;
      if (!session) return;

      const mine = ++turn.current;
      setPhase({ kind: 'thinking', question: asked });
      setStreamed('');
      let collected = '';
      try {
        const result = await session.ask({ system: SYSTEM_PROMPT, user: context.prompt }, (token) => {
          if (mine !== turn.current) return;
          collected += token;
          setStreamed(stripModelArtifacts(collected));
        });
        if (mine !== turn.current || result.superseded) return;
        // TEMPORARY readout, the same idea as the build date: "it said nothing"
        // is unanswerable, "prompt 1,304 of 2,048 tokens, wrote 3, in 41 s" is
        // not. The window is how much the model can hold, prompt and answer.
        const stats = result.stats;
        const note = stats
          ? `prompt ${stats.numPromptTokens.toLocaleString()} of ${session.contextWindow.toLocaleString()} tokens · wrote ${stats.numGeneratedTokens.toLocaleString()} · ${Math.round((stats.inferenceEndMs - stats.inferenceStartMs) / 1000)} s`
          : undefined;
        // The model emits its own chat-template markers as ordinary text —
        // "<|start_header_id|>assistant<|end_header_id|>" arrived at the top of
        // a real answer on a real phone. Citations are read from the raw text,
        // because stripping can remove the line a [1] was sitting on.
        const answer = stripModelArtifacts(result.text);
        // A model that emits nothing but a citation marker leaves "[1]" sitting
        // on screen where an answer should be. That happened on a real phone
        // during a real emergency. With the citations and punctuation taken out
        // there has to be something left that is actually words — and when
        // there is not, what it did write is shown, not hidden.
        const real = hasRealWords(answer);
        if (result.stoppedEarly && !real) {
          // Stopped before it had said anything. There is nothing to show.
          setPhase({ kind: 'idle' });
          return;
        }
        setPhase({
          kind: 'answered',
          question: asked,
          answer: real ? answer : '',
          raw: real ? undefined : answer.slice(0, 120),
          articles: citedArticles(result.text, context.articles),
          note,
          stoppedEarly: result.stoppedEarly,
        });
      } catch (error) {
        if (mine !== turn.current) return;
        // A failed generation still leaves the articles, which are the real
        // answer anyway. The error itself is shown, verbatim: a generic
        // "couldn't finish" hid the cause for three builds.
        const failure = error instanceof Error ? error.message : String(error);
        setPhase({ kind: 'answered', question: asked, answer: '', failure, articles: context.articles });
      }
    },
    [question, engine.session, usable]
  );

  const openArticle = (article: SourceArticle) => {
    router.push({
      pathname: '/article/[category]/[topic]',
      params: { category: article.categorySlug, topic: article.topicSlug },
    });
  };

  // --- still downloading -------------------------------------------------
  if (!engine.isReady) {
    const pct = percentOf(engine.downloadProgress);
    return (
      <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
        {engine.error ? (
          <>
            <Text style={[styles.cardLabel, { color: c.dangerText }]}>That didn&apos;t work</Text>
            <Text style={[styles.body, { color: c.textSecondary }]}>{String(engine.error.message ?? engine.error)}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={onChangeModel}
              style={({ pressed }) => [styles.button, { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 }]}>
              <Text style={[styles.buttonText, { color: c.blue }]}>Pick a different one</Text>
            </Pressable>
          </>
        ) : alreadyHave ? (
          // Her screenshot: "Downloading — 100%", a full bar, and a spinner that
          // sat there. The library sets progress to 100 the moment the file is
          // on the phone and only reports ready once the whole thing is in
          // memory — so this state is loading, at 100%, not 0%. The earlier
          // check for 0% never fired. Once the flag says the file is here,
          // every spinner on this card is loading, whatever the number says.
          <>
            <View style={styles.downloadRow}>
              <ActivityIndicator color={c.blue} />
              <Text style={[styles.cardLabel, { color: c.text }]}>Getting {AI_NAME} ready…</Text>
            </View>
            <Text style={[styles.body, { color: c.textSecondary }]}>
              {model.name} ({model.size}) is already on this phone and is being read into memory. Nothing is
              downloading and no signal is needed.
              {model.modelKey === 'LLAMA3_2_3B'
                ? ' Large is the slowest to load — often a minute or more each time. Medium answers nearly as well and loads in seconds.'
                : ''}
            </Text>
            {model.modelKey === 'LLAMA3_2_3B' ? (
              <Pressable
                accessibilityRole="button"
                onPress={onChangeModel}
                style={({ pressed }) => [styles.button, { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 }]}>
                <Text style={[styles.buttonText, { color: c.blue }]}>Switch to Medium instead</Text>
              </Pressable>
            ) : null}
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
      {/*
        * Offered here rather than only on the home screen, because this is the
        * screen where it makes a difference. "It doesn't know my name" turned
        * out not to be a bug at all — the profile had simply never been filled
        * in, and there was nothing anywhere near the question box to say it
        * existed.
        */}
      {about && hasAnything(about) && !mayUseProfile && access !== undefined ? (
        <Pressable
          accessibilityRole="button"
          disabled={unlocking}
          onPress={unlockForMax}
          style={({ pressed }) => [
            styles.tellIt,
            { backgroundColor: c.plumSoft, borderColor: c.plum, opacity: pressed || unlocking ? 0.7 : 1 },
          ]}>
          <Icon name="lock" size={16} color={c.plumText} />
          <Text style={[styles.tellItText, { color: c.plumText }]}>
            {AI_NAME} is answering without your details. Unlock to let her use them →
          </Text>
        </Pressable>
      ) : null}

      {about && !hasAnything(about) ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push({ pathname: '/about-you' })}
          style={({ pressed }) => [
            styles.tellIt,
            { backgroundColor: c.plumSoft, borderColor: c.plum, opacity: pressed ? 0.75 : 1 },
          ]}>
          <Icon name="family" size={16} color={c.plumText} />
          <Text style={[styles.tellItText, { color: c.plumText }]}>
            {AI_NAME} doesn&apos;t know who you are yet. Add your name, allergies and conditions →
          </Text>
        </Pressable>
      ) : null}

      <View style={[styles.greet, { backgroundColor: c.blueSoft, borderColor: c.blue }]}>
        <View style={[styles.greetBadge, { backgroundColor: c.blue }]}>
          <Text style={[styles.greetBadgeText, { color: c.card }]}>{AI_NAME.charAt(0)}</Text>
        </View>
        <Text style={[styles.greetText, { color: c.text }]}>{greeting}</Text>
      </View>

      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: speaks === true }}
        onPress={() => setSpeaksAndRemember(!(speaks === true))}
        style={({ pressed }) => [styles.speaksRow, { opacity: pressed ? 0.7 : 1 }]}>
        <Icon name={speaks === true ? 'speak' : 'stop'} size={15} color={speaks === true ? c.blue : c.textSecondary} />
        <Text style={[styles.speaksText, { color: speaks === true ? c.blue : c.textSecondary }]}>
          {speaks === true ? `${AI_NAME} reads answers out loud — tap to turn off` : `${AI_NAME} is quiet — tap to have answers read out loud`}
        </Text>
      </Pressable>

      {speaks === true && isStandIn(voiceReport) ? (
        <Text style={[styles.voiceNote, { color: c.dangerText ?? c.textSecondary }]}>
          {describeVoiceReport(voiceReport, AI_NAME)}
        </Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push({ pathname: '/max-voice' })}
        style={({ pressed }) => [styles.voiceLink, { opacity: pressed ? 0.6 : 1 }]}>
        <Text style={[styles.voiceLinkText, { color: c.blue }]}>Change {AI_NAME}’s voice →</Text>
      </Pressable>

      <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
        <View style={styles.inputWrap}>
          <TextInput
            value={question}
            onChangeText={setQuestion}
            placeholder="What's happening? Say it plainly."
            placeholderTextColor={c.textSecondary}
            multiline
            style={[
              styles.input,
              { color: c.text, borderColor: c.cardBorder, paddingRight: question.length > 0 ? 42 : 12 },
            ]}
          />
          {question.length > 0 ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear the question"
              hitSlop={10}
              onPress={() => setQuestion('')}
              style={({ pressed }) => [styles.clear, { backgroundColor: c.blueSoft, opacity: pressed ? 0.6 : 1 }]}>
              <Text style={[styles.clearText, { color: c.blueText }]}>×</Text>
            </Pressable>
          ) : null}
        </View>
        <VoiceInput
          onPartial={setQuestion}
          onTranscript={(said) => {
            // Fill the box so she can see what it heard, then ask without
            // another tap — the whole point is not having to touch the screen.
            setQuestion(said);
            if (said.trim().length >= 2) void ask(said);
          }}
          color={c.blueText}
          background={c.blueSoft}
          mutedColor={c.textSecondary}
        />
        {phase.kind === 'thinking' ? (
          <Pressable
            accessibilityRole="button"
            onPress={stopMax}
            style={({ pressed }) => [styles.button, { backgroundColor: c.blueSoft, opacity: pressed ? 0.6 : 1 }]}>
            <ActivityIndicator size="small" color={c.blue} />
            <Text style={[styles.buttonText, { color: c.blue }]}>{AI_NAME} is writing… tap to stop</Text>
          </Pressable>
        ) : (
          <Pressable
            accessibilityRole="button"
            disabled={question.trim().length < 2}
            onPress={() => void ask()}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: c.blueSoft, opacity: pressed || question.trim().length < 2 ? 0.5 : 1 },
            ]}>
            <Icon name="search" size={16} color={c.blue} />
            <Text style={[styles.buttonText, { color: c.blue }]}>Ask</Text>
          </Pressable>
        )}
      </View>

      {phase.kind === 'thinking' || phase.kind === 'answered' ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Put this question back in the box to change it"
          onPress={() => setQuestion(phase.question)}
          style={({ pressed }) => [styles.askedRow, { opacity: pressed ? 0.6 : 1 }]}>
          <Text style={[styles.askedLabel, { color: c.textSecondary }]}>YOU ASKED</Text>
          <Text style={[styles.askedText, { color: c.text }]}>{phase.question}</Text>
        </Pressable>
      ) : null}

      {phase.kind === 'thinking' && streamed.length > 0 ? (
        <View style={[styles.card, { backgroundColor: c.card, borderColor: c.blue }]}>
          <Text style={[styles.answer, { color: c.text }]}>{streamed}</Text>
        </View>
      ) : null}

      {phase.kind === 'nothing-found' ? (
        <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
          <Text style={[styles.cardLabel, { color: c.text }]}>Nothing {AI_NAME} has covers that</Text>
          <Text style={[styles.body, { color: c.textSecondary }]}>
            No article matched &quot;{phase.question}&quot;, so there was nothing to answer from — and {AI_NAME}
            will not make something up. Try different words, or browse the categories.
          </Text>
        </View>
      ) : null}

      {phase.kind === 'answered' ? (
        <>
          {phase.answer.length > 0 ? (
            <View style={[styles.card, { backgroundColor: c.card, borderColor: c.blue, borderLeftWidth: 5 }]}>
              <Text style={[styles.answer, { color: c.text }]}>{phase.answer}</Text>
              {phase.stoppedEarly ? (
                <Text style={[styles.body, { color: c.textSecondary }]}>You stopped {AI_NAME} there.</Text>
              ) : null}
              <ReadAloudButton
                key={phase.answer}
                text={phase.answer}
                autoPlay={speaks === true && !phase.stoppedEarly}
                color={c.blue}
                background={c.blueSoft}
              />
            </View>
          ) : (
            <View style={[styles.card, { backgroundColor: c.card, borderColor: c.dangerText ?? c.cardBorder }]}>
              {phase.failure ? (
                <>
                  <Text style={[styles.cardLabel, { color: c.text }]}>{AI_NAME} hit an error</Text>
                  <Text style={[styles.body, { color: c.textSecondary }]} selectable>{phase.failure}</Text>
                </>
              ) : phase.raw !== undefined ? (
                <>
                  <Text style={[styles.cardLabel, { color: c.text }]}>{AI_NAME} only wrote this:</Text>
                  <Text style={[styles.body, { color: c.textSecondary }]} selectable>
                    &quot;{phase.raw || '(nothing)'}&quot;
                  </Text>
                  <Text style={[styles.body, { color: c.textSecondary }]}>
                    That is not an answer, so it is not shown as one. The articles below are the real guidance.
                  </Text>
                </>
              ) : (
                <Text style={[styles.body, { color: c.textSecondary }]}>
                  Couldn&apos;t finish writing an answer, but these are the articles it was reading. They are the real
                  guidance — open them directly.
                </Text>
              )}
              <Pressable
                accessibilityRole="button"
                onPress={() => void ask(phase.question)}
                style={({ pressed }) => [styles.button, { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 }]}>
                <Text style={[styles.buttonText, { color: c.blue }]}>Ask again</Text>
              </Pressable>
            </View>
          )}

          {phase.note ? <Text style={[styles.note, { color: c.textSecondary }]}>{phase.note}</Text> : null}

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
  greet: { flexDirection: 'row', alignItems: 'center', gap: 11, borderWidth: 1.5, borderRadius: 14, paddingVertical: 12, paddingHorizontal: 13, marginBottom: 8 },
  greetBadge: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  greetBadgeText: { fontSize: 17, fontFamily: Fonts.displaySemibold },
  greetText: { flex: 1, fontSize: 14, lineHeight: 20, fontFamily: Fonts.bodySemibold },
  speaksRow: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 6, paddingHorizontal: 4, marginBottom: 8 },
  speaksText: { flex: 1, fontSize: 12.5, fontFamily: Fonts.bodySemibold },
  voiceNote: { fontSize: 12.5, lineHeight: 17.5, fontFamily: Fonts.body, paddingHorizontal: 4, marginBottom: 6 },
  voiceLink: { paddingHorizontal: 4, paddingBottom: 12, marginTop: -4 },
  voiceLinkText: { fontSize: 12.5, fontFamily: Fonts.bodySemibold, textDecorationLine: 'underline' },

  note: { fontSize: 11, lineHeight: 15, fontFamily: Fonts.mono, textAlign: 'center', marginTop: 6, marginBottom: 2 },

  tellIt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  tellItText: { flex: 1, fontSize: 12.5, lineHeight: 17.5, fontFamily: Fonts.bodySemibold },

  inputWrap: { position: 'relative' },
  clear: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: { fontSize: 18, lineHeight: 20, fontFamily: Fonts.bodyBold },
  askedRow: { paddingHorizontal: 4, paddingTop: 2, paddingBottom: 10, gap: 2 },
  askedLabel: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.2 },
  askedText: { fontSize: 14, lineHeight: 20, fontFamily: Fonts.bodySemibold },

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
