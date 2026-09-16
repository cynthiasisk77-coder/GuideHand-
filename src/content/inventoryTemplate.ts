// The rows a person starts with, so the inventory is not a blank page.
//
// Every quantity starts at zero. The app does not claim anyone owns anything —
// it only offers the row and the units, so that filling it in is typing one
// number rather than deciding what a "unit" of rice even is.
//
// The calorie figures are averages from USDA FoodData Central, rounded. They
// are starting points, not label readings: brands differ, and every one of
// them is editable on the row. A person who wants the real number reads their
// own can and types it.

export interface InventoryCategory {
  id: string;
  name: string;
  /** One line explaining what belongs here. */
  note: string;
  /** Which units this category offers, in the order they are shown. */
  unitIds: string[];
  /** True when rows in this category carry a calorie figure. */
  tracksCalories?: boolean;
  /** True when rows in this category carry a mAh rating. */
  tracksPower?: boolean;
}

export interface InventoryStarterItem {
  id: string;
  categoryId: string;
  name: string;
  unitId: string;
  caloriesPerUnit?: number;
  mahPerUnit?: number;
}

export const INVENTORY_CATEGORIES: InventoryCategory[] = [
  {
    id: "water",
    name: "Water",
    note: "Everything drinkable, plus what you would use to make water drinkable.",
    unitIds: ["gallon", "case24", "jug5", "liter", "drum55", "bottle", "item"],
  },
  {
    id: "food",
    name: "Food",
    note: "Shelf-stable calories. The number beside each row is calories per unit — correct it from your own label.",
    unitIds: ["can", "jar", "box", "bag", "pound", "pouch", "quart", "item"],
    tracksCalories: true,
  },
  {
    id: "power",
    name: "Power & Fuel",
    note: "Batteries, banks, panels and anything that burns.",
    unitIds: ["battery", "bank", "panel", "gallon", "tank", "pack", "item"],
    tracksPower: true,
  },
  {
    id: "tools",
    name: "Tools & Repair",
    note: "What you fix things with when nobody is coming to fix them.",
    unitIds: ["item", "roll", "box", "foot", "pack", "bottle"],
  },
  {
    id: "pets",
    name: "Pets",
    note: "They eat and drink every day too, and their supply runs out faster than yours.",
    unitIds: ["bag", "can", "pound", "box", "item", "gallon"],
  },
  {
    id: "hygiene",
    name: "Hygiene & Sanitation",
    note: "The category people skip and then miss first.",
    unitIds: ["roll", "bar", "bottle", "box", "pack", "item"],
  },
];

