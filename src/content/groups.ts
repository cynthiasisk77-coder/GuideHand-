// Groups the 22 browsable categories (everything except What To Do In An Emergency) into a
// small set of top-level buckets, so the home screen shows a manageable list
// instead of 22+ flat categories. Exact category names must match categories.ts.
/**
 * Which band of urgency a group belongs to, so a person knows what kind of
 * thing they are looking at before they read the words.
 *
 *   critical  immediate danger to life        crimson
 *   severe    weather and evacuation          safety orange
 *   recovery  aftermath and long-term living  teal
 *
 * Nothing is crimson unless someone could die in the next few minutes. The
 * whole point of a red is that it stops meaning anything once it is everywhere.
 */
export type UrgencyBand = "critical" | "severe" | "recovery";

export interface CategoryGroup {
  name: string;
  sub: string;
  categories: string[];
  icon: string;
  band: UrgencyBand;
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    name: "Maps & Navigation",
    sub: "Paper maps, compass, finding your way",
    categories: ["Navigation"],
    icon: "compass",
    band: "recovery",
  },
  {
    name: "Home, Power & Shelter",
    sub: "Heat, power, water lines, keeping clean",
    categories: ["Shelter & Heat", "Home Systems", "Power & Lighting", "Sanitation & Hygiene"],
    icon: "home",
    band: "recovery",
  },
  {
    name: "Food & Water",
    sub: "Food safety, drinking water, fishing",
    categories: ["Food", "Water", "Fishing / Trapping / Food Acquisition"],
    icon: "water",
    band: "recovery",
  },
  {
    name: "Weather & Disasters",
    sub: "Storms, floods, fire, earthquakes",
    categories: ["Disasters", "Security & Safety"],
    icon: "storm",
    band: "severe",
  },
  {
    name: "Travel & Evacuation",
    sub: "Cars and getting out",
    categories: ["Vehicles & Mechanics", "Evacuation"],
    icon: "car",
    band: "severe",
  },
  {
    name: "Animals & Pets",
    sub: "Pets and farm animals",
    categories: ["Animals & Pets"],
    icon: "paw",
    band: "recovery",
  },
  {
    name: "Plants",
    sub: "Poisonous look-alikes, safe wild plants",
    categories: ["Plants — Basic Emergency Reference"],
    icon: "leaf",
    band: "recovery",
  },
  {
    name: "Tools & Repairs",
    sub: "Fixing things, basic repairs",
    categories: ["Tools & Repairs"],
    icon: "tools",
    band: "recovery",
  },
  {
    name: "Communication",
    sub: "Radios, staying in touch",
    categories: ["Communication"],
    icon: "radio",
    band: "recovery",
  },
  {
    name: "Plan Ahead",
    sub: "Supplies, plans, extra reading",
    categories: ["Inventory & Supplies", "Preparedness Plans", "Reference Library"],
    icon: "plan",
    band: "recovery",
  },
  {
    name: "Off-Grid & Primitive Skills",
    sub: "Homesteading, primitive crafts, long-term self-sufficiency",
    categories: ["Off-Grid Food Production", "Off-Grid Water Systems", "Primitive Fire, Fuel & Shelter", "Primitive Crafts & Construction"],
    icon: "tools",
    band: "recovery",
  },
];

export function findGroupBySlug(slug: string): CategoryGroup | undefined {
  return CATEGORY_GROUPS.find((g) => slugifyGroup(g.name) === slug);
}

export function slugifyGroup(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
