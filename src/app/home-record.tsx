import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { Stack } from 'expo-router';

import { KeyboardAwareScrollView } from '@/components/keyboard-aware-scroll';
import * as ImagePicker from 'expo-image-picker';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { notePersonalDataChanged } from '@/lib/autoBackup';
import {
  countPhotos,
  emptyItem,
  HOME_RECORD_KEY,
  HOME_SECTIONS,
  HomeItem,
  HomePhoto,
  HomeSection,
  isBlank,
  missingShutoffs,
  newPhotoId,
  seedShutoffs,
} from '@/lib/homeRecord';
import { secureGetItem, secureSetItem } from '@/lib/secureData';

export default function HomeRecordScreen() {
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];

  const [items, setItems] = useState<HomeItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [openSection, setOpenSection] = useState<HomeSection | undefined>('shutoffs');
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    secureGetItem(HOME_RECORD_KEY)
      .then((raw) => {
        if (cancelled) return;
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setItems(parsed);
            return;
          }
        }
        // First run gets the shutoffs already listed. A blank page here costs
        // something real — these are the four things worth knowing tonight.
        setItems(seedShutoffs());
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const save = useCallback((next: HomeItem[]) => {
    setItems(next);
    // Only rows somebody has actually filled in get written. Four empty
    // starter shutoffs are defaults, not data, and should not count as a
    // backup worth keeping.
    const worthKeeping = next.filter((item) => !isBlank(item));
    secureSetItem(HOME_RECORD_KEY, JSON.stringify(next.length ? next : []))
      .then(() => {
        if (worthKeeping.length > 0) notePersonalDataChanged('Home record changed');
      })
      .catch(() => {});
  }, []);

  const patch = (id: string, updates: Partial<HomeItem>) =>
    save(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));

  const addItem = (section: HomeSection) => {
    const name = (drafts[section] ?? '').trim();
    if (!name) return;
    const created = { ...emptyItem(section), name };
    save([...items, created]);
    setDrafts((prev) => ({ ...prev, [section]: '' }));
    setOpenItem(created.id);
  };

  const removeItem = (id: string) => {
    save(items.filter((item) => item.id !== id));
    setOpenItem((current) => (current === id ? undefined : current));
  };

  const pickerOptions: ImagePicker.ImagePickerOptions = useMemo(
    () => ({ mediaTypes: ['images'], quality: 0.6, base64: true, allowsEditing: false }),
    []
  );

  const addPhoto = async (item: HomeItem, fromCamera: boolean) => {
    const perm = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        fromCamera ? 'Camera access needed' : 'Photo access needed',
        'Turn that on for GuideHand in your device settings to add a picture here.'
      );
      return;
    }
    setBusy(true);
    try {
      const result = fromCamera
        ? await ImagePicker.launchCameraAsync(pickerOptions)
        : await ImagePicker.launchImageLibraryAsync(pickerOptions);
      if (result.canceled || !result.assets?.[0]?.base64) return;
      const asset = result.assets[0];
      const photo: HomePhoto = {
        id: newPhotoId(),
        label: '',
        dataUri: `data:${asset.mimeType ?? 'image/jpeg'};base64,${asset.base64}`,
      };
      patch(item.id, { photos: [...item.photos, photo] });
    } finally {
      setBusy(false);
    }
  };

  const removePhoto = (item: HomeItem, photoId: string) =>
    patch(item.id, { photos: item.photos.filter((p) => p.id !== photoId) });

  const gaps = missingShutoffs(items);
  const photoCount = countPhotos(items);

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'Your Home' }} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View
            style={[
              styles.headerBlock,
              { backgroundColor: c.headerBg, borderWidth: 1, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.blue },
            ]}>
            <Text style={[styles.eyebrow, { color: c.onBlueSoft }]}>Your Home</Text>
            <Text style={[styles.title, { color: c.onBlue }]}>Home Record</Text>
            <Text style={[styles.subhead, { color: c.onBlueSoft }]}>
              Where the shutoffs are, what your appliances are, and photographs of the manuals. Put
              it in now — none of it is findable at two in the morning with the power off.
            </Text>
          </View>

          {!loaded ? <ActivityIndicator color={c.blue} style={styles.loading} /> : null}

          {gaps.length > 0 ? (
            <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.danger }]}>
              <Text style={[styles.cardLabel, { color: c.text }]}>Still don&apos;t know where these are</Text>
              {gaps.map((name) => (
                <Text key={name} style={[styles.gap, { color: c.textSecondary }]}>· {name}</Text>
              ))}
              <Text style={[styles.hint, { color: c.textSecondary }]}>
                Walk the house once in daylight and write down where each one is. It takes ten
                minutes and it is the difference between turning the water off and watching it run.
              </Text>
            </View>
          ) : null}

          {HOME_SECTIONS.map((section) => {
            const rows = items.filter((item) => item.section === section.id);
            const open = openSection === section.id;
            const filled = rows.filter((item) => !isBlank(item)).length;
            return (
              <View key={section.id} style={styles.section}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded: open }}
                  onPress={() => setOpenSection(open ? undefined : section.id)}
                  style={({ pressed }) => [
                    styles.sectionHead,
                    {
                      backgroundColor: c.card,
                      borderColor: c.cardBorder,
                      borderLeftWidth: 5,
                      borderLeftColor: section.urgent ? c.danger : c.blue,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}>
                  <Icon name={section.icon} size={18} color={section.urgent ? c.danger : c.blue} />
                  <View style={styles.sectionText}>
                    <Text style={[styles.sectionName, { color: c.text }]}>{section.name}</Text>
                    <Text style={[styles.sectionCount, { color: c.textSecondary }]}>
                      {rows.length === 0
                        ? 'Nothing added yet'
                        : `${filled} of ${rows.length} filled in`}
                    </Text>
                  </View>
                  <Icon name="chevron" size={16} color={c.textSecondary} />
                </Pressable>

                {open ? (
                  <>
                    <Text style={[styles.sectionNote, { color: c.onBgSoft }]}>{section.note}</Text>

                    {rows.map((item) => {
                      const expanded = openItem === item.id;
                      return (
                        <View
                          key={item.id}
                          style={[
                            styles.item,
                            { backgroundColor: c.card, borderColor: expanded ? c.blue : c.cardBorder },
                          ]}>
                          <Pressable
                            accessibilityRole="button"
                            accessibilityState={{ expanded }}
                            onPress={() => setOpenItem(expanded ? undefined : item.id)}
                            style={({ pressed }) => [styles.itemHead, { opacity: pressed ? 0.75 : 1 }]}>
                            <View style={styles.sectionText}>
                              <Text style={[styles.itemName, { color: item.name ? c.text : c.textSecondary }]}>
                                {item.name || 'Untitled'}
                              </Text>
                              <Text style={[styles.itemMeta, { color: c.textSecondary }]} numberOfLines={1}>
                                {item.where || [item.brand, item.model].filter(Boolean).join(' ') || 'Tap to fill in'}
                              </Text>
                            </View>
                            {item.photos.length > 0 ? (
                              <View style={[styles.pill, { backgroundColor: c.blueSoft }]}>
                                <Text style={[styles.pillText, { color: c.blueText }]}>{item.photos.length}</Text>
                              </View>
                            ) : null}
                            <Icon name="chevron" size={15} color={c.textSecondary} />
                          </Pressable>

                          {expanded ? (
                            <View style={[styles.itemBody, { borderTopColor: c.cardBorder }]}>
                              <Field label="WHAT IT IS" value={item.name} placeholder="Water heater"
                                onChange={(v) => patch(item.id, { name: v })} c={c} />
                              <Field label="WHERE IT IS" value={item.where} placeholder="Basement, north wall behind the stairs"
                                onChange={(v) => patch(item.id, { where: v })} c={c} />
                              {section.urgent ? (
                                <Field label="HOW TO SHUT IT OFF" value={item.howTo} placeholder="Which way it turns, what tool it takes" multiline
                                  onChange={(v) => patch(item.id, { howTo: v })} c={c} />
                              ) : (
                                <>
                                  <Field label="MAKE" value={item.brand} placeholder="Rheem"
                                    onChange={(v) => patch(item.id, { brand: v })} c={c} />
                                  <Field label="MODEL" value={item.model} placeholder="Off the plate on the side"
                                    onChange={(v) => patch(item.id, { model: v })} c={c} />
                                  <Field label="SERIAL" value={item.serial} placeholder="What the insurer and the parts desk ask for"
                                    onChange={(v) => patch(item.id, { serial: v })} c={c} />
                                  <Field label="INSTALLED" value={item.installed} placeholder="Spring 2019"
                                    onChange={(v) => patch(item.id, { installed: v })} c={c} />
                                </>
                              )}
                              <Field label="ANYTHING ELSE" value={item.notes} multiline
                                placeholder="Filter size, breaker number, paint colour, who serviced it"
                                onChange={(v) => patch(item.id, { notes: v })} c={c} />

                              <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>PICTURES</Text>
                              {item.photos.length > 0 ? (
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoStrip}>
                                  {item.photos.map((photo) => (
                                    <View key={photo.id} style={[styles.photoWrap, { borderColor: c.cardBorder }]}>
                                      <Image source={{ uri: photo.dataUri }} style={styles.photo} resizeMode="cover" />
                                      <Pressable
                                        accessibilityRole="button"
                                        accessibilityLabel="Remove this picture"
                                        onPress={() => removePhoto(item, photo.id)}
                                        hitSlop={8}
                                        style={[styles.photoRemove, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                                        <Icon name="x" size={11} color={c.dangerText} strokeWidth={2.4} />
                                      </Pressable>
                                    </View>
                                  ))}
                                </ScrollView>
                              ) : (
                                <Text style={[styles.hint, { color: c.textSecondary }]}>
                                  Photograph the model plate and the pages of the manual you would
                                  actually need — the filter size, the wiring diagram, the error
                                  codes. A picture of a page works offline; a link to a PDF does not.
                                </Text>
                              )}

                              <View style={styles.photoButtons}>
                                <Pressable
                                  accessibilityRole="button"
                                  disabled={busy}
                                  onPress={() => addPhoto(item, true)}
                                  style={({ pressed }) => [styles.photoButton, { backgroundColor: c.blueSoft, opacity: pressed || busy ? 0.6 : 1 }]}>
                                  <Icon name="camera" size={15} color={c.blueText} />
                                  <Text style={[styles.photoButtonText, { color: c.blueText }]}>Take a picture</Text>
                                </Pressable>
                                <Pressable
                                  accessibilityRole="button"
                                  disabled={busy}
                                  onPress={() => addPhoto(item, false)}
                                  style={({ pressed }) => [styles.photoButton, { borderWidth: 1, borderColor: c.cardBorder, opacity: pressed || busy ? 0.6 : 1 }]}>
                                  <Icon name="upload" size={15} color={c.text} />
                                  <Text style={[styles.photoButtonText, { color: c.text }]}>From photos</Text>
                                </Pressable>
                              </View>

                              <Pressable
                                accessibilityRole="button"
                                onPress={() => removeItem(item.id)}
                                style={({ pressed }) => [styles.removeRow, { opacity: pressed ? 0.6 : 1 }]}>
                                <Icon name="trash" size={15} color={c.dangerText} />
                                <Text style={[styles.removeText, { color: c.dangerText }]}>Remove this</Text>
                              </Pressable>
                            </View>
                          ) : null}
                        </View>
                      );
                    })}

                    <View style={[styles.addRow, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                      <TextInput
                        value={drafts[section.id] ?? ''}
                        onChangeText={(t) => setDrafts((prev) => ({ ...prev, [section.id]: t }))}
                        onSubmitEditing={() => addItem(section.id)}
                        placeholder={section.id === 'shutoffs' ? 'Add another shutoff' : 'Add something'}
                        placeholderTextColor={c.textSecondary}
                        style={[styles.addInput, { color: c.text }]}
                        returnKeyType="done"
                      />
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Add to ${section.name}`}
                        onPress={() => addItem(section.id)}
                        style={({ pressed }) => [styles.addButton, { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 }]}>
                        <Icon name="plus" size={16} color={c.blueText} />
                      </Pressable>
                    </View>
                  </>
                ) : null}
              </View>
            );
          })}

          <Text style={[styles.footer, { color: c.onBgSoft }]}>
            {photoCount > 0 ? `${photoCount} ${photoCount === 1 ? 'picture' : 'pictures'} saved. ` : ''}
            Encrypted on this device and included in your backups. Nothing here is sent anywhere.
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

interface Palette {
  bg: string; card: string; cardBorder: string; text: string; textSecondary: string;
  blue: string; blueText: string; blueSoft: string;
  onBgSoft: string;
  danger: string; dangerText: string; dangerSoft: string;
  headerBg: string; onBlue: string; onBlueSoft: string;
}

function Field({
  label, value, placeholder, onChange, c, multiline,
}: {
  label: string; value?: string; placeholder: string;
  onChange: (v: string) => void; c: Palette; multiline?: boolean;
}) {
  return (
    <>
      <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>{label}</Text>
      <TextInput
        defaultValue={value}
        onChangeText={(t) => onChange(t.trim() ? t : '')}
        placeholder={placeholder}
        placeholderTextColor={c.textSecondary}
        multiline={multiline}
        style={[styles.field, multiline ? styles.fieldTall : null, { color: c.text, borderColor: c.cardBorder }]}
      />
    </>
  );
}

const SIDE = Spacing.three;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingTop: 18, paddingBottom: 44 },
  content: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: SIDE },

  headerBlock: { borderRadius: 20, padding: 16, gap: 6, marginBottom: 14 },
  eyebrow: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { fontSize: 22, fontFamily: Fonts.display },
  subhead: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },

  loading: { marginVertical: 16 },
  card: { borderWidth: 1, borderRadius: 14, padding: 14, gap: 7, marginBottom: 12 },
  cardLabel: { fontSize: 14.5, fontFamily: Fonts.bodyBold },
  gap: { fontSize: 13, lineHeight: 18, fontFamily: Fonts.body },
  hint: { fontSize: 12, lineHeight: 17.5, fontFamily: Fonts.body },

  section: { marginTop: 12 },
  sectionHead: {
    flexDirection: 'row', alignItems: 'center', gap: 11,
    borderWidth: 1, borderRadius: 14, paddingVertical: 12, paddingHorizontal: 13,
  },
  sectionText: { flex: 1, gap: 2 },
  sectionName: { fontSize: 15.5, fontFamily: Fonts.displaySemibold },
  sectionCount: { fontSize: 12, fontFamily: Fonts.body },
  sectionNote: { fontSize: 12.5, lineHeight: 18, fontFamily: Fonts.body, marginTop: 9, marginBottom: 8, marginLeft: 2 },

  item: { borderWidth: 1, borderRadius: 12, marginBottom: 7, overflow: 'hidden' },
  itemHead: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 11, paddingHorizontal: 12 },
  itemName: { fontSize: 14.5, fontFamily: Fonts.displaySemibold },
  itemMeta: { fontSize: 12, fontFamily: Fonts.body },
  itemBody: { borderTopWidth: 1, padding: 12, gap: 6 },
  pill: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 999 },
  pillText: { fontSize: 10.5, fontFamily: Fonts.monoMedium },

  fieldLabel: { fontSize: 10, fontFamily: Fonts.mono, letterSpacing: 1, marginTop: 5 },
  field: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 11, paddingVertical: 9, fontSize: 14, fontFamily: Fonts.body },
  fieldTall: { minHeight: 62, textAlignVertical: 'top' },

  photoStrip: { marginTop: 4 },
  photoWrap: { width: 92, height: 92, borderRadius: 10, borderWidth: 1, overflow: 'hidden', marginRight: 8 },
  photo: { width: '100%', height: '100%' },
  photoRemove: {
    position: 'absolute', top: 4, right: 4, width: 20, height: 20, borderRadius: 10,
    borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  photoButtons: { flexDirection: 'row', gap: 8, marginTop: 6 },
  photoButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 7, borderRadius: 11, paddingVertical: 11,
  },
  photoButtonText: { fontSize: 13.5, fontFamily: Fonts.bodySemibold },

  removeRow: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingTop: 8 },
  removeText: { fontSize: 13, fontFamily: Fonts.bodyMedium },

  addRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderRadius: 12,
    paddingLeft: 12, paddingRight: 6, paddingVertical: 6, marginTop: 3,
  },
  addInput: { flex: 1, fontSize: 14, paddingVertical: 6, fontFamily: Fonts.body },
  addButton: { width: 30, height: 30, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },

  footer: { marginTop: 20, marginBottom: 12, fontSize: 11.5, textAlign: 'center', lineHeight: 17, fontFamily: Fonts.body },
});
