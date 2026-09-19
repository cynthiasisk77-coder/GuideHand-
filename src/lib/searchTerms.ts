// Turning what a frightened person types into the words the articles are
// written in.
//
// Someone does not type "ingested caustic substance." They type "my kid drank
// bleach." They do not type "airway obstruction," they type "she can't
// breathe." The articles are written in the careful language of the Red Cross
// and MedlinePlus, and the gap between those two vocabularies is where a search
// box fails someone.
//
// Nothing here invents an answer. Every entry routes everyday words to articles
// that already exist and were already sourced — it is a translation layer, not
// a source of medical claims.

/** Words that carry no meaning for finding an article. */
export const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "been", "but", "by", "can", "cant",
  "do", "does", "doing", "done", "for", "from", "get", "getting", "got", "had",
  "has", "have", "how", "i", "if", "in", "is", "it", "its", "me", "my", "of",
  "on", "or", "our", "should", "so", "that", "the", "their", "them", "then",
  "there", "these", "they", "this", "to", "up", "was", "we", "what", "when",
  "where", "which", "who", "why", "will", "with", "you", "your", "am", "im",
  "about", "need", "needs", "want", "help", "please", "just", "some", "any",
]);

/**
 * Crude suffix stripping, so "burns", "burning" and "burned" all reach the
 * article titled "burn". Deliberately conservative: over-stemming makes
 * unrelated words collide, which is worse than missing a plural.
 */
export function stem(word: string): string {
  if (word.length <= 3) return word;
  for (const suffix of ["ing", "ies", "ied", "ed", "es", "s"]) {
    if (word.endsWith(suffix) && word.length - suffix.length >= 3) {
      let base = word.slice(0, word.length - suffix.length);
      if (suffix === "ies") base += "y";
      // "running" -> "runn" -> "run"
      if (
        (suffix === "ing" || suffix === "ed") &&
        base.length > 3 &&
        base[base.length - 1] === base[base.length - 2]
      ) {
        base = base.slice(0, -1);
      }
      return base;
    }
  }
  return word;
}

/** Splits text into the words worth indexing. */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w))
    .map(stem);
}

/**
 * Everyday phrasing mapped to the words the articles actually use.
 *
 * The key is matched against the typed query as a whole phrase, so multi-word
 * entries work. Values are added to the search as extra terms; they never
 * replace what the person typed.
 */
