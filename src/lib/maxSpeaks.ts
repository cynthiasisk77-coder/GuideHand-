// Whether Max says things out loud without being asked. One setting, shared
// by every screen where she talks, so turning her off in Ask turns her off in
// Night Watch too. On by default: she asked for something that talks to her,
// and a button you have to find is not that.

import AsyncStorage from '@react-native-async-storage/async-storage';

export const SPEAKS_KEY = 'guidehand.max-speaks.v1';

export async function loadSpeaks(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(SPEAKS_KEY)) !== 'no';
  } catch {
    return true;
  }
}

export function saveSpeaks(on: boolean): void {
  AsyncStorage.setItem(SPEAKS_KEY, on ? 'yes' : 'no').catch(() => {});
}
