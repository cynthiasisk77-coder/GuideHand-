// One story, read by Max or by you. The screen stays on while it is open:
// a story that goes dark halfway is worse than the battery it costs, and
// the person can leave whenever they like.

import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useKeepAwake } from 'expo-keep-awake';

import { KeyboardAwareScrollView } from '@/components/keyboard-aware-scroll';
import { ReadAloudButton } from '@/components/read-aloud-button';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { findStory } from '@/content/nightWatch/stories';
import { AI_NAME } from '@/lib/aiName';

export default function NightStoryScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];
  const story = findStory(id);
  useKeepAwake('night-story', { suppressDeactivateWarnings: true });

  if (!story) {
    return (
      <View style={[styles.container, { backgroundColor: c.bg }]}>
        <Stack.Screen options={{ title: 'A Story' }} />
        <View style={styles.content}>
          <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
            <Text style={[styles.body, { color: c.textSecondary }]}>That story is not here. Go back and pick another.</Text>
          </View>
        </View>
      </View>
    );
  }

  const paragraphs = story.text.split('\n\n');

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: story.title }} />
      <KeyboardAwareScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <View style={[styles.headerBlock, { backgroundColor: c.headerBg, borderWidth: 1, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.plum }]}>
            <Text style={[styles.eyebrow, { color: c.textSecondary }]}>
              {story.author} · about {story.minutes} min read aloud
            </Text>
            <Text style={[styles.title, { color: c.text }]}>{story.title}</Text>
            <ReadAloudButton text={story.text} label={`Have ${AI_NAME} read it`} color={c.blueText} background={c.blueSoft} mutedColor={c.textSecondary} />
          </View>

          <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
            {paragraphs.map((p, i) => (
              <Text key={i} style={[styles.para, { color: c.text }]}>
                {p}
              </Text>
            ))}
          </View>

          <Text style={[styles.source, { color: c.onBgSoft }]}>{story.source}. The screen stays on while this story is open.</Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const SIDE = Spacing.three;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingTop: 18, paddingBottom: 40 },
  content: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: SIDE, paddingTop: 18 },
  headerBlock: { borderRadius: 20, padding: 16, gap: 10, marginBottom: 14 },
  eyebrow: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { fontSize: 22, fontFamily: Fonts.display },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 10, gap: 14 },
  body: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },
  para: { fontSize: 16, lineHeight: 25, fontFamily: Fonts.body },
  source: { marginTop: 12, marginBottom: 12, fontSize: 11.5, textAlign: 'center', lineHeight: 17, fontFamily: Fonts.body },
});
