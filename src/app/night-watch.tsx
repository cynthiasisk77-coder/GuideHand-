// Night Watch: for the long hours. Somebody to talk to, games to pass the
// time, stories, and a voice that checks in on you. Nothing here needs a
// signal; only Max's chat needs the model.

import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';

import { Icon } from '@/components/icon';
import { KeyboardAwareScrollView } from '@/components/keyboard-aware-scroll';
import { NightWatchCompanion } from '@/components/night-watch-companion';
import { RiddlesPanel, TalkPanel, TriviaPanel, WordChainPanel } from '@/components/night-watch-games';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { NIGHT_STORIES } from '@/content/nightWatch/stories';
import { loadAboutYou } from '@/lib/aboutYou';
import { AI_NAME } from '@/lib/aiName';
import { loadSpeaks, saveSpeaks } from '@/lib/maxSpeaks';
import { CHECK_IN_INTERVALS_MIN, CheckInInterval, checkInLine, clockWords, clockWordsAt } from '@/lib/nightWatch/games';
import { isProfileUnlocked, loadProfileAccess } from '@/lib/profileAccess';
import { readAloud, stopReading } from '@/lib/readAloud';

type Mode = 'sit' | 'trivia' | 'riddles' | 'chain' | 'talk' | 'stories';

const MODES: { key: Mode; label: string }[] = [
  { key: 'sit', label: 'Sit with me' },
  { key: 'trivia', label: 'Trivia' },
  { key: 'riddles', label: 'Riddles' },
  { key: 'chain', label: 'Word chain' },
  { key: 'talk', label: 'Talk' },
  { key: 'stories', label: 'Stories' },
];

const KEEP_AWAKE_TAG = 'night-watch';

/** When the next check-in falls due, as a timestamp. */
function dueIn(minutes: number): number {
  return Date.now() + minutes * 60_000;
}

