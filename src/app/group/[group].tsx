import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { findGroupBySlug } from '@/content/groups';
import { getCategoryBySlug, getTopicsForCategory, slugify } from '@/lib/content';

export default function GroupScreen() {
  const { group: groupSlug } = useLocalSearchParams<{ group: string }>();
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];

  const group = useMemo(() => findGroupBySlug(groupSlug), [groupSlug]);

  const rows = useMemo(() => {
    if (!group) return [];
    return group.categories
      .map((name) => {
        const cat = getCategoryBySlug(slugify(name));
        if (!cat) return null;
        return {
          slug: slugify(name),
          name,
          count: getTopicsForCategory(slugify(name)).length,
          note: cat.note,
        };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
  }, [group]);

  if (!group) {
    return (
      <View style={[styles.container, { backgroundColor: c.bg }]}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <Text style={{ color: c.text, padding: Spacing.four }}>Group not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: group.name }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <View style={[styles.headerBlock, { backgroundColor: c.blueDeep }]}>
            <Text style={[styles.eyebrow, { color: c.onBlueSoft }]}>Category group</Text>
            <Text style={[styles.title, { color: c.onBlue }]}>{group.name}</Text>
            <Text style={[styles.subhead, { color: c.onBlueSoft }]}>{group.sub}</Text>
          </View>
          {rows.map((row) => (
            <Pressable
              key={row.slug}
              accessibilityRole="button"
              onPress={() => router.push({ pathname: '/category/[category]', params: { category: row.slug } })}
              style={({ pressed }) => [
                styles.row,
                { backgroundColor: c.card, borderColor: c.blue, borderWidth: 1.5, opacity: pressed ? 0.7 : 1 },
              ]}>
              <View style={[styles.icon, { backgroundColor: c.blueSoft }]}>
                <Icon name={group.icon} color={c.blue} />
              </View>
              <View style={styles.rowText}>
                <Text style={[styles.rowName, { color: c.text }]}>{row.name}</Text>
                <Text style={[styles.rowSub, { color: c.textSecondary }]}>{row.count} topics</Text>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
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
  rowText: { flex: 1, minWidth: 0 },
  rowName: { fontSize: 15, fontFamily: Fonts.displaySemibold },
  rowSub: { fontSize: 12, marginTop: 1, fontFamily: Fonts.body },
});
