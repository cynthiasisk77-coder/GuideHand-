import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { useKeyboardRoom } from '@/hooks/use-keyboard-room';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import {
  INVENTORY_CATEGORIES,
  INVENTORY_STARTER_ITEMS,
  InventoryCategory,
  InventoryStarterItem,
} from '@/content/inventoryTemplate';
import { notePersonalDataChanged } from '@/lib/autoBackup';
import {
  DEFAULT_HOUSEHOLD,
  expiryBucket,
  ExpiryBucket,
  expiringSoon,
  foodSummary,
  formatDays,
  formatExpiry,
  HOUSEHOLD_KEY,
  Household,
  INVENTORY_KEY,
  InventoryItem,
  parseExpiry,
  phoneCharges,
  TYPICAL_PHONE_MAH,
  unitLabel,
  UNITS,
  waterSummary,
} from '@/lib/inventory';

const STARTER_BY_ID = new Map<string, InventoryStarterItem>(
  INVENTORY_STARTER_ITEMS.map((item) => [item.id, item])
);

function starterToItem(starter: InventoryStarterItem): InventoryItem {
  return { ...starter, quantity: 0 };
}

/**
 * A starter row nobody has touched is a default, not data. Recognising them
 * keeps two things honest: storage holds only what a person actually entered,
 * and the automatic snapshot does not treat sixty empty rows as a backup worth
 * keeping — which is the exact failure that once overwrote a real one.
 */
function isPristine(item: InventoryItem): boolean {
  const starter = STARTER_BY_ID.get(item.id);
  if (!starter) return false;
  return (
    item.quantity === 0 &&
    !item.expires &&
    !item.where &&
    item.unitId === starter.unitId &&
    item.caloriesPerUnit === starter.caloriesPerUnit &&
    item.mahPerUnit === starter.mahPerUnit
  );
}

/**
 * Stored rows win, template rows fill the gaps. Written this way so that
 * adding a row to the template in a later version reaches people who already
 * have an inventory, instead of only new installs.
 */
function mergeWithTemplate(stored: InventoryItem[]): InventoryItem[] {
  const remaining = new Map(stored.map((item) => [item.id, item]));
  const merged: InventoryItem[] = [];
  for (const starter of INVENTORY_STARTER_ITEMS) {
    const existing = remaining.get(starter.id);
    merged.push(existing ?? starterToItem(starter));
    remaining.delete(starter.id);
  }
  for (const own of remaining.values()) merged.push(own);
  return merged;
}

