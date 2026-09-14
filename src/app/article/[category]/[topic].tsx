import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CallButton } from '@/components/tile';
import { PRIORITY_HUMAN, getCategoryStyle, getQuickTile } from '@/constants/categoryStyle';
import { PRIORITY_COLOR, STATUS_EXPLANATION, STATUS_LABEL } from '@/constants/status';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getCategoryBySlug, getRelatedTopics, getTopic, resolveArticleBody } from '@/lib/content';

export default function ArticleScreen() {
  const { category, topic } = useLocalSearchParams<{ category: string; topic: string }>();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const categoryData = useMemo(() => getCategoryBySlug(category), [category]);
  const topicData = useMemo(() => getTopic(category, topic), [category, topic]);
  const resolved = topicData ? resolveArticleBody(topicData.title) : undefined;
  const body = resolved?.body;
  const related = useMemo(() => (topicData ? getRelatedTopics(topicData.title) : []), [topicData]);
  const cs = getCategoryStyle(categoryData?.name ?? '');

  if (!topicData) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <ThemedText style={styles.padded}>Topic not found.</ThemedText>
      </ThemedView>
    );
  }

  const quick = getQuickTile(topicData.title);
  const urgent = topicData.priority === 'P0';

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: cs.short, headerStyle: { backgroundColor: cs.color }, headerTintColor: cs.fg }} />
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + Spacing.six }]}>
        <View style={[styles.band, { backgroundColor: cs.color }]}>
          <View style={styles.bandInner}>
            <Text style={styles.bandEmoji}>{quick?.emoji ?? cs.emoji}</Text>
            <Text style={[styles.bandTitle, { color: cs.fg }]}>{topicData.title}</Text>
            <View style={styles.bandMeta}>
              <View style={[styles.pill, { backgroundColor: PRIORITY_COLOR[topicData.priority] }]}>
                <Text style={styles.pillText}>{PRIORITY_HUMAN[topicData.priority]}</Text>
              </View>
              <Text style={[styles.bandStatus, { color: cs.fg }]}>{STATUS_LABEL[topicData.status]}</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {urgent ? <CallButton style={styles.call} /> : null}

          {body ? (
            <>
              <ThemedText style={styles.stepsHeading}>What to do</ThemedText>
              {resolved?.sourceTitle ? (
                <ThemedText type="small" themeColor="textSecondary" style={styles.sourceNote}>
                  {`Steps from the full article “${resolved.sourceTitle}”.`}
                </ThemedText>
              ) : null}
              {body.guidance.map((line, i) => (
                <View key={i} style={[styles.step, { backgroundColor: theme.backgroundElement }]}>
                  <View style={[styles.stepNumber, { backgroundColor: cs.color }]}>
                    <Text style={[styles.stepNumberText, { color: cs.fg }]}>{i + 1}</Text>
                  </View>
                  <ThemedText style={styles.stepText}>{line}</ThemedText>
                </View>
              ))}

              <View style={[styles.sources, { backgroundColor: theme.backgroundElement }]}>
                <ThemedText type="smallBold">Sources</ThemedText>
                {body.sources.map((s, i) => (
                  <ThemedText key={i} type="small" themeColor="textSecondary" style={styles.sourceLine}>
                    {s}
                  </ThemedText>
                ))}
              </View>
            </>
          ) : (
            <View style={[styles.notYet, { backgroundColor: theme.backgroundElement }]}>
              <Text style={styles.notYetEmoji}>✍️</Text>
              <ThemedText style={styles.notYetTitle}>{"This article isn't written yet."}</ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.notYetText}>
                {`It's on the plan${topicData.note ? ` — ${topicData.note}` : ''}. It will appear here automatically once it's added.`}
              </ThemedText>
            </View>
          )}

          {related.length > 0 ? (
            <View style={styles.related}>
              <ThemedText style={styles.stepsHeading}>See also</ThemedText>
              {related.map((r) => {
                const rs = getCategoryStyle(r.categoryName);
                return (
                  <Pressable
                    key={`${r.categorySlug}-${r.topic.slug}`}
                    accessibilityRole="button"
                    onPress={() =>
                      router.push({
                        pathname: '/article/[category]/[topic]',
                        params: { category: r.categorySlug, topic: r.topic.slug },
                      })
                    }
                    style={({ pressed }) => [styles.relatedRow, { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.8 : 1 }]}>
                    <View style={[styles.relatedStripe, { backgroundColor: rs.color }]} />
                    <View style={styles.relatedBody}>
                      <ThemedText style={styles.relatedTitle}>{r.topic.title}</ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">
                        {rs.emoji} {rs.short}
                        {r.topic.hasBody ? '' : ' · not written yet'}
                      </ThemedText>
                    </View>
                    <Text style={[styles.chevron, { color: theme.textSecondary }]}>›</Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}

          <ThemedText type="small" themeColor="textSecondary" style={styles.statusExplain}>
            {STATUS_EXPLANATION[topicData.status]}
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {},
  padded: { padding: Spacing.four },
  band: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
  },
  bandInner: {
    width: '100%',
    maxWidth: MaxContentWidth - Spacing.three * 2,
    alignSelf: 'center',
    gap: 8,
  },
  bandEmoji: {
    fontSize: 40,
  },
  bandTitle: {
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
  },
  bandMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bandStatus: {
    fontSize: 13,
    opacity: 0.9,
    fontWeight: '600',
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
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
  stepsHeading: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: Spacing.two,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderRadius: 14,
    padding: 14,
    marginBottom: Spacing.two,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumberText: {
    fontSize: 15,
    fontWeight: '800',
  },
  stepText: {
    flex: 1,
    fontSize: 17,
    lineHeight: 26,
  },
  sources: {
    marginTop: Spacing.three,
    borderRadius: 14,
    padding: 14,
    gap: 6,
  },
  sourceLine: {
    lineHeight: 20,
  },
  notYet: {
    borderRadius: 14,
    padding: Spacing.four,
    alignItems: 'center',
    gap: 8,
  },
  notYetEmoji: {
    fontSize: 36,
  },
  notYetTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  notYetText: {
    textAlign: 'center',
    lineHeight: 22,
  },
  statusExplain: {
    marginTop: Spacing.four,
    lineHeight: 20,
    textAlign: 'center',
  },
  sourceNote: {
    marginBottom: Spacing.two,
    lineHeight: 20,
  },
  related: {
    marginTop: Spacing.four,
  },
  relatedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: Spacing.two,
  },
  relatedStripe: {
    width: 6,
    alignSelf: 'stretch',
  },
  relatedBody: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 4,
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  chevron: {
    fontSize: 28,
    paddingRight: 14,
  },
});
