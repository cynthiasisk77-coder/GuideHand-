import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { CallButton } from '@/components/call-button';
import { Icon } from '@/components/icon';
import { Calm } from '@/constants/calm';
import { PRIORITY_HUMAN } from '@/constants/categoryStyle';
import { PRIORITY_COLOR, STATUS_EXPLANATION, STATUS_LABEL } from '@/constants/status';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { getCategoryBySlug, getRelatedTopics, getTopic, resolveArticleBody } from '@/lib/content';

export default function ArticleScreen() {
  const { category, topic } = useLocalSearchParams<{ category: string; topic: string }>();
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];
  const categoryData = useMemo(() => getCategoryBySlug(category), [category]);
  const topicData = useMemo(() => getTopic(category, topic), [category, topic]);
  const resolved = topicData ? resolveArticleBody(topicData.title) : undefined;
  const body = resolved?.body;
  const related = useMemo(() => (topicData ? getRelatedTopics(topicData.title) : []), [topicData]);

  if (!topicData) {
    return (
      <View style={[styles.container, { backgroundColor: c.bg }]}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <Text style={{ color: c.text, padding: Spacing.four }}>Topic not found.</Text>
      </View>
    );
  }

  const urgent = topicData.priority === 'P0';

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: categoryData?.name ?? 'Article' }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: c.text }]}>{topicData.title}</Text>
          <View style={styles.metaRow}>
            <View style={[styles.pill, { backgroundColor: PRIORITY_COLOR[topicData.priority] }]}>
              <Text style={styles.pillText}>{PRIORITY_HUMAN[topicData.priority]}</Text>
            </View>
            <Text style={[styles.metaText, { color: c.textSecondary }]}>{STATUS_LABEL[topicData.status]}</Text>
          </View>

          {urgent ? <CallButton style={styles.call} /> : null}

          {body ? (
            <>
              <Text style={[styles.stepsHeading, { color: c.textSecondary }]}>WHAT TO DO</Text>
              {resolved?.sourceTitle ? (
                <Text style={[styles.sourceNote, { color: c.textSecondary }]}>
                  {`Steps from the full article "${resolved.sourceTitle}".`}
                </Text>
              ) : null}
              {body.guidance.map((line, i) => (
                <View key={i} style={[styles.step, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                  <View style={[styles.stepNumber, { backgroundColor: c.iconBg }]}>
                    <Text style={[styles.stepNumberText, { color: c.text }]}>{i + 1}</Text>
                  </View>
                  <Text style={[styles.stepText, { color: c.text }]}>{line}</Text>
                </View>
              ))}

              <View style={[styles.sources, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                <Text style={[styles.sourcesLabel, { color: c.text }]}>Sources</Text>
                {body.sources.map((s, i) => (
                  <Text key={i} style={[styles.sourceLine, { color: c.textSecondary }]}>
                    {s}
                  </Text>
                ))}
              </View>
            </>
          ) : (
            <View style={[styles.notYet, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
              <Text style={styles.notYetEmoji}>✍️</Text>
              <Text style={[styles.notYetTitle, { color: c.text }]}>{"This article isn't written yet."}</Text>
              <Text style={[styles.notYetText, { color: c.textSecondary }]}>
                {`It's on the plan${topicData.note ? ` — ${topicData.note}` : ''}. It will appear here automatically once it's added.`}
              </Text>
            </View>
          )}

          {related.length > 0 ? (
            <View style={styles.related}>
              <Text style={[styles.stepsHeading, { color: c.textSecondary }]}>SEE ALSO</Text>
              {related.map((r) => (
                <Pressable
                  key={`${r.categorySlug}-${r.topic.slug}`}
                  accessibilityRole="button"
                  onPress={() =>
                    router.push({
                      pathname: '/article/[category]/[topic]',
                      params: { category: r.categorySlug, topic: r.topic.slug },
                    })
                  }
                  style={({ pressed }) => [
                    styles.relatedRow,
                    { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.8 : 1 },
                  ]}>
                  <View style={styles.relatedBody}>
                    <Text style={[styles.relatedTitle, { color: c.text }]}>{r.topic.title}</Text>
                    <Text style={[styles.metaText, { color: c.textSecondary }]}>
                      {r.categoryName}
                      {r.topic.hasBody ? '' : ' · not written yet'}
                    </Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.chevron} />
                </Pressable>
              ))}
            </View>
          ) : null}

          <Text style={[styles.statusExplain, { color: c.textSecondary }]}>
            {STATUS_EXPLANATION[topicData.status]}
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
  title: {
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  metaText: { fontSize: 12.5 },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  call: {
    marginBottom: Spacing.three,
  },
  stepsHeading: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: Spacing.two,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: Spacing.two,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '800',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  sources: {
    marginTop: Spacing.three,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 6,
  },
  sourcesLabel: { fontSize: 13, fontWeight: '700' },
  sourceLine: {
    fontSize: 13,
    lineHeight: 19,
  },
  notYet: {
    borderWidth: 1,
    borderRadius: 14,
    padding: Spacing.four,
    alignItems: 'center',
    gap: 8,
  },
  notYetEmoji: {
    fontSize: 32,
  },
  notYetTitle: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  notYetText: {
    textAlign: 'center',
    lineHeight: 21,
    fontSize: 13.5,
  },
  statusExplain: {
    marginTop: Spacing.four,
    lineHeight: 19,
    textAlign: 'center',
    fontSize: 12.5,
  },
  sourceNote: {
    marginBottom: Spacing.two,
    lineHeight: 19,
    fontSize: 13,
  },
  related: {
    marginTop: Spacing.four,
  },
  relatedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    padding: 13,
    marginBottom: Spacing.two,
  },
  relatedBody: {
    flex: 1,
    gap: 3,
  },
  relatedTitle: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
});
