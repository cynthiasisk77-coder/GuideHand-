export interface SupplyCacheItem {
  id: string;
  label: string;
}

export interface SupplyCacheSection {
  id: string;
  name: string;
  items: SupplyCacheItem[];
}

export const SUPPLY_CACHE_SECTIONS: SupplyCacheSection[] = [
  {
    id: "water",
    name: "Water & Hydration",
    items: [
      { id: "water-1", label: "Clean potable water — 1 gallon per person per day, minimum 2 weeks" },
      { id: "water-2", label: "Chemical purification: unscented 6% bleach or chlorine dioxide tablets" },
      { id: "water-3", label: "Mechanical filter (0.1 micron) plus backflush syringe" },
      { id: "water-4", label: "Bulk storage: food-grade 5-gallon jugs or a bladder/bathtub liner" },
    ],
  },
  {
    id: "food",
    name: "Food & Caloric Reserves",
    items: [
      { id: "food-1", label: "Ready-to-eat canned meats, beans, chili, stews, peanut butter, dried fruit" },
      { id: "food-2", label: "Bulk rice, oats, and dry beans in Mylar bags with oxygen absorbers" },
      { id: "food-3", label: "Two manual can openers" },
      { id: "food-4", label: "Compact camp stove (butane/propane or wood-burning) plus fuel" },
    ],
  },
  {
    id: "medical",
    name: "Medical & First Aid",
    items: [
      { id: "medical-1", label: "Windlass tourniquet (e.g. CAT or SOFTT-W)" },
      { id: "medical-2", label: "Compressed gauze, pressure bandages, vented chest seals" },
      { id: "medical-3", label: "SAM splint, elastic wrap, gauze pads, medical tape" },
      { id: "medical-4", label: "Liquid antiseptic (povidone-iodine)" },
      { id: "medical-5", label: "30-day reserve of essential prescriptions" },
      { id: "medical-6", label: "Fever reducers, anti-diarrheals, antihistamine, oral rehydration salts" },
      { id: "medical-7", label: "Clove oil, burn gel, antibiotic ointment, eye wash saline" },
    ],
  },
  {
    id: "power",
    name: "Power, Light & Communications",
    items: [
      { id: "power-1", label: "LED headlamp per person, battery lanterns, glow sticks" },
      { id: "power-2", label: "AA/AAA battery stock plus 10,000–20,000 mAh USB power banks" },
      { id: "power-3", label: "20W–60W foldable solar charging panel" },
      { id: "power-4", label: "NOAA weather radio (hand-crank or battery), whistle, signal mirror" },
    ],
  },
  {
    id: "sanitation",
    name: "Sanitation & Hygiene",
    items: [
      { id: "sanitation-1", label: "5-gallon bucket toilet: contractor bags, snap-on seat, dry cover material" },
      { id: "sanitation-2", label: "Disinfectant wipes, soap, hand sanitizer, heavy trash bags, paper towels" },
      { id: "sanitation-3", label: "Feminine hygiene products and toilet paper, sealed in waterproof bags" },
      { id: "sanitation-4", label: "Designated wash bucket" },
    ],
  },
  {
    id: "shelter",
    name: "Shelter, Warmth & Field Tools",
    items: [
      { id: "shelter-1", label: "Wool blankets, Mylar emergency bivy sacks, rain tarps with grommets" },
      { id: "shelter-2", label: "Multi-tool, 12-inch adjustable wrench (for gas shut-off), crowbar, duct tape" },
      { id: "shelter-3", label: "Fixed-blade knife, bow saw or folding saw, 100 feet of paracord" },
      { id: "shelter-4", label: "Heavy leather work gloves, N95 masks, safety goggles" },
    ],
  },
  {
    id: "security",
    name: "Security, Documents & Currency",
    items: [
      { id: "security-1", label: "Small-denomination cash ($1, $5, $10, $20)" },
      { id: "security-2", label: "Waterproof pouch: IDs, deeds, insurance policies, handwritten contact book" },
      { id: "security-3", label: "Hardcopy local/county/state road maps in a waterproof sleeve" },
    ],
  },
];
