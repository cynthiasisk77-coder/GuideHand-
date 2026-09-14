import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CallButton } from '@/components/tile';
import { EMERGENCY_CATEGORY, PRIORITY_HUMAN, PRIORITY_ORDER, getCategoryStyle, getQuickTile } from '@/constants/categoryStyle';
import { PRIORITY_COLOR, STATUS_LABEL } from '@/constants/status';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getCategoryBySlug, getTopicsForCategory } from '@/lib/content';

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const categoryData = useMemo(() => getCategoryBySlug(category), [category]);
  const topics = useMemo(
    () =>
      [...getTopicsForCategory(category)].sort(
        (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      ),
    [category]
  );
  const name = categoryData?.name ?? 'Category';
  const cs = getCategoryStyle(name);
  const isEmergency = name === EMERGENCY_CATEGORY;
  const written = topics.filter((t) => t.hasBody).length;

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: cs.short, headerStyle: { backgroundColor: cs.color }, headerTintColor: cs.fg }} />
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + Spacing.six }]}>
        <View style={[styles.band, { backgroundColor: cs.color }]}>
          <View style={styles.bandInner}>
            <Text style={styles.bandEmoji}>{cs.emoji}</Text>
            <View style={styles.bandText}>
              <Text style={[styles.bandTitle, { color: cs.fg }]}>{name}</Text>
              <Text style={[styles.bandSub, { color: cs.fg }]}>
                {categoryData?.note ? categoryData.note : `${written} of ${topics.length} topics written`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {isEmergency ? <CallButton style={styles.call} /> : null}

          {topics.map((item) => {
            const quick = isEmergency ? getQuickTile(item.title) : undefined;
            return (
              <Pressable
                key={item.slug}
                accessibilityRole="button"
                onPress={() =>
                  router.push({ pathname: '/article/[category]/[topic]', params: { category, topic: item.slug } })
                }
                style={({ pressed }) => [styles.card, { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.8 : 1 }]}>
                <View style={[styles.stripe, { backgroundColor: PRIORITY_COLOR[item.priority] }]} />
                <View style={styles.cardBody}>
                  <View style={styles.titleRow}>
                    {quick ? <Text style={styles.cardEmoji}>{quick.emoji}</Text> : null}
                    <ThemedText style={styles.cardTitle}>{quick ? quick.label : item.title}</ThemedText>
                  </View>
                  <View style={styles.metaRow}>
                    <View style={[styles.pill, { backgroundColor: PRIORITY_COLOR[item.priority] }]}>
                      <Text style={styles.pillText}>{PRIORITY_HUMAN[item.priority]}</Text>
                    </View>
                    <ThemedText type="small" themeColor="textSecondary">
                      {STATUS_LABEL[item.status]}
                    </ThemedText>
                    {!item.hasBody ? (
                      <ThemedText type="small" themeColor="textSecondary">
                        · not written yet
                      </ThemedText>
                    ) : null}
                  </View>
                </View>
                <Text style={[styles.chevron, { color: theme.textSecondary }]}>›</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {},
  band: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
  },
  bandInner: {
    width: '100%',
    maxWidth: MaxContentWidth - Spacing.three * 2,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  bandEmoji: {
    fontSize: 44,
  },
  bandText: {
    flex: 1,
  },
  bandTitle: {
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
  },
  bandSub: {
    fontSize: 14,
    opacity: 0.9,
    marginTop: 2,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
  },
  call: {
    marginBottom: Spacing.three,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: Spacing.two,
  },
  stripe: {
    width: 6,
    alignSelf: 'stretch',
  },
  cardBody: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: Spacing.three,
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardEmoji: {
    fontSize: 22,
  },
  cardTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
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
  chevron: {
    fontSize: 28,
    paddingRight: Spacing.three,
  },
});
