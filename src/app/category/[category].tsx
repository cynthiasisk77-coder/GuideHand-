import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { CallButton } from '@/components/call-button';
import { Icon } from '@/components/icon';
import { Calm } from '@/constants/calm';
import { EMERGENCY_CATEGORY, PRIORITY_HUMAN, PRIORITY_ORDER, getQuickTile } from '@/constants/categoryStyle';
import { PRIORITY_COLOR, STATUS_LABEL } from '@/constants/status';
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
          <Text style={[styles.subhead, { color: c.textSecondary }]}>
            {categoryData?.note ? categoryData.note : `${written} of ${topics.length} topics written`}
          </Text>

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
                style={({ pressed }) => [
                  styles.card,
                  { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.8 : 1 },
                ]}>
                <View style={[styles.stripe, { backgroundColor: PRIORITY_COLOR[item.priority] }]} />
                <View style={styles.cardBody}>
                  <Text style={[styles.cardTitle, { color: c.text }]}>{quick ? quick.label : item.title}</Text>
                  <View style={styles.metaRow}>
                    <View style={[styles.pill, { backgroundColor: PRIORITY_COLOR[item.priority] }]}>
                      <Text style={styles.pillText}>{PRIORITY_HUMAN[item.priority]}</Text>
                    </View>
                    <Text style={[styles.metaText, { color: c.textSecondary }]}>{STATUS_LABEL[item.status]}</Text>
                    {!item.hasBody ? (
                      <Text style={[styles.metaText, { color: c.textSecondary }]}>· not written yet</Text>
                    ) : null}
                  </View>
                </View>
                <Icon name="chevron" size={18} color={c.chevron} />
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
  subhead: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  call: {
    marginBottom: Spacing.three,
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
    fontWeight: '700',
    lineHeight: 21,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  metaText: { fontSize: 12 },
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
});
