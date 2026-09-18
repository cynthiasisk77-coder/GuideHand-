// Who the app is talking to.
//
// Every article in here is written for a generic person, because an article
// has to be. The person reading one at three in the morning is not generic.
// Telling the app who you are is what lets it say "Cynthia, you carry an
// EpiPen — use it now" instead of reading out the same page it reads everyone.

import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { Stack } from 'expo-router';

import { KeyboardAwareScrollView } from '@/components/keyboard-aware-scroll';
import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { notePersonalDataChanged } from '@/lib/autoBackup';
import { AboutYou, emptyAboutYou, hasAnything, loadAboutYou, saveAboutYou } from '@/lib/aboutYou';
import { canLock, requestUnlock, UnlockFailure } from '@/lib/deviceLock';
import { loadProfileAccess, markProfileUnlocked, ProfileAccess, saveProfileAccess } from '@/lib/profileAccess';

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

  const [about, setAbout] = useState<AboutYou>(emptyAboutYou());
  const [loaded, setLoaded] = useState(false);
  // "There is no way to hit save." There was — it saved on every keystroke,
  // silently — and to a person that is indistinguishable from not saving at
  // all. The auto-save stays, because it is the safer of the two. This is the
  // button and the confirmation a person needs in order to believe it.
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');

  // The same gate Document Photos has: the phone's own fingerprint, face or
  // passcode. If the phone has none of those set there is nothing to check
  // against, so it opens — and says so, rather than pretending to be locked.
  const [unlocked, setUnlocked] = useState(false);
  const [unlockError, setUnlockError] = useState<UnlockFailure | null>(null);
  const [checkingLock, setCheckingLock] = useState(true);
  const [access, setAccess] = useState<ProfileAccess>('unlock');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const lockable = await canLock();
      if (cancelled) return;
      if (!lockable) {
        setUnlocked(true);
        setUnlockError({ ok: false, reason: 'unavailable' });
        setCheckingLock(false);
        return;
      }
      const result = await requestUnlock('Unlock your details');
      if (cancelled) return;
      if (result.ok) {
        setUnlocked(true);
        markProfileUnlocked();
      } else {
        setUnlockError(result);
      }
      setCheckingLock(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadProfileAccess().then((saved) => {
      if (!cancelled) setAccess(saved);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const retryUnlock = async () => {
    setCheckingLock(true);
    const result = await requestUnlock('Unlock your details');
    if (result.ok) {
      setUnlocked(true);
      setUnlockError(null);
      markProfileUnlocked();
    } else {
      setUnlockError(result);
    }
    setCheckingLock(false);
  };

  const chooseAccess = (next: ProfileAccess) => {
    setAccess(next);
    void saveProfileAccess(next);
  };

  useEffect(() => {
    if (!unlocked) return;
    let cancelled = false;
    loadAboutYou().then((saved) => {
      if (cancelled) return;
      setAbout(saved);
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [unlocked]);

  const patch = useCallback((key: keyof AboutYou, value: string) => {
    setAbout((previous) => {
      const next = { ...previous, [key]: value };
      saveAboutYou(next).catch(() => {});
      notePersonalDataChanged('about-you');
      return next;
    });
  }, []);

  const filled = hasAnything(about);


  const saveNow = async () => {
    setSaveState('saving');
    try {
      await saveAboutYou(about);
      notePersonalDataChanged('about-you');
      setSaveState('saved');
    } catch {
      setSaveState('idle');
    }
  };

  useEffect(() => {
    if (saveState !== 'saved') return;
    const t = setTimeout(() => setSaveState('idle'), 2500);
    return () => clearTimeout(t);
  }, [saveState]);

  if (!unlocked) {
    return (
      <View style={[styles.container, styles.lockScreen, { backgroundColor: c.bg }]}>
        <Stack.Screen options={{ title: 'About You' }} />
        <View style={[styles.lockCard, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
          <View style={[styles.lockIcon, { backgroundColor: c.plumSoft }]}>
            <Icon name="lock" size={24} color={c.plum} />
          </View>
          <Text style={[styles.lockTitle, { color: c.text }]}>Locked</Text>
          <Text style={[styles.lockBody, { color: c.textSecondary }]}>
            {checkingLock
              ? 'Waiting for your fingerprint, face, or passcode…'
              : unlockError?.reason === 'cancelled'
                ? 'Your name, allergies and conditions stay locked until you unlock them.'
                : 'That didn\u2019t match. Try again to see your details.'}
          </Text>
          <Pressable
            accessibilityRole="button"
            disabled={checkingLock}
            onPress={retryUnlock}
            style={({ pressed }) => [styles.lockButton, { backgroundColor: c.plumSoft, opacity: pressed || checkingLock ? 0.6 : 1 }]}>
            <Icon name="lock" size={16} color={c.plum} />
            <Text style={[styles.lockButtonText, { color: c.plum }]}>Unlock</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'About You' }} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
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
                {about.name.trim() ? `Max will call you ${about.name.trim()}.` : 'Max knows this about you.'}
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

          <Pressable
            accessibilityRole="button"
            disabled={saveState === 'saving'}
            onPress={saveNow}
            style={({ pressed }) => [
              styles.save,
              { backgroundColor: saveState === 'saved' ? c.sageSoft : c.plumSoft, borderColor: saveState === 'saved' ? c.sage : c.plum, opacity: pressed ? 0.7 : 1 },
            ]}>
            <Icon name={saveState === 'saved' ? 'check' : 'lock'} size={17} color={saveState === 'saved' ? c.sageText : c.plumText} strokeWidth={2.3} />
            <Text style={[styles.saveText, { color: saveState === 'saved' ? c.sageText : c.plumText }]}>
              {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved on this phone' : 'Save'}
            </Text>
          </Pressable>
          <Text style={[styles.saveNote, { color: c.textSecondary }]}>
            It also saves as you type. The button is here so you can see it took.
          </Text>

          <View style={[styles.privacy, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
            <Text style={[styles.privacyTitle, { color: c.text }]}>Who can see this</Text>
            <Text style={[styles.privacyText, { color: c.textSecondary }]}>
              {unlockError?.reason === 'unavailable'
                ? 'This phone has no fingerprint, face or passcode set, so there is nothing to lock this page behind. Set one in your phone\u2019s Settings and it will be asked for here.'
                : 'This page opens only with your fingerprint, face or passcode \u2014 the same unlock as your phone.'}
            </Text>
            <Text style={[styles.privacyText, { color: c.textSecondary }]}>
              Max reads this too. Whether he needs that same unlock first is up to you:
            </Text>
            {(
              [
                ['unlock', 'Max needs the phone unlocked first', 'Nobody holding your phone can ask Max what you take or what you are allergic to.'],
                ['always', 'Max may use it without unlocking', 'If you are the one hurt, whoever picks up your phone gets answers that already know about you.'],
              ] as [ProfileAccess, string, string][]
            ).map(([value, label, note]) => (
              <Pressable
                key={value}
                accessibilityRole="radio"
                aria-checked={access === value}
                onPress={() => chooseAccess(value)}
                style={({ pressed }) => [
                  styles.choice,
                  { backgroundColor: access === value ? c.plumSoft : c.card, borderColor: access === value ? c.plum : c.cardBorder, opacity: pressed ? 0.75 : 1 },
                ]}>
                <View style={styles.choiceHead}>
                  {access === value ? <Icon name="check" size={14} color={c.plumText} strokeWidth={2.4} /> : null}
                  <Text style={[styles.choiceLabel, { color: c.text }]}>{label}</Text>
                </View>
                <Text style={[styles.choiceNote, { color: c.textSecondary }]}>{note}</Text>
              </Pressable>
            ))}
          </View>

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
      </KeyboardAwareScrollView>
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
  save: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1.5, borderRadius: 13, paddingVertical: 14, marginTop: 4 },
  saveText: { fontSize: 15, fontFamily: Fonts.bodyBold },
  saveNote: { fontSize: 12, lineHeight: 17, textAlign: 'center', fontFamily: Fonts.body, marginTop: -2 },
  lockScreen: { alignItems: 'center', justifyContent: 'center', padding: Spacing.three },
  lockCard: { width: '100%', maxWidth: 420, borderWidth: 1, borderRadius: 18, padding: 22, alignItems: 'center', gap: 10 },
  lockIcon: { width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  lockTitle: { fontSize: 22, fontFamily: Fonts.display },
  lockBody: { fontSize: 13.5, lineHeight: 19.5, textAlign: 'center', fontFamily: Fonts.body },
  lockButton: { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 22, marginTop: 6 },
  lockButtonText: { fontSize: 14.5, fontFamily: Fonts.bodyBold },
  choice: { borderWidth: 1.5, borderRadius: 12, padding: 11, gap: 4, marginTop: 2 },
  choiceHead: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  choiceLabel: { fontSize: 13.5, fontFamily: Fonts.bodySemibold },
  choiceNote: { fontSize: 12.5, lineHeight: 17.5, fontFamily: Fonts.body },
  privacy: { borderWidth: 1, borderRadius: 14, padding: 13, gap: 7, marginTop: 4 },
  privacyTitle: { fontSize: 14, fontFamily: Fonts.displaySemibold },
  privacyText: { fontSize: 12.5, lineHeight: 18, fontFamily: Fonts.body },
});
