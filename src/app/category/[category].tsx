import { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatusBadge, PriorityBadge } from '@/components/status-badge';
import { Spacing } from '@/constants/theme';
import { getCategoryBySlug, getTopicsForCategory } from '@/lib/content';

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();
  const categoryData = useMemo(() => getCategoryBySlug(category), [category]);
  const topics = useMemo(() => getTopicsForCategory(category), [category]);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: categoryData?.name ?? 'Category' }} />
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        {categoryData?.note ? (
          <ThemedView style={styles.noteBox}>
            <ThemedText type="small" themeColor="textSecondary">
              {categoryData.note}
            </ThemedText>
          </ThemedView>
        ) : null}
        <FlatList
          data={topics}
          keyExtractor={(item) => item.slug}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable
              style={styles.row}
              onPress={() => router.push(`/article/${category}/${item.slug}` as never)}>
              <ThemedView type="backgroundElement" style={styles.rowInner}>
                <ThemedText type="default" style={styles.rowTitle}>
                  {item.title}
                </ThemedText>
                <ThemedView style={styles.badgeRow}>
                  <StatusBadge status={item.status} />
                  <PriorityBadge priority={item.priority} />
                  {!item.hasBody ? (
                    <ThemedText type="small" themeColor="textSecondary">
                      full article not written yet
                    </ThemedText>
                  ) : null}
                </ThemedView>
              </ThemedView>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  noteBox: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  listContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
  },
  row: { marginBottom: Spacing.two },
  rowInner: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    gap: Spacing.one,
  },
  rowTitle: { fontWeight: '600' },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    flexWrap: 'wrap',
  },
});
