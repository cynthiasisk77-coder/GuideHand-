// The personal things people keep in GuideHand, in one place.
//
// Two jobs: it says which storage keys hold personal data so they can all be
// encrypted and backed up together, and it keeps that list from drifting out of
// sync with the screens as the app grows.

import { FAMILY_PLAN_KEY } from '@/lib/familyPlan';
import { HOME_RECORD_KEY } from '@/lib/homeRecord';
import { HOUSEHOLD_KEY, INVENTORY_KEY } from '@/lib/inventory';

export { FAMILY_PLAN_KEY, HOME_RECORD_KEY, HOUSEHOLD_KEY, INVENTORY_KEY };

export const DOCUMENT_PHOTOS_KEY = 'guidehand.document-photos.v1';
export const MEDICINE_KEY = 'guidehand.medicine-tracker.v1';
export const MEETUP_POINTS_KEY = 'guidehand.family-meetup.v1';
export const MEETUP_ACTIVE_KEY = 'guidehand.family-meetup.active.v1';
export const SUPPLY_CACHE_KEY = 'guidehand.supply-cache.v1';
export const ABOUT_YOU_KEY = 'guidehand.about-you.v1';
export const MY_NOTES_KEY = 'guidehand.my-notes.v1';

/**
 * Keys holding something a person would not want read off a stolen phone.
 *
 * The supply cache and the inventory are deliberately absent: they are tinned
 * food and batteries, and encrypting them would cost battery to protect
 * nothing. Prescriptions never go in either — they live in the medicine
 * tracker, which is on this list.
 */
export const ENCRYPTED_KEYS: string[] = [
  // The plan carries names, numbers, where the kids are on a weekday, and
  // whatever medical detail people chose to include. That is the single most
  // sensitive thing in the app after the documents.
  FAMILY_PLAN_KEY,
  // Serial numbers, policy details and photographs of the inside of a house.
  HOME_RECORD_KEY,
  DOCUMENT_PHOTOS_KEY,
  MEDICINE_KEY,
  MEETUP_POINTS_KEY,
  MEETUP_ACTIVE_KEY,
  MY_NOTES_KEY,
  // A person's allergies and conditions. The most sensitive thing here.
  ABOUT_YOU_KEY,
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
  { key: SUPPLY_CACHE_KEY, label: 'Home supplies', sensitive: false },
  { key: INVENTORY_KEY, label: 'Supply inventory', sensitive: false },
  { key: HOUSEHOLD_KEY, label: 'Household size', sensitive: false },
  { key: FAMILY_PLAN_KEY, label: 'Family plan', sensitive: true },
  { key: HOME_RECORD_KEY, label: 'Home record', sensitive: true },
  { key: MY_NOTES_KEY, label: 'Your own notes', sensitive: true },
  { key: ABOUT_YOU_KEY, label: 'About you', sensitive: true },
];
