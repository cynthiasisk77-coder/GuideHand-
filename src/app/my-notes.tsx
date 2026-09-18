// What you know that no article does.
//
// Every article in this app is about what is generally true. None of them know
// where your well shutoff is, which neighbour has a tractor, how your generator
// has to be coaxed on a cold morning, or what your mother is really allergic
// to. That is the most valuable knowledge in any household and it usually lives
// in one person's head.
//
// Anything written here is searchable like an article, and Ask GuideHand can
// answer from it and say it came from you. It never leaves the phone.

import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { Stack } from 'expo-router';

import { KeyboardAwareScrollView } from '@/components/keyboard-aware-scroll';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { notePersonalDataChanged } from '@/lib/autoBackup';
import {
  MyNote,
  emptyNote,
  isUsable,
  linesFromText,
  loadMyNotes,
  saveMyNotes,
  textFromLines,
} from '@/lib/myNotes';
import { loadInstalledPacksIntoRegistry } from '@/lib/packs';

export default function MyNotesScreen() {
  const colorScheme = useColorScheme();
  const c = Calm[colorScheme === 'dark' ? 'dark' : 'light'];

  const [notes, setNotes] = useState<MyNote[]>([]);
  const [open, setOpen] = useState<string | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadMyNotes().then((saved) => {
      if (cancelled) return;
      setNotes(saved);
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Saving has to do three things, and the third is the one that matters:
  // re-registering makes a note reachable by search and by the AI straight
  // away, rather than at the next app start.
  const save = useCallback(async (next: MyNote[]) => {
    setNotes(next);
    await saveMyNotes(next);
    notePersonalDataChanged('my-notes');
    await loadInstalledPacksIntoRegistry();
  }, []);

  const addNote = () => {
    const blank = notes.find((n) => !n.title.trim() && n.guidance.length === 0);
    if (blank) {
      setOpen(blank.id);
      return;
    }
    const note = emptyNote();
    void save([...notes, note]);
    setOpen(note.id);
  };

  const patch = (id: string, updates: Partial<MyNote>) => {
    void save(notes.map((n) => (n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n)));
  };

  const remove = (id: string) => {
    void save(notes.filter((n) => n.id !== id));
    setOpen((current) => (current === id ? undefined : current));
  };

  const live = notes.filter(isUsable).length;

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'What You Know' }} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View
            style={[
              styles.headerBlock,
              { backgroundColor: c.headerBg, borderWidth: 1, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.sage },
            ]}>
            <Text style={[styles.eyebrow, { color: c.textSecondary }]}>Your own notes</Text>
            <Text style={[styles.title, { color: c.text }]}>What You Know</Text>
            <Text style={[styles.subhead, { color: c.textSecondary }]}>
              The articles know what is generally true. They do not know where your water shutoff is,
              or how the generator has to be started. Write that here and the app can find it, read it
              aloud, and answer questions from it — the same as any other article.
            </Text>
          </View>

          {live > 0 ? (
            <View style={[styles.banner, { backgroundColor: c.sageSoft, borderColor: c.sage }]}>
              <Text style={[styles.bannerText, { color: c.sageText }]}>
                {live} {live === 1 ? 'note is' : 'notes are'} searchable, and Max can answer from{' '}
                {live === 1 ? 'it' : 'them'}.
              </Text>
            </View>
          ) : null}

          {loaded && notes.length === 0 ? (
            <View style={[styles.empty, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
              <Text style={[styles.emptyTitle, { color: c.text }]}>Things worth writing down</Text>
              {[
                'Where the water, gas and power shut off, and what you need to turn them',
                'How the generator starts when it is cold',
                'Which neighbour has the chainsaw, the truck, the well',
                'What each person in the house is allergic to',
                'Where the spare keys are, and who else knows',
              ].map((line) => (
                <Text key={line} style={[styles.emptyLine, { color: c.textSecondary }]}>
                  · {line}
                </Text>
              ))}
            </View>
          ) : null}

          {notes.map((note) => {
            const isOpen = open === note.id;
            return (
              <View
                key={note.id}
                style={[styles.note, { backgroundColor: c.card, borderColor: isOpen ? c.sage : c.cardBorder }]}>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setOpen(isOpen ? undefined : note.id)}
                  style={({ pressed }) => [styles.noteHead, { opacity: pressed ? 0.75 : 1 }]}>
                  <Icon name="plan" size={18} color={c.sage} />
                  <View style={styles.noteText}>
                    <Text style={[styles.noteTitle, { color: note.title ? c.text : c.textSecondary }]}>
                      {note.title || 'Untitled — tap to write it'}
                    </Text>
                    {note.guidance.length > 0 ? (
                      <Text style={[styles.noteMeta, { color: c.textSecondary }]} numberOfLines={1}>
                        {note.guidance.length} {note.guidance.length === 1 ? 'line' : 'lines'}
                      </Text>
                    ) : null}
                  </View>
                  <Icon name="chevron" size={16} color={c.textSecondary} />
                </Pressable>

                {isOpen ? (
                  <View style={[styles.noteBody, { borderTopColor: c.cardBorder }]}>
                    <TextInput
                      defaultValue={note.title}
                      onChangeText={(text) => patch(note.id, { title: text })}
                      placeholder="What is this about? — Where the water shuts off"
                      placeholderTextColor={c.textSecondary}
                      style={[styles.input, { color: c.text, borderColor: c.cardBorder }]}
                    />
                    <TextInput
                      defaultValue={textFromLines(note.guidance)}
                      onChangeText={(text) => patch(note.id, { guidance: linesFromText(text) })}
                      placeholder={'Write it a line at a time.\n\nUnder the porch, behind the lattice.\nTakes the long silver wrench from the garage.\nTurn it clockwise until it stops.'}
                      placeholderTextColor={c.textSecondary}
                      multiline
                      style={[styles.input, styles.body, { color: c.text, borderColor: c.cardBorder }]}
                    />
                    <Text style={[styles.hint, { color: c.textSecondary }]}>
                      One line per step. Blank lines are ignored.
                    </Text>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => remove(note.id)}
                      style={({ pressed }) => [styles.removeRow, { opacity: pressed ? 0.6 : 1 }]}>
                      <Icon name="trash" size={15} color={c.dangerText} />
                      <Text style={[styles.removeText, { color: c.dangerText }]}>Delete this note</Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
            );
          })}

          <Pressable
            accessibilityRole="button"
            onPress={addNote}
            style={({ pressed }) => [styles.addRow, { backgroundColor: c.sageSoft, opacity: pressed ? 0.7 : 1 }]}>
            <Icon name="plus" size={16} color={c.sage} />
            <Text style={[styles.addText, { color: c.sageText }]}>
              {notes.length === 0 ? 'Write your first one' : 'Add'}
            </Text>
          </Pressable>

          <Text style={[styles.footer, { color: c.textSecondary }]}>
            Stored encrypted on this phone and included in your backups. Nothing written here is sent
            anywhere, and the AI answers from it without a signal.
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingTop: 14, paddingBottom: 40 },
  content: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: Spacing.three, gap: 10 },
  headerBlock: { borderRadius: 16, padding: 15, gap: 5, marginBottom: 4 },
  eyebrow: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.3, textTransform: 'uppercase' },
  title: { fontSize: 23, fontFamily: Fonts.display },
  subhead: { fontSize: 13.5, lineHeight: 19.5, fontFamily: Fonts.body },
  banner: { borderWidth: 1.5, borderRadius: 13, paddingVertical: 11, paddingHorizontal: 13 },
  bannerText: { fontSize: 13, lineHeight: 18.5, fontFamily: Fonts.bodySemibold },
  empty: { borderWidth: 1, borderRadius: 14, padding: 14, gap: 5 },
  emptyTitle: { fontSize: 15, fontFamily: Fonts.displaySemibold, marginBottom: 3 },
  emptyLine: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },
  note: { borderWidth: 1, borderRadius: 14, overflow: 'hidden' },
  noteHead: { flexDirection: 'row', alignItems: 'center', gap: 11, padding: 13 },
  noteText: { flex: 1, gap: 2 },
  noteTitle: { fontSize: 15, fontFamily: Fonts.displaySemibold },
  noteMeta: { fontSize: 12, fontFamily: Fonts.body },
  noteBody: { borderTopWidth: 1, padding: 13, gap: 9 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 11, paddingVertical: 10, fontSize: 14.5, fontFamily: Fonts.body },
  body: { minHeight: 140, textAlignVertical: 'top' },
  hint: { fontSize: 11.5, fontFamily: Fonts.body, marginTop: -3 },
  removeRow: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 6 },
  removeText: { fontSize: 13.5, fontFamily: Fonts.bodySemibold },
  addRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 12, paddingVertical: 13, marginTop: 2 },
  addText: { fontSize: 14.5, fontFamily: Fonts.bodyBold },
  footer: { fontSize: 11.5, lineHeight: 17, textAlign: 'center', marginTop: 6, fontFamily: Fonts.body },
});
