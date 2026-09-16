// What you actually have, and how long it actually lasts.
//
// The Supply Cache answers "do I own one of these." This answers the question
// that matters on day four: how many days of water is that, what runs out
// first, and what is already past its date. It is arithmetic, not advice —
// every number here comes from quantities the person entered themselves.
//
// Nothing in here is encrypted. It is tinned food and batteries, and the same
// reasoning applies as to the supply cache: encrypting it would spend battery
// protecting nothing. Prescriptions do not belong here at all — they live in
// the Medicine Tracker, which is encrypted, so there is exactly one place a
// person records medication rather than two that can disagree.

export const INVENTORY_KEY = "guidehand.inventory.v1";
export const HOUSEHOLD_KEY = "guidehand.inventory.household.v1";

// ---------------------------------------------------------------------------
// Shapes
// ---------------------------------------------------------------------------

export interface InventoryItem {
  id: string;
  categoryId: string;
  name: string;
  quantity: number;
  unitId: string;
  /** Calories in one unit. Food only, and always editable — labels vary. */
  caloriesPerUnit?: number;
  /** Rated capacity of one unit in mAh. Power banks only. */
  mahPerUnit?: number;
  /**
   * When it goes past its date, as `YYYY-MM` or `YYYY-MM-DD`. Deliberately
   * variable precision: most cans are stamped with a month and a year, and
   * inventing a day would be making up a number the label does not give.
   * Absent means it does not meaningfully expire.
   */
  expires?: string;
  /** Where it is. "Garage shelf", "under the stairs". */
  where?: string;
}

export interface Household {
  people: number;
  /** Calories per person per day used for the food estimate. */
  caloriesPerPerson: number;
}

export const DEFAULT_HOUSEHOLD: Household = { people: 2, caloriesPerPerson: 2000 };

/** Ready.gov's planning figure: drinking and basic sanitation together. */
export const GALLONS_PER_PERSON_PER_DAY = 1;

export interface InventoryUnit {
  id: string;
  /** Shown after a quantity: "3 gallons". */
  label: string;
  /** Shown when there is exactly one. */
  singular: string;
  /** US gallons in one of these. Water only. */
  gallons?: number;
}

export const UNITS: Record<string, InventoryUnit> = {
  gallon: { id: "gallon", label: "gallons", singular: "gallon", gallons: 1 },
  liter: { id: "liter", label: "liters", singular: "liter", gallons: 0.264172 },
  jug5: { id: "jug5", label: "5-gal jugs", singular: "5-gal jug", gallons: 5 },
  case24: { id: "case24", label: "cases", singular: "case", gallons: 3.17 },
  drum55: { id: "drum55", label: "55-gal drums", singular: "55-gal drum", gallons: 55 },

  can: { id: "can", label: "cans", singular: "can" },
  jar: { id: "jar", label: "jars", singular: "jar" },
  box: { id: "box", label: "boxes", singular: "box" },
  bag: { id: "bag", label: "bags", singular: "bag" },
  pound: { id: "pound", label: "lbs", singular: "lb" },
  pouch: { id: "pouch", label: "pouches", singular: "pouch" },
  quart: { id: "quart", label: "quarts", singular: "quart" },

  battery: { id: "battery", label: "batteries", singular: "battery" },
  bank: { id: "bank", label: "power banks", singular: "power bank" },
  panel: { id: "panel", label: "panels", singular: "panel" },
  tank: { id: "tank", label: "tanks", singular: "tank" },

  roll: { id: "roll", label: "rolls", singular: "roll" },
  bar: { id: "bar", label: "bars", singular: "bar" },
  bottle: { id: "bottle", label: "bottles", singular: "bottle" },
  pack: { id: "pack", label: "packs", singular: "pack" },
  foot: { id: "foot", label: "feet", singular: "foot" },
  item: { id: "item", label: "items", singular: "item" },
};

