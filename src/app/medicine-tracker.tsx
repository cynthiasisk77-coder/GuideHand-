import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { secureGetItem, secureSetItem } from '@/lib/secureData';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { findTopicByTitle } from '@/lib/content';

const STORAGE_KEY = 'guidehand.medicine-tracker.v1';
const GUIDANCE_TOPIC = 'Medical/prescription/OTC inventory and expirations';

interface MedicineEntry {
  id: string;
  name: string;
  dose: string;
  expiration: string;
  inStock: boolean;
}

function generateEntryId(): string {
  return `med-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function MedicineTrackerScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];
  const [entries, setEntries] = useState<MedicineEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const [doseDraft, setDoseDraft] = useState('');
  const [expirationDraft, setExpirationDraft] = useState('');

  useEffect(() => {
    secureGetItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setEntries(JSON.parse(raw));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    secureSetItem(STORAGE_KEY, JSON.stringify(entries)).catch(() => {});
  }, [entries, loaded]);

  const guidance = useMemo(() => findTopicByTitle(GUIDANCE_TOPIC), []);

  const addEntry = () => {
    const name = nameDraft.trim();
    if (!name) return;
    const entry: MedicineEntry = {
      id: generateEntryId(),
      name,
      dose: doseDraft.trim(),
      expiration: expirationDraft.trim(),
      inStock: true,
    };
    setEntries((prev) => [...prev, entry]);
    setNameDraft('');
    setDoseDraft('');
    setExpirationDraft('');
  };

  const toggleStock = (id: string) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, inStock: !e.inStock } : e)));
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const stockedCount = entries.filter((e) => e.inStock).length;

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'Medicine Tracker' }} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={[styles.headerBlock, { backgroundColor: c.blueDeep }]}>
            <Text style={[styles.eyebrow, { color: c.onBlueSoft }]}>Your Supplies</Text>
            <Text style={[styles.title, { color: c.onBlue }]}>Medicine & Prescriptions</Text>
            <Text style={[styles.subhead, { color: c.onBlueSoft }]}>
              {entries.length > 0
                ? `${stockedCount} of ${entries.length} stocked`
                : 'Add your prescriptions and OTC essentials below'}
            </Text>
          </View>

          {guidance ? (
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                router.push({
                  pathname: '/article/[category]/[topic]',
                  params: { category: guidance.categorySlug, topic: guidance.topic.slug },
                })
              }
              style={({ pressed }) => [
                styles.guidanceRow,
                { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.8 : 1 },
              ]}>
              <Text style={[styles.guidanceText, { color: c.text }]}>Read the full written guidance</Text>
              <Icon name="chevron" size={16} color={c.textSecondary} />
            </Pressable>
          ) : null}

          {entries.length === 0 ? (
            <View style={[styles.emptyState, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
              <Text style={[styles.emptyText, { color: c.textSecondary }]}>
                Nothing added yet. Everyone&apos;s prescriptions are different, so this list starts empty — add what
                you actually take below.
              </Text>
            </View>
          ) : (
            entries.map((entry) => (
              <View key={entry.id} style={[styles.entryRow, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                <Pressable
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: entry.inStock }}
                  onPress={() => toggleStock(entry.id)}
                  style={[
                    styles.checkbox,
                    { borderColor: entry.inStock ? c.sage : c.cardBorder, backgroundColor: entry.inStock ? c.sage : 'transparent' },
                  ]}>
                  {entry.inStock ? <Icon name="check" size={13} color="#FFFFFF" strokeWidth={2.5} /> : null}
                </Pressable>
                <View style={styles.entryBody}>
                  <Text style={[styles.entryName, { color: c.text }]}>{entry.name}</Text>
                  {entry.dose ? <Text style={[styles.entryMeta, { color: c.textSecondary }]}>{entry.dose}</Text> : null}
                  {entry.expiration ? (
                    <View style={[styles.expPill, { backgroundColor: c.blueSoft }]}>
                      <Text style={[styles.expText, { color: c.blue }]}>Exp: {entry.expiration}</Text>
                    </View>
                  ) : null}
                </View>
                <Pressable accessibilityRole="button" accessibilityLabel="Remove medicine" onPress={() => removeEntry(entry.id)} hitSlop={8}>
                  <Icon name="trash" size={16} color={c.textSecondary} />
                </Pressable>
              </View>
            ))
          )}

          <View style={[styles.addCard, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
            <Text style={[styles.addLabel, { color: c.text }]}>Add a medicine</Text>
            <TextInput
              value={nameDraft}
              onChangeText={setNameDraft}
              placeholder="Name (e.g. Lisinopril)"
              placeholderTextColor={c.textSecondary}
              style={[styles.input, { color: c.text, borderColor: c.cardBorder }]}
            />
            <TextInput
              value={doseDraft}
              onChangeText={setDoseDraft}
              placeholder="Dose / notes (optional)"
              placeholderTextColor={c.textSecondary}
              style={[styles.input, { color: c.text, borderColor: c.cardBorder }]}
            />
            <TextInput
              value={expirationDraft}
              onChangeText={setExpirationDraft}
              placeholder="Expiration (optional, e.g. 03/2026)"
              placeholderTextColor={c.textSecondary}
              onSubmitEditing={addEntry}
              returnKeyType="done"
              style={[styles.input, { color: c.text, borderColor: c.cardBorder }]}
            />
            <Pressable
              accessibilityRole="button"
              onPress={addEntry}
              style={({ pressed }) => [styles.addButton, { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 }]}>
              <Icon name="plus" size={16} color={c.blue} />
              <Text style={[styles.addButtonText, { color: c.blue }]}>Add</Text>
            </Pressable>
          </View>

          <Text style={[styles.footer, { color: c.textSecondary }]}>
            Saved on this device only, encrypted. Nothing here is sent anywhere.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const SIDE = Spacing.three;

const styles = StyleSheet.create({
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
  guidanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 14,
    padding: 13,
    marginBottom: 14,
  },
  guidanceText: { fontSize: 14, fontFamily: Fonts.bodySemibold },
  emptyState: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.body,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  entryBody: { flex: 1, gap: 4 },
  entryName: {
    fontSize: 15,
    fontFamily: Fonts.displaySemibold,
  },
  entryMeta: {
    fontSize: 13,
    fontFamily: Fonts.body,
  },
  expPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    marginTop: 2,
  },
  expText: {
    fontSize: 11.5,
    fontFamily: Fonts.bodySemibold,
  },
  addCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
    gap: 9,
  },
  addLabel: {
    fontSize: 13,
    fontFamily: Fonts.bodyBold,
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    fontFamily: Fonts.body,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 2,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bodyBold,
  },
  footer: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 17,
    fontFamily: Fonts.body,
  },
});