function newItemId(): string {
  return `own-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function InventoryScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];
  const keyboard = useKeyboardRoom();

  const [items, setItems] = useState<InventoryItem[]>(() =>
    INVENTORY_STARTER_ITEMS.map(starterToItem)
  );
  const [household, setHousehold] = useState<Household>(DEFAULT_HOUSEHOLD);
  const [loaded, setLoaded] = useState(false);
  const [openId, setOpenId] = useState<string | undefined>(undefined);
  const [openCategory, setOpenCategory] = useState<string | undefined>('water');
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [editingHousehold, setEditingHousehold] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([AsyncStorage.getItem(INVENTORY_KEY), AsyncStorage.getItem(HOUSEHOLD_KEY)])
      .then(([rawItems, rawHousehold]) => {
        if (cancelled) return;
        if (rawItems) {
          const parsed = JSON.parse(rawItems);
          if (Array.isArray(parsed)) setItems(mergeWithTemplate(parsed));
        }
        if (rawHousehold) {
          const parsed = JSON.parse(rawHousehold);
          setHousehold({
            people: Number(parsed?.people) || DEFAULT_HOUSEHOLD.people,
            caloriesPerPerson: Number(parsed?.caloriesPerPerson) || DEFAULT_HOUSEHOLD.caloriesPerPerson,
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const worthKeeping = items.filter((item) => !isPristine(item));
    AsyncStorage.setItem(INVENTORY_KEY, JSON.stringify(worthKeeping))
      // Chained, never called beside the save: a snapshot taken before the
      // write lands captures the value being replaced.
      .then(() => notePersonalDataChanged('Supply inventory changed'))
      .catch(() => {});
  }, [items, loaded]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(HOUSEHOLD_KEY, JSON.stringify(household)).catch(() => {});
  }, [household, loaded]);

  const update = useCallback((id: string, patch: Partial<InventoryItem>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setOpenId((current) => (current === id ? undefined : current));
  }, []);

  const addItem = (category: InventoryCategory) => {
    const name = (drafts[category.id] ?? '').trim();
    if (!name) return;
    const created: InventoryItem = {
      id: newItemId(),
      categoryId: category.id,
      name,
      quantity: 1,
      unitId: category.unitIds[0],
      caloriesPerUnit: category.tracksCalories ? 0 : undefined,
    };
    setItems((prev) => [...prev, created]);
    setDrafts((prev) => ({ ...prev, [category.id]: '' }));
    setOpenId(created.id);
  };

  const water = useMemo(
    () => waterSummary(items.filter((i) => i.categoryId === 'water'), household),
    [items, household]
  );
  const food = useMemo(
    () => foodSummary(items.filter((i) => i.categoryId === 'food'), household),
    [items, household]
  );
  const charges = useMemo(() => phoneCharges(items), [items]);
  const expiring = useMemo(() => expiringSoon(items), [items]);
  const stocked = useMemo(() => items.filter((i) => i.quantity > 0).length, [items]);

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'Supply Inventory' }} />
      <ScrollView
        contentContainerStyle={[styles.scroll, keyboard > 0 ? { paddingBottom: keyboard + 24 } : null]}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View
            style={[
              styles.headerBlock,
              {
                backgroundColor: c.headerBg,
                borderWidth: 1,
                borderColor: c.cardBorder,
                borderLeftWidth: 5,
                borderLeftColor: c.sage,
              },
            ]}>
            <Text style={[styles.eyebrow, { color: c.textSecondary }]}>Your Supplies</Text>
            <Text style={[styles.title, { color: c.text }]}>Supply Inventory</Text>
            <Text style={[styles.subhead, { color: c.textSecondary }]}>
              {stocked > 0
                ? `${stocked} ${stocked === 1 ? 'thing' : 'things'} counted`
                : 'Put a number beside what you actually have. Everything starts at zero.'}
            </Text>
          </View>

          {/* --- how long it lasts ------------------------------------- */}
          <View style={styles.readoutRow}>
            <ReadoutCard
              label="WATER"
              summary={water}
              blank="No water counted"
              accent={c.blue}
              c={c}
            />
            <ReadoutCard
              label="FOOD"
              summary={food}
              blank="No food counted"
              accent={c.sage}
              c={c}
            />
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => setEditingHousehold((open) => !open)}
            style={({ pressed }) => [
              styles.householdRow,
              { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.8 : 1 },
            ]}>
            <Icon name="family" size={16} color={c.textSecondary} />
            <Text style={[styles.householdText, { color: c.text }]}>
              Counted for {household.people} {household.people === 1 ? 'person' : 'people'} ·{' '}
              {household.caloriesPerPerson.toLocaleString()} cal a day each
            </Text>
            <Icon name="chevron" size={15} color={c.textSecondary} />
          </Pressable>

          {editingHousehold ? (
            <View style={[styles.editor, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
              <Stepper
                label="People in the household"
                value={household.people}
                onChange={(people) => setHousehold((h) => ({ ...h, people: Math.max(1, people) }))}
                c={c}
              />
              <Stepper
                label="Calories per person per day"
                value={household.caloriesPerPerson}
                step={250}
                onChange={(cal) =>
                  setHousehold((h) => ({ ...h, caloriesPerPerson: Math.max(250, cal) }))
                }
                c={c}
              />
              <Text style={[styles.hint, { color: c.textSecondary }]}>
                2,000 a day is the ordinary reference figure. Someone hauling water, clearing debris
                or staying warm without heat burns considerably more, so raise it if you want the
                harder number.
              </Text>
            </View>
          ) : null}

          {/* --- what goes first --------------------------------------- */}
          {expiring.length > 0 ? (
            <View
              style={[
                styles.card,
                { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.danger },
              ]}>
              <Text style={[styles.cardLabel, { color: c.text }]}>Dates coming up</Text>
              {expiring.map((item) => {
                const bucket = expiryBucket(item.expires);
                return (
                  <View key={item.id} style={styles.expiryRow}>
                    <View style={[styles.dot, { backgroundColor: bucketColor(bucket, c) }]} />
                    <Text style={[styles.expiryName, { color: c.text }]} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={[styles.expiryWhen, { color: bucketColor(bucket, c) }]}>
                      {bucket === 'expired' ? 'past' : formatExpiry(item.expires)}
                    </Text>
                  </View>
                );
              })}
              <Text style={[styles.hint, { color: c.textSecondary }]}>
                On most shelf-stable food a stamped date is about quality, not safety — a sound,
                unswollen, unrusted can is usually still food well past it. Water you bottled
                yourself is the one worth rotating on schedule. Medicines are the exception: those
                live in the Medicine Tracker and their dates mean more.
              </Text>
            </View>
          ) : null}

          {charges >= 0.1 ? (
            <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: c.text }]}>
                Roughly {charges < 10 ? Math.round(charges * 10) / 10 : Math.round(charges)} phone
                {charges >= 1.95 || charges < 1 ? ' charges' : ' charge'} in your power banks
              </Text>
              <Text style={[styles.hint, { color: c.textSecondary }]}>
                Counting about two thirds of the printed rating, because stepping the cells up to USB
                voltage costs the rest, and a {TYPICAL_PHONE_MAH.toLocaleString()} mAh phone. Yours
                may differ.
              </Text>
            </View>
          ) : null}

          {/* --- the rows ---------------------------------------------- */}
          {INVENTORY_CATEGORIES.map((category) => {
            const rows = items.filter((item) => item.categoryId === category.id);
            const counted = rows.filter((item) => item.quantity > 0).length;
            const open = openCategory === category.id;
            return (
              <View key={category.id} style={styles.section}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded: open }}
                  onPress={() => setOpenCategory(open ? undefined : category.id)}
                  style={({ pressed }) => [
                    styles.sectionHead,
                    { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.8 : 1 },
                  ]}>
                  <View style={styles.sectionHeadText}>
                    <Text style={[styles.sectionName, { color: c.text }]}>{category.name}</Text>
                    <Text style={[styles.sectionCount, { color: c.textSecondary }]}>
                      {counted > 0 ? `${counted} of ${rows.length} counted` : `${rows.length} rows, none counted`}
                    </Text>
                  </View>
                  <View style={[styles.chevron, open ? styles.chevronOpen : null]}>
                    <Icon name="chevron" size={16} color={c.textSecondary} />
                  </View>
                </Pressable>

                {open ? (
                  <>
                    <Text style={[styles.sectionNote, { color: c.textSecondary }]}>{category.note}</Text>

                    {rows.map((item) => (
                      <ItemRow
                        key={item.id}
                        item={item}
                        category={category}
                        expanded={openId === item.id}
                        onToggle={() => setOpenId(openId === item.id ? undefined : item.id)}
                        onUpdate={(patch) => update(item.id, patch)}
                        onRemove={STARTER_BY_ID.has(item.id) ? undefined : () => removeItem(item.id)}
                        c={c}
                      />
                    ))}

                    <View style={[styles.addRow, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                      <TextInput
                        value={drafts[category.id] ?? ''}
                        onChangeText={(text) => setDrafts((prev) => ({ ...prev, [category.id]: text }))}
                        onSubmitEditing={() => addItem(category)}
                        placeholder="Add something of your own"
                        placeholderTextColor={c.textSecondary}
                        style={[styles.addInput, { color: c.text }]}
                        returnKeyType="done"
                      />
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Add to ${category.name}`}
                        onPress={() => addItem(category)}
                        style={({ pressed }) => [
                          styles.addButton,
                          { backgroundColor: c.sageSoft, opacity: pressed ? 0.7 : 1 },
                        ]}>
                        <Icon name="plus" size={16} color={c.sage} />
                      </Pressable>
                    </View>
                  </>
                ) : null}
              </View>
            );
          })}

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/supply-cache')}
            style={({ pressed }) => [
              styles.linkRow,
              { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.8 : 1 },
            ]}>
            <Icon name="checklist" size={16} color={c.sage} />
            <Text style={[styles.linkText, { color: c.text }]}>
              Home Supplies — what you should have, as a checklist
            </Text>
            <Icon name="chevron" size={15} color={c.textSecondary} />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/medicine-tracker')}
            style={({ pressed }) => [
              styles.linkRow,
              { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.8 : 1 },
            ]}>
            <Icon name="medical" size={16} color={c.danger} />
            <Text style={[styles.linkText, { color: c.text }]}>
              Medicines belong in the Medicine Tracker, where they are encrypted
            </Text>
            <Icon name="chevron" size={15} color={c.textSecondary} />
          </Pressable>

          <Text style={[styles.footer, { color: c.textSecondary }]}>
            Saved on this device only, and included in your backups. Nothing here is sent anywhere.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------

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

