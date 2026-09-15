import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { findBucketBySlug } from '@/content/emergencyBuckets';
import { getP0TopicsForCategories } from '@/lib/content';

export default function EmergencyBucketScreen() {
  const { bucket: bucketSlug } = useLocalSearchParams<{ bucket: string }>();
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];

  const bucket = useMemo(() => findBucketBySlug(bucketSlug), [bucketSlug]);
  const topics = useMemo(() => (bucket ? getP0TopicsForCategories(bucket.categories) : []), [bucket]);

  if (!bucket) {
    return (
      <View style={[styles.container, { backgroundColor: c.bg }]}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <Text style={{ color: c.text, padding: Spacing.four }}>That emergency type wasn&apos;t found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: bucket.name }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <View style={[styles.headerBlock, { backgroundColor: c.blueDeep }]}>
            <Text style={[styles.eyebrow, { color: c.onBlueSoft }]}>Emergency</Text>
            <Text style={[styles.title, { color: c.onBlue }]}>{bucket.name}</Text>
            <Text style={[styles.subhead, { color: c.onBlueSoft }]}>{topics.length} life-threatening topics</Text>
          </View>

          {topics.map((item) => (
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
                styles.card,
                { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.8 : 1 },
              ]}>
              <View style={[styles.stripe, { backgroundColor: c.danger }]} />
              <View style={styles.cardBody}>
                <Text style={[styles.cardTitle, { color: c.text }]}>{item.topic.title}</Text>
                <Text style={[styles.metaText, { color: c.textSecondary }]}>{item.categoryName}</Text>
              </View>
              <Icon name="chevron" size={18} color={c.textSecondary} />
            </Pressable>
          ))}
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
  subhead: { fontSize: 13, lineHeight: 18, fontFamily: Fonts.body },
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
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: Fonts.displaySemibold,
    lineHeight: 21,
  },
  metaText: { fontSize: 12, fontFamily: Fonts.body },
});
