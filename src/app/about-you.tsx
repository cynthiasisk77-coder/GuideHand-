// Who the app is talking to.
//
// Every article in here is written for a generic person, because an article
// has to be. The person reading one at three in the morning is not generic.
// Telling the app who you are is what lets it say "Cynthia, you carry an
// EpiPen — use it now" instead of reading out the same page it reads everyone.

import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { Stack } from 'expo-router';

import { useKeyboardRoom } from '@/hooks/use-keyboard-room';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { notePersonalDataChanged } from '@/lib/autoBackup';
import { AboutYou, emptyAboutYou, hasAnything, loadAboutYou, saveAboutYou } from '@/lib/aboutYou';

interface Field {
  key: keyof AboutYou;
  label: string;
  placeholder: string;
  big?: boolean;
}

const FIELDS: Field[] = [
  { key: 'name', label: 'What should it call you?', placeholder: 'Your name' },
  {
    key: 'allergies',
    label: 'Allergic to',
    placeholder: 'Penicillin, bee stings, shellfish — and what happens',
  },
  {
    key: 'conditions',
    label: 'Ongoing conditions',
    placeholder: 'Asthma, diabetes, heart condition, pregnant, epilepsy',
  },
  {
    key: 'medications',
    label: 'Medicines you take',
    placeholder: 'Blood thinner, insulin, inhaler — and where it is kept',
  },
  { key: 'bloodType', label: 'Blood type', placeholder: 'If you know it' },
  {
    key: 'about',
    label: 'Anything else worth knowing',
    placeholder: 'Hard of hearing on the left. Bad knee. Scared of heights. Whatever you would want somebody helping you to know.',
    big: true,
  },
];

export default function AboutYouScreen() {
  const colorScheme = useColorScheme();
  const c = Calm[colorScheme === 'dark' ? 'dark' : 'light'];
  const keyboard = useKeyboardRoom();

  const [about, setAbout] = useState<AboutYou>(emptyAboutYou());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadAboutYou().then((saved) => {
      if (cancelled) return;
      setAbout(saved);
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const patch = useCallback((key: keyof AboutYou, value: string) => {
    setAbout((previous) => {
      const next = { ...previous, [key]: value };
      saveAboutYou(next).catch(() => {});
      notePersonalDataChanged('about-you');
      return next;
    });
  }, []);

  const filled = hasAnything(about);

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'About You' }} />
      <ScrollView
        contentContainerStyle={[styles.scroll, keyboard > 0 ? { paddingBottom: keyboard + 24 } : null]}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View
            style={[
              styles.headerBlock,
              { backgroundColor: c.headerBg, borderWidth: 1, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.plum },
            ]}>
            <Text style={[styles.eyebrow, { color: c.textSecondary }]}>So it knows who it is helping</Text>
            <Text style={[styles.title, { color: c.text }]}>About You</Text>
            <Text style={[styles.subhead, { color: c.textSecondary }]}>
              Articles are written for everybody, so they are written for nobody in particular. Tell
              the app who you are and it can use your name, point out the part of a page that matters
              for you, and skip what does not apply.
            </Text>
          </View>

          {loaded && filled ? (
            <View style={[styles.banner, { backgroundColor: c.plumSoft, borderColor: c.plum }]}>
              <Icon name="check" size={15} color={c.plumText} strokeWidth={2.4} />
              <Text style={[styles.bannerText, { color: c.plumText }]}>
                {about.name.trim() ? `Ask GuideHand will call you ${about.name.trim()}.` : 'Ask GuideHand knows this about you.'}
              </Text>
            </View>
          ) : null}

          {FIELDS.map((field) => (
            <View key={field.key} style={[styles.field, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
              <Text style={[styles.label, { color: c.text }]}>{field.label}</Text>
              <TextInput
                defaultValue={about[field.key]}
                onChangeText={(text) => patch(field.key, text)}
                placeholder={field.placeholder}
                placeholderTextColor={c.textSecondary}
                multiline={field.big}
                style={[
                  styles.input,
                  field.big ? styles.inputBig : null,
                  { color: c.text, borderColor: c.cardBorder },
                ]}
              />
            </View>
          ))}

          <View style={[styles.privacy, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
            <Text style={[styles.privacyTitle, { color: c.text }]}>Where this goes</Text>
            <Text style={[styles.privacyText, { color: c.textSecondary }]}>
              Nowhere. It is stored encrypted on this phone and included in your backups. The AI that
              reads it runs on this device — your questions and this page are never sent anywhere,
              with or without a signal.
            </Text>
            <Text style={[styles.privacyText, { color: c.textSecondary }]}>
              It does not change what the app tells you is true. The answers still come only from the
              articles; knowing about you just decides which parts get pointed at.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingTop: 14, paddingBottom: 40 },
  content: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: Spacing.three, gap: 10 },
  headerBlock: { borderRadius: 16, padding: 15, gap: 5, marginBottom: 4 },
  eyebrow: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.3, textTransform: 'uppercase' },
  title: { fontSize: 23, fontFamily: Fonts.display },
  subhead: { fontSize: 13.5, lineHeight: 19.5, fontFamily: Fonts.body },
  banner: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1.5, borderRadius: 13, paddingVertical: 11, paddingHorizontal: 13 },
  bannerText: { flex: 1, fontSize: 13, lineHeight: 18.5, fontFamily: Fonts.bodySemibold },
  field: { borderWidth: 1, borderRadius: 14, padding: 13, gap: 7 },
  label: { fontSize: 14, fontFamily: Fonts.displaySemibold },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 11, paddingVertical: 10, fontSize: 14.5, fontFamily: Fonts.body },
  inputBig: { minHeight: 110, textAlignVertical: 'top' },
  privacy: { borderWidth: 1, borderRadius: 14, padding: 13, gap: 7, marginTop: 4 },
  privacyTitle: { fontSize: 14, fontFamily: Fonts.displaySemibold },
  privacyText: { fontSize: 12.5, lineHeight: 18, fontFamily: Fonts.body },
});