export const PHRASE_HINTS: { match: RegExp; terms: string[] }[] = [
  // --- airway and breathing ---
  { match: /\b(can'?t|cannot|not|stopped|isn'?t) ?(be)?breath/, terms: ["breathing", "airway", "rescue", "cpr", "choking", "unresponsive"] },
  { match: /\bchok(e|ing|ed)\b|\bsomething stuck\b|\bswallowed something\b/, terms: ["choking", "airway", "heimlich", "abdominal", "thrusts"] },
  { match: /\bnot breathing\b|\bno pulse\b|\bheart stopped\b/, terms: ["cpr", "aed", "cardiac", "arrest", "compressions"] },
  { match: /\bwheez|\basthma|\binhaler\b/, terms: ["asthma", "breathing", "inhaler", "respiratory"] },

  // --- somebody went down ---
  //
  // "Collapsed" was missing entirely. Somebody typing "my mom collapsed" got
  // nothing at all, while the article they needed — "Unconscious, breathing,
  // cause unknown" — was sitting right there scoring 93 for the word
  // "unconscious". Nobody says unconscious. They say she went down.
  { match: /\bcollaps(e|ed|ing)\b|\bwent down\b|\bdropped\b|\bfell (down|over|out)\b/, terms: ["unconscious", "unresponsive", "collapse", "breathing", "cpr", "recovery", "position"] },
  { match: /\bwon'?t wake\b|\bcan'?t wake\b|\bwill not wake\b|\bnot waking\b|\bout cold\b/, terms: ["unconscious", "unresponsive", "breathing", "rouse", "cpr"] },
  { match: /\blimp\b|\bfloppy\b|\bnot responding\b|\bunresponsive\b|\bno response\b/, terms: ["unresponsive", "unconscious", "breathing", "cpr"] },

  // --- poisoning ---
  { match: /\b(drank|drink|swallow|ate|eat|eaten|ingest)\w*\b.*\b(bleach|chemical|poison|pill|cleaner|antifreeze|detergent|gasoline|medicine)\b/, terms: ["poisoning", "poison", "ingested", "swallowed", "chemical"] },
  { match: /\bpoison|\boverdose\b|\btoo many pills\b/, terms: ["poisoning", "overdose", "ingested", "toxic"] },

  // --- bleeding and wounds ---
  { match: /\bbleed|\bblood\b|\bgash\b|\bdeep cut\b|\bwon'?t stop bleeding\b/, terms: ["bleeding", "hemorrhage", "tourniquet", "pressure", "wound"] },
  { match: /\bcut\b|\bwound\b|\bstab\b|\bpuncture\b|\bgunshot\b/, terms: ["wound", "bleeding", "laceration", "dressing", "infection"] },
  { match: /\bimpaled\b|\bstuck in\b.*\b(arm|leg|chest|eye)\b/, terms: ["impaled", "object", "wound", "stabilize"] },

  // --- burns ---
  { match: /\bburn|\bscald|\bboiling water\b|\bhot (grease|oil|pan)\b/, terms: ["burn", "thermal", "scald", "blister", "cooling"] },
  { match: /\belectrocut|\bshocked by\b|\blive wire\b/, terms: ["electrical", "shock", "electrocution", "burn"] },

  // --- bones and injuries ---
  { match: /\bbroke|\bbroken\b|\bfractur|\bsnapped\b/, terms: ["fracture", "broken", "splint", "immobilize", "bone"] },
  { match: /\bsprain|\btwisted (my )?(ankle|wrist|knee)\b/, terms: ["sprain", "strain", "swelling", "ice"] },
  { match: /\bhit (my |his |her |their )?head\b|\bconcussion\b|\bknocked out\b/, terms: ["head", "injury", "concussion", "skull", "consciousness"] },
  { match: /\bback injur|\bneck injur|\bspine\b|\bcan'?t move (my )?(legs|arms)\b/, terms: ["spinal", "spine", "immobilize", "neck"] },

  // --- cardiac and stroke ---
  { match: /\bheart attack\b|\bchest pain\b|\bpain in (my )?chest\b/, terms: ["cardiac", "heart", "chest", "attack"] },
  { match: /\bstroke\b|\bface droop|\bslurred speech\b|\bone side\b.*\bweak\b/, terms: ["stroke", "facial", "speech", "weakness"] },

  // --- collapse ---
  { match: /\bpassed out\b|\bfaint|\bunconscious\b|\bwon'?t wake up\b|\bunresponsive\b/, terms: ["unresponsive", "unconscious", "fainting", "recovery", "position"] },
  { match: /\bseizure\b|\bconvuls|\bshaking uncontrollably\b/, terms: ["seizure", "convulsion", "epilepsy"] },

  // --- allergy ---
  { match: /\ballerg|\bepipen\b|\banaphyla|\bswelling (up|of the)? ?(throat|face|tongue)\b/, terms: ["anaphylaxis", "allergic", "epinephrine", "epipen", "swelling"] },

  // --- bites and stings ---
  { match: /\bsnake ?bite\b|\bbit by a snake\b/, terms: ["snake", "bite", "venom", "envenomation"] },
  { match: /\bspider\b|\bscorpion\b|\bsting\b|\bstung\b|\bbee\b|\bwasp\b/, terms: ["sting", "bite", "venom", "insect", "allergic"] },
  { match: /\bdog bit|\banimal bit|\bbit by a\b/, terms: ["bite", "animal", "rabies", "wound", "infection"] },
  { match: /\btick\b|\bembedded tick\b/, terms: ["tick", "removal", "lyme", "bite"] },

  // --- temperature ---
  { match: /\bfreez|\bhypotherm|\bso cold\b|\bshiver|\bfrostbit/, terms: ["hypothermia", "cold", "frostbite", "warming", "exposure"] },
  { match: /\bheat ?stroke\b|\bheat exhaust|\boverheat|\btoo hot\b|\bdizzy in the heat\b/, terms: ["heat", "hyperthermia", "exhaustion", "cooling", "dehydration"] },

  // --- illness ---
  { match: /\bfever\b|\bthrow(ing)? up\b|\bvomit|\bdiarrh|\bdehydrat/, terms: ["dehydration", "fluids", "rehydration", "illness", "fever"] },
  { match: /\binfect|\bpus\b|\bred streak|\bwound smells\b/, terms: ["infection", "wound", "antibiotic", "sepsis"] },
  { match: /\btooth|\bdental\b|\bmy tooth\b|\bjaw pain\b/, terms: ["dental", "tooth", "abscess", "extraction"] },
  { match: /\beye\b|\bsomething in (my|his|her) eye\b|\bcan'?t see\b/, terms: ["eye", "ocular", "foreign", "body", "irrigation"] },
  { match: /\bhaving a baby\b|\bin labor\b|\bchildbirth\b|\bgiving birth\b/, terms: ["childbirth", "labor", "delivery", "newborn"] },

  // --- water, food, shelter ---
  { match: /\bdirty water\b|\bsafe to drink\b|\bpurif|\bboil water\b|\bno (clean )?water\b/, terms: ["water", "purification", "boiling", "filtration", "disinfection"] },
  { match: /\bfood (gone )?bad\b|\bspoil|\bfood poison|\bfridge (is )?off\b/, terms: ["food", "spoilage", "safety", "refrigeration"] },
  { match: /\bno power\b|\bpower (is )?out\b|\bblackout\b|\boutage\b/, terms: ["power", "outage", "electricity", "generator"] },
  { match: /\bno heat\b|\bfurnace (is )?out\b|\bhow to stay warm\b/, terms: ["heat", "warmth", "shelter", "heating"] },

  // --- stock on hand: how much is there, and is it still good ---
  { match: /\b(past|after|beyond|expired?|out of) ?(the |its )?(date|expiry|expiration)\b|\bbest ?by\b|\buse ?by\b|\bstill (good|safe|ok|okay|edible)\b|\bgone off\b/, terms: ["expiring", "expiration", "dates", "alerts", "rotate", "quality", "safety", "spoilage"] },
  { match: /\b(how (much|many|long))\b.*\b(water|food|left|last|remain|supplies|stock)\b|\brunning out\b|\bhow long (will|can) (it|we|this|they)\b|\bdays of (water|food)\b|\benough (water|food)\b/, terms: ["calculated", "days", "remaining", "inventory", "supply", "ration"] },
  { match: /\bpower bank\b|\bbattery bank\b|\bhow many charges\b|\bmah\b|\bcharge my phone\b|\bbatteries last\b/, terms: ["power", "inventory", "battery", "banks", "solar", "fuel", "charge"] },
  { match: /\b(dog|cat|pet|puppy|kitten|animal)s?\b.*\b(food|water|supplies|need|kit|evacuat)|\bfor my (dog|cat|pet)\b/, terms: ["pet", "supply", "inventory", "animals"] },
  { match: /\btoilet paper\b|\bdiaper|\bperiod\b|\bmenstrual\b|\btampon|\bsanitary\b|\bhygiene\b|\bwash(ing)? hands\b/, terms: ["hygiene", "supply", "inventory", "sanitation", "soap"] },
  { match: /\b(count|inventor|stocktake|how much do i have|what do i have)\w*\b/, terms: ["inventory", "supply", "count", "quantity"] },

  // --- hazards ---
  { match: /\bsmell(s)? gas\b|\bgas leak\b|\bcarbon monoxide\b|\bco detector\b/, terms: ["gas", "leak", "carbon", "monoxide", "evacuate"] },
  { match: /\bfire\b|\bsmoke\b|\bhouse is burning\b/, terms: ["fire", "smoke", "evacuation", "extinguisher"] },
  { match: /\bflood|\bwater (is )?rising\b/, terms: ["flood", "water", "evacuation", "rising"] },
  { match: /\btornado\b|\bhurricane\b|\bearthquake\b|\bwildfire\b|\bstorm\b/, terms: ["disaster", "shelter", "warning", "evacuation"] },

  { match: /\b(offline|download(ed)?|saved?) ?maps?\b|\bmaps? (offline|without|with no) (signal|service|internet|data)\b|\bno (signal|service) map\b/, terms: ["offline", "maps", "download", "streets", "navigate"] },

  { match: /\bfamily plan\b|\bwho (gets|picks up) the (kids|children)\b|\bif we (get )?separated\b|\bcan'?t reach (my|the) (family|kids|husband|wife)\b|\bout[- ]of[- ](area|state) (contact|number)\b|\bmeet(ing)? (up|place) plan\b/, terms: ["family", "plan", "contact", "separated", "children", "reunite"] },

  { match: /\b(shut ?off|turn off) (the )?(water|gas|power|electric)\b|\bwhere is (the )?(main|water|gas|breaker|shutoff|valve)\b|\bmain valve\b|\bbreaker (box|panel)\b|\bwater (main|valve)\b|\bgas (valve|meter)\b/, terms: ["shutoff", "valve", "home", "water", "gas", "breaker"] },
  { match: /\b(model|serial) number\b|\bowner'?s manual\b|\bappliance\b|\bfilter size\b|\bwhat (furnace|water heater|fridge) do i have\b/, terms: ["home", "appliance", "model", "serial", "manual"] },

  { match: /\b(make|makes?|making|treat|purif\w*|clean|safe) (the )?water (safe|drinkable|to drink|clean)\b|\bhow (much|many) bleach\b|\bbleach (in|per|to) water\b|\bboil water (for )?how long\b|\bis (this|the|my) water safe\b|\bdrink\w* (dirty|pond|creek|river|rain) water\b/, terms: ["water", "safe", "drink", "boiling", "bleach", "disinfection", "purification"] },
  { match: /\b(plant|start|grow|growing) (a )?(garden|vegetables?|food)\b|\bvegetable garden\b|\bhow deep (to )?plant\b|\bwhen to plant\b|\braised bed\b|\bseeds? (in|into) (the )?ground\b/, terms: ["garden", "planting", "vegetable", "seed", "soil", "growing"] },
  { match: /\bcan\w* (food|vegetables?|meat|tomatoes|jam)\b|\bpressure canner?\b|\bwater ?bath\b|\bmason jar\b|\bhow to can\b|\bput ?up food\b|\bjar (lids?|seal)\b/, terms: ["canning", "jars", "preserving", "pressure", "botulism", "food"] },

  // --- navigation ---
  { match: /\blost\b|\bdon'?t know where i am\b|\bturned around\b/, terms: ["lost", "navigation", "orientation", "bearings"] },
  { match: /\bwhich way\b|\bwhat direction\b|\bfind north\b/, terms: ["compass", "direction", "navigation", "cardinal"] },
];

/** The app's own screens, so a search finds a tool and not just an article. */
export interface ToolTarget {
  label: string;
  sub: string;
  pathname: string;
  icon: string;
  keywords: string[];
}

export const TOOL_TARGETS: ToolTarget[] = [
  {
    label: "Night Watch",
    sub: "Max keeps you company: talk, games, stories, check-ins",
    pathname: "/night-watch",
    icon: "moon",
    keywords: ["night", "watch", "company", "lonely", "alone", "awake", "sleep", "bored", "talk", "chat", "story", "stories", "game", "games", "trivia", "riddle", "riddles", "check", "scared", "long", "max"],
  },
  {
    label: "Family Plan",
    sub: "Who does what, and the number everyone calls",
    pathname: "/family-plan",
    icon: "family",
    keywords: ["family", "plan", "share", "shared", "household", "kids", "children", "school", "pickup", "contact", "reunite", "separated", "who", "job", "responsibility", "emergency", "relative", "grandma", "allergy", "allergies"],
  },
  {
    label: "Offline Maps",
    sub: "Streets on your phone that work with no signal",
    pathname: "/maps",
    icon: "compass",
    keywords: ["map", "maps", "offline", "download", "street", "streets", "road", "roads", "navigate", "navigation", "route", "directions", "area", "town", "lost", "tiles"],
  },
  {
    label: "Family Meetup Point",
    sub: "How far you are from where you agreed to meet",
    pathname: "/family-meetup",
    icon: "pin",
    keywords: ["meetup", "meeting", "place", "family", "far", "distance", "where", "cabin", "rally", "gps", "coordinates", "miles", "compass", "direction"],
  },
  {
    label: "Document Photos",
    sub: "Your saved IDs, insurance and deeds",
    pathname: "/document-photos",
    icon: "camera",
    keywords: ["passport", "id", "license", "licence", "insurance", "deed", "title", "document", "papers", "birth", "certificate", "social", "security"],
  },
  {
    label: "Medicine & Prescriptions",
    sub: "What you have, doses, expiry dates",
    pathname: "/medicine-tracker",
    icon: "medical",
    keywords: ["medicine", "medication", "prescription", "pill", "dose", "dosage", "pharmacy", "refill", "expiry", "expiration", "meds", "drug"],
  },
  {
    label: "Home Supplies",
    sub: "Check off what you have, add what's missing",
    pathname: "/supply-cache",
    icon: "checklist",
    keywords: ["supply", "supplies", "stockpile", "stock", "checklist", "store", "storage", "prepare", "kit"],
  },
  {
    label: "Your Home",
    sub: "Shutoffs, appliances, model numbers, manuals",
    pathname: "/home-record",
    icon: "home",
    keywords: ["home", "house", "appliance", "appliances", "manual", "manuals", "model", "serial", "shutoff", "shut", "valve", "water", "gas", "breaker", "panel", "furnace", "heater", "filter", "fuse", "electric", "plumbing", "repair", "warranty", "insurance"],
  },
  {
    label: "Supply Inventory",
    sub: "How many days of water and food you actually have",
    pathname: "/inventory",
    icon: "checklist",
    keywords: ["inventory", "count", "quantity", "how", "many", "days", "left", "remaining", "last", "ration", "calories", "gallons", "expire", "expiring", "expiration", "date", "stale", "rotate", "batteries", "fuel", "enough"],
  },
  {
    label: "Content Packs",
    sub: "Download extra reference for offline",
    pathname: "/content-packs",
    icon: "download",
    keywords: ["download", "pack", "offline", "reference", "library", "extra", "storage", "wikipedia"],
  },
  {
    label: "Back Up & Restore",
    sub: "Save your data to a file you keep",
    pathname: "/backup",
    icon: "upload",
    keywords: ["backup", "back", "restore", "save", "export", "copy", "lost", "phone", "recover", "undo"],
  },
];
