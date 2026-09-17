import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { EMERGENCY_BUCKETS, slugifyBucket } from '@/content/emergencyBuckets';
import { getP0TopicsForCategories } from '@/lib/content';

export default function EmergencyIndexScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];

  const buckets = useMemo(
    () => EMERGENCY_BUCKETS.map((b) => ({ ...b, count: getP0TopicsForCategories(b.categories).length })),
    []
  );
  const total = useMemo(() => buckets.reduce((sum, b) => sum + b.count, 0), [buckets]);

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'What To Do In An Emergency' }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <View style={[styles.headerBlock, { backgroundColor: c.headerBg, borderWidth: 1, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.danger }]}>
            <Text style={[styles.eyebrow, { color: c.textSecondary }]}>Emergency</Text>
            <Text style={[styles.title, { color: c.text }]}>What&apos;s happening?</Text>
            <Text style={[styles.subhead, { color: c.textSecondary }]}>
              Pick what&apos;s closest — {total} life-threatening topics, step by step.
            </Text>
          </View>

          <View style={[styles.calmBlock, { backgroundColor: c.sageSoft }]}>
            <Text style={[styles.calmText, { color: c.text }]}>
              Stay calm. Take a deep breath. It&apos;s going to be okay — we&apos;ll get through this together.
            </Text>
          </View>

          {buckets.map((bucket) => (
            <Pressable
              key={bucket.name}
              accessibilityRole="button"
              onPress={() => router.push({ pathname: '/emergency/[bucket]', params: { bucket: slugifyBucket(bucket.name) } })}
              style={({ pressed }) => [
                styles.row,
                { backgroundColor: c.card, borderColor: c.danger, opacity: pressed ? 0.8 : 1 },
              ]}>
              <View style={[styles.icon, { backgroundColor: c.dangerSoft }]}>
                <Icon name={bucket.icon} color={c.danger} />
              </View>
              <View style={styles.rowText}>
                <Text style={[styles.rowName, { color: c.text }]}>{bucket.name}</Text>
                <Text style={[styles.rowSub, { color: c.textSecondary }]}>{bucket.sub}</Text>
                <Text style={[styles.rowCount, { color: c.danger }]}>{bucket.count} topics</Text>
              </View>
              <Icon name="chevron" size={18} color={c.textSecondary} />
            </Pressable>
          ))}

          <Text style={[styles.footer, { color: c.textSecondary }]}>
            If you know exactly what you&apos;re looking for, search from the home screen instead.
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
  calmBlock: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  calmText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.bodyMedium,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: { flex: 1, minWidth: 0, gap: 1 },
  rowName: { fontSize: 15, fontFamily: Fonts.displaySemibold },
  rowSub: { fontSize: 12, marginTop: 1, fontFamily: Fonts.body },
  rowCount: { fontSize: 11, marginTop: 3, fontFamily: Fonts.mono, letterSpacing: 0.3 },
  footer: {
    marginTop: 16,
    marginBottom: 12,
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 17,
    fontFamily: Fonts.body,
  },
});
