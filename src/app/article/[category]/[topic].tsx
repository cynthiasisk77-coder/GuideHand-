import { useMemo } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { Icon } from '@/components/icon';
import { CPRDiagram, ChestSealDiagram, TourniquetDiagram } from '@/components/diagrams';
import { QuickCardView } from '@/components/QuickCard';
import { Calm, Fonts } from '@/constants/calm';
import { PRIORITY_HUMAN } from '@/constants/categoryStyle';
import { priorityColor, priorityTextColor, STATUS_EXPLANATION, STATUS_LABEL } from '@/constants/status';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { QUICK_CARDS } from '@/content/quickCards';
import { getCategoryBySlug, getRelatedTopics, getTopic, resolveArticleBody } from '@/lib/content';

const DIAGRAM_BY_TOPIC: Record<string, typeof TourniquetDiagram> = {
  'Severe bleeding and tourniquet': TourniquetDiagram,
  'Adult CPR/AED': CPRDiagram,
  'Chest and abdominal trauma (open chest wound)': ChestSealDiagram,
};

// The only place in the app a 911 mention is tappable at all — and even here
// it takes a deliberate second tap on a confirmation, so it can't be dialed
// by a phone bumped in a pocket. Everywhere else "call 911" is plain text.
const SAFEGUARDED_CALL_TOPIC = 'Active shooter / active attacker response';

function confirmAndCall911() {
  Alert.alert('Call 911?', undefined, [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Call', style: 'destructive', onPress: () => Linking.openURL('tel:911').catch(() => {}) },
  ]);
}

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
  const bodyTitle = resolved?.sourceTitle ?? topicData?.title;
  const quickCard = bodyTitle ? QUICK_CARDS[bodyTitle] : undefined;
  const Diagram = bodyTitle ? DIAGRAM_BY_TOPIC[bodyTitle] : undefined;

  if (!topicData) {
    return (
      <View style={[styles.container, { backgroundColor: c.bg }]}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <Text style={{ color: c.text, padding: Spacing.four }}>Topic not found.</Text>
      </View>
    );
  }

  const pillColor = priorityColor(topicData.priority, c);
  const isCallStep = (line: string) => topicData.title === SAFEGUARDED_CALL_TOPIC && line.includes('911');

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: categoryData?.name ?? 'Article' }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <View style={[styles.headerBlock, { backgroundColor: c.blueDeep }]}>
            <Text style={[styles.eyebrow, { color: c.onBlueSoft }]}>Article</Text>
            <Text style={[styles.title, { color: c.onBlue }]}>{topicData.title}</Text>
            <View style={styles.metaRow}>
              <View style={[styles.pill, { backgroundColor: pillColor }]}>
                <Text style={[styles.pillText, { color: priorityTextColor(topicData.priority, c.text) }]}>
                  {PRIORITY_HUMAN[topicData.priority]}
                </Text>
              </View>
              <Text style={[styles.metaText, { color: c.onBlueSoft }]}>{STATUS_LABEL[topicData.status]}</Text>
            </View>
          </View>

          {body ? (
            <>
              <Text style={[styles.stepsHeading, { color: c.blue }]}>WHAT TO DO</Text>
              {resolved?.sourceTitle && !quickCard ? (
                <Text style={[styles.sourceNote, { color: c.textSecondary }]}>
                  {`Steps from the full article "${resolved.sourceTitle}".`}
                </Text>
              ) : null}

              {quickCard ? (
                <>
                  {Diagram ? (
                    <View style={[styles.diagramCard, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                      <Diagram stroke={c.text} accent={c.blue} />
                    </View>
                  ) : null}
                  <QuickCardView data={quickCard} c={c} />
                </>
              ) : (
                body.guidance.map((line, i) =>
                  isCallStep(line) ? (
                    <Pressable
                      key={i}
                      accessibilityRole="button"
                      accessibilityLabel="Call 911, with confirmation"
                      onPress={confirmAndCall911}
                      style={({ pressed }) => [
                        styles.step,
                        { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.8 : 1 },
                      ]}>
                      <View style={[styles.stepNumber, { backgroundColor: c.blueSoft }]}>
                        <Icon name="phone" size={14} color={c.blue} />
                      </View>
                      <Text style={[styles.stepText, { color: c.text }]}>{line}</Text>
                    </Pressable>
                  ) : (
                    <View key={i} style={[styles.step, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                      <View style={[styles.stepNumber, { backgroundColor: c.blueSoft }]}>
                        <Text style={[styles.stepNumberText, { color: c.blue }]}>{i + 1}</Text>
                      </View>
                      <Text style={[styles.stepText, { color: c.text }]}>{line}</Text>
                    </View>
                  )
                )
              )}

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
              <Text style={[styles.stepsHeading, { color: c.blue }]}>SEE ALSO</Text>
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
                  <Icon name="chevron" size={18} color={c.textSecondary} />
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
  headerBlock: {
    borderRadius: 20,
    padding: 16,
    gap: 10,
    marginBottom: 18,
  },
  eyebrow: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 21,
    fontFamily: Fonts.display,
    lineHeight: 27,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaText: { fontSize: 12.5, fontFamily: Fonts.body },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  pillText: {
    fontSize: 12,
    fontFamily: Fonts.bodyBold,
  },
  stepsHeading: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    marginBottom: Spacing.two,
    textTransform: 'uppercase',
  },
  diagramCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: Spacing.three,
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
    fontSize: 13,
    fontFamily: Fonts.monoMedium,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.body,
  },
  sources: {
    marginTop: Spacing.three,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 6,
  },
  sourcesLabel: { fontSize: 13, fontFamily: Fonts.bodyBold },
  sourceLine: {
    fontSize: 13,
    lineHeight: 19,
    fontFamily: Fonts.body,
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
    fontFamily: Fonts.displaySemibold,
    textAlign: 'center',
  },
  notYetText: {
    textAlign: 'center',
    lineHeight: 21,
    fontSize: 13.5,
    fontFamily: Fonts.body,
  },
  statusExplain: {
    marginTop: Spacing.four,
    lineHeight: 19,
    textAlign: 'center',
    fontSize: 12.5,
    fontFamily: Fonts.body,
  },
  sourceNote: {
    marginBottom: Spacing.two,
    lineHeight: 19,
    fontSize: 13,
    fontFamily: Fonts.body,
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
    fontFamily: Fonts.displaySemibold,
    lineHeight: 20,
  },
});
