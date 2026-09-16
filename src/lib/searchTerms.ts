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

  // --- hazards ---
  { match: /\bsmell(s)? gas\b|\bgas leak\b|\bcarbon monoxide\b|\bco detector\b/, terms: ["gas", "leak", "carbon", "monoxide", "evacuate"] },
  { match: /\bfire\b|\bsmoke\b|\bhouse is burning\b/, terms: ["fire", "smoke", "evacuation", "extinguisher"] },
  { match: /\bflood|\bwater (is )?rising\b/, terms: ["flood", "water", "evacuation", "rising"] },
  { match: /\btornado\b|\bhurricane\b|\bearthquake\b|\bwildfire\b|\bstorm\b/, terms: ["disaster", "shelter", "warning", "evacuation"] },

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
    label: "Home Supply Cache",
    sub: "Check off what you have, add what's missing",
    pathname: "/supply-cache",
    icon: "checklist",
    keywords: ["supply", "supplies", "stockpile", "stock", "checklist", "cache", "store", "storage", "inventory", "prepare", "kit"],
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
