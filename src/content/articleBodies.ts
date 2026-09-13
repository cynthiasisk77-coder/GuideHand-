// Full field-guidance text for topics that have been fully researched and sourced.
// Keyed by the exact topic title in categories.ts. Topics not listed here show
// as "not yet written" in the app rather than being silently blank.

export interface ArticleBody {
  sources: string[];
  guidance: string[]; // each entry renders as one guidance line/paragraph
}

export const ARTICLE_BODIES: Record<string, ArticleBody> = {
  "Anaphylaxis when no epinephrine is available": {
    sources: [
      "Australasian Society of Clinical Immunology and Allergy (ASCIA)",
      "AAAAI/ACAAI 2023 anaphylaxis practice parameter update",
    ],
    guidance: [
      "There is no substitute for epinephrine. Antihistamines and steroids do not stop airway swelling or shock — this is damage control while getting to real treatment, not a home alternative.",
      "Call 911 / activate every available emergency-transport route immediately.",
      "Positioning improves blood return to the heart: lay the person flat with legs elevated if they are dizzy, weak, pale, cold, or clammy.",
      "If breathing difficulty is the main problem, let them sit up with legs stretched out in front instead of lying flat.",
      "If vomiting, pregnant, or unconscious, use the recovery position (on their side).",
      "Do not let the person stand or walk, even if they say they feel better.",
      "If a second epinephrine autoinjector becomes available and symptoms haven't improved, a repeat dose may be appropriate per their emergency plan.",
      "Antihistamines (e.g. diphenhydramine) may help skin symptoms like hives, but do nothing for airway swelling or shock — never treat this as \"good enough.\"",
      "If breathing stops or normal breathing fails, begin CPR and use an AED if available.",
      "Watch for a delayed second wave of symptoms (biphasic reaction) even after apparent improvement — get to medical care regardless.",
    ],
  },
  "Dog/animal bite wound care and infection risk": {
    sources: ["CDC (Capnocytophaga and bite-wound guidance)"],
    guidance: [
      "Wash the bite immediately with soap and water. If bleeding, apply firm pressure with a clean cloth for about 5 minutes first.",
      "Infection risk is real even from a familiar, vaccinated pet — dog bites carry roughly a 5-15% infection risk (Pasteurella and others); cat bites run higher because cat teeth puncture deep.",
      "A rarer but serious risk, Capnocytophaga infection, can follow dog or cat bites/scratches.",
      "Watch for infection signs 24-72 hours after the bite: redness, swelling, warmth, foul odor, or yellowish/white discharge.",
      "Get medical care within about 8 hours for: deep bites, puncture wounds, any bite near a joint, or any bite to the face, hand, or foot. Antibiotics started within about 6 hours meaningfully cut infection risk.",
      "A dirty bite wound uses the shorter 5-year tetanus booster threshold, not the standard 10-year interval.",
      "This is separate from deciding whether rabies post-exposure prophylaxis is needed — see the rabies-exposure entry.",
    ],
  },
  "Ankle sprain / twisted ankle": {
    sources: ["Mayo Clinic", "American Academy of Orthopaedic Surgeons (AAOS)"],
    guidance: [
      "RICE: Rest (avoid weight-bearing for 48-72 hours if it hurts to walk on).",
      "Ice: 20-30 minutes, 3-4 times a day — never place ice directly against skin, wrap it.",
      "Compression: an elastic wrap for support and swelling control, not so tight it cuts off circulation.",
      "Elevation: raise above heart level when possible.",
      "Seek medical care for: inability to bear any weight, severe pain, significant bruising or deformity, numbness, or no improvement within about 3 days.",
      "Visible deformity or joint instability needs evaluation for a possible fracture rather than home RICE-only care.",
    ],
  },
  "Wild animal encounter: bears (black vs. grizzly)": {
    sources: ["U.S. National Park Service"],
    guidance: [
      "Prevention: stay alert, hike in groups, make noise in low-visibility areas, store food/trash properly, never approach a bear.",
      "Initial encounter: stay calm, speak steadily, back away slowly. Do NOT run — this can trigger a chase response.",
      "Black bear attack: do NOT play dead. Try to escape to a car or building. Fight back — punch/kick the face, use rocks, branches, or bear spray.",
      "Grizzly/brown bear attack: PLAY DEAD. Leave your pack on, lie flat on your stomach, hands clasped behind your neck, legs spread. Stay still until the bear leaves.",
      "Know which species is in your area before you need this — the two responses are opposite.",
    ],
  },
  "Wild animal encounter: mountain lion/cougar": {
    sources: ["U.S. Fish & Wildlife Service", "U.S. National Park Service"],
    guidance: [
      "Goal: convince the cougar you are not prey and may be dangerous.",
      "Never run. Make eye contact, stand your ground, make yourself look bigger (open your jacket, raise your arms), speak loudly and firmly.",
      "Never bend over or crouch — that silhouette reads as prey.",
      "Pick up children and small pets immediately.",
      "If attacked, fight back — do not play dead (opposite of the grizzly bear response).",
      "Report every close/threatening encounter to a wildlife agency or ranger station.",
    ],
  },
  "Wild animal encounter: coyote": {
    sources: ["San Diego Humane Society", "State wildlife agencies"],
    guidance: [
      "\"Haze\" the coyote: yell, wave your arms, make yourself big and loud.",
      "Escalate if needed: throw small stones/sticks toward (not at) it, use noisemakers, stomp feet.",
      "Do not try to hurt it — the goal is to scare it off, not harm it.",
      "Do NOT haze a coyote that is cornered, injured, or has pups nearby — back away instead and contact a wildlife agency.",
      "Keep pets leashed. A coyote acting sick or unusually unafraid of people may be rabid — don't approach.",
    ],
  },
  "Wild animal encounter: alligator": {
    sources: ["Florida Fish and Wildlife Conservation Commission"],
    guidance: [
      "Keep at least 30-60 feet away from any alligator you see.",
      "Never feed an alligator — fed alligators lose their wariness of people and become dangerous.",
      "Keep pets leashed and away from the water's edge; swim only in designated areas, during daylight.",
      "Contact FWC's Nuisance Alligator Hotline (866-392-4286) if one is approaching people or stuck somewhere it can't leave.",
      "If attacked: fight back and target the eyes — do not try to pry the jaws open.",
    ],
  },
  "Wild animal encounter: snake (avoidance, not bite treatment)": {
    sources: ["CDC/NIOSH", "U.S. Army", "UGA SREL Herpetology"],
    guidance: [
      "If you see a snake, back away slowly (at least 6 feet / two big steps) and give it a clear path to leave.",
      "Do not touch it, corner it, or try to move it.",
      "Never try to kill or pick up a snake — even a dead snake's reflexes can trigger a strike for up to an hour.",
      "Prevention: don't put hands/feet where you can't see; wear over-the-ankle boots off-trail; use a flashlight at night.",
      "This is about avoiding a bite — for treatment after a bite, see the Snakebite entry.",
    ],
  },
  "Wildlife displaced by disaster (general principle)": {
    sources: ["Texas Parks and Wildlife Department", "Mississippi State University Extension"],
    guidance: [
      "Floods, wildfires, and landslides push wild animals into yards, garages, and houses seeking cover or higher ground.",
      "Expect increased wildlife presence during and after a disaster, even where you normally wouldn't.",
      "Species-specific guidance still applies — displacement just means expecting encounters somewhere unexpected.",
      "A displaced/stressed wild animal is likely defensive rather than aggressive — give it more space and a clear exit path.",
    ],
  },
  "Vehicle submersion: escaping a sinking car": {
    sources: ["AAA", "Kids and Car Safety"],
    guidance: [
      "Seatbelt off first — yours then passengers' — once the car has entered the water and settled.",
      "Window next, immediately. Try the power window first; if it won't work, break a side window (never the windshield) with a spring-loaded escape tool.",
      "You have roughly one minute before rising water pressure makes doors/windows impossible to open.",
      "Exit through the window as soon as it's open, even before the cabin fills.",
      "Children: unbuckle the oldest first — they can help move themselves and younger siblings toward the opening.",
      "Do NOT wait for the car to fill with water to \"equalize pressure\" — that is a dangerous myth. Get out immediately instead.",
      "Keep a spring-loaded window-breaking/seatbelt-cutting tool within reach of the driver's seat.",
    ],
  },
  "Driving into flood water (Turn Around, Don't Drown)": {
    sources: ["National Weather Service", "FEMA", "CDC"],
    guidance: [
      "Never drive around a barricade blocking a flooded road.",
      "12 inches of moving water can carry away most cars; 2 feet can carry away SUVs and trucks.",
      "You cannot reliably judge floodwater depth or current strength by eye.",
      "Over half of flood-related drownings happen when a vehicle is driven into hazardous floodwater.",
      "If floodwater is rising around a stopped/stuck vehicle, get out and move to higher ground immediately — don't wait it out.",
      "6 inches of fast-moving water can knock a standing adult off their feet.",
    ],
  },
  "Vehicle stranded in heat or cold": {
    sources: ["CDC", "Ready.gov/FEMA", "AAA", "Arizona DOT"],
    guidance: [
      "COLD — Stay with the vehicle; it's usually safer than walking out in a storm.",
      "COLD — Tie a brightly colored cloth to the antenna. Raise the hood if it isn't actively snowing.",
      "COLD — Wrap up fully, including your head, in every blanket/coat available.",
      "COLD — Run the engine/heater about 10 minutes each hour, window cracked, and confirm the exhaust pipe isn't blocked by snow (carbon monoxide risk).",
      "HEAT — If the cabin gets too hot to safely stay in, get everyone (people and pets) out into shade, away from the travel lane.",
      "HEAT — Pavement can burn skin/paws — keep shoes on, keep pets off asphalt.",
      "HEAT — Hood up, hazards on, stay with (or right next to) the vehicle so it can be seen.",
      "HEAT — Avoid parking on tall dry grass — a hot undercarriage can ignite it.",
      "Keep an emergency kit (blankets, food, water, first aid) in the vehicle year-round.",
    ],
  },
  "Hit an animal with your car (deer/wildlife strike)": {
    sources: ["Pennsylvania DOT + PA Insurance Dept", "Michigan State Police"],
    guidance: [
      "Do NOT swerve to avoid the animal — swerving causes the worst crashes (oncoming traffic, rollovers). Brake firmly and stay in your lane.",
      "Deer travel single-file — if one crosses, expect more may follow.",
      "After impact: pull over safely, hazards on, check for injuries.",
      "Stay away from the animal itself — an injured, frightened animal can hurt you.",
      "Call police if the road is blocked or damage/injury is significant.",
      "Document damage and contact your insurer — comprehensive coverage typically covers an animal-strike claim.",
    ],
  },
  "Immediate steps after a car crash": {
    sources: ["U.S. Department of Transportation", "NHTSA"],
    guidance: [
      "Check yourself and everyone else in the vehicle for injuries first.",
      "If the car can still be driven safely, move it out of the travel lane, then turn on hazard lights.",
      "Call 911 — even for a minor crash. This gets an official police report and gets medical help moving if anyone is hurt.",
      "Adrenaline can mask injury. Watch for pain, stiffness, or mental fogginess over the following hours or days.",
      "Manage the scene for other traffic and first responders until help arrives.",
    ],
  },
  "Aggressive/road-rage driver encounter": {
    sources: ["Virginia State Police", "Washington DOL", "Illinois State Police", "Texas DOT"],
    guidance: [
      "Never stop your car to confront an aggressive driver, and never chase one.",
      "Avoid eye contact; ignore rude gestures and don't return them; don't brake-check or provoke.",
      "Put distance between your vehicle and theirs — let them pass.",
      "If they continue following/escalating, drive to the nearest police station or a busy, well-lit public place and call 911 — do not lead them to your home.",
      "If they crash further down the road from their own aggressive driving, stop at a safe distance, wait for police, and report what you saw.",
    ],
  },
  "Suspect you're being followed (in a vehicle)": {
    sources: ["UCLA Police Department", "Fremont Police Department (CA)"],
    guidance: [
      "Stay calm — panic leads to rushed decisions that can cause a crash. Keep a steady speed.",
      "Do NOT drive straight home or to your actual destination.",
      "Head for the nearest police/fire station, or a busy, well-lit public place.",
      "Call 911: give your location, direction of travel, and a description of both vehicles.",
      "If safe, note identifying details of the following vehicle for the 911 call.",
    ],
  },
  "Parking lot / walking to your car alone at night": {
    sources: ["UCLA Police Department", "Fremont Police Department (CA)"],
    guidance: [
      "Have your keys in hand before you leave the building.",
      "Park in well-lit areas, near entrances/exits when possible, and note where you parked.",
      "Avoid distraction — don't walk absorbed in a phone or wearing headphones in both ears.",
      "If uneasy, ask security for an escort to your car, or call police non-emergency — this is a normal request.",
      "Trust your gut. If something feels wrong, turn back toward people/lights/safety.",
      "Check around and inside the vehicle (back seat) before getting in; lock doors immediately.",
    ],
  },
  "Hostage situation": {
    sources: [
      "No direct FBI.gov/DHS civilian page found — sourced to consistently-repeated university emergency-management summaries of FBI-derived principles. Treat as PARTIAL, not VERIFIED.",
    ],
    guidance: [
      "Stay calm, comply, and be polite — do not argue, complain, or act belligerent.",
      "Do not attempt escape unless there is a clearly good chance of success.",
      "Avoid sudden movements or hostile looks. Sit quietly.",
      "Quietly observe and memorize details about captors (appearance, voice, clothing) for later.",
      "Try to build calm rapport if it feels safe to do so.",
      "Eat and drink what's offered (absent clear reason to think it's unsafe); try to maintain routine.",
      "If rescue/police action begins: do not run. Drop to the ground, stay still, keep hands visible, wait for instructions.",
    ],
  },
  "Dental pain, broken tooth, facial swelling": {
    sources: ["American Dental Association / MouthHealthy", "JADA evidence-based guideline"],
    guidance: [
      "Rinse the mouth gently with warm water.",
      "If a piece of tooth broke off, save it — bring it to the dentist.",
      "Cold compress on the outside of the face/cheek, 10-15 minutes on/off.",
      "Pain control: NSAID (ibuprofen) alone or combined with acetaminophen. Never place aspirin directly against the tooth or gum.",
      "Antibiotics are not automatically needed — most tooth pain is managed with pain control and an actual dental procedure.",
      "Escalate to 911/ER (not just \"see a dentist soon\") for trouble breathing/swallowing, or facial swelling with fever.",
      "See a dentist as soon as reachable even if pain is currently mild.",
    ],
  },
  "Eye injury and chemical irrigation": {
    sources: ["American Academy of Ophthalmology", "Mayo Clinic"],
    guidance: [
      "Chemical splash: irrigate immediately and copiously with clean water for at least 20 minutes, starting at the scene.",
      "Do not delay irrigation to read a product label or identify the chemical — flush first, always.",
      "If wearing contacts, try to remove them while continuing to flush; don't stop flushing to chase the lens.",
      "Foreign body (not embedded): irrigate gently, inner corner toward outer corner. Never rub the eye.",
      "Embedded/impaled object: do not attempt removal. Protect the eye with a rigid shield without pressing on it.",
      "Any chemical splash or embedded foreign body = emergency care, not wait-and-see.",
    ],
  },
  "Non-opioid medication overdose": {
    sources: ["National Poison Control Center (1-800-222-1222)", "Acetaminophen toxicity consensus literature"],
    guidance: [
      "Call Poison Control (1-800-222-1222), or 911 if unconscious/not breathing normally.",
      "Do this immediately for any known or suspected overdose — do NOT wait for symptoms.",
      "Have ready: what was taken, how much, when, the person's age/weight/health conditions.",
      "Watch for: nausea, vomiting, right-upper-quadrant abdominal pain, later confusion.",
      "Bring the medication bottle to the ER.",
      "The acetaminophen antidote (N-acetylcysteine) is nearly 100% protective within 8 hours of ingestion — speed is everything.",
    ],
  },
  "Wild plant/mushroom poisoning (human)": {
    sources: ["National Poison Control Center", "California Poison Control System"],
    guidance: [
      "Call Poison Control (1-800-222-1222) immediately for any known or suspected ingestion, even with no symptoms yet.",
      "Do not wait for symptoms — some dangerous mushrooms have delayed onset while organ damage progresses.",
      "Save a physical sample or clear photo of the plant/mushroom eaten.",
      "Do NOT induce vomiting unless told to by Poison Control or a medical professional.",
      "This is poisoning first aid only, separate from beneficial/medicinal plant use.",
    ],
  },
  "Pet snakebite and envenomation": {
    sources: ["Merck Veterinary Manual", "VCA Animal Hospitals", "Veterinary Partner/VIN"],
    guidance: [
      "Keep the animal as still and calm as possible. Carry them rather than letting them walk.",
      "Get to a veterinarian immediately — antivenin at the clinic is the actual treatment.",
      "Do NOT: ice/cold packs, cutting and suction, tourniquets, electric shock, hot packs — all ineffective and delay real treatment.",
      "Only muzzle if needed for safe handling.",
    ],
  },
  "Downed fences and escaped animals": {
    sources: ["Missouri Extension", "Ohio State University Extension"],
    guidance: [
      "Use PPE when handling loose or spooked livestock: steel-toed boots, leather gloves.",
      "After a storm/disaster, walk the fence line before assuming animals are still contained.",
      "Loose livestock near a road is a safety emergency for animals and drivers — prioritize containment/warning over solo recovery.",
      "Routine twice-yearly fence inspection is the main prevention most sources emphasize.",
    ],
  },
  "Dry staples, rationing, special diets": {
    sources: ["Ready.gov / FEMA", "University of Georgia Extension"],
    guidance: [
      "Store at least 2 weeks of non-perishable food per person when possible (3 days is the floor, 2 weeks is the target).",
      "Plan for special diets explicitly — infants, elderly, diabetics, allergies need a person-specific plan, not an afterthought.",
      "Favor foods needing no water, refrigeration, or cooking.",
      "Use first-in-first-out rotation and check expiration dates on a schedule.",
    ],
  },
  "Manual can opening and injury control": {
    sources: ["Commonsense practical safety — no CDC/CPSC-specific guidance found"],
    guidance: [
      "Keep fingers clear of the cutting wheel/blade; keep hands dry for grip.",
      "Don't force the opener onto a badly dented or misshapen can.",
      "Both the cut lid edge and the opener's blade are sharp after opening — handle the lid by its edges.",
    ],
  },
  "Basic snares and deadfalls": {
    sources: ["Cross-checked bushcraft/survival sources — historical field method, not government-sourced"],
    guidance: [
      "Simple wire snare: bend the wire tip into a small loop, twist to lock it, then pass the free end through to form a running noose. Brass wire, 20-24 gauge, holds shape well.",
      "Figure-4 deadfall: three carved sticks (vertical post, diagonal lever, bait/trigger stick) balance a heavy rock or log; disturbing the bait releases the trigger.",
      "Legal caveat: trapping/snaring wildlife is heavily regulated outside a genuine survival emergency — treat as emergency-only technique.",
    ],
  },
  "Fish cleaning and safe handling": {
    sources: ["Cross-checked outdoors/fishing sources — standard technique, not government-sourced"],
    guidance: [
      "Kill the fish quickly and humanely first.",
      "Scale: hold by the tail, scrape scales off with the dull edge of a knife, tail to head.",
      "Gut: shallow cut from the vent to the base of the head; remove organs carefully, avoid rupturing the gallbladder.",
      "Remove gills, throat, and front fins by pinching and tearing toward the tail.",
      "Rinse thoroughly under cold water; scrape out the dark bloodline along the backbone for cleaner taste.",
    ],
  },
};
