// One button that reads something out and stops when tapped again.

import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Icon } from '@/components/icon';
import { Fonts } from '@/constants/calm';
import { readAloud, stopReading } from '@/lib/readAloud';

interface ReadAloudButtonProps {
  text: string;
  /** What to call it. Defaults to the plain thing. */
  label?: string;
  color: string;
  background: string;
}

export function ReadAloudButton({ text, label = 'Read it to me', color, background }: ReadAloudButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  // Leaving a screen should not leave a voice talking in an empty room.
  useEffect(() => {
    return () => stopReading();
  }, []);

  const toggle = () => {
    if (speaking) {
      stopReading();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    readAloud(text, { onDone: () => setSpeaking(false), onError: () => setSpeaking(false) });
  };

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
  text: { fontSize: 14, fontFamily: Fonts.bodyBold },
});
