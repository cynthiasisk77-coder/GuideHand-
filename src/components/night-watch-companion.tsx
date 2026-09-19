// "Sit with me": Max's talking side of Night Watch. Needs the model from Ask
// Max; everything else on the page works without it.
//
// The conversation is sent to the model as chat turns, and the reply is
// tidied before anybody sees it (see src/lib/nightWatch/companion.ts). When a
// message asks what to DO about something the app has a page on, that page
// is shown before Max's reply, and Max is told to point at it rather than
// answer from memory. Company, not a manual.

import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Icon } from '@/components/icon';
import { VoiceInput } from '@/components/voice-input';
import { Calm, Fonts } from '@/constants/calm';
import { AI_NAME } from '@/lib/aiName';
import { configFor, percentOf } from '@/lib/askModelFiles';
import { ASK_MODEL_KEY, AskModelChoice, findAskModel, READY_ONCE_PREFIX } from '@/lib/askModels';
import { useAskSession } from '@/lib/askSession';
import {
  asksForSteps,
  Bridge,
  buildCompanionInput,
  COMPANION_PROMPT,
  COMPANION_TEMPERATURE,
  findBridge,
  handOffLine,
  opener,
  REPLY_TOKENS,
  tidyReply,
  Turn,
} from '@/lib/nightWatch/companion';
import { readAloud, stopReading } from '@/lib/readAloud';

type Palette = typeof Calm.light;

export interface NightWatchCompanionProps {
  c: Palette;
  /** Their first name, when Max is allowed to know it. */
  name?: string;
  speaks: boolean;
  /** Something to start with in the box: a talk prompt handed over. */
  seed?: string;
}

const GENERATION = { maxNewTokens: REPLY_TOKENS, echo: false, temperature: COMPANION_TEMPERATURE };
/** The screen keeps this many turns; the model sees fewer (TRANSCRIPT_CHARS). */
const KEEP_TURNS = 40;

export function NightWatchCompanion(props: NightWatchCompanionProps) {
  const router = useRouter();
  const { c } = props;
  const [model, setModel] = useState<AskModelChoice | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    AsyncStorage.getItem(ASK_MODEL_KEY)
      .then((id) => alive && setModel(findAskModel(id)))
      .catch(() => {})
      .finally(() => alive && setLoaded(true));
    return () => {
      alive = false;
    };
  }, []);

  if (!loaded) return <ActivityIndicator color={c.onBgSoft} style={styles.spinner} />;

  if (!model) {
    return (
      <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
        <Text style={[styles.cardLabel, { color: c.text }]}>{AI_NAME}&apos;s talking side needs her brain</Text>
        <Text style={[styles.body, { color: c.textSecondary }]}>
          Chatting with {AI_NAME} uses the same model as Ask Max. Download it there once, on Wi-Fi, and from
          then on she talks with no signal at all. The games, check-ins and stories on this page work without it.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push({ pathname: '/ask' })}
          style={({ pressed }) => [styles.button, { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 }]}>
          <Icon name="download" size={16} color={c.blue} />
          <Text style={[styles.buttonText, { color: c.blue }]}>Set {AI_NAME} up in Ask Max</Text>
        </Pressable>
      </View>
    );
  }

  return <Chat {...props} model={model} />;
}

