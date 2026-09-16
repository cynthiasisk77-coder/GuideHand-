import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { CATEGORY_GROUPS, slugifyGroup } from '@/content/groups';
import { getCategorySummaries, getP0TopicsForCategories, searchTopics } from '@/lib/content';

const EMERGENCY_NAME = 'What To Do In An Emergency';
const FIRST_AID_CATEGORY = 'Medical & First Aid';
const ACCENT_CYCLE = ['blue', 'plum', 'sage'] as const;

export default function HomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];
  const [query, setQuery] = useState('');

  const categories = useMemo(() => getCategorySummaries(), []);
  const emergency = categories.find((cat) => cat.name === EMERGENCY_NAME);
  const firstAid = categories.find((cat) => cat.name === FIRST_AID_CATEGORY);
  const p0Count = useMemo(
    () => getP0TopicsForCategories(categories.map((cat) => cat.name)).length,
    [categories]
  );
  const results = useMemo(() => searchTopics(query), [query]);
  const searching = query.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />

      <View style={styles.pinnedTop}>
        <View style={styles.content}>
          <View style={[styles.headerBlock, { backgroundColor: c.blueDeep }]}>
            <View style={styles.headerWatermark} pointerEvents="none">
              <Icon name="compass" size={132} color={c.onBlueSoft} strokeWidth={1.4} />
            </View>
            <Text style={[styles.eyebrow, { color: c.onBlueSoft }]}>Field Guide</Text>
            <Text style={[styles.title, { color: c.onBlue }]}>GuideHand</Text>
            <Text style={[styles.subtitle, { color: c.onBlueSoft }]}>Emergency Preparedness Guide</Text>
            <View style={[styles.search, { backgroundColor: c.card }]}>
              <Icon name="search" size={16} color={c.blue} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search every topic"
                placeholderTextColor={c.textSecondary}
                style={[styles.searchInput, { color: c.text }]}
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>
          </View>

          <Text style={[styles.sectionLabel, styles.pinnedLabel, { color: c.blue }]}>NEED THIS FAST</Text>
          {emergency ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push({ pathname: '/emergency' })}
              style={({ pressed }) => [
                styles.row,
                styles.rowEmergency,
                { backgroundColor: c.dangerSoft, borderColor: c.danger, opacity: pressed ? 0.85 : 1 },
              ]}>
              <View style={[styles.icon, styles.iconLarge, { backgroundColor: c.card }]}>
                <Icon name="siren" size={24} color={c.danger} />
              </View>
              <View style={styles.rowText}>
                <Text style={[styles.rowNameBold, { color: c.text }]}>What To Do In An Emergency</Text>
                <Text style={[styles.rowSub, { color: c.textSecondary }]}>{p0Count} life-threatening situations, step by step</Text>
              </View>
              <Icon name="chevron" size={18} color={c.textSecondary} />
            </Pressable>
          ) : null}

          {firstAid ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push({ pathname: '/category/[category]', params: { category: 'medical-and-first-aid' } })}
              style={({ pressed }) => [
                styles.row,
                styles.rowEmergency,
                { backgroundColor: c.orangeSoft, borderColor: c.orange, opacity: pressed ? 0.85 : 1, marginBottom: 0 },
              ]}>
              <View style={[styles.icon, styles.iconLarge, { backgroundColor: c.card }]}>
                <Icon name="medical" size={24} color={c.orange} />
              </View>
              <View style={styles.rowText}>
                <Text style={[styles.rowNameBold, { color: c.text }]}>First Aid</Text>
                <Text style={[styles.rowSub, { color: c.textSecondary }]}>Medical care and first aid steps</Text>
              </View>
              <Icon name="chevron" size={18} color={c.textSecondary} />
            </Pressable>
          ) : null}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          {searching ? (
            <View style={styles.section}>
              <Text style={[styles.sectionLabel, { color: c.blue }]}>
                {results.length === 0
                  ? `No topics match "${query.trim()}"`
                  : `${results.length} result${results.length === 1 ? '' : 's'}`}
              </Text>
              {results.map((item) => (
                <Pressable
                  key={`${item.categorySlug}-${item.topic.slug}`}
                  accessibilityRole="button"
                  onPress={() =>
                    router.push({
                      pathname: '/article/[category]/[topic]',
                      params: { category: item.categorySlug, topic: item.topic.slug },
                    })
                  }
                  style={({ pressed }) => [
                    styles.row,
                    { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>{item.topic.title}</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>{item.categoryName}</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
              ))}
            </View>
          ) : (
            <>
              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: c.blue }]}>FAMILY</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: '/category/[category]', params: { category: 'family-and-caregiving' } })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.plum, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { backgroundColor: c.plumSoft }]}>
                    <Icon name="family" color={c.plum} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Family & Caregiving</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>Caregiving, family plans, and support</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: "/family-meetup" })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.plum, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { backgroundColor: c.plumSoft }]}>
                    <Icon name="pin" color={c.plum} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Family Meetup Point</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>How far you are from where you agreed to meet — works with no signal</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: c.blue }]}>LOOK SOMETHING UP</Text>
                {CATEGORY_GROUPS.map((group, i) => {
                  const accent = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
                  return (
                    <Pressable
                      key={group.name}
                      accessibilityRole="button"
                      onPress={() => router.push({ pathname: '/group/[group]', params: { group: slugifyGroup(group.name) } })}
                      style={({ pressed }) => [
                        styles.row,
                        styles.rowAccented,
                        { backgroundColor: c.card, borderColor: c[accent], opacity: pressed ? 0.7 : 1 },
                      ]}>
                      <View style={[styles.icon, { backgroundColor: c[`${accent}Soft`] }]}>
                        <Icon name={group.icon} color={c[accent]} />
                      </View>
                      <View style={styles.rowText}>
                        <Text style={[styles.rowName, { color: c.text }]}>{group.name}</Text>
                        <Text style={[styles.rowSub, { color: c.textSecondary }]}>{group.sub}</Text>
                      </View>
                      <Icon name="chevron" size={18} color={c.textSecondary} />
                    </Pressable>
                  );
                })}
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: c.blue }]}>SAVE FOR OFFLINE</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: "/content-packs" })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.blue, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { backgroundColor: c.blueSoft }]}>
                    <Icon name="download" color={c.blue} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Content Packs</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>Download extra reference now, so it&apos;s there when the signal isn&apos;t</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: "/backup" })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.blue, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { backgroundColor: c.blueSoft }]}>
                    <Icon name="upload" color={c.blue} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Back Up &amp; Restore</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>Save your lists and documents to a file, so a lost phone isn&apos;t a lost everything</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: c.blue }]}>YOUR SUPPLIES</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: '/supply-cache' })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.sage, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { backgroundColor: c.sageSoft }]}>
                    <Icon name="checklist" color={c.sage} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Home Supply Cache</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>Check off what you have, add what&apos;s missing</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: '/medicine-tracker' })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.sage, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { backgroundColor: c.sageSoft }]}>
                    <Icon name="medical" color={c.sage} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Medicine & Prescriptions</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>Track what you have, dosages, and expiration dates</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: '/document-photos' })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.sage, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { backgroundColor: c.sageSoft }]}>
                    <Icon name="camera" color={c.sage} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Document Photos</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>IDs, insurance, deeds — saved for offline access</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
              </View>

              <Text style={[styles.footer, { color: c.textSecondary }]}>
                GuideHand is a reference, not a substitute for emergency services or medical care.
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const SIDE = Spacing.three;