function bucketColor(bucket: ExpiryBucket, c: Palette): string {
  if (bucket === 'expired') return c.danger;
  if (bucket === 'soon') return c.plum;
  return c.textSecondary;
}

function ReadoutCard({
  label,
  summary,
  blank,
  accent,
  c,
}: {
  label: string;
  summary: { days: number; pastDateDays: number; empty: boolean };
  blank: string;
  accent: string;
  c: Palette;
}) {
  return (
    <View
      style={[
        styles.readout,
        { backgroundColor: c.card, borderColor: c.cardBorder, borderTopWidth: 4, borderTopColor: accent },
      ]}>
      <Text style={[styles.readoutLabel, { color: accent }]}>{label}</Text>
      {summary.empty ? (
        <Text style={[styles.readoutBlank, { color: c.textSecondary }]}>{blank}</Text>
      ) : (
        <>
          <Text style={[styles.readoutValue, { color: c.text }]}>{formatDays(summary.days)}</Text>
          {summary.pastDateDays > 0.05 ? (
            <Text style={[styles.readoutNote, { color: c.textSecondary }]}>
              {/* Saying "6.3 days of that is past its date" when 6.3 days is
                  the whole figure reads like a riddle. Say it plainly. */}
              {summary.pastDateDays >= summary.days - 0.05
                ? 'All of it is past its date'
                : `${formatDays(summary.pastDateDays)} of that is past its date`}
            </Text>
          ) : null}
        </>
      )}
    </View>
  );
}

