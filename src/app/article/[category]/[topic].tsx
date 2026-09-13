import { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatusBadge, PriorityBadge } from '@/components/status-badge';
import { Spacing } from '@/constants/theme';
import { STATUS_EXPLANATION } from '@/constants/status';
import { getArticleBody, getTopic } from '@/lib/content';

export default function ArticleScreen() {
  const { category, topic } = useLocalSearchParams<{ category: string; topic: string }>();
  const topicData = useMemo(() => getTopic(category, topic), [category, topic]);
  const body = topicData ? getArticleBody(topicData.title) : undefined;

  if (!topicData) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedText style={styles.padded}>Topic not found.</ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: topicData.title }} />
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedText type="subtitle" style={styles.title}>
            {topicData.title}
          </ThemedText>

          <ThemedView style={styles.badgeRow}>
            <StatusBadge status={topicData.status} />
            <PriorityBadge priority={topicData.priority} />
          </ThemedView>

          <ThemedText type="small" themeColor="textSecondary" style={styles.statusExplain}>
            {STATUS_EXPLANATION[topicData.status]}
          </ThemedText>

          {body ? (
            <>
              <ThemedView type="backgroundElement" style={styles.section}>
                {body.guidance.map((line, i) => (
                  <ThemedText key={i} style={styles.guidanceLine}>
                    {'•'} {line}
                  </ThemedText>
                ))}
              </ThemedView>

              <ThemedText type="smallBold" style={styles.sourcesHeading}>
                Sources
              </ThemedText>
              {body.sources.map((s, i) => (
                <ThemedText key={i} type="small" themeColor="textSecondary">
                  {s}
                </ThemedText>
              ))}
            </>
          ) : (
            <ThemedView type="backgroundElement" style={styles.section}>
              <ThemedText themeColor="textSecondary">
                This topic is on the plan but the full article hasn't been written yet.
                {topicData.note ? ` ${topicData.note}` : ''}
              </ThemedText>
            </ThemedView>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  padded: { padding: Spacing.four },
  scrollContent: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.two,
  },
  title: { marginBottom: Spacing.one },
  badgeRow: {
    flexDirection: 'row',
    gap: Spacing.one,
    marginBottom: Spacing.one,
  },
  statusExplain: {
    marginBottom: Spacing.three,
  },
  section: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    gap: Spacing.two,
  },
  guidanceLine: {
    lineHeight: 22,
  },
  sourcesHeading: {
    marginTop: Spacing.three,
  },
});
