// The web stand-in for Max's chat. The model is native code (see
// ask-engine.web.tsx for why importing it in a browser takes the whole app
// down). The rest of Night Watch works here as it does on the phone.

import { StyleSheet, Text, View } from 'react-native';

import { Calm, Fonts } from '@/constants/calm';
import { AI_NAME } from '@/lib/aiName';

type Palette = typeof Calm.light;

export interface NightWatchCompanionProps {
  c: Palette;
  name?: string;
  speaks: boolean;
  seed?: string;
}

export function NightWatchCompanion({ c }: NightWatchCompanionProps) {
  return (
    <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
      <Text style={[styles.cardLabel, { color: c.text }]}>This part needs the phone app</Text>
      <Text style={[styles.body, { color: c.textSecondary }]}>
        {AI_NAME} talks using a model that runs on the phone&apos;s own hardware, so her chat only works in the
        installed app. The games, check-ins and stories here work the same in both.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 10, gap: 10 },
  cardLabel: { fontSize: 14, fontFamily: Fonts.bodyBold },
  body: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },
});
