// What you know about your own house, written down before you need it.
//
// Two different jobs, and the first one is urgent. When water is coming through
// the ceiling at two in the morning, the useful thing is knowing which valve
// and where — not a model number. So shutoffs come first and stay first.
//
// The second job is slower and just as real: the water heater dies and the part
// number is on a plate behind it, the insurance adjuster wants the serial, the
// furnace filter is a size nobody remembers at the hardware store. All of that
// is knowable today and unknowable at the worst moment, and none of it needs a
// signal to look up once it is on the phone.

export const HOME_RECORD_KEY = 'guidehand.home-record.v1';

export type HomeSection = 'shutoffs' | 'systems' | 'appliances' | 'house';

export interface HomePhoto {
  id: string;
  /** What it is — "model plate", "page 12, filter size", "valve location". */
  label: string;
  dataUri: string;
}

export interface HomeItem {
  id: string;
  section: HomeSection;
  /** "Water heater", "Main water valve", "Furnace". */
  name: string;
  brand?: string;
  model?: string;
  serial?: string;
  /** Where it physically is. The whole point of the shutoffs section. */
  where?: string;
  /** How you operate it — which way to turn, what tool it takes. */
  howTo?: string;
  /** Installed or bought. Free text; people remember "spring 2019". */
  installed?: string;
  /** Filter size, paint colour, bulb type, breaker number, well depth. */
  notes?: string;
  photos: HomePhoto[];
}

export interface SectionSpec {
  id: HomeSection;
  name: string;
  note: string;
  icon: string;
  /** Shutoffs are the emergency half of this screen and are marked as such. */
  urgent?: boolean;
}

export const HOME_SECTIONS: SectionSpec[] = [
  {
    id: 'shutoffs',
    name: 'Shutoffs',
    note: 'Water, gas, power. Where the valve is, which way it turns, and what tool it takes.',
    icon: 'tools',
    urgent: true,
  },
  {
    id: 'systems',
    name: 'Systems',
    note: 'Furnace, water heater, well pump, septic, air conditioning, generator.',
    icon: 'home',
  },
  {
    id: 'appliances',
    name: 'Appliances',
    note: 'Fridge, washer, stove — model and serial numbers, and photos of the manual.',
    icon: 'plan',
  },
  {
    id: 'house',
    name: 'The house itself',
    note: 'Paint colours, filter sizes, roof age, well depth, policy numbers.',
    icon: 'checklist',
  },
];

/**
 * Starter rows for the shutoffs, because this is the one section where a blank
 * page is a real cost. Everything else is better left empty than guessed at.
 */
export const SHUTOFF_STARTERS: { name: string; howTo: string }[] = [
  {
    name: 'Main water shutoff',
    howTo: 'Usually where the supply enters the house, or at the street in a covered box. Turn clockwise to close. A lever valve closes when the handle sits across the pipe rather than along it.',
  },
  {
    name: 'Water heater shutoff',
    howTo: 'Its own valve on the cold inlet at the top. Closing this stops the heater without cutting water to the rest of the house.',
  },
  {
    name: 'Gas shutoff',
    howTo: 'At the meter. Needs a wrench — keep one beside it. A quarter turn so the lug sits across the pipe closes it. Only shut it off if you smell gas or are told to; getting it back on safely is a job for the utility.',
  },
  {
    name: 'Breaker panel',
    howTo: 'Where it is, and which breaker is which. Label the panel now, in daylight.',
  },
];

export function newItemId(): string {
  return `home-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function newPhotoId(): string {
  return `hp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function emptyItem(section: HomeSection): HomeItem {
  return { id: newItemId(), section, name: '', photos: [] };
}

export function seedShutoffs(): HomeItem[] {
  return SHUTOFF_STARTERS.map((s) => ({
    id: newItemId(),
    section: 'shutoffs' as const,
    name: s.name,
    howTo: s.howTo,
    photos: [],
  }));
}

/** True when a row still holds nothing a person actually entered. */
export function isBlank(item: HomeItem): boolean {
  return (
    !item.brand && !item.model && !item.serial && !item.where &&
    !item.installed && !item.notes && item.photos.length === 0
  );
}

/** The shutoffs whose location is still unrecorded — the gap that matters. */
export function missingShutoffs(items: HomeItem[]): string[] {
  return items
    .filter((item) => item.section === 'shutoffs' && !item.where)
    .map((item) => item.name)
    .filter(Boolean);
}

export function countPhotos(items: HomeItem[]): number {
  return items.reduce((total, item) => total + item.photos.length, 0);
}