export default function NightWatchScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];

  const [mode, setMode] = useState<Mode>('sit');
  const [seed, setSeed] = useState<string | undefined>(undefined);
  const [speaks, setSpeaks] = useState<boolean | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [now, setNow] = useState(() => new Date());

  // Check-ins.
  const [checkIns, setCheckIns] = useState(false);
  const [interval, setIntervalMin] = useState<CheckInInterval>(30);
  // When the next check-in is due, as a timestamp. Set whenever the timer
  // (re)starts or ticks.
  const [nextAtMs, setNextAtMs] = useState(0);
  const [lastLine, setLastLine] = useState<string | undefined>(undefined);
  const count = useRef(0);
  const speaksRef = useRef(false);
  useEffect(() => {
    speaksRef.current = speaks === true;
  }, [speaks]);

  useEffect(() => {
    let alive = true;
    loadSpeaks().then((on) => alive && setSpeaks(on));
    // Her name, under the same rule Ask uses: only when the About You setting
    // allows it, or the phone has been unlocked this run.
    Promise.all([loadAboutYou(), loadProfileAccess()]).then(([about, access]) => {
      if (!alive) return;
      if (access === 'always' || isProfileUnlocked()) {
        const first = about.name.trim().split(/\s+/)[0];
        if (first) setName(first);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  // The clock in the header, kept honest.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  // The check-in timer. While it runs the screen stays on, so a phone on the
  // table keeps talking; that costs battery, and the page says so.
  useEffect(() => {
    if (!checkIns) return;
    activateKeepAwakeAsync(KEEP_AWAKE_TAG).catch(() => {});
    const ms = interval * 60_000;
    const id = setInterval(() => {
      const n = ++count.current;
      const line = checkInLine(n, new Date());
      setLastLine(line);
      setNextAtMs(dueIn(interval));
      if (speaksRef.current) void readAloud(line, {});
    }, ms);
    return () => {
      clearInterval(id);
      deactivateKeepAwake(KEEP_AWAKE_TAG).catch(() => {});
    };
  }, [checkIns, interval]);

  const toggleCheckIns = () => {
    setNextAtMs(dueIn(interval));
    setCheckIns((v) => !v);
  };
  const chooseInterval = (m: CheckInInterval) => {
    setNextAtMs(dueIn(m));
    setIntervalMin(m);
  };

  useEffect(() => {
    return () => {
      stopReading();
    };
  }, []);

  const say = (line: string) => {
    if (speaksRef.current) void readAloud(line, {});
  };

  const setSpeaksAndRemember = (next: boolean) => {
    setSpeaks(next);
    saveSpeaks(next);
    if (!next) stopReading();
  };

  const choose = (next: Mode) => {
    stopReading();
    setSeed(undefined);
    setMode(next);
  };

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'Night Watch' }} />
      <KeyboardAwareScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View
            style={[
              styles.headerBlock,
              { backgroundColor: c.headerBg, borderWidth: 1, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.plum },
            ]}>
            <View style={styles.headRow}>
              <Text style={[styles.eyebrow, { color: c.textSecondary }]}>Offline · {clockWords(now)}</Text>
              <Icon name="moon" size={18} color={c.textSecondary} />
            </View>
            <Text style={[styles.title, { color: c.text }]}>Night Watch</Text>
            <Text style={[styles.subhead, { color: c.textSecondary }]}>
              For the long hours: {AI_NAME} to talk to, games to pass the time, stories, and a voice that checks
              in on you. None of it needs a signal.
            </Text>
          </View>

          <Pressable
            accessibilityRole="switch"
            accessibilityState={{ checked: speaks === true }}
            onPress={() => setSpeaksAndRemember(!(speaks === true))}
            style={({ pressed }) => [styles.speaksRow, { opacity: pressed ? 0.7 : 1 }]}>
            <Icon name={speaks === true ? 'speak' : 'stop'} size={15} color={speaks === true ? c.onBg : c.onBgSoft} />
            <Text style={[styles.speaksText, { color: speaks === true ? c.onBg : c.onBgSoft }]}>
              {speaks === true ? `${AI_NAME} talks out loud — tap to make her quiet` : `${AI_NAME} is quiet — tap to have her talk out loud`}
            </Text>
          </Pressable>

          {/* Check-ins */}
          <View style={[styles.card, { backgroundColor: c.card, borderColor: checkIns ? c.sage : c.cardBorder, borderWidth: checkIns ? 1.8 : 1 }]}>
            <Pressable
              accessibilityRole="switch"
              accessibilityState={{ checked: checkIns }}
              onPress={toggleCheckIns}
              style={({ pressed }) => [styles.checkRow, { opacity: pressed ? 0.7 : 1 }]}>
              <View style={[styles.toggle, { backgroundColor: checkIns ? c.sage : c.cardBorder }]}>
                <View style={[styles.knob, { backgroundColor: c.card, alignSelf: checkIns ? 'flex-end' : 'flex-start' }]} />
              </View>
              <View style={styles.checkText}>
                <Text style={[styles.cardLabel, { color: c.text }]}>
                  {checkIns ? `${AI_NAME} checks in every ${interval} minutes` : `Have ${AI_NAME} check in on you`}
                </Text>
                <Text style={[styles.body, { color: c.textSecondary }]}>
                  {checkIns
                    ? `Next at ${clockWordsAt(nextAtMs)}. The screen stays on while this runs, which uses more battery.`
                    : 'A short word from her at a steady interval: the time, a breath, a sip of water, a look at the generator.'}
                </Text>
              </View>
            </Pressable>
            <View style={styles.pills}>
              {CHECK_IN_INTERVALS_MIN.map((m) => (
                <Pressable
                  key={m}
                  accessibilityRole="button"
                  accessibilityState={{ selected: interval === m }}
                  onPress={() => chooseInterval(m)}
                  style={({ pressed }) => [
                    styles.pill,
                    { backgroundColor: interval === m ? c.sageSoft : 'transparent', borderColor: interval === m ? c.sage : c.cardBorder, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <Text style={[styles.pillText, { color: interval === m ? c.sageText : c.textSecondary }]}>{m} min</Text>
                </Pressable>
              ))}
            </View>
            {lastLine ? <Text style={[styles.lastLine, { color: c.text }]}>“{lastLine}”</Text> : null}
          </View>

          {/* What to do */}
          <Text style={[styles.sectionLabel, { color: c.onBgSoft }]}>PASS THE TIME</Text>
          <View style={styles.modes}>
            {MODES.map((m) => (
              <Pressable
                key={m.key}
                accessibilityRole="button"
                accessibilityState={{ selected: mode === m.key }}
                onPress={() => choose(m.key)}
                style={({ pressed }) => [
                  styles.mode,
                  {
                    backgroundColor: mode === m.key ? c.card : 'transparent',
                    borderColor: mode === m.key ? c.card : c.onBgSoft,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}>
                <Text style={[styles.modeText, { color: mode === m.key ? c.text : c.onBg }]}>{m.label}</Text>
              </Pressable>
            ))}
          </View>

          {mode === 'sit' ? (
            speaks === undefined ? null : <NightWatchCompanion key={seed ?? 'sit'} c={c} name={name} speaks={speaks} seed={seed} />
          ) : null}
          {mode === 'trivia' ? <TriviaPanel c={c} say={say} /> : null}
          {mode === 'riddles' ? <RiddlesPanel c={c} say={say} /> : null}
          {mode === 'chain' ? <WordChainPanel c={c} say={say} /> : null}
          {mode === 'talk' ? (
            <TalkPanel
              c={c}
              say={say}
              onTalkToMax={(prompt) => {
                stopReading();
                setSeed(prompt);
                setMode('sit');
              }}
            />
          ) : null}
          {mode === 'stories' ? (
            <>
              <Text style={[styles.storiesNote, { color: c.onBgSoft }]}>
                Old stories that belong to everybody. {AI_NAME} reads them, or you do.
              </Text>
              {NIGHT_STORIES.map((story) => (
                <Pressable
                  key={story.id}
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: '/night-story', params: { id: story.id } })}
                  style={({ pressed }) => [styles.storyRow, { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.7 : 1 }]}>
                  <View style={styles.storyText}>
                    <Text style={[styles.storyTitle, { color: c.text }]}>{story.title}</Text>
                    <Text style={[styles.storyMeta, { color: c.textSecondary }]}>
                      {story.author} · about {story.minutes} min read aloud
                    </Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
              ))}
            </>
          ) : null}

          <Text style={[styles.footer, { color: c.onBgSoft }]}>
            If something is wrong with a person, a fire, or the air, leave this page: Ask {AI_NAME} or the
            emergency pages are the place for that, and she will say so herself.
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const SIDE = Spacing.three;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingTop: 18, paddingBottom: 40 },
  content: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: SIDE },
  headerBlock: { borderRadius: 20, padding: 16, gap: 6, marginBottom: 10 },
  headRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyebrow: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { fontSize: 22, fontFamily: Fonts.display },
  subhead: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },

  speaksRow: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 6, paddingHorizontal: 4, marginBottom: 8 },
  speaksText: { flex: 1, fontSize: 12.5, fontFamily: Fonts.bodySemibold },

  card: { borderRadius: 14, padding: 14, marginBottom: 14, gap: 10 },
  cardLabel: { fontSize: 14, fontFamily: Fonts.bodyBold },
  body: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  checkText: { flex: 1, gap: 3 },
  toggle: { width: 42, height: 24, borderRadius: 12, padding: 3, justifyContent: 'center', marginTop: 1 },
  knob: { width: 18, height: 18, borderRadius: 9 },
  pills: { flexDirection: 'row', gap: 8 },
  pill: { borderWidth: 1.2, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  pillText: { fontSize: 12.5, fontFamily: Fonts.bodySemibold },
  lastLine: { fontSize: 14, lineHeight: 20, fontFamily: Fonts.bodyMedium, fontStyle: 'italic' },

  sectionLabel: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.2, marginBottom: 8, marginLeft: 2 },
  modes: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  mode: { borderWidth: 1.2, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  modeText: { fontSize: 13.5, fontFamily: Fonts.bodySemibold },

  storiesNote: { fontSize: 13, lineHeight: 18.5, fontFamily: Fonts.body, marginBottom: 10, marginLeft: 2 },
  storyRow: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 8 },
  storyText: { flex: 1, minWidth: 0, gap: 2 },
  storyTitle: { fontSize: 15, fontFamily: Fonts.displaySemibold },
  storyMeta: { fontSize: 12, fontFamily: Fonts.body },

  footer: { marginTop: 18, marginBottom: 12, fontSize: 11.5, textAlign: 'center', lineHeight: 17, fontFamily: Fonts.body },
});
