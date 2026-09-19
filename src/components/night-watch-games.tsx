// The parts of Night Watch that need no model: trivia, riddles, a word chain,
// and something to talk about. Max hosts; the rules live in
// src/lib/nightWatch/games.ts, where a desk can test them.

import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { AI_NAME } from '@/lib/aiName';
import {
  answerTrivia,
  lastLetter,
  newRiddleSet,
  newTriviaRound,
  playChainWord,
  riddleMatches,
  skipTrivia,
  startChain,
  talkPrompts,
  triviaSummary,
} from '@/lib/nightWatch/games';

type Palette = typeof Calm.light;

interface PanelProps {
  c: Palette;
  /** Max says this out loud, when she is allowed to. */
  say: (line: string) => void;
}

// --- Trivia ------------------------------------------------------------------

export function TriviaPanel({ c, say }: PanelProps) {
  const [round, setRound] = useState(() => newTriviaRound());
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | undefined>(undefined);
  const total = round.questions.length;
  const done = round.index >= total && !feedback;
  const shownIndex = feedback ? round.index - 1 : round.index;
  const question = round.questions[Math.min(shownIndex, total - 1)];

  const finish = (result: ReturnType<typeof answerTrivia>) => {
    setFeedback(result.line);
    say(result.line);
    setRound(result.round);
    setAnswer('');
  };
  const submit = () => {
    if (!answer.trim()) return;
    finish(answerTrivia(round, answer));
  };
  const next = () => {
    setFeedback(undefined);
    if (round.index < total) say(round.questions[round.index].q);
    else say(triviaSummary(round));
  };
  const again = () => {
    const fresh = newTriviaRound();
    setRound(fresh);
    setFeedback(undefined);
    setAnswer('');
    say(fresh.questions[0].q);
  };

  if (done) {
    return (
      <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
        <Text style={[styles.label, { color: c.blue }]}>ROUND OVER</Text>
        <Text style={[styles.big, { color: c.text }]}>{triviaSummary(round)}</Text>
        <Button c={c} label="Another round" onPress={again} />
      </View>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
      <View style={styles.headRow}>
        <Text style={[styles.label, { color: c.blue }]}>
          QUESTION {shownIndex + 1} OF {total}
        </Text>
        <Text style={[styles.label, { color: c.textSecondary }]}>SCORE {round.score}</Text>
      </View>
      <Text style={[styles.big, { color: c.text }]}>{question.q}</Text>
      {feedback ? (
        <>
          <MaxLine c={c} text={feedback} />
          <Button c={c} label={round.index < total ? 'Next question' : 'How did I do?'} onPress={next} />
        </>
      ) : (
        <>
          <Answer c={c} value={answer} onChange={setAnswer} onSubmit={submit} placeholder="Your answer" />
          <View style={styles.buttonRow}>
            <Button c={c} label="Answer" onPress={submit} disabled={!answer.trim()} grow />
            <Button c={c} label="Tell me" onPress={() => finish(skipTrivia(round))} quiet />
          </View>
        </>
      )}
    </View>
  );
}

// --- Riddles -----------------------------------------------------------------

export function RiddlesPanel({ c, say }: PanelProps) {
  const [set, setSet] = useState(() => newRiddleSet());
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [hint, setHint] = useState(false);
  const [line, setLine] = useState<string | undefined>(undefined);
  const [solved, setSolved] = useState(false);
  const riddle = set[index];

  const submit = () => {
    if (!answer.trim()) return;
    if (riddleMatches(riddle, answer)) {
      const said = `That's it. ${riddle.reveal}`;
      setLine(said);
      setSolved(true);
      say(said);
    } else {
      const said = hint ? 'Not that. Have another go.' : 'Not that. Try again, or ask for a hint.';
      setLine(said);
      say(said);
    }
    setAnswer('');
  };
  const reveal = () => {
    setLine(riddle.reveal);
    setSolved(true);
    say(riddle.reveal);
  };
  const next = () => {
    let i = index + 1;
    let s = set;
    if (i >= set.length) {
      s = newRiddleSet();
      setSet(s);
      i = 0;
    }
    setIndex(i);
    setAnswer('');
    setHint(false);
    setLine(undefined);
    setSolved(false);
    say(s[i].riddle);
  };

  return (
    <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
      <Text style={[styles.label, { color: c.blue }]}>RIDDLE {index + 1}</Text>
      <Text style={[styles.big, { color: c.text }]}>{riddle.riddle}</Text>
      {hint ? <Text style={[styles.hint, { color: c.textSecondary }]}>Hint: {riddle.hint}</Text> : null}
      {line ? <MaxLine c={c} text={line} /> : null}
      {solved ? (
        <Button c={c} label="Next riddle" onPress={next} />
      ) : (
        <>
          <Answer c={c} value={answer} onChange={setAnswer} onSubmit={submit} placeholder="What is it?" />
          <View style={styles.buttonRow}>
            <Button c={c} label="Answer" onPress={submit} disabled={!answer.trim()} grow />
            {!hint ? <Button c={c} label="Hint" onPress={() => setHint(true)} quiet /> : null}
            <Button c={c} label="Tell me" onPress={reveal} quiet />
          </View>
        </>
      )}
    </View>
  );
}

// --- Word chain ----------------------------------------------------------------

export function WordChainPanel({ c, say }: PanelProps) {
  const [chain, setChain] = useState(() => startChain());
  const [word, setWord] = useState('');
  const [line, setLine] = useState<string>(() => firstLine(chain.words[0]));

  const submit = () => {
    if (!word.trim()) return;
    const verdict = playChainWord(chain, word);
    setLine(verdict.line);
    say(verdict.line);
    if (verdict.ok) setChain(verdict.state);
    setWord('');
  };
  const restart = () => {
    const fresh = startChain();
    setChain(fresh);
    setWord('');
    const said = firstLine(fresh.words[0]);
    setLine(said);
    say(said);
  };
  const need = lastLetter(chain.words[chain.words.length - 1]).toUpperCase();

  return (
    <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
      <Text style={[styles.label, { color: c.blue }]}>WORD CHAIN · {chain.words.length} PLAYED</Text>
      <Text style={[styles.body, { color: c.textSecondary }]}>
        Each word starts with the last letter of the one before. No repeats. {AI_NAME} takes your word for it.
      </Text>
      <View style={styles.chips}>
        {chain.words.map((w, i) => (
          <View key={`${w}-${i}`} style={[styles.chip, { backgroundColor: i % 2 === 0 ? c.blueSoft : c.sageSoft }]}>
            <Text style={[styles.chipText, { color: c.text }]}>{w}</Text>
          </View>
        ))}
      </View>
      <MaxLine c={c} text={line} />
      <Answer c={c} value={word} onChange={setWord} onSubmit={submit} placeholder={`A word starting with ${need}`} />
      <View style={styles.buttonRow}>
        <Button c={c} label="Play it" onPress={submit} disabled={!word.trim()} grow />
        <Button c={c} label="Start over" onPress={restart} quiet />
      </View>
    </View>
  );
}

function firstLine(word: string): string {
  return `My word is "${word}". You need ${lastLetter(word).toUpperCase()}.`;
}

// --- Something to talk about ----------------------------------------------------

interface TalkProps extends PanelProps {
  /** Hands the question to Max's chat, for a night alone. */
  onTalkToMax: (prompt: string) => void;
}

export function TalkPanel({ c, say, onTalkToMax }: TalkProps) {
  const [prompts] = useState(() => talkPrompts());
  const [index, setIndex] = useState(0);
  const prompt = prompts[index % prompts.length];

  return (
    <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
      <Text style={[styles.label, { color: c.blue }]}>SOMETHING TO TALK ABOUT</Text>
      <Text style={[styles.big, { color: c.text }]}>{prompt}</Text>
      <Text style={[styles.body, { color: c.textSecondary }]}>
        For whoever is up with you. Or answer it out loud to {AI_NAME}; she likes a story.
      </Text>
      <View style={styles.buttonRow}>
        <Button c={c} label="Another one" onPress={() => { const i = index + 1; setIndex(i); say(prompts[i % prompts.length]); }} grow />
        <Button c={c} label="Say it" onPress={() => say(prompt)} quiet />
      </View>
      <Pressable accessibilityRole="button" onPress={() => onTalkToMax(prompt)} style={({ pressed }) => [styles.link, { opacity: pressed ? 0.6 : 1 }]}>
        <Text style={[styles.linkText, { color: c.blue }]}>Talk it over with {AI_NAME} →</Text>
      </Pressable>
    </View>
  );
}

// --- Shared pieces ----------------------------------------------------------------

function MaxLine({ c, text }: { c: Palette; text: string }) {
  return (
    <View style={[styles.maxLine, { backgroundColor: c.blueSoft, borderColor: c.blue }]}>
      <View style={[styles.badge, { backgroundColor: c.blue }]}>
        <Text style={[styles.badgeText, { color: c.card }]}>{AI_NAME.charAt(0)}</Text>
      </View>
      <Text style={[styles.maxText, { color: c.text }]}>{text}</Text>
    </View>
  );
}

function Answer({ c, value, onChange, onSubmit, placeholder }: { c: Palette; value: string; onChange: (v: string) => void; onSubmit: () => void; placeholder: string }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      onSubmitEditing={onSubmit}
      placeholder={placeholder}
      placeholderTextColor={c.textSecondary}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      blurOnSubmit={false}
      style={[styles.input, { color: c.text, borderColor: c.cardBorder }]}
    />
  );
}

