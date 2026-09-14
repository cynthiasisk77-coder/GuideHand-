// Groups the 21 browsable categories (everything except Emergency Now) into a
// small set of top-level buckets, so the home screen shows ~9 choices instead
// of 21+. Exact category names must match categories.ts.
export interface CategoryGroup {
  name: string;
  sub: string;
  categories: string[];
  icon: string;
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    name: "Medical & Family",
    sub: "Medical & First Aid, Family needs",
    categories: ["Medical & First Aid", "Family & Special Needs"],
    icon: "medical",
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
    name: "Getting Around",
    sub: "Cars, getting out, finding your way",
    categories: ["Vehicles & Mechanics", "Evacuation", "Navigation"],
    icon: "car",
  },
  {
    name: "Animals & Nature",
    sub: "Pets, farm animals, plants",
    categories: ["Animals & Pets", "Plants — Basic Emergency Reference"],
    icon: "paw",
  },
  {
    name: "Tools & Communication",
    sub: "Fixing things, radios, staying in touch",
    categories: ["Tools & Repairs", "Communication"],
    icon: "tools",
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
