// "Emergency Now" quick cards are short versions of full articles that live in other categories.
// primary: the full article whose steps are shown on the quick card until a dedicated card is written.
// related: other full articles worth one tap from that card. All values are exact topic titles.
export interface QuickLink {
  primary?: string;
  related?: string[];
}

export const QUICK_ARTICLE_MAP: Record<string, QuickLink> = {
  "Severe bleeding (tourniquet)": {
    primary: "Severe bleeding and tourniquet",
    related: ["Junctional bleeding and wound packing", "Wound irrigation and when not to close"],
  },
  "Not breathing / cardiac arrest (CPR/AED)": {
    primary: "Adult CPR/AED",
    related: ["Pediatric/infant CPR and choking", "Opioid overdose and naloxone"],
  },
  Choking: {
    primary: "Adult choking, 2025 sequence",
    related: ["Pediatric/infant CPR and choking"],
  },
  "Unconscious, breathing, cause unknown": {
    related: [
      "Scene safety and triage order",
      "Stroke",
      "Opioid overdose and naloxone",
      "Diabetes, insulin interruption, hypoglycemia",
      "Seizure",
    ],
  },
  "Poisoning (swallowed/inhaled/skin/eye)": {
    primary: "Unknown swallowed poison, no induced vomiting",
    related: [
      "Poison exposure by eye, skin, inhalation",
      "Activated-charcoal limitations (human)",
      "Non-opioid medication overdose",
      "Opioid overdose and naloxone",
      "Wild plant/mushroom poisoning (human)",
    ],
  },
  "Burn (thermal/chemical)": {
    primary: "Thermal burns",
    related: ["Chemical and electrical burns", "Smoke inhalation and carbon monoxide"],
  },
  "Severe allergic reaction / epinephrine": {
    related: ["Anaphylaxis when no epinephrine is available"],
  },
  "Heart-attack symptoms / aspirin boundary": {
    primary: "Heart attack and aspirin boundaries",
    related: ["Adult CPR/AED"],
  },
  "Stroke symptoms": {
    primary: "Stroke",
  },
  "Broken bone / fracture": {
    primary: "Fractures, splints, circulation checks",
    related: ["Head, neck and spinal injury"],
  },
  Hypothermia: {
    related: ["Winter storm, blizzard, ice storm", "Vehicle stranded in heat or cold", "Shock and hypothermia prevention (medical)"],
  },
  "Heat illness (exhaustion/stroke)": {
    related: ["Extreme heat illness", "Vehicle stranded in heat or cold", "Dehydration and oral rehydration"],
  },
  "Animal emergency (poisoning)": {
    related: ["Pet snakebite and envenomation", "Pet seizure and breathing distress", "Pet trauma, bleeding, fractures, safe transport", "Bloat/GDV warning signs"],
  },
  "Emergency childbirth": {
    related: ["Emergency childbirth and newborn care"],
  },
  Seizure: {
    related: ["Pet seizure and breathing distress"],
  },
  "Drowning / near-drowning rescue": {
    related: ["Adult CPR/AED", "Pediatric/infant CPR and choking", "Vehicle submersion: escaping a sinking car"],
  },
  "Active violence (run-hide-fight quick card)": {
    primary: "Active shooter / active attacker response",
    related: ["Hostage situation", "Civil unrest, riot, violent demonstration nearby"],
  },
  "Structure fire — get out now": {
    related: ["Smoke inhalation and carbon monoxide", "Carbon-monoxide alarm or symptoms (general)", "Unknown industrial smoke or fire"],
  },
};
