// Groups the 22 browsable categories (everything except What To Do In An Emergency) into a
// small set of top-level buckets, so the home screen shows a manageable list
// instead of 22+ flat categories. Exact category names must match categories.ts.
export interface CategoryGroup {
  name: string;
  sub: string;
  categories: string[];
  icon: string;
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    name: "Maps & Navigation",
    sub: "Paper maps, compass, finding your way",
    categories: ["Navigation"],
    icon: "compass",
  },
  {
    name: "Home, Power & Shelter",
    sub: "Heat, power, water lines, keeping clean",
    categories: ["Shelter & Heat", "Home Systems", "Power & Lighting", "Sanitation & Hygiene"],
    icon: "home",
  },
  {
    name: "Food & Water",
    sub: "Food safety, drinking water, fishing",
    categories: ["Food", "Water", "Fishing / Trapping / Food Acquisition"],
    icon: "water",
  },
  {
    name: "Weather & Disasters",
    sub: "Storms, floods, fire, earthquakes",
    categories: ["Disasters", "Security & Safety"],
    icon: "storm",
  },
  {
    name: "Travel & Evacuation",
    sub: "Cars and getting out",
    categories: ["Vehicles & Mechanics", "Evacuation"],
    icon: "car",
  },
  {
    name: "Animals & Pets",
    sub: "Pets and farm animals",
    categories: ["Animals & Pets"],
    icon: "paw",
  },
  {
    name: "Plants",
    sub: "Poisonous look-alikes, safe wild plants",
    categories: ["Plants — Basic Emergency Reference"],
    icon: "leaf",
  },
  {
    name: "Tools & Repairs",
    sub: "Fixing things, basic repairs",
    categories: ["Tools & Repairs"],
    icon: "tools",
  },
  {
    name: "Communication",
    sub: "Radios, staying in touch",
    categories: ["Communication"],
    icon: "radio",
  },
  {
    name: "Plan Ahead",
    sub: "Supplies, plans, extra reading",
    categories: ["Inventory & Supplies", "Preparedness Plans", "Reference Library"],
    icon: "plan",
  },
  {
    name: "Off-Grid & Primitive Skills",
    sub: "Homesteading, primitive crafts, long-term self-sufficiency",
    categories: ["Off-Grid Food Production", "Off-Grid Water Systems", "Primitive Fire, Fuel & Shelter", "Primitive Crafts & Construction"],
    icon: "tools",
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
