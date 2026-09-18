// Which copy of GuideHand is actually running.
//
// "Nothing updated" is impossible to answer without this. A new APK can be
// installed correctly and still look identical, and there was no way — for her
// or for me — to tell a fresh install from one that silently didn't take. Now
// there is: the date below changes with every build.
//
// createdAt is the moment the running JavaScript was built, which is the thing
// that actually changes. Version numbers stay at 1.0.0 for months.

import { StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

import { KeyboardReadout } from '@/components/keyboard-readout';
import { Fonts } from '@/constants/calm';

function builtOn(): string | undefined {
  const at = Updates.createdAt;
  if (!at) return undefined;
  const day = at.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  const time = at.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  return `${day}, ${time}`;
}

export function BuildStamp({ color }: { color: string }) {
  const version = Constants.expoConfig?.version ?? '1.0.0';
  const built = builtOn();
  return (
    <>
      <Text style={[styles.stamp, { color }]} selectable>
        GuideHand {version}
        {built ? `\nThis copy was built ${built}` : '\nRunning from the development server'}
        {built && !Updates.isEmbeddedLaunch ? '\n(from a downloaded update, not the installed app)' : ''}
      </Text>
      <KeyboardReadout color={color} />
    </>
  );
}

const styles = StyleSheet.create({
  stamp: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    fontFamily: Fonts.mono,
  },
});
