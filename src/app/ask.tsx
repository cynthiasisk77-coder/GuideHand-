import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AskEngine } from '@/components/ask-engine';
import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { ASK_MODELS, ASK_MODEL_KEY, AskModelChoice, findAskModel } from '@/lib/askModels';

export default function AskScreen() {
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];

  const [chosen, setChosen] = useState<AskModelChoice | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(ASK_MODEL_KEY)
      .then((id) => {
        if (!cancelled) setChosen(findAskModel(id));
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const choose = async (model: AskModelChoice) => {
    await AsyncStorage.setItem(ASK_MODEL_KEY, model.id).catch(() => {});
    setChosen(model);
  };

  const forget = async () => {
    await AsyncStorage.removeItem(ASK_MODEL_KEY).catch(() => {});
    setChosen(undefined);
  };

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'Ask GuideHand' }} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View
            style={[
              styles.headerBlock,
              {
                backgroundColor: c.card,
                borderWidth: 1,
                borderColor: c.cardBorder,
                borderLeftWidth: 5,
                borderLeftColor: c.blue,
              },
            ]}>
            <Text style={[styles.eyebrow, { color: c.textSecondary }]}>Offline</Text>
            <Text style={[styles.title, { color: c.text }]}>Ask GuideHand</Text>
            <Text style={[styles.subhead, { color: c.textSecondary }]}>
              Ask a question in your own words and get an answer built from your own saved articles. Once the model
              is downloaded this works with no signal, no Wi-Fi and no account.
            </Text>
          </View>

          {/* The honest limit, stated before anyone relies on it. */}
          <View style={[styles.boundary, { backgroundColor: c.plumSoft, borderColor: c.plum }]}>
            <Icon name="lock" size={16} color={c.plum} />
            <Text style={[styles.boundaryText, { color: c.plum }]}>
              It only ever answers from GuideHand&apos;s own sourced articles, and it names which ones it used. It
              does not know anything they don&apos;t say, and it will tell you when they don&apos;t cover your
              question rather than guessing.
            </Text>
          </View>

          {!loaded ? (
            <ActivityIndicator color={c.blue} style={styles.loading} />
          ) : chosen ? (
            <AskEngine model={chosen} c={c} onChangeModel={forget} />
          ) : (
            <>
              <Text style={[styles.sectionLabel, { color: c.blue }]}>CHOOSE WHAT TO DOWNLOAD</Text>
              <Text style={[styles.sectionNote, { color: c.textSecondary }]}>
                Do this on Wi-Fi, before you need it. It downloads once and then lives on the phone.
              </Text>

              {ASK_MODELS.map((model) => (
                <Pressable
                  key={model.id}
                  accessibilityRole="button"
                  onPress={() => choose(model)}
                  style={({ pressed }) => [
                    styles.modelCard,
                    {
                      backgroundColor: c.card,
                      borderColor: model.recommended ? c.sage : c.cardBorder,
                      borderWidth: model.recommended ? 1.8 : 1,
                      opacity: pressed ? 0.75 : 1,
                    },
                  ]}>
                  <View style={styles.modelHead}>
                    <Text style={[styles.modelName, { color: c.text }]}>{model.name}</Text>
                    <Text style={[styles.modelSize, { color: c.textSecondary }]}>{model.size}</Text>
                    {model.recommended ? (
                      <View style={[styles.pill, { backgroundColor: c.sageSoft }]}>
                        <Text style={[styles.pillText, { color: c.sage }]}>START HERE</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={[styles.modelBody, { color: c.textSecondary }]}>{model.summary}</Text>
                </Pressable>
              ))}

              <Text style={[styles.footnote, { color: c.textSecondary }]}>
                None of this is required. Every article is already on your phone and searchable without it —
                downloading a model only changes how you ask.
              </Text>
            </>
          )}

          <Text style={[styles.footer, { color: c.textSecondary }]}>
            Runs entirely on this device. Your questions are never sent anywhere.
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
  headerBlock: { borderRadius: 20, padding: 16, gap: 6, marginBottom: 14 },
  eyebrow: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: { fontSize: 22, fontFamily: Fonts.display },
  subhead: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },

  boundary: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderWidth: 1.2,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  boundaryText: { flex: 1, fontSize: 12.5, lineHeight: 18, fontFamily: Fonts.bodyMedium },

  loading: { marginTop: 20 },

  sectionLabel: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    marginBottom: 6,
    marginLeft: 2,
  },
  sectionNote: { fontSize: 12.5, lineHeight: 18, fontFamily: Fonts.body, marginBottom: 10, marginLeft: 2 },

  modelCard: { borderRadius: 14, padding: 14, marginBottom: 9, gap: 6 },
  modelHead: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  modelName: { fontSize: 16, fontFamily: Fonts.display },
  modelSize: { flex: 1, fontSize: 12.5, fontFamily: Fonts.monoMedium },
  pill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  pillText: { fontSize: 9, fontFamily: Fonts.mono, letterSpacing: 0.8 },
  modelBody: { fontSize: 13, lineHeight: 18.5, fontFamily: Fonts.body },

  footnote: { fontSize: 12.5, lineHeight: 18.5, fontFamily: Fonts.body, marginTop: 8 },
  footer: {
    marginTop: 22,
    marginBottom: 12,
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 17,
    fontFamily: Fonts.body,
  },
});