function Button({ c, label, onPress, disabled, quiet, grow }: { c: Palette; label: string; onPress: () => void; disabled?: boolean; quiet?: boolean; grow?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        grow ? styles.grow : null,
        { backgroundColor: quiet ? 'transparent' : c.blueSoft, borderColor: c.blue, borderWidth: quiet ? 1 : 0, opacity: pressed || disabled ? 0.5 : 1 },
      ]}>
      {!quiet ? <Icon name="check" size={15} color={c.blue} /> : null}
      <Text style={[styles.buttonText, { color: c.blue }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 10, gap: 10 },
  headRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.2 },
  big: { fontSize: 17, lineHeight: 24, fontFamily: Fonts.displaySemibold },
  body: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },
  hint: { fontSize: 13.5, lineHeight: 19, fontFamily: Fonts.bodyMedium, fontStyle: 'italic' },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 15, fontFamily: Fonts.body },
  buttonRow: { flexDirection: 'row', gap: 8 },
  grow: { flex: 1 },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 11, paddingVertical: 11, paddingHorizontal: 14 },
  buttonText: { fontSize: 14, fontFamily: Fonts.bodyBold },
  maxLine: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1.2, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 11 },
  badge: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 14, fontFamily: Fonts.displaySemibold },
  maxText: { flex: 1, fontSize: 14, lineHeight: 20, fontFamily: Fonts.bodySemibold },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  chipText: { fontSize: 13, fontFamily: Fonts.bodySemibold },
  link: { paddingTop: 2, paddingBottom: 2 },
  linkText: { fontSize: 13, fontFamily: Fonts.bodySemibold, textDecorationLine: 'underline' },
});
