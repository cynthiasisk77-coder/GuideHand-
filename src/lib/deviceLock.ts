// The lock in front of the Document Photos screen.
//
// This uses the phone's own fingerprint, face unlock, or passcode rather than
// asking people to invent and remember a GuideHand PIN. That is both easier —
// it is the unlock they already do fifty times a day — and safer, because the
// check happens in the operating system and GuideHand never sees the secret.
//
// Deliberately not applied to the medicine list or the meetup point. Those are
// things someone may need while frightened, in the dark, with cold hands, and a
// lock screen between a person and their own medicine list is a real cost. They
// are still encrypted on disk; they are just not gated.

import * as LocalAuthentication from 'expo-local-authentication';

/** Why an unlock did not happen. The screen only ever stores this half. */
export type UnlockFailure =
  /** No fingerprint, face, or passcode is set, so there is nothing to check against. */
  | { ok: false; reason: 'unavailable' }
  | { ok: false; reason: 'failed' }
  | { ok: false; reason: 'cancelled' };

export type UnlockResult = { ok: true } | UnlockFailure;

/** True when this phone can actually ask for a fingerprint, face, or passcode. */
export async function canLock(): Promise<boolean> {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (hasHardware && enrolled) return true;
    // Some phones have no biometrics but do have a passcode, which is still a
    // real check worth making.
    const level = await LocalAuthentication.getEnrolledLevelAsync();
    return level !== LocalAuthentication.SecurityLevel.NONE;
  } catch {
    return false;
  }
}

/** Asks the phone to confirm it's really them. */
export async function requestUnlock(prompt: string): Promise<UnlockResult> {
  if (!(await canLock())) return { ok: false, reason: 'unavailable' };

  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: prompt,
      // Falling back to the device passcode matters here: a wet or cold finger
      // shouldn't be what stands between someone and their own passport.
      disableDeviceFallback: false,
      cancelLabel: 'Cancel',
    });
    if (result.success) return { ok: true };
    const error = 'error' in result ? result.error : '';
    if (error === 'user_cancel' || error === 'system_cancel' || error === 'app_cancel') {
      return { ok: false, reason: 'cancelled' };
    }
    return { ok: false, reason: 'failed' };
  } catch {
    return { ok: false, reason: 'failed' };
  }
}