const styles = StyleSheet.create({
  container: { flex: 1 },
  pinnedTop: { paddingTop: 56 },
  scroll: { paddingTop: 16, paddingBottom: 40 },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: SIDE,
  },
  headerBlock: {
    borderRadius: 20,
    padding: 16,
    gap: 12,
    marginBottom: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  headerWatermark: {
    position: 'absolute',
    top: -34,
    right: -28,
    opacity: 0.22,
    transform: [{ rotate: '8deg' }],
  },
  eyebrow: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: { fontSize: 24, fontFamily: Fonts.display },
  subtitle: { fontSize: 13, marginTop: -8, fontFamily: Fonts.body },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  searchInput: { flex: 1, paddingVertical: 11, fontSize: 15, fontFamily: Fonts.body },
  pinnedLabel: { marginBottom: 8, marginTop: 0 },
  section: { marginTop: 22 },
  sectionLabel: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 2,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
  },
  rowEmergency: {
    borderWidth: 2.5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  rowAccented: { borderWidth: 1.5 },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLarge: { width: 46, height: 46, borderRadius: 13 },
  rowText: { flex: 1, minWidth: 0 },
  rowName: { fontSize: 15, fontFamily: Fonts.displaySemibold },
  rowNameBold: { fontSize: 16.5, fontFamily: Fonts.display },
  rowSub: { fontSize: 12, marginTop: 1, fontFamily: Fonts.body },
  footer: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 17,
    fontFamily: Fonts.body,
  },
});