function Chat({ c, name, speaks, seed, model }: NightWatchCompanionProps & { model: AskModelChoice }) {
  const router = useRouter();
  const engine = useAskSession(configFor(model.modelKey), COMPANION_PROMPT, GENERATION);
  const [turns, setTurns] = useState<Turn[]>(() => [{ who: 'max', text: opener(name) }]);
  const [input, setInput] = useState(seed ?? '');
  const [thinking, setThinking] = useState(false);
  const [streamed, setStreamed] = useState('');
  const [bridge, setBridge] = useState<{ asked: string; page: Bridge } | undefined>(undefined);
  const [failure, setFailure] = useState<string | undefined>(undefined);
  const [alreadyHave, setAlreadyHave] = useState<boolean | undefined>(undefined);
  const greeted = useRef(false);
  const ticket = useRef(0);
  // Read by send() and the timers, which want the latest without being
  // rebuilt for every keystroke. Kept in step after each render.
  const turnsRef = useRef(turns);
  const speaksRef = useRef(speaks);
  useEffect(() => {
    turnsRef.current = turns;
  }, [turns]);
  useEffect(() => {
    speaksRef.current = speaks;
  }, [speaks]);

  useEffect(() => {
    let alive = true;
    AsyncStorage.getItem(READY_ONCE_PREFIX + model.id)
      .then((flag) => alive && setAlreadyHave(flag === 'yes'))
      .catch(() => alive && setAlreadyHave(false));
    return () => {
      alive = false;
    };
  }, [model.id]);

  useEffect(() => {
    if (!engine.isReady) return;
    AsyncStorage.setItem(READY_ONCE_PREFIX + model.id, 'yes').catch(() => {});
  }, [engine.isReady, model.id]);

  // Her opening line, said once, when she is ready and allowed to speak.
  useEffect(() => {
    if (!engine.isReady || !speaks || greeted.current) return;
    greeted.current = true;
    void readAloud(turnsRef.current[0].text, {});
  }, [engine.isReady, speaks]);

  // Leaving the page stops whatever she was saying or writing.
  useEffect(() => {
    return () => {
      stopReading();
    };
  }, []);

  const send = useCallback(
    async (spoken?: string) => {
      const said = (spoken ?? input).trim();
      if (!said) return;
      const session = engine.session;
      if (!session) return;
      setInput('');
      stopReading();
      setFailure(undefined);
      const page = findBridge(said);
      setBridge(page ? { asked: said, page } : undefined);
      const before = turnsRef.current;
      const asked: Turn = { who: 'you', text: said };
      // What to DO about something never goes to the model. Max says so
      // herself, and the page, or Ask, is right there.
      if (asksForSteps(said)) {
        const hers: Turn = { who: 'max', text: handOffLine(page, name) };
        setTurns([...before, asked, hers].slice(-KEEP_TURNS));
        if (speaksRef.current) void readAloud(hers.text, {});
        return;
      }
      const request = buildCompanionInput(before, said, name, page);
      setTurns([...before, asked].slice(-KEEP_TURNS));
      const mine = ++ticket.current;
      setThinking(true);
      setStreamed('');
      let collected = '';
      try {
        const result = await session.ask(
          {
            system: request.system,
            history: request.history,
            user: request.user,
            temperature: request.temperature,
            maxNewTokens: request.maxNewTokens,
          },
          (token) => {
            if (mine !== ticket.current) return;
            collected += token;
            setStreamed(tidyReply(collected, name));
          }
        );
        if (mine !== ticket.current || result.superseded) return;
        const reply = tidyReply(result.text, name);
        if (reply) {
          const hers: Turn = { who: 'max', text: reply };
          setTurns((t) => [...t, hers].slice(-KEEP_TURNS));
          if (speaksRef.current) void readAloud(reply, {});
        } else if (!result.stoppedEarly) {
          setFailure(`${AI_NAME} didn't manage a reply to that. Try saying it another way.`);
        }
      } catch (error) {
        if (mine !== ticket.current) return;
        setFailure(error instanceof Error ? error.message : String(error));
      } finally {
        if (mine === ticket.current) {
          setThinking(false);
          setStreamed('');
        }
      }
    },
    [input, engine.session, name]
  );

  const stop = () => {
    engine.session?.stop();
    stopReading();
  };

  const startFresh = () => {
    stop();
    ticket.current++;
    setThinking(false);
    setStreamed('');
    setBridge(undefined);
    setFailure(undefined);
    setTurns([{ who: 'max', text: opener(name) }]);
  };

  if (!engine.isReady) {
    const pct = percentOf(engine.downloadProgress);
    return (
      <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
        {engine.error ? (
          <>
            <Text style={[styles.cardLabel, { color: c.dangerText }]}>{AI_NAME} could not start</Text>
            <Text style={[styles.body, { color: c.textSecondary }]} selectable>
              {String(engine.error.message ?? engine.error)}
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push({ pathname: '/ask' })}
              style={({ pressed }) => [styles.button, { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 }]}>
              <Text style={[styles.buttonText, { color: c.blue }]}>Check the model in Ask Max</Text>
            </Pressable>
          </>
        ) : (
          <>
            <View style={styles.row}>
              <ActivityIndicator color={c.blue} />
              <Text style={[styles.cardLabel, { color: c.text }]}>
                {alreadyHave || pct >= 100 ? `Getting ${AI_NAME} ready…` : pct > 0 ? `Downloading — ${pct}%` : 'Starting the download…'}
              </Text>
            </View>
            <Text style={[styles.body, { color: c.textSecondary }]}>
              {alreadyHave || pct >= 100
                ? `${model.name} is on this phone and is being read into memory. No signal is needed.`
                : `${model.name} · ${model.size}. Keep this screen open and stay on Wi-Fi. It only downloads once.`}
            </Text>
          </>
        )}
      </View>
    );
  }

  return (
    <>
      {turns.map((turn, i) => (
        <View
          key={i}
          style={[
            styles.turn,
            turn.who === 'max'
              ? { backgroundColor: c.blueSoft, borderColor: c.blue, alignSelf: 'stretch' }
              : { backgroundColor: c.card, borderColor: c.cardBorder, alignSelf: 'flex-end', marginLeft: 36 },
          ]}>
          <Text style={[styles.turnWho, { color: turn.who === 'max' ? c.blueText : c.textSecondary }]}>
            {turn.who === 'max' ? AI_NAME.toUpperCase() : 'YOU'}
          </Text>
          <Text style={[styles.turnText, { color: c.text }]}>{turn.text}</Text>
        </View>
      ))}

      {bridge ? (
        <View style={[styles.bridge, { backgroundColor: c.plumSoft, borderColor: c.plum }]}>
          <Text style={[styles.bridgeLabel, { color: c.plumText }]}>GUIDEHAND HAS A PAGE ON THIS</Text>
          <Text style={[styles.bridgeTitle, { color: c.text }]}>{bridge.page.title}</Text>
          <Text style={[styles.body, { color: c.plumText }]}>
            {AI_NAME} keeps you company here; she does not give steps from memory. The page is the real guidance.
          </Text>
          <View style={styles.buttonRow}>
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                router.push({
                  pathname: '/article/[category]/[topic]',
                  params: { category: bridge.page.categorySlug, topic: bridge.page.topicSlug },
                })
              }
              style={({ pressed }) => [styles.button, styles.grow, { backgroundColor: c.card, opacity: pressed ? 0.7 : 1 }]}>
              <Text style={[styles.buttonText, { color: c.plumText }]}>Open the page</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push({ pathname: '/ask', params: { q: bridge.asked } })}
              style={({ pressed }) => [styles.button, styles.grow, { backgroundColor: c.card, opacity: pressed ? 0.7 : 1 }]}>
              <Text style={[styles.buttonText, { color: c.plumText }]}>Ask {AI_NAME} about it</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      {thinking ? (
        <View style={[styles.turn, { backgroundColor: c.blueSoft, borderColor: c.blue }]}>
          <Text style={[styles.turnWho, { color: c.blueText }]}>{AI_NAME.toUpperCase()}</Text>
          {streamed ? (
            <Text style={[styles.turnText, { color: c.text }]}>{streamed}</Text>
          ) : (
            <View style={styles.row}>
              <ActivityIndicator size="small" color={c.blue} />
              <Text style={[styles.body, { color: c.textSecondary }]}>thinking…</Text>
            </View>
          )}
        </View>
      ) : null}

      {failure ? (
        <View style={[styles.turn, { backgroundColor: c.card, borderColor: c.danger }]}>
          <Text style={[styles.turnWho, { color: c.dangerText }]}>THAT DIDN&apos;T WORK</Text>
          <Text style={[styles.body, { color: c.textSecondary }]} selectable>
            {failure}
          </Text>
        </View>
      ) : null}

      <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder={`Say anything to ${AI_NAME}`}
          placeholderTextColor={c.textSecondary}
          multiline
          style={[styles.input, { color: c.text, borderColor: c.cardBorder }]}
        />
        <VoiceInput
          onPartial={setInput}
          onTranscript={(said) => {
            setInput(said);
            if (said.trim()) void send(said);
          }}
          color={c.blueText}
          background={c.blueSoft}
          mutedColor={c.textSecondary}
        />
        {thinking ? (
          <Pressable
            accessibilityRole="button"
            onPress={stop}
            style={({ pressed }) => [styles.button, { backgroundColor: c.blueSoft, opacity: pressed ? 0.6 : 1 }]}>
            <ActivityIndicator size="small" color={c.blue} />
            <Text style={[styles.buttonText, { color: c.blue }]}>{AI_NAME} is writing… tap to stop</Text>
          </Pressable>
        ) : (
          <Pressable
            accessibilityRole="button"
            disabled={!input.trim()}
            onPress={() => void send()}
            style={({ pressed }) => [styles.button, { backgroundColor: c.blueSoft, opacity: pressed || !input.trim() ? 0.5 : 1 }]}>
            <Icon name="speak" size={16} color={c.blue} />
            <Text style={[styles.buttonText, { color: c.blue }]}>Say it</Text>
          </Pressable>
        )}
      </View>

      <Pressable accessibilityRole="button" onPress={startFresh} style={styles.changeLink}>
        <Text style={[styles.changeLinkText, { color: c.onBgSoft }]}>Start the conversation over</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  spinner: { marginVertical: 20 },
  card: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 10, gap: 10 },
  cardLabel: { fontSize: 14, fontFamily: Fonts.bodyBold },
  body: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  buttonRow: { flexDirection: 'row', gap: 8 },
  grow: { flex: 1 },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, borderRadius: 11, paddingVertical: 12, paddingHorizontal: 10 },
  buttonText: { fontSize: 14, fontFamily: Fonts.bodyBold },
  turn: { borderWidth: 1.2, borderRadius: 14, paddingVertical: 10, paddingHorizontal: 13, marginBottom: 8, gap: 3 },
  turnWho: { fontSize: 10, fontFamily: Fonts.mono, letterSpacing: 1.2 },
  turnText: { fontSize: 15, lineHeight: 22, fontFamily: Fonts.body },
  bridge: { borderWidth: 1.2, borderRadius: 14, padding: 13, marginBottom: 8, gap: 6 },
  bridgeLabel: { fontSize: 10, fontFamily: Fonts.mono, letterSpacing: 1.2 },
  bridgeTitle: { fontSize: 15.5, fontFamily: Fonts.displaySemibold },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 15, lineHeight: 21, minHeight: 64, textAlignVertical: 'top', fontFamily: Fonts.body },
  changeLink: { paddingVertical: 10, alignItems: 'center' },
  changeLinkText: { fontSize: 12.5, fontFamily: Fonts.body, textDecorationLine: 'underline' },
});
