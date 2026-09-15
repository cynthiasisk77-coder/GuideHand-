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
    name: "First Aid",
    sub: "Medical care and first aid steps",
    categories: ["Medical & First Aid"],
    icon: "medical",
  },
  {
    name: "Family",
    sub: "Special needs, caregiving, family plans",
    categories: ["Family & Special Needs"],
    icon: "family",
  },
  {
    name: "Weather & Disasters",
    sub: "Storms, floods, fire, earthquakes",
    categories: ["Disasters", "Security & Safety"],
    icon: "storm",
  },
  {
    name: "Food & Water",
    sub: "Food safety, drinking water, fishing",
    categories: ["Food", "Water", "Fishing / Trapping / Food Acquisition"],
    icon: "water",
  },
  {
    name: "Home, Power & Shelter",
    sub: "Heat, power, water lines, keeping clean",
    categories: ["Shelter & Heat", "Home Systems", "Power & Lighting", "Sanitation & Hygiene"],
    icon: "home",
  },
  {
    name: "Travel & Evacuation",
    sub: "Cars and getting out",
    categories: ["Vehicles & Mechanics", "Evacuation"],
    icon: "car",
  },
  {
    name: "Maps & Navigation",
    sub: "Paper maps, compass, finding your way",
    categories: ["Navigation"],
    icon: "compass",
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
