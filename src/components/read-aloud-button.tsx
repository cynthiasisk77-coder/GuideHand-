// One button that reads something out and stops when tapped again.
//
// It also has to answer a question the old version could not: when nothing is
// heard, is the app broken or does this phone simply have no voice? Android
// gives no error either way, so the button asks the phone first and says which
// one it is. A button that explains itself beats a button that does nothing.

import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Fonts } from '@/constants/calm';
import { hasVoiceAsync, readAloud, stopReading } from '@/lib/readAloud';

interface ReadAloudButtonProps {
  text: string;
  /** What to call it. Defaults to the plain thing. */
  label?: string;
  color: string;
  background: string;
  /** Colour for the line explaining a phone that cannot speak. */
  mutedColor?: string;
  /**
   * Start reading as soon as the phone confirms it has a voice. Used so an
   * answer is spoken without a tap; the button then shows Stop, exactly as if
   * it had been tapped, so there is one owner of what is being said.
   */
  autoPlay?: boolean;
}

type Voice = 'checking' | 'ready' | 'none';

export function ReadAloudButton({
  text,
  label = 'Read it to me',
  color,
  background,
  mutedColor,
  autoPlay = false,
}: ReadAloudButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const [voice, setVoice] = useState<Voice>('checking');

  useEffect(() => {
    let alive = true;
    hasVoiceAsync().then((ok) => {
      if (!alive) return;
      setVoice(ok ? 'ready' : 'none');
      if (ok && autoPlay) {
        setSpeaking(true);
        void readAloud(text, {
          onDone: () => alive && setSpeaking(false),
          onError: () => {
            if (!alive) return;
            setSpeaking(false);
            setVoice('none');
          },
        });
      }
    });
    // Leaving a screen should not leave a voice talking in an empty room.
    return () => {
      alive = false;
      stopReading();
    };
    // Once per mount on purpose: the caller keys this button by the text it
    // reads, so a new answer is a new mount, not a changed prop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    if (speaking) {
      stopReading();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    void readAloud(text, {
      onDone: () => setSpeaking(false),
      onError: () => {
        setSpeaking(false);
        setVoice('none');
      },
    });
  };

  if (voice === 'none') {
    return (
      <View style={[styles.button, styles.column, { backgroundColor: background }]}>
        <Text style={[styles.text, { color }]}>No voice on this phone</Text>
        <Text style={[styles.note, { color: mutedColor ?? color }]}>
          Install Google Text-to-Speech, or turn it on in Settings under Accessibility.
        </Text>
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={speaking ? 'Stop reading' : label}
      onPress={toggle}
      style={({ pressed }) => [styles.button, { backgroundColor: background, opacity: pressed ? 0.7 : 1 }]}>
      <Icon name={speaking ? 'stop' : 'speak'} size={16} color={color} />
      <Text style={[styles.text, { color }]}>{speaking ? 'Stop' : label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 11,
    paddingVertical: 11,
  },
  column: { flexDirection: 'column', gap: 3, paddingHorizontal: 12 },
  text: { fontSize: 14, fontFamily: Fonts.bodyBold },
  note: { fontSize: 11.5, lineHeight: 16, textAlign: 'center', fontFamily: Fonts.body },
});