export function unitLabel(unitId: string, quantity: number): string {
  const unit = UNITS[unitId];
  if (!unit) return "";
  return quantity === 1 ? unit.singular : unit.label;
}

// ---------------------------------------------------------------------------
// Dates
//
// Every call to the clock is made inside these module-scope helpers rather
// than in a component, which keeps render functions pure.
// ---------------------------------------------------------------------------

function startOfToday(): number {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

/**
 * Resolves a stored `expires` string to a moment. A month with no day is read
 * as the END of that month, because "best by March 2027" means it is good
 * through March, not that it turns at midnight on the first.
 */
export function expiryTime(iso: string): number | undefined {
  const full = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (full) return new Date(Number(full[1]), Number(full[2]) - 1, Number(full[3])).getTime();
  const month = /^(\d{4})-(\d{2})$/.exec(iso);
  if (month) return new Date(Number(month[1]), Number(month[2]), 0).getTime();
  return undefined;
}

export function daysUntilExpiry(iso: string): number | undefined {
  const at = expiryTime(iso);
  if (at === undefined) return undefined;
  return Math.round((at - startOfToday()) / 86_400_000);
}

export type ExpiryBucket = "expired" | "soon" | "watch" | "fine";

export const SOON_DAYS = 30;
export const WATCH_DAYS = 90;

export function expiryBucket(iso: string | undefined): ExpiryBucket {
  if (!iso) return "fine";
  const days = daysUntilExpiry(iso);
  if (days === undefined) return "fine";
  if (days < 0) return "expired";
  if (days <= SOON_DAYS) return "soon";
  if (days <= WATCH_DAYS) return "watch";
  return "fine";
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const SHORT_MONTHS = MONTH_NAMES.map((m) => m.slice(0, 3));

/**
 * Reads a date the way a person would write one off a can. Accepts
 * `3/27`, `03/2027`, `March 2027`, `Mar 27`, `2027-03`, `2027-03-15`,
 * `3/15/2027`. Returns the stored form, or undefined when it makes no sense.
 */
export function parseExpiry(raw: string): string | undefined {
  const text = raw.trim().toLowerCase();
  if (!text) return undefined;

  const pad = (n: number) => String(n).padStart(2, "0");
  // Two digits is a year in this century. A can stamped "27" is not 1927.
  const fullYear = (n: number) => (n < 100 ? 2000 + n : n);
  const valid = (m: number) => m >= 1 && m <= 12;

  const isoFull = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(text);
  if (isoFull && valid(Number(isoFull[2]))) {
    return `${isoFull[1]}-${pad(Number(isoFull[2]))}-${pad(Number(isoFull[3]))}`;
  }

  const isoMonth = /^(\d{4})[-/](\d{1,2})$/.exec(text);
  if (isoMonth && valid(Number(isoMonth[2]))) {
    return `${isoMonth[1]}-${pad(Number(isoMonth[2]))}`;
  }

  const slashed = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})$/.exec(text);
  if (slashed && valid(Number(slashed[1]))) {
    return `${fullYear(Number(slashed[3]))}-${pad(Number(slashed[1]))}-${pad(Number(slashed[2]))}`;
  }

  const monthYear = /^(\d{1,2})[/.-](\d{2,4})$/.exec(text);
  if (monthYear && valid(Number(monthYear[1]))) {
    return `${fullYear(Number(monthYear[2]))}-${pad(Number(monthYear[1]))}`;
  }

  const named = /^([a-z]{3,9})\.?\s+(\d{2,4})$/.exec(text);
  if (named) {
    const index = MONTH_NAMES.findIndex((m) => m.toLowerCase().startsWith(named[1]));
    if (index >= 0) return `${fullYear(Number(named[2]))}-${pad(index + 1)}`;
  }

  const bareYear = /^(\d{4})$/.exec(text);
  if (bareYear) return `${bareYear[1]}-12`;

  return undefined;
}

