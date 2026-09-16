import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { EMERGENCY_CATEGORY, PRIORITY_HUMAN, PRIORITY_ORDER, getQuickTile } from '@/constants/categoryStyle';
import { priorityColor, priorityTextColor, STATUS_LABEL } from '@/constants/status';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { getCategoryBySlug, getTopicsForCategory } from '@/lib/content';

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];
  const categoryData = useMemo(() => getCategoryBySlug(category), [category]);
  const topics = useMemo(
    () =>
      [...getTopicsForCategory(category)].sort(
        (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      ),
    [category]
  );
  const name = categoryData?.name ?? 'Category';
  const isEmergency = name === EMERGENCY_CATEGORY;
  const written = topics.filter((t) => t.hasBody).length;

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: name }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <View style={[styles.headerBlock, { backgroundColor: c.card, borderWidth: 1, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.blue }]}>
            <Text style={[styles.eyebrow, { color: c.textSecondary }]}>Category</Text>
            <Text style={[styles.title, { color: c.text }]}>{name}</Text>
            <Text style={[styles.subhead, { color: c.textSecondary }]}>
              {categoryData?.note ? categoryData.note : `${written} of ${topics.length} topics written`}
            </Text>
          </View>

          {topics.map((item) => {
            const quick = isEmergency ? getQuickTile(item.title) : undefined;
            const stripeColor = priorityColor(item.priority, c);
            return (
              <Pressable
                key={item.slug}
                accessibilityRole="button"
                onPress={() =>
                  router.push({ pathname: '/article/[category]/[topic]', params: { category, topic: item.slug } })
                }
                style={({ pressed }) => [
                  styles.card,
                  { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.8 : 1 },
                ]}>
                <View style={[styles.stripe, { backgroundColor: stripeColor }]} />
                <View style={styles.cardBody}>
                  <Text style={[styles.cardTitle, { color: c.text }]}>{quick ? quick.label : item.title}</Text>
                  <View style={styles.metaRow}>
                    <View style={[styles.pill, { backgroundColor: stripeColor }]}>
                      <Text style={[styles.pillText, { color: priorityTextColor(item.priority, c.text) }]}>
                        {PRIORITY_HUMAN[item.priority]}
                      </Text>
                    </View>
                    <Text style={[styles.metaText, { color: c.textSecondary }]}>{STATUS_LABEL[item.status]}</Text>
                    {!item.hasBody ? (
                      <Text style={[styles.metaText, { color: c.textSecondary }]}>· not written yet</Text>
                    ) : null}
                  </View>
                </View>
                <Icon name="chevron" size={18} color={c.textSecondary} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const SIDE = Spacing.three;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingTop: 14, paddingBottom: 40 },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: SIDE,
  },
  headerBlock: {
    borderRadius: 20,
    padding: 16,
    gap: 6,
    marginBottom: 14,
  },
  eyebrow: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: { fontSize: 22, fontFamily: Fonts.display },
  subhead: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.body,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: Spacing.two,
  },
  stripe: {
    width: 5,
    alignSelf: 'stretch',
  },
  cardBody: {
    flex: 1,
    paddingVertical: 13,
    paddingHorizontal: Spacing.three,
    gap: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: Fonts.displaySemibold,
    lineHeight: 21,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  metaText: { fontSize: 12, fontFamily: Fonts.body },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  pillText: {
    fontSize: 11,
    fontFamily: Fonts.bodyBold,
  },
});
