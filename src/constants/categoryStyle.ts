import { Priority } from "@/content/categories";

export const RED = "#C62828";
export const RED_DARK = "#8E1B1B";
export const RED_TILE = "#D32F2F";

export interface CategoryStyle {
  color: string;
  fg: string;
  emoji: string;
  short: string;
}

export const EMERGENCY_CATEGORY = "Emergency Now";

export const CATEGORY_STYLE: Record<string, CategoryStyle> = {
  "Emergency Now": { color: RED, fg: "#FFFFFF", emoji: "🚨", short: "Emergency Now" },
  "Medical & First Aid": { color: "#E53935", fg: "#FFFFFF", emoji: "🩹", short: "Medical & First Aid" },
  Disasters: { color: "#546E7A", fg: "#FFFFFF", emoji: "🌪️", short: "Disasters" },
  Water: { color: "#0288D1", fg: "#FFFFFF", emoji: "💧", short: "Water" },
  Food: { color: "#F57F17", fg: "#1B1B1B", emoji: "🍎", short: "Food" },
  "Shelter & Heat": { color: "#D84315", fg: "#FFFFFF", emoji: "🔥", short: "Shelter & Heat" },
  "Power & Lighting": { color: "#F9A825", fg: "#1B1B1B", emoji: "⚡", short: "Power & Light" },
  "Home Systems": { color: "#455A64", fg: "#FFFFFF", emoji: "🏠", short: "Home Systems" },
  "Vehicles & Mechanics": { color: "#1565C0", fg: "#FFFFFF", emoji: "🚗", short: "Vehicles" },
  "Animals & Pets": { color: "#6A1B9A", fg: "#FFFFFF", emoji: "🐾", short: "Animals & Pets" },
  Communication: { color: "#006064", fg: "#FFFFFF", emoji: "📻", short: "Communication" },
  Navigation: { color: "#2E7D32", fg: "#FFFFFF", emoji: "🧭", short: "Navigation" },
  Evacuation: { color: "#EF6C00", fg: "#FFFFFF", emoji: "🏃", short: "Evacuation" },
  "Security & Safety": { color: "#283593", fg: "#FFFFFF", emoji: "🛡️", short: "Security & Safety" },
  "Tools & Repairs": { color: "#4E342E", fg: "#FFFFFF", emoji: "🔧", short: "Tools & Repairs" },
  "Fishing / Trapping / Food Acquisition": { color: "#00695C", fg: "#FFFFFF", emoji: "🎣", short: "Fishing & Trapping" },
  "Plants — Basic Emergency Reference": { color: "#558B2F", fg: "#FFFFFF", emoji: "🌿", short: "Plants" },
  "Sanitation & Hygiene": { color: "#00897B", fg: "#FFFFFF", emoji: "🧼", short: "Sanitation" },
  "Family & Special Needs": { color: "#AD1457", fg: "#FFFFFF", emoji: "👨‍👩‍👧", short: "Family & Special Needs" },
  "Inventory & Supplies": { color: "#5E35B1", fg: "#FFFFFF", emoji: "📦", short: "Supplies" },
  "Preparedness Plans": { color: "#3949AB", fg: "#FFFFFF", emoji: "📋", short: "Plans" },
  "Reference Library": { color: "#616161", fg: "#FFFFFF", emoji: "📚", short: "Reference" },
};

export function getCategoryStyle(name: string): CategoryStyle {
  return CATEGORY_STYLE[name] ?? { color: "#37474F", fg: "#FFFFFF", emoji: "📘", short: name };
}

export interface QuickTile {
  title: string;
  label: string;
  emoji: string;
}

// Exact titles from the "Emergency Now" category, in the order they appear on the home screen.
export const QUICK_TILES: QuickTile[] = [
  { title: "Severe bleeding (tourniquet)", label: "Severe bleeding", emoji: "🩸" },
  { title: "Not breathing / cardiac arrest (CPR/AED)", label: "Not breathing · CPR", emoji: "🫀" },
  { title: "Choking", label: "Choking", emoji: "🫁" },
  { title: "Stroke symptoms", label: "Stroke", emoji: "🧠" },
  { title: "Heart-attack symptoms / aspirin boundary", label: "Heart attack", emoji: "❤️‍🩹" },
  { title: "Severe allergic reaction / epinephrine", label: "Allergic reaction", emoji: "🐝" },
  { title: "Poisoning (swallowed/inhaled/skin/eye)", label: "Poisoning", emoji: "☠️" },
  { title: "Burn (thermal/chemical)", label: "Burns", emoji: "🔥" },
  { title: "Structure fire — get out now", label: "House fire", emoji: "🧯" },
  { title: "Seizure", label: "Seizure", emoji: "⚡" },
  { title: "Unconscious, breathing, cause unknown", label: "Unconscious", emoji: "😵" },
  { title: "Broken bone / fracture", label: "Broken bone", emoji: "🦴" },
  { title: "Drowning / near-drowning rescue", label: "Drowning", emoji: "🌊" },
  { title: "Hypothermia", label: "Hypothermia", emoji: "🥶" },
  { title: "Heat illness (exhaustion/stroke)", label: "Heat stroke", emoji: "🥵" },
  { title: "Emergency childbirth", label: "Childbirth", emoji: "🤰" },
  { title: "Animal emergency (poisoning)", label: "Pet poisoned", emoji: "🐾" },
  { title: "Active violence (run-hide-fight quick card)", label: "Active violence", emoji: "🚨" },
];

export const HOME_QUICK_TILE_COUNT = 8;

export function getQuickTile(title: string): QuickTile | undefined {
  return QUICK_TILES.find((t) => t.title === title);
}

export const PRIORITY_HUMAN: Record<Priority, string> = {
  P0: "Life-threatening",
  P1: "Urgent",
  P2: "Important",
  P3: "Good to know",
};

export const PRIORITY_ORDER: Record<Priority, number> = { P0: 0, P1: 1, P2: 2, P3: 3 };
