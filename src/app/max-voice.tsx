// Choosing the voice Max speaks with.
//
// Every phone has one voice it uses for everything and a handful more it
// never mentions. And there is Max's own: a small model, downloaded once,
// that sounds like a person rather than a phone. Each one has a "Hear it"
// next to it, because a voice is not something to choose from a description.

import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Stack } from 'expo-router';
import * as Speech from 'expo-speech';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { AI_NAME } from '@/lib/askContext';
import {
  isNaturalVoiceOnPhone,
  naturalVoiceState,
  naturalVoiceSupported,
  prepareNaturalVoice,
  subscribeNaturalVoice,
  type NaturalVoiceState,
} from '@/lib/naturalVoice';
import { readAloud, stopReading } from '@/lib/readAloud';
import {
  describePhoneVoices,
  describeVoiceChoice,
  loadVoiceChoice,
  NATURAL_VOICE_SIZE,
  NATURAL_VOICES,
  PHONE_DEFAULT,
  sameVoice,
  saveVoiceChoice,
  type PhoneVoiceRow,
  type VoiceChoice,
} from '@/lib/voiceChoice';

const SAMPLE = `Hi, I'm ${AI_NAME}. Tell me what's happening, and we'll take it one step at a time.`;

export default function MaxVoiceScreen() {
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];

  const [choice, setChoice] = useState<VoiceChoice | undefined>(undefined);
  const [phoneVoices, setPhoneVoices] = useState<PhoneVoiceRow[] | undefined>(undefined);
  const [natural, setNatural] = useState<NaturalVoiceState>(naturalVoiceState());
  const [onPhone, setOnPhone] = useState<boolean | undefined>(undefined);
  // Which row is being sampled right now, so its button can say Stop.
  const [hearing, setHearing] = useState<string | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    loadVoiceChoice().then((saved) => alive && setChoice(saved));
    Speech.getAvailableVoicesAsync()
      .then((voices) => alive && setPhoneVoices(describePhoneVoices(voices)))
      .catch(() => alive && setPhoneVoices([]));
    isNaturalVoiceOnPhone().then((yes) => {
      if (!alive) return;
      setOnPhone(yes);
      // Already downloaded: load it now so "Hear it" works without a wait.
      if (yes) void prepareNaturalVoice({ allowDownload: false });
    });
    const unsubscribe = subscribeNaturalVoice((state) => alive && setNatural(state));
    return () => {
      alive = false;
      unsubscribe();
      stopReading();
    };
  }, []);

  const hear = (voice: VoiceChoice, key: string) => {
    if (hearing === key) {
      stopReading();
      setHearing(undefined);
      return;
    }
    setHearing(key);
    const clear = () => setHearing((now) => (now === key ? undefined : now));
    void readAloud(SAMPLE, { voice, onDone: clear, onError: clear });
  };

  const use = async (voice: VoiceChoice) => {
    setChoice(voice);
    await saveVoiceChoice(voice);
  };

  const download = () => {
    setOnPhone(true);
    void prepareNaturalVoice({ allowDownload: true });
  };

  const naturalReady = natural.kind === 'ready';

  const row = (
    key: string,
    voice: VoiceChoice,
    label: string,
    detail: string | undefined,
    canHear: boolean,
    // A voice that is not on the phone yet cannot be chosen, or the screen
    // would say "Now using: Heart" while the phone's voice did the talking.
    canUse: boolean = true
  ) => {
    const selected = choice !== undefined && sameVoice(choice, voice);
    return (
      <View
        key={key}
        style={[styles.row, { borderColor: selected ? c.blue : c.cardBorder, backgroundColor: c.card, opacity: canUse ? 1 : 0.55 }]}>
        <Pressable
          accessibilityRole="radio"
          accessibilityState={{ checked: selected, disabled: !canUse }}
          accessibilityLabel={`Use ${label}`}
          disabled={!canUse}
          onPress={() => void use(voice)}
          style={({ pressed }) => [styles.rowMain, { opacity: pressed ? 0.7 : 1 }]}>
          <View style={[styles.radio, { borderColor: selected ? c.blue : c.textSecondary }]}>
            {selected ? <View style={[styles.radioDot, { backgroundColor: c.blue }]} /> : null}
          </View>
          <View style={styles.rowText}>
            <Text style={[styles.rowLabel, { color: c.text }]}>{label}</Text>
            {detail ? <Text style={[styles.rowDetail, { color: c.textSecondary }]}>{detail}</Text> : null}
          </View>
        </Pressable>
        {canHear ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hearing === key ? `Stop ${label}` : `Hear ${label}`}
            onPress={() => hear(voice, key)}
            style={({ pressed }) => [styles.hear, { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 }]}>
            <Icon name={hearing === key ? 'stop' : 'speak'} size={15} color={c.blue} />
            <Text style={[styles.hearText, { color: c.blue }]}>{hearing === key ? 'Stop' : 'Hear it'}</Text>
          </Pressable>
        ) : null}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: `${AI_NAME}'s Voice` }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <View
            style={[
              styles.headerBlock,
              { backgroundColor: c.headerBg, borderColor: c.cardBorder, borderLeftColor: c.blue },
            ]}>
            <Text style={[styles.eyebrow, { color: c.textSecondary }]}>Ask {AI_NAME}</Text>
            <Text style={[styles.title, { color: c.text }]}>{AI_NAME}&apos;s voice</Text>
            <Text style={[styles.subhead, { color: c.textSecondary }]}>
              Tap Hear it to try one. Tap the circle to make it {AI_NAME}&apos;s. It is used for answers and for
              every &quot;Read it to me&quot;.
            </Text>
            {choice ? (
              <Text style={[styles.current, { color: c.blue }]}>Now using: {describeVoiceChoice(choice)}</Text>
            ) : null}
          </View>

          {naturalVoiceSupported() ? (
            <>
              <Text style={[styles.sectionLabel, { color: c.blue }]}>{AI_NAME.toUpperCase()}&apos;S OWN VOICE</Text>
              <Text style={[styles.sectionNote, { color: c.textSecondary }]}>
                A real-sounding voice that lives on the phone. Downloads once ({NATURAL_VOICE_SIZE}) on Wi-Fi, then
                works with no signal like everything else here.
              </Text>

              {natural.kind === 'ready' || onPhone === true ? null : onPhone === undefined ? (
                <ActivityIndicator color={c.blue} style={styles.loading} />
              ) : (
                <Pressable
                  accessibilityRole="button"
                  onPress={download}
                  style={({ pressed }) => [styles.button, { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 }]}>
                  <Icon name="download" size={16} color={c.blue} />
                  <Text style={[styles.buttonText, { color: c.blue }]}>Download it — {NATURAL_VOICE_SIZE}, once</Text>
                </Pressable>
              )}

              {natural.kind === 'downloading' ? (
                <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                  <View style={styles.progressRow}>
                    <ActivityIndicator color={c.blue} />
                    <Text style={[styles.cardLabel, { color: c.text }]}>
                      {natural.percent > 0 ? `Downloading — ${natural.percent}%` : 'Starting the download…'}
                    </Text>
                  </View>
                  <View style={[styles.progressTrack, { backgroundColor: c.cardBorder }]}>
                    <View
                      style={[styles.progressFill, { backgroundColor: c.blue, width: `${Math.max(natural.percent, 2)}%` }]}
                    />
                  </View>
                  <Text style={[styles.body, { color: c.textSecondary }]}>Keep this screen open and stay on Wi-Fi.</Text>
                </View>
              ) : null}

              {natural.kind === 'loading' ? (
                <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                  <View style={styles.progressRow}>
                    <ActivityIndicator color={c.blue} />
                    <Text style={[styles.cardLabel, { color: c.text }]}>Getting the voice ready…</Text>
                  </View>
                </View>
              ) : null}

              {natural.kind === 'error' ? (
                <View style={[styles.card, { backgroundColor: c.card, borderColor: c.dangerText ?? c.cardBorder }]}>
                  <Text style={[styles.cardLabel, { color: c.text }]}>That didn&apos;t work</Text>
                  <Text style={[styles.body, { color: c.textSecondary }]} selectable>
                    {natural.message}
                  </Text>
                  <Pressable
                    accessibilityRole="button"
                    onPress={download}
                    style={({ pressed }) => [styles.button, { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 }]}>
                    <Text style={[styles.buttonText, { color: c.blue }]}>Try again</Text>
                  </Pressable>
                </View>
              ) : null}

              {NATURAL_VOICES.map((v) =>
                row(
                  `natural-${v.id}`,
                  { kind: 'natural', voice: v.id },
                  v.name,
                  naturalReady ? v.about : `${v.about} Ready once the download above is done.`,
                  naturalReady,
                  naturalReady
                )
              )}
            </>
          ) : null}

          <Text style={[styles.sectionLabel, { color: c.blue }]}>THE PHONE&apos;S OWN VOICES</Text>
          <Text style={[styles.sectionNote, { color: c.textSecondary }]}>
            Already on the phone, nothing to download. Some phones have several; most only ever use one.
          </Text>

          {row('phone-default', PHONE_DEFAULT, 'The phone’s usual voice', 'Whatever the phone reads everything else with.', true)}

          {phoneVoices === undefined ? (
            <ActivityIndicator color={c.blue} style={styles.loading} />
          ) : phoneVoices.length === 0 ? (
            <Text style={[styles.footnote, { color: c.textSecondary }]}>
              This phone did not list any other voices. Installing Google Text-to-Speech usually adds several.
            </Text>
          ) : (
            phoneVoices.map((v) =>
              row(
                `phone-${v.identifier}`,
                { kind: 'phone', identifier: v.identifier, label: v.label },
                v.label,
                v.detail,
                true
              )
            )
          )}

          <Text style={[styles.footer, { color: c.textSecondary }]}>
            The voice is only ever made on this phone. Nothing you hear was sent anywhere.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const SIDE = Spacing.three;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: 48 },
  content: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: SIDE, paddingTop: SIDE },
  headerBlock: { borderWidth: 1, borderLeftWidth: 5, borderRadius: 14, padding: 16, marginBottom: 18, gap: 6 },
  eyebrow: { fontSize: 11, letterSpacing: 1.4, fontFamily: Fonts.mono },
  title: { fontSize: 24, lineHeight: 30, fontFamily: Fonts.displaySemibold },
  subhead: { fontSize: 13.5, lineHeight: 19.5, fontFamily: Fonts.body },
  current: { fontSize: 13, fontFamily: Fonts.bodyBold, marginTop: 4 },
  sectionLabel: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.2, marginTop: 8, marginBottom: 6, marginLeft: 2 },
  sectionNote: { fontSize: 13, lineHeight: 18.5, fontFamily: Fonts.body, marginBottom: 10 },
  loading: { marginVertical: 14 },
  card: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 10, gap: 10 },
  cardLabel: { fontSize: 14, fontFamily: Fonts.bodyBold },
  body: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressTrack: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 3 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 11,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  buttonText: { fontSize: 14, fontFamily: Fonts.bodyBold },
  row: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderRadius: 12, marginBottom: 8, paddingRight: 8 },
  rowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 11, height: 11, borderRadius: 6 },
  rowText: { flex: 1, minWidth: 0, gap: 2 },
  rowLabel: { fontSize: 15, fontFamily: Fonts.displaySemibold },
  rowDetail: { fontSize: 12.5, lineHeight: 17, fontFamily: Fonts.body },
  hear: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 10, paddingVertical: 9, paddingHorizontal: 11 },
  hearText: { fontSize: 13, fontFamily: Fonts.bodyBold },
  footnote: { fontSize: 12.5, lineHeight: 18, fontFamily: Fonts.body, marginTop: 4, marginBottom: 10 },
  footer: { fontSize: 12, lineHeight: 17, fontFamily: Fonts.body, textAlign: 'center', marginTop: 18 },
});