export const INVENTORY_STARTER_ITEMS: InventoryStarterItem[] = [
  // --- Water --------------------------------------------------------------
  { id: "inv-water-bottled", categoryId: "water", name: "Bottled water", unitId: "case24" },
  { id: "inv-water-stored", categoryId: "water", name: "Stored water (jugs or drums)", unitId: "jug5" },
  { id: "inv-water-bleach", categoryId: "water", name: "Unscented 6% bleach for treating water", unitId: "bottle" },
  { id: "inv-water-tablets", categoryId: "water", name: "Purification tablets", unitId: "pack" },
  { id: "inv-water-filter", categoryId: "water", name: "Filters and spare cartridges", unitId: "item" },

  // --- Food ---------------------------------------------------------------
  { id: "inv-food-beans-can", categoryId: "food", name: "Canned beans (15 oz)", unitId: "can", caloriesPerUnit: 350 },
  { id: "inv-food-chili", categoryId: "food", name: "Canned chili or stew (15 oz)", unitId: "can", caloriesPerUnit: 500 },
  { id: "inv-food-meat", categoryId: "food", name: "Canned meat or tuna (5 oz)", unitId: "can", caloriesPerUnit: 150 },
  { id: "inv-food-veg", categoryId: "food", name: "Canned vegetables (15 oz)", unitId: "can", caloriesPerUnit: 150 },
  { id: "inv-food-fruit", categoryId: "food", name: "Canned fruit (15 oz)", unitId: "can", caloriesPerUnit: 220 },
  { id: "inv-food-soup", categoryId: "food", name: "Canned soup (condensed, 10.5 oz)", unitId: "can", caloriesPerUnit: 220 },
  { id: "inv-food-pb", categoryId: "food", name: "Peanut butter (16 oz jar)", unitId: "jar", caloriesPerUnit: 2650 },
  { id: "inv-food-rice", categoryId: "food", name: "Dry rice", unitId: "pound", caloriesPerUnit: 1650 },
  { id: "inv-food-oats", categoryId: "food", name: "Rolled oats", unitId: "pound", caloriesPerUnit: 1700 },
  { id: "inv-food-beans-dry", categoryId: "food", name: "Dry beans", unitId: "pound", caloriesPerUnit: 1550 },
  { id: "inv-food-pasta", categoryId: "food", name: "Dry pasta", unitId: "pound", caloriesPerUnit: 1650 },
  { id: "inv-food-oil", categoryId: "food", name: "Cooking oil", unitId: "quart", caloriesPerUnit: 7700 },
  { id: "inv-food-honey", categoryId: "food", name: "Honey or sugar", unitId: "pound", caloriesPerUnit: 1370 },
  { id: "inv-food-crackers", categoryId: "food", name: "Crackers or hard biscuits", unitId: "box", caloriesPerUnit: 1200 },
  { id: "inv-food-milk", categoryId: "food", name: "Powdered milk", unitId: "pound", caloriesPerUnit: 1800 },
  { id: "inv-food-ready", categoryId: "food", name: "Ready-to-eat meals or pouches", unitId: "pouch", caloriesPerUnit: 1200 },
  { id: "inv-food-baby", categoryId: "food", name: "Formula or baby food", unitId: "can", caloriesPerUnit: 2400 },

  // --- Power & Fuel -------------------------------------------------------
  { id: "inv-power-aa", categoryId: "power", name: "AA batteries", unitId: "battery" },
  { id: "inv-power-aaa", categoryId: "power", name: "AAA batteries", unitId: "battery" },
  { id: "inv-power-d", categoryId: "power", name: "C and D batteries", unitId: "battery" },
  { id: "inv-power-coin", categoryId: "power", name: "Coin cells (hearing aids, sensors)", unitId: "pack" },
  { id: "inv-power-bank", categoryId: "power", name: "USB power bank (10,000 mAh)", unitId: "bank", mahPerUnit: 10000 },
  { id: "inv-power-bank20", categoryId: "power", name: "USB power bank (20,000 mAh)", unitId: "bank", mahPerUnit: 20000 },
  { id: "inv-power-solar", categoryId: "power", name: "Folding solar panel", unitId: "panel" },
  { id: "inv-power-gas", categoryId: "power", name: "Stored gasoline (treated)", unitId: "gallon" },
  { id: "inv-power-propane", categoryId: "power", name: "Propane cylinders", unitId: "tank" },
  { id: "inv-power-kerosene", categoryId: "power", name: "Kerosene or lamp oil", unitId: "gallon" },
  { id: "inv-power-wood", categoryId: "power", name: "Firewood or fuel pellets", unitId: "bag" },

  // --- Tools & Repair -----------------------------------------------------
  { id: "inv-tools-tape", categoryId: "tools", name: "Duct tape", unitId: "roll" },
  { id: "inv-tools-tarp", categoryId: "tools", name: "Tarps", unitId: "item" },
  { id: "inv-tools-plastic", categoryId: "tools", name: "Plastic sheeting", unitId: "roll" },
  { id: "inv-tools-rope", categoryId: "tools", name: "Rope and paracord", unitId: "foot" },
  { id: "inv-tools-fasteners", categoryId: "tools", name: "Nails, screws and fasteners", unitId: "box" },
  { id: "inv-tools-wire", categoryId: "tools", name: "Baling or utility wire", unitId: "roll" },
  { id: "inv-tools-glue", categoryId: "tools", name: "Adhesives and epoxy", unitId: "item" },
  { id: "inv-tools-blades", categoryId: "tools", name: "Spare blades and bits", unitId: "pack" },
  { id: "inv-tools-lubricant", categoryId: "tools", name: "Penetrating oil and lubricant", unitId: "bottle" },

  // --- Pets ---------------------------------------------------------------
  { id: "inv-pets-dry", categoryId: "pets", name: "Dry pet food", unitId: "pound" },
  { id: "inv-pets-wet", categoryId: "pets", name: "Canned pet food", unitId: "can" },
  { id: "inv-pets-water", categoryId: "pets", name: "Water set aside for animals", unitId: "gallon" },
  { id: "inv-pets-litter", categoryId: "pets", name: "Litter or bedding", unitId: "bag" },
  { id: "inv-pets-meds", categoryId: "pets", name: "Pet medication and flea treatment", unitId: "item" },

  // --- Hygiene ------------------------------------------------------------
  { id: "inv-hyg-tp", categoryId: "hygiene", name: "Toilet paper", unitId: "roll" },
  { id: "inv-hyg-soap", categoryId: "hygiene", name: "Soap", unitId: "bar" },
  { id: "inv-hyg-sanitizer", categoryId: "hygiene", name: "Hand sanitizer", unitId: "bottle" },
  { id: "inv-hyg-bags", categoryId: "hygiene", name: "Heavy contractor bags", unitId: "box" },
  { id: "inv-hyg-wipes", categoryId: "hygiene", name: "Wet wipes", unitId: "pack" },
  { id: "inv-hyg-sanitary", categoryId: "hygiene", name: "Sanitary pads or tampons", unitId: "box" },
  { id: "inv-hyg-diapers", categoryId: "hygiene", name: "Diapers", unitId: "pack" },
  { id: "inv-hyg-bleach", categoryId: "hygiene", name: "Bleach for cleaning", unitId: "bottle" },
  { id: "inv-hyg-toothpaste", categoryId: "hygiene", name: "Toothpaste and brushes", unitId: "item" },
];

export function categoryById(id: string): InventoryCategory | undefined {
  return INVENTORY_CATEGORIES.find((category) => category.id === id);
}
