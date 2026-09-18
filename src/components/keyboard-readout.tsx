// Shows the keyboard height the app is actually seeing, but only while a
// keyboard is open. It sits on the line under the build date, so tapping the
// search box on the home screen and taking one screenshot answers the question
// that cost two builds to guess at: does this app know the keyboard is there.
//
// Temporary. It comes out once the typing screens are confirmed working.

import { StyleSheet, Text } from 'react-native';
import { useKeyboardState } from 'react-native-keyboard-controller';

import { Fonts } from '@/constants/calm';

export function KeyboardReadout({ color }: { color: string }) {
  const height = useKeyboardState((state) => state.height);
  if (!height) return null;
  return <Text style={[styles.line, { color }]}>keyboard {Math.round(height)}</Text>;
}

const styles = StyleSheet.create({
  line: { fontSize: 11, lineHeight: 16, textAlign: 'center', fontFamily: Fonts.mono },
});
