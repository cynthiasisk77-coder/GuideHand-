// Who is allowed to read the About You profile, and when.
//
// "Those fields should not just sit there wide open for anyone to read about
// you if they are on your phone." The screen is now behind the phone's own
// unlock, the same way Document Photos is. But locking the screen alone leaves
// a side door: Max reads the same profile, and anyone holding the phone could
// ask him what medicines she takes. So the same unlock covers Max too — unless
// she chooses otherwise, because there is a real reason someone might: if she
// is the one hurt, whoever picks up her phone needs Max to know she takes a
// blood thinner. That call is hers. It is one switch on the About You screen.

import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTING_KEY = 'guidehand.profile-access.v1';

/** 'unlock' — Max needs the phone unlocked first. 'always' — Max may use it freely. */
export type ProfileAccess = 'unlock' | 'always';

export async function loadProfileAccess(): Promise<ProfileAccess> {
  try {
    const v = await AsyncStorage.getItem(SETTING_KEY);
    return v === 'always' ? 'always' : 'unlock';
  } catch {
    return 'unlock';
  }
}

export async function saveProfileAccess(access: ProfileAccess): Promise<void> {
  await AsyncStorage.setItem(SETTING_KEY, access).catch(() => {});
}

// Unlocked-for-this-run. Lives only as long as the app process: closing the
// app locks it again, which is the whole point.
let unlockedThisSession = false;

export function isProfileUnlocked(): boolean {
  return unlockedThisSession;
}

export function markProfileUnlocked(): void {
  unlockedThisSession = true;
}
