import { useEffect, useMemo, useState } from 'react';
import { Alert, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { Stack } from 'expo-router';
import { canLock, requestUnlock, UnlockFailure } from '@/lib/deviceLock';
import { notePersonalDataChanged } from '@/lib/autoBackup';
import { secureGetItem, secureSetItem } from '@/lib/secureData';
import * as ImagePicker from 'expo-image-picker';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';

const STORAGE_KEY = 'guidehand.document-photos.v1';

interface DocumentEntry {
  id: string;
  label: string;
  dataUri: string;
}

function generateEntryId(): string {
  return `doc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const SUGGESTIONS = ['Driver’s license', 'Passport', 'Insurance card', 'Property deed', 'Vehicle title', 'Immunization record'];

export default function DocumentPhotosScreen() {
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];
  const [entries, setEntries] = useState<DocumentEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [pendingUri, setPendingUri] = useState<string | null>(null);
  const [labelDraft, setLabelDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [unlockError, setUnlockError] = useState<UnlockFailure | null>(null);
  const [checkingLock, setCheckingLock] = useState(true);

  // Ask the phone to confirm it's really them before any photo is read. If the
  // device has no fingerprint, face or passcode set there is nothing to check
  // against, so it opens — and says so, rather than pretending to be locked.
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
      const result = await requestUnlock('Unlock your saved documents');
      if (cancelled) return;
      if (result.ok) setUnlocked(true);
      else setUnlockError(result);
      setCheckingLock(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    secureGetItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setEntries(JSON.parse(raw));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [unlocked]);

  useEffect(() => {
    if (!loaded) return;
    secureSetItem(STORAGE_KEY, JSON.stringify(entries))
      .then(() => notePersonalDataChanged('Documents changed'))
      .catch(() => {});
  }, [entries, loaded]);

  const pickerOptions: ImagePicker.ImagePickerOptions = useMemo(
    () => ({ mediaTypes: ['images'], quality: 0.6, base64: true, allowsEditing: false }),
    []
  );

  const handlePicked = (result: ImagePicker.ImagePickerResult) => {
    if (result.canceled || !result.assets?.[0]?.base64) return;
    const asset = result.assets[0];
    const mime = asset.mimeType ?? 'image/jpeg';
    setPendingUri(`data:${mime};base64,${asset.base64}`);
    setLabelDraft('');
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Camera access needed', 'Turn on camera access for GuideHand in your device settings to photograph a document.');
      return;
    }
    setBusy(true);
    try {
      const result = await ImagePicker.launchCameraAsync(pickerOptions);
      handlePicked(result);
    } finally {
      setBusy(false);
    }
  };

  const chooseFromLibrary = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Photo access needed', 'Turn on photo library access for GuideHand in your device settings to add a document photo.');
      return;
    }
    setBusy(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync(pickerOptions);
      handlePicked(result);
    } finally {
      setBusy(false);
    }
  };

  const saveEntry = () => {
    const label = labelDraft.trim();
    if (!pendingUri || !label) return;
    setEntries((prev) => [...prev, { id: generateEntryId(), label, dataUri: pendingUri }]);
    setPendingUri(null);
    setLabelDraft('');
  };

  const cancelPending = () => {
    setPendingUri(null);
    setLabelDraft('');
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const retryUnlock = async () => {
    setCheckingLock(true);
    const result = await requestUnlock('Unlock your saved documents');
    if (result.ok) {
      setUnlocked(true);
      setUnlockError(null);
    } else {
      setUnlockError(result);
    }
    setCheckingLock(false);
  };

  if (!unlocked) {
    return (
      <View style={[styles.container, styles.lockScreen, { backgroundColor: c.bg }]}>
        <Stack.Screen options={{ title: 'Document Photos' }} />
        <View style={[styles.lockCard, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
          <View style={[styles.lockIcon, { backgroundColor: c.blueSoft }]}>
            <Icon name="lock" size={24} color={c.blue} />
          </View>
          <Text style={[styles.lockTitle, { color: c.text }]}>Locked</Text>
          <Text style={[styles.lockBody, { color: c.textSecondary }]}>
            {checkingLock
              ? 'Waiting for your fingerprint, face, or passcode…'
              : unlockError?.reason === 'cancelled'
                ? 'Your passport and ID photos stay locked until you unlock them.'
                : 'That didn&apos;t match. Try again to see your saved documents.'}
          </Text>
          <Pressable
            accessibilityRole="button"
            disabled={checkingLock}
            onPress={retryUnlock}
            style={({ pressed }) => [
              styles.lockButton,
              { backgroundColor: c.blueSoft, opacity: pressed || checkingLock ? 0.6 : 1 },
            ]}>
            <Icon name="lock" size={16} color={c.blue} />
            <Text style={[styles.lockButtonText, { color: c.blue }]}>Unlock</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'Document Photos' }} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={[styles.headerBlock, { backgroundColor: c.blueDeep }]}>
            <Text style={[styles.eyebrow, { color: c.onBlueSoft }]}>Your Supplies</Text>
            <Text style={[styles.title, { color: c.onBlue }]}>Document Photos</Text>
            <Text style={[styles.subhead, { color: c.onBlueSoft }]}>
              {entries.length > 0 ? `${entries.length} saved` : 'Photograph IDs, insurance, deeds — for quick offline access'}
            </Text>
          </View>

          <View style={[styles.privacyNote, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
            <Text style={[styles.privacyText, { color: c.textSecondary }]}>
              {unlockError?.reason === 'unavailable'
                ? 'Encrypted and saved on this device only. This phone has no fingerprint, face unlock, or passcode set, so GuideHand cannot lock this screen — set one in your phone settings and it will. '
                : 'Encrypted and locked behind your fingerprint or passcode, saved on this device only. '}
              Nothing here is uploaded or sent anywhere — treat this the same as carrying the
              physical documents.
            </Text>
          </View>

          {pendingUri ? (
            <View style={[styles.pendingCard, { backgroundColor: c.card, borderColor: c.blue }]}>
              <Image source={{ uri: pendingUri }} style={styles.pendingImage} resizeMode="contain" />
              <Text style={[styles.addLabel, { color: c.text }]}>What is this?</Text>
              <TextInput
                value={labelDraft}
                onChangeText={setLabelDraft}
                placeholder="e.g. Driver's license"
                placeholderTextColor={c.textSecondary}
                autoFocus
                onSubmitEditing={saveEntry}
                returnKeyType="done"
                style={[styles.input, { color: c.text, borderColor: c.cardBorder }]}
              />
              <View style={styles.pendingActions}>
                <Pressable
                  accessibilityRole="button"
                  onPress={cancelPending}
                  style={({ pressed }) => [styles.secondaryButton, { borderColor: c.cardBorder, opacity: pressed ? 0.7 : 1 }]}>
                  <Text style={[styles.secondaryButtonText, { color: c.textSecondary }]}>Discard</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={saveEntry}
                  disabled={!labelDraft.trim()}
                  style={({ pressed }) => [
                    styles.primaryButton,
                    { backgroundColor: c.blueSoft, opacity: !labelDraft.trim() ? 0.5 : pressed ? 0.7 : 1 },
                  ]}>
                  <Text style={[styles.primaryButtonText, { color: c.blue }]}>Save</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.pickRow}>
              <Pressable
                accessibilityRole="button"
                onPress={takePhoto}
                disabled={busy}
                style={({ pressed }) => [
                  styles.pickButton,
                  { backgroundColor: c.card, borderColor: c.cardBorder, opacity: busy ? 0.6 : pressed ? 0.8 : 1 },
                ]}>
                <Icon name="camera" size={18} color={c.blue} />
                <Text style={[styles.pickButtonText, { color: c.text }]}>Take Photo</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={chooseFromLibrary}
                disabled={busy}
                style={({ pressed }) => [
                  styles.pickButton,
                  { backgroundColor: c.card, borderColor: c.cardBorder, opacity: busy ? 0.6 : pressed ? 0.8 : 1 },
                ]}>
                <Icon name="plus" size={18} color={c.blue} />
                <Text style={[styles.pickButtonText, { color: c.text }]}>Choose from Library</Text>
              </Pressable>
            </View>
          )}

          {entries.length === 0 && !pendingUri ? (
            <View style={[styles.emptyState, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
              <Text style={[styles.emptyText, { color: c.textSecondary }]}>
                Nothing saved yet. Common ones people keep here: {SUGGESTIONS.join(', ')}.
              </Text>
            </View>
          ) : (
            entries.map((entry) => {
              const expanded = expandedId === entry.id;
              return (
                <View key={entry.id} style={[styles.entryRow, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => setExpandedId(expanded ? null : entry.id)}
                    style={styles.entryPressable}>
                    <Image source={{ uri: entry.dataUri }} style={expanded ? styles.thumbLarge : styles.thumb} resizeMode="cover" />
                    <View style={styles.entryBody}>
                      <Text style={[styles.entryName, { color: c.text }]}>{entry.label}</Text>
                      <Text style={[styles.entryMeta, { color: c.textSecondary }]}>{expanded ? 'Tap to shrink' : 'Tap to view'}</Text>
                    </View>
                  </Pressable>
                  <Pressable accessibilityRole="button" accessibilityLabel="Remove document" onPress={() => removeEntry(entry.id)} hitSlop={8}>
                    <Icon name="trash" size={16} color={c.textSecondary} />
                  </Pressable>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const SIDE = Spacing.three;
const isWeb = Platform.OS === 'web';

const styles = StyleSheet.create({
  lockScreen: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.three },
  lockCard: {
    width: '100%',
    maxWidth: 380,
    borderWidth: 1,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    gap: 10,
  },
  lockIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  lockTitle: { fontSize: 20, fontFamily: Fonts.display },
  lockBody: { fontSize: 13.5, lineHeight: 19, textAlign: 'center', fontFamily: Fonts.body },
  lockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 11,
    paddingVertical: 12,
    paddingHorizontal: 28,
    marginTop: 6,
  },
  lockButtonText: { fontSize: 14.5, fontFamily: Fonts.bodyBold },
  container: { flex: 1 },
  scroll: { paddingTop: 18, paddingBottom: 40 },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: SIDE,
  },
  headerBlock: {
    borderRadius: 20,
    padding: 16,
    gap: 6,
    marginBottom: 14,
  },
  eyebrow: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: { fontSize: 22, fontFamily: Fonts.display },
  subhead: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.body,
  },
  privacyNote: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  privacyText: {
    fontSize: 12.5,
    lineHeight: 18,
    fontFamily: Fonts.body,
  },
  pickRow: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 10,
    marginBottom: 14,
  },
  pickButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
  },
  pickButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bodySemibold,
  },
  emptyState: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.body,
  },
  pendingCard: {
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    gap: 9,
  },
  pendingImage: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    backgroundColor: '#00000010',
  },
  addLabel: {
    fontSize: 13,
    fontFamily: Fonts.bodyBold,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    fontFamily: Fonts.body,
  },
  pendingActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 2,
  },
  primaryButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
  },
  primaryButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bodyBold,
  },
  secondaryButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bodySemibold,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  entryPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  thumb: {
    width: 52,
    height: 52,
    borderRadius: 8,
  },
  thumbLarge: {
    width: 96,
    height: 96,
    borderRadius: 8,
  },
  entryBody: { flex: 1, gap: 2 },
  entryName: {
    fontSize: 15,
    fontFamily: Fonts.displaySemibold,
  },
  entryMeta: {
    fontSize: 12,
    fontFamily: Fonts.body,
  },
});