function Stepper({
  label,
  value,
  step = 1,
  onChange,
  c,
}: {
  label: string;
  value: number;
  step?: number;
  onChange: (next: number) => void;
  c: Palette;
}) {
  return (
    <View style={styles.stepperRow}>
      <Text style={[styles.stepperLabel, { color: c.text }]}>{label}</Text>
      <View style={styles.stepperControls}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Decrease ${label}`}
          onPress={() => onChange(value - step)}
          style={({ pressed }) => [
            styles.stepperButton,
            { backgroundColor: c.cardBorder, opacity: pressed ? 0.6 : 1 },
          ]}>
          <Text style={[styles.stepperSign, { color: c.text }]}>−</Text>
        </Pressable>
        <Text style={[styles.stepperValue, { color: c.text }]}>{value.toLocaleString()}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Increase ${label}`}
          onPress={() => onChange(value + step)}
          style={({ pressed }) => [
            styles.stepperButton,
            { backgroundColor: c.cardBorder, opacity: pressed ? 0.6 : 1 },
          ]}>
          <Text style={[styles.stepperSign, { color: c.text }]}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ItemRow({
  item,
  category,
  expanded,
  onToggle,
  onUpdate,
  onRemove,
  c,
}: {
  item: InventoryItem;
  category: InventoryCategory;
  expanded: boolean;
  onToggle: () => void;
  onUpdate: (patch: Partial<InventoryItem>) => void;
  onRemove?: () => void;
  c: Palette;
}) {
  const [expiryDraft, setExpiryDraft] = useState(item.expires ?? '');
  const bucket = expiryBucket(item.expires);
  const counted = item.quantity > 0;

  const commitExpiry = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      onUpdate({ expires: undefined });
      setExpiryDraft('');
      return;
    }
    const parsed = parseExpiry(trimmed);
    onUpdate({ expires: parsed });
    setExpiryDraft(parsed ? formatExpiry(parsed) : trimmed);
  };

  return (
    <View
      style={[
        styles.item,
        {
          backgroundColor: c.card,
          borderColor: expanded ? c.sage : c.cardBorder,
          borderLeftWidth: counted ? 4 : 1,
          borderLeftColor: counted ? c.sage : c.cardBorder,
        },
      ]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={onToggle}
        style={({ pressed }) => [styles.itemHead, { opacity: pressed ? 0.75 : 1 }]}>
        <View style={styles.itemText}>
          <Text style={[styles.itemName, { color: counted ? c.text : c.textSecondary }]}>
            {item.name}
          </Text>
          {item.where ? (
            <Text style={[styles.itemWhere, { color: c.textSecondary }]}>{item.where}</Text>
          ) : null}
        </View>
        {item.expires ? (
          <View style={[styles.chip, { backgroundColor: bucket === 'fine' ? c.cardBorder : c.dangerSoft }]}>
            <Text style={[styles.chipText, { color: bucketColor(bucket, c) }]}>
              {formatExpiry(item.expires)}
            </Text>
          </View>
        ) : null}
        <Text style={[styles.itemQuantity, { color: counted ? c.sage : c.textSecondary }]}>
          {counted ? `${item.quantity} ${unitLabel(item.unitId, item.quantity)}` : '—'}
        </Text>
      </Pressable>

      {expanded ? (
        <View style={[styles.itemBody, { borderTopColor: c.cardBorder }]}>
          <Stepper
            label="How many"
            value={item.quantity}
            onChange={(next) => onUpdate({ quantity: Math.max(0, next) })}
            c={c}
          />

          <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>MEASURED IN</Text>
          <View style={styles.chipWrap}>
            {category.unitIds.map((unitId) => {
              const active = item.unitId === unitId;
              return (
                <Pressable
                  key={unitId}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  onPress={() => onUpdate({ unitId })}
                  style={({ pressed }) => [
                    styles.unitChip,
                    {
                      backgroundColor: active ? c.sageSoft : 'transparent',
                      borderColor: active ? c.sage : c.cardBorder,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}>
                  <Text style={[styles.unitChipText, { color: active ? c.sage : c.textSecondary }]}>
                    {UNITS[unitId]?.label ?? unitId}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {category.tracksCalories ? (
            <>
              <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>
                CALORIES IN ONE {(UNITS[item.unitId]?.singular ?? 'unit').toUpperCase()}
              </Text>
              <TextInput
                defaultValue={item.caloriesPerUnit ? String(item.caloriesPerUnit) : ''}
                onChangeText={(text) => onUpdate({ caloriesPerUnit: Number(text.replace(/[^0-9]/g, '')) || 0 })}
                keyboardType="number-pad"
                placeholder="Read it off your label"
                placeholderTextColor={c.textSecondary}
                style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
              />
            </>
          ) : null}

          {category.tracksPower ? (
            <>
              <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>
                RATED mAh, IF IT IS A BATTERY BANK
              </Text>
              <TextInput
                defaultValue={item.mahPerUnit ? String(item.mahPerUnit) : ''}
                onChangeText={(text) => {
                  const value = Number(text.replace(/[^0-9]/g, ''));
                  onUpdate({ mahPerUnit: value > 0 ? value : undefined });
                }}
                keyboardType="number-pad"
                placeholder="Leave blank for loose batteries and fuel"
                placeholderTextColor={c.textSecondary}
                style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
              />
            </>
          ) : null}

          <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>DATE ON THE LABEL</Text>
          <TextInput
            value={expiryDraft}
            onChangeText={setExpiryDraft}
            onBlur={() => commitExpiry(expiryDraft)}
            onSubmitEditing={() => commitExpiry(expiryDraft)}
            placeholder="3/27, March 2027, 2027-03-15 — any of these"
            placeholderTextColor={c.textSecondary}
            style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
            returnKeyType="done"
          />
          {expiryDraft.trim() && !parseExpiry(expiryDraft) ? (
            <Text style={[styles.fieldError, { color: c.dangerText }]}>
              Couldn&apos;t read that as a date. Try 3/27 or March 2027.
            </Text>
          ) : null}

          <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>WHERE IT IS</Text>
          <TextInput
            defaultValue={item.where ?? ''}
            onChangeText={(text) => onUpdate({ where: text.trim() ? text : undefined })}
            placeholder="Garage shelf, under the stairs…"
            placeholderTextColor={c.textSecondary}
            style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
            returnKeyType="done"
          />

          {onRemove ? (
            <Pressable
              accessibilityRole="button"
              onPress={onRemove}
              style={({ pressed }) => [styles.removeRow, { opacity: pressed ? 0.6 : 1 }]}>
              <Icon name="trash" size={15} color={c.danger} />
              <Text style={[styles.removeText, { color: c.dangerText }]}>Remove this row</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const SIDE = Spacing.three;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingTop: 18, paddingBottom: 40 },
  content: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: SIDE },

  headerBlock: { borderRadius: 20, padding: 16, gap: 6, marginBottom: 14 },
  eyebrow: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { fontSize: 22, fontFamily: Fonts.display },
  subhead: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },

  readoutRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  readout: { flex: 1, borderWidth: 1, borderRadius: 14, padding: 13, gap: 4 },
  readoutLabel: { fontSize: 10.5, fontFamily: Fonts.mono, letterSpacing: 1.2 },
  readoutValue: { fontSize: 21, fontFamily: Fonts.display },
  readoutNote: { fontSize: 11.5, lineHeight: 16, fontFamily: Fonts.body },
  readoutBlank: { fontSize: 13, lineHeight: 18, fontFamily: Fonts.body },

  householdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  householdText: { flex: 1, fontSize: 13, fontFamily: Fonts.bodyMedium },

  editor: { borderWidth: 1, borderRadius: 14, padding: 14, gap: 12, marginBottom: 10 },

  card: { borderWidth: 1, borderRadius: 14, padding: 14, gap: 9, marginBottom: 10 },
  cardLabel: { fontSize: 14.5, fontFamily: Fonts.bodyBold },
  hint: { fontSize: 12, lineHeight: 17.5, fontFamily: Fonts.body },

  expiryRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  expiryName: { flex: 1, fontSize: 13.5, fontFamily: Fonts.body },
  expiryWhen: { fontSize: 12, fontFamily: Fonts.monoMedium },

  section: { marginTop: 12 },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 13,
  },
  sectionHeadText: { flex: 1, gap: 2 },
  sectionName: { fontSize: 15.5, fontFamily: Fonts.displaySemibold },
  sectionCount: { fontSize: 12, fontFamily: Fonts.body },
  chevron: { transform: [{ rotate: '0deg' }] },
  chevronOpen: { transform: [{ rotate: '90deg' }] },
  sectionNote: { fontSize: 12.5, lineHeight: 18, fontFamily: Fonts.body, marginTop: 9, marginBottom: 8, marginLeft: 2 },

  item: { borderWidth: 1, borderRadius: 12, marginBottom: 7, overflow: 'hidden' },
  itemHead: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 11, paddingHorizontal: 12 },
  itemText: { flex: 1, gap: 1 },
  itemName: { fontSize: 14, lineHeight: 19, fontFamily: Fonts.body },
  itemWhere: { fontSize: 11.5, fontFamily: Fonts.body },
  itemQuantity: { fontSize: 13, fontFamily: Fonts.monoMedium },
  chip: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 999 },
  chipText: { fontSize: 10, fontFamily: Fonts.mono },

  itemBody: { borderTopWidth: 1, padding: 12, gap: 8 },
  fieldLabel: { fontSize: 10, fontFamily: Fonts.mono, letterSpacing: 1, marginTop: 4 },
  field: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 9,
    fontSize: 14,
    fontFamily: Fonts.body,
  },
  fieldError: { fontSize: 11.5, fontFamily: Fonts.body },

  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  unitChip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 11, paddingVertical: 6 },
  unitChipText: { fontSize: 12, fontFamily: Fonts.bodyMedium },

  stepperRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stepperLabel: { flex: 1, fontSize: 13.5, fontFamily: Fonts.body },
  stepperControls: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stepperButton: { width: 34, height: 34, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  stepperSign: { fontSize: 19, lineHeight: 22, fontFamily: Fonts.bodyBold },
  stepperValue: { minWidth: 58, textAlign: 'center', fontSize: 15, fontFamily: Fonts.monoMedium },

  removeRow: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingTop: 6 },
  removeText: { fontSize: 13, fontFamily: Fonts.bodyMedium },

  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 12,
    paddingRight: 6,
    paddingVertical: 6,
    marginTop: 3,
  },
  addInput: { flex: 1, fontSize: 14, paddingVertical: 6, fontFamily: Fonts.body },
  addButton: { width: 30, height: 30, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },

  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  linkText: { flex: 1, fontSize: 13.5, lineHeight: 18, fontFamily: Fonts.body },

  footer: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 17,
    fontFamily: Fonts.body,
  },
});
