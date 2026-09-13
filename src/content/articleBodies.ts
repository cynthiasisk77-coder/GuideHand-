// Full field-guidance text for topics that have been fully researched and sourced.
// Keyed by the exact topic title in categories.ts. Topics not listed here show
// as "not yet written" in the app rather than being silently blank.

export interface ArticleBody {
  sources: string[];
  guidance: string[]; // each entry renders as one guidance line/paragraph
}

export const ARTICLE_BODIES: Record<string, ArticleBody> = {
  "Scene safety and triage order": {
    sources: ["American Heart Association + American Red Cross, 2024 Guidelines for First Aid"],
    guidance: [
      "Check the scene for fire, electricity, traffic, chemicals, weapons, unstable structures, or animals before approaching.",
      "Use gloves or another barrier when possible.",
      "Check responsiveness, normal breathing, and life-threatening bleeding — take no more than about 10 seconds for this first check.",
      "Treat absent/abnormal breathing, severe bleeding, or another immediate threat before spending time on a detailed exam.",
      "Activate every available route to emergency help. Use speaker mode on a phone while providing care.",
      "Keep monitoring — a person who is initially awake can deteriorate.",
      "Do not enter a scene that is unsafe for you. Do not give food, drink, or oral medicine to someone who isn't fully alert. Do not move someone with a suspected neck/back/hip injury unless staying put is more dangerous.",
    ],
  },
  "Adult CPR/AED": {
    sources: ["American Heart Association, 2025 Adult Basic Life Support Guidelines", "American Red Cross"],
    guidance: [
      "If unresponsive and not breathing (or only gasping), presume cardiac arrest — do not delay CPR trying to find a pulse.",
      "Shout for help, send someone for an AED and to call 911. If alone with a phone, call first, put it on speaker, then start CPR.",
      "Place the person on their back on a firm surface if it can be done safely.",
      "Push hard and fast, center of the chest, 100-120 compressions/minute, at least 2 inches deep (not more than 2.4 inches) in an average adult. Let the chest fully recoil.",
      "If trained and willing, 30 compressions to 2 breaths. If not, continue compression-only CPR.",
      "Turn on the AED as soon as it arrives and follow its prompts; resume compressions immediately when it says to.",
      "Continue until the person shows clear signs of life, a trained responder takes over, the scene becomes unsafe, or you're physically unable to continue.",
    ],
  },
  "Adult choking, 2025 sequence": {
    sources: ["American Heart Association, 2025 Adult Basic Life Support Guidelines"],
    guidance: [
      "Severe obstruction: the person can't speak, cough effectively, or breathe.",
      "Give 5 firm back blows between the shoulder blades, then 5 abdominal thrusts. Repeat until the object clears or the person becomes unresponsive.",
      "If the abdomen can't be encircled, or the person is in late pregnancy, use back blows and chest thrusts instead.",
      "If they become unresponsive, lower them safely and start CPR, beginning with chest compressions. Only remove an object during airway-opening if you can actually see it.",
      "Do not do a blind finger sweep. Do not rely on a suction gadget in place of established first aid.",
    ],
  },
  "Heart attack and aspirin boundaries": {
    sources: ["American Heart Association + American Red Cross, 2024 Guidelines for First Aid"],
    guidance: [
      "Possible signs: chest pain/pressure, shortness of breath, nausea, sweating, lightheadedness, or discomfort in the jaw/back/stomach/neck/arm. Can look different in women, older adults, and people with diabetes.",
      "Treat as time-sensitive — activate emergency response and get to definitive care by the fastest safe route.",
      "Let the person rest in whatever position is most comfortable for breathing.",
      "An alert adult with no known aspirin allergy and no prior instruction against it may chew/swallow 162-325 mg of aspirin while waiting for help. If there's any uncertainty, don't give it.",
      "Never give aspirin to someone unconscious or unable to swallow, and never give another person's prescription nitroglycerin.",
      "If they become unresponsive and stop breathing normally, begin CPR and use an AED.",
    ],
  },
  "Stroke": {
    sources: ["American Heart Association + American Red Cross, 2024 Guidelines for First Aid"],
    guidance: [
      "Use FAST: Face (ask them to smile — look for one-sided droop), Arms (raise both — look for one drifting down), Speech (a simple sentence — listen for slurring or wrong words), Time (if any sign is present, call for help immediately and note when they were last known normal).",
      "Get to definitive care by the fastest safe route — stroke treatment is time-sensitive.",
      "Keep the person under observation and protect their airway. If unresponsive but breathing normally, use the recovery position unless trauma makes that unsafe.",
      "Do not give food, drink, aspirin, or any oral medicine — some strokes are caused by bleeding, and aspirin can make that worse.",
      "Do not wait to see if symptoms improve on their own.",
    ],
  },
  "Severe bleeding and tourniquet": {
    sources: ["American Heart Association + American Red Cross, 2024 Guidelines for First Aid"],
    guidance: [
      "Signs of life-threatening bleeding: pooling blood, spurting or rapidly flowing blood, bleeding that continues despite pressure, or bleeding with drowsiness/dizziness/chest pain/loss of consciousness.",
      "Call for help, use gloves/a barrier, expose the wound, and apply firm continuous direct pressure with gauze or clean cloth.",
      "If direct pressure alone doesn't stop arm/leg bleeding, apply a commercial tourniquet above the wound (never over a joint) and tighten until bleeding stops. Note the time if you can.",
      "Do not loosen or remove a working tourniquet — leave that decision to medical professionals. Do not use a narrow cord, wire, or shoelace as a substitute.",
      "Never use a tourniquet on a neck, chest, abdomen, or groin wound. Keep the person warm and monitor breathing.",
    ],
  },
  "Chest and abdominal trauma (open chest wound)": {
    sources: ["American Heart Association + American Red Cross, 2024 Guidelines for First Aid"],
    guidance: [
      "Treat any open chest wound as immediately life-threatening — activate every available route to definitive care.",
      "Do not remove an embedded object. Stabilize it with bulky dressings.",
      "It's reasonable to leave the wound open to air, use a clean nonocclusive dressing, or use a purpose-made vented chest seal.",
      "Watch breathing continuously. If breathing worsens after any dressing/seal, loosen or remove it.",
      "Do not insert anything into the chest yourself, and do not seal it fully airtight and then stop watching.",
    ],
  },
  "Wound irrigation and when not to close": {
    sources: ["American Heart Association + American Red Cross, 2024 Guidelines for First Aid"],
    guidance: [
      "Control bleeding with direct pressure, then irrigate with running potable water or sterile saline until dirt/debris is gone.",
      "Clean the surrounding skin gently — don't pour harsh antiseptic directly into the wound.",
      "Cover a clean superficial wound with a clean dressing; change it when wet, dirty, or loose.",
      "Watch for spreading redness, swelling, increasing pain, foul drainage, fever, red streaking, or loss of function — signs of infection.",
      "Do NOT close a deep, puncture, bite, crush, or contaminated wound yourself with glue/staples. Do not close an animal or human bite at all — get it evaluated (infection, tetanus, and rabies decisions can be time-sensitive).",
    ],
  },
  "Thermal burns": {
    sources: ["American Heart Association + American Red Cross, 2024 Guidelines for First Aid"],
    guidance: [
      "Stop the burning process and move away from the heat source safely.",
      "Cool the burn immediately with clean running water for 5-20 minutes.",
      "Remove rings/watches/tight items before swelling starts, but don't pull away material stuck to the burn.",
      "After cooling, loosely cover with a clean, nonadherent dry dressing. Protect the person from hypothermia, especially a child or large burn.",
      "Get urgent care for: a full-thickness burn, a partial-thickness burn bigger than the person's palm, a burn on the face/hands/feet/genitals, an electrical or chemical burn, or any sign of smoke inhalation.",
      "Do not use butter, oil, toothpaste, or ice directly on a burn. Do not break blisters or pull off melted-in clothing.",
    ],
  },
  "Poison exposure by eye, skin, inhalation": {
    sources: ["CDC, \"What to Do in a Chemical Emergency\"", "National Capital Poison Center", "American Heart Association + American Red Cross"],
    guidance: [
      "Protect yourself and leave the contaminated area; for an outdoor release, move away and stay upwind. Never enter a confined contaminated space without proper respiratory gear.",
      "Eye: remove contacts if easy, then irrigate with copious room-temperature water for at least 15 minutes, avoiding runoff into the other eye.",
      "Skin: remove contaminated clothing, rinse with copious running water for at least 15 minutes; mild soap can help remove material stuck to skin.",
      "Inhalation: move to fresh air immediately and stay away from the fumes.",
      "Bag contaminated clothing without handling it more than necessary. Seek poison-center or medical guidance by every available route.",
      "Do not try to neutralize an acid with an alkali (or vice versa) on the body — the reaction can generate heat and worsen the injury. Don't become a second victim by entering toxic air.",
    ],
  },
  "Unknown swallowed poison, no induced vomiting": {
    sources: ["National Capital Poison Center", "American Heart Association + American Red Cross"],
    guidance: [
      "If the person collapses, seizes, can't be woken, or has trouble breathing, call 911 immediately and give condition-appropriate first aid.",
      "Remove any remaining substance from the mouth without forcing fingers into the throat.",
      "Preserve the container/label/pill bottle/plant sample or a photo. Note age, weight, substance, possible amount, time, and symptoms.",
      "Call Poison Control (1-800-222-1222) whenever there's any connection available — exact treatment depends on the substance, dose, timing, age, and symptoms.",
      "For a caustic/burning product, Poison Control may advise a small amount of water or milk only if the person is conscious, not convulsing, and can swallow safely — this is not a universal rule, ask first.",
      "Do NOT induce vomiting (ipecac is no longer recommended). Never give anything by mouth to someone drowsy, convulsing, or unresponsive.",
    ],
  },
  "Activated-charcoal limitations (human)": {
    sources: ["National Capital Poison Center, \"Activated Charcoal: An Effective Treatment for Poisonings\""],
    guidance: [
      "Activated charcoal can reduce absorption of some poisons, but it is not a universal antidote.",
      "Do not give it based only on a generic instruction — Poison Control does not recommend unsupervised home charcoal treatment. Emergency doses are much larger than typical supplement tablets and may need monitoring.",
      "Vomiting and aspiration of charcoal into the lungs can cause serious harm, especially if the person is drowsy. It's also contraindicated with GI bleeding, perforation, or blockage.",
      "Burned toast, fireplace charcoal, and barbecue briquettes are NOT medical activated charcoal — never substitute them.",
    ],
  },
  "Opioid overdose and naloxone": {
    sources: ["CDC, \"Lifesaving Naloxone\"", "American Heart Association + American Red Cross"],
    guidance: [
      "Possible signs: can't be woken, slow/absent breathing, gasping, pinpoint pupils, blue/gray lips or nails, choking/snoring/gurgling sounds.",
      "Call 911. If unresponsive and not breathing normally, begin high-quality CPR (trained rescuers should include breaths).",
      "Give naloxone immediately if available, per the product instructions. Continue CPR.",
      "Give another naloxone dose per instructions if there's no response — more than one dose may be needed for fentanyl or other potent opioids.",
      "If normal breathing returns but they're still unresponsive, place them on their side and monitor continuously — naloxone can wear off before the opioid does. CDC advises monitoring until help arrives or for at least 4 hours.",
      "Naloxone won't harm someone whose overdose isn't from opioids, but it also won't reverse that other poisoning — CPR and emergency help still matter.",
    ],
  },
  "Seizure": {
    sources: ["American Heart Association + American Red Cross, 2024 Guidelines for First Aid"],
    guidance: [
      "Note the start time. Help the person to the ground if possible and clear hard/sharp objects away.",
      "Protect the head with something soft, without holding it down. Stay with the person.",
      "When possible, place them on their side once shaking stops so fluids can drain.",
      "Monitor breathing afterward — begin CPR if it's absent or abnormal.",
      "Call 911 for: a first seizure, one lasting over 5 minutes, repeated seizures without returning to normal, a seizure in water, injury/choking/breathing trouble, pregnancy, an infant under 6 months, or no return to baseline within 5-10 minutes.",
      "Do not restrain the person or put anything in their mouth (a person cannot swallow their tongue). Don't give food, liquid, or oral medicine until they're fully alert again.",
    ],
  },
  "Severe allergic reaction / epinephrine": {
    sources: ["American Heart Association + American Red Cross, 2024 Guidelines for First Aid"],
    guidance: [
      "Possible signs: lip/facial swelling, throat-closing sensation, difficulty breathing, widespread hives, vomiting/diarrhea, dizziness, pallor, or reduced alertness after an exposure.",
      "Call 911. If they have a prescribed epinephrine autoinjector, use it immediately in the outer thigh — assist if needed.",
      "If symptoms don't improve and help is more than 5-10 minutes out, a second autoinjector dose may be used per their emergency plan.",
      "Keep monitoring. If they become unresponsive and stop breathing normally, begin CPR and use an AED.",
      "Do NOT substitute an antihistamine for epinephrine — it doesn't reverse airway swelling or shock fast enough. Don't make someone weak/faint/in shock stand or walk.",
      "If no epinephrine is available at all, see the dedicated \"Anaphylaxis when no epinephrine is available\" entry.",
    ],
  },
  "Diabetes, insulin interruption, hypoglycemia": {
    sources: ["American Heart Association + American Red Cross, 2024 Guidelines for First Aid"],
    guidance: [
      "Possible signs of low blood sugar: shakiness, sweating, hunger, dizziness, weakness, behavior change, or confusion in someone with diabetes/a history of low blood sugar.",
      "Check a glucose meter if available and it won't delay care. Give at least 20g of oral glucose — tablets/gel preferred, plain sugar is a reasonable substitute.",
      "Recheck in 10 minutes. Call 911 if they don't improve, can't swallow, have a seizure, or lose consciousness.",
      "Once improved, give a longer-lasting snack/meal if the next meal isn't soon.",
      "Do not put food/drink/gel in the mouth of someone unresponsive or unable to swallow. Do not give insulin for suspected LOW blood sugar.",
    ],
  },
  "Dehydration and oral rehydration": {
    sources: ["World Health Organization + UNICEF, Oral Rehydration Salts", "CDC, Food Poisoning Symptoms"],
    guidance: [
      "Use a commercial oral rehydration salts (ORS) packet mixed exactly per its label with safe water when available.",
      "Give frequent small sips; if vomiting occurs, pause briefly and restart more slowly.",
      "Household fallback ONLY if no ORS packet is available: 1 liter safe water + 6 level teaspoons sugar + 1/2 level teaspoon table salt, stirred until dissolved. Make a fresh batch every 24 hours. More salt/sugar is NOT better — a mixing error can worsen illness, especially in a child.",
      "Separate the ill person's waste and utensils from shared food prep; wash hands with soap and safe water.",
      "Get care fast for: blood in stool, diarrhea over 3 days, fever over 102°F, repeated vomiting that prevents fluids staying down, little/no urine, severe dizziness standing, confusion, severe abdominal pain, or worsening illness in a pregnant person, infant, older adult, or immunocompromised person.",
    ],
  },
  "Fever, respiratory infection, isolation": {
    sources: ["CDC, Signs and Symptoms of Flu", "CDC, Flu: What To Do If You Get Sick"],
    guidance: [
      "Keep the ill person away from others as much as practical; improve ventilation and use a well-fitting mask when close contact can't be avoided.",
      "Encourage rest and safe fluids. Treat pain/fever with a medicine the person can normally take, exactly per the label, without duplicating the same active ingredient across products.",
      "Monitor breathing, alertness, fluid intake, and urine output. Higher risk: young children, adults 65+, pregnant people, and anyone with a chronic condition or weak immunity.",
      "Keep trying to reach care — prescription antivirals are time-sensitive and most helpful when started early for high-risk flu patients.",
      "Danger signs: trouble breathing, blue/gray lips or face, persistent chest/abdominal pain, confusion, seizure, little/no urine, severe weakness, or illness that improves then returns/worsens.",
      "Never give aspirin to anyone 18 or younger with suspected flu (Reye syndrome risk). Don't use leftover antibiotics for a presumed viral illness.",
    ],
  },
  "Medication storage, expiration, continuity": {
    sources: ["U.S. Food and Drug Administration, \"Expiration Dates — Questions and Answers\""],
    guidance: [
      "A labeled expiration date is the period a drug is known to keep its strength/quality/purity when stored as labeled.",
      "Government stockpile extensions are based on lot-specific testing — that does NOT prove an ordinary household bottle is safe or potent years past its date. This is not a \"most drugs are fine for years\" situation.",
      "Use unexpired, correctly stored supply whenever possible. Discard liquids/injectables/pills with unexpected color, particles, odor, moisture damage, or broken seals, unless an official emergency instruction says otherwise for a specific product/lot.",
      "Don't stop or substitute critical maintenance medicine casually — seek a pharmacist, prescriber, or public-health guidance by any available route.",
      "Don't improvise doses to compensate for suspected potency loss.",
    ],
  },
  "Pediatric/infant CPR and choking": {
    sources: ["American Heart Association + American Academy of Pediatrics, 2025 Guidelines for CPR and Emergency Cardiovascular Care"],
    guidance: [
      "Infant choking: alternate 5 back blows with 5 chest thrusts (heel of one hand) — NOT abdominal thrusts, which carry injury risk in infants.",
      "Child choking: now aligned with the adult approach — alternate 5 back blows with 5 abdominal thrusts until the object clears or the child becomes unresponsive.",
      "Pediatric CPR: compressions at 100-120/minute, about one-third of chest depth. Give rescue breaths early — pediatric cardiac arrest more often starts as a breathing problem than a sudden cardiac one, unlike many adult arrests.",
      "This is a 2025 update — if you learned pediatric CPR/choking before then, the sequence has changed; don't rely on older training alone.",
    ],
  },
  "Fractures, splints, circulation checks": {
    sources: ["American Red Cross, \"Muscle, Bone and Joint Injury\" and \"Fractures\""],
    guidance: [
      "Treat any suspected fracture as real until ruled out. Do not try to realign or push a bone back into place — keep the limb in the position it was found.",
      "If trained and professional help will be delayed, splint the area, extending past the joints above and below the injury, with padding, secured firmly but not tight enough to cut off circulation.",
      "Check circulation regularly after splinting — toes/fingers beyond the splint should stay pink and warm. If they turn pale, blue, or cold, the splint is too tight.",
      "Do not move the person more than necessary.",
    ],
  },
  "Head, neck and spinal injury": {
    sources: ["American Red Cross, \"Head, Neck, and Spinal Injury\""],
    guidance: [
      "If a head, neck, or spinal injury is suspected, tell the person not to move and to answer verbally rather than nodding/shaking their head. Keep them in the position found.",
      "Exceptions where movement is necessary: to perform CPR, or if bleeding can't otherwise be controlled.",
      "Do not remove a helmet unless necessary to give CPR. Keep an infant/child in their car seat unless removal is necessary for CPR.",
      "Why this matters: improper handling of a real spinal injury can cause permanent paralysis that proper immobilization would have prevented.",
    ],
  },
  "Smoke inhalation and carbon monoxide": {
    sources: ["CDC, \"Clinical Guidance for Carbon Monoxide Poisoning Following Disasters and Severe Weather\""],
    guidance: [
      "CO poisoning symptoms: headache, dizziness, weakness, nausea, vomiting, chest pain, altered mental status — progressing at higher exposure to confusion, fainting, seizures, or coma.",
      "Onset is dose-dependent: low-level exposure can take up to ~2 hours to cause symptoms; high-level exposure can do it in ~5 minutes.",
      "Get the person into fresh air as soon as it's safe to do so.",
      "If unconscious, place them on their side (recovery position) to reduce choking/aspiration risk. Begin CPR if they're not breathing. Call 911 immediately.",
      "This is first-aid-layer only — hospital oxygen treatment is a clinical step beyond what you can do in the field, but getting them to that care fast is the point.",
    ],
  },
  "Snakebite and venomous arthropods (human)": {
    sources: ["CDC/NIOSH, \"Venomous Snakes at Work\"", "American Red Cross, \"Snake Bites\""],
    guidance: [
      "Do not apply ice or a tourniquet. Do not cut the wound, apply suction, or use electric shock on it.",
      "Do not take aspirin, ibuprofen, or naproxen (bleeding-risk increase). Do not drink caffeine or alcohol.",
      "Do not try to catch, trap, or kill the snake — that risks another bite and wastes critical time.",
      "Do not drive yourself to care — dizziness or loss of consciousness can follow a bite.",
      "Keep the person calm and as still as possible and get emergency transport.",
    ],
  },
  "Tick bite, rabies exposure, animal bite (human)": {
    sources: ["CDC, \"Rabies Post-exposure Prophylaxis Guidance\"", "CDC Rabies Prevention and Control"],
    guidance: [
      "For any bite or scratch from wildlife or an unfamiliar animal, wash the wound immediately with soap and water for a full 15 minutes to physically flush out virus particles. A virucidal agent like povidone-iodine helps if available.",
      "Consult a healthcare provider after any such bite. Severity, location (bites near the head are higher-risk), and the animal species (bats, raccoons, skunks, foxes are high-risk US rabies vectors) all factor into whether rabies post-exposure prophylaxis (wound care plus immune globulin and vaccine series) should start immediately.",
      "For a tick bite, CDC maintains an interactive \"Tick Bite Bot\" tool to help decide when it needs medical follow-up.",
      "For ordinary bite-wound care and infection risk beyond rabies, see the dedicated \"Dog/animal bite wound care and infection risk\" entry.",
    ],
  },
  "Pesticide exposure": {
    sources: ["U.S. Environmental Protection Agency, \"First Aid in Case of Pesticide Exposure\""],
    guidance: [
      "Skin: drench the area with water and remove contaminated clothing, then wash skin and hair thoroughly with soap and water.",
      "Eyes: hold the eyelid open and flush gently with clean running water for at least 15 minutes — eyes absorb pesticides faster than any other exposed body part, so speed matters.",
      "Inhalation: get to fresh air immediately.",
      "Ingestion: do NOT induce vomiting unless Poison Control or the product's own label specifically says to.",
      "Always follow the specific first-aid instructions on the product label, and bring the label/container to any medical visit.",
      "Poison Control: 1-800-222-1222. National Pesticide Information Center: 1-800-858-7378.",
    ],
  },
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
