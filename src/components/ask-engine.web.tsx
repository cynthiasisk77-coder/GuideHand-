// The web stand-in for the model.
//
// react-native-executorch is native code. Importing it outside a phone reaches
// for TurboModuleRegistry, finds nothing, and throws during server rendering —
// which does not just break this screen, it takes down every route in the web
// build with it. Metro picks this file for web automatically, so the native
// one never gets loaded there and the rest of the app keeps working.
//
// Nothing is lost: on the web the person already has an internet connection
// and a browser, and a 300 MB download to answer questions offline is a thing
// only a phone needs.

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Fonts } from '@/constants/calm';
import { AskModelChoice } from '@/lib/askModels';

interface Palette {
  bg: string;
  card: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  blue: string;
  blueSoft: string;
  sage: string;
  sageText: string;
  sageSoft: string;
  danger: string;
  dangerText: string;
  dangerSoft: string;
  plum: string;
  plumSoft: string;
}

interface AskEngineProps {
  model: AskModelChoice;
  c: Palette;
  onChangeModel: () => void;
  initialQuestion?: string;
}

export function AskEngine({ model, c, onChangeModel }: AskEngineProps) {
  return (
    <>
      <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
        <Text style={[styles.cardLabel, { color: c.text }]}>This part needs the phone app</Text>
        <Text style={[styles.body, { color: c.textSecondary }]}>
          The model runs on the phone&apos;s own hardware, so it only works in the installed app —
          not in a browser tab. Everything else here works the same in both.
        </Text>
        <Text style={[styles.body, { color: c.textSecondary }]}>
          Search still finds the same articles without it, and the articles are the actual guidance
          either way.
        </Text>
      </View>

      <Pressable accessibilityRole="button" onPress={onChangeModel} style={styles.changeLink}>
        <Text style={[styles.changeLinkText, { color: c.textSecondary }]}>
          {model.name} model chosen · change or remove
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 10, gap: 10 },
  cardLabel: { fontSize: 14, fontFamily: Fonts.bodyBold },
  body: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },
  changeLink: { paddingVertical: 12, alignItems: 'center' },
  changeLinkText: { fontSize: 12.5, fontFamily: Fonts.body, textDecorationLine: 'underline' },
});
