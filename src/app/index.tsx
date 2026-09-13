import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatusBadge, PriorityBadge } from '@/components/status-badge';
import { Spacing } from '@/constants/theme';
import { getCategorySummaries, searchTopics } from '@/lib/content';

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const categories = useMemo(() => getCategorySummaries(), []);
  const results = useMemo(() => searchTopics(query), [query]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Emergency Prep
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Works fully offline. No account, no signal required.
          </ThemedText>
        </ThemedView>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search every topic…"
          placeholderTextColor="#8a8f98"
          style={styles.search}
          autoCorrect={false}
        />

        {query.trim().length > 0 ? (
          <FlatList
            data={results}
            keyExtractor={(item, i) => `${item.categorySlug}-${item.topic.slug}-${i}`}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <ThemedText type="small" themeColor="textSecondary" style={styles.empty}>
                No topics match "{query}".
              </ThemedText>
            }
            renderItem={({ item }) => (
              <Pressable
                style={styles.row}
                onPress={() =>
                  router.push(`/article/${item.categorySlug}/${item.topic.slug}` as never)
                }>
                <ThemedView type="backgroundElement" style={styles.rowInner}>
                  <ThemedText type="default" style={styles.rowTitle}>
                    {item.topic.title}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {item.categoryName}
                  </ThemedText>
                  <ThemedView style={styles.badgeRow}>
                    <StatusBadge status={item.topic.status} />
                    <PriorityBadge priority={item.topic.priority} />
                  </ThemedView>
                </ThemedView>
              </Pressable>
            )}
          />
        ) : (
          <FlatList
            data={categories}
            keyExtractor={(item) => item.slug}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <Pressable
                style={styles.row}
                onPress={() => router.push(`/category/${item.slug}` as never)}>
                <ThemedView type="backgroundElement" style={styles.rowInner}>
                  <ThemedText type="default" style={styles.rowTitle}>
                    {item.name}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {item.writtenCount} of {item.topicCount} topics written
                  </ThemedText>
                </ThemedView>
              </Pressable>
            )}
          />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
    gap: Spacing.one,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
  },
  search: {
    marginHorizontal: Spacing.four,
    marginBottom: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    backgroundColor: '#F0F0F3',
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.two,
  },
  row: {
    marginBottom: Spacing.two,
  },
  rowInner: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    gap: Spacing.half,
  },
  rowTitle: {
    fontWeight: '600',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: Spacing.one,
    marginTop: Spacing.one,
  },
  empty: {
    textAlign: 'center',
    marginTop: Spacing.four,
  },
});
