import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { notePersonalDataChanged } from '@/lib/autoBackup';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { SUPPLY_CACHE_SECTIONS } from '@/content/supplyCache';
import { findTopicByTitle } from '@/lib/content';

const STORAGE_KEY = 'guidehand.supply-cache.v1';
const GUIDANCE_TOPIC = 'Home emergency supply cache (72 hours to 2 weeks)';

interface CustomItem {
  id: string;
  label: string;
}

interface StoredState {
  checked: Record<string, boolean>;
  custom: Record<string, CustomItem[]>;
}

const EMPTY_STATE: StoredState = { checked: {}, custom: {} };

function generateCustomId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function SupplyCacheScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];
  const [state, setState] = useState<StoredState>(EMPTY_STATE);
  const [loaded, setLoaded] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          const parsed = JSON.parse(raw);
          setState({ checked: parsed.checked ?? {}, custom: parsed.custom ?? {} });
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      .then(() => notePersonalDataChanged('Supply cache changed'))
      .catch(() => {});
  }, [state, loaded]);

  const guidance = useMemo(() => findTopicByTitle(GUIDANCE_TOPIC), []);

  const toggle = (id: string) => {
    setState((prev) => ({ ...prev, checked: { ...prev.checked, [id]: !prev.checked[id] } }));
  };

  const addCustomItem = (sectionId: string) => {
    const label = (drafts[sectionId] ?? '').trim();
    if (!label) return;
    const item: CustomItem = { id: generateCustomId(), label };
    setState((prev) => ({
      ...prev,
      custom: { ...prev.custom, [sectionId]: [...(prev.custom[sectionId] ?? []), item] },
    }));
    setDrafts((prev) => ({ ...prev, [sectionId]: '' }));
  };

  const removeCustomItem = (sectionId: string, id: string) => {
    setState((prev) => {
      const { [id]: _removed, ...restChecked } = prev.checked;
      return {
        checked: restChecked,
        custom: { ...prev.custom, [sectionId]: (prev.custom[sectionId] ?? []).filter((i) => i.id !== id) },
      };
    });
  };

  let total = 0;
  let packed = 0;
  for (const section of SUPPLY_CACHE_SECTIONS) {
    total += section.items.length;
    packed += section.items.filter((i) => state.checked[i.id]).length;
    const custom = state.custom[section.id] ?? [];
    total += custom.length;
    packed += custom.filter((i) => state.checked[i.id]).length;
  }

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'Supply Cache' }} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={[styles.headerBlock, { backgroundColor: c.headerBg, borderWidth: 1, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.sage }]}>
            <Text style={[styles.eyebrow, { color: c.textSecondary }]}>Your Supplies</Text>
            <Text style={[styles.title, { color: c.text }]}>Home Supply Cache</Text>
            <Text style={[styles.subhead, { color: c.textSecondary }]}>
              {total > 0 ? `${packed} of ${total} packed` : 'Check off what you have, add what\'s missing'}
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

          {SUPPLY_CACHE_SECTIONS.map((section) => {
            const custom = state.custom[section.id] ?? [];
            return (
              <View key={section.id} style={styles.section}>
                <Text style={[styles.sectionLabel, { color: c.blue }]}>{section.name.toUpperCase()}</Text>

                {section.items.map((item) => (
                  <ChecklistRow
                    key={item.id}
                    label={item.label}
                    checked={Boolean(state.checked[item.id])}
                    onToggle={() => toggle(item.id)}
                    c={c}
                  />
                ))}
                {custom.map((item) => (
                  <ChecklistRow
                    key={item.id}
                    label={item.label}
                    checked={Boolean(state.checked[item.id])}
                    onToggle={() => toggle(item.id)}
                    onRemove={() => removeCustomItem(section.id, item.id)}
                    c={c}
                  />
                ))}

                <View style={[styles.addRow, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                  <TextInput
                    value={drafts[section.id] ?? ''}
                    onChangeText={(text) => setDrafts((prev) => ({ ...prev, [section.id]: text }))}
                    onSubmitEditing={() => addCustomItem(section.id)}
                    placeholder="Add your own item"
                    placeholderTextColor={c.textSecondary}
                    style={[styles.addInput, { color: c.text }]}
                    returnKeyType="done"
                  />
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Add item to ${section.name}`}
                    onPress={() => addCustomItem(section.id)}
                    style={({ pressed }) => [styles.addButton, { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 }]}>
                    <Icon name="plus" size={16} color={c.blue} />
                  </Pressable>
                </View>
              </View>
            );
          })}

          <Text style={[styles.footer, { color: c.textSecondary }]}>
            Saved on this device only. Nothing here is sent anywhere.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

interface ChecklistPalette {
  card: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  sage: string;
}

function ChecklistRow({
  label,
  checked,
  onToggle,
  onRemove,
  c,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  onRemove?: () => void;
  c: ChecklistPalette;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={onToggle}
      style={({ pressed }) => [
        styles.itemRow,
        { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.8 : 1 },
      ]}>
      <View
        style={[
          styles.checkbox,
          { borderColor: checked ? c.sage : c.cardBorder, backgroundColor: checked ? c.sage : 'transparent' },
        ]}>
        {checked ? <Icon name="check" size={13} color="#FFFFFF" strokeWidth={2.5} /> : null}
      </View>
      <Text
        style={[
          styles.itemText,
          { color: checked ? c.textSecondary : c.text, textDecorationLine: checked ? 'line-through' : 'none' },
        ]}>
        {label}
      </Text>
      {onRemove ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Remove item" onPress={onRemove} hitSlop={8}>
          <Icon name="trash" size={16} color={c.textSecondary} />
        </Pressable>
      ) : null}
    </Pressable>
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
    marginBottom: 10,
  },
  guidanceText: { fontSize: 14, fontFamily: Fonts.bodySemibold },
  section: { marginTop: 16 },
  sectionLabel: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 2,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 12,
    marginBottom: 7,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    flex: 1,
    fontSize: 14.5,
    lineHeight: 20,
    fontFamily: Fonts.body,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 12,
    paddingRight: 6,
    paddingVertical: 6,
  },
  addInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 6,
    fontFamily: Fonts.body,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
