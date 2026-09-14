import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CallButton, Tile } from '@/components/tile';
import {
  EMERGENCY_CATEGORY,
  HOME_QUICK_TILE_COUNT,
  PRIORITY_HUMAN,
  QUICK_TILES,
  RED,
  RED_DARK,
  RED_TILE,
  getCategoryStyle,
} from '@/constants/categoryStyle';
import { PRIORITY_COLOR } from '@/constants/status';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getCategorySummaries, searchTopics, slugify } from '@/lib/content';

const GAP = Spacing.two;
const SIDE = Spacing.three;

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width, MaxContentWidth) - SIDE * 2;
  const twoCol = Math.floor((contentWidth - GAP) / 2);
  const threeCol = Math.floor((contentWidth - GAP * 2) / 3);

  const [query, setQuery] = useState('');
  const emergencySlug = slugify(EMERGENCY_CATEGORY);
  const categories = useMemo(
    () => getCategorySummaries().filter((c) => c.name !== EMERGENCY_CATEGORY),
    []
  );
  const results = useMemo(() => searchTopics(query), [query]);
  const searching = query.trim().length > 0;

  return (
    <ThemedView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + Spacing.six }]}
        keyboardShouldPersistTaps="handled">
        <View style={[styles.hero, { paddingTop: insets.top + Spacing.three }]}>
          <View style={styles.heroInner}>
            <Text style={styles.heroTitle}>GuideHand</Text>
            <Text style={styles.heroSub}>Emergency guide. Works with no signal and no internet.</Text>
            <CallButton style={styles.call} />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.searchWrap}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search every topic (works offline)"
              placeholderTextColor={theme.textSecondary}
              style={[styles.search, { color: theme.text, backgroundColor: theme.backgroundElement }]}
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
          </View>

          {searching ? (
            <View style={styles.section}>
              <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
                {results.length === 0 ? `No topics match "${query.trim()}"` : `${results.length} result${results.length === 1 ? '' : 's'}`}
              </ThemedText>
              {results.map((item) => {
                const cs = getCategoryStyle(item.categoryName);
                return (
                  <Pressable
                    key={`${item.categorySlug}-${item.topic.slug}`}
                    accessibilityRole="button"
                    onPress={() =>
                      router.push({
                        pathname: '/article/[category]/[topic]',
                        params: { category: item.categorySlug, topic: item.topic.slug },
                      })
                    }
                    style={({ pressed }) => [styles.resultCard, { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.8 : 1 }]}>
                    <View style={[styles.stripe, { backgroundColor: cs.color }]} />
                    <View style={styles.resultBody}>
                      <ThemedText style={styles.resultTitle}>{item.topic.title}</ThemedText>
                      <View style={styles.metaRow}>
                        <Text style={styles.metaEmoji}>{cs.emoji}</Text>
                        <ThemedText type="small" themeColor="textSecondary">
                          {cs.short}
                        </ThemedText>
                        <View style={[styles.pill, { backgroundColor: PRIORITY_COLOR[item.topic.priority] }]}>
                          <Text style={styles.pillText}>{PRIORITY_HUMAN[item.topic.priority]}</Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ) : (
            <>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, { color: RED }]}>RIGHT NOW</Text>
                  <ThemedText type="small" themeColor="textSecondary">
                    Life-threatening. Tap one.
                  </ThemedText>
                </View>
                <View style={styles.grid}>
                  {QUICK_TILES.slice(0, HOME_QUICK_TILE_COUNT).map((q) => (
                    <Tile
                      key={q.title}
                      size="small"
                      emoji={q.emoji}
                      label={q.label}
                      color={RED_TILE}
                      style={{ width: threeCol }}
                      onPress={() =>
                        router.push({
                          pathname: '/article/[category]/[topic]',
                          params: { category: emergencySlug, topic: slugify(q.title) },
                        })
                      }
                    />
                  ))}
                  <Tile
                    size="small"
                    emoji="🚨"
                    label={`All ${QUICK_TILES.length} emergencies`}
                    color={RED_DARK}
                    style={{ width: threeCol }}
                    onPress={() =>
                      router.push({ pathname: '/category/[category]', params: { category: emergencySlug } })
                    }
                  />
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <ThemedText style={styles.sectionTitle}>FIND BY TOPIC</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {categories.length} categories
                  </ThemedText>
                </View>
                <View style={styles.grid}>
                  {categories.map((c) => {
                    const cs = getCategoryStyle(c.name);
                    return (
                      <Tile
                        key={c.slug}
                        emoji={cs.emoji}
                        label={cs.short}
                        sub={`${c.topicCount} topics`}
                        color={cs.color}
                        fg={cs.fg}
                        style={{ width: twoCol }}
                        onPress={() => router.push({ pathname: '/category/[category]', params: { category: c.slug } })}
                      />
                    );
                  })}
                </View>
              </View>

              <ThemedText type="small" themeColor="textSecondary" style={styles.footer}>
                GuideHand is a reference, not a substitute for emergency services or medical care. When in doubt, call 911.
              </ThemedText>
            </>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {},
  hero: {
    backgroundColor: RED,
    paddingBottom: Spacing.four,
    paddingHorizontal: SIDE,
  },
  heroInner: {
    width: '100%',
    maxWidth: MaxContentWidth - SIDE * 2,
    alignSelf: 'center',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  heroSub: {
    color: '#FFFFFF',
    opacity: 0.92,
    fontSize: 15,
    marginTop: 4,
    marginBottom: Spacing.three,
  },
  call: {},
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: SIDE,
  },
  searchWrap: {
    marginTop: Spacing.three,
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 1,
    fontSize: 16,
  },
  search: {
    paddingLeft: 42,
    paddingRight: 14,
    paddingVertical: 12,
    borderRadius: 14,
    fontSize: 16,
  },
  section: {
    marginTop: Spacing.four,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
  },
  sectionLabel: {
    marginBottom: Spacing.two,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  resultCard: {
    flexDirection: 'row',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: Spacing.two,
  },
  stripe: {
    width: 6,
  },
  resultBody: {
    flex: 1,
    padding: Spacing.three,
    gap: 6,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  metaEmoji: {
    fontSize: 14,
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  footer: {
    marginTop: Spacing.five,
    textAlign: 'center',
    lineHeight: 20,
  },
});