export function formatExpiry(iso: string | undefined): string {
  if (!iso) return "";
  const full = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (full) return `${Number(full[3])} ${SHORT_MONTHS[Number(full[2]) - 1]} ${full[1]}`;
  const month = /^(\d{4})-(\d{2})$/.exec(iso);
  if (month) return `${SHORT_MONTHS[Number(month[2]) - 1]} ${month[1]}`;
  return iso;
}

// ---------------------------------------------------------------------------
// The arithmetic
// ---------------------------------------------------------------------------

export function gallonsOf(item: InventoryItem): number {
  const unit = UNITS[item.unitId];
  if (!unit?.gallons) return 0;
  return unit.gallons * Math.max(0, item.quantity);
}

export function caloriesOf(item: InventoryItem): number {
  if (!item.caloriesPerUnit) return 0;
  return item.caloriesPerUnit * Math.max(0, item.quantity);
}

export interface DaysSummary {
  /** Days covered, counting everything entered. */
  days: number;
  /** Of those, how many rest on items already past their date. */
  pastDateDays: number;
  /** True when nothing has been entered, so there is no number to show. */
  empty: boolean;
}

function summarise(total: number, expired: number, perDay: number): DaysSummary {
  if (total <= 0 || perDay <= 0) return { days: 0, pastDateDays: 0, empty: true };
  return { days: total / perDay, pastDateDays: expired / perDay, empty: false };
}

export function waterSummary(items: InventoryItem[], household: Household): DaysSummary {
  let gallons = 0;
  let expired = 0;
  for (const item of items) {
    const amount = gallonsOf(item);
    if (amount <= 0) continue;
    gallons += amount;
    if (expiryBucket(item.expires) === "expired") expired += amount;
  }
  return summarise(gallons, expired, Math.max(1, household.people) * GALLONS_PER_PERSON_PER_DAY);
}

export function foodSummary(items: InventoryItem[], household: Household): DaysSummary {
  let calories = 0;
  let expired = 0;
  for (const item of items) {
    const amount = caloriesOf(item);
    if (amount <= 0) continue;
    calories += amount;
    if (expiryBucket(item.expires) === "expired") expired += amount;
  }
  const perDay = Math.max(1, household.people) * Math.max(1, household.caloriesPerPerson);
  return summarise(calories, expired, perDay);
}

/**
 * Real capacity is always below the rating: the cells sit at 3.7V and USB
 * delivers 5V, and that conversion costs something. 60-70% of the printed
 * number is what people actually get, so this uses the middle of that.
 */
export const POWER_BANK_EFFICIENCY = 0.65;
/** A middling modern phone battery. Real ones run 3,300-4,600 mAh. */
export const TYPICAL_PHONE_MAH = 3500;

export function phoneCharges(items: InventoryItem[]): number {
  let mah = 0;
  for (const item of items) {
    if (!item.mahPerUnit) continue;
    mah += item.mahPerUnit * Math.max(0, item.quantity);
  }
  return (mah * POWER_BANK_EFFICIENCY) / TYPICAL_PHONE_MAH;
}

/** Everything with a date that is past, close, or worth watching — soonest first. */
export function expiringSoon(items: InventoryItem[], limit = 8): InventoryItem[] {
  return items
    .filter((item) => item.quantity > 0 && expiryBucket(item.expires) !== "fine")
    .sort((a, b) => (expiryTime(a.expires ?? "") ?? 0) - (expiryTime(b.expires ?? "") ?? 0))
    .slice(0, limit);
}

/** Rows that exist but hold nothing — the gaps in the cache. */
export function missingItems(items: InventoryItem[]): InventoryItem[] {
  return items.filter((item) => item.quantity <= 0);
}

export function formatDays(days: number): string {
  if (days < 1) return "under a day";
  if (days < 10) return `${Math.round(days * 10) / 10} days`;
  return `${Math.round(days)} days`;
}
