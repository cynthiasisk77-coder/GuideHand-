// Full field-guidance text for topics that have been fully researched and sourced.
// Keyed by the exact topic title in categories.ts. Topics not listed here show
// as "not yet written" in the app rather than being silently blank.

export interface ArticleBody {
  sources: string[];
  guidance: string[]; // each entry renders as one guidance line/paragraph
}

export const ARTICLE_BODIES: Record<string, ArticleBody> = {
  "Reading a paper/topographic map": {
    sources: ["U.S. Army FM 3-25.26, Map Reading and Land Navigation"],
    guidance: [
      "Identify the map's scale, contour interval, and magnetic declination before moving.",
      "Orient the map to true north using declination, not magnetic north alone, when precision matters.",
      "This field manual is public domain and explicitly extends beyond military use into outdoor recreation, emergency response, and wilderness survival.",
    ],
  },
  "Compass use and orientation": {
    sources: ["U.S. Army FM 3-25.26", "Mississippi State University Extension"],
    guidance: [
      "Orient map and compass together before moving.",
      "Take a back-bearing periodically to confirm you haven't drifted off course.",
      "Do not navigate near large metal objects, vehicles, or power lines — they deflect the needle.",
    ],
  },
  "Land navigation without GPS": {
    sources: ["U.S. Army FM 3-25.26"],
    guidance: [
      "Combine dead reckoning (direction plus distance from a known point) with terrain association (matching visible features to the map) rather than relying on either alone.",
      "Recalibrate your pace count for the terrain you're actually walking — it changes on hills, snow, or heavy brush.",
    ],
  },
  "Identifying safe vs. unsafe routes during a disaster": {
    sources: ["Ready.gov/FEMA"],
    guidance: [
      "Identify several possible destinations in different directions and know primary and alternate routes in advance.",
      "Always follow local officials' instructions over a pre-planned route — conditions change.",
      "Don't treat a downloaded offline map's \"primary route\" as guaranteed passable — it can't show live closures, downed lines, or flooding.",
    ],
  },
  "Finding cardinal directions without a compass": {
    sources: ["U.S. Army FM 3-25.26, Appendix F (Orienteering)"],
    guidance: [
      "Shadow-tip method: push a straight ~1-meter stick into level ground, mark the shadow tip, wait 10-15 minutes, mark the new tip.",
      "The first mark is west. Standing with that mark to your left: north is ahead, east is to your right, south is behind you.",
      "This is an approximation for orientation, not a substitute for a compass and map when accuracy really matters (steep terrain, whiteout, long distances).",
    ],
  },
  "No cellular service or internet": {
    sources: ["FCC/FEMA, \"Tips for Communicating During an Emergency\""],
    guidance: [
      "Networks get congested during emergencies — redialing repeatedly makes it worse for everyone.",
      "If a call fails, wait before redialing; try texting instead, since texts often get through when calls don't.",
      "Keep a battery- or hand-crank-powered NOAA Weather Radio as an internet-independent information source.",
    ],
  },
  "NOAA Weather Radio": {
    sources: ["NOAA", "National Weather Service"],
    guidance: [
      "NOAA Weather Radio All Hazards broadcasts continuous NWS warnings/watches/forecasts 24/7 over 1,000+ transmitters, plus non-weather hazards (earthquakes, chemical releases, AMBER alerts, 911 outages).",
      "It needs a dedicated receiver on one of seven VHF frequencies — not a phone app, no cell service or Wi-Fi or grid power needed if battery/crank powered.",
      "Keep a battery-powered or hand-crank receiver in your kit and know your area's frequency in advance.",
    ],
  },
  "AM/FM emergency broadcasts": {
    sources: ["FEMA, Integrated Public Alert and Warning System (IPAWS)"],
    guidance: [
      "The Emergency Alert System (EAS) delivers authenticated alerts via AM/FM/satellite radio and broadcast/cable/satellite TV — one path of FEMA's IPAWS, alongside Wireless Emergency Alerts and NOAA Weather Radio.",
      "IPAWS authenticates and validates alerts before they reach any of these paths.",
      "Keep a battery-powered AM/FM radio as a backup needing no cell network, data plan, or working tower.",
    ],
  },
  "Emergency alert verification and rumor control": {
    sources: ["FEMA"],
    guidance: [
      "FEMA maintains an official \"Common Disaster-Related Rumors\" page, reactivated for each major disaster, to correct false claims.",
      "IPAWS only distributes alerts already authenticated by an authorized public safety official — an unverified message forwarded on social media isn't the same as a real IPAWS/WEA/EAS alert.",
      "Treat an alert as verified only if it came through IPAWS-linked channels or your local emergency-management agency's official channel. Check fema.gov/disaster/recover/rumor-response during declared disasters before sharing unverified claims.",
    ],
  },
  "Active shooter / active attacker response": {
    sources: ["CISA, \"Active Shooter Preparedness\""],
    guidance: [
      "RUN — evacuate if there's an accessible escape path, using cover and concealment, moving away from the threat.",
      "HIDE — if evacuation isn't possible, get into a secure area with a lockable door, or find cover to break the attacker's line of sight.",
      "FIGHT — as an absolute last resort, when neither running nor hiding is possible, commit fully to incapacitating the attacker.",
      "When it's safe to do so, call 911 — give your location, the number of shooters if known, and a physical description.",
      "Most active-shooter incidents are over in 10-15 minutes, before law enforcement typically arrives — this is why individual preparedness matters.",
      "Don't assume \"run\" is always safest without assessing the actual exits and the threat's location first.",
    ],
  },
  "Suspicious package or explosion threat": {
    sources: ["U.S. Department of Homeland Security", "Ready.gov"],
    guidance: [
      "Report a suspicious or unattended item to authorities immediately (call 911) with as much detail as possible.",
      "Seek distance and cover; evacuate if it's safe to move.",
      "Do not approach, touch, or inspect the item. Do not use a two-way radio or cell phone near a suspected device — the transmission could trigger detonation. Do not congregate near the scene.",
    ],
  },
  "Situational awareness basics": {
    sources: ["U.S. Department of Homeland Security, \"See Something, Say Something\""],
    guidance: [
      "Report specific, unusual behavior (not a person's identity or appearance alone) to local police via the non-emergency or emergency line as appropriate.",
      "This is narrowly about reporting suspicious activity to authorities — it's the official scope of this specific guidance, not a complete personal-safety awareness course.",
    ],
  },
  "Home intrusion / break-in response": {
    sources: ["National Crime Prevention Council"],
    guidance: [
      "Prevention: solid-core or metal exterior doors, deadbolts with at least a 1.5-inch throw, wide-angle door viewers at more than one height, trimmed shrubs near entry points, motion-activated lighting.",
      "Never hide a spare key outside (under a mat, in a planter, on a ledge).",
      "If a break-in occurs, call police immediately.",
    ],
  },
  "Weapon storage safety around children": {
    sources: ["American Academy of Pediatrics"],
    guidance: [
      "The safest home for a child is one without a firearm.",
      "If a household keeps one, store it unloaded and locked, with ammunition locked separately from the firearm.",
      "Roughly a third of American children live in homes with firearms, and a meaningful share of those homes have at least one unlocked firearm — this is a real, common gap, not a hypothetical one.",
    ],
  },
  "Lawful self-defense boundaries (varies by state)": {
    sources: ["National Conference of State Legislatures (NCSL)"],
    guidance: [
      "Stand-your-ground states remove the duty to retreat before using force (including deadly force) in self-defense if lawfully present and reasonably believing force is necessary against imminent death or serious injury.",
      "Duty-to-retreat states require attempting to safely retreat before using deadly force, when possible — typically except inside one's own home.",
      "Castle doctrine specifically covers the home: it generally removes the duty to retreat when defending your residence against an unlawful intruder, and exists in some form in most states.",
      "State legislatures amend these laws regularly — this is framework only. Never treat a specific state's current rule as settled without checking NCSL's live tracker or consulting an attorney.",
    ],
  },
  "Civil unrest, riot, violent demonstration nearby": {
    sources: ["ACLU, \"Know Your Rights: Protests\""],
    guidance: [
      "Before attending, or if unrest develops near you, plan a route and a backup way out. Look after physical needs (rest, water).",
      "Put your phone in airplane mode when not actively communicating — this reduces signals it transmits and limits location tracking.",
      "Think before posting photos/video that could identify bystanders — that footage can be used to locate and target them.",
      "Keep a physical/backup way out in mind at all times; avoid the crowd's center if it turns confrontational; keep phone battery reserved for real emergencies.",
    ],
  },
  "Curfew and checkpoint legal guidance by jurisdiction": {
    sources: ["ACLU, \"Know Your Rights: Stopped by Police\"", "NHTSA-aligned checkpoint guidance"],
    guidance: [
      "Stop, stay calm, keep hands visible, comply with lawful instructions, and provide requested ID/vehicle documents — stop and let them do their job.",
      "You have the right to remain silent (you may say so out loud) and you don't have to consent to a search, though officers may still conduct one under certain legal authority.",
      "Do not attempt to drive around or through a checkpoint. Do not argue or physically resist, even if you think the stop is unjustified — raise that afterward, through a lawyer, not at the checkpoint.",
      "The specific legal authority behind a given curfew (who can declare one, penalties) is genuinely jurisdiction-specific and isn't covered by this general behavioral guidance.",
    ],
  },
  "Flood-contaminated food and container salvage": {
    sources: ["USDA Food Safety and Inspection Service (FSIS)"],
    guidance: [
      "Discard any food in a non-waterproof container that may have contacted floodwater — plastic wrap, cardboard, screw-caps, snap lids, pull-tops, and crimped caps can all be seeped past.",
      "Discard cardboard juice/milk/formula boxes and home-canned food that contacted floodwater — they can't be reliably cleaned and sanitized.",
      "Discard any perishable food that was above 40°F for two hours or more. When in doubt, throw it out — never taste food to judge safety.",
    ],
  },
  "Damaged/bulging/rusted cans": {
    sources: ["USDA Food Safety and Inspection Service"],
    guidance: [
      "A small dent in an otherwise sound can is generally fine. A deep dent you can lay a finger into should be discarded, especially on a seam.",
      "Surface rust you can rub off with a finger is not itself disqualifying; rust visible inside the can once opened means discard.",
      "Never buy or eat from a bulging can — bulging signals bacterial gas production inside.",
    ],
  },
  "Outdoor stove, grill, and fire cooking": {
    sources: ["CPSC", "National Fire Protection Association"],
    guidance: [
      "Never use a charcoal grill, propane grill, camp stove, or generator inside a home, garage, basement, crawlspace, tent, or any partially enclosed space — including a porch, breezeway, or carport.",
      "Ventilation (open windows, fans) cannot be relied on to make indoor or enclosed use safe.",
      "Don't \"just crack a window\" as a substitute for full outdoor use — there's no accepted middle ground here.",
    ],
  },
  "Safe cooking temperatures": {
    sources: ["FoodSafety.gov"],
    guidance: [
      "Poultry (whole, parts, ground, stuffing): 165°F.",
      "Ground beef/pork/veal/lamb: 160°F.",
      "Whole cuts of beef/pork/veal/lamb (steaks, chops, roasts): 145°F with a 3-minute rest.",
      "Fish with fins: 145°F, or cooked until flesh is opaque and separates easily with a fork.",
      "Use a food thermometer — color is not a reliable indicator; some cooked meats stay pink even at a safe temperature.",
    ],
  },
  "Cross-contamination without running water": {
    sources: ["CDC", "USDA/FSIS"],
    guidance: [
      "Wash hands 20 seconds with soap and water before/after handling food (see \"Handwashing with scarce water\" for the without-water version).",
      "Keep raw meat/poultry/seafood/eggs separate from ready-to-eat food.",
      "Use separate cutting boards for raw protein versus produce/bread.",
    ],
  },
  "Infant feeding without safe water or refrigeration": {
    sources: ["CDC, Infant and Child Feeding in Emergencies"],
    guidance: [
      "Breastfeeding is the safest option during an emergency.",
      "If formula feeding, ready-to-feed liquid formula (no mixing, sterile single-use containers) is safer than powdered formula in a disaster.",
      "If only powdered formula is available, use bottled water until tap water is confirmed safe, following exact label amounts. If safe water isn't available to clean bottles/nipples, use disposable cups instead of bottles.",
      "Never mix powdered formula with water of unknown safety — this can make an infant seriously ill and, in some cases, can be fatal.",
    ],
  },
  "Thawing, refreezing, ice-crystal rule": {
    sources: ["CDC", "FoodSafety.gov"],
    guidance: [
      "Food may be safely refrozen if it still has ice crystals or is at 40°F or below — quality may suffer, especially meat/poultry/dairy.",
      "Exception: discard ice cream/frozen yogurt if softened at all, even slightly — they don't refreeze safely.",
      "A full freezer holds a safe temperature about 48 hours with the door closed (24 hours if half full). Never taste food to judge safety.",
    ],
  },
  "Dry ice ventilation and handling": {
    sources: ["Cornell University EHS", "NIH Office of Research Services"],
    guidance: [
      "Store dry ice in a well-ventilated area in a container designed to vent gas — never seal it airtight, since pressure buildup can rupture the container.",
      "CO2 is heavier than air and displaces oxygen in unventilated spaces; handle with gloves or tongs, never bare hands (frostbite/contact-burn risk).",
      "If transporting in a vehicle, use only small quantities and keep fresh air flowing for the whole trip.",
    ],
  },
  "Rodent/insect contamination": {
    sources: ["U.S. Food and Drug Administration"],
    guidance: [
      "Packaged or stored food showing evidence of pest contact — droppings, urine, live or dead insects, larvae, webbing, gnawing, or damaged packaging — should generally be discarded rather than salvaged.",
    ],
  },
  "Handwashing with scarce water": {
    sources: ["USDA", "CDC"],
    guidance: [
      "Use soap with a small amount of clean (bottled if needed) water when available.",
      "When water is scarce, an alcohol-based hand sanitizer with at least 60% alcohol is the CDC-recommended alternative — apply to the palm and rub over all hand/finger surfaces until dry. Moist towelettes are a secondary option.",
      "Wash or sanitize before/after handling food, after the toilet, after changing a diaper, and after coughing/sneezing/nose-blowing.",
    ],
  },
  "Latrine siting": {
    sources: ["CDC, WASH-related Emergencies", "community emergency-toilet guides"],
    guidance: [
      "A commonly cited siting rule: place a latrine or portable toilet at least 100 feet from surface water (lakes, rivers, streams) and at least 100 feet downhill or away from any drinking-water source, home, or campsite.",
      "This 100-foot figure is well-established in general private-well/septic-setback guidance but should be confirmed against your local health department's actual required setback.",
    ],
  },
  "Water, electricity, gas, propane shutoffs": {
    sources: ["Ready.gov / FEMA"],
    guidance: [
      "Every household member should know how to shut off gas, water, and electricity — gas leaks and electrical sparking cause many post-disaster fires.",
      "If you smell or hear gas leaking, open a window if safe, then leave the area on foot immediately. Never turn gas back on yourself once shut off — only a professional or the utility should do that.",
      "For water, find the main shutoff valve and turn it clockwise until fully closed. Replace a valve that's rusted or hard to close, before an emergency, not during one.",
    ],
  },
  "Generator electrical connection / backfeed prevention": {
    sources: ["Safe Electricity", "National Electrical Code (NFPA 70)"],
    guidance: [
      "Plugging a generator into household wiring via a wall outlet with an improvised cord (a \"suicide cord\") sends power backward through the house wiring and out through the utility transformer, stepped up to line voltage — thousands of volts.",
      "This has killed utility line workers who reasonably assumed a de-energized line was safe to touch during storm restoration.",
      "Never connect a generator to household wiring without a code-compliant transfer switch — otherwise power appliances directly through the generator's own outlets and proper extension cords.",
    ],
  },
  "Downed power lines and electrified water": {
    sources: ["Electrical Safety Foundation International", "multiple electric utilities"],
    guidance: [
      "Always assume a downed line is energized, even if it looks dead or isn't sparking.",
      "Stay back — utility-published safe distances vary from about 10 feet up to 30-50+ feet; a downed line can energize the ground itself for many feet around it, especially when wet.",
      "Never touch a downed line or anything it's contacting, and never use any object (including wood or rope) to move it — normally non-conductive materials conduct electricity when even slightly wet.",
      "Never touch a person in contact with a downed line — call 911 and the utility instead.",
    ],
  },
  "Appliance reconnection and surge risk": {
    sources: ["General guidance consistent with CPSC home electrical-safety resources"],
    guidance: [
      "Devices left switched on during an outage draw power immediately when grid power returns, which can contribute to surges.",
      "Unplug sensitive electronics during an extended outage, especially anything not on a surge protector, and shut down equipment that would be hazardous if it restarted unexpectedly.",
    ],
  },
  "Lithium battery heat/cold/fire/storage": {
    sources: ["CPSC", "New York State Division of Homeland Security and Emergency Services"],
    guidance: [
      "Lithium-ion batteries can enter thermal runaway — a self-sustaining reaction generating heat rapidly and igniting the flammable electrolyte — during use, storage, or charging.",
      "Store at a moderate charge (roughly 30-60%) for long-term storage, in a cool, dry, ventilated area, ideally near a smoke detector.",
      "Never leave batteries in a hot car; avoid very cold storage or charging, which stresses the pack.",
      "If a lithium battery fire starts, it spreads quickly, water may not extinguish it, and standard extinguishers generally don't work — evacuate and call the fire department rather than fighting it yourself.",
    ],
  },
  "Vehicle charging without CO exposure": {
    sources: ["National Fire Protection Association"],
    guidance: [
      "Never run a fueled engine or motor (a car, generator, or similar) indoors, even in a garage with the door open — carbon monoxide buildup.",
      "This does NOT apply to an EV's charging process itself, which produces no carbon monoxide — EV charging's real hazards are electrical (proper installation) and, rarely, battery fire in enclosed parking structures, not CO.",
    ],
  },
  "Jump-start sequence by vehicle type": {
    sources: ["AAA"],
    guidance: [
      "Both vehicles in park (or neutral + parking brake for manual), ignition off, accessories/devices off. Remove jewelry — batteries contain acid and metal can create an unintended ground path.",
      "Connect positive (red) clamp to the dead battery's positive terminal, then the other positive clamp to the good battery's positive terminal.",
      "Connect negative (black) clamp to the good battery's negative terminal, then connect the final negative clamp to an unpainted metal surface in the dead vehicle's engine bay — NOT its battery's negative terminal directly. Batteries vent flammable hydrogen gas, and sparking right at the battery risks igniting it.",
    ],
  },
  "Tire change and roadside visibility": {
    sources: ["NHTSA TireWise program", "general roadside-safety practice"],
    guidance: [
      "Pull as far off the roadway as possible and use hazard lights.",
      "If visibility is poor (heavy rain, fog, snow) or the shoulder is narrow with fast traffic passing close, the safer choice is to stay inside the vehicle, seatbelt fastened, and call for roadside assistance rather than attempt the change there.",
    ],
  },
  "Severe thunderstorm, straight-line wind, hail": {
    sources: ["National Weather Service"],
    guidance: [
      "A severe thunderstorm has winds of at least 58 mph and/or hail at least 1 inch in diameter.",
      "At home: go to your secure/safe location, bringing pets if time allows. At work/school: stay away from windows and avoid large open-span rooms (cafeterias, gyms, auditoriums) — roof-collapse risk.",
      "Outdoors: get into a sturdy building immediately — sheds/storage buildings are not safe, and sheltering under a tree can be deadly. Move vehicles under cover if time permits.",
    ],
  },
  "Winter storm, blizzard, ice storm": {
    sources: ["CDC", "Ready.gov"],
    guidance: [
      "Limit time outside — cold, ice, and power/communication failures compound danger.",
      "Keep at least 1 gallon of water per person per day (3-day minimum), non-perishable food, and a vehicle kit (jumper cables, traction material, flashlight, warm clothes, blankets, water, snacks).",
      "If stranded, staying with the car is generally safer than walking for help in poor visibility/icy conditions; run the engine/heater ~10 min/hour, crack a window, and make sure snow isn't blocking the exhaust pipe (CO risk).",
      "Reduce speed significantly on icy roads.",
    ],
  },
  "Landslide and mudflow": {
    sources: ["USGS", "CDC"],
    guidance: [
      "Warning signs: new cracks/bulges in ground or foundations, soil pulling away from a foundation, tilting fences/poles/trees, broken utility lines, a rapid rise in creek muddiness or a stream that suddenly stops flowing, and a rumbling sound like a freight train as a slide begins.",
      "Before: monitor NOAA Weather Radio for intense-rainfall warnings — most debris-flow deaths happen to people asleep, so stay alert during heavy prolonged rain.",
      "During: in a single-story home, get onto sturdy furniture and hold on. In a two-story home, go upstairs to the side facing away from the slope. Outdoors, run perpendicular to the slide's path — never try to outrun it straight downhill or run uphill into it.",
    ],
  },
  "Dam or levee failure": {
    sources: ["FEMA"],
    guidance: [
      "Know whether your home sits in a dam or levee inundation zone (ask your local emergency management office, which maintains inundation maps).",
      "Have a family evacuation plan in place before an incident.",
      "If officials issue a dam/levee evacuation order, treat it as extremely time-critical — this flooding can arrive far faster than a typical river flood.",
    ],
  },
  "Drought and prolonged water shortage": {
    sources: ["NOAA National Integrated Drought Information System (NIDIS)", "USGS"],
    guidance: [
      "Fix leaks promptly — even a small faucet leak can waste roughly 20 gallons a day. Reuse water where reasonable and prioritize water-efficient appliances.",
      "Prolonged drought can lower the water table enough to fail a private well outright — relevant for the roughly 1 in 8 US households relying on one.",
      "FEMA's baseline emergency water figure is 1 gallon per person per day for a ~3-day emergency; a multi-week drought calls for planning noticeably more, though no single agency publishes one universal multi-week number.",
    ],
  },
  "Volcanic ash": {
    sources: ["USGS Volcano Hazards Program"],
    guidance: [
      "Ash inhalation is at minimum an irritant and poses more serious risk to children, older adults, and people with respiratory/cardiovascular disease.",
      "Shelter indoors somewhere ash-free — close doors/windows and seal significant gaps.",
      "Anyone with a respiratory/cardiac condition should keep prescribed medication on hand and use as directed.",
      "If ash gets into water, let it settle and use the clear water from above the settled layer.",
    ],
  },
  "Unknown industrial smoke or fire": {
    sources: ["PHMSA Emergency Response Guidebook", "Commonwealth of Massachusetts"],
    guidance: [
      "Follow official instructions immediately — evacuate or shelter-in-place, whichever is ordered. Do not try to identify the chemical yourself or decide your own response based on smell or appearance.",
      "If in a vehicle and can't safely leave the area, shelter in a substantial building if reachable; if you must stay in the vehicle, close all windows/vents and shut off the AC/heater to avoid drawing outside air in.",
      "Visible smoke alone doesn't tell you what's burning or what protective action is correct.",
    ],
  },
  "Train/truck hazardous-material release": {
    sources: ["PHMSA Emergency Response Guidebook", "Commonwealth of Massachusetts"],
    guidance: [
      "Follow official instructions immediately, whether evacuate or shelter-in-place — do not try to identify the chemical yourself.",
      "If in a vehicle and cannot safely leave, shelter in a substantial building if reachable; otherwise close all windows/vents and shut off AC/heater.",
    ],
  },
  "Carbon-monoxide alarm or symptoms (general)": {
    sources: ["National Fire Protection Association"],
    guidance: [
      "If a CO alarm sounds, get everyone (and pets, if safe) to fresh air immediately — outdoors or an open window — then call 911 or the fire department from there.",
      "Do not search for the source yourself, and do not re-enter until responders or a qualified technician confirms it's safe.",
      "Symptoms (headache, dizziness, weakness, nausea, confusion) demand the same immediate fresh-air-and-call response even without a working alarm.",
    ],
  },
  "Basic knots for emergencies": {
    sources: ["Scouting America"],
    guidance: [
      "Bowline: forms a loop at a rope's end that won't slip or tighten under load — historically used for rescue (looping around a person's torso to hoist them to safety).",
      "Clove hitch: ties a rope to a post or pole; the standard start/finish for most lashings.",
      "Square knot: joins two ropes of similar diameter.",
    ],
  },
  "Rope and cordage strength basics": {
    sources: ["Cordage Institute Guideline CI 1401-15"],
    guidance: [
      "Safe Working Load (SWL) is the Minimum Breaking Load divided by a safety factor — commonly 5:1 to 12:1 for non-critical use, as strict as 1:15 when life/limb is at risk. Working load is roughly 15-25% of rated tensile strength, not the full breaking strength.",
      "Tying a knot cuts a rope's effective strength by roughly half compared to unknotted rope.",
      "A dynamic/sudden (shock) load — dropping, jerking, swinging a load — can multiply the force to several times the equivalent static load. Reduce working load further for any life-safety use.",
    ],
  },
  "Boarding up windows (basic carpentry)": {
    sources: ["FEMA/Ready.gov"],
    guidance: [
      "Permanent storm shutters offer the best protection; where unavailable, 5/8-inch plywood cut to fit each window in advance (before the storm) is the standard alternative.",
      "Taping windows does NOT protect the glass from shattering — it only makes the resulting shards larger and more dangerous. Tape is not an acceptable substitute for shutters or plywood.",
      "Roof-to-frame straps or clips are also part of overall storm hardening FEMA recommends.",
    ],
  },
  "Sharpening tools and knives safely": {
    sources: ["OSHA", "CPSC"],
    guidance: [
      "Most hand-tool injuries come from misuse or poor maintenance, not the tools themselves — a dull blade is actually more dangerous than a sharp one, since it requires more force and is more likely to slip.",
      "Keep sharpening stones lubricated (water or the manufacturer's specified lubricant) and don't let them dry out; soak a dry stone before use.",
      "Wear cut-resistant gloves when there's meaningful risk of a slip.",
    ],
  },
  "Legal/regulatory boundaries on foraging and trapping": {
    sources: ["Washington Department of Fish & Wildlife", "36 CFR § 13.480"],
    guidance: [
      "State fish and wildlife agencies are the primary regulatory authority over fishing, hunting, and trapping, and can issue emergency rules on short notice.",
      "Federal subsistence hunting/trapping on certain federal lands is governed directly by federal regulation (36 CFR § 13.480).",
      "Do not assume any emergency automatically waives license, season, or method requirements — check your state wildlife agency's current emergency-rule status, or a game warden, before relying on this as a food source outside normal regulations.",
    ],
  },
  "Identifying unsafe/contaminated fishing waters": {
    sources: ["U.S. Environmental Protection Agency"],
    guidance: [
      "States/territories/tribes issue fish consumption advisories for specific bodies of water based on contaminant testing (mercury, PFAS, PCBs, DDT are most common) — these bioaccumulate with repeated exposure.",
      "There is no universal \"look at the water and know it's safe\" rule. Check your state/local health department's current advisory for the specific body of water rather than assuming clean-looking water is safe.",
    ],
  },
  "Field-dressing and safe handling of wild game": {
    sources: ["New Hampshire Fish and Game", "Washington Department of Fish & Wildlife", "Penn State Extension"],
    guidance: [
      "Field dress within about an hour of harvest; keep the carcass off the ground and use clean utensils.",
      "Cool the carcass below 40°F as quickly as possible and keep it cool through processing and transport — this is what actually slows bacterial growth.",
      "Avoid an animal that appeared sick before harvest. Wear rubber gloves and a face mask while gutting/butchering.",
      "Never eat the brain, eyeballs, spinal cord, spleen, liver, or lymph nodes, and avoid cutting through bone/spinal column during processing — reduces exposure to chronic wasting disease and other tissue-concentrated risks.",
    ],
  },
  "Most dangerous look-alike poisonous plants": {
    sources: ["National Capital Poison Center"],
    guidance: [
      "Poison hemlock and water hemlock closely resemble edible wild carrot, parsley, and parsnip, and are among the most acutely toxic plants in North America — water hemlock can cause seizures and death from a small ingested amount.",
      "Treat \"looks like a wild carrot/parsley relative\" as a hard stop, not a feature to identify around.",
    ],
  },
  "Universal edibility test, with real limitations stated plainly": {
    sources: ["General bushcraft/survival-skills literature critiquing the test"],
    guidance: [
      "The classic \"put a small piece on your lip, wait, eat a small amount, wait more\" test is widely popularized but has real problems: it's often presented incompletely online, doesn't reliably catch every dangerous plant, and gets casually treated as safe for recreational foraging, which it is not.",
      "It exists only as a last-resort survival procedure, never a casual identification method. The U.S. Air Force's \"Rule of Eight\" is a more rigorous revision.",
      "Do NOT treat a \"pass\" as proof a plant is safe in normal quantities, and don't use it as a substitute for actual identification.",
    ],
  },
  "Plants never to touch or burn": {
    sources: ["CDC/NIOSH"],
    guidance: [
      "Never burn poison ivy, poison oak, or poison sumac, or brush piles that may contain them.",
      "Burning releases urushiol (the same oil causing skin rash) into the smoke — inhaling it can cause severe internal respiratory reactions, not just external rash.",
      "If burning contaminated brush is truly unavoidable, use at minimum a NIOSH-certified R-95/P-95-or-better particulate respirator.",
    ],
  },
  "Poison ivy, oak, and sumac: skin contact and rash": {
    sources: ["CDC", "American Academy of Dermatology"],
    guidance: [
      "Rinse exposed skin with any water you can find as soon as possible — plain water alone removes most of the oil (urushiol) if you do it within 10-30 minutes. Speed matters far more than having soap.",
      "No water yet? Rubbing alcohol, hand sanitizer, or briskly wiping with a dry cloth can strip oil off skin as a stopgap until you reach water.",
      "The oil is what spreads it, not the rash fluid itself — wash exposed clothing, shoes, tools, and pet fur too, or you can keep re-exposing yourself after you've already cleaned your skin.",
      "For itching without any products on hand: a cool water soak or compress, or a paste of baking soda or plain oatmeal mixed with water, calms the skin.",
      "Loose, breathable clothing over the area cuts down on friction and spreading.",
      "Get real medical care if the rash covers a large area, involves the face, eyes, or genitals, or shows signs of infection — increasing redness, warmth, pus, or fever.",
    ],
  },
  "Getting water from vegetation (solar still method)": {
    sources: ["U.S. Army Survival Manual, FM 21-76", "Ready.gov"],
    guidance: [
      "Tie a clear plastic bag around a leafy, living branch or clump of grass in direct sunlight, with the lowest corner of the bag dipping slightly below the rest so condensation collects there.",
      "The plant's own moisture condenses inside the bag as it heats up in the sun. This yields small amounts of drinkable water over several hours — a supplement, not a fast or high-volume source.",
      "This works with almost any living, unsprayed vegetation, which is what makes it safer than trying to identify a specific plant to cut and drink from — you don't need to know the species.",
      "Avoid using plants you know are toxic (like oleander) for this. Ordinary grass, leaves, or non-toxic shrubs and trees are fine.",
      "Treat this water the same as any other found water source if there's any doubt — boil or otherwise purify it before drinking.",
    ],
  },
  "Dandelion: a common, safe wild edible": {
    sources: ["USDA PLANTS Database", "university extension services"],
    guidance: [
      "Dandelion (Taraxacum officinale) grows across nearly all of North America and Europe — lawns, fields, sidewalk cracks, disturbed soil — and is one of the easiest wild plants to identify with real confidence.",
      "Look for a low rosette of jagged-edged leaves, a hollow stem with milky sap, and a bright yellow flower that later turns into a white puffball seed head. No dangerous plant is commonly mistaken for it.",
      "The entire plant — leaves, flowers, and root — is edible and non-toxic, unlike most wild plants, which is why it's worth knowing on sight.",
      "Avoid picking from lawns or roadsides that may have been treated with pesticide or herbicide, or are right next to heavy traffic.",
      "This is a food-safety fact, not a treatment for any condition — it's useful because it's common and safe to eat, not because it cures anything.",
    ],
  },
  "Clover: a common, safe wild edible": {
    sources: ["USDA PLANTS Database", "university extension services"],
    guidance: [
      "White and red clover (Trifolium repens and Trifolium pratense) grow in lawns, fields, and roadsides across nearly all of North America and Europe — one of the most common plants there is.",
      "Identify it by the classic three-leaflet leaf (each leaflet often with a faint pale V-mark) and a round pom-pom flower head, white or pink-purple. There's no toxic plant commonly confused with it.",
      "Leaves and flowers are edible raw or cooked; raw leaves are easier to digest in small amounts, since large raw quantities can cause bloating.",
      "Avoid clover from lawns or areas that may have been treated with pesticide or herbicide.",
      "Like dandelion, this is a food-safety fact — a plant worth recognizing because it's everywhere and safe, not a remedy for anything.",
    ],
  },
  "Broadleaf plantain: a common, safe wild edible": {
    sources: ["USDA PLANTS Database", "university extension services"],
    guidance: [
      "Broadleaf plantain (Plantago major) is a low weed found in lawns, sidewalk cracks, and disturbed soil almost everywhere in North America and Europe. It is not related to the banana-like plantain fruit.",
      "Identify it by the wide oval leaves with thick parallel veins running the length of each leaf, growing in a low rosette, with a thin flower spike rising from the center.",
      "Young leaves are edible raw in small amounts (older leaves get tough and stringy) or cooked like a leafy green. No dangerous plant is commonly mistaken for it once you know the parallel-vein leaf pattern.",
      "Avoid picking from lawns or roadsides that may have been treated with pesticide or herbicide.",
      "As with dandelion and clover, this is a food-safety fact about a plant that's common and safe to eat — it's listed here for identification, not as a treatment for anything.",
    ],
  },
  "Psychological first aid and grief support": {
    sources: ["SAMHSA"],
    guidance: [
      "SAMHSA's Psychological First Aid (PFA) is designed to be usable by non-mental-health-professionals right after a disaster: psychological support, stress/coping, supportive communication, promoting community self-help, addressing functional needs, \"helping the helper,\" and de-escalation.",
      "SAMHSA Disaster Distress Helpline: call or text 1-800-985-5990 — a real, currently operating national resource for anyone in disaster-related emotional distress.",
    ],
  },
  "Helping children cope with disaster stress": {
    sources: ["CDC", "American Red Cross"],
    guidance: [
      "Return to normal routines as soon as reasonably possible (family meals, school, familiar activities) — this helps children recover.",
      "Watch for anxiety, depression, or PTSD symptoms and seek help if they persist.",
      "A caregiver's own calm, in-control demeanor measurably helps a child feel safer — children take cues from the adults around them. Reassurance and extra affection help soothe anxiety.",
    ],
  },
  "Elderly-specific emergency needs": {
    sources: ["CDC", "Administration for Community Living"],
    guidance: [
      "Roughly half of adults 65+ have two or more chronic conditions, which can make surviving even a short period without food/water/shelter/rest materially harder.",
      "Beyond standard supplies, plan explicitly for mobility assistance, transportation if self-evacuation isn't possible, medication continuity, and — for anyone with dementia — a supervision/wandering plan.",
    ],
  },
  "Family reunification if separated": {
    sources: ["FEMA/Ready.gov", "CDC", "American Academy of Pediatrics"],
    guidance: [
      "The National Emergency Child Locator Center (NECLC) and Unaccompanied Minor Registry (UMR) are real, standing federal resources for exactly this scenario.",
      "Choose more than one meeting place (in case one becomes inaccessible) that's safe, familiar, and easy for every family member — including children — to reach and describe.",
      "Agree in advance on how to contact each other if phone networks are down. Keep a written family plan (not solely phone-stored) with meeting places, an out-of-area contact, and critical medical info for each person.",
    ],
  },
  "Evacuation order vs. shelter order (decision)": {
    sources: ["FEMA", "OSHA"],
    guidance: [
      "An evacuation order means authorities want the area emptied — typically because a threat (hurricane, wildfire, flood) is still approaching and travel is still possible.",
      "A shelter-in-place order means get inside a sturdy building and stay — issued when going outside would be more dangerous than staying (a chemical plume, an active violent incident, or a threat that's already arrived).",
      "Follow the specific order given for the specific hazard — don't default to \"always evacuate\" or \"always shelter\"; the wrong choice for a given hazard can be actively dangerous.",
    ],
  },
  "Cat-specific heatstroke": {
    sources: ["Royal Veterinary College", "PDSA"],
    guidance: [
      "Unlike dogs (which can tolerate cold-water immersion), cats need GRADUAL cooling only: move to shade/a cool area immediately and call a vet.",
      "Apply cool (not ice-cold) damp towels to the belly, paws, and ears, or use a fan for evaporative cooling. Never use ice-cold water or an ice bath on a cat — cooling too fast can itself cause shock.",
      "Offer small sips of water only if alert enough to drink safely. Heatstroke can become life-threatening in 20-30 minutes; organ damage risk begins above ~104°F.",
    ],
  },
  "Pet hypothermia and frostbite": {
    sources: ["American Red Cross Pet First Aid"],
    guidance: [
      "Hypothermia: move to a warm, dry place immediately; check airway/breathing/circulation, begin CPR if needed. Below 98°F, or very sluggish/unresponsive, needs an emergency vet immediately — don't just warm at home and wait.",
      "Warm gradually when appropriate — rapid warming can cause blood vessels to dilate too fast, risking shock. Check temperature about every 10 minutes.",
      "Frostbite (most common on tail, ear tips, paw pads): warm with warm (not hot) water/compress; never rub or apply pressure — worsens tissue damage. Get vet care either way.",
    ],
  },
  "Bloat/GDV warning signs": {
    sources: ["American Animal Hospital Association"],
    guidance: [
      "GDV (\"bloat\") is one of the most rapidly life-threatening dog emergencies: the stomach fills with gas/food/fluid and twists.",
      "Early signs: restlessness, drooling, discomfort after eating, unproductive retching (trying to vomit, nothing comes up) — this is one of the most important red flags.",
      "Critical signs: visibly distended abdomen, severe pain, pale gums, weakness, collapse.",
      "There is NO safe home treatment — this requires an emergency clinic, surgery, and intensive care. Call ahead so they can prepare.",
    ],
  },
  "Pet trauma, bleeding, fractures, safe transport": {
    sources: ["American Veterinary Medical Association", "Merck Veterinary Manual"],
    guidance: [
      "Bleeding: firm direct pressure with a clean cloth, held at least 3 minutes without lifting to check.",
      "Suspected fracture: do not realign — gently stabilize without adding pressure. An improvised splint can use rolled newspaper/magazine secured with fabric strips, snug but not cutting off circulation.",
      "Altered mental status after trauma: keep the head level or elevated ~20 degrees, avoid jerking motion, avoid manipulating the neck.",
      "Transport: confine to limit further injury (carrier/box for small animals, a board/sled/blanket as a stretcher for large dogs). Call ahead; keep warm and quiet en route.",
    ],
  },
  "Pet seizure and breathing distress": {
    sources: ["American Veterinary Medical Association", "PDSA"],
    guidance: [
      "During a seizure: stay calm, clear nearby objects, do NOT hold the pet down, do NOT put hands near its mouth (bite risk — there's no tongue-swallowing danger to prevent).",
      "Dim lights, quiet the room, keep it cool (seizures raise body temperature). Time it and record video if safe, for the vet.",
      "Seek emergency care immediately for: a seizure over 5 minutes, multiple seizures within 24 hours, or breathing difficulty/blue-tinged gums. Begin CPR if unconscious and not breathing.",
      "Breathing distress alone: go to the nearest emergency animal hospital immediately, call ahead, keep the vehicle cool (heat makes breathing harder).",
    ],
  },
  "Livestock water, feed, evacuation": {
    sources: ["USDA Farm Service Agency"],
    guidance: [
      "USDA's Emergency Assistance for Livestock, Honeybees, and Farm-Raised Fish Program (ELAP) can help cover above-normal costs of hauling feed/water to livestock, or hauling livestock to grazing land, during drought or other qualifying disasters.",
      "Before moving livestock across state lines, contact the receiving state's State Veterinarian's Office first — interstate movement often has health/inspection requirements.",
      "Ahead of any disaster, keep barns/shelter structures in good repair and arrange alternate shelter space in advance.",
      "Contact your local FSA county office in advance — programs and requirements are administered locally and can change.",
    ],
  },
  "Carcass handling and zoonotic disease": {
    sources: ["CDC", "USDA APHIS"],
    guidance: [
      "The risk to humans from animal carcasses after a disaster is low if basic precautions are taken — proper handwashing after any contact is the main protection against pathogens like Salmonella and E. coli.",
      "For a larger-scale animal death event, USDA APHIS is the lead federal agency and can advise on safe disposal.",
      "Disposal shouldn't begin until an actual disposal plan is in place — both to prevent pathogen spread and, for zoonotic diseases, to protect human health.",
    ],
  },
  "Tire puncture limits and plug boundaries": {
    sources: ["NHTSA", "Tire Industry Association"],
    guidance: [
      "A puncture is repairable only if 1/4 inch (6mm) or smaller, in the tread area — never the shoulder or sidewall.",
      "A repair must sit at least 1 inch from any prior repair and at least 2 inches from the sidewall.",
      "NHTSA endorses only the combination plug-and-patch method — a plug alone may hold air but lets the tire keep deteriorating underneath, so plug-only isn't considered a real repair.",
      "Never repair a sidewall/shoulder puncture, one larger than 1/4 inch, or a tire with multiple close-together repairs — replace instead.",
    ],
  },
  "Vehicle overheating": {
    sources: ["AAA and general roadside-safety guidance"],
    guidance: [
      "Pull off the road safely rather than continuing to drive or braking hard. Turn off the AC and turn the heater to maximum — this pulls heat away from the engine. Open windows/sunroof to vent heat.",
      "Once stopped, turn the vehicle off and do NOT open the hood immediately — overheated coolant can exceed 230°F and the system is pressurized. Wait at least 15 minutes.",
      "Once cooled, check for leaks and add a 50/50 coolant-water mix if needed before restarting. Call for a tow if the problem persists.",
    ],
  },
  "Small-engine troubleshooting": {
    sources: ["Generac official troubleshooting guide"],
    guidance: [
      "A small engine that won't start is almost always missing fuel, air, or spark.",
      "Fuel: gasoline gums up a carburetor in as little as 30 days — check fuel level/condition first.",
      "Air: a dirty air filter starves the engine; inspect/replace if dirty, and make sure the choke is in the correct starting position.",
      "Spark: remove the spark plug, hold it against bare metal on the engine, pull the recoil starter — a working plug shows a visible blue spark. A wet plug usually means the engine is flooded, not a spark problem.",
    ],
  },
  "Spark-plug inspection/replacement": {
    sources: ["Generac official troubleshooting guide"],
    guidance: [
      "Remove the spark plug, hold it against bare metal on the engine, and pull the recoil starter — a working plug shows a visible blue spark.",
      "A wet spark plug usually indicates the engine is flooded (too much fuel/over-choking) rather than a spark problem itself.",
      "See the \"Small-engine troubleshooting\" entry for the full fuel/air/spark diagnostic sequence this fits into.",
    ],
  },
  "Manual siphon-pump legal/safety boundaries": {
    sources: ["CDC, \"Don't Siphon Gasoline\" PSA"],
    guidance: [
      "Never siphon gasoline by mouth. Swallowing gasoline can cause vomiting, and gasoline reaching the lungs (aspiration) can cause chemical pneumonia — a real, potentially fatal lung injury — from even a small amount.",
      "Use a hand-operated siphon pump or squeeze-bulb siphon instead of your mouth, every time, regardless of experience or urgency.",
      "The legal side (moving fuel between containers/vehicles can be regulated in some jurisdictions) remains a minor open note — the safety warning applies regardless.",
    ],
  },
  "Solar panel, charge controller, power-bank chain": {
    sources: ["Morningstar Corporation", "general off-grid solar industry references"],
    guidance: [
      "A charge controller sits between solar panels and a battery bank specifically to prevent overcharging — unregulated voltage risks battery gassing, fire, or explosion.",
      "Match the controller's voltage rating to the battery bank; size wiring for actual current and cable-run distance; use correctly rated fuses/breakers and safe disconnects near the battery.",
      "Keep connections dry and never work on a live circuit. A 25-30% safety margin over calculated load is a commonly recommended sizing buffer.",
    ],
  },
  "Phone low-power settings and battery budgeting": {
    sources: ["Ready.gov/FEMA", "FCC", "U.S. Department of Energy"],
    guidance: [
      "Switch to low-power/battery-saver mode, or airplane mode when not actively communicating.",
      "Reduce screen brightness and close unused apps.",
      "Generally minimize device use to stretch remaining battery for when you actually need to reach emergency services or family.",
    ],
  },
  "Suspected EMP: what can/cannot be inferred": {
    sources: ["CISA", "DHS"],
    guidance: [
      "A widescale-damage EMP is specifically associated with a high-altitude nuclear detonation, certain specialized munitions, or a severe natural geomagnetic disturbance (a major solar storm) — it's not a catch-all explanation for ordinary electronics failures.",
      "Most vulnerable devices share embedded modern electronics: computers/control systems, communications/radio equipment, vehicles with electronic ignition.",
      "The federal government's actual EMP concern centers on protecting the electric grid and critical infrastructure, not predicting whether any one household gadget would survive.",
      "Do NOT treat \"my electronics stopped working\" alone as evidence of an EMP — ordinary equipment failure or a normal outage are far more common explanations.",
    ],
  },
  "Well power and pressure system": {
    sources: ["General well-service/plumbing-industry guidance — not government-sourced"],
    guidance: [
      "A well pump stops immediately when power fails, since it runs on electricity. The pressure tank provides a limited reserve — minutes to a few hours depending on size/usage — before water stops entirely.",
      "A pressure tank with a failed internal bladder causes \"short cycling\" (pump switching on/off every few seconds), hard on both the pump and a generator.",
      "Sizing a generator for a well pump requires accounting for starting/surge watts, not just running watts — an electric motor commonly needs 3-4x its running wattage just to start.",
      "After power returns, check the circuit breaker first and reset the pressure switch to \"auto\" if the pump doesn't restart on its own.",
    ],
  },
  "Food dehydration and humidity limits": {
    sources: ["National Center for Home Food Preservation (University of Georgia)"],
    guidance: [
      "NCHFP is the actual gold-standard research body for home food preservation, including dehydration.",
      "Dehydrators come in horizontal (heating element/fan on the side, more even heat) and vertical designs — design affects drying evenness.",
      "Specific safe temperature/time parameters for particular foods (meat/jerky has its own pre-heating step, distinct from produce) still need direct confirmation against nchfp.uga.edu.",
    ],
  },
  "Retained-heat cooking, low-fuel": {
    sources: ["General retained-heat/haybox cooking references", "FoodSafety.gov danger-zone principle"],
    guidance: [
      "A retained-heat (\"haybox\") cooker brings food to a full boil, then insulates the pot so residual heat finishes cooking — can cut fuel use by roughly 20-80%.",
      "Same danger-zone principle applies: food held between about 40°F and 140°F too long risks bacterial growth.",
      "Keep food in a retained-heat cooker no more than about 4-6 hours, and keep it above 140°F throughout.",
    ],
  },
  "Diaper, menstrual, incontinence waste": {
    sources: ["CDC"],
    guidance: [
      "Bag soiled diapers and other absorbent hygiene waste in heavy-duty 3-5 mil black plastic bags.",
      "Dispose of with other bagged household waste once garbage collection resumes.",
    ],
  },
  "Greywater disposal": {
    sources: ["U.S. Environmental Protection Agency"],
    guidance: [
      "Greywater is wastewater from bathtubs, showers, bathroom sinks, and clothes washers specifically — it does NOT include toilet waste or kitchen-sink/dishwasher water (that's blackwater, which must go to a sewer/septic system).",
      "EPA generally endorses greywater reuse for conservation, but permitted uses and volume limits are set state by state (commonly around 250 gallons/day where unpermitted systems are allowed) — this is genuinely state-regulated, confirm your own state's rules.",
      "Label any non-potable water storage clearly (commonly purple piping or \"CAUTION: NONPOTABLE WATER – DO NOT DRINK\" signage).",
    ],
  },
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
  "Mild allergic reaction or hives without antihistamine": {
    sources: ["American College of Allergy, Asthma & Immunology (ACAAI)", "American Academy of Dermatology (AAD)"],
    guidance: [
      "This is for a MILD reaction only — localized itching, hives, or a rash, with normal breathing and no swelling of the face, lips, tongue, or throat. Any of those signs is anaphylaxis, not this — see \"Anaphylaxis when no epinephrine is available\" and treat it as a medical emergency instead.",
      "There is no plant or home remedy that reliably does what an antihistamine does. A mild reaction is managed by easing symptoms while the body clears the trigger on its own, usually within hours to a couple of days.",
      "A cool water soak or compress reduces itching and swelling more than almost anything else available without medication.",
      "Remove the trigger if it's still present — rinse the skin if it's a contact reaction, remove a stinger if visible.",
      "Loose clothing and not scratching helps; broken skin from scratching can get infected on top of the reaction.",
      "Recheck within the hour. Spreading, worsening, or any breathing/swallowing/swelling symptom means this has become the emergency version — escalate immediately.",
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
  "Water-bath vs. pressure canning": {
    sources: ["CDC, \"Home-Canned Foods\"", "National Center for Home Food Preservation / USDA"],
    guidance: [
      "Use only a current, tested USDA or National Center for Home Food Preservation recipe — the exact jar size, method, process time, canner type, and altitude adjustment it specifies. Don't improvise.",
      "Pressure canning is the ONLY safe method for low-acid foods: meat, poultry, seafood, most fresh vegetables, and some tomatoes. A boiling-water canner does not protect low-acid food against botulism, no matter how long you process it.",
      "Don't use an electric multi-cooker just because it has a \"canning\" or \"steam canning\" button — those aren't validated as safe canning methods.",
      "Tomatoes and figs often need added acid (tested amounts of lemon juice or citric acid) to can safely in a water-bath canner — don't assume all tomatoes are acidic enough on their own.",
      "If you didn't follow the tested process exactly, don't eat or share the food — throw it out rather than guess.",
    ],
  },
  "Botulism warning signs and disposal": {
    sources: ["CDC, \"Home-Canned Foods\"", "CDC, \"Botulism Prevention\""],
    guidance: [
      "Never taste home-canned food to check if it's safe — botulinum toxin can't be seen, smelled, or tasted, and even a small taste can be deadly.",
      "Reject without opening or tasting: a leaking, bulging, or swollen container; a cracked or damaged jar or lid; liquid or foam that spurts out when you open it; food that's discolored, moldy, or smells wrong; or any home-canned item where you don't know the canning method or storage history.",
      "A normal smell is not proof the food is safe.",
      "If you suspect a jar or can is contaminated, dispose of it without tasting it — don't pour it down the drain or feed it to animals; seal it in a bag and discard it in household trash, or follow your local health department's guidance for a larger amount.",
    ],
  },
  "General power outage": {
    sources: ["American Red Cross, \"Power Outage Safety\"", "CDC"],
    guidance: [
      "Check for immediate hazards first — smoke, fire, a gas odor, arcing, water near electrical equipment, damaged wires, or a medical device losing power — before treating it as an ordinary outage.",
      "If standing water is between you and the main electrical disconnect, don't enter the water to reach it.",
      "Stay at least 35 feet from any fallen power line and anything it's touching — treat every downed line as energized.",
      "Unplug or switch off nonessential appliances and electronics to reduce restart load and surge damage when power returns. Leave one light switched on so you'll know when it's back.",
      "Keep refrigerator and freezer doors closed (see \"Refrigerator/freezer outage timing\").",
      "If heat, cold, or a power-dependent medical device makes staying home unsafe, relocate early to a location you've confirmed has power — don't wait until it becomes an emergency.",
      "Don't assume a dead phone, dark neighborhood, or failed vehicle proves anything bigger than an ordinary outage — those have many common causes.",
    ],
  },
  "FRS, GMRS, MURS, CB, amateur-radio boundaries": {
    sources: ["Electronic Code of Federal Regulations, 47 CFR Part 95 and Part 97"],
    guidance: [
      "FRS (Family Radio Service): usable without an individual license, using certified FRS radios. Short range, shared channels, no privacy guarantee.",
      "GMRS (General Mobile Radio Service): requires an individual FCC license (no test required, just a fee) — other family members can typically operate under that one license.",
      "CB (Citizens Band): generally licensed by rule with certified equipment, no individual license needed — shared channels, legal power and equipment limits still apply.",
      "MURS (Multi-Use Radio Service): also licensed by rule with certified equipment — a 5-channel short-distance VHF service, shared and prone to interference.",
      "Amateur (ham) radio: normally requires passing a test and getting an FCC license under Part 97 — learn, test, and get licensed before an emergency, not during one.",
      "Being ABLE to receive a frequency doesn't mean you're allowed to transmit on it. A radio that can tune to a frequency isn't automatically certified or legal for that service.",
      "Federal rule (47 CFR §97.403) does allow an amateur station to use any means available for genuine emergencies involving immediate safety of life or property when normal systems are down — but that's a narrow emergency allowance, not blanket permission to use ham frequencies casually during any disaster.",
    ],
  },
  "Disability, mobility, sensory, caregiver needs": {
    sources: ["American Red Cross, \"Make a Plan\"", "Ready.gov/FEMA"],
    guidance: [
      "Write down who performs each essential task for the person who needs help, and name a backup person in case the first one isn't available.",
      "Stage in advance: mobility devices and their chargers, a manual backup if a powered device fails, transfer equipment, and accessible transportation arranged ahead of time.",
      "Keep a written medication list — doses, prescribers, pharmacy info, allergies, refrigeration needs — plus physical copies of critical prescriptions.",
      "Plan for communication aids, hearing-aid batteries, glasses, canes, and service-animal supplies, with instructions written so someone else could follow them if you're not able to.",
      "For anyone relying on powered medical equipment (oxygen, CPAP, suction, feeding pump, refrigerated medication), plan explicitly for what happens when backup power runs out — don't assume it will last as long as the emergency does.",
      "Identify an accessible shelter and transportation destination before you need one. Don't assume a public shelter can meet a specific medical or equipment need without confirming it in advance.",
      "Life-sustaining equipment and medication continuity deserve a plan reviewed with your own clinician and equipment provider — this is a starting checklist, not a substitute for that conversation.",
    ],
  },
  "Emergency stored-water quantity and containers": {
    sources: ["CDC, \"How to Create an Emergency Water Supply\""],
    guidance: [
      "Store at least 1 gallon per person per day for at least 3 days; a 2-week supply is better when you have room for it.",
      "Store extra for hot climates, pregnancy, illness, pets, and hygiene or medical needs.",
      "Unopened commercially bottled water is the most reliable choice. For home-filled containers, use food-grade containers with tight lids — never a container that held bleach, pesticide, fuel, or another toxic chemical.",
      "Label home-filled containers \"drinking water\" with the date, keep them out of sunlight and away from chemicals, and replace the water every 6 months.",
      "Don't touch stored water or the inside of the container with your hands or an unclean scoop.",
    ],
  },
  "Tap water suspected unsafe": {
    sources: ["CDC, \"How to Make Water Safe in an Emergency\""],
    guidance: [
      "Follow any local boil-water or do-not-use notice as soon as you can reach it through any channel.",
      "Use bottled, boiled, or properly treated water for drinking, cooking, brushing teeth, food prep, ice, dishes, handwashing, and infant formula.",
      "If officials warn contamination could enter home plumbing, close the home's main water valve if you can do it safely and know which valve it is.",
      "Keep clean and dirty containers separate. Never assume clear-looking water is safe.",
      "Never use water from a heating radiator or boiler. Never try to boil, bleach, filter, or sun-treat water that smells like fuel or chemicals, or that may be radioactively contaminated — use a different source instead.",
    ],
  },
  "Boiling for microbial hazards": {
    sources: ["CDC + EPA emergency-disinfection guidance"],
    guidance: [
      "If the water is cloudy, let it settle, then filter it through a clean cloth, paper towel, or coffee filter first.",
      "Bring the clear water to a rolling boil for 1 minute. Above 6,500 feet elevation, boil for 3 minutes instead.",
      "Let it cool naturally and store it in a sanitized, tightly covered container.",
      "Boiling kills germs, but it does NOT remove salt, heavy metals, fuel, pesticides, most chemicals, or radioactive material — and can even concentrate some of those as water evaporates. Don't rely on it for chemically contaminated water.",
    ],
  },
  "Concentration-aware household bleach treatment": {
    sources: ["CDC + EPA emergency-disinfection guidance"],
    guidance: [
      "Use only regular, unscented household chlorine bleach for disinfection (5%–9% sodium hypochlorite), with nothing else added. Never use scented, color-safe, splashless, gel, or cleaner-added bleach.",
      "For that 5%–9% strength: 2 drops per quart/liter of clear water, 8 drops (about 1/8 teaspoon) per gallon, or 40 drops per 5 gallons. Double the amount if the water is cloudy, murky, colored, or very cold.",
      "Stir and let it sit at least 30 minutes before drinking.",
      "Check the label's actual percentage first — the drop counts above are specifically for 5%–9% bleach, and other concentrations need different amounts. Standard bleach treatment does not reliably kill Cryptosporidium, and bleach cannot treat chemically or radioactively contaminated water.",
    ],
  },
  "Portable filter limits": {
    sources: ["CDC emergency-water guidance"],
    guidance: [
      "Follow the filter's exact instructions and check its stated absolute pore size — CDC says 1 micron or smaller is needed to remove parasites, and 0.3 micron or smaller for bacteria.",
      "Most portable filters do NOT remove viruses — you may still need to chemically disinfect the water afterward for bacteria and viruses, not just filter it.",
      "Carbon alone does not make microbiologically unsafe water safe to drink.",
      "Don't assume a filter removes dissolved chemicals, fuel, salt, heavy metals, or radioactive material unless the manufacturer specifically says so and it's independently certified.",
    ],
  },
  "Emergency household water sources": {
    sources: ["CDC, \"How to Find Clean Water in an Emergency\""],
    guidance: [
      "Safe sources already in your home (if not contaminated): water from the tap water heater's tank (not a home-heating boiler or radiator), melted ice from a safe source, clear water from a toilet's upper tank (never the bowl) if no chemical cleaner was used, and liquid from canned fruit or vegetables.",
      "Pool or spa water can be used for cleaning and hygiene, but is not recommended for drinking.",
      "Outside water — rain, rivers, streams, ponds, lakes, springs — may carry sewage, animal waste, or chemicals. It needs proper microbial treatment, and must be rejected entirely if fuel or toxic-chemical contamination is suspected.",
    ],
  },
  "Flooded private well, initial response": {
    sources: ["CDC, \"How to Disinfect Wells After an Emergency\""],
    guidance: [
      "Don't drink from a flooded or possibly contaminated well — use bottled water until it's confirmed safe.",
      "If you can do it without entering water or touching damaged electrical equipment, shut off electricity to the well area first.",
      "Check for downed wires, submerged electrical hazards, sharp debris, unstable ground, and open holes before approaching. Never enter a well pit — hazardous gases can build up there.",
      "Have a qualified electrician or well/pump contractor inspect any damaged wiring or equipment before it's used again.",
      "Until lab testing confirms the water is safe, boil it for microbial risk or use another source — and if fuel or toxic chemicals are suspected, boiling and disinfection can't fix that; well disinfection specifics depend on your well type and should follow your local health department's guidance.",
    ],
  },
  "Nuclear detonation flash/blast/fallout": {
    sources: ["CDC, \"Preparing for a Radiation Emergency\"", "CDC, \"Nuclear Blasts: Frequently Asked Questions\""],
    guidance: [
      "If you're near the flash when it happens: turn away, protect your eyes, drop to the ground, and stay down until the heat and shock wave have passed.",
      "As soon as you can move safely, get inside the nearest substantial building — brick or concrete multi-story buildings and basements shield better, but any building beats staying outside or in a car.",
      "Move to the basement or the middle of the building, away from exterior walls, windows, doors, and the roof.",
      "Stay inside and stay tuned to official information. Sheltering for at least 24 hours can significantly cut fallout exposure in many situations, but follow official instructions over a fixed timer.",
      "If you were outside during or after the event, see \"Radiation shelter and decontamination\" for removing contamination once you're inside.",
    ],
  },
  "Dirty bomb vs. nuclear explosion distinction": {
    sources: ["CDC, \"What to Do for Different Types of Radiation Emergencies\""],
    guidance: [
      "A dirty bomb uses ordinary explosives to scatter radioactive material — it does not produce a nuclear blast's fireball, flash, or shockwave.",
      "The explosion itself is the immediate danger at first, the same as any bombing; radioactive contamination is a second, separate concern afterward.",
      "The response is the same core steps either way: get inside, put distance between yourself and the release, decontaminate if you were exposed, and follow official instructions.",
      "Don't assume a bombing is \"just a bomb\" and skip the radiation precautions, and don't assume it must be as catastrophic as a nuclear weapon — treat any bombing as a possible radiological release until told otherwise.",
    ],
  },
  "Radiation shelter and decontamination": {
    sources: ["CDC, \"Preparing for a Radiation Emergency\"", "CDC, \"What to Do: Get Inside\""],
    guidance: [
      "Get inside, stay inside, stay tuned — get to the nearest substantial building, move to a basement or the middle of the building away from exterior walls and windows, and close/lock doors and windows.",
      "If you were outside during the event or release: carefully remove your outer layer of clothing as soon as you're safely inside. This one step alone can remove up to about 90% of radioactive material from your body and clothing.",
      "Bag the removed clothing and keep it away from people and pets.",
      "Wash exposed skin and hair with soap and water when it's available, without harsh scrubbing, then put on clean clothes.",
      "Do not take potassium iodide (KI) on your own. It only protects the thyroid from radioactive iodine under specific conditions, doesn't protect against other radioactive material or external radiation, and should only be taken when public-health or emergency officials specifically say to.",
    ],
  },
  "Junctional bleeding and wound packing": {
    sources: ["American Red Cross, \"Life-Threatening External Bleeding\"", "Stop the Bleed / U.S. Department of Defense"],
    guidance: [
      "A tourniquet only works on an arm or leg. For life-threatening bleeding at the groin, shoulder, neck, scalp, or back — where a tourniquet can't be applied — wound packing is the trained technique used instead.",
      "Call or have someone call 911 immediately; wound packing does not replace emergency transport.",
      "This is a trained skill, not something to improvise for the first time in an emergency — strongly consider a formal Stop the Bleed or Red Cross course before you need it.",
      "Never place a tourniquet on the neck, chest, abdomen, or groin — those injuries need direct pressure and packing, not a tourniquet.",
      "Keep monitoring breathing and responsiveness, and treat for shock (keep them warm, avoid unnecessary movement) while waiting for help.",
    ],
  },
  "Refrigerator/freezer outage timing": {
    sources: ["CDC + FoodSafety.gov, food-safety-during-power-outage guidance"],
    guidance: [
      "Keep the doors closed. Write down the time the power failed so you can track how long food has been without cooling.",
      "A closed refrigerator keeps food safe for about 4 hours. A closed, full freezer holds its temperature about 48 hours (24 hours if only half full).",
      "After 4 hours without power, move refrigerated perishables (meat, poultry, fish, eggs, milk, cut produce, leftovers) to a cooler at 40°F or colder, or discard them.",
      "Frozen food can still be cooked or refrozen if it still has ice crystals or is 40°F or colder — quality may suffer, but it's safe. Discard ice cream/frozen yogurt if thawed at all, even slightly; they don't refreeze safely.",
      "Never taste food to decide if it's safe, and don't assume cooking spoiled food afterward makes it safe again — some hazards survive cooking.",
    ],
  },
  "Chemical and electrical burns": {
    sources: ["American Heart Association / American Red Cross First Aid Guidelines","OSHA Burn Standards"],
    guidance: [
      "Electrical burns — make the scene safe first: never touch the person while they are still in contact with the live source. Shut off power at the breaker or unplug the cord before approaching. If it involves a downed outdoor wire, stay back and do not approach.",
      "Check breathing immediately: high-voltage current often stops the heart or lungs. Start CPR right away if they are unresponsive and not breathing normally.",
      "Treat hidden electrical injuries: electrical current travels inside the body. Look for both an entry wound and an exit wound (often on hands, feet, or where they touched ground). Cover wounds loosely with clean, dry cloth. Keep the person flat and warm to prevent shock.",
      "Chemical burns — flush immediately: brush off dry chemical powders with a cloth or glove first before adding water. Flush wet chemicals instantly with large amounts of clean, running room-temperature water for at least 15 to 20 minutes.",
      "Remove contaminated clothing: strip off any clothing, shoes, or jewelry soaked with the chemical while flushing water over the skin. Do not try to neutralize acids with bases or vice versa — the chemical reaction generates extreme heat and worsens the burn.",
      "Cover clean burns dry: after thorough flushing, cover the burn loosely with a clean, dry, non-stick dressing or cloth. Never apply butter, grease, ointments, or direct ice.",
    ],
  },
  "Shock and hypothermia prevention (medical)": {
    sources: ["American Red Cross","Committee on Tactical Combat Casualty Care (CoTCCC)"],
    guidance: [
      "Recognize shock early: look for pale, cold, clammy skin, a rapid weak pulse, fast shallow breathing, extreme thirst, weakness, confusion, or dizziness.",
      "Position them flat: lay the person flat on their back. If they are faint or dizzy and have no suspected spinal, head, or leg fractures, elevate their legs about 6 to 12 inches to keep blood flowing to vital organs.",
      "Maintain normal body temperature: shock stops the body from regulating heat. Insulate them from the cold ground with a pad, tarp, or sleeping bag, and wrap their torso in dry blankets. Avoid overheating them to sweating, but never let them get cold.",
      "Do not give food or drink: even if they complain of extreme thirst, do not give water or food — it can cause choking or vomiting if their level of alertness drops. Moisten their lips with a damp cloth instead.",
      "Calm and immobilize: keep them still and reassure them quietly. Physical movement and panic accelerate circulatory collapse.",
    ],
  },
  "Asthma, COPD, breathing distress": {
    sources: ["2024 American Heart Association & American Red Cross First Aid Guidelines"],
    guidance: [
      "Sit upright and lean forward: never force someone struggling for air to lie flat. Have them sit upright, leaning slightly forward with arms supported on knees or a table (\"tripod position\") to open the airway.",
      "Assist with prescribed inhalers: help them locate and use their personal emergency rescue inhaler (such as albuterol) and spacer immediately. Have them take slow, deep breaths, holding each puff for up to 10 seconds, following the dosage on their prescription label.",
      "Pursed-lip breathing (COPD or panic): if an inhaler is empty or unavailable, have them inhale slowly through the nose for 2 seconds, purse their lips like blowing out a candle, and exhale slowly for 4 seconds. This keeps the airway open longer and slows hyperventilation.",
      "Clear the immediate air: move away from smoke, dust, cold drafts, engine exhaust, or strong chemical odors that trigger airway spasms. Loosen tight clothing around the neck and chest.",
      "Watch for respiratory failure: if the person cannot speak more than one word at a time, their lips or fingertips turn gray or blue, or their chest pulls in hard between the ribs with each breath, the airway is failing. If they collapse and stop breathing, begin CPR.",
    ],
  },
  "Unconscious, breathing, cause unknown": {
    sources: ["American Heart Association & American Red Cross, Guidelines for First Aid"],
    guidance: [
      "Check the airway and breathing: make sure their chest is rising and falling normally. If breathing stops or turns into gasping, start CPR immediately.",
      "Roll into the recovery position: if there is no suspected neck or back injury, roll them gently onto their side. Bend their top knee to keep them stable and tilt their chin up slightly to keep the airway open and prevent choking if they vomit.",
      "Call 911 immediately: state that the person is unresponsive but currently breathing. Stay beside them and watch their breathing constantly until paramedics arrive.",
      "Do not give anything by mouth: never give water, food, or pills to someone who is unconscious.",
    ],
  },
  "Hypothermia recognition and first aid": {
    sources: ["Wilderness Medical Society Clinical Practice Guidelines","CDC"],
    guidance: [
      "Watch for worsening stages: mild hypothermia shows as violent, uncontrollable shivering and fumbling fingers. Severe hypothermia sets in when shivering suddenly stops, speech becomes slurred, and the person acts clumsy, drunk, or confused.",
      "Insulate from the frozen ground: lay down dry cardboard, blankets, foam pads, or pine boughs before laying the person down — the ground pulls body heat out faster than the air.",
      "Warm the core, not the limbs: focus heat on the chest, neck, and back using dry towels, layers, and warm water bottles wrapped in cloth. Never apply hot water or bare hot packs directly to the skin, and never rub cold arms or legs — rubbing forces cold, stagnant blood straight to the heart, which can trigger cardiac arrest.",
      "Only offer warm drinks if fully alert: if they can sit up and talk clearly, give warm, sugary water or broth. Never force liquids into someone who is drowsy or nodding off.",
    ],
  },
  "Extreme heat illness": {
    sources: ["CDC / NIOSH Heat Stress Standards","American Heart Association / American Red Cross Guidelines for First Aid"],
    guidance: [
      "Heat exhaustion (warning stage): heavy sweating, cold/pale/clammy skin, a fast weak pulse, nausea, muscle cramps, dizziness. Move to air conditioning or shade, loosen clothing, sip cool water, and apply wet cloths.",
      "Heat stroke (life-threatening emergency): body temperature 103°F or higher, hot/red/dry-or-damp skin, a rapid strong pulse, confusion, dizziness, fainting, or slurred speech.",
      "Act immediately for heat stroke: call 911. Cool the person right now by any means available — immerse them in cold water or an ice bath up to the neck, spray them with cool water and fan aggressively, or place ice packs at the neck, armpits, and groin.",
      "Do not force fluids: if they are confused, vomiting, or passing out, do not try to make them drink.",
    ],
  },
  "Emergency childbirth and newborn care": {
    sources: ["American College of Obstetricians and Gynecologists (ACOG)","American Red Cross Wilderness and Remote First Aid"],
    guidance: [
      "Signs delivery is happening now: contractions 1 to 2 minutes apart, a strong urge to push or bear down, a sensation like a bowel movement, or the baby's head is visible (crowning).",
      "Call 911 immediately: put the phone on speaker. Wash your hands and gather clean towels, blankets, and a clean bulb syringe or cloth.",
      "Support the delivery: support the baby's head as it emerges with gentle hands; do not pull the baby out or push on the mother's stomach. If the cord is wrapped around the neck, slip it gently over the head.",
      "Care for the newborn: dry the baby thoroughly right away with a warm, clean towel. Clear fluid from the mouth and nose with a cloth. Place the baby directly skin-to-skin on the mother's chest and cover both with dry blankets.",
      "Leave the umbilical cord alone: do not cut the cord unless emergency dispatch explicitly directs you to. Let the placenta deliver naturally — do not pull on the cord.",
    ],
  },
  "Drowning / near-drowning rescue": {
    sources: ["American Heart Association Guidelines for Cardiopulmonary Resuscitation (drowning protocol)"],
    guidance: [
      "Rescue safely: reach with an object (oar, branch, towel) or throw flotation gear (life ring, rope). Avoid jumping in unless you are a trained lifeguard.",
      "Remove from water and assess: get them to flat, dry ground. Check responsiveness and breathing.",
      "Start CPR with rescue breaths: if they are not breathing, begin CPR. Unlike sudden cardiac arrest, drowning is a suffocation emergency — give 2 initial rescue breaths before 30 chest compressions, then continue alternating 30 compressions and 2 breaths.",
      "Do not try to clear water with a Heimlich maneuver: don't waste time trying to squeeze water out of the stomach. Airway management and chest compressions are what restore oxygen.",
      "A medical checkup is required afterward: even if they wake up, cough out water, and seem fine, get them to an emergency room — lungs can fill with fluid hours later (secondary drowning / pulmonary edema).",
    ],
  },
  "Structure fire — get out now": {
    sources: ["National Fire Protection Association (NFPA) Standard Fire Safety Codes"],
    guidance: [
      "Leave immediately: don't stop to gather belongings, money, or pets if doing so causes delay. Sound the alarm to alert others.",
      "Stay low: smoke and toxic gases rise, so cleaner, cooler air is near the floor. Crawl on hands and knees under the smoke.",
      "Feel doors before opening: use the back of your hand to feel the door, doorknob, and frame. If it feels warm or hot, don't open it — use a window or a second escape route instead.",
      "If trapped in a room: close all doors between you and the fire. Seal cracks around doors with towels or bedding (wet if possible). Open a window slightly and wave a bright cloth or flashlight to signal rescuers. Call 911 and tell them your exact room.",
      "Never go back in: once you're outside at your meeting spot, never re-enter for any reason. Tell arriving firefighters if anyone is missing.",
    ],
  },
  "Natural-gas or propane odor": {
    sources: ["NFPA 54 (National Fuel Gas Code)","American Gas Association Safety Standards"],
    guidance: [
      "Leave on foot immediately: if you smell rotten eggs or sulfur, hear hissing, or see unexplained dirt blowing from the ground, get everyone and your pets outside right away. Move far upwind and away from the building.",
      "Do not touch anything electrical: don't flip light switches, unplug appliances, ring doorbells, or use a garage door opener. A tiny spark from a switch or static electricity can ignite a gas pocket.",
      "No flames or phones inside: don't light matches, candles, or lighters. Don't use a cell phone or landline inside the structure — only use a phone once you're safely away from the building.",
      "Shut off the supply valve only if it's outside and safe to reach: if the main shutoff valve on your exterior gas meter or propane tank is easily accessible and you have a wrench ready, turn it a quarter-turn perpendicular to the pipe. Never go back inside a building to shut off gas.",
      "Never turn the gas back on yourself: once shut off, the system must stay closed until a qualified professional checks the lines for leaks.",
    ],
  },
  "Chemical plume: evacuate or shelter": {
    sources: ["US DOT Pipeline and Hazardous Materials Safety Administration (PHMSA) Emergency Response Guidebook","FEMA Shelter-in-Place Guidance"],
    guidance: [
      "Determine wind direction instantly: look at smoke, flags, or tree branches. If you're outdoors or must evacuate, move perpendicular (roughly 90 degrees) to the wind to step out of the plume's path, then head upwind.",
      "Shelter-in-place if the cloud already surrounds your building: stay inside. Go to an above-ground room with the fewest doors and windows — many toxic industrial chemicals are heavier than air and sink into basements.",
      "Shut down airflow immediately: turn off furnaces, air conditioners, and bathroom or kitchen exhaust fans. Close the fireplace damper.",
      "Seal cracks and openings: tape heavy plastic sheeting (or trash bags) over windows, doors, and vents with duct tape. If tape isn't available, pack wet towels, sheets, or clothing tightly into the gaps under doors and around window frames.",
      "Cover your breathing: fold a dry or damp towel or cloth over your nose and mouth if fumes seep inside. Stay sealed until you're certain the plume has passed.",
    ],
  },
  "Biological outbreak and household isolation": {
    sources: ["CDC Community & Home Infection Prevention and Control Guidelines"],
    guidance: [
      "Dedicate a sick room and bathroom: designate one bedroom for the infected person. If a second bathroom exists, reserve it exclusively for their use; if sharing one bathroom, wipe down all touched fixtures with disinfectant or bleach solution after each use.",
      "Set up a no-contact buffer zone: leave food, water, and supplies outside the closed door. The sick person retrieves items after the caregiver steps away.",
      "Use protection when entering: if the caregiver must enter the room, both the caregiver and the sick person should wear tight-fitting masks (N95 or surgical). The caregiver should wear gloves and wash hands thoroughly with soap and water for 20 seconds immediately after leaving.",
      "Handle laundry and dishes safely: don't shake dirty bedding or clothing — shaking launches viral particles into the air. Wash their laundry in hot water and dry thoroughly. Wash dishes with hot water and dish soap or run them through a dishwasher; use separate dedicated utensils if water is scarce.",
      "Contain waste: keep a lined trash can inside the sick room. Tie off the bag tightly before removing it, and wash hands immediately afterward.",
    ],
  },
  "Flash flood": {
    sources: ["NOAA / National Weather Service \"Turn Around Don’t Drown\"","FEMA Flood Safety"],
    guidance: [
      "Move to high ground immediately: don't wait for instructions or warnings if you see rising water, hear rushing water, or notice muddy runoff picking up speed. Seconds count, especially in low-lying areas, canyons, and dry creek beds.",
      "Never walk through moving water: just 6 inches of fast-moving water can knock an adult off their feet. If you must cross standing water, check the ground's firmness with a stick before each step.",
      "Never drive into floodwater: 12 inches of water will float most passenger cars, and 24 inches will sweep away trucks and SUVs. If water rises rapidly around your vehicle, abandon it immediately and get to higher ground on foot.",
      "Avoid storm drains and culverts: debris often blocks these, creating strong suction and sudden releases of water that can pull a person under instantly.",
    ],
  },
  "Lightning": {
    sources: ["NOAA / National Weather Service Lightning Safety Guidelines"],
    guidance: [
      "Follow the \"no place outside is safe\" rule: if you hear thunder, lightning is close enough to strike you. Get inside a substantial, enclosed building or an all-metal, hard-topped vehicle immediately.",
      "Unsafe shelters to avoid: never shelter under isolated trees, open gazebos, rain sheds, picnic shelters, carports, or tents — these don't protect against lightning and can attract strikes.",
      "If caught in the open with no shelter: stay away from tall objects, wire fences, metal poles, and open water. Move off ridges and peaks into a lower area or ravine.",
      "The lightning crouch (absolute last resort): if your hair stands on end or you feel tingling, squat low on the balls of your feet with heels touching, tuck your head, and cover your ears. Keep as little contact with the ground as possible — don't lie flat.",
      "Indoor precautions: stay away from corded phones, plugged-in electronics, plumbing fixtures (sinks, showers), and concrete basement floors or walls, which often contain reinforcing metal wire.",
    ],
  },
  "Tsunami": {
    sources: ["NOAA / NWS Tsunami Warning System","International Tsunami Information Center (ITIC)"],
    guidance: [
      "Recognize the natural warning signs: a strong or long-lasting earthquake near the coast, a loud roaring sound from the ocean, or the sea suddenly draining away and exposing the ocean floor are all immediate warnings.",
      "Move inland and uphill right now: don't wait for sirens, alerts, or official warnings. Grab your go-bag and move immediately inland or to ground at least 100 feet above sea level, or 1 to 2 miles inland.",
      "Evacuate on foot if roads are jammed: traffic gridlock is common after coastal quakes. If vehicles stall, walk or run uphill to clear the danger zone.",
      "Never go to the beach to look: if you can see the wave coming, you're already too close to outrun it.",
      "Expect multiple waves: the first wave is rarely the largest. Tsunamis arrive as a series of surges that can continue for many hours — stay on high ground until you have absolute confirmation the danger has passed.",
    ],
  },
  "Chemical/fuel/algal-toxin/radiological rejection": {
    sources: ["EPA Emergency Disinfection of Drinking Water","CDC WASH Emergency Guidance"],
    guidance: [
      "Boiling and chlorine do not fix these poisons: boiling only kills bacteria, viruses, and parasites. Boiling water with chemicals, heavy metals, fuel, pesticides, or radiation actually evaporates safe water and concentrates the toxic residue left behind.",
      "Reject water with chemical or fuel signs: never drink, cook with, or wash in water that has an oily sheen, a gasoline or solvent odor, unusual chemical discoloration, or dead fish nearby. Standard portable filters and camping purifiers will not make fuel-tainted water safe.",
      "Reject water during harmful algal blooms: stay clear of water covered in green scum, blue-green paint-like slicks, or foul marshy foam. Cyanotoxins produced by algae aren't removed by boiling or standard household bleach.",
      "Reject fallout-contaminated water: after any nuclear incident, avoid all open surface water (creeks, ponds, rain barrels). Use sealed canned goods, bottled fluids, or water stored inside enclosed pipes and indoor water heater tanks instead.",
    ],
  },
  "Electrical panel and de-energizing verification": {
    sources: ["NFPA 70E (Standard for Electrical Safety in the Workplace)","OSHA"],
    guidance: [
      "Never touch a panel while wet: stand on dry ground or a thick rubber mat or dry wooden board. If standing water reaches the panel, don't approach it — stay completely clear.",
      "The one-hand rule: use only one hand to touch the panel door and switches, keeping your other hand behind your back or in your pocket. This keeps an electrical path from crossing through your chest if a short occurs.",
      "Shut down power in order: turn off individual branch circuit breakers one by one first, then flip the large main breaker at the top to OFF. This avoids sudden electrical arcing.",
      "Verify without power tools: never assume a line is dead just because a switch is flipped. Plug a known-working lamp, radio, or voltage tester into the specific outlets you need to check before touching bare wires.",
    ],
  },
  "Electric/hybrid vehicle crash and flood hazards": {
    sources: ["NFPA Alternative Fuel Vehicles Safety Training","NHTSA EV Safety Standards"],
    guidance: [
      "Never touch bright orange cables: all high-voltage cables in electric and hybrid vehicles are coated in bright orange insulation. Don't cut, touch, or pull these cables, and never pry open the high-voltage battery casing.",
      "Submerged vehicle safety: submerged EV batteries are isolated and don't normally electrify the surrounding floodwater. But if you see vigorous bubbling, hissing, or smoke rising from under the car, move away immediately — that signals hazardous battery gases or thermal runaway.",
      "Post-flood saltwater fire risk: if an EV was submerged in floodwater (especially saltwater), the battery can develop an internal short hours or days later. Tow or push the vehicle at least 50 feet from any structure, garage, or other cars, and never park it indoors.",
      "Powering down after a crash: turn off the ignition and remove the key fob at least 20 feet from the car so proximity sensors don't keep high-voltage circuits energized.",
    ],
  },
  "Fireplace/chimney limitations before use": {
    sources: ["Chimney Safety Institute of America (CSIA)","NFPA 211"],
    guidance: [
      "Check the flue and damper first: open the damper completely before lighting anything, and verify airflow by holding a lit match or candle near the opening to confirm the draft pulls smoke upward.",
      "Inspect for blockages and soot buildup: look up the chimney with a flashlight for bird nests, leaves, cracked mortar, or thick, tar-like creosote deposits that can trigger a chimney fire.",
      "Never burn improper fuels: burn only dry, seasoned hardwood — never painted wood, treated lumber, cardboard, plastics, or trash, which release toxic fumes and corrosive chemicals.",
      "Never use liquid accelerants indoors: don't use gasoline, kerosene, lighter fluid, or alcohol to start or rekindle a fireplace fire.",
      "Keep an ash barrier and safety zone: keep a sturdy metal fire screen in place at all times to stop popping sparks, and clear rugs, furniture, and paper at least 3 feet from the hearth.",
    ],
  },
  "Wood-stove and combustion-heater safety": {
    sources: ["NFPA 211 (Standard for Chimneys, Fireplaces, Vents, and Solid Fuel-Burning Appliances)"],
    guidance: [
      "Ensure dedicated outdoor venting: every wood stove and fuel heater must vent completely outside through an airtight, undamaged pipe; never use an unvented fuel-burning heater inside a sleeping area.",
      "Maintain clearance around heat: keep blankets, curtains, clothes, and kindling at least 3 feet from all sides of the stove and stovepipe.",
      "Watch the burn rate and airflow: avoid choking down the air supply completely on wet wood — slow, smoldering fires generate large amounts of creosote and carbon monoxide.",
      "Dispose of hot ashes in metal only: shovel cold ashes into a covered metal bucket on bare dirt, concrete, or stone outside — never into plastic buckets, paper bags, or near wooden porches.",
    ],
  },
  "Generator carbon-monoxide safety": {
    sources: ["US Consumer Product Safety Commission (CPSC)","NFPA"],
    guidance: [
      "Operate outdoors only, far from the house: place the generator outdoors, at least 20 feet from all doors, windows, and vents, with the exhaust pointed away from any structure.",
      "Never run it in any enclosed or semi-enclosed space: never operate a generator inside a house, garage, basement, crawlspace, shed, camper, or under a porch, even with doors open and fans running.",
      "Protect it from wet weather safely: run it on a dry, level surface under an open canopy-style generator tent; never operate a running generator in standing water or uncovered in falling rain — that risks electrocution.",
      "Shut off and cool down before refueling: turn off the generator and let the engine cool for 5 to 10 minutes before adding fuel — spilling gas on a hot muffler can ignite immediately.",
      "Use heavy-duty outdoor extension cords: plug appliances into the generator using grounded, undamaged, outdoor-rated cords sized correctly for the load.",
    ],
  },
  "Carbon-monoxide alarm or symptoms": {
    sources: ["CDC","NFPA 720 (Standard for the Installation of Carbon Monoxide Warning Equipment)"],
    guidance: [
      "Evacuate to fresh air immediately: if an alarm sounds or anyone feels a sudden dull headache, dizziness, weakness, nausea, or confusion, get everyone and pets outdoors into fresh air right away.",
      "Don't look for the leak: never waste time searching for the cause, and don't re-enter the building until it's thoroughly aired out and the source is shut down.",
      "Position unconscious people safely: if someone has passed out from the fumes, carry or drag them outside into fresh air and place them on their side (recovery position) so their airway stays clear if they vomit.",
      "Start CPR if breathing stops: watch their chest constantly; if breathing is absent or they're only gasping, begin chest compressions immediately.",
    ],
  },
  "Frostbite and refreezing risk": {
    sources: ["Wilderness Medical Society Clinical Practice Guidelines for the Prevention and Treatment of Frostbite"],
    guidance: [
      "Spot the signs early: skin turns numb, waxy, hard, and pale white or grayish-yellow.",
      "The absolute rule on refreezing: never thaw frostbitten hands, feet, or ears if there's any chance they could freeze again before reaching safety. Thawing and then refreezing causes catastrophic, permanent tissue death that can lead to amputation — walking on frozen feet is safer than walking on thawed, refrozen feet.",
      "How to thaw safely, once sheltered for good: immerse the area in warm water, around 100°F to 104°F (comfortable to the touch of an uninjured elbow), for 20 to 30 minutes. Don't use dry, direct heat like a camp stove, open fire, or exhaust pipe — numb skin burns easily without feeling it.",
      "Protect the damaged tissue: don't rub or massage frostbitten areas, and never pop blisters. Wrap thawed fingers or toes individually with clean, dry cloth strips so they don't stick together.",
    ],
  },
  "Extreme-heat home cooling without power": {
    sources: ["CDC Extreme Heat Guidance","FEMA Non-Powered Thermal Management"],
    guidance: [
      "Block out daytime sun: cover sun-facing windows with aluminum foil (facing outward to reflect light), white cardboard, or blankets hung behind the glass. Keep windows and blinds shut during the hottest hours.",
      "Create a nighttime draft: open windows on opposite sides of the house only once the outside temperature drops below the indoor temperature, and hang damp sheets across open windows to cool the incoming breeze.",
      "Cool the body's pulse points: soak cloths or bandanas in cool water and wrap them around the neck, wrists, groin, and armpits. Sponge arms and legs with water and let it evaporate off the skin.",
      "Stay on the lowest level: heat rises, so sleep on the ground floor or in a finished basement rather than upper stories. Avoid indoor heat sources like gas burners or ovens.",
    ],
  },
  "Common toxic foods (pets)": {
    sources: ["ASPCA Animal Poison Control Center","Merck Veterinary Manual, “Toxic Food Hazards for Small Animals”"],
    guidance: [
      "Chocolate, coffee, and caffeine: contain theobromine and caffeine, which dogs and cats can't break down. Signs include vomiting, diarrhea, rapid panting, extreme thirst, a racing heart, muscle tremors, seizures, and heart failure. Dark chocolate, baking chocolate, and cocoa powder are the most concentrated and dangerous.",
      "Grapes and raisins: even a small amount can trigger sudden, irreversible acute kidney failure in dogs. Toxicity is unpredictable — some dogs react severely to just a few. Early signs are vomiting, sluggishness, and refusing food, followed by reduced or absent urination.",
      "Onions, garlic, chives, and leeks: these destroy red blood cells in both dogs and cats, causing life-threatening anemia. Powdered forms in broths, soups, and seasoned meats are especially concentrated. Signs often take days to appear: weakness, pale gums, reddish or dark brown urine, and collapse.",
      "Macadamia nuts: cause severe muscle weakness, depression, vomiting, tremors, and high body temperature in dogs. Affected dogs often lose control of their hind legs within 12 hours.",
      "Yeast bread dough: raw rising dough expands rapidly in a pet's warm stomach, causing severe bloating, pain, and life-threatening stomach twisting. The yeast also produces alcohol as it ferments, which can cause alcohol poisoning, disorientation, hypothermia, and slowed breathing.",
    ],
  },
  "Veterinary activated-charcoal decision boundary": {
    sources: ["American College of Veterinary Emergency and Critical Care (ACVECC)","Merck Veterinary Manual, “Decontamination: Activated Charcoal Guidelines”"],
    guidance: [
      "Not a universal antidote: activated charcoal binds to many toxins in the stomach and intestines so they pass through harmlessly, but not all of them. It doesn't work against heavy metals (lead, zinc), alcohols (ethanol, methanol, antifreeze), petroleum products, or caustic acids and lye.",
      "Never give it to a drowsy, vomiting, or seizing animal: if an animal is stumbling, depressed, actively throwing up, or convulsing, charcoal carries a real risk of being inhaled into the lungs, which can cause severe, fatal pneumonia.",
      "Use medical activated charcoal only: never substitute burned toast, fireplace charcoal, or barbecue briquettes — briquettes contain toxic binders and lighter-fluid residue that would poison the animal further.",
      "Watch for salt-poisoning risk: medical-grade activated charcoal pulls a lot of fluid into the digestive tract, which can spike blood sodium to dangerous levels and cause brain swelling and seizures. Make sure the animal stays well-hydrated with access to fresh water.",
    ],
  },
  "Dog heatstroke": {
    sources: ["Journal of the American Veterinary Medical Association (JAVMA) heatstroke treatment protocols","British Small Animal Veterinary Association (BSAVA)"],
    guidance: [
      "Recognize the emergency early: heavy panting, thick sticky drool, bright red or dark purple gums and tongue, stumbling, glazed eyes, vomiting, and collapse. A rectal temperature above 104°F is critical, and above 106°F is life-threatening.",
      "Cool first, before moving them: the single most important step is lowering their body temperature right where you are, before transport. Waiting until you reach a clinic while they stay dangerously hot causes irreversible brain damage and organ failure.",
      "How to cool safely: move into shade or an air-conditioned room. Pour cool, tap-temperature water continuously over their body, chest, groin, and paw pads, and put a fan blowing across their wet fur to speed up evaporation.",
      "Never use ice water or an ice bath: extreme cold makes blood vessels near the skin clamp shut, trapping the heat deep in the core organs and triggering hypothermic shock.",
      "Stop active cooling at 103°F: their temperature keeps dropping even after you stop. Once it reaches 103°F, stop wetting them, dry them off loosely to avoid hypothermia, and get them to a vet.",
    ],
  },
  "Diarrhea isolation and oral rehydration": {
    sources: ["World Health Organization (WHO) Guidelines for the Treatment of Diarrhoea","CDC food and waterborne illness rehydration protocols"],
    guidance: [
      "Strict hygiene and isolation: severe infectious diarrhea spreads fast through contaminated hands, water, and surfaces. Isolate the ill person in one room, use a separate bathroom or twin-bucket toilet if you can, and wipe high-touch surfaces with a bleach-water solution. Wash hands thoroughly with soap and safe water after every contact.",
      "Recognize dangerous dehydration: little or no dark-yellow urine, a dry mouth and cracked lips, sunken eyes, skin that stays tented when pinched, a rapid pulse, dizziness on standing, or extreme weakness.",
      "Oral rehydration salts (ORS) formula: if commercial packets aren't available, mix the standard WHO emergency formula — 1 liter (about 1 quart) of boiled or safe bottled water, 6 level teaspoons of sugar, and 1/2 level teaspoon of table salt, stirred until fully dissolved.",
      "Never alter the ratio: too much salt or sugar can make the diarrhea worse and pull fluid out of the bloodstream, causing fatal dehydration — especially in young children and infants.",
      "Give frequent, tiny sips: one small sip or spoonful every 2 to 3 minutes, not a full cup at once — gulping triggers stomach spasms and vomiting. If they vomit, wait 10 minutes, then restart even more slowly.",
      "Discard unused solution after 24 hours: mix a fresh batch daily so bacteria doesn't grow in the sugary liquid.",
    ],
  },
  "Fuel storage, transfer, fire safety": {
    sources: ["National Fire Protection Association (NFPA 30 / NFPA 30A)","Consumer Product Safety Commission (CPSC) portable fuel container guidelines"],
    guidance: [
      "Use approved, dedicated containers: store fuel only in certified safety cans (red for gasoline, yellow for diesel, blue for kerosene) with vapor-tight caps and flame-arrestor screens — never a milk jug, glass jar, or open bucket.",
      "Keep containers outside living areas: store them in a well-ventilated shed or detached garage, away from direct sunlight, heaters, water heaters, and electrical panels. Never store fuel inside a home or basement.",
      "Prevent static sparks when filling: place portable cans flat on bare ground before filling — never inside a truck bed, on a plastic bed liner, or in a car trunk. Keep the nozzle in firm contact with the rim of the can the entire time you're filling it.",
      "Leave room for expansion: fill containers to no more than about 95% full. Fuel expands as it warms, and head space keeps vapors from forcing liquid out through the seams or vents.",
      "No open flames or hot surfaces: never refuel equipment while the engine is running or hot — shut it off and let it cool for 5 to 10 minutes before pouring.",
    ],
  },
  "Unknown pet poison response": {
    sources: ["American Society for the Prevention of Cruelty to Animals (ASPCA) Animal Poison Control Center","Merck Veterinary Manual"],
    guidance: [
      "Identify and remove the source immediately: take the remaining substance, wrapper, or plant away so the pet can't reach more of it, and keep other animals away from the area.",
      "Don't induce vomiting unless specifically directed: never give hydrogen peroxide, salt, or baking soda blindly. Inducing vomiting can cause severe chemical burns if the poison was caustic (acids, lye, drain cleaner) or fatal lung damage if it was petroleum-based.",
      "Preserve the evidence: bag the packaging, chew remnants, plant leaves, or a sample of any vomit in a sealed plastic bag so a veterinarian can inspect it.",
      "Decontaminate skin and eyes: if poison got on the fur or paws, stop them from grooming it off (a cone or a wrapped towel works), then wash the coat with warm water and mild dish soap. Flush eyes with sterile saline or clean lukewarm water for 10 to 15 minutes.",
      "Keep the pet calm and warm: wrap them loosely in a towel or blanket and monitor breathing. Avoid strenuous activity, which speeds up how fast the poison is absorbed.",
    ],
  },
  "Dog/cat NSAID and acetaminophen boundaries": {
    sources: ["U.S. Food and Drug Administration (FDA) Center for Veterinary Medicine","ASPCA Animal Poison Control"],
    guidance: [
      "Never give human pain relievers to cats or dogs: ibuprofen (Advil, Motrin), naproxen (Aleve), and acetaminophen (Tylenol) are highly toxic to pets even in tiny fractions of a human dose.",
      "Acetaminophen is lethal to cats: cats completely lack the liver enzymes needed to break it down. A single tablet can cause their red blood cells to lose the ability to carry oxygen (blood turns chocolate-brown, gums turn blue or gray), leading to rapid suffocation, liver failure, and death within hours.",
      "NSAIDs cause acute kidney and stomach failure in dogs: ibuprofen and naproxen cause severe stomach and intestinal ulcers, intestinal perforation, and sudden, irreversible kidney failure.",
      "Don't use baby aspirin as a home remedy either: even a low dose can cause serious gastrointestinal bleeding, clotting failure, and organ damage. Pain management in animals needs species-specific, veterinary-formulated medication only.",
    ],
  },
  "Dog xylitol exposure": {
    sources: ["U.S. Food and Drug Administration (FDA) Consumer Updates, “Paws Off Xylitol; It's Dangerous for Dogs”","American Animal Hospital Association (AAHA)"],
    guidance: [
      "Recognize hidden sources: xylitol (sometimes labeled \"birch bark extract\" or \"birch sugar\") is an artificial sweetener in sugar-free gum, peanut butter, chewable vitamins, baked goods, toothpaste, and mouthwash.",
      "Causes sudden, severe hypoglycemia: in dogs, xylitol triggers a massive, rapid insulin release that drops blood sugar to life-threatening levels within 10 to 60 minutes.",
      "Watch for critical symptoms: stumbling, extreme weakness, a wobbly \"drunken\" gait, vomiting, collapse, muscle tremors, seizures, and coma. High doses can cause acute liver failure within 12 to 24 hours.",
      "Immediate field action: if the dog is conscious and able to swallow, rub a high-sugar syrup (maple syrup, corn syrup, or honey) directly onto their gums with a finger to help counter the blood-sugar crash while getting them to emergency care. Don't force liquids down their throat.",
    ],
  },
  "Cat true-lily exposure": {
    sources: ["U.S. Food and Drug Administration (FDA), “Lovely Lilies and Curious Cats: A Dangerous Combination”","ASPCA Animal Poison Control Center"],
    guidance: [
      "Every part of a true lily is fatal to cats: lilies from the Lilium genus (Easter, Asiatic, Tiger, Stargazer) and Hemerocallis genus (daylilies) cause rapid, irreversible acute kidney failure in cats.",
      "Even microscopic exposure is toxic: chewing a petal, biting a leaf, brushing against the flower and grooming pollen off their fur, or drinking water from the vase can all cause fatal poisoning.",
      "Early warning signs: drooling, vomiting, loss of appetite, and extreme lethargy starting 1 to 3 hours after contact. Within 12 to 24 hours, kidney function shuts down — decreased or absent urination, dehydration, seizures, and death follow.",
      "Wash fur immediately: if pollen is visible on the coat, wash it off thoroughly with warm water and mild soap right away so they can't lick it off and swallow it.",
      "Speed determines survival: once acute kidney failure sets in, the damage is permanent. Aggressive IV fluid therapy at a veterinary clinic within the first 6 to 18 hours is the only thing that can save the kidneys.",
    ],
  },
  "Tornado warning shelter": {
    sources: ["NOAA / National Severe Storms Laboratory (NSSL)","FEMA Tornado Protection and Shelter Guidance"],
    guidance: [
      "Best location inside a building: go to the lowest floor available, ideally a basement or storm cellar. With no basement, use an interior room or hallway on the ground floor with no windows — a bathroom, closet, or center hallway.",
      "Put as many walls between you and the storm as possible: exterior walls and roofs take the brunt of wind force, so the center of the building gives the most protection.",
      "Protect your head and neck: flying debris causes most injuries and deaths. Cover yourself with a thick mattress, sleeping bags, or heavy blankets, and put on a bike, sports, or construction helmet if you have one. Crouch low on your knees and cover the back of your head with your hands.",
      "Mobile homes and vehicles are not safe: never try to ride out a tornado in a mobile home, manufactured house, camper, or vehicle. Leave immediately for a sturdy permanent structure or storm shelter. If you're caught outdoors with no structure nearby, lie flat in a low ditch or depression, cover your head, and stay alert for flash-flood runoff.",
      "Avoid large open-span rooms: stay out of gymnasiums, cafeterias, auditoriums, and big-box store showrooms, where broad roofs collapse easily under severe wind pressure.",
    ],
  },
  "Hurricane watch/warning/evacuation": {
    sources: ["NOAA / National Hurricane Center (NHC)","Ready.gov / FEMA Hurricane Preparedness"],
    guidance: [
      "Know the difference between watch and warning: a Hurricane Watch means hurricane-force conditions are possible in your area within 48 hours; a Hurricane Warning means sustained winds of 74 mph or higher are expected within 36 hours.",
      "Heed evacuation orders immediately: if local officials or emergency broadcasts call for evacuation, leave right away. Once winds reach tropical storm strength (around 39 mph), high-profile bridges close, roads flood, and emergency response stops.",
      "Secure the exterior of your home: cover glass windows with storm shutters or 5/8-inch exterior-grade plywood cut to fit ahead of time. Taping windows does not stop glass from breaking, and makes the shards larger and more dangerous. Bring patio furniture, grills, garbage cans, and loose yard tools indoors.",
      "Store emergency utilities before landfall: turn refrigerators and freezers to their coldest setting and keep the doors closed to hold the cold longer during a power failure. Fill bathtubs, clean sinks, and spare jugs with water for flushing toilets and sanitation once water pressure drops.",
    ],
  },
  "Storm surge evacuation": {
    sources: ["NOAA National Hurricane Center Storm Surge Unit","FEMA"],
    guidance: [
      "Recognize the deadliest hurricane threat: storm surge — water pushed ashore by powerful hurricane winds — causes nearly half of all hurricane-related deaths and rises far faster than rainfall flooding.",
      "Horizontal evacuation is essential: you can't ride out major storm surge by climbing to a second story or roof. Rising water and waves undermine foundations and can collapse entire structures. The only real defense is evacuating inland, out of the surge zone.",
      "Know your evacuation zone beforehand: storm surge zones are based on ground elevation and water proximity, not flood insurance zones. If you're in an assigned coastal or bayou evacuation zone, leave the moment an order is issued.",
      "Leave before water reaches access roads: low-lying coastal roads and causeways flood hours before the hurricane's center arrives. Wait too long and your vehicle can easily get trapped or swept away.",
    ],
  },
  "Power-dependent medical equipment failure plan": {
    sources: ["U.S. Department of Health and Human Services (HHS emPOWER Program)","American Red Cross Disability and Disaster Preparedness"],
    guidance: [
      "Prioritize life-support devices immediately: know which equipment is non-negotiable for survival (ventilators, oxygen concentrators, IV infusion pumps, dialysis) versus comfort or therapy (a standard CPAP, nebulizers).",
      "Have manual and unpowered backups ready: keep a manual resuscitator bag (bag-valve-mask) accessible for anyone on a ventilator, plus manual blood pressure cuffs and hand-cranked or bulb suction devices.",
      "Conserve oxygen supply: if an oxygen concentrator loses power, switch immediately to backup compressed gas cylinders. Conserve tank volume by keeping the person resting flat or seated quietly to reduce their oxygen demand.",
      "Keep battery banks conditioned: maintain a dedicated UPS or lithium battery power station solely for critical devices. Know its exact runtime in hours, and turn off display backlights, heating humidifiers on breathing circuits, and accessory alarms that drain the battery faster.",
      "Set a relocation threshold in advance: don't wait until the last battery dies to act. Once remaining backup power drops below 25% or 2 to 3 hours of runtime, evacuate immediately to a predetermined shelter, fire station, or hospital with emergency generator power.",
    ],
  },
  "Water inventory and treatment supplies": {
    sources: ["CDC","FEMA, Food and Water in an Emergency"],
    guidance: [
      "Baseline survival calculation: store at least 1 gallon of potable water per person per day for a minimum of 3 days, and aim for a 2-week supply when you have the space. Add 0.5 to 1 gallon per day extra for pets, nursing mothers, hot climates, or anyone sick.",
      "Safe storage containers: use only heavy-duty, food-grade plastic containers (marked HDPE, recycling symbol #2 or #4) or factory-sealed bottled water. Never store water in a container that previously held bleach, chemicals, motor oil, or milk — milk proteins can't be cleaned out and will breed bacteria.",
      "Disinfection chemical storage: keep plain, unscented household liquid chlorine bleach (5% to 9% sodium hypochlorite) less than 6 to 12 months old, since bleach loses potency over time, especially in heat. Store calcium hypochlorite pool shock or sodium dichloroisocyanurate (NaDCC) tablets in airtight, moisture-proof containers for longer-term storage.",
      "Mechanical filtration inventory: stock hollow-fiber membrane filters (0.1 to 0.2 micron rating) to remove bacteria and parasites, along with replacement cartridges, a backwash syringe to clear clogs, and coffee filters or clean bandanas to strain out heavy mud before filtering.",
    ],
  },
  "Medical/prescription/OTC inventory and expirations": {
    sources: ["U.S. Food and Drug Administration (FDA), Drug Expiration Dates","American Medical Association (AMA) Emergency Prescription Preparedness"],
    guidance: [
      "Keep a prescription reserve: maintain at least a 7 to 14 day emergency buffer (ideally 30 days) of critical daily medications — insulin, blood pressure medication, heart medication, inhalers. Rotate stock by using the oldest bottles first and putting new refills at the back of the shelf.",
      "Stock critical over-the-counter items: fever reducers and pain relievers (acetaminophen, ibuprofen), antihistamines (diphenhydramine), anti-diarrheals (loperamide), oral rehydration salt packets, antiseptic wash, and topical antibiotic ointment.",
      "Understand what expiration dates actually mean: the printed date guarantees full potency and stability. Solid dry tablets like ibuprofen often stay meaningfully effective well past that date if kept cool and dry — but never rely on expired liquid suspensions, opened eye drops, nitroglycerin, or insulin, which lose potency fast or can grow bacteria.",
      "Watch temperature-sensitive drugs closely: keep insulin, biologics, and liquid antibiotics between 36°F and 46°F as long as you can. During an outage, an unopened insulin vial kept at moderate room temperature (below 86°F) stays usable for up to 28 days — just protect it from freezing and direct sunlight.",
    ],
  },
  "Sepsis warning signs": {
    sources: ["CDC, Get Ahead of Sepsis","Sepsis Alliance guidelines"],
    guidance: [
      "Recognize the core combination: sepsis happens when the body has an extreme, toxic response to an infection it already has — a UTI, pneumonia, an infected cut, a stomach bug, anything.",
      "Watch for the \"TIME\" red flags: Temperature higher or lower than normal (feverish, or shivering violently with cold skin); Infection signs (a cough, burning urination, a red wound, belly pain); Mental decline (confused, sleepy, slurred speech, hard to wake); Extremely ill (\"I feel like I might die,\" severe body aches, a racing heart, extreme shortness of breath).",
      "Watch for signs of septic shock: rapid, shallow breathing, mottled or discolored skin or lips, clammy sweat, dizziness, and very little or no urine output.",
      "Treat it as top-priority and get to clinical care: sepsis deteriorates rapidly into organ failure without IV antibiotics and fluids. Keep the person lying down, warm, and comfortable while getting them evacuated to care.",
    ],
  },
  "Aircraft impact/explosion in a building": {
    sources: ["National Fire Protection Association (NFPA) High-Rise Building Evacuation Standards","FEMA, Explosions and Building Collapse"],
    guidance: [
      "Drop and protect against secondary blasts: if an explosion or impact rocks the building, drop to the floor under a sturdy desk or table immediately to shield yourself from falling ceilings, overhead pipes, and flying glass.",
      "Evacuate immediately via stairs: don't stay to assess damage. Grab shoes and your go-bag if they're within reach and leave down the nearest emergency stairwell — never use elevators, which can lose power, lock up, or fill with smoke.",
      "Stay low and check doors: smoke, heat, and vaporized fuel rise fast. Crawl on hands and knees if there's smoke, and feel doorknobs with the back of your hand before opening them to avoid walking into a flash fire.",
      "Watch for falling debris outside: once out, keep moving away — don't stand right by the entrance. Falling glass and masonry can shower streets blocks away. Move upwind and away from the building's exterior.",
    ],
  },
  "Hot-water tank safe isolation and draining": {
    sources: ["CDC, Finding Water in an Emergency","FEMA Emergency Water Supplies"],
    guidance: [
      "Shut off the power or fuel first: turn off the water heater's dedicated breaker at the electrical panel (electric tanks), or turn the gas control knob to OFF or PILOT (gas tanks). Draining a powered electric tank will burn out the heating elements instantly and can start an electrical fire.",
      "Shut off the incoming water supply: close the cold-water inlet valve on the pipe entering the top of the tank (clockwise until closed) so contaminated municipal water can't get into the clean reserve.",
      "Connect a hose and relieve pressure: attach a garden hose to the drain valve at the base of the tank into clean food-grade buckets. Open a hot-water faucet upstairs, or lift the tank's Temperature & Pressure relief valve lever, to break the internal vacuum so water flows freely from the bottom.",
      "Filter and treat the drained water: the first few gallons may carry sediment, rust, or mineral flakes. Run it through a clean cloth or coffee filter, then boil or chemically disinfect it before drinking.",
    ],
  },
  "River / prolonged inland flood": {
    sources: ["Ready.gov / FEMA Inland Flooding Hazards","National Weather Service (NWS) River Forecast Centers"],
    guidance: [
      "Watch for a slow, steady rise: unlike flash floods that rush in suddenly, river flooding can build over days as upstream runoff, snowmelt, or prolonged heavy rain collects in the main channel.",
      "Elevate critical utilities and belongings early: if you have advance warning, move valuable gear, dry goods, and battery banks to upper floors, and get electrical appliances up off the floor where you safely can.",
      "Shut off utilities before water reaches the living space: turn off the main electrical breaker and the main water supply valve before floodwater reaches wall outlets, wiring, or plumbing. Never enter standing water to reach a breaker box.",
      "Evacuate well before access roads go under: your property can end up surrounded by rising water while the house itself stays dry, cutting off your escape route. Leave early on designated high-ground routes so you don't get stranded without power, clean water, or emergency access.",
    ],
  },
  "Wildfire warning, evacuation, smoke": {
    sources: ["National Fire Protection Association (NFPA) Firewise USA","Ready.gov / FEMA Wildfire Preparedness"],
    guidance: [
      "Leave at the first warning: wind-driven wildfires spread faster than vehicles can outrun and can shift direction erratically. If an evacuation warning or order is issued, pack your go-bag and leave immediately — don't stay behind to wet the roof with a garden hose.",
      "Prep the house only if you have real spare time: clear dry leaves and pine needles from the porch, close all windows and doors to slow drafts, and shut off exterior propane tanks at the main valve. Leave exterior lights on so firefighters can find the structure through smoke.",
      "Dress for radiant heat: wear natural-fiber clothing (100% cotton or wool, not synthetics), heavy leather boots, long pants and sleeves, work gloves, and a tight-fitting N95 or P100 respirator for ash and smoke.",
      "Driving through smoke: headlights and hazards on, windows fully up, AC on max recirculation so it doesn't pull smoke and embers into the cabin. If flames trap you, stay in the vehicle, park away from heavy brush, get below window level, and cover up with a wool or cotton blanket until the fire front passes.",
    ],
  },
  "Earthquake shaking and aftershocks": {
    sources: ["USGS Earthquake Hazards Program","Ready.gov / FEMA Earthquake Safety"],
    guidance: [
      "Drop, Cover, and Hold On: drop onto your hands and knees immediately so the shaking can't knock you down. Get under a sturdy table or desk, cover your head and neck with one arm, and hold onto the table leg with the other until the shaking fully stops.",
      "No table available: crawl against an interior wall away from windows, tall furniture, mirrors, and anything hanging. Sit with your back to the wall, knees tucked to your chest, both hands clamped over the back of your head and neck.",
      "Don't run outside during shaking: running out while the ground is moving exposes you to falling bricks, shattered glass, and collapsing facades — the leading cause of earthquake injury. Stay inside until shaking completely stops, then exit calmly via stairs, never elevators.",
      "Be ready for aftershocks: they can hit seconds, hours, or days later and can collapse already-weakened structures. Check for gas odors, water leaks, or broken wiring, and shut off any damaged utility immediately if it's safe to do so.",
    ],
  },
  "Frozen pipe prevention and thawing": {
    sources: ["American Red Cross, Preventing and Thawing Frozen Pipes"],
    guidance: [
      "Prevent freezing before it starts: open cabinet doors under sinks on outside walls so warm indoor air reaches the pipes, and let cold-water faucets drip slightly — a pencil-lead-thin trickle keeps water moving and relieves pressure.",
      "Find the freeze point: if a faucet only trickles or stops entirely in freezing weather, leave it open so steam and melting water have somewhere to go, and trace the line toward exterior walls, crawlspaces, or unheated basements.",
      "Thaw safely: apply gentle, indirect heat with a hair dryer, warm damp towels wrapped around the pipe, or an electric heating pad wrapped loosely around it. Work from the open faucet back toward the blockage so melting water can drain.",
      "Never use an open flame: a blowtorch, propane torch, kerosene heater, or open flame can superheat steam trapped inside the pipe and make it explode, or ignite the wood framing around it.",
    ],
  },
  "Sewage backup": {
    sources: ["CDC","EPA, Septic Systems After a Disaster"],
    guidance: [
      "Stop using all indoor water immediately: shut off the water supply or stop running faucets, showers, washing machines, and flushing toilets — adding any wastewater pushes sewage higher up through ground-floor drains, tubs, and toilets.",
      "Avoid all contact with blackwater: raw sewage carries harmful bacteria, viruses, and parasites. Wear rubber boots, heavy waterproof gloves, and eye protection if you have to walk near backed-up areas, and keep children and pets completely away.",
      "Don't use chemical drain openers on backed-up sewage: caustic chemicals sit trapped in standing toilet or shower water, creating a splash-burn hazard without clearing the underlying main-line blockage.",
      "Signs of drainfield/septic failure: spongy, foul-smelling, wet soil over the septic tank or drainfield, slow drainage across every household fixture at once, or gurgling in the plumbing. Switch to a separate twin-bucket emergency toilet until the ground drains and the tank can be pumped.",
    ],
  },
  "Septic failure": {
    sources: ["CDC","EPA, Septic Systems After a Disaster"],
    guidance: [
      "Stop using all indoor water immediately: shut off the water supply or stop running faucets, showers, washing machines, and flushing toilets — adding any wastewater pushes sewage higher up through ground-floor drains, tubs, and toilets.",
      "Avoid all contact with blackwater: raw sewage carries harmful bacteria, viruses, and parasites. Wear rubber boots, heavy waterproof gloves, and eye protection if you have to walk near backed-up areas, and keep children and pets completely away.",
      "Don't use chemical drain openers on backed-up sewage: caustic chemicals sit trapped in standing toilet or shower water, creating a splash-burn hazard without clearing the underlying main-line blockage.",
      "Signs of drainfield/septic failure: spongy, foul-smelling, wet soil over the septic tank or drainfield, slow drainage across every household fixture at once, or gurgling in the plumbing. Switch to a separate twin-bucket emergency toilet until the ground drains and the tank can be pumped.",
    ],
  },
  "Roof leak and temporary tarp": {
    sources: ["FEMA","Federal Alliance for Safe Homes (FLASH), Temporary Emergency Roof Tarping Guidelines"],
    guidance: [
      "Catch water inside first: put large buckets or bins right under the drip. If water is pooling behind a sagging ceiling bulge, carefully poke a small hole in the center of the bulge with a screwdriver to drain it into a bucket before the ceiling collapses on its own.",
      "Never climb onto a wet or windblown roof: don't attempt repairs during active rain, ice, or high wind. Wait until the storm passes and surfaces are dry and winds have died down.",
      "Tarp placement, the overhang rule: use a heavy-duty waterproof tarp big enough to cover the damage and extend at least 4 feet past it on every side, running the top edge up and over the roof ridge so rain can't run underneath the top seam.",
      "Secure the edges with 2x4 lumber: wrap the tarp's edges around wooden boards and screw the boards down flat against the decking — never nail directly through bare tarp fabric, since high wind will tear the grommets right out.",
    ],
  },
  "Rainwater collection and first-flush contamination": {
    sources: ["CDC Rainwater Collection","Texas A&M AgriLife Extension Rainwater Harvesting Guidelines"],
    guidance: [
      "The first-flush rule: the first 10 to 20 gallons of roof or tarp runoff wash down accumulated bird droppings, dust, pollen, heavy metals, and debris. Divert and discard that first dirty flush before directing water into your collection barrels.",
      "Choose clean catchment surfaces: corrugated metal, glass, and food-grade plastic sheeting give the cleanest runoff. Avoid old asphalt-shingle roofs, which leach petroleum hydrocarbons, and lead-flashed roofs.",
      "Pre-filter debris: keep a fine mesh screen over the intake opening to block leaves, twigs, and insects.",
      "Always treat before drinking: collected rainwater isn't automatically safe to drink. Filter out fine silt, then bring it to a rolling boil or disinfect it with plain unscented bleach before drinking or cooking with it.",
    ],
  },
  "UV purification methods (e.g. SODIS, UV pens)": {
    sources: ["World Health Organization (WHO) Solar Water Disinfection Technical Notes","CDC Water Treatment Technologies for Remote Operations"],
    guidance: [
      "Pre-filter first: UV light can't penetrate cloudy, turbid, or muddy water — suspended dirt shields bacteria and parasites from the rays. Filter cloudy water through a clean cloth, coffee filter, or sediment filter until clear before using UV.",
      "Solar Water Disinfection (SODIS): fill clean, clear, uncolored PET plastic bottles (1 to 2 liters) with clear water. Shake for 20 seconds to add oxygen, then lay the bottles flat on a reflective surface (corrugated metal or foil) in direct sun for at least 6 straight hours, or 2 full days if it's overcast.",
      "Portable UV pens: submerge the quartz lamp in clear water and stir continuously for the time the manufacturer specifies, usually 60 to 90 seconds per liter, so every part of the water gets an effective dose.",
      "Know the limits: UV damages the DNA of bacteria, viruses, and parasites to neutralize them, but it removes zero chemicals, heavy metals, pesticides, or dissolved fuel. Never rely on UV alone for chemically or industrially contaminated water.",
    ],
  },
  "Broken water pipe isolation and temp patch": {
    sources: ["American Red Cross, Repairing Flooded and Damaged Homes","FEMA Home Water System Recovery"],
    guidance: [
      "Shut off the main supply valve immediately: find your home's main shutoff (usually a basement, crawlspace, or outdoor meter box near the street) and turn it fully clockwise until the water stops.",
      "Drain the remaining pressure: open the lowest cold-water faucets in the house plus an outdoor hose bib to drain water trapped in the lines and relieve pressure at the leak.",
      "Improvised rubber-and-clamp patch: cut a strip of thick rubber (a bicycle inner tube, heavy garden hose, or rubber boot works) and wrap it tightly around the split section. Secure it with an adjustable metal hose clamp tightened directly over the tear.",
      "Tape or wrap method for small leaks: for a low-pressure pinhole leak, dry the pipe surface thoroughly and wrap self-fusing silicone tape or heavy rubber rescue tape, overlapping the split by several inches on each side.",
    ],
  },
  "Contaminated coat/skin decontamination": {
    sources: ["ASPCA Animal Poison Control Center","Merck Veterinary Manual, Dermal Decontamination in Small Animals"],
    guidance: [
      "Protect yourself first: wear rubber gloves, eye protection, and long sleeves — chemicals and toxins on fur transfer quickly to human skin during washing.",
      "Stop the animal from self-grooming: put on an Elizabethan cone or wrap a towel snugly around its neck right away, since licking contaminated fur carries external poison straight into their stomach.",
      "Remove dry powders before water: brush, comb, or vacuum dry chemical powder off the coat first — wetting some dry chemicals triggers caustic reactions or drives them deeper into the skin.",
      "Wash with dish soap: bathe in warm water with a mild liquid dish soap (like Dawn), which strips oily, chemical, and petroleum residue far better than pet shampoo. Lather and rinse thoroughly with plenty of running water, keeping soap away from eyes and ears.",
      "Loosen sticky substances with oil first: for matted motor oil, tar, sap, or glue, massage in mineral oil, vegetable oil, or butter to soften it before washing out with dish soap.",
      "Never use chemical solvents: paint thinner, mineral spirits, kerosene, or gasoline destroy the skin barrier, cause chemical burns, and can absorb into the bloodstream as systemic poison.",
    ],
  },
  "Milk thistle/silymarin evidence and limits": {
    sources: ["Plumb's Veterinary Drug Handbook","ASPCA Animal Poison Control Center, Silymarin/Silybin Hepatoprotective Guidelines"],
    guidance: [
      "Its real veterinary use: purified silymarin (milk thistle's active extract, found in products like Denamarin) is used as a supportive liver antioxidant — it helps stabilize liver cells and protect against specific liver toxins, such as death cap mushroom poisoning.",
      "It is not an immediate antidote: silymarin supports cell repair over time, but doesn't neutralize poisons directly, reverse kidney failure, or stop an acute toxic reaction. It can't replace emergency decontamination or IV fluids.",
      "Raw plant versus purified extract: don't feed raw milk thistle plants or unverified human teas to pets. The raw plant can accumulate toxic nitrates, and human herbal capsules often have fillers, added xylitol, or inconsistent dosing that causes digestive distress.",
      "Watch for drug interactions: milk thistle changes how the liver clears certain prescription drugs. Don't start high doses without veterinary guidance if the animal is on medication for heart disease, seizures, or infections.",
    ],
  },
  "Wild game handling and cooking": {
    sources: ["USDA Food Safety and Inspection Service (FSIS), Wild Game from Field to Table","CDC, Trichinellosis and CWD Prevention Guidelines"],
    guidance: [
      "Field dress immediately: remove the entrails within an hour of harvest so gut bacteria don't migrate into the meat, and keep the carcass elevated off dirt or mud and clear of intestinal contents.",
      "Cool it fast: get the carcass below 40°F as quickly as you can — bacteria multiply rapidly in warm meat and cause dangerous food poisoning.",
      "Reject high-risk tissue: never eat the brain, eyes, spinal cord, spleen, or tonsils of deer, elk, or moose, due to Chronic Wasting Disease prions, and avoid cutting through the spinal column with a bone saw.",
      "Cook to safe temperatures: wild game steaks, roasts, and whole cuts to at least 145°F (with a 3-minute rest), ground wild game to at least 160°F, and wild poultry or waterfowl to 165°F.",
      "Never undercook bear or boar: wild bear, cougar, and feral hog meat can carry Trichinella parasites. Cook it to at least 165°F throughout — freezing does not reliably kill wild cold-resistant Trichinella.",
    ],
  },
  "Structural damage and unsafe-building signs": {
    sources: ["FEMA","Applied Technology Council (ATC-20), Post-Earthquake Safety Evaluation of Buildings"],
    guidance: [
      "Exterior warning signs: cracked or crumbling foundation walls, shifting or separation between walls and the foundation, a sagging roofline, a chimney leaning or pulling away from the house, or ground cracks near load-bearing walls.",
      "Interior warning signs: doors or windows that suddenly jam and won't open or close, large diagonal drywall cracks spreading from door-frame corners, sagging or bouncy floors, or daylight visible through gaps at floorboards or wall corners.",
      "Leave immediately if you detect active shifting: loud groaning, creaking, or popping from the framing, or drywall dust falling from the ceiling, means evacuate everyone outside right away.",
      "Don't re-enter a compromised structure: never go back into a building that's shifted off its foundation, is missing exterior support posts, or shows water-line marks above floor height, until a professional inspector or structural engineer clears it.",
    ],
  },
  "Water-heater isolation": {
    sources: ["CDC, Finding Water in an Emergency","Ready.gov / FEMA"],
    guidance: [
      "Shut off the heating source first: flip the water heater's breaker at the electrical panel (electric tanks) or turn the gas valve to OFF (gas tanks). Running or draining a tank with the heating element still active burns it out or creates a fire hazard.",
      "Close the cold-water inlet valve: turn the handle on the cold-water supply pipe at the top of the tank clockwise until it stops — this isolates the water inside from backflow contamination if the municipal supply loses pressure or gets contaminated.",
      "Relieve tank pressure: open a hot-water faucet anywhere in the house to break the internal vacuum, or gently lift the lever on the Temperature and Pressure relief valve near the top of the tank.",
      "Use it as an emergency water reservoir: once isolated from the city supply, attach a hose to the drain valve at the bottom to collect the safe, clean water stored inside.",
    ],
  },
  "Chainsaw and cutting-tool safety": {
    sources: ["OSHA 3269-10N, Chainsaw Safety Guidelines","CDC / NIOSH"],
    guidance: [
      "Wear the essential protective gear: chainsaw chaps or cut-resistant pants, heavy leather work boots (steel-toe preferred), non-slip leather gloves, eye protection, and hearing protection before you start the saw.",
      "Watch for kickback: never cut with the upper tip of the bar — the \"kickback zone.\" Contacting wood or brush with the tip snaps the bar violently up and back toward your face and chest. Keep both hands firmly on the handles with your left thumb locked under the front handlebar.",
      "Identify wood under tension before cutting: inspect downed storm debris for compression and tension first. Limbs pinned under weight (\"spring poles\") can whip out or snap back violently when cut. Cut a relief notch on the compression side before the final release cut.",
      "Clear your footing and escape path: clear loose brush, mud, and trip hazards around your feet before cutting, and always keep a clear escape path diagonally backward, away from the falling log or tree.",
    ],
  },
  "Safe indoor lighting during blackout": {
    sources: ["National Fire Protection Association (NFPA)","FEMA, Home Fires and Power Outage Safety"],
    guidance: [
      "Prioritize battery and solar light: rely on battery-powered LED lanterns, flashlights, headlamps, or glow sticks as your main light source instead of open flames.",
      "The open-flame candle rule: avoid candles whenever you can — unattended candles cause a large share of residential post-disaster fires.",
      "If you must use candles: place them in sturdy, non-combustible holders (metal, ceramic, or glass) set inside a wide metal pie tin or bowl, at least 12 inches from anything flammable like curtains, bedding, or paper.",
      "Never leave a burning candle unattended: put every candle out before leaving the room or going to sleep, and never let children or pets near an open flame.",
      "Never use outdoor fuel lanterns indoors: kerosene lamps, white-gas lanterns, or liquid-fuel camp lights burn oxygen and release carbon monoxide — never light them in an unventilated indoor room.",
    ],
  },
  "Outdoor cooking placement and fire control": {
    sources: ["Consumer Product Safety Commission (CPSC)","NFPA 58 (Liquefied Petroleum Gas Code) outdoor cooking guidelines"],
    guidance: [
      "Maintain outdoor clearance: set up camp stoves, charcoal grills, and turkey fryers on level bare dirt, gravel, or concrete, at least 10 feet from house walls, wooden deck railings, and low-hanging branches.",
      "Never cook in enclosed spaces: never use charcoal, propane burners, or camp stoves inside a tent, camper, garage, carport, breezeway, or screened porch, even with the windows open.",
      "Prep fire control before lighting: keep a working Class ABC fire extinguisher, a shovel, and a bucket of water or sand right next to the cooking area before you strike a match.",
      "Never leave hot cookers unattended: hot coals and burner flames can flare up instantly from dripping grease. Keep a safe perimeter and keep children and pets back.",
    ],
  },
  "Campfire site and extinguishment": {
    sources: ["U.S. Forest Service (USFS) Campfire Safety and Extinguishment Protocols","Scouting America"],
    guidance: [
      "Choose and prep a safe site: pick a flat spot sheltered from wind, at least 15 feet from tent walls, shrubs, and low branches, and clear pine needles, leaves, and dry grass down to bare soil in a 10-foot circle around the pit.",
      "Build a containment ring: circle the fire pit with rocks, but avoid smooth, rounded river or creek-bed stones — trapped moisture inside them can boil and make the rocks crack or explode under heat.",
      "Keep fires manageable: burn small, dry pieces of wood rather than a large bonfire that throws floating embers into surrounding trees.",
      "The \"Drown, Stir, Feel\" rule: drown the entire fire and all embers with water until hissing stops; stir the ashes and coals with a stick or shovel, mixing in dirt and water and scraping embers from under logs; then feel for heat by holding the back of your bare hand over the coals — repeat until it's cold to the touch.",
    ],
  },
  "Wildland fire ignition restrictions": {
    sources: ["U.S. Forest Service (USFS)","Bureau of Land Management (BLM) Interagency Fire Restriction Standards"],
    guidance: [
      "Know the restriction levels: Stage 1 generally bans open campfires outside designated metal fire rings at developed campsites; Stage 2 bans all campfires, charcoal grills, open flames, and outdoor smoking except inside an enclosed vehicle or building.",
      "Prohibited equipment during bans: running chainsaws, cutting torches, or welding gear without a spark arrestor and a dedicated water extinguisher is prohibited, and you should never drive or idle a vehicle over dry grass — hot exhaust and catalytic converters spark brushfires easily.",
      "Shooting and explosives: target shooting with steel-core or tracer ammo, and all recreational explosives or fireworks, are strictly barred during fire restrictions.",
      "Extinguishment standard where fires are still allowed: keep a shovel and at least 5 gallons of water beside the pit, and drown coals until they're cold to the touch before you leave.",
    ],
  },
  "Temporary shelter and ventilation": {
    sources: ["U.S. Army Survival Manual (FM 21-76 / ATP 3-50.21), Shelter Construction","FEMA Emergency Shelter Guidelines"],
    guidance: [
      "The two-point airflow rule: any enclosed temporary shelter — a tarp lean-to, emergency tent, or plastic-sheeted shelter — needs a low-level air intake and a high-level exhaust vent to prevent asphyxiation and stop condensation from building up.",
      "Never burn fuel inside an enclosed shelter: charcoal stoves, propane camp burners, and kerosene heaters can push carbon monoxide to lethal levels in minutes, and fabric walls provide zero dilution.",
      "Prevent condensation-driven hypothermia: breathing releases a surprising amount of moisture overnight. Without cross-ventilation, it condenses on the shelter walls, drips onto blankets, and strips away clothing insulation, raising hypothermia risk.",
      "Get the tarp angle and tension right: pitch tarps at least 30 to 45 degrees with firm stake tension — a flat roof collects pooled rainwater that stretches the material and can collapse the shelter.",
    ],
  },
  "Winter outage and safe-room selection": {
    sources: ["American Red Cross Winter Storm Preparedness","CDC, Stay Safe During a Winter Power Outage"],
    guidance: [
      "Pick a small, interior room: choose the room with the fewest exterior walls and windows — an interior bedroom, living room, or central hallway. Smaller rooms hold body heat far better than large open spaces.",
      "Insulate windows and doors: hang heavy blankets, quilts, or sleeping bags over windows to cut radiant heat loss, and press rolled towels or rugs tightly along the bottom of doors leading to unused rooms.",
      "Build a shelter within the shelter: pitch a small camping tent inside the chosen room, on a carpet or mattress, or build a blanket fort over a sturdy table — sleeping in that smaller space traps body heat and raises the sleeping temperature noticeably.",
      "Keep everyone together: gather all family members and pets in the one designated safe room. Shared body heat helps keep the space livable through multi-day sub-freezing outages.",
    ],
  },
  "Temporary toilet / twin-bucket system": {
    sources: ["The Twin-Bucket Emergency Toilet system (developed by Christchurch emergency response, recognized by FEMA / Red Cross disaster sanitation partners)"],
    guidance: [
      "Separate pee and poop into two buckets: use two distinct 5-gallon buckets, one marked exclusively for urine and one for feces. Keeping them separate prevents the odor-causing chemical reaction and keeps the dry bucket manageable.",
      "The urine bucket: urinate directly into it without adding toilet paper. When full, dilute it with water and pour it onto bare soil or gravel at least 100 feet from any water source, garden, or well.",
      "The feces bucket: line it with a heavy-duty (3 to 5 mil) contractor trash bag. After every use, cover the waste completely with a layer of dry carbon material — sawdust, dry dirt, peat moss, shredded paper, or dry crushed leaves — to seal in moisture and keep flies out.",
      "Store it airtight: keep a tight-fitting lid on between uses. Once the bag is about two-thirds full, tie it off securely and store it in a covered, animal-proof outdoor bin until collection resumes.",
    ],
  },
  "General emergency sanitation without running water": {
    sources: ["CDC Emergency Disinfection and Hygiene","WHO, Sanitation in Emergency Settings"],
    guidance: [
      "Protect the clean-water barrier: keep drinking and cooking water physically separate from cleaning and handwashing buckets, and never dip unwashed hands into a clean reserve.",
      "Set up a gravity handwashing station: poke a small hole near the bottom of a plastic jug with a golf tee or pencil as a plug, or use a jug with a push-spigot. Set it on a crate with a catch basin below, soap on a string, and a clean towel.",
      "Hand hygiene rules: wash hands with soap and water for 20 seconds, or use a hand sanitizer with at least 60% alcohol, before touching food and after every bathroom use.",
      "Disinfect food-prep surfaces: wipe counters and cutting boards with a mild bleach solution (1 tablespoon unscented household bleach per gallon of cool water) and let it air-dry before food touches it.",
    ],
  },
  "Mold and wet-building cleanup": {
    sources: ["EPA, A Brief Guide to Mold, Moisture, and Your Home","CDC, Clean Up After a Flood and Address Mold"],
    guidance: [
      "The 24-to-48-hour rule: mold starts growing on damp drywall, carpet, and wood within 24 to 48 hours of water exposure. Open windows and run fans or a dehumidifier right away if you have power to circulate air.",
      "Wear real protective gear: an N95 or P100 respirator, unvented eye goggles, and heavy rubber gloves before disturbing or tearing out moldy drywall or flooring.",
      "Discard porous materials: throw away soaked carpet, padding, ceiling tiles, mattresses, upholstered furniture, and drywall cut at least 12 to 24 inches above the high-water line — porous materials can't be fully disinfected once they've soaked up floodwater.",
      "Clean hard surfaces safely: scrub solid wood, metal, and concrete with soap, clean water, and a stiff brush, then wipe with a disinfectant. Never mix ammonia and bleach together — it creates lethal chloramine gas.",
    ],
  },
  "Pregnancy considerations across scenarios": {
    sources: ["American College of Obstetricians and Gynecologists (ACOG) Committee Statement on Disaster Preparedness","CDC, Pregnancy in Emergencies"],
    guidance: [
      "Prioritize hydration and rest: dehydration can directly trigger uterine contractions and false or preterm labor. Prioritize clean drinking water (at least 1 gallon a day) and avoid heavy lifting or disaster debris cleanup.",
      "Watch for urgent warning signs: get medical care immediately for vaginal bleeding or fluid leakage, regular painful contractions before 37 weeks, sudden severe swelling in the face or hands, a severe persistent headache, or visual changes like flashes or blurriness — signs of preeclampsia.",
      "Sleep on the left side: when resting in a shelter or temporary quarters, lying on the left side relieves pressure on major blood vessels and keeps blood and oxygen flowing to the fetus.",
      "Protect against environmental hazards: avoid breathing wildfire smoke (wear an N95 if outdoor air is bad), never touch or wade through floodwater, and use an EPA-registered insect repellent to guard against mosquito-borne illness.",
      "Pack dedicated pregnancy records: keep paper copies of prenatal records, blood type, gestational age, and your doctor's contact info sealed in a waterproof bag inside your go-bag.",
    ],
  },
  "Family communication plan and rendezvous points": {
    sources: ["Ready.gov / FEMA Family Emergency Communication Plan","American Red Cross"],
    guidance: [
      "Pick an out-of-town contact: one relative or friend outside your immediate region or state as the central check-in person — long-distance lines and texts often connect after a disaster when local networks are jammed.",
      "Text instead of calling: texts use far less network bandwidth than calls and often slip through congested cell towers when voice calls fail.",
      "Set three distinct meeting points: an immediate spot just outside the house (a specific tree, mailbox, or driveway edge) for a sudden emergency like a fire; a neighborhood spot — a library, park, or community center — if your street is blocked; and a regional spot, a relative's home, civic building, or place of worship in a neighboring town, if the whole city evacuates.",
      "Carry paper contact cards: don't rely only on phone address books. Give every family member, kids included, a laminated card in their backpack with the out-of-town contact's name, number, and the agreed meeting points.",
    ],
  },
  "Evacuation zones and shelter locations": {
    sources: ["Ready.gov / FEMA Evacuation and Shelter Guidelines","American Red Cross Disaster Shelter Operations"],
    guidance: [
      "Know your zone before an emergency: coastal and flood-prone communities assign lettered or numbered zones (Zone A, Zone 1) based on elevation and surge risk, not city borders. Find your home's exact zone on county emergency-management maps ahead of time.",
      "Heed zone-specific evacuation orders: leave immediately when authorities call an evacuation for your zone. Lower-risk zones should stay put to keep evacuation routes clear for people in real danger.",
      "Find shelters offline: local shelters (often high schools or civic centers) get announced over a battery-powered NOAA Weather Radio and local AM/FM emergency frequencies. With weak cell service, text \"SHELTER\" and your ZIP code to 43362, FEMA's automated SMS shelter locator.",
      "Know what shelters actually provide: basic floor space, warmth, and water — not private beds, food preferences, or personal medical devices. Bring your own bedding, hygiene items, a 7-day supply of prescriptions, and ID.",
    ],
  },
  "Go-bag / bug-out bag contents": {
    sources: ["Federal Emergency Management Agency (FEMA)","Ready.gov, Build A Kit"],
    guidance: [
      "The 72-hour rule: pack enough for each household member to get by independently for at least 3 days.",
      "Water and food: 1 gallon of water per person per day (or durable emergency water pouches), plus compact, high-calorie, non-perishable food that needs no cooking or refrigeration.",
      "First aid, tools, and sanitation: a comprehensive first-aid kit, a multi-tool or knife, a loud whistle, a flashlight or headlamp with extra batteries, moist towelettes, heavy-duty trash bags, and plastic ties for sanitation.",
      "Warmth, weather, and documents: emergency ponchos, a thermal foil space blanket, a spare change of warm clothes with sturdy shoes, and waterproof copies of ID, insurance, bank records, and some emergency cash in small bills.",
      "Power and connectivity: a portable battery power bank with charging cables, a battery or hand-crank NOAA weather radio, and a printed list of family contacts and local maps.",
    ],
  },
  "Home fire escape plan": {
    sources: ["National Fire Protection Association (NFPA), How to Make a Home Fire Escape Plan"],
    guidance: [
      "Two ways out of every room: map and physically identify two clear exit paths — like a door and a window — out of every bedroom and living space.",
      "Set an outside meeting spot: a fixed landmark a safe distance from the front of the home, like a specific tree, mailbox, or street sign, where everyone gathers immediately.",
      "Practice moving in zero visibility: run drills crawling low on hands and knees, eyes closed or under simulated low visibility, so everyone can find the exits blind, under smoke.",
      "Strict no-re-entry rule: once someone is outside at the meeting point, they never go back in for any reason — not pets, not valuables.",
    ],
  },
  "Tornado plan": {
    sources: ["NOAA / National Weather Service (NWS)","FEMA Tornado Safety and Shelter Planning"],
    guidance: [
      "Pick the safe location ahead of time: the lowest interior room with no windows — a basement, storm cellar, or a ground-floor interior bathroom or closet — is your designated shelter.",
      "Stage supplies inside that room: protective headgear, heavy blankets or a spare mattress, a battery-powered radio, sturdy shoes, and a flashlight kept permanently in or next to it.",
      "Set a mobile-home and vehicle rule in advance: leave a mobile home, camper, or vehicle for a sturdy permanent structure well before funnel clouds or rotation develop.",
      "Plan the post-storm steps: check for gas leaks, shut off damaged utilities, avoid downed power lines, and wear thick boots to avoid puncture injuries from debris.",
    ],
  },
  "Evacuating with medical equipment/power-dependent needs": {
    sources: ["American Red Cross, Disability and Disaster Preparedness","Ready.gov / FEMA"],
    guidance: [
      "Stage transport equipment in advance: keep mobility aids (a manual wheelchair, walker, cane), extra batteries, and chargers staged near your exit route.",
      "Keep non-powered backups ready: a manual backup for any electric device, such as a manual wheelchair, hand-bulb suction, or a manual resuscitator bag.",
      "Pack an emergency medical kit: a 7 to 14 day supply of medications, written equipment model numbers and settings, the operating manuals, and your doctor's contact information.",
      "Confirm your destination can handle it: check ahead of time that your evacuation location, transportation, or shelter can actually support your specific power and medical needs before you travel.",
    ],
  },
  "Public-place evacuation scenarios (work/school/mall)": {
    sources: ["OSHA Emergency Action Plans","NFPA Life Safety Code (NFPA 101)"],
    guidance: [
      "Spot two exits as soon as you arrive: make it a habit to identify at least two visible, unobstructed exits whenever you enter a crowded building or shopping center.",
      "Never use elevators during an evacuation: always take the stairs — elevators can lose power, malfunction, or fill with smoke and heat.",
      "Move with the crowd, not against it: stay on your feet, don't fight the flow of people, keep your hands up near your chest for protection, and work along the walls toward the perimeter exits.",
      "Heed alarms and staff instructions immediately: evacuate the moment a fire or security alarm sounds — don't wait to see what others do, and don't go back for bags, coats, or belongings.",
    ],
  },
  "Pet/livestock evacuation": {
    sources: ["ASPCA","American Veterinary Medical Association (AVMA) Emergency Pet Evacuation Guidelines"],
    guidance: [
      "Transport small pets in secure carriers: cats, small dogs, and small animals go in sturdy, well-ventilated carriers or crates lined with a familiar towel to reduce panic and escape attempts.",
      "Bring ID, leashes, and records: every animal should wear a collar with current ID tags. Pack sturdy leashes, muzzles, vaccination records, and a 7-day supply of food and water.",
      "Never leave pets chained outdoors: if you evacuate, never leave animals chained, penned, or locked in a yard where rising water, falling debris, or fire can trap them.",
      "Move livestock early: get trailers moving before roads flood or close. If evacuation isn't possible, open interior paddock gates so animals can reach higher, open ground away from low-lying barns or barbed wire.",
    ],
  },
};
