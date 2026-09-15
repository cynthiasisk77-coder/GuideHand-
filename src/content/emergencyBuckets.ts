// Fans "What To Do In An Emergency" out into a handful of crisis types so a
// panicked person can find their situation without knowing which of 20+
// categories it's filed under. Pulls every genuinely life-threatening (P0)
// topic from across the app via getP0TopicsForCategories — not a hand-picked
// shortlist. Exact category names must match categories.ts.
export interface EmergencyBucket {
  name: string;
  sub: string;
  categories: string[];
  icon: string;
}

export const EMERGENCY_BUCKETS: EmergencyBucket[] = [
  {
    name: "Someone's Hurt or Sick",
    sub: "Bleeding, not breathing, burns, poisoning, and more",
    categories: ["Medical & First Aid", "Family & Special Needs", "Sanitation & Hygiene"],
    icon: "medical",
  },
  {
    name: "Fire, Gas & Power",
    sub: "Structure fire, gas smell, carbon monoxide, downed lines",
    categories: ["Shelter & Heat", "Power & Lighting", "Home Systems"],
    icon: "home",
  },
  {
    name: "Disasters, Weather & Danger",
    sub: "Tornado, flood, earthquake, wildfire, active threats",
    categories: ["Disasters", "Security & Safety"],
    icon: "storm",
  },
  {
    name: "Unsafe Water, Food & Plants",
    sub: "Contaminated water, food, poisonous plants",
    categories: ["Water", "Food", "Plants — Basic Emergency Reference"],
    icon: "water",
  },
  {
    name: "Animal & Vehicle Emergencies",
    sub: "Pet emergencies, wildlife, car crashes and hazards",
    categories: ["Animals & Pets", "Vehicles & Mechanics", "Fishing / Trapping / Food Acquisition"],
    icon: "paw",
  },
];

export function findBucketBySlug(slug: string): EmergencyBucket | undefined {
  return EMERGENCY_BUCKETS.find((b) => slugifyBucket(b.name) === slug);
}

export function slugifyBucket(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
