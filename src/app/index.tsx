import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Icon } from '@/components/icon';
import { Calm, RED, TEAL } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { CATEGORY_GROUPS, slugifyGroup } from '@/content/groups';
import { getCategorySummaries, searchTopics, slugify } from '@/lib/content';
import * as Linking from 'expo-linking';

const EMERGENCY_NAME = 'Emergency Now';

export default function HomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];
  const [query, setQuery] = useState('');

  const categories = useMemo(() => getCategorySummaries(), []);
  const emergency = categories.find((cat) => cat.name === EMERGENCY_NAME);
  const results = useMemo(() => searchTopics(query), [query]);
  const searching = query.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.topbar}>
          <Text style={[styles.title, { color: c.text }]}>GuideHand</Text>
        </View>

        <View style={styles.content}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Call 911"
            onPress={() => Linking.openURL('tel:911').catch(() => {})}
            style={({ pressed }) => [
              styles.callBtn,
              { borderColor: RED, backgroundColor: c.card, opacity: pressed ? 0.8 : 1 },
            ]}>
            <Icon name="phone" size={20} color={RED} />
            <View style={styles.callText}>
              <Text style={[styles.callTitle, { color: RED }]}>Call 911</Text>
              <Text style={[styles.callSub, { color: c.textSecondary }]}>If you have signal, call first</Text>
            </View>
          </Pressable>

          <View style={[styles.search, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
            <Text style={styles.searchIcon}>🔍</Text>
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

          {searching ? (
            <View style={styles.section}>
              <Text style={[styles.sectionLabel, { color: c.textSecondary }]}>
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
                  <Icon name="chevron" size={18} color={c.chevron} />
                </Pressable>
              ))}
            </View>
          ) : (
            <>
              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: c.textSecondary }]}>RIGHT NOW</Text>
                {emergency ? (
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => router.push({ pathname: '/category/[category]', params: { category: slugify(EMERGENCY_NAME) } })}
                    style={({ pressed }) => [
                      styles.row,
                      styles.rowEmergency,
                      { backgroundColor: c.card, borderColor: RED, opacity: pressed ? 0.85 : 1 },
                    ]}>
                    <View style={[styles.icon, { backgroundColor: c.emergencyIconBg }]}>
                      <Icon name="siren" color={RED} />
                    </View>
                    <View style={styles.rowText}>
                      <Text style={[styles.rowName, { color: c.text }]}>Emergency Now</Text>
                      <Text style={[styles.rowSub, { color: c.textSecondary }]}>{emergency.topicCount} life-or-death situations</Text>
                    </View>
                    <Icon name="chevron" size={18} color={c.chevron} />
                  </Pressable>
                ) : null}
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: c.textSecondary }]}>LOOK SOMETHING UP</Text>
                {CATEGORY_GROUPS.map((group) => (
                  <Pressable
                    key={group.name}
                    accessibilityRole="button"
                    onPress={() => router.push({ pathname: '/group/[group]', params: { group: slugifyGroup(group.name) } })}
                    style={({ pressed }) => [
                      styles.row,
                      { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.7 : 1 },
                    ]}>
                    <View style={[styles.icon, { backgroundColor: c.iconBg }]}>
                      <Icon name={group.icon} color={TEAL} />
                    </View>
                    <View style={styles.rowText}>
                      <Text style={[styles.rowName, { color: c.text }]}>{group.name}</Text>
                      <Text style={[styles.rowSub, { color: c.textSecondary }]}>{group.sub}</Text>
                    </View>
                    <Icon name="chevron" size={18} color={c.chevron} />
                  </Pressable>
                ))}
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
  scroll: {},
  topbar: {
    paddingTop: 56,
    paddingBottom: 14,
    paddingHorizontal: SIDE,
  },
  title: { fontSize: 22, fontWeight: '700' },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: SIDE,
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  callText: { flex: 1 },
  callTitle: { fontSize: 17, fontWeight: '700' },
  callSub: { fontSize: 12, marginTop: 1 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 6,
  },
  searchIcon: { fontSize: 15 },
  searchInput: { flex: 1, paddingVertical: 11, fontSize: 15 },
  section: { marginTop: 22 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 2,
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
  rowEmergency: { borderWidth: 1.5, borderLeftWidth: 3 },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: { flex: 1, minWidth: 0 },
  rowName: { fontSize: 15, fontWeight: '700' },
  rowSub: { fontSize: 12, marginTop: 1 },
  footer: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 17,
  },
});
