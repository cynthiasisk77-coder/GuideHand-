// The personal things people keep in GuideHand, in one place.
//
// Two jobs: it says which storage keys hold personal data so they can all be
// encrypted and backed up together, and it keeps that list from drifting out of
// sync with the screens as the app grows.

export const DOCUMENT_PHOTOS_KEY = 'guidehand.document-photos.v1';
export const MEDICINE_KEY = 'guidehand.medicine-tracker.v1';
export const MEETUP_POINTS_KEY = 'guidehand.family-meetup.v1';
export const MEETUP_ACTIVE_KEY = 'guidehand.family-meetup.active.v1';
export const SUPPLY_CACHE_KEY = 'guidehand.supply-cache.v1';

/**
 * Keys holding something a person would not want read off a stolen phone.
 *
 * The supply cache is deliberately absent: it is a shopping list of tinned food
 * and batteries, and encrypting it would cost battery to protect nothing.
 */
export const ENCRYPTED_KEYS: string[] = [
  DOCUMENT_PHOTOS_KEY,
  MEDICINE_KEY,
  MEETUP_POINTS_KEY,
  MEETUP_ACTIVE_KEY,
];

export interface BackupSection {
  key: string;
  /** What this is called in the backup file and on screen. */
  label: string;
  /** True when it contains something identifying enough to warrant a password. */
  sensitive: boolean;
}

/** Everything a backup covers, in the order it is presented to the person. */
export const BACKUP_SECTIONS: BackupSection[] = [
  { key: DOCUMENT_PHOTOS_KEY, label: 'Document photos', sensitive: true },
  { key: MEDICINE_KEY, label: 'Medicines', sensitive: false },
  { key: MEETUP_POINTS_KEY, label: 'Meeting places', sensitive: false },
  { key: MEETUP_ACTIVE_KEY, label: 'Active meeting place', sensitive: false },
  { key: SUPPLY_CACHE_KEY, label: 'Supply cache', sensitive: false },
];
