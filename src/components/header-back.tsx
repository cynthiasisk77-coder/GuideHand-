// The back button, drawn by this app rather than left to the navigator.
//
// React Navigation hides its own back arrow whenever it decides there is
// nothing to go back to — a screen opened from a link, a cold start restored
// into a deep screen, a stack it has reset. That decision is invisible from
// the outside and the result is a screen with no way out, which is what got
// reported: "the back button is missing on all screens."
//
// So this one is always rendered. When there is history it goes back; when
// there is not it goes home, which is somewhere rather than nowhere. It also
// carries the word "Back" next to the arrow, and a hit area bigger than the
// glyph, because a 20-pixel chevron in a corner is a poor target for somebody
// holding a phone one-handed in the dark.

import { Pressable, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { Icon } from '@/components/icon';
import { Fonts } from '@/constants/calm';

interface HeaderBackProps {
  color: string;
}

export function HeaderBack({ color }: HeaderBackProps) {
  const router = useRouter();

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Go back"
      onPress={goBack}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 16 }}
      style={({ pressed }) => [styles.button, { opacity: pressed ? 0.55 : 1 }]}>
      <Icon name="arrowLeft" size={21} color={color} strokeWidth={2.1} />
      <Text style={[styles.label, { color }]}>Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingRight: 10,
  },
  label: { fontSize: 15.5, fontFamily: Fonts.bodySemibold },
});
