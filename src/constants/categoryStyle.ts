import { Priority } from "@/content/categories";

export const EMERGENCY_CATEGORY = "What To Do In An Emergency";

export interface QuickTile {
  title: string;
  label: string;
  emoji: string;
}

// Exact titles from the "What To Do In An Emergency" category, in the order they appear on the home screen.
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
