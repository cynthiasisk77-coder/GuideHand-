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
    sources: ["U.S. Army Field Manual (FM 3-25.26), Map Reading and Land Navigation"],
    guidance: [
      "Shadow-stick method: plant a straight 3-foot stick vertically in level ground, mark the tip of its shadow with a stone, wait 15-20 minutes, and mark the new shadow tip with a second stone. The line from the first stone to the second runs West to East (first mark West, second mark East).",
      "Analog watch method (Northern Hemisphere): point the hour hand at the sun. The point halfway between the hour hand and 12 o'clock points South, and the opposite direction is North.",
      "North Star (Polaris) alignment: find the Big Dipper, trace the line through its two outer \"pointer\" stars (Merak and Dubhe) upward about 5 times their spacing, and you'll land on Polaris — within 1 degree of true North.",
      "Don't trust moss alone: moss grows on any shaded, moisture-retaining side of a tree, not reliably on the north side. Wind-bent vegetation and the fact that south-facing hillsides dry faster and lose snow first (in northern latitudes) are more reliable terrain cues.",
      "Treat all of this as approximation, not a substitute for a compass and map when accuracy really matters — steep terrain, whiteout, or long distances.",
    ],
  },
  "No cellular service or internet": {
    sources: ["FCC/FEMA, \"Tips for Communicating During an Emergency\""],
    guidance: [
      "Networks get congested during emergencies — redialing repeatedly makes it worse for everyone.",
      "If a call fails, wait before redialing; try texting instead, since texts often get through when calls don't.",
      "Keep a battery- or hand-crank-powered NOAA Weather Radio as an internet-independent information source.",
      "Cell towers keep running on backup batteries for a while after grid power fails, but usually only 2 to 8 hours before those batteries run down — after that, assume there's no cell service at all, not just a bad connection.",
      "Constantly trying to call or refresh apps drains your phone's battery fast for no benefit once towers are actually down. Switch to airplane mode (or turn the phone off) to save power for when you actually need it, and check back periodically instead of continuously.",
    ],
  },
  "NOAA Weather Radio": {
    sources: ["NOAA", "National Weather Service"],
    guidance: [
      "NOAA Weather Radio All Hazards broadcasts continuous NWS warnings/watches/forecasts 24/7 over 1,000+ transmitters, plus non-weather hazards (earthquakes, chemical releases, AMBER alerts, 911 outages).",
      "It needs a dedicated receiver on one of seven VHF frequencies — not a phone app, no cell service or Wi-Fi or grid power needed if battery/crank powered.",
      "Keep a battery-powered or hand-crank receiver in your kit and know your area's frequency in advance.",
      "NOAA broadcasts on one of seven dedicated frequencies between 162.400 and 162.550 MHz — a dedicated NOAA radio (not a phone app) will already be tuned to scan these.",
    ],
  },
  "AM/FM emergency broadcasts": {
    sources: ["FEMA, Integrated Public Alert and Warning System (IPAWS)"],
    guidance: [
      "The Emergency Alert System (EAS) delivers authenticated alerts via AM/FM/satellite radio and broadcast/cable/satellite TV — one path of FEMA's IPAWS, alongside Wireless Emergency Alerts and NOAA Weather Radio.",
      "IPAWS authenticates and validates alerts before they reach any of these paths.",
      "Keep a battery-powered AM/FM radio as a backup needing no cell network, data plan, or working tower.",
      "High-power AM stations (the big 50,000-watt ones) often have their own hardened backup generators and can keep broadcasting through a widespread outage. At night, AM signals travel hundreds of miles further than during the day, so scanning the AM dial after dark can pick up a distant station carrying emergency information even if every local station is down.",
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
    sources: ["Centers for Disease Control and Prevention (CDC), Emergency Sanitation Guidelines","U.S. Army Field Manual (FM 21-10 / ATP 4-25.12), Field Sanitation"],
    guidance: [
      "Keep the 200-foot setback: dig latrines and waste pits at least 200 feet (roughly 70-80 paces) from any surface water, campsite, or food-prep area to prevent waterborne contamination.",
      "Individual cat-hole: for one-time use on the move, dig 6-8 inches deep and 4-6 inches wide in dark organic topsoil, where soil bacteria breaks pathogens down fastest.",
      "Straddle trench for a small group: for a semi-permanent site, dig a trench 12 inches wide, 18-24 inches deep, and 3-6 feet long, with a shovel kept at hand. Cover each use immediately with 2-3 inches of loose soil and wood ash to control odor and keep flies from carrying pathogens to food.",
      "Close it out properly: once waste is within 6 inches of the surface, backfill completely, mound the soil slightly so rain sheds off, and pack it down.",
      "Sizing for a group: as a rough rule of thumb, plan for about 1 linear foot of trench per person per week of use — a family of four sheltering for two weeks would need roughly an 8-foot trench.",
      "Respect the water table, not just distance: keep the bottom of any pit or trench latrine at least 4 feet above the seasonal high water table. If you hit damp or muddy soil while digging, stop — you're too close to groundwater and risk contaminating it.",
    ],
  },
  "Water, electricity, gas, propane shutoffs": {
    sources: ["Ready.gov / FEMA"],
    guidance: [
      "Every household member should know how to shut off gas, water, and electricity — gas leaks and electrical sparking cause many post-disaster fires.",
      "If you smell or hear gas leaking, open a window if safe, then leave the area on foot immediately. Never turn gas back on yourself once shut off — only a professional or the utility should do that.",
      "For water, find the main shutoff valve and turn it clockwise until fully closed. Replace a valve that's rusted or hard to close, before an emergency, not during one.",
      "Right after a big shake like an earthquake is exactly when a broken gas line is most likely, and exactly when a spark from a light switch could set it off — the moment shaking stops, check for a rotten-egg smell or hissing sound before touching any switch, phone, or flame.",
      "To actually shut the gas off: go outside to the meter, find the rectangular tab on the pipe just before the meter, and turn it a quarter-turn with a wrench until the tab sits crosswise to the pipe. Once it's off, leave it off — only a professional should turn it back on after checking the lines.",
      "Shutting the main water valve isn't just about stopping a leak — closing it traps the clean water already inside your pipes and water heater, so it can't get siphoned back out into city mains that may now be cracked and contaminated.",
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
    sources: ["Electrical Safety Foundation International", "multiple electric utilities", "OSHA Standard 1910.269"],
    guidance: [
      "Always assume a downed line is energized, even if it looks dead or isn't sparking.",
      "Stay back — utility-published safe distances vary from about 10 feet up to 30-50+ feet; a downed line can energize the ground itself for many feet around it, especially when wet.",
      "Never touch a downed line or anything it's contacting, and never use any object (including wood or rope) to move it — normally non-conductive materials conduct electricity when even slightly wet.",
      "Never touch a person in contact with a downed line — call 911 and the utility instead.",
      "If a line is down near you, shuffle away instead of walking normally: keep both feet together and touching the ground, and slide them along the ground without ever lifting one foot past the other. Keep shuffling until you're at least 35 feet away — double that if the ground is wet.",
      "If a live wire falls on your car while you're inside, stay inside — the metal frame protects you as long as you don't touch the ground and the car at the same time. Only get out if the car catches fire, and if you do, jump clear with both feet together at once, then shuffle away the same way.",
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
      "Manual push-starting works only on a manual transmission: key to ON/RUN, clutch in, shift to second gear (smoother engagement than first). Get the vehicle rolling to 5-10 mph, release the clutch quickly while pressing the accelerator, then press the clutch back in the instant the engine fires.",
      "Never try to push-start an automatic: an automatic transmission has no mechanical link to the wheels with the engine off, so push-starting just destroys the transmission clutches without starting the engine.",
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
    sources: ["U.S. Army Survival Manual (FM 21-76)","Ashley Book of Knots (ABOK)"],
    guidance: [
      "Bowline (\"the king of knots\"): a secure, fixed loop at a rope's end that won't slip or shrink under load, yet unties easily afterward. Use it for rescue lines, tie-down points, or hanging gear. Form a small loop in the standing part, pass the working end up through it, around the standing line, then back down through the loop, and pull it firm.",
      "Taut-line hitch: an adjustable friction hitch that slides to change tension, then locks in place under load. Good for tent guy-lines, shelter tarps, and antenna lashings. Wrap the working end around the anchor line twice toward the anchor, then once more on the outside toward the load, and pull tight to set it.",
      "Trucker's hitch: a mechanical-advantage knot that cinches a load two to three times tighter than pulling by hand. Use it for strapping down roof tarps or bulky gear. Form a slip loop in the middle of the line, run the working end through an anchor point, feed it back through the slip loop, pull hard to tighten, then lock it off with two half-hitches.",
      "Prusik hitch: a small loop of cord tied around a thicker rope that grips tight under load but slides freely by hand when there's no weight on it. Useful for climbing up a fixed rope, tensioning a shelter line, or as part of a simple pulley system for hauling something heavy.",
      "Figure-8 loop: a strong, reliable loop tied in the end of a rope for clipping onto something or anchoring to a tree or vehicle. It holds a large share of the rope's strength and, unlike some other loop knots, doesn't jam into an impossible-to-untie knot after it's been under a heavy load.",
      "Clove hitch: a quick way to tie a rope to a post, pipe, or pole. It's fast to tie and holds well under steady pull, but can slip if the load keeps jerking on and off, so back it up with two half-hitches if you're relying on it for anything long-term.",
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
      "Rough angle guide: a general-purpose knife holds a good edge at 20-25 degrees per side. An axe or hatchet needs a thicker 30-35 degree edge — too thin, and it chips or rolls the first time it hits hard or frozen wood.",
      "No sharpening stone on hand? A smooth, fine-grained river stone (slate, quartzite, smooth basalt) works as a substitute — wet it with water or a little oil, match the angle the blade already has, and draw the edge across in smooth, sweeping strokes.",
      "Finish any edge by stropping it: drawing the blade backward, spine leading, across a leather belt or a strip of plain cardboard. This knocks off the microscopic burr left by sharpening and is what actually makes an edge feel \"hair-shaving\" sharp.",
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
    sources: ["New Hampshire Fish and Game", "Washington Department of Fish & Wildlife", "Penn State Extension", "CDC Zoonotic Diseases in Hunting Operations", "USDA APHIS"],
    guidance: [
      "Field dress within about an hour of harvest; keep the carcass off the ground and use clean utensils.",
      "Cool the carcass below 40°F as quickly as possible and keep it cool through processing and transport — this is what actually slows bacterial growth.",
      "Avoid an animal that appeared sick before harvest. Wear rubber gloves and a face mask while gutting/butchering.",
      "Never eat the brain, eyeballs, spinal cord, spleen, liver, or lymph nodes, and avoid cutting through bone/spinal column during processing — reduces exposure to chronic wasting disease and other tissue-concentrated risks.",
      "Rabbits, hares, and rodents can carry tularemia (\"rabbit fever\") — wear gloves when skinning them, since the bacteria can get in through small cuts or scrapes on bare hands. Check the liver and spleen after gutting; if you see small white or yellowish spots, don't eat that animal — bury the carcass away from pets and clean your knife and hands well afterward.",
      "Try hard not to puncture the stomach, intestines, or bladder while gutting. It's an easy accident, and it contaminates the meat with bacteria that spoil it fast, on top of being unpleasant to clean up.",
      "A technique that helps avoid it: lay the animal on a slight downhill slope with the head uphill, and as you cut from the pelvis toward the throat, slide two fingers under the skin ahead of the blade (palm up) to push the guts away, with the cutting edge angled upward rather than down into the body. Cutting blade-down is how the gut gets nicked by accident.",
      "At the back end, cut all the way around the anus from the outside to free it from the pelvis, then tie it off snugly with a piece of cord before pulling it forward through the pelvic canal — this keeps waste from leaking onto the meat as you remove it. Handle the bladder (a small pale sac near the pelvis) gently and remove it whole; if it tears, the urine that spills will taint any meat it touches.",
    ],
  },
  "Most dangerous look-alike poisonous plants": {
    sources: ["National Capital Poison Center", "USDA Agricultural Research Service", "FDA Poisonous Plant Database"],
    guidance: [
      "Poison hemlock and water hemlock closely resemble edible wild carrot, parsley, and parsnip, and are among the most acutely toxic plants in North America — water hemlock can cause seizures and death from a small ingested amount.",
      "Treat \"looks like a wild carrot/parsley relative\" as a hard stop, not a feature to identify around.",
      "Telling poison hemlock from wild carrot (Queen Anne's Lace): poison hemlock has a completely smooth, hairless stem with purple blotches or streaks, and smells unpleasant (like mouse urine) when crushed. Wild carrot has a fuzzy, hairy stem with no purple spots, and smells like a garden carrot when crushed. When in doubt, don't pick either — they grow side by side.",
      "Water hemlock, considered North America's most lethal plant, grows in wet ground — creek banks, marshes, ditches. If you slice the root and see hollow chambers inside, or it oozes a yellowish oily sap, leave it alone. It can cause violent seizures within 30 to 60 minutes of ingestion.",
      "Pokeweed (tall plant with dark purple berry clusters and reddish stems) is toxic across the whole plant, especially the roots and berries — treat it as a plant to avoid rather than something to prepare and eat, even though some historical foraging guides describe ways to cook young shoots.",
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
      "Never lock animals in a closed barn during a wildfire threat: a wooden barn traps heat like a chimney. If you truly can't evacuate them by trailer before roads close, turn them loose into a cleared, well-grazed pasture with the gates pinned wide open instead.",
      "If animals can't be moved in time, mark them for reunification: paint your phone number on their side with livestock paint, or braid a waterproof tag into the mane or tail.",
      "Don't return animals to a pasture that was recently flooded: floodwater can leave behind sharp debris, chemical residue, and contaminated standing water. Check any hay that got wet before feeding it — wet hay can heat up on its own or grow dangerous mold.",
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
    sources: ["CDC / NIOSH, Chemical and Hydrocarbon Ingestion Hazards","OSHA Fuel Storage and Transfer Protocols"],
    guidance: [
      "Follow the gravity rule: the hose's outlet end must sit lower than the surface of the liquid in the supply container for gravity flow to keep going.",
      "Prime a water siphon safely: submerge the whole hose in the water until every air bubble is out and it's completely full, seal both ends with your thumbs, move one end to the lower container, then release to start the flow.",
      "Never siphon fuel by mouth: inhaling or swallowing gasoline or diesel causes severe chemical pneumonitis and fluid buildup in the lungs, which can be fatal.",
      "Use mechanical fuel transfer instead: a manual shake-siphon hose (with a one-way check ball), a rubber squeeze-bulb primer, or a battery-operated transfer pump.",
      "Ground the containers first: set metal or plastic fuel cans on bare ground before transferring — siphoning generates static electricity that can ignite gasoline vapor if the can is sitting in a plastic truck bed.",
      "A jiggle/shake siphon makes the check-ball method easy: fit a length of fuel hose with a one-way check-ball valve on the intake end, submerge that end in the fuel source, and rapidly shake the hose up and down. The ball lets fuel in on the downstroke and seals on the upstroke, priming the flow in seconds without any suction at all.",
    ],
  },
  "Solar panel, charge controller, power-bank chain": {
    sources: ["Morningstar Corporation", "general off-grid solar industry references", "National Electrical Code (NEC Article 690 & 706)", "American Boat and Yacht Council (ABYC E-11)"],
    guidance: [
      "A charge controller sits between solar panels and a battery bank specifically to prevent overcharging — unregulated voltage risks battery gassing, fire, or explosion.",
      "Match the controller's voltage rating to the battery bank; size wiring for actual current and cable-run distance; use correctly rated fuses/breakers and safe disconnects near the battery.",
      "A battery bank can dump an enormous amount of current into a dead short in milliseconds — enough to melt wiring or start a fire. Put a properly rated fuse or breaker within about 7 inches of the battery's positive terminal, on the main line, before it branches anywhere else — this is the single most important fire-prevention step in a DIY battery setup.",
      "Undersized wire is a real fire risk on low-voltage systems, since they carry much higher current than household wiring for the same power — when in doubt, size up rather than down, and never substitute ordinary household wire (Romex) for battery/inverter cabling.",
      "Ground the system: connect the inverter's metal case and the battery's negative terminal to a real earth ground (a copper ground rod driven into the soil), not just to each other — this is what lets safety devices actually trip if something goes wrong instead of leaving the whole system live.",
      "Keep connections dry and never work on a live circuit. A 25-30% safety margin over calculated load is a commonly recommended sizing buffer.",
      "Panel angle matters as much as panel size: output is highest when sunlight hits the panel face at a dead-on 90 degrees, and a panel left flat can lose up to 40% of its winter output. As a rough rule, set the tilt equal to your latitude in spring and fall, latitude minus 15 degrees (flatter) in summer, and latitude plus 15 degrees (steeper) in winter. Even a thin branch shadow crossing part of the array can cut the whole string's output by half or more, so keep it clear of shade during peak midday hours.",
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
      "A submersible well pump usually runs on 240V and can draw a large surge of power just to start — a small standard 120V generator often can't start it without a proper 240V outlet or a transfer switch built for it.",
      "The moment power goes out, don't forget the water that's already sitting in your pressure tank — it typically holds a few gallons of usable water even with the pump off. Open the lowest faucet in the house, or the tank's own drain valve, to gravity-drain that reserve into buckets before it's gone.",
      "With no hand pump piped in and the electric pump down, you can still pull water manually from a 4- or 6-inch casing with a well bailer — a narrow tube with a ball-check valve at the bottom. Lower it down the casing on a cord; the ball floats up to let water fill the tube as it submerges, then seats and seals shut as you pull the cord back up for retrieval.",
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
    sources: ["U.S. Environmental Protection Agency", "World Health Organization"],
    guidance: [
      "Greywater is wastewater from bathtubs, showers, bathroom sinks, and clothes washers specifically — it does NOT include toilet waste or kitchen-sink/dishwasher water (that's blackwater, which must go to a sewer/septic system). Note: some everyday definitions lump kitchen-sink water in with greywater too — if you're ever unsure which category a particular water source falls under where you live, treat it as blackwater until you've confirmed otherwise.",
      "EPA generally endorses greywater reuse for conservation, but permitted uses and volume limits are set state by state (commonly around 250 gallons/day where unpermitted systems are allowed) — this is genuinely state-regulated, confirm your own state's rules.",
      "Label any non-potable water storage clearly (commonly purple piping or \"CAUTION: NONPOTABLE WATER – DO NOT DRINK\" signage).",
      "Don't let greywater sit in a closed container for more than about 24 hours — bacteria multiply fast in standing greywater and it starts behaving like blackwater. Use it or route it out the same day.",
      "A simple disposal option is a soakaway pit: dig a hole roughly 3-4 feet deep and 3 feet wide, at least 100 feet from any well, spring, or open water, fill it with clean fist-sized gravel or stones, and let greywater drain into it below the surface so it doesn't pool or attract insects. A simple mesh strainer or cloth over the drain first catches food bits, hair, and grease before they clog the pit.",
      "Never spray raw greywater overhead with a sprinkler, and never let it touch anything you'd eat raw — leafy greens, lettuce, herbs. Route it below the soil surface instead, like the soakaway pit above, not onto the leaves of food you're not going to cook first.",
      "Standing greywater isn't just a smell problem — water pooling on bare ground becomes a mosquito breeding site within 48 to 72 hours. If a soakaway pit isn't practical, a French drain works too: a sloped 2-foot-deep, 1-foot-wide trench filled with gravel, a perforated pipe laid on top, then covered with landscape fabric and 6 inches of soil, draining water below the surface with nothing standing for insects to breed in.",
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
      "If there are multiple injured people at once (a car pileup, a building collapse) and you have to decide who to help first: start with everyone who can get up and walk on their own — direct them to one spot, they can wait. For everyone else, check breathing first, then check for a pulse or serious bleeding, then check if they can follow a simple instruction like \"squeeze my hand.\" People who aren't breathing normally, don't have a pulse, or can't follow a simple command need help first; people who are breathing fine and can follow commands can wait a little longer. This is hard and it feels wrong to walk past someone, but in a true mass-casualty situation, treating people in the wrong order can cost more lives overall.",
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
      "If one tourniquet fully tightened doesn't stop the bleeding, put a second one on right above the first (closer to the body) rather than loosening the first one to check it.",
      "If a body part is completely severed: controlling the bleeding on the person is what matters most. For the severed part itself — rinse off big debris gently without scrubbing, wrap it in dry clean cloth or gauze, seal it in a waterproof bag, then place that bag in a second container with an ice-and-water slurry. Never let it touch ice directly and never let it sit in water unprotected — both damage the tissue and can ruin any chance of it being reattached.",
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
      "For the best chance of avoiding infection, irrigation matters more than what you irrigate with — even plain clean water works if you use enough of it and enough force. A large syringe, or a plastic bottle with a small pinhole poked in the cap that you squeeze hard, both create enough pressure to actually flush debris out rather than just rinse the surface.",
      "A wound that's too dirty or too old to close (see above) can still be cared for: loosely pack it with clean, saline-moistened gauze so it can drain, and cover with a dry dressing. Change the dressing daily or every other day. It will heal from the inside out over time — that's normal for a wound that couldn't be closed, not a sign something's wrong.",
      "A simple normal-saline recipe if plain water stings too much: dissolve 2 level teaspoons of non-iodized table or canning salt into 1 quart of water that's been boiled 10-15 minutes with the lid on, then cooled to room temperature. Store it in a boiled, tightly lidded glass jar, and discard or re-boil whatever's left after 24 hours.",
    ],
  },
  "Thermal burns": {
    sources: ["American Heart Association + American Red Cross, 2024 Guidelines for First Aid"],
    guidance: [
      "If someone's clothes or body are actively on fire, put the fire out first, before anything else: don't let them run, since running fans the flames — get them to drop to the ground, cover their face with their hands, and roll to smother it. If you're helping someone else who's on fire, tackle them down and wrap them tightly in a wool blanket, heavy coat, or rug. Only once the fire itself is out do you move on to cooling the burn.",
      "Cool the burn immediately with clean running water for 5-20 minutes.",
      "Never use ice or ice-cold water on a burn: ice freezes the already-damaged skin, kills more tissue underneath, and can push the body into shock. Cool or room-temperature water is what you want, not cold.",
      "Remove rings/watches/tight items before swelling starts, but don't pull away material stuck to the burn.",
      "After cooling, loosely cover with a clean, nonadherent dry dressing. Protect the person from hypothermia, especially a child or large burn.",
      "Get urgent care for: a full-thickness burn, a partial-thickness burn bigger than the person's palm, a burn on the face/hands/feet/genitals, an electrical or chemical burn, or any sign of smoke inhalation.",
      "Do not use butter, oil, toothpaste, or ice directly on a burn. Do not break blisters or pull off melted-in clothing.",
      "Rough-estimate how much skin is burned: a hand's whole surface (palm plus fingers) is about 1% of a person's body. One whole arm is about 9%, one whole leg about 18%, the chest and stomach together about 18%. This helps you describe the burn accurately when you call for help.",
    ],
  },
  "Poison exposure by eye, skin, inhalation": {
    sources: ["CDC, \"What to Do in a Chemical Emergency\"", "National Capital Poison Center", "American Heart Association + American Red Cross", "American Academy of Ophthalmology", "OSHA Standard 1910.151(c)"],
    guidance: [
      "Protect yourself and leave the contaminated area; for an outdoor release, move away and stay upwind. Never enter a confined contaminated space without proper respiratory gear.",
      "Eye: remove contacts if easy, then irrigate with copious room-temperature water. How long depends on what it was — at least 15 minutes for a mild irritant, 20-30 minutes for an acid, and 30-60 minutes for a strong alkali (bleach, lye, drain cleaner, wet cement or mortar), since alkalis keep damaging the eye the longer they stay in contact. Avoid runoff into the other eye, and gently hold the eyelids open while rolling the eye around so water reaches all the way around it, not just the front.",
      "Skin: remove contaminated clothing, rinse with copious running water for at least 15 minutes; mild soap can help remove material stuck to skin.",
      "Inhalation: move to fresh air immediately and stay away from the fumes.",
      "Bag contaminated clothing without handling it more than necessary. Seek poison-center or medical guidance by every available route.",
      "Do not try to neutralize an acid with an alkali (or vice versa) on the body — the reaction can generate heat and worsen the injury. Don't become a second victim by entering toxic air.",
      "Dry caustic powder (like lime or dry lye) is different from a liquid spill: brush it off completely dry first, with a cloth or brush, before adding any water. Adding water to a dry caustic powder first can trigger a reaction that generates intense heat and burns the skin worse. Once the powder is brushed off, then flush with water as usual — this doesn't apply to liquid acids or caustics, which should be flushed with water immediately.",
    ],
  },
  "Unknown swallowed poison, no induced vomiting": {
    sources: ["National Capital Poison Center", "American Heart Association + American Red Cross"],
    guidance: [
      "If the person collapses, seizes, can't be woken, or has trouble breathing, call 911 immediately and give condition-appropriate first aid.",
      "Remove any remaining substance from the mouth without forcing fingers into the throat.",
      "Preserve the container/label/pill bottle/plant sample or a photo. Note age, weight, substance, possible amount, time, and symptoms.",
      "Call Poison Control (1-800-222-1222) whenever there's any connection available — exact treatment depends on the substance, dose, timing, age, and symptoms.",
      "For a caustic/burning product, Poison Control may advise a small amount (commonly 4-8 ounces) of water or milk only if the person is conscious, not convulsing, and can swallow safely — this is not a universal rule, ask first. Don't give more than that; an overfull stomach is more likely to vomit the caustic substance back up, causing the same burn a second time.",
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
      "Give frequent small sips — about one spoonful every minute or two works well. Gulping a full cup at once tends to trigger vomiting and undoes the progress. If vomiting occurs anyway, pause briefly and restart more slowly.",
      "Don't give anti-diarrhea medication (like Imodium) if there's a high fever or blood in the stool — it stops the gut from moving, which traps the bacteria and toxins inside the body instead of letting them pass, and can make things worse.",
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
    sources: ["American Red Cross, \"Muscle, Bone and Joint Injury\" and \"Fractures\"", "American College of Emergency Physicians (ACEP)", "Wilderness Medical Society"],
    guidance: [
      "Treat any suspected fracture as real until ruled out. Do not try to realign or push a bone back into place — keep the limb in the position it was found.",
      "Check circulation, movement, and feeling in the fingers or toes before you splint too, not just after — that way you know if something was already wrong before you touched it.",
      "If trained and professional help will be delayed, splint the area, extending past the joints above and below the injury, with padding, secured firmly but not tight enough to cut off circulation.",
      "For a hand or wrist, splint with something round (a rolled sock or gauze roll) in the palm so the fingers curl naturally, like they're loosely holding a can. For a foot or ankle, splint it at a right angle to the leg rather than pointed — that keeps the tendon at the back of the ankle from tightening up permanently.",
      "Check circulation regularly after splinting — toes/fingers beyond the splint should stay pink and warm. If they turn pale, blue, or cold, the splint is too tight.",
      "Do not move the person more than necessary.",
      "If the bone is visibly poking through the skin (an open fracture): never try to push it back under the skin, and never pour rubbing alcohol, hydrogen peroxide, or iodine directly on exposed bone — those damage living bone cells and can cause severe, hard-to-treat infection. Instead, gently rinse away loose surface dirt with clean water, cover the exposed bone with a clean cloth or gauze that's damp with clean water so it doesn't dry out, then splint over that as usual. If the bone slips back under the skin on its own while you're working, that's fine — just don't pull it back out.",
    ],
  },
  "Head, neck and spinal injury": {
    sources: ["American Red Cross, \"Head, Neck, and Spinal Injury\""],
    guidance: [
      "If a head, neck, or spinal injury is suspected, tell the person not to move and to answer verbally rather than nodding/shaking their head. Keep them in the position found.",
      "Exceptions where movement is necessary: to perform CPR, or if bleeding can't otherwise be controlled.",
      "Do not remove a helmet unless necessary to give CPR. Keep an infant/child in their car seat unless removal is necessary for CPR.",
      "Why this matters: improper handling of a real spinal injury can cause permanent paralysis that proper immobilization would have prevented.",
      "Watch for signs the injury is more serious than it looks: one pupil noticeably bigger than the other, clear fluid or blood coming from the ears or nose, bruising behind the ears or around both eyes with no direct hit to the face, repeated vomiting, worsening confusion, or an arm or leg that suddenly goes weak. These point to bleeding or swelling inside the skull and need emergency care, not a wait-and-see approach.",
      "If the skull itself feels soft, dented, or has loose fragments: don't press on it. Cover it loosely with clean gauze instead.",
      "If they need to vomit: roll their whole body together as one unit, keeping the head, neck, and back in a straight line the entire time, so they don't choke without you having to bend or twist the spine.",
      "Anyone knocked unconscious, even briefly, has a concussion. Keep them resting somewhere quiet and dim. You don't need to keep them awake all night, but checking on them every 2-3 hours for the first 12 hours — making sure they know their name, where they are, and can move both arms and legs normally — is a reasonable way to catch it early if something's wrong.",
      "Plain acetaminophen (Tylenol) is fine for a headache after a head injury. Avoid aspirin, ibuprofen, or naproxen for the first 48 hours — those thin the blood and can make bleeding inside the skull worse.",
    ],
  },
  "Smoke inhalation and carbon monoxide": {
    sources: ["CDC, \"Clinical Guidance for Carbon Monoxide Poisoning Following Disasters and Severe Weather\"", "National Fire Protection Association"],
    guidance: [
      "CO poisoning symptoms: headache, dizziness, weakness, nausea, vomiting, chest pain, altered mental status — progressing at higher exposure to confusion, fainting, seizures, or coma.",
      "Onset is dose-dependent: low-level exposure can take up to ~2 hours to cause symptoms; high-level exposure can do it in ~5 minutes.",
      "A structure fire involving modern furniture, carpet, or plastics can also release other toxic gases beyond CO. Soot around the nose or mouth, a dark or gritty cough, singed facial hair, or a hoarse voice after smoke exposure are all signs the exposure may be more serious than it looks — treat these as a reason to get emergency care fast, even if the person seems to be breathing okay right now, since some of this damage shows up gradually.",
      "Get the person into fresh air as soon as it's safe to do so.",
      "If unconscious, place them on their side (recovery position) to reduce choking/aspiration risk. Begin CPR if they're not breathing. Call 911 immediately.",
      "This is first-aid-layer only — hospital oxygen treatment (and other antidotes hospitals can give for more serious smoke-related poisoning) are clinical steps beyond what you can do in the field, but getting them to that care fast is the point.",
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
      "Position the bitten limb at or slightly below heart level and keep it still — this slows how fast venom spreads. Remove rings, watches, and tight clothing near the bite right away, before swelling makes that impossible.",
      "If you know or suspect a coral snake (not a pit viper): coral snake venom affects the nervous system differently, and the pressure-immobilization technique is used instead — wrap the whole bitten limb snugly with an elastic bandage, about as tight as you'd wrap a sprained ankle, then splint it and get emergency care. Watch closely for breathing trouble.",
      "Track how fast the swelling is spreading: draw a line on the skin at the edge of the swelling with a pen or marker, and write the time next to it. Redraw the line every 15-30 minutes — if the swelling keeps crossing the old lines quickly, that tells responders how the venom is progressing even before you reach care.",
    ],
  },
  "Tick bite, rabies exposure, animal bite (human)": {
    sources: ["CDC, \"Rabies Post-exposure Prophylaxis Guidance\"", "CDC Rabies Prevention and Control"],
    guidance: [
      "For any bite or scratch from wildlife or an unfamiliar animal, wash the wound immediately with soap and water for a full 15 minutes to physically flush out virus particles. A virucidal agent like povidone-iodine helps if available.",
      "Consult a healthcare provider after any such bite. Severity, location (bites near the head are higher-risk), and the animal species (bats, raccoons, skunks, foxes are high-risk US rabies vectors) all factor into whether rabies post-exposure prophylaxis (wound care plus immune globulin and vaccine series) should start immediately.",
      "For a tick bite, CDC maintains an interactive \"Tick Bite Bot\" tool to help decide when it needs medical follow-up.",
      "For ordinary bite-wound care and infection risk beyond rabies, see the dedicated \"Dog/animal bite wound care and infection risk\" entry.",
      "Remove an attached tick correctly: grasp it as close to the skin as you can with fine-tipped tweezers and pull straight up with steady, even pressure. Don't twist, jerk, or try to burn it off or smother it in petroleum jelly — those make it more likely to leave mouth-parts behind or inject more saliva. Clean the bite afterward and watch the area for a spreading rash or flu-like symptoms over the next month.",
      "If a known, healthy-looking domestic dog, cat, or ferret bites someone, it usually doesn't need to be killed to check for rabies — confining and observing it for 10 days is the standard approach. If it's still alive and acting normal at the end of that window, it wasn't shedding rabies virus at the time of the bite. This observation option doesn't apply to wild animals (raccoons, bats, skunks, foxes) or one acting erratically — treat those as a real exposure and get care right away.",
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
      "Cat bites in particular shouldn't be taped or stitched closed — cat teeth are thin and sharp enough to inject bacteria deep into a joint or tendon, and closing the wound traps that infection inside instead of letting it drain. Leave a cat bite open and get it looked at.",
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
      "Know which species is in your area before you need this — the two responses are opposite. Quick way to tell them apart: a black bear has no shoulder hump and a fairly straight facial profile; a grizzly/brown bear has a visible muscular hump between the shoulders and a dished-in, concave face.",
      "One exception on the grizzly \"play dead\" rule: if a grizzly has been quietly stalking you for a while, or attacks you inside your tent at night, that's predatory behavior rather than a startled, defensive reaction — in that specific case, fight back instead of playing dead.",
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
      "Power windows usually still work for something like a minute after the car hits the water, before the electrical system shorts out — try them immediately rather than assuming they're already dead.",
      "If you have to break a window, aim for the very bottom corner of a SIDE window, not the windshield — side windows are tempered glass and shatter easily with a sharp point (like a spring-loaded center punch); the windshield is laminated safety glass and won't break the same way no matter how hard you hit it.",
      "True last resort, only if you truly cannot get a window open or broken and the doors won't budge: as water keeps rising, take a breath before it reaches your face, and wait — once the cabin is completely full and the pressure equalizes, the door will actually push open with normal force. This is only for when every faster option has already failed, not a reason to wait instead of trying to get out immediately.",
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
      "COLD — Re-check that the exhaust pipe is clear every single hour, not just once — snow keeps drifting and can block it again while you're not looking.",
      "COLD — No extra blankets? Seat upholstery, floor mats, and trunk liner all work as improvised insulation layered over your clothes. If there are multiple people, huddle together in the center of the car — sharing body heat helps more than sitting apart.",
      "COLD — Only run the interior dome light while the engine is running, to save your battery for when you actually need the heater or the horn.",
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
      "Signs of a tooth abscess specifically, not just general tooth pain: throbbing pain that radiates toward the ear, swelling along the jawline or cheek, a small pimple-like bump on the gum, and pain when you tap the tooth. This needs a dentist — an abscess doesn't resolve on its own.",
      "Warm salt water can help in the meantime: 1/2 teaspoon of salt in 8 ounces of warm water, swished for about 2 minutes every couple of hours. It won't cure the infection, but it draws down some swelling and reduces bacteria in the area.",
      "Clove oil, if you have it, is a real numbing option: dab a small amount onto a cotton ball and hold it against the aching tooth and gum for 5-10 minutes.",
      "Use cold, not heat, on the outside of the face — a cold pack calms pain, while heat actually draws the infection outward and can make facial swelling worse.",
      "If a permanent tooth gets completely knocked out: pick it up by the crown (the white part), never the root. If the person is alert, try gently pushing it back into its socket right away and have them bite down gently on gauze to hold it. If it won't go back in, keep it from drying out — in a cup of cold milk or tucked in the person's cheek — and get to a dentist fast. It has the best chance of being saved within about an hour.",
      "Bleeding that won't stop after a tooth comes out (extraction or trauma): a slightly damp black tea bag pressed firmly against the socket, held with steady bite pressure for 45-60 minutes, works better than plain gauze — something in tea actually helps blood clot there.",
      "A crown or cap that's fallen off: clean the old cement out of it, dry the tooth stub, and use a small dab of plain (non-whitening) toothpaste, petroleum jelly, or temporary dental cement (sold at any pharmacy) to stick it back on as a temporary fix until you can see a dentist. Bite down gently on gauze for a few minutes to seat it and squeeze out the extra.",
      "Telling apart two kinds of tooth pain: pain that's sharp but stops as soon as the hot, cold, or sweet thing is gone is usually manageable until you see a dentist. Pain that throbs on its own, wakes you up at night, or lingers long after you stop eating or drinking is more serious — it usually means the nerve inside the tooth is dying, and it's worth getting seen sooner.",
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
      "Loose debris like sand or an eyelash: don't rub it. Pull the upper eyelid down and out over the lower lashes — this alone often sweeps it loose so you can flush it out.",
      "If something is impaled or stuck in the eye and you're covering it while waiting for help: cover BOTH eyes, not just the injured one. Eyes move together, so if the healthy eye moves, the injured eye moves the same way and can drive the object in deeper. Covering both keeps the injured eye still.",
      "For debris that won't flush out and you suspect is caught under the upper eyelid: gently roll the upper lid up and back over a clean cotton swab to expose its underside, then lift the speck away with the moistened tip of another swab. Only do this for loose surface debris — for anything embedded, stick with the shield-and-cover approach above.",
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
      "A quick way to splice broken wire fencing (the Western Union splice): pull the two broken ends tight with fencing pliers, overlap them by about 6 inches, and wrap each end tightly around the other wire 4-5 times. Don't just tie a knot in the wire — a sharp bend creates a weak point that snaps the next time an animal leans on it.",
      "If a corner post has rotted or pulled loose and the whole fence line has gone slack: drive a new post a few feet down the line, run a horizontal brace between the top of the corner post and this new post, then wrap wire diagonally between the base of the corner post and the top of the brace post and twist it tight with a stick, like tightening a tourniquet, until the fence pulls straight again.",
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
    sources: ["U.S. Army Survival Manual (FM 21-76 / ATP 3-50.21), Food Procurement: Traps and Snares"],
    guidance: [
      "Know the legal and survival context: primitive snares and untended deadfalls are illegal for civilian hunting under state wildlife codes because they're non-selective. Reserve this knowledge strictly for a declared life-or-death survival scenario.",
      "Place along active game runs: set snares only at natural pinch points — gaps between fallen logs, rock edges, burrow entrances — where fresh tracks and droppings confirm active travel. Never set one across an open, wide path.",
      "Size the loop correctly: for small game (cottontail, squirrel), use 20-24 gauge brass or galvanized wire, a loop about fist-sized (roughly 4 inches), hung 3 to 4 inches off the ground, anchored to a solid root or heavy stake.",
      "Build a Figure-4 or Paiute deadfall: three notched sticks support a heavy flat rock (at least 3 to 5 times the target animal's weight) over a bait stick. Rig the trigger so a light disturbance collapses the sticks cleanly and the stone drops instantly for a humane kill.",
      "Check traps twice daily: inspect at dawn and dusk to keep meat from spoiling to predators, insects, or heat.",
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
      "If someone may have already eaten contaminated food, botulism looks different from typical food poisoning — it usually doesn't cause vomiting or diarrhea at all. Instead it attacks the nerves starting from the head down: blurred or double vision, drooping eyelids, trouble speaking or swallowing, a dry mouth, then weakness spreading down into the chest and arms. Treat this as a medical emergency — it can progress to trouble breathing.",
      "A rolling boil for a full 10 minutes destroys the botulism toxin completely, if you're cooking food you're genuinely unsure about rather than discarding it outright.",
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
      "Once you actually have radios, don't leave them on and transmitting constantly — it drains batteries fast. A simple schedule works well: turn radios on for a few minutes at a set time every hour (like the top of the hour), announce who you are, your status, and location, then switch to listening for a few minutes before turning off again.",
      "A few commonly used channels if you don't have a pre-arranged plan: MURS channel 3 (151.940 MHz) or FRS/GMRS channel 1 (462.5625 MHz) for people nearby; GMRS channel 20 (462.675 MHz) for longer range; CB channel 9 (27.065 MHz) is the official emergency channel, and channel 19 (27.185 MHz) is commonly used for road and traffic info.",
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
      "How to tell if a plastic container is safe for water: look for a small recycling triangle with a number inside, usually on the bottom. #1 (PET), #2 (HDPE), #4 (LDPE), and #5 (PP) are all fine for water. Avoid #3 (PVC) and #6 (polystyrene) entirely, and only use #7 if it's specifically labeled BPA-free.",
      "Never reuse a barrel or drum that held anything other than food, even if it's labeled food-grade plastic — chemical residue from fuel, pesticides, or solvents soaks into the plastic itself and can't be washed out. If you're repurposing a used food-grade drum (syrup, juice concentrate), wash it with hot soapy water, then sanitize with about 1 tablespoon of plain unscented bleach per gallon of water swished across every interior surface, and rinse well before filling.",
      "If you're filling a barrel for long-term storage and your water comes from a private well or another untreated source, add about 1/8 teaspoon (roughly 8 drops) of plain unscented bleach per gallon before sealing it — for a full 55-gallon drum, that's about 2 teaspoons. Seal tightly with the threaded cap (a bung wrench helps get it snug), and store the barrel up off bare concrete on a wood pallet, out of direct sunlight.",
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
      "Check the well cap itself: it should be a bolted sanitary seal with a downward-facing screened vent, sitting at least 12-18 inches above the highest floodwater expected in your area. If muddy floodwater ever tops the casing, surface bacteria and pathogens can siphon straight down into the aquifer.",
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
      "Know that fallout radiation fades fast at first: it's most intense in the first hour, drops to about a tenth of that by 7 hours, to about a hundredth by roughly 2 days, and to a thousandth within about 2 weeks. That's exactly why officials say to shelter for at least 24-48 hours before any short trip outside, and why the first day matters most.",
      "If you're close enough that the flash and shock wave don't arrive together: the flash travels at the speed of light, so you see it first. The shock wave itself travels roughly a mile every 5 seconds, so depending how far away you are, you may have a few seconds to a couple minutes of warning after the flash before it hits — use every second of that to get down and take cover.",
      "While you're down: keep your mouth slightly open and cover your ears with your hands. This helps equalize the pressure from the blast wave and lowers the chance of ruptured eardrums or lung damage from the pressure itself.",
      "If you have potassium iodide (KI) tablets: they only protect your thyroid from one specific radioactive substance in fallout (radioactive iodine) — they do nothing for the blast, the initial radiation, or other radioactive materials in fallout. Only take them when officials specifically advise it; taking extra doesn't add protection and can cause its own health problems.",
      "Fallout itself doesn't start landing immediately — you generally have something like 10-15 minutes after the blast before radioactive dust and debris starts drifting back down. Use that window to get inside and as deep into shelter as you can, rather than assuming you have no time at all or unlimited time.",
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
      "Remember the three things that protect you: time (spend as little time as possible in an exposed area), distance (getting twice as far from a radiation source cuts your exposure to a quarter), and shielding (put dense material between you and the outside). Dense mass matters most — a few feet of packed earth or a couple feet of concrete blocks the large majority of radiation, which is exactly why a below-ground shelter is so much safer than an upper floor.",
      "Don't use hair conditioner when washing off radioactive dust — the oils in conditioner actually bind the particles to your hair, making them harder to rinse out, not easier. Plain shampoo or soap works better here.",
      "Rough idea of how much material it takes to cut incoming radiation in half: about 2.5-3 inches of concrete, 3.5-4 inches of packed soil, or 10-12 inches of solid wood. Without a real underground shelter, you can stack heavy furniture, filled water jugs, or bags of soil and sand against the walls and over you in a corner of a room to build up that kind of mass — it doesn't need to be fancy, just dense and thick.",
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
      "A \"silent chest\" is a red flag, not a good sign: if wheezing suddenly stops but the person is still struggling to breathe, that usually means the airways have closed down so much that air barely moves at all anymore — it's not improvement. Treat this as an immediate 911 emergency.",
      "If they carry an epinephrine auto-injector and their rescue inhaler isn't helping: epinephrine can also help open the airways in a severe asthma attack, not just allergic reactions. Use it the same way you would for anaphylaxis.",
      "With absolutely nothing else on hand: hot black coffee or breathing warm steam can sometimes take the edge off temporarily, since caffeine is chemically related to a mild asthma medication — this is a weak, last-resort measure, not a substitute for real treatment.",
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
      "Know the rough stages: mild hypothermia is heavy shivering but still clear-headed; moderate is violent shivering with clumsy hands and confusion; severe is when shivering actually stops, muscles go rigid, and the person is barely responsive or unconscious — that's the most dangerous stage, not a sign they're improving.",
      "For a more complete warming setup: get them into dry clothes first (cut clothing off rather than moving a severely cold person around, if needed), wrap them in something that blocks wind and wet (a space blanket or even a plastic trash bag), then add real insulation on top (sleeping bags, blankets), making sure there's something between them and the ground the whole time — cold ground pulls heat out fast.",
      "Keep a moderately-to-severely hypothermic person lying flat, not sitting or standing, even to move them. Sitting a very cold person upright can be enough to trigger a dangerous drop in blood pressure or even cardiac arrest — their body has been compensating in ways that don't handle a sudden position change well.",
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
      "Support the delivery: support the baby's head as it emerges with gentle hands; do not pull the baby out or push on the mother's stomach. If the cord is wrapped around the neck, slip it gently over the head. If it's wrapped tightly enough that you can't slip it free and the shoulders are about to deliver, that's one of the rare situations where the cord may need to be tied off in two spots and cut between the ties before continuing — this is why staying on the phone with dispatch matters, so someone can walk you through it in the moment.",
      "Care for the newborn: dry the baby thoroughly right away with a warm, clean towel. Clear fluid from the mouth and nose with a cloth. Place the baby directly skin-to-skin on the mother's chest and cover both with dry blankets.",
      "Leave the umbilical cord alone otherwise: do not cut the cord unless it's the tight-nuchal-cord situation above or emergency dispatch explicitly directs you to. Let the placenta deliver naturally, usually within 10-30 minutes — do not pull on the cord to speed it up, which risks severe internal injury to the mother.",
      "After the placenta delivers, the mother is still at risk of serious bleeding. Gently but firmly massage her lower belly in a circular motion until it feels firm, like a grapefruit, rather than soft — this helps the uterus contract and slows the bleeding. Putting the baby to breast right away also helps trigger the same effect naturally.",
      "Bleeding after birth (lochia) is normal, but soaking through more than one large pad in an hour, for two hours running, is not — that's a sign of active postpartum hemorrhage and needs the fundal massage above along with emergency care as fast as you can get it. A soft, squishy belly instead of a firm one is another sign the uterus isn't contracting the way it should.",
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
      "If you were caught in the plume before getting inside: strip off your outer layer of clothing as soon as you're safely indoors — this alone removes most of what landed on you. Cut clothing off rather than pulling it over your head so you don't drag contamination across your face. Bag it, seal the bag, and keep it away from people and pets. Wash exposed skin with plenty of water and mild soap, but don't scrub hard — that can push contaminants deeper into your skin.",
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
      "If you get swept into moving water: don't try to stand up once it's more than knee-deep and moving fast — your foot can wedge between rocks or debris on the bottom and the current can push you under. Instead, float on your back with your feet pointed downstream so your feet hit obstacles instead of your head, and angle your body roughly 45 degrees to the current to gradually work your way toward the bank.",
      "Watch out for \"strainers\" — a fallen tree or pile of branches and debris across the water. If the current is sweeping you toward one, don't let your legs go under it; flip onto your stomach, swim hard toward it, and pull yourself up and over the top the way you'd climb over a fence, rather than letting the water push you underneath it.",
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
      "The same rule applies beyond generators: charcoal grills, camp stoves, and kerosene heaters are just as dangerous indoors, even in a garage or an enclosed porch with the door propped open. None of these are designed to run anywhere air doesn't freely exchange with the outdoors.",
      "Don't rely on how someone looks to judge CO poisoning — the well-known \"cherry-red skin\" sign is actually rare and shows up late, if at all. Headache, dizziness, nausea, and confusion that several people in the house develop around the same time are much more common early warnings, and they're easy to mistake for a stomach bug or the flu.",
      "If you're using an indoor-rated propane heater (the kind actually built for indoor use, not a generator or grill), it still needs real airflow — keep a window cracked at least an inch the whole time it's running so it has fresh air to draw on.",
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
      "Cool the body's pulse points: soak cloths or bandanas in cool water and wrap them around the neck, wrists, groin, and armpits. Sponge arms and legs with water and let it evaporate off the skin. A whole shirt soaked in cool water works the same way, and works even better sitting in front of a fan or in a breeze.",
      "Stay on the lowest level: heat rises, so sleep on the ground floor or in a finished basement rather than upper stories. Avoid indoor heat sources like gas burners or ovens.",
      "Don't drink huge amounts of plain water while sweating heavily for hours — it flushes out the salt your body needs and can cause cramping or, in extreme cases, dangerous water intoxication. Add a pinch of salt to your water or eat something salty alongside it.",
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
      "No open flames or hot surfaces: never refuel equipment while the engine is running or hot — shut it off and let it cool for 5 to 10 minutes before pouring. A hot muffler can exceed 800°F, and fuel vapor near it can ignite instantly.",
      "If a fuel fire does start: never throw water on it — gasoline and grease fires float on water, and the water can violently splatter burning fuel outward instead of putting it out. Smother it instead: a Class B fire extinguisher, a heavy blanket thrown over it, or a shovelful of dry dirt or sand dropped right on the base of the flames all work by cutting off its oxygen.",
    ],
  },
  "Unknown pet poison response": {
    sources: ["American Society for the Prevention of Cruelty to Animals (ASPCA) Animal Poison Control Center","Merck Veterinary Manual","Pet Poison Helpline"],
    guidance: [
      "Identify and remove the source immediately: take the remaining substance, wrapper, or plant away so the pet can't reach more of it, and keep other animals away from the area.",
      "Don't induce vomiting unless specifically directed: never give hydrogen peroxide, salt, or baking soda blindly. Inducing vomiting can cause severe chemical burns if the poison was caustic (acids, lye, drain cleaner) or fatal lung damage if it was petroleum-based.",
      "Never induce vomiting in cats, rodents, rabbits, or horses at all — it isn't safe for their bodies no matter what they swallowed. For dogs only, if a vet can't be reached quickly and the poison wasn't caustic, fuel-based, or sharp, and the dog is alert (not drowsy, seizing, or unconscious): fresh 3% hydrogen peroxide by mouth, about 1 teaspoon per 5 lbs of body weight, never more than 3 tablespoons total regardless of size. Walk the dog afterward. If nothing happens in 15 minutes, one repeat dose is okay — after that, stop and get to a vet.",
      "Some poisons need faster action than others: antifreeze (ethylene glycol) can cause fatal kidney failure within about 12 hours, so treat it as an hours-not-days emergency. Rat and mouse poison (the anticoagulant kind) stops blood from clotting, but symptoms like weakness or pale gums may not show up for 3 to 7 days — don't assume your pet is fine just because they seem okay right after eating it. True lilies are deadly to cats specifically — even pollen or licking lily-vase water can cause fatal kidney failure, so treat any lily exposure in a cat as an immediate vet visit, symptoms or not.",
      "Chocolate is dosed by how dark it is, not just how much: milk chocolate becomes risky around 1 oz per pound of body weight, while unsweetened baking chocolate or cocoa powder is dangerous at just 0.1 oz per pound — call a vet or poison hotline with the type and amount eaten rather than guessing.",
      "Rat and mouse poisons aren't all the same: some (anticoagulant type) cause delayed bleeding as described above, but another common type causes tremors and neurological symptoms within hours with no home remedy — if you have the package, bring it or a photo of it with you, since treatment depends on which kind it was.",
      "Preserve the evidence: bag the packaging, chew remnants, plant leaves, or a sample of any vomit in a sealed plastic bag so a veterinarian can inspect it.",
      "Decontaminate skin and eyes: if poison got on the fur or paws, stop them from grooming it off (a cone or a wrapped towel works), then wash the coat with warm water and mild dish soap. Flush eyes with sterile saline or clean lukewarm water for 10 to 15 minutes.",
      "Keep the pet calm and warm: wrap them loosely in a towel or blanket and monitor breathing. Avoid strenuous activity, which speeds up how fast the poison is absorbed.",
      "Two hotlines staffed by vets around the clock (both charge a consultation fee): ASPCA Animal Poison Control, (888) 426-4435. Pet Poison Helpline, (855) 764-7661.",
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
      "Never shelter under a highway overpass — this is one of the most persistent tornado myths, and it's actually more dangerous than staying in a low vehicle or ditch nearby. Overpasses funnel and speed up the wind, and flying debris gets pulled through the gap with nowhere for you to anchor yourself.",
      "If you're driving and a tornado is visible: don't try to outrun it in traffic or a city. If you can clearly drive away at a right angle to its path, do that. If you're stuck, pull over away from trees and overpasses, keep your seatbelt on, get down below window level, and cover yourself with a coat or blanket.",
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
      "During a flood, ration water strictly: if the drainfield is waterlogged or submerged, stop running washing machines, dishwashers, and long showers — extra water forces sewage back into floor drains.",
      "Never pump a flooded tank: pumping out a septic tank while the surrounding soil is still underwater removes the ballast weight holding it down, and groundwater pressure can pop the tank out of the ground or collapse a plastic one.",
      "Block backflow points: plug low basement floor drains, basement toilets, and laundry sinks with mechanical test plugs or sandbags to stop sewage back-siphoning as groundwater rises.",
      "Inspect after the water recedes: check the drainfield for sinkholes, scouring, or exposed pipework, and have the tank pumped only once groundwater drops below the outlet baffle.",
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
      "The first-flush rule: the first 10 to 20 gallons of roof or tarp runoff wash down accumulated bird droppings, dust, pollen, heavy metals, and debris. Divert and discard that first dirty flush before directing water into your collection barrels. As a rule of thumb, waste roughly 1-2 gallons for every 100 square feet of roof you're collecting from — a bigger roof needs a bigger first flush discarded.",
      "Choose clean catchment surfaces: corrugated metal, glass, and food-grade plastic sheeting give the cleanest runoff. Avoid old asphalt-shingle roofs, which leach petroleum hydrocarbons, and lead-flashed roofs.",
      "Pre-filter debris: keep a fine mesh screen over the intake opening to block leaves, twigs, and insects.",
      "Always treat before drinking: collected rainwater isn't automatically safe to drink. Filter out fine silt, then bring it to a rolling boil or disinfect it with plain unscented bleach before drinking or cooking with it.",
      "If you're storing rainwater for weeks or months rather than using it right away: keep it in dark or opaque containers so light can't grow algae inside, and re-treat it every 6-12 months with a small amount of plain unscented bleach (roughly 1 fluid ounce per 100 gallons) to keep it from turning unsafe while it sits.",
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
      "Two-part epoxy putty for a steadier leak: shut off the water and dry the pipe surface, then knead a two-part plumbing epoxy putty between your fingers until the color is uniform. Press it firmly into and around the crack and let it cure rock-hard (15-25 minutes) before restoring pressure.",
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
      "Put real distance on your out-of-town contact — 200 to 500 miles outside your region, past the reach of a single regional disaster. Keep the actual message simple: one check-in text with your status and general location (\"John safe, moving toward Rally Point 2\") lets that person relay updates to everyone else, instead of the whole family trying to call each other through jammed local circuits.",
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
  "Bug-out / evacuation plan (general)": {
    sources: ["Ready.gov / FEMA Evacuation Guidelines","American Red Cross, Be Red Cross Ready"],
    guidance: [
      "Set specific departure triggers ahead of time: an official order, active smoke or floodwater approaching the property, or sudden loss of a critical power-dependent system all count as \"go now.\"",
      "Map primary and alternate routes: pre-select several driving and walking paths out of the area in different directions, avoiding choke points like low bridges, flood-prone valleys, or single-access rural roads.",
      "Keep the vehicle and bags ready: fuel tank at least half full at all times, tires and fluids checked regularly, and individual 72-hour go-bags staged near your primary exit.",
      "Stage at least two destination options: a friend or family member's home in another county, a motel outside the region, or a designated public shelter.",
      "Run a 5-minute departure drill: practice loading bags, securing pets, shutting off critical utilities, and being out the door within 5 minutes of the alarm.",
    ],
  },
  "Shelter-in-place plan": {
    sources: ["Centers for Disease Control and Prevention (CDC)","FEMA Shelter-in-Place Guidance"],
    guidance: [
      "Know the difference between hazard types: sealing an interior room is for hazardous chemical or biological plumes; taking cover in a reinforced low-level room is for severe weather and tornadoes — they call for different rooms.",
      "Pick the safe room in advance: an interior room on an upper floor with few doors and windows for airborne chemical plumes (many toxic chemicals sink and pool low), or a basement or interior ground-floor room for tornadoes, blast, or high wind.",
      "Keep a sealing kit right in that room: heavy plastic sheeting or thick contractor bags, duct tape, a utility knife, and clean towels, so you can seal door edges, windows, and HVAC vents fast.",
      "Know the shutdown sequence: switch off heating, air conditioning, and all exhaust fans, and close the fireplace damper, so you're not pulling contaminated outside air into the building.",
      "Keep supplies staged in the room: a battery radio, extra flashlights, 3 days of water and non-perishable food, prescriptions, and hygiene supplies.",
    ],
  },
  "Winter storm plan": {
    sources: ["Centers for Disease Control and Prevention (CDC)","Ready.gov Winter Weather Preparedness"],
    guidance: [
      "Stock the essentials: at least a 3-day (ideally 2-week) supply of no-cook non-perishable food, 1 gallon of water per person per day, and a battery or hand-crank radio.",
      "Set up the warm room in advance: a small interior room that traps body heat, drafts sealed at the windows with towels or heavy blankets, sleeping bags and cold-weather clothing staged inside.",
      "Winterize the plumbing: insulate exposed pipes, open under-sink cabinets on outside walls to let indoor heat circulate, and let cold-water faucets drip slightly during hard freezes to relieve line pressure.",
      "Keep the vehicle ready: fuel tank at least half full, with jumper cables, sand or cat litter for traction, a flashlight, warm coats, gloves, blankets, and a window scraper on board.",
    ],
  },
  "Medical emergency plan (household-specific)": {
    sources: ["American Heart Association (AHA)","American Red Cross Emergency Medical Preparedness Guidelines"],
    guidance: [
      "Write up a medical profile for every household member: existing diagnoses, daily medications with exact dosages, drug allergies, implanted medical hardware, and preferred hospital.",
      "Assign clear roles in advance: who does first aid, who secures pets or meets emergency personnel in the driveway, and who gathers medication bottles and medical paperwork.",
      "Stage medical equipment in one place: trauma supplies, tourniquets, glucose tablets, rescue inhalers, and epinephrine autoinjectors, kept in a single clearly labeled spot everyone in the family knows.",
      "Identify a backup care option: an alternate care facility or walk-in clinic outside your immediate neighborhood in case the local ER is overwhelmed or roads are blocked.",
    ],
  },
  "Family separation / reunification plan": {
    sources: ["Ready.gov / FEMA Family Emergency Communication Plan","American Academy of Pediatrics"],
    guidance: [
      "Set three progressive meeting points: immediate, right outside the home (a mailbox or tree); neighborhood, within walking distance (a park or library); and out-of-town, like a relative's house, if the whole area evacuates.",
      "Designate an out-of-area check-in contact: one relative or friend in a different region as the communication hub, with everyone checking in by text if local calls fail.",
      "Carry physical emergency cards: every household member, kids included, gets a laminated card with full contact numbers, meeting-point addresses, and regional contact details.",
      "Know the federal reunification channels: the National Emergency Child Locator Center (NECLC) and the Unaccompanied Minor Registry (UMR) are the official channels if a family gets separated during a large-scale evacuation — keep them recorded.",
      "Agree on a simple rule in advance for what to do if you're separated when something happens during work or school hours: stay where you are until your normal commute time, then head straight home along your usual route if it's safe to do so. Don't improvise a new meeting spot in the moment — a plan only works if everyone already knows it.",
      "Don't go looking for a missing family member in the first 24 hours unless you know for certain they're in danger. It feels wrong to wait, but search parties and the missing person often end up missing each other entirely, especially with no phones working — staying put is usually what actually gets you reunited faster.",
      "Leave a physical note if you have to move from your agreed meeting point: a simple written note with the date and time, where you're headed, and when you'll check back, left somewhere obvious (taped to the door, under a specific rock, in a mailbox) can tell an arriving family member what happened even with no phones working at all.",
    ],
  },
  "Hurricane plan": {
    sources: ["Ready.gov / FEMA Hurricane Safety Guidelines","American Red Cross Hurricane Preparedness Checklist"],
    guidance: [
      "Act at the 48- and 36-hour marks: at a Hurricane Watch (48 hours), check fuel, test batteries, review evacuation routes, and secure outdoor furniture and debris. At a Hurricane Warning (36 hours), put up plywood or storm shutters, stage supplies, and be ready to evacuate if you're in a storm-surge or flood zone.",
      "Know your shelter-vs-evacuate line: evacuate immediately if ordered, if you're in a coastal evacuation zone, or if your home is a mobile home, manufactured home, or RV. If sheltering in a sturdy permanent home outside a flood zone, move to a small windowless interior room on the lowest level before winds reach tropical-storm strength.",
      "Stage water and utilities before landfall: fill bathtubs and containers with water for flushing and sanitation before pressure drops, and turn the fridge and freezer to their coldest settings, keeping doors shut.",
      "Follow the post-storm re-entry rule: wait for official confirmation that roads and bridges are clear before returning. Treat every downed line as energized, avoid standing floodwater, and inspect the foundation and gas lines before moving back in.",
    ],
  },
  "Flood evacuation plan": {
    sources: ["FEMA","Ready.gov Flood Safety and Evacuation Planning"],
    guidance: [
      "Know your flood threshold and terrain: learn your property's risk relative to local creeks, bayous, and retention ponds, and know the rainfall rate or river stage that starts cutting off your access roads (islanding risk).",
      "Map primary and secondary high-ground routes: chart at least two driving and walking routes to higher elevation, and never route an evacuation across a low-water crossing, a bridge over fast runoff, or a dip prone to flash flooding.",
      "Pack a waterproofed 72-hour kit: go-bags in waterproof dry bags or heavy plastic bins near an exit, with ID, property titles, insurance, and prescriptions sealed in watertight sleeves.",
      "Know the utility and departure trigger: if rising water threatens the house, shut off the main breaker and water valve before leaving, only if you can do it safely on dry ground — and leave while roads are still dry, never wait until water reaches the driveway.",
    ],
  },
  "Wildfire evacuation plan": {
    sources: ["National Fire Protection Association (NFPA) Firewise USA","Ready.gov / CAL FIRE Wildfire Action Plan"],
    guidance: [
      "Set departure triggers now: don't wait for a mandatory order if you smell heavy smoke, see active fire, or get a warning. High wind makes wildfire outrun vehicles, so leave early while routes are still clear of smoke and abandoned cars.",
      "Prep the home perimeter if there's time: shut all windows and doors to kill interior drafts, turn off propane at the main valve, move patio furniture and cushions at least 30 feet from the house, and leave exterior and interior lights on so firefighters can find it through smoke.",
      "Dress for radiant heat: full-length pants, a long-sleeved 100% cotton or wool shirt (no synthetics, which melt onto skin), heavy leather boots, leather gloves, and an N95 or P100 respirator.",
      "Set up the vehicle for a fast exit: back it into the driveway with doors unlocked and keys in the ignition, windows fully up, headlights and hazards on, and climate control on internal recirculation so it doesn't pull in embers and smoke.",
    ],
  },
  "Damaged roof, windows, weatherproofing": {
    sources: ["FEMA","National Roofing Contractors Association (NRCA) Emergency Home Repair Guidelines"],
    guidance: [
      "Safety first: never get on a wet roof or work during high wind. Secure the ladder at a 4:1 slope, extend it three feet past the roofline, and tie it off at the top.",
      "Prep the surface: sweep away loose shingles, branches, and dirt so the patch lies flat against the wooden decking.",
      "Choose underlayment or a tarp: for small punctures, use self-adhering modified bitumen (peel-and-stick ice-and-water shield) or heavy 30-lb roofing felt tacked down with plastic-capped roofing nails.",
      "Follow the bottom-to-top overlap rule: layer material from the eaves upward toward the peak. Each higher sheet overlaps the lower one by at least 4 to 6 inches, and runs over the ridge so rain sheds cleanly without running underneath.",
    ],
  },
  "Fuel inventory": {
    sources: ["National Fire Protection Association (NFPA 30: Flammable and Combustible Liquids Code)","Small Engine Manufacturers Association"],
    guidance: [
      "Use the right containers: dedicated, heavy-duty, vapor-sealed safety cans certified by UL, ASTM, or DOT — red for gasoline, yellow for diesel, blue for kerosene. Never glass jugs, milk jugs, or open buckets.",
      "Add a stabilizer before storage: untreated pump gasoline starts breaking down and forming engine-clogging varnish within 30 to 90 days. Mix in a fuel stabilizer (like STA-BIL or Sea Foam) as you fill the container, which extends shelf life to 12 to 24 months.",
      "Buy ethanol-free fuel for long-term storage when you can: ethanol absorbs moisture from the air, which causes phase separation and corrodes carburetors in generators, chainsaws, and pumps.",
      "Keep safe storage clearance: a well-ventilated, detached shed or garage at least 50 feet from occupied living space, pilot lights, water heaters, and spark sources — and never more than 25 gallons inside a residential garage.",
      "Diesel doesn't break down the way gasoline does, but it attracts moisture and can grow a bacterial/fungal slime people call \"diesel algae\" — black, stringy growth that clogs fuel filters fast. A diesel-specific biocide additive, used about once a year in stored fuel, kills it off, and running diesel through a water-separating filter before it goes into a vehicle or generator catches problems before they cause a breakdown.",
    ],
  },
  "Battery watt-hour budgeting (calculator)": {
    sources: ["National Electrical Code (NEC Article 690/706)","Department of Energy (DOE) Off-Grid and Emergency Power Systems"],
    guidance: [
      "Calculate total daily watt-hours: multiply each critical device's wattage by the hours it runs per day (watts × hours = watt-hours). A 60W CPAP run for 8 hours is 480Wh a day; add up every device for your daily baseline.",
      "Account for inverter conversion loss: inverters converting 12V DC battery power to 120V AC typically run 80% to 85% efficient. Divide your total AC watt-hour need by 0.85 so the battery bank actually covers the loss.",
      "Respect battery depth-of-discharge limits: never drain lead-acid or AGM batteries below 50% of rated capacity without permanent plate damage. Lithium iron phosphate (LiFePO4) batteries can safely go to 80-90%.",
      "Size the inverter for both continuous and surge watts: the continuous rating must exceed everything running at once, and the surge rating needs headroom for motorized appliances (fridges, pumps), which can briefly draw 2 to 3 times their running wattage on startup.",
      "Once you know your daily watt-hour need, you can size solar panels to actually replace it: divide your daily watt-hours by your area's average peak sun hours (roughly 4 in winter, 5-6 in summer for most of the US). A 600Wh daily need divided by 4 peak sun hours means you need at least 150W of panels just to break even on an average day — plan for more than the bare minimum to cover cloudy stretches.",
      "Match the inverter's wave type to what you're running: a pure sine wave inverter produces smooth power safe for variable-speed motors, medical equipment like CPAPs, and electronics with digital control boards. A cheaper modified sine wave inverter puts out a choppy, stair-stepped signal that's fine for simple resistive loads (space heaters, incandescent bulbs) but can make sensitive electronics hum, run hot, and burn out early.",
    ],
  },
  "Sump-pump failure": {
    sources: ["Federal Emergency Management Agency (FEMA), Protecting Your Home from Sump Pump Failures and Flooding", "FEMA P-312: Protecting Building Utility Systems from Flood Damage"],
    guidance: [
      "Diagnose the failure fast: check for a tripped breaker, an unplugged cord, a float switch stuck on debris or jammed against the pit wall, or a jammed impeller.",
      "Clear a mechanical jam safely: disconnect power completely before putting your hands in the pit, then check the base intake screen for gravel, stones, or sludge blocking the impeller.",
      "Know why this matters beyond a wet floor: if the pump stays down while groundwater keeps rising outside, pressure can build up underneath your foundation slab — even a couple feet of water outside can push up hard enough to crack a basement floor. Getting water moving again (by any method below) isn't just about staying dry.",
      "Set up a 12V DC backup: a dedicated marine deep-cycle battery running an auxiliary bilge pump or a second sump pump with its own check valve and independent discharge line.",
      "If you still have pressurized tap water, a water-powered ejector pump can move sump water out with no electricity at all — it uses the pressure of your incoming water to create suction, at the cost of using some tap water to do it.",
      "If your property slopes away from the house, a gravity drain line from the bottom of the sump pit straight out through the foundation wall downhill can run continuously with no power — protect the outside opening with a screen (keeps animals out) and a one-way flap (stops water flowing back in during heavy rain).",
      "Bail or siphon manually as a last resort: with no power and no backup pump, bail the pit with a 5-gallon bucket into drainage sloped away from the house, or run a continuous siphon with a garden hose out a basement window to lower ground.",
    ],
  },
  "Improvised repairs (duct tape, tarp, zip-tie fixes)": {
    sources: ["U.S. Army Field Manual (FM 4-30.31), Recovery and Field Repair Operations"],
    guidance: [
      "Splint cracked wooden handles: align the fracture on a shovel, axe, or rake handle, bind it tightly with metal hose clamps or wire, and sandwich the crack between two rigid wood or metal splint slats lashed with paracord.",
      "Bond plastics and small housings: mix cyanoacrylate (super glue) with baking soda for an instant, hard composite weld on cracked plastic. Wrap high-stress joints in self-fusing silicone tape or fiberglass repair wrap.",
      "Replace lost fasteners in the field: swap a lost shear pin, cotter pin, or small bolt temporarily with heavy bailing wire, a cut framing nail bent at the tip, or a heavy steel paperclip to keep equipment running.",
      "Restore a cutting edge without power tools: use an 8 or 10-inch bastard mill file, single forward strokes across the bevel at a steady 20 to 30 degree angle — never file backward.",
    ],
  },
  "Improvised lever/pry/lift techniques": {
    sources: ["FEMA Urban Search & Rescue (US&R), Structural Collapse Shoring and Lifting Operations"],
    guidance: [
      "Pick the right mechanical advantage: use a Class 1 lever (a pry bar over a fulcrum) with the fulcrum as close to the load as possible and your hands at the far end of the lever, to maximize lifting force.",
      "Give the fulcrum a stable base: never set a lever directly on soft soil, crumbling masonry, or a slick surface. Put a wide, flat wooden block or thick stone under the pivot point so it can't sink or kick out under load.",
      "Follow \"lift an inch, crib an inch\": when prying up a beam, vehicle, or fallen tree to free someone, slide solid wood blocking (cribbing) underneath as it rises. Never trust the lever or jack alone — if it slips, the load needs to land on wood, not on someone's hands.",
      "Use the right lever material: thick steel pipe, a solid crowbar, or heavy hardwood (oak, hickory, ash). Never lightweight conduit, hollow aluminum pipe, or brittle dry pine — they can snap suddenly and throw sharp fragments.",
    ],
  },
  "Emergency vehicle extraction (tow straps, winching, traction)": {
    sources: ["National Off-Road Association (NORA) Vehicle Recovery Protocols","Society of Automotive Engineers (SAE)"],
    guidance: [
      "Improvise traction first: if wheels are spinning in mud, sand, or snow, dig out the packed buildup in front of the drive tires, then wedge traction boards, rubber floor mats (carpet side down), coarse gravel, or branches tight under the leading edge of the drive wheels.",
      "Try deflating the tires: lower pressure to 15-18 PSI (12-15 PSI on soft sand) to widen the tire's footprint and improve grip. Drive slowly and re-inflate with a portable 12V compressor once you're back on firm ground.",
      "Know the difference between tow straps and kinetic ropes: static tow straps don't stretch and are only for slow, steady towing on flat ground — never jerk against one. Kinetic snatch straps stretch 20-30% and are built for a rolling \"snatch\" pull that snaps a vehicle out of deep mud or ruts.",
      "Never hook to a trailer hitch ball or suspension part: the shock load can snap a towing ball clean off the shank into a lethal projectile. Connect only to frame-mounted recovery hooks or a hitch-receiver shackle bracket with a heavy-duty rated bow shackle.",
      "Dampen the line before pulling: drape a heavy recovery dampener, thick jacket, or weighted blanket over the center of a winch cable or tight strap. If it snaps under tension, the weight knocks it to the ground instead of whipping through a windshield.",
    ],
  },
  "Basic rigging and lifting safety limits": {
    sources: ["OSHA 1910.184 (Rigging Equipment for Material Handling)","American Society of Mechanical Engineers (ASME B30)"],
    guidance: [
      "Rig to the Working Load Limit, not the breaking strength: equipment is rated for both Breaking Strength (where it fails) and Working Load Limit (WLL, usually 1/3 to 1/5 of breaking strength). Always rig to the lower WLL — movement, bouncing, and angled pulls add stress well beyond dead weight.",
      "Watch sling angles: when lifting with two slings or chains in a bridle, keep the angle to the ground steep, ideally 60 degrees or more. Below 30 degrees, tension multiplies fast and can cut your lifting capacity in half.",
      "Protect against sharp edges: never route straps, ropes, or winch line across a sharp metal edge or concrete corner without heavy padding — thick corner protectors, folded canvas, cut fire hose, or split wood between the strap and the corner.",
      "Keep everyone out of the fall line: rescuers and helpers stay outside the pinch zone and out from under the swing path of any suspended load, and never stand in line with a loaded winch cable or strap that could whip back if hardware fails.",
    ],
  },
  "Off-grid seed saving and viability testing": {
    sources: ["USDA Seed Storage Guidelines","Organic Seed Alliance"],
    guidance: [
      "The \"rag-doll\" germination test: dampen a clean paper towel, lay out 10 seeds in a line, roll it loosely, and seal it in a zip-top bag somewhere warm (70-80°F) for 7 to 10 days. Unroll and count sprouts — 8 of 10 is an 80% germination rate. Below 70%, plant more seed to compensate.",
      "Harvest only mature, open-pollinated seed: hybrid (F1) varieties won't breed true to the parent plant. Collect from dry pods (beans, peas) once they rattle, or from overripe fruit (tomatoes, squash, melons) before it rots.",
      "Ferment wet seeds first (tomatoes, cucumbers): scoop seeds into a jar with a little water and let it ferment at room temperature for 2 to 4 days until a mold layer forms — this breaks down the germination-inhibiting gel and kills seed-borne bacteria. Rinse in a fine sieve and discard any floating (dead) seeds.",
      "Store cool, dark, and dry: dry seeds on parchment or a coffee filter, not a paper towel, which sticks to wet seed, until they crack rather than bend. Store in an airtight glass jar with a desiccant pack below 50°F — storage life roughly doubles for every 10°F drop.",
    ],
  },
  "Emergency grain grinding and flour alternatives": {
    sources: ["Penn State Agricultural Extension, Processing Whole Grains at Home","FAO, Grains and Flours in Emergency Rations"],
    guidance: [
      "Hand-crank mill vs. mortar and pestle: a heavy-duty hand-crank mill with cast-iron or stone burrs works best — run a coarse pass first, then a fine pass for bread-grade flour. With a flat grinding stone or heavy pestle, grind small half-cup batches with a rocking, crushing motion rather than stirring.",
      "Boil whole grains if you have no mill: simmer whole wheat berries, barley, or oat groats in a 1:3 water ratio for 45 to 60 minutes, or soak overnight in a wide-mouth thermos of boiling water, for tender edible grain with no milling needed.",
      "Nut and seed flours: dried acorns (cold-water leached until every trace of bitter tannin is gone), mesquite pods, and sunflower seeds can be pounded into dense, high-fat, high-protein flour substitutes.",
      "Know the shelf life: whole intact grains keep 20+ years sealed with oxygen absorbers. Once milled into flour, the natural oils oxidize fast — use fresh-milled flour within 2 to 4 weeks or freeze it to stop it going rancid.",
    ],
  },
  "Root cellaring and underground cold storage": {
    sources: ["University of Wisconsin Extension, Storing Vegetables at Home","USDA Agricultural Information Bulletin"],
    guidance: [
      "Hit the right temperature and humidity: 32-40°F with 85-95% relative humidity keeps vegetables firm and stops them sprouting.",
      "Sort ruthlessly: never store a bruised, nicked, cut, or diseased vegetable — even a tiny skin puncture introduces mold that spreads through the whole bin.",
      "Pack roots in a damp medium: layer carrots, beets, parsnips, and turnips in wooden crates with slightly damp sawdust, clean sand, or peat moss so the roots don't touch, which holds moisture in and light out.",
      "Keep ethylene producers separate: apples, pears, and ripe fruit give off ethylene gas, which makes potatoes sprout and carrots turn bitter — store them apart. Keep onions and garlic dry (60% humidity), away from the moisture-loving root crops.",
      "Improvise in-ground storage: bury a clean metal garbage can or chest freezer in a shaded, well-drained bank, layer dry straw on top, add a small vent pipe, and cover with a thick wooden lid topped with 12 inches of soil or straw bales.",
      "Some vegetables need to be cured before they go into cold storage, not straight from the ground: onions, garlic, winter squash, and sweet potatoes should sit somewhere warm, dry, and shaded for 10-14 days first. This toughens their skins and heals over small nicks from harvesting, so they don't just rot in storage.",
    ],
  },
  "Emergency hide tanning and rawhide production": {
    sources: ["Society of Primitive Technology Technical Bulletins","U.S. Department of the Interior, Traditional Native Tanning Methods"],
    guidance: [
      "Flesh and scrape first: pin the fresh hide flat over a smooth scraping log or fleshing beam and scrape off every trace of meat, fat, and membrane with a dull drawknife or scraper. Incomplete fleshing causes immediate bacterial decay and hair slippage.",
      "Make rawhide: submerge the scraped hide in a cold-water bath saturated with clean hardwood ashes (or hydrated lime) for 3 to 6 days until the hair slides off with light scraper passes. Rinse in several changes of clear water (a splash of vinegar helps neutralize the alkali) until the slippery feel is gone, then lace it tight inside a wooden frame through holes punched 2 inches apart around the edge and let it dry stiff and rock-hard.",
      "Brain-tan for soft buckskin: every animal's brain has enough natural oil to tan its own hide. Simmer the brain in a cup of water into a smooth warm slurry, then work it deep into both sides of the dried, hairless skin.",
      "Work and smoke the hide: pull and stretch the drying hide continuously over a cable or smooth log edge until the fibers are completely soft, then smoke it over a smoldering punky-wood fire for several hours — the smoke's compounds keep the leather pliable even after it gets wet.",
      "Bark-tan as an alternative to brain-tanning: simmer inner bark from oak, chestnut, hemlock, or sumac in a non-iron pot (iron reacts with tannins and stains the leather) until the water is a deep tea color, then cool it completely — a hot bath scalds and hardens raw hide. Soak the hide in a weak bath first for several days, then move it through progressively stronger tannin baths over 3 to 6 weeks. It's fully tanned when a sliced cross-section shows tannin color all the way through, with no raw white line in the middle.",
    ],
  },
  "Off-grid refrigeration and cooler management": {
    sources: ["USDA Food Safety and Inspection Service (FSIS)","CDC Food and Water Safety During Power Outages"],
    guidance: [
      "Pre-chill the cooler itself: it absorbs heat from room-temperature items, so chill it with sacrificial ice for a few hours and drain the meltwater before packing pre-chilled or frozen food.",
      "Use block ice, not cubes: solid blocks melt much slower than cubed or bagged ice because of the lower surface area. Freeze clean water in rinsed 1-gallon jugs to use as blocks — they also give you clean drinking water as they thaw.",
      "Pack in layers by density: ice blocks on the bottom, raw vacuum-sealed meat against the ice, dairy and prepared food in the middle, delicate produce or bread up top in a dry basket.",
      "Minimize openings and fill empty space: every lid opening dumps the cold air. Use one cooler for drinks and snacks you grab often and a separate one for perishables, and fill empty air pockets with crumpled newspaper or towels to slow convection.",
    ],
  },
  "Solar cooking and solar box oven basics": {
    sources: ["Solar Cookers International (SCI) Technical Standards","FAO Household Energy Guidelines"],
    guidance: [
      "Understand the greenhouse principle: a solar oven traps solar heat under a clear glass or heat-resistant plastic lid, converting direct sunlight into radiant heat while insulated walls hold it in.",
      "Keep it aimed at the sun: re-orient the box toward the sun every 30 to 45 minutes to keep sunlight reflecting into the dark cooking chamber.",
      "Use thin, dark, lidded cookware: dark matte metal pots (graniteware or cast aluminum) absorb heat fastest, and a tight lid keeps steam and heat in.",
      "Hit a safe temperature: food needs to reach and hold at least 140°F, ideally 180-200°F, to cook and pasteurize safely. Avoid cooking large raw meat cuts on partly cloudy days, when temperatures can drift into the 40-140°F bacterial danger zone.",
    ],
  },
  "Emergency firewood selection and safe burning": {
    sources: ["EPA Burnwise Guidelines","Chimney Safety Institute of America (CSIA)"],
    guidance: [
      "Burn seasoned hardwood: oak, hickory, ash, and hard maple burn hot, hold coals longer, and leave far less creosote than softwoods. Wood needs to be dry and seasoned — grayed ends, visible cracks, and a hollow sound when struck.",
      "Never burn treated or processed wood: pressure-treated lumber (arsenic and copper), painted or varnished wood, plywood, particleboard, and plastics all release toxic gases like dioxins and hydrogen cyanide when burned.",
      "Avoid green pine in a closed stove: unseasoned pine and fir are high in sap and resin, burn cool, and coat the chimney flue with flammable creosote fast — a real chimney-fire risk.",
      "Stack for airflow outdoors: crisscross log-cabin or teepee stacking draws air from the bottom and sends smoke straight up instead of smothering the embers.",
      "For long-term storage, keep the stack up off bare ground (pallets or rails work) so ground moisture doesn't rot the bottom layer, and leave a couple inches of open air space between rows so wind can pass through and dry it. Only cover the very top of the stack, not the sides — wrapping the whole pile in a tarp down to the ground traps moisture inside and turns the wood moldy instead of keeping it dry.",
    ],
  },
  "Charcoal production and firebed management": {
    sources: ["FAO Forestry Paper No. 41, Simple Technologies for Charcoal Making","U.S. Forest Service"],
    guidance: [
      "Understand pyrolysis: real charcoal comes from heating hardwood to high temperature with very little oxygen, which drives off moisture, gases, and resin and leaves pure carbon behind.",
      "Two-drum retort method: pack dry hardwood chunks tightly into a clean 5-gallon metal bucket with a few small vent holes in the lid, and set that inside a larger 55-gallon burn drum surrounded by fire. Once the white smoke and flame from the inner can stop, seal every hole with damp soil to suffocate the batch.",
      "Never quench hot charcoal with a lot of water: cool it by sealing the container airtight instead — dumping water on glowing coals makes scalding steam and shatters the charcoal into unusable powder.",
      "Respect the carbon monoxide hazard: DIY charcoal and open braziers produce large amounts of odorless, deadly CO — never burn or use them inside any enclosed room, tent, or porch.",
    ],
  },
  "Rocket stoves and biochar basics": {
    sources: ["Aprovecho Research Center, Rocket Stove Design Principles","International Biochar Initiative"],
    guidance: [
      "The L-shaped combustion chamber: a rocket stove uses an insulated L-shaped elbow (metal pipe packed in perlite, wood ash, or clay) that superheats the burn zone, burning both the wood and the wood-smoke gases for a nearly smokeless, very efficient fire.",
      "Feed it small: feed pencil- to thumb-sized dry twigs horizontally into the bottom shelf, and keep the air channel under the shelf clear to sustain the draft (the \"rocket roar\").",
      "Time a biochar quench right: to make biochar, burn biomass in a top-lit updraft container and quench the glowing coals with water, or seal them airtight, right as the flames vanish — before the coals burn down to white mineral ash.",
    ],
  },
  "Perimeter alarm and tripwire systems": {
    sources: ["U.S. Army Field Manual (FM 3-21.8), Perimeter Security and Early Warning Systems"],
    guidance: [
      "Keep it non-lethal: perimeter trip lines should only trigger auditory or visual early warning — bells, a rattle can of pebbles, a light trip-flare. Never rig one as a booby trap; that's dangerous and illegal.",
      "Set the right height: run trip lines 6 to 12 inches off the ground to catch a walking footfall, or at waist height across a narrow gate or pinch point.",
      "Choose low-visibility line: dark green or camo monofilament fishing line (10-20 lb test) or dark wire, tied off with light tension to a hair-trigger clothespin or pull-pin rattle trap.",
      "Keep the line clear: trim underbrush, branches, and tall grass beneath it so wind or small animals don't set off constant false alarms.",
    ],
  },
  "Property fortification and access denial": {
    sources: ["FEMA 426, Mitigation Measures for Physical Building Security","National Crime Prevention Council (CPTED principles)"],
    guidance: [
      "Think in layers: secure the outer boundary (fences, locked gates, posted warnings), then the middle yard (clear sightlines, thorny defensive plants, motion-activated lighting), then the dwelling itself (reinforced strike plates, heavy deadbolts).",
      "Remove hiding spots: trim tree branches up 6 feet from the ground and cut shrubs below 3 feet within 30 feet of exterior doors and windows.",
      "Harden the entry points: swap standard 1/2-inch strike-plate screws for 3-inch case-hardened screws driven into the wall's structural studs, add heavy-duty deadbolts, and use a drop-in 2x4 steel security bar across outward-opening doors.",
      "Protect the windows: anchor sliding doors and windows with a cut-to-size wooden dowel or steel pin dropped in the track, and add shatter-resistant security film to ground-floor glass.",
    ],
  },
  "Emergency vehicle maintenance (fluid leaks, belts, tires)": {
    sources: ["Department of Transportation (DOT)","Society of Automotive Engineers (SAE) Field Vehicle Recovery Guidelines"],
    guidance: [
      "Improvise a belt fix: if an alternator or water-pump serpentine belt snaps, route heavy-duty pantyhose, nylon cord, or zip-tie chains tightly across the pulleys as a temporary limp-home fix, driven gently at low RPM.",
      "Handle a small radiator leak: let the cooling system cool completely, remove the radiator cap, and add ground black pepper or raw egg white — it circulates to the puncture and seals it under heat. Carry commercial stop-leak putty for a bigger hole.",
      "Plug a tread puncture as a stopgap: never repair a sidewall puncture. Ream the hole clean, thread a vulcanizing rubber repair string through the needle eye, coat it with rubber cement, push it into the puncture until about 1/2 inch sticks out, then pull the needle straight out without twisting.",
      "Watch fluid priorities: keep an eye on engine oil, transmission fluid, and brake fluid — a dry radiator can seize the engine within minutes, and low brake fluid risks sudden total pedal loss.",
    ],
  },
  "Gravity-fed water filtration systems (drip-bucket construction)": {
    sources: ["CDC, Emergency Disinfection of Drinking Water","World Health Organization (WHO)"],
    guidance: [
      "Build the two-bucket nesting design: stack two food-grade 5-gallon buckets, and drill holes through the bottom of the upper bucket and the lid of the lower one to mount standard ceramic or hollow-fiber gravity filter elements (like Berkey or Sawyer gravity elements), sealed with rubber washers.",
      "Pre-filter first: pour cloudy raw water through a clean cotton bandana, coffee filter, or fine cloth over the upper bucket to catch sediment, sand, and algae before it reaches the filter elements, so they don't clog early.",
      "Know the flow rate and what it removes: a clean system passes roughly 1 to 2 gallons an hour. Sub-micron ceramic elements trap protozoa (Giardia, Cryptosporidium) and bacteria (E. coli, Salmonella); an added activated-carbon core cuts heavy metals, pesticide runoff, and bad tastes.",
      "Clean it right: when the flow slows a lot, remove the ceramic candles and gently scrub the outer surface with a non-metallic pad under clean running water to remove the silt cake — never use soap or detergent on filter ceramics.",
    ],
  },
  "Field water distillation (solar still evaporation trench)": {
    sources: ["U.S. Army Survival Manual (FM 21-76 / ATP 3-50.21), Water Procurement"],
    guidance: [
      "Dig the pit: roughly 3 feet wide and 2 feet deep, in direct sunlight, with a clean collection cup standing upright in the exact center of the floor.",
      "Charge it with moisture: pack the pit around the cup with freshly broken green leaves or non-toxic succulent foliage, or pour dirty or brackish water into the surrounding dirt — just keep the cup itself dry and free of splatter.",
      "Form the condensation cone: drape clear plastic sheeting loosely over the top of the hole and seal the whole perimeter airtight with dirt. Place a small smooth stone in the center of the plastic, directly over the cup, to pull it into an inverted cone at roughly 45 degrees.",
      "Know the real output: expect about 0.5 to 1 quart of clean water per full day of direct sun — treat this as emergency backup, not your primary water source.",
    ],
  },
  "Emergency food preservation: sun drying and jerky curing": {
    sources: ["USDA Food Safety and Inspection Service (FSIS), Jerky and Food Safety","National Center for Home Food Preservation (NCHFP)"],
    guidance: [
      "Choose lean meat and trim it well: cut away every visible bit of fat from beef or venison before processing — fat holds water and oil that turns rancid fast and ruins the jerky even after drying.",
      "Slice and salt-cure: slice the meat into strips no thicker than 1/4 inch, along or across the grain. Cure with coarse, non-iodized salt (1 to 2 tablespoons per pound) plus black pepper or vinegar to lower water activity and hold back surface bacteria.",
      "Hit a safe temperature before drying: the USDA recommends steaming or boiling meat strips to 160°F internal (poultry to 165°F) before dehydrating — dehydrators and smoke pits usually run 145-155°F, which dries meat without reliably killing bacteria in it while raw.",
      "Sun-dry fruit and vegetables separately: lay sliced apples, peaches, or tomatoes on clean stainless or food-grade plastic mesh screens off the ground, covered with cheesecloth or mosquito netting against flies. Only dry on consecutive sunny days with humidity under 60% and temperatures above 85°F.",
    ],
  },
  "Pest exclusion for emergency grain and seed caches": {
    sources: ["Utah State University Extension, Storing Grains","Penn State Extension, Pantry Pests Management"],
    guidance: [
      "Use food-grade diatomaceous earth: mix in roughly 1 to 2 cups per 50 pounds of stored dry grain, beans, or seed. The microscopic fossilized diatoms cut into the waxy shells of beetles, weevils, and ants and dehydrate them, with no toxic chemical residue in the food.",
      "Add bay leaves or dried chili as a deterrent: layer whole dry bay leaves or dried chili peppers through grain containers — their natural oils repel pantry moths and grain weevils for short-to-medium storage.",
      "Freeze raw grain before long-term storage: freeze it at 0°F for at least 4 to 7 days before packing it away long-term — that kills any insect eggs or dormant larvae already inside the kernels.",
    ],
  },
  "Wilderness signaling and search-and-rescue marking": {
    sources: ["National Association for Search and Rescue (NASAR)","U.S. Air Force Search and Rescue Manual (AFMAN 10-503)"],
    guidance: [
      "Follow the rule of three: three of any signal — three whistle blasts, three gunshots five seconds apart, or three fires in a triangle or straight line — is universally recognized by search-and-rescue as a distress call.",
      "Use a signal mirror correctly: hold it near your face, extend your other hand to frame the search plane or ridge in a \"V\" between your fingers, then tilt the mirror until the reflection flashes between them. A mirror flash can be seen up to 20 miles away on a clear day.",
      "Build ground-to-air markers: make letters at least 10 feet tall and 3 feet wide from rocks, logs, or trampled earth on a beach, snowfield, or clearing — a large \"V\" means you need assistance, an \"X\" means you need medical help.",
      "Control your smoke color: heap green leafy branches, damp moss, or wet grass on hot coals for dense white smoke against a clear sky, or burn dry pine resin or small scraps of rubber for dark smoke against gray or snowy backgrounds.",
      "From a fixed spot like your home: a car horn or air horn works as a loud acoustic signal the same way a whistle does — three blasts, pause, listen, repeat. For a visual marker searchers can spot from a road or the air, a large piece of brightly colored cloth or a painted mark on your roof works even when you can't build a ground signal.",
    ],
  },
  "Off-grid hygiene and field sanitation": {
    sources: ["World Health Organization (WHO), Hygiene Promotion in Emergencies","Sphere Handbook Standards"],
    guidance: [
      "Make field soap from potash and fat: leach clean hardwood ash with soft rainwater to pull out potassium hydroxide (potash lye). Boil rendered animal tallow or lard in a metal pot, slowly stir in the filtered ash water, and simmer until it thickens into a soft, paste-like soap for washing.",
      "Use wood ash as an emergency scouring agent: cold, sifted white wood ash mixed with a little water is a mildly abrasive, alkaline cleaner that cuts grease off cookware when there's no soap — rinse thoroughly with boiled water after.",
      "Clean teeth without toothpaste: chew the end of a non-toxic green twig (birch, oak, or willow) into a frayed brush to scrub plaque off mechanically, then rinse with a weak salt-water solution to cut down bacteria.",
      "Manage menstrual hygiene off-grid: use boiled, sun-bleached cotton rags or a reusable silicone cup. Boil the cup 5 to 10 minutes between cycles, and wash cloth pads in soapy water then dry fully in direct sunlight, which adds some UV sanitization.",
    ],
  },
  "Long-term food storage defense (pests, mylar, oxygen absorbers)": {
    sources: ["Utah State University Extension, Food Storage Essentials","USDA National Institute of Food and Agriculture"],
    guidance: [
      "Use oxygen absorbers only on dry, low-moisture food: white rice, dried pinto beans, rolled oats, and wheat berries (under 10% moisture) go in 5-to-7-mil food-grade Mylar bags with a 300-500cc iron-based oxygen absorber per gallon bag (2,000cc for a 5-gallon bucket) — the iron oxidizes and strips oxygen below 0.01%, suffocating insect larvae, weevils, and mold spores.",
      "Never use oxygen absorbers on moist food: brown rice, nuts, dried meat, brown sugar, or vegetables that aren't bone-dry should not be packed with oxygen absorbers — removing the oxygen from moist food creates ideal conditions for Clostridium botulinum, the bacteria that causes botulism.",
      "Heat-seal the Mylar properly: seal the open top with a commercial heat sealer, or a clothing iron on its highest cotton/linen setting pressed over a solid board, leaving a 2-inch gap to drop the oxygen absorber in before the final continuous seal.",
      "Add rodent-proof secondary containment: Mylar alone won't stop a rodent from chewing through. Store sealed Mylar pouches inside rigid, food-grade 5-gallon HDPE buckets or metal drums with airtight, gasketed lids.",
      "How to tell if your seal actually worked: within 12-24 hours, the bag should pull in tight against the food, almost like a vacuum-sealed brick (a little headspace is normal — the oxygen absorber only removes oxygen, not the nitrogen that makes up most of the air). If the bag still looks loose and slack after a day, the seal has a leak somewhere and needs to be redone.",
    ],
  },
  "Well-water pump manual operation (deep and shallow wells)": {
    sources: ["EPA, Private Drinking Water Wells","Water Systems Council Technical Guidelines"],
    guidance: [
      "Know the shallow-vs-deep line: atmospheric pressure limits a suction (pitcher) pump to about 22-25 feet of practical depth. If your water level sits deeper than that, surface suction won't work at all — you need a positive-displacement cylinder pump installed down inside the casing.",
      "Set up a pitcher pump for a shallow well: mount a cast-iron hand pump to a rigid PVC or galvanized suction pipe run into the shallow water table, and prime it by pouring clean water down the top throat to seal the internal leather cup before working the handle.",
      "Add an auxiliary deep-well hand pump: install a secondary drop pipe alongside an existing electric submersible pump inside a standard 4 or 6-inch casing. A deep manual pump runs a rod down to a submerged cylinder and lifts water from 200-300 feet with mechanical handle leverage.",
      "Protect the wellhead from contamination: make sure the casing extends at least 12 inches above the worst expected flood level and is sealed with a screened sanitary well cap, so floodwater, insects, and rodents can't get into the aquifer.",
    ],
  },
  "Emergency blacksmithing and tool forging": {
    sources: ["U.S. Army Technical Manual (TM 9-237), Operator's Manual for Welding and Blacksmithing"],
    guidance: [
      "Build an improvised forge: dig a shallow trench, or line a metal wheel rim or brake drum with wood ash and clay to hold the heat. Connect an iron pipe (tuyere) at the base to a hand bellows, hair dryer, or bicycle pump to force air into the firebed.",
      "Manage fuel and heat: burn clean, dense hardwood charcoal. Forced air through charcoal easily reaches the 1,600-2,000°F glowing orange-to-yellow heat needed to hammer and shape carbon steel.",
      "Improvise an anvil: a heavy section of railroad track, a large sledgehammer head bedded into a hardwood stump, or a flat unweathered granite boulder all work as a base.",
      "Harden and temper basic tool steel: heat high-carbon steel (leaf springs, coil springs, old files) until cherry red and no longer magnetic, then quench immediately in warm oil to harden it. Sand it clean, gently reheat until it shows a straw-to-bronze oxide color (temper), and air-cool to avoid brittle shattering.",
      "Build a proper bellows for continuous airflow: a wooden box or accordion with two flexible leather or canvas chambers and flap valves (a leather flap weighted with a small block over each intake hole) gives a steady, non-pulsing blast instead of the surges from a hand pump. Run heavy iron pipe — never aluminum, copper, or plastic, which melt — from the bellows into the base of the fire, and add a foot-pedal treadle with a counterweight so both hands stay free for tongs and hammer.",
    ],
  },
  "Emergency lime and quicklime production": {
    sources: ["Practical Action Technical Brief, Small-Scale Lime Burning","National Lime Association"],
    guidance: [
      "Choose the right feedstock: limestone rock, marble chips, or clean oyster, mussel, or clam shells, scrubbed free of any organic meat debris before burning.",
      "Fire the kiln (calcination): stack the limestone or shells with hardwood fuel in a crisscross pattern inside an insulated clay or stone kiln pit, and hold at least 1,650°F for several hours to drive off carbon dioxide and convert calcium carbonate into quicklime.",
      "Respect quicklime's hazards: it reacts violently with water, producing intense heat and caustic alkali steam. Always wear eye protection, heavy gloves, and long sleeves — it causes severe chemical burns to skin and eyes.",
      "Slake it into usable mortar: carefully add water to cooled quicklime chunks in a metal trough. It will hiss and crumble into a smooth paste (slaked lime). Mix 1 part slaked lime with 3 parts clean sharp sand for durable masonry mortar.",
    ],
  },
  "Field brick and adobe making": {
    sources: ["Peace Corps, Appropriate Technology for Construction: Adobe and Rammed Earth","New Mexico Building Code (Adobe Standards)"],
    guidance: [
      "Test your soil first: shake local subsoil with water in a clean glass jar and let it settle into layers. Good adobe runs roughly 60-70% coarse sand and 15-30% clay/silt — too much clay cracks on drying, too much sand crumbles.",
      "Add a fiber binder: trample wet subsoil with chopped dry straw, hay, pine needles, or dry grass (1-2 inches long) in a shallow pit until it's a stiff, dough-like mix. The fiber adds tensile strength and cuts shrinkage cracking.",
      "Mold the bricks: pack the stiff mud firmly into bottomless wooden forms (commonly 4x10x14 inches), scrape off the excess with a straight board, and lift the form right away while the brick holds its shape.",
      "Cure in stages: cure fresh bricks flat under partial shade for 3-4 days, then stand them on edge for 2-4 weeks to air-cure fully before building with them.",
    ],
  },
  "Emergency wood ash lye (potash) extraction": {
    sources: ["Traditional Pioneer Chemical Manuals","University Agricultural Extension Bulletins"],
    guidance: [
      "Pick the right ash: use only dry, gray-white ash from fully burned hardwood (oak, hickory, ash, beech). Skip softwoods like pine or fir (too low in potassium carbonate, too resinous), and never use paper or briquette ash with synthetic binders.",
      "Set up an extraction barrel: drill drain holes in the bottom of a food-grade 5-gallon bucket or unpainted wooden barrel, and line the base with clean gravel topped by 2 inches of clean straw or cloth as a sediment filter.",
      "Leach it: pack the barrel with sifted ash and slowly pour soft water (rainwater, not hard well water) over the top until it trickles out the bottom into a catch vessel. Re-pour the liquid back through the ashes several times to concentrate it.",
      "Check strength with the egg-float test: the lye is strong enough for soap or hominy when a fresh egg floats with about a quarter-sized area above the surface. If it sinks, gently boil the liquid down in a stainless-steel or cast-iron pot (never aluminum) to concentrate it further.",
    ],
  },
  "Corn nixtamalization (hominy and masa from wood ash)": {
    sources: ["FAO, Maize in Human Nutrition (Food and Nutrition Series No. 25)","Native American ethnobotanical traditions"],
    guidance: [
      "Understand why it matters: field corn holds bound niacin and proteins the body can't absorb directly. Soaking it in a hot alkaline solution (slaked lime or filtered wood-ash lye) dissolves the tough outer hull, unlocks usable niacin (preventing pellagra), and improves the amino acid balance.",
      "Cook it: combine 2 quarts of dry whole-kernel field corn, 4 quarts water, and 2 tablespoons food-grade slaked lime (or 2 cups filtered wood-ash lye water). Simmer gently 30-45 minutes until the kernels soften and the skins loosen.",
      "Let it steep overnight: take it off the heat, cover, and let it sit in the cooling alkaline liquid for 8-12 hours so the alkali fully penetrates the starch.",
      "Rinse and de-hull: drain and rinse vigorously under running water, rubbing the kernels together to remove the loosened hulls and black tips. Rinse until the water runs clear — you're left with hominy, ready to boil whole or grind into masa.",
    ],
  },
  "Emergency pit-smoking and meat preservation": {
    sources: ["USDA Food Safety and Inspection Service (FSIS), Smoking and Food Safety","U.S. Forest Service Wilderness Operations"],
    guidance: [
      "Dig the two-pit system: a firepit about 2 feet deep and wide on the windward side, and a second, deeper smoking trench 6-8 feet away on higher ground, connected by a shallow covered trench or buried pipe so smoke arrives cool.",
      "Control the smoke and heat: build a small hardwood coal bed, then smother direct flame with damp, barkless hardwood chunks to make thick, cool smoke. Hold the chamber between 110-140°F — a hot fire cooks and melts fat before the moisture evaporates.",
      "Hang the meat: suspend thin, salt-cured strips on sharpened green (non-toxic) sticks across the top of the chamber, and cover the pit with damp burlap or a tarp to hold the smoke in while letting moisture escape.",
      "Smoke long enough: 24-48 hours of continuous smoking drives out internal moisture and deposits antimicrobial wood-smoke compounds on the surface, protecting the meat for months in dry storage.",
    ],
  },
  "Primitive archery and simple bow fabrication": {
    sources: ["Society of Primitive Technology Technical Bulletins","Traditional Bowyer's Bible"],
    guidance: [
      "Choose your stave: a straight, knot-free sapling or split limb about as tall as you are and 2-3 inches thick, from dense springy hardwood — hickory, osage orange, ash, black locust, or white oak. Skip deadwood, which snaps under tension.",
      "Protect the back of the bow: the side facing away from you when you draw (the \"back\") is under pure tension. Never cut across its growth ring — remove wood only from the belly (facing you) and the sides.",
      "Tiller the stave gradually: rest the bottom tip on your shoe, hold the handle, and press the top limb to check its flex. Pare wood from stiff spots on the belly until both limbs bend into an even arc with no weak hinges.",
      "String it: cut shallow diagonal nocks into the tips at 45 degrees, and braid a string from paracord strands, artificial sinew, or twisted plant cordage, sized for roughly a 6-inch brace height between string and handle.",
    ],
  },
  "Improvised cordage (plant fibers and reverse-wrap)": {
    sources: ["U.S. Army Survival Manual (FM 21-76 / ATP 3-50.21), Rope and Cordage Procurement","Society of Primitive Technology"],
    guidance: [
      "Harvest the right fiber: fibrous inner bark (basswood, cedar, willow), stalks of mature herbaceous plants (dogbane, nettle, milkweed), or tough leaves (yucca, agave). Scrape away the brittle outer bark until long, flexible fiber remains.",
      "Learn the reverse-wrap: fold a fiber bundle unevenly so the strands stagger, grip the bend between thumb and forefinger, twist each strand tightly clockwise, then roll them counter-clockwise over each other. That locks the twist in and stops the cord unraveling.",
      "Splice in new fiber as you go: never let both strands run out at the same spot — when one thins to about 2 inches, lay a new bundle's butt end alongside it, twist them together, and keep going.",
      "Test before you trust it: plant cordage tightens slightly as it cures. Test breaking strength with dead-weight before using it for shelter guylines, snares, or a bow-drill string.",
    ],
  },
  "Emergency candle and lamp making (animal tallow and plant oils)": {
    sources: ["Traditional Homesteading Technical Manuals","Penn State Extension, Home Fuel and Light Fabrication"],
    guidance: [
      "Render tallow for solid candles: chop raw animal fat into small cubes, simmer on low with a splash of water until the fat clears and cracklings float, then strain through cheesecloth. Cool and pour around a centered wick in a hollow tube — tallow sets into a hard, smokeless fuel.",
      "Build a liquid oil lamp: pour a non-mineral vegetable oil (olive, canola, sunflower, or melted lard) into a small heat-safe bowl or can. Anchor a natural wick through bent foil or wire, leaving about 1/4 inch exposed above the oil.",
      "Make a proper wick: tightly braided 100% cotton cord, unbleached linen string, or dried rush pith work well. Never use synthetic line — it melts, smokes toxic fumes, and chokes off the flame.",
      "A floating wick keeps the flame steady: cut a small circle from a tin-can lid (or twist a copper-wire spiral) as a float, thread the wick through its center with only 1/8 to 1/4 inch exposed above it — much longer and it smokes heavily — and let it float on 1-2 inches of oil in a wide-mouth jar. Let the wick soak a couple of minutes before lighting.",
    ],
  },
  "Off-grid meat curing (dry salt and brine preservation)": {
    sources: ["USDA Food Safety and Inspection Service (FSIS), Principles of Meat Preservation","University of Georgia NCHFP"],
    guidance: [
      "Hit the 3% salt threshold: use non-iodized coarse salt at a minimum of 3% of the meat's raw weight — that's what draws out water and drops water activity below the level bacteria need to grow.",
      "Dry-cure: rub kosher or canning salt with cracked black pepper into every crease and joint, then hang the meat in a cold, ventilated space (36-40°F) for roughly 7 days per inch of thickness.",
      "Or use a saturated wet brine: dissolve salt in boiled water until a raw egg floats with a nickel-sized area exposed (about 10-12% salinity). Submerge the meat completely, weighted down so no part touches air.",
      "Watch for bone taint on large cuts: bacteria can grow near bone before surface salt penetrates that deep. Slice large cuts into slabs no thicker than 2 inches, or inject brine along the bone with a meat syringe.",
    ],
  },
  "Charcoal/sand bio-sand water filters (slow-sand column)": {
    sources: ["World Health Organization (WHO) Biosand Filtration Guidelines","Center for Affordable Water and Sanitation Technology (CAWST)"],
    guidance: [
      "Layer it bottom to top: 2 inches of clean coarse gravel around the outlet pipe, 2 inches of fine gravel above that, then 4-6 inches of crushed fresh hardwood charcoal (removes pesticides and odors), and 12-16 inches of fine washed silica sand on top (traps pathogens).",
      "Let the biological layer establish: in a continuous-flow filter, a living biofilm builds on the top half-inch of sand over 1-2 weeks and actively destroys pathogens like Giardia. Keep 2 inches of standing water over the sand to keep it alive.",
      "Control the flow: regulate the outlet to a slow, steady drip — about 1 liter per minute for a 5-gallon bucket. Too much pressure blows channels through the sand and wrecks the filtration.",
      "Always disinfect afterward: sand and charcoal remove protozoa and suspended matter but don't guarantee removing every virus — boil or chemically disinfect the filtered water before drinking it.",
    ],
  },
  "Emergency bone and horn toolmaking": {
    sources: ["Society of Primitive Technology Technical Series","Experimental Archaeology Bulletins"],
    guidance: [
      "Choose dense bone: large leg bones (femurs, tibias) from deer or cattle hold an edge and take impact well — ribs and skulls are too porous and brittle.",
      "Score and snap it: score a deep groove down the bone's length with a sharp flint edge, hacksaw blade, or file, rest it scored-side-down on a stone anvil, and strike the opposite side sharply to split it into straight blanks.",
      "Shape by abrasion: grind blanks into needles, fishhooks, awls, or chisel points against wet coarse sandstone or granite — bone works and polishes easily when wet.",
      "Soften horn with heat: animal horn (keratin) becomes pliable after boiling 20-30 minutes, and can then be flattened between boards under heavy rocks to make waterproof spoons, plates, or powder horns.",
    ],
  },
  "Primitive timber joinery (mortise, tenon, and lap joints)": {
    sources: ["U.S. Forest Service, Historic Log Cabin Construction and Repair","Peace Corps Field Manuals"],
    guidance: [
      "Half-lap for frames: cut away exactly half the thickness of two crossing logs at their intersection so the flat faces seat flush — this stops side-to-side racking and keeps a flat plane for beams and walls.",
      "Mortise and tenon: carve a rectangular peg (tenon) on one log's end and a matching socket (mortise) through the receiving post, then lock it by drilling through both and driving in a tapered hardwood peg.",
      "Saddle-notch round logs for cabin walls: cut a deep semi-circular cup into the underside of the upper log to fit the curve of the log below — cutting the notch on the underside means rain runs off instead of pooling and rotting the joint.",
      "Wedge-lock the pins: split the center of an inserted tenon tip and drive a dry hardwood wedge into the split from outside, spreading the tenon wider than the mortise so the joint can't pull free even as the wood shrinks.",
    ],
  },
  "Emergency mud stucco and wattle-and-daub construction": {
    sources: ["Practical Action Technical Brief, Earth Construction","Traditional Vernacular Architecture Studies"],
    guidance: [
      "Build the wattle frame: drive upright stakes 12-18 inches apart along the wall line, then weave flexible green branches (willow, hazel, grapevine, split bamboo) horizontally through them into a stiff lattice.",
      "Mix the daub: 4 parts subsoil clay, 2 parts coarse sand, 1 part chopped dry straw or grass, and 1 part fresh herbivore dung (it acts as a natural binder). Trample it with water until it holds its shape without slumping.",
      "Press it into the lattice: force the mud into both sides of the woven screen by hand or with a flat trowel, making sure the lattice is fully enclosed with no hollow air pockets.",
      "Cure and seal: let it dry slowly in shade, patching any shrinkage cracks with a thin clay slurry. Once fully cured, coat it with slaked lime wash to shed wind-driven rain and deter insects.",
    ],
  },
  "Emergency hide glue and natural resins": {
    sources: ["Society of Primitive Technology","Traditional Ethnobotanical Toolcraft"],
    guidance: [
      "Make hide glue: simmer rawhide scraps, skin trimmings, tendons, and hooves in water on very low heat for several hours — this breaks down collagen into water-soluble gelatin glue. Strain and simmer the liquid down into a thick syrup, then cool it into dry cakes that keep indefinitely and re-melt with warm water when needed.",
      "Make pine pitch adhesive: harvest raw pine, spruce, or fir sap. Melt it gently over low coals (never a direct flame), skim off bark bits, and stir in finely powdered charcoal and dried dung (1 part filler to 3 parts resin) — the filler stops brittle crystallization and makes a tough, waterproof cement.",
      "Apply pine pitch hot: spread it with a flattened stick. It sets solid within seconds as it cools, and can be reheated and reworked any time.",
    ],
  },
  "Thatch and shingle primitive roofing": {
    sources: ["Peace Corps Manual, Small-Scale Construction Technology","Traditional Architecture Guidelines"],
    guidance: [
      "Keep the pitch steep: at least 45 degrees (a 1:1 slope), so rainwater runs off the surface faster than it can seep into the bundles — a shallower pitch traps water and rots within a season.",
      "Bundle the material: harvest dry mature water reeds, prairie grass, cattails, or palm fronds, and tie them into tight, uniform 6-8 inch bundles with grapevine, bark cordage, or wire.",
      "Lay it from the eaves up: lash the first bundle layer along the lowest roof purlin with the cut ends facing down, then overlap each successive course by at least half to two-thirds of its length as you move toward the ridge.",
      "Cap the ridge: finish the top with an inverted layer of folded turf, a clay cap, or crossed bundles held down by binder poles pinned with wooden crooks so wind can't peel the roof.",
    ],
  },
  "Emergency spring tapping and seep development": {
    sources: ["EPA Emergency Water Supply Systems","Peace Corps Water and Sanitation Manual"],
    guidance: [
      "Find the true discharge point: clear leaves, rotted logs, and mud to see exactly where water emerges from bedrock or gravel — don't dig randomly into an unstable hillside, which can bury or divert the flow.",
      "Dig a sanitary collection basin: excavate down to solid rock or firm clay below the emergence point, and line it with clean washed gravel to filter out fine silt.",
      "Install a collection pipe: set a food-grade PVC pipe, bamboo, or metal conduit horizontally in the gravel bed with the intake covered by stainless mesh, and pack firm clay tightly around the outside of the pipe to keep surface runoff out.",
      "Cap it and divert runoff: seal the spring box with a heavy flat stone or timber lid covered in soil, and dig an uphill diversion ditch to route dirty rainwater away from the collection head.",
    ],
  },
  "Wilderness thermal reflector shelters": {
    sources: ["U.S. Army Survival Manual (FM 21-76), Cold Weather Shelters","Boy Scouts of America Wilderness Manual"],
    guidance: [
      "Build a radiant heat-bank wall: a solid vertical wall of wet green logs, flat rocks, or packed mud, 4-6 feet high, about 6-8 feet in front of an open lean-to. Build the fire between the shelter and the wall so heat bounces back onto your bedding.",
      "Angle the roof to catch the heat: pitch the lean-to roof at 45 degrees sloping away from the fire — the slope catches reflected heat and directs it down onto you while sending smoke up and over.",
      "Get off the ground: never sleep on bare or damp ground. Build a raised bed frame, or lay down at least 12-18 inches of dry pine needles, leaves, or spruce boughs to stop conductive heat loss into the ground.",
      "Dig a long, shallow fire trench: matching your body length rather than a round pit warms you evenly along your whole length instead of concentrating heat on just your chest or feet.",
      "Where you put a shelter matters as much as how you build it. Avoid exposed ridgelines and open areas (too much wind), dry creek beds or washes (can flash flood), and anywhere right next to standing water (colder, damper, more bugs). Look up before you commit to a spot, too — never shelter under dead trees, hanging broken branches, or loose rock that could fall.",
      "Cold air sinks and pools in low valleys and hollows at night, which can make the lowest ground 15-20°F colder than a spot just partway up a slope. Building on a gentle rise rather than the valley floor — or the wind-exposed top — is usually noticeably warmer.",
    ],
  },
  "Emergency fish traps and baskets": {
    sources: ["U.S. Army Survival Manual (FM 21-76 / ATP 3-50.21), Food Procurement: Fishing Techniques"],
    guidance: [
      "Build a funnel trap: weave a willow, reed, or wire cylinder with an inverted cone-shaped funnel entrance pointing inward — fish swim in through the narrow neck to reach bait but can't find their way back out.",
      "Use weirs in moving or tidal water: build a V-shaped stone or stake wall pointing downstream in a creek, or toward shore on a tidal flat, to funnel fish toward a holding pen or basket trap at the point.",
      "Anchor and place it well: weight the trap to the bottom with flat stones lashed inside the frame, tether it to a solid root with dark line, and place it near drop-offs, submerged brush, or cut-banks where fish naturally shelter.",
      "Bait it: crushed freshwater mussels, earthworms, insects, or perforated cans of spoiled meat in a mesh pouch behind the funnel draw fish in.",
    ],
  },
  "Emergency charcoal gasification (wood gas for engines)": {
    sources: ["FEMA, Construction of a Simplified Wood Gas Generator for Fueling Internal Combustion Engines in a Petroleum Emergency","National Academy of Sciences"],
    guidance: [
      "Understand the principle: a wood gasifier partially burns dry biomass or charcoal in an oxygen-starved chamber at 1,400-1,800°F, breaking it down into a flammable synthetic gas (carbon monoxide and hydrogen).",
      "Use charcoal, not raw wood, for engine use: pure hardwood charcoal produces very little tar, while raw wood chips produce heavy tars that quickly foul engine valves and piston rings.",
      "Build a cleanup and cooling train: route the gas through a cyclone separator (drops out fly ash), then an air-cooled radiator pipe (cools the gas so it's denser), then a final filter of wood shavings, dry straw, or dense felt to trap fine soot.",
      "Mix air and gas correctly: feed the cooled, clean gas into the intake manifold ahead of the carburetor, with a ball or gate valve on a secondary air intake to manually balance the roughly 1:1 air-to-gas ratio needed for smooth running.",
    ],
  },
  "Emergency glass cutting and improvised glazing": {
    sources: ["Traditional Glazing Standards","Department of the Interior, Preservation of Historic Wooden Windows"],
    guidance: [
      "Never cut glass dry: dip the carbide scoring wheel in light machine oil, kerosene, or vegetable oil before scoring to lubricate the wheel and keep microscopic chips from dulling the cut.",
      "Score in one continuous pass: hold the cutter perpendicular to the glass and pull it in one smooth stroke edge to edge, listening for a steady \"zipper\" sound. Never re-trace a score line — that shatters the edge.",
      "Snap it cleanly: slide a matchstick, wire, or pencil under the scored line at the sheet's edge, place your palms flat on either side of the score, and press down firmly to fracture it along the line.",
      "Glaze the frame: secure the cut pane in the wooden sash with small headless steel brads tapped flush, then seal the perimeter with linseed-oil-and-whiting putty or pure silicone caulk pressed into a neat 45-degree bevel.",
    ],
  },
  "Natural mortar and cob wall construction": {
    sources: ["International Code Council (ICC) Appendix U, Cob Construction Standards","Peace Corps Appropriate Building Technologies"],
    guidance: [
      "Mix the cob: 1 part subsoil clay, 2-3 parts coarse sharp sand, and 1 part long chopped dry straw. Trample the damp mix on a canvas tarp, using the tarp's corners to roll it into a cohesive, non-sticky loaf.",
      "Build without forms: place cob by hand in thick courses directly on the wall, pressing each softball-sized lump into the previous layer with your thumbs or a wooden stomper to eliminate voids, tapering slightly as you go up.",
      "Pace the courses: lay no more than 12-18 inches of wall height per day, and let each lift dry to leather-hard before adding the next — otherwise the lower courses slump under the fresh weight.",
      "Give it \"good hat and good boots\": a raised stone or concrete stem wall (12-18 inches above grade) stops ground moisture from wicking up, and a roof eave overhanging at least 2 feet shields the mud walls from driving rain.",
    ],
  },
  "Emergency water well disinfection (shock chlorination)": {
    sources: ["EPA, Emergency Disinfection of Private Wells","CDC Drinking Water Protocols"],
    guidance: [
      "Calculate the casing volume first: multiply casing diameter and standing water depth to find the water volume — a 4-inch casing holds about 0.65 gallons per foot, a 6-inch casing about 1.5 gallons per foot.",
      "Use the right bleach concentration: plain, unscented 5-6% household bleach, aiming for 100-200 ppm chlorine — roughly 1 quart of bleach per 50-100 gallons of standing well water.",
      "Circulate it through the whole system: pour the diluted bleach down the casing, then hose water from an outdoor bib back into the well head until you smell chlorine at the hose, washing down the full casing.",
      "Run every tap until you smell chlorine, then let it sit: open every indoor and outdoor faucet until chlorine odor reaches each one, shut them off, and let the water sit in the well and pipes for 12-24 hours before flushing the whole system through an outside hose onto bare ground (never into the septic tank) until the smell is gone.",
    ],
  },
  "Manual hand-drilling for shallow water (sludge and auger methods)": {
    sources: ["Peace Corps, Hand Dug Wells and Manual Drilling","UNICEF Water Engineering Technical Notes"],
    guidance: [
      "Hand-auger in cohesive soil: in clay or loam, an earth auger with threaded pipe extensions can reach 15-25 feet. Turn it clockwise, pull it up every 6-12 inches to clear cuttings, and drop in temporary PVC casing as you go to stop the hole collapsing.",
      "Sludge in sandy riverbeds: sink an open steel pipe by working it up and down rhythmically while keeping water flowing into the hole, using your palm over the top as a one-way check valve on the upstroke to force muddy slurry out.",
      "Set the well screen: once you hit clean, coarse water-bearing sand or gravel, drop in a slotted PVC well point (0.010-inch slots) attached to solid riser pipe all the way to the bottom.",
      "Pack and seal it: pour clean pea gravel around the screen to stabilize it, then fill the top 5 feet with bentonite clay or concrete so contaminated surface runoff can't track down the borehole.",
    ],
  },
  "Emergency grain fermentation (lactic acid preservation and silage)": {
    sources: ["FAO, Silage Making for Small-Scale Farmers","USDA Agricultural Research Service"],
    guidance: [
      "Pack it airtight: pound damp, crushed grain, forage, or chopped root crops tightly into a clean container, forcing out every air pocket — the anaerobic environment lets beneficial Lactobacillus thrive while suppressing mold and rot.",
      "Let the acid build: as the lactic acid bacteria consume the natural starches, they drop the pH below 4.0, which is what halts decay and preserves the feed for months without refrigeration.",
      "Seal out air completely: cover the packed feed with heavy plastic, weight it down with wet sand or stones for continuous compression, and seal with an airtight lid fitted with a simple water-lock vent to let CO2 escape.",
      "Know what spoiled looks like: good silage smells tangy and acidic, like sauerkraut. Discard it immediately if it smells foul or like ammonia, or if you see white or black fuzzy mold.",
    ],
  },
  "Field pottery and clay vessel production (water storage and cooking)": {
    sources: ["Primitive Technology Technical Papers","Smithsonian Institution Traditional Native Ceramics"],
    guidance: [
      "Test your clay: roll a damp lump into a pencil-thick rope and wrap it around your finger. If it bends without cracking, it has enough clay; if it cracks or crumbles, wash out some of the sand first.",
      "Add temper for strength: knead in 15-20% finely crushed river sand, pounded mussel shells, or crushed pre-fired pottery (grog) — temper gives steam an escape path during firing so the vessel doesn't explode.",
      "Build with coils: form a flat base disc, then build the walls with concentric coils of even thickness, blending each seam smooth inside and out with a river stone and wooden paddle to remove air pockets.",
      "Fire it slowly: dry the vessel in shade for at least 2 weeks (any leftover moisture causes steam explosions), pre-warm it by a campfire, then stack it over dry wood in a pit, cover with bark and manure, and burn hot for 2-4 hours until it glows dull orange.",
    ],
  },
  "Emergency field soap fabrication (cold-process lard soap)": {
    sources: ["University Agricultural Extension, Home Soap Making","Practical Action Technical Guidelines"],
    guidance: [
      "Render the fat: simmer raw pork lard or beef tallow on low heat until it clears, strain out the cracklings through cloth, and let it cool to lukewarm (about 100-110°F).",
      "Check your lye strength: use clear, boiled-down hardwood ash lye water concentrated until a raw egg or small potato floats with a nickel-sized patch showing above the surface.",
      "Stir to trace: pour the warm lye slowly into the warm fat in a thin stream, stirring constantly in one direction with a wooden paddle (avoid splashing — lye burns skin) until it thickens to warm-pudding consistency and a drizzled drop leaves a raised trail (\"trace\").",
      "Mold and cure: pour into cloth-lined wooden boxes or cardboard forms, wrap in a blanket to hold the heat for 24 hours while it saponifies, then cut into bars and cure on slats in a dry, ventilated space for 4-6 weeks before use.",
    ],
  },
  "Food dehydration and humidity limits": {
    sources: ["National Center for Home Food Preservation (NCHFP), Drying Foods at Home", "USDA Technical Bulletins"],
    guidance: [
      "Build safe frames and screens: use rectangular frames of non-resinous, untreated wood (poplar, ash, fir) with food-grade nylon mesh, polyester cheesecloth, or stainless screening. Never galvanized hardware cloth, aluminum screening, or fiberglass mesh — they leach zinc, aluminum, or glass fibers into acidic foods.",
      "Stack trays with airflow gaps: separate trays vertically with 3-4 inch wooden corner blocks for uninterrupted cross-ventilation. Heat dries food by carrying away evaporated moisture, and poor airflow causes mold before the food actually dries.",
      "Add a solar chimney to speed it up: enclose the rack in a dark-painted box or black poly film with an intake at the bottom and an exhaust chimney at top — the passive convective draft speeds drying with no electric fan.",
      "Protect from insects and night humidity: cover intake and exhaust openings with fine mosquito netting, and bring racks inside or cover them airtight before sunset so nighttime humidity doesn't rehydrate the food.",
    ],
  },
  "Pet evacuation kit and records": {
    sources: ["FEMA / American Red Cross Pet Disaster Preparedness Guidelines","AVMA Emergency Preparedness"],
    guidance: [
      "Use a proper travel crate: hard-sided, well-ventilated, and big enough for the animal to stand, turn around, and lie down. Write the animal's name, medical needs, and your contact info on it in permanent marker.",
      "Pack a 14-day kit: food and water in spill-proof bowls, a manual can opener, litter or waste bags, a leash, and a muzzle (even a gentle pet may bite when scared or hurt), plus a 30-day supply of any daily medication.",
      "Keep vaccination records with the kit: shelters that co-locate pets under the federal PETS Act require proof of vaccination (rabies and bordetella for dogs especially) and ID (microchip number, collar tag) before they'll take the animal in.",
    ],
  },
  "Emergency-document inventory": {
    sources: ["Ready.gov Emergency Financial First Aid Kit (EFFAK)","National Institute of Standards and Technology (NIST) Data Storage Standards"],
    guidance: [
      "Follow the 3-2-1 rule: keep three copies of every essential document, on two different types of media, with at least one copy stored somewhere else entirely (not in the house).",
      "Set up a simple hardware backup: put digitized copies on two identical encrypted USB drives (or encrypt them yourself with something like BitLocker or VeraCrypt) — one in your go-bag, one in a fireproof safe or a relative's house.",
      "Know what belongs on the list: government IDs, birth and marriage certificates, passports, Social Security cards, property deeds, lease, vehicle title, insurance policy pages (home, auto, life), immunization and medical records, a list of key account numbers, and a few recent photos of family members and pets for identification.",
      "Keep physical backups too: print copies on waterproof paper, or seal them in heavy waterproof document pouches in an indexed binder.",
      "A recent utility bill with your name and address on it is worth including too — some disaster zones restrict re-entry to residents who can prove they actually live there, and a printed bill is a simple way to do that without power or internet.",
    ],
  },
  "Grid-down barter mechanics and resource staging": {
    sources: ["Red Cross International Humanitarian Logistics","Department of Defense Civil Affairs Field Manuals"],
    guidance: [
      "Know gold and silver won't help you at first: in the first phase of a real crisis, precious metals can't be eaten, worn, or used to purify water — they only become useful again once things stabilize and basic needs are already being met some other way.",
      "Stock what actually trades in a crisis: medical and sanitation items (pain relievers, antibiotics, antiseptic, wound dressings, soap, water purification tablets), fuel and maintenance items (small propane canisters, stabilized gasoline, lamp oil, matches, lighters, motor oil, paracord), and food/comfort items (salt, sugar, pepper, coffee or tea, hard liquor — useful both as a trade good and a wound antiseptic — and baking soda).",
      "Keep trading away from home: never do an exchange at your house or your supply cache. Meet somewhere neutral with clear sightlines and an easy way out, and don't go alone.",
      "If you're keeping physical cash on hand, small bills matter more than large ones — $1, $5, $10, and $20 bills are actually usable, since most people won't have change for a $100 bill when card readers are down. Pre-1965 US dimes and quarters (90% silver) are also widely recognized and hard to fake, if you want precious metal in a more practical, tradeable form than bullion.",
      "Bring a second person if you can, and don't go alone: have one person handle the actual conversation and exchange, while the other stays back 15-20 yards, watching the surroundings rather than the trade itself. Only bring out the specific item you're trading — never open a bag or trunk that shows everything else you have, which just signals what else there is to take.",
    ],
  },
  "Fish toxins and harmful algal blooms": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Algae blooms: if water looks like pea soup or spilled green/blue paint, or has a thick scum with a musty smell, stay out of it completely — don't drink it, cook with it, wash in it, or let pets drink it either. These toxins can be fatal within minutes to hours, and normal filtering, boiling, or adding chlorine does not remove them.",
      "Ciguatera (reef fish poisoning): large predatory reef fish like barracuda, grouper, and moray eel can carry a toxin that isn't destroyed by cooking, freezing, or smoking. Watch for stomach upset followed by an odd symptom swap — cold things feel burning hot and hot things feel cold — along with tingling, a slow heartbeat, and low blood pressure. Avoid eating the head, guts, roe, and liver of large reef predators.",
      "Scombroid poisoning: dark-meat fish like tuna, mackerel, and mahi-mahi that weren't kept cold enough can build up a toxin that causes flushing, headache, a peppery taste, hives, and trouble breathing within 10-30 minutes of eating. Cooking does not destroy this toxin either. Treat trouble breathing or a big drop in blood pressure as a medical emergency.",
      "Shellfish poisoning: mussels, clams, and oysters harvested during a \"red tide\" or an unmonitored bloom can concentrate toxins that cause numbness starting in the lips and tongue and can progress to trouble breathing within 2-12 hours. Never harvest filter-feeding shellfish from water under a bloom advisory or closure.",
      "Pufferfish and blue-ringed octopus carry a different toxin with no antidote at all — numbness starting at the lips, spreading to full-body paralysis, while the person stays fully conscious the whole time. This is why pufferfish (fugu) is only ever legal to eat when prepared by a specifically licensed, trained preparer — never eat one caught or bought casually.",
    ],
  },
  "Poison-record log (substance/amount/time/symptoms)": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Keep a simple written log near your first-aid kit so you're not trying to remember details while panicking on the phone with Poison Control (1-800-222-1222).",
      "Who: name, age, rough weight, any health conditions, medications they take regularly, and whether they're pregnant.",
      "What: the exact product name and active ingredients from the label — or just take a photo of the label/container if you're not sure how to read it.",
      "How much: your best guess at the maximum amount that could be missing — count remaining pills, or estimate what's left in a bottle.",
      "How and when: swallowed, on the skin, breathed in, in the eye, or a bite/sting, and roughly what time it happened.",
      "What you're seeing: what symptoms started and when, whether their pupils look unusually large or small, whether their skin looks flushed, pale, or sweaty.",
      "What you already did: what time you rinsed something off, gave water, gave activated charcoal, or did anything else — Poison Control will ask about this.",
    ],
  },
  "Household pipe gravity draining": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Shut off your main water valve first — usually a lever or wheel where the water line enters your house, or at the street meter box.",
      "Turn off power and gas to your water heater before doing anything else. Never drain a water heater while it's still heating — that can damage it or make it dangerous.",
      "Open the highest faucet in the house (hot and cold) to let air into the pipes — this breaks the vacuum so the water can actually drain instead of getting stuck partway.",
      "Open the lowest faucet or spigot in the house (a basement sink or an outside hose bib) and let gravity pull the water down and out.",
      "Disconnect your washing machine's hoses and drain them into a bucket, then run a quick empty cycle for a few seconds to spin any remaining water out of its internal pump.",
      "Flush every toilet, then sponge out any water left in the bowl and bail out the tank. Pour a cup or two of RV/marine antifreeze (the pink, non-toxic propylene glycol kind) into toilet bowls and drain traps so anything left behind doesn't freeze and crack the pipe or porcelain. Never use automotive antifreeze (ethylene glycol) for this — it's poisonous to people and pets.",
      "To drain the water heater itself: connect a garden hose to its drain valve at the bottom, run the hose somewhere it can drain safely, open the valve, and also open the relief valve on top so air can get in and it drains faster.",
    ],
  },
  "Saltwater/brackish desalination limits": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Never drink ocean water, even a little, even if you're desperate — it actually speeds up dehydration instead of helping, because your body has to use more of its own water to get rid of the salt than the seawater gave it.",
      "Basic camping or backpacking filters do not remove salt — they only filter out germs and debris. Salt passes straight through.",
      "A hand-pump desalination unit built specifically for seawater can work, but it's slow — expect roughly one liter per 30-45 minutes of steady pumping. Filter out dirt and sand first with a basic pre-filter, or the fine membrane inside will clog quickly.",
      "Boiling and catching the steam (distillation) is the most reliable low-tech way to turn saltwater into drinkable water — it just costs a lot of fuel, roughly a pound of wood for every pound or so of clean water you get.",
      "Brackish water (river mouths, tidal flats, some coastal wells) is less salty than the ocean but still risky — the saltier it tastes, the more it will dehydrate you instead of helping. When in doubt, distill it or run it through a real desalination filter rather than drinking it straight.",
    ],
  },
  "Food rotation / FIFO principles": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "FIFO means \"first in, first out\" — put new groceries behind or under the older ones, so you naturally grab the oldest stuff first instead of letting it sit in the back until it expires.",
      "Write the date you bought or stored something right on the container with a marker — much faster than digging up a receipt later.",
      "Rough shelf-life guide: opened items and fresh staples, use within a few months. Canned goods — acidic ones like tomatoes or citrus start degrading after 12-18 months, but low-acid canned meat and beans can last several years. Dehydrated food and sealed dry goods, several years. Rice, wheat, and beans sealed properly in Mylar bags with oxygen absorbers, can last decades.",
      "Cooler storage stretches shelf life significantly — keeping dry staples somewhere consistently cool rather than somewhere that gets hot (like a garage in summer) meaningfully extends how long they stay good.",
      "Check your stored food every few months. Look for dented cans (especially on the seams), bulging lids, rust, or a broken seal on Mylar bags — if you find one, use it in regular cooking soon rather than waiting for an emergency to discover it's gone bad.",
    ],
  },
  "Gas or propane odor": {
    sources: ["NFPA 54 (National Fuel Gas Code)","American Gas Association"],
    guidance: [
      "If you smell rotten eggs or sulfur, or hear hissing near a gas appliance, meter, or line, get everyone — people and pets — outside immediately and move well away from the building.",
      "Don't touch anything electrical on your way out — no light switches, no phones, no garage door openers, nothing that could spark. Don't light a match or lighter either. Even a tiny spark can ignite a gas leak.",
      "Once you're safely outside and away from the building, call your gas company or 911 — don't go back inside for any reason, including to shut off the gas yourself.",
      "If your outside gas meter has an easy-to-reach shutoff and you feel safe doing it from outside: look for the rectangular tab on the pipe leading into the meter, and turn it a quarter-turn with a wrench until the tab is crosswise to the pipe — that shuts the gas off.",
      "Once gas has been shut off, never turn it back on yourself. A professional needs to check the lines for leaks and safely relight pilot lights first.",
    ],
  },
  "Cold-water immersion and drowning rescue": {
    sources: ["Wilderness Medical Society","American Heart Association"],
    guidance: [
      "The first minute in cold water (under about 59°F) is its own danger separate from drowning itself: your body gasps involuntarily and breathing goes fast and shallow, which is how a lot of cold-water drownings happen in the first few seconds. The priority is just keeping your face out of the water and controlling your breathing until that passes.",
      "You lose real strength fast: fine hand movements go within 2-3 minutes, and the ability to swim or pull yourself out can fail within 10-15 minutes, regardless of how strong a swimmer someone is. If you fall into cold water, try to self-rescue — climb out, grab onto something that floats — in that first window rather than waiting, because your body may not let you later.",
      "Pull a person out lying flat if you can, rather than upright — hauling someone out vertically right at the moment of rescue can trigger a dangerous drop in their blood pressure.",
      "For someone who nearly drowned, give rescue breaths before starting chest compressions, even though normal CPR usually starts with compressions — with drowning, the person needs air first because the core problem is lack of oxygen, not a heart problem.",
      "Don't try to push water out of someone's lungs with abdominal thrusts (the Heimlich maneuver) — it doesn't work for that and can cause them to vomit and choke instead.",
      "Someone who was rescued and seems fine can still get seriously sick over the next 1-3 days from water that got into their lungs — watch for ongoing cough, chest pain, crackly breathing, or fever, and get medical care if any of that shows up even after the immediate emergency seems over.",
      "If you fall through ice yourself: turn back toward the direction you came from — that's the ice that held your weight a moment ago. Get your forearms flat on the ice shelf, then kick your legs hard behind you in the water until your body comes up nearly horizontal at the surface, and slide your chest up onto the ice rather than trying to pull yourself straight up, which usually just breaks more ice. Once your chest is out, roll your whole body away from the hole like a log instead of standing — spreading your weight out keeps you from breaking through again — and don't stand up until you're sure you've reached solid ice or dry ground.",
    ],
  },
  "Off-grid masonry heater construction (thermal mass heating)": {
    sources: ["Masonry Heater Association of North America","Appropriate Technology Library"],
    guidance: [
      "Unlike a regular wood stove that smolders slowly for hours, a masonry heater works by burning one hot, fast fire (1-2 hours) and then storing that heat in a massive brick or stone core.",
      "Hot exhaust gets routed through a maze of internal brick channels before it reaches the chimney, so the mass around it — often a couple thousand pounds of dense brick or stone — soaks up most of the heat instead of letting it go straight up the flue.",
      "Once the fire burns down and the damper is closed, the heated masonry radiates gentle, steady warmth for 12-24 hours from that one fire — much more even than a wood stove's up-and-down heat.",
      "The firebox and the first section of flue must be built from real firebrick (rated for direct flame contact) set with refractory mortar — never use ordinary red brick or concrete block in the core. Regular brick and block can crack, spall, or even burst from repeated high heat because of trapped moisture inside them.",
    ],
  },
  "Field case-hardening of mild steel (pack carburizing)": {
    sources: ["ASM International","traditional blacksmithing technical manuals"],
    guidance: [
      "Ordinary mild steel — rebar, common nails, generic steel stock — doesn't have enough carbon in it to harden just by heating and quenching in water like tool steel does. Case-hardening adds a hard outer shell to soft steel instead.",
      "Pack the shaped part (a knife edge, chisel, or punch) tightly into a sealed metal container along with a carbon-rich mix — powdered hardwood charcoal works, with a little bone meal or crushed eggshell mixed in to speed up the process. Seal the container well so air can't get in.",
      "Heat the sealed container to a bright cherry-red/orange heat and hold it there for 2-4 hours. Carbon slowly works its way from the charcoal into the outer layer of the hot steel.",
      "Pull the part out of the pack while still hot and quench it immediately in cold water or brine. The outer shell comes out hard enough to hold a sharp edge, while the core underneath stays softer and more shock-resistant, so the tool won't shatter under impact the way something hardened all the way through would.",
    ],
  },
  "Manual well rehabilitation (surging and air-jetting a clogged well)": {
    sources: ["National Ground Water Association","FAO Manual on Drilled Wells"],
    guidance: [
      "If your well's water output drops off suddenly and it's not because the regional water table dropped, the well screen (the slotted section that lets water in) is probably clogged with mineral buildup or fine sand.",
      "A surge block is a simple tool you can lower down the well casing — basically a snug-fitting disc on a rod or cable — and plunge up and down to loosen packed sediment around the screen. The downstroke pushes water out through the screen to break up clogs; the upstroke pulls loose debris up into the casing where it can be removed.",
      "After surging, use a bailer (a pipe with a one-way valve on the bottom) to scoop the loosened sediment out of the bottom of the well, or run compressed air down a pipe to the bottom to blast the sludge up and out.",
      "This is a real project with real equipment, not a five-minute fix — but it's a legitimate way to bring a clogging well back to full output without paying for a full well replacement.",
    ],
  },
  "Hydraulic ram pump construction from hardware-store pipe fittings": {
    sources: ["Practical Action","University of Wisconsin Extension"],
    guidance: [
      "A hydraulic ram pump moves water uphill using only the force of moving water itself — no electricity, fuel, or moving parts beyond two valves — as long as you have a stream or spring with at least a few feet of natural fall to work with.",
      "The basic idea: water flows down a drive pipe and builds up speed, then slams a one-way \"waste\" valve shut. That sudden stop creates a pressure spike (water hammer) that forces a small amount of water through a second one-way valve into a sealed air chamber, which smooths the pulses into a steady stream heading uphill to your storage tank.",
      "Built from standard plumbing fittings: a drive pipe (30-50 feet of rigid pipe from your water source), a tee fitting with a swing check valve mounted to act as the waste valve, a second check valve mounted to act as the delivery valve, and a sealed length of capped pipe mounted upright as the air chamber.",
      "These pumps can lift water several times higher than the vertical drop feeding them, and they run continuously with no power source — the tradeoff is they waste a good deal of the water they process, so they work best where the water source itself isn't scarce.",
    ],
  },
  "High-altitude sickness: AMS, HAPE, and HACE": {
    sources: ["Wilderness Medical Society Clinical Practice Guidelines"],
    guidance: [
      "Altitude sickness (AMS) is common above about 8,000 feet and feels like a bad hangover: throbbing headache, tiredness, nausea, dizziness, trouble sleeping. The fix is simple — stop going higher until it fully clears, rest, drink water, and a mild pain reliever like ibuprofen can help.",
      "High-altitude pulmonary edema (HAPE) means fluid is building up in the lungs, and it can turn fatal within hours. Warning signs: getting winded from very light activity or even at rest, a dry cough that turns wet or pink/frothy, a rattling or bubbling sound in the chest, and bluish lips or fingertips.",
      "High-altitude cerebral edema (HACE) means the brain is swelling, and it can progress to coma quickly. Warning signs: real trouble with coordination (can't walk a straight line heel-to-toe), severe confusion, personality changes, hallucinations.",
      "For HAPE or HACE, the only thing that reliably works is getting to lower elevation immediately — at least 2,000-3,000 feet down if at all possible. Don't wait to see if it improves on its own; both conditions can kill within hours to a day if the person stays high. Keep them warm, avoid exertion, and use supplemental oxygen if you have it, but descent is what actually saves them.",
      "If you're planning a high-altitude trip in advance, ask your doctor whether you should carry prescription altitude-sickness medication — this is a common, sensible precaution for serious mountaineering or high-altitude travel, but it needs to be prescribed and dosed by a doctor who knows your health history, not taken from a general guide.",
    ],
  },
  "Pemmican (traditional long-term meat and fat preservation)": {
    sources: ["Traditional Plains Indigenous foodways","USDA Historical Food Technology Bulletins"],
    guidance: [
      "Pemmican is dried lean meat pounded into powder and mixed with rendered fat, and it's one of the longest-lasting foods you can make at home — properly sealed, it can last decades with no refrigeration, freezing, or chemical preservatives.",
      "The ratio matters: aim for roughly equal parts fat and dried meat powder by weight. Too little fat and the meat powder molds; too much and you get a greasy mess that doesn't hold together.",
      "Use only lean meat — trim off every bit of soft fat, which goes rancid. Venison, elk, or lean beef all work. Slice it very thin and dry it until it's completely brittle and snaps like a cracker, then grind or pound it into a coarse powder.",
      "For the fat, use hard fat from around the kidneys (suet/tallow) rather than soft fat from just under the skin — hard fat stays solid at room temperature and doesn't spoil the way soft fat does. Melt it gently, strain out any solid bits, and pour it warm over the meat powder, mixing until every bit of powder is coated.",
      "Press the mixture firmly into a sealed container — a bag, tin, or vacuum-sealed pouch — pushing out as much air as possible before it cools and hardens. Less trapped air means it keeps longer.",
    ],
  },
  "Gravity-fed water distribution and pipe sizing": {
    sources: ["Peace Corps Technical Brief: Gravity-Fed Water Flow Systems","International Association of Plumbing and Mechanical Officials (IAPMO)"],
    guidance: [
      "A gravity-fed water system turns elevation into pressure with no pump needed: for every foot your storage tank sits above where the water comes out, you get roughly 0.43 PSI of pressure. To get normal household pressure (around 30 PSI) with gravity alone, your tank needs to sit roughly 70 feet higher than your highest faucet — that's a real hill or tower, not just a rooftop tank.",
      "Pipe size matters more than people expect: a long run of narrow pipe (1/2 inch) loses a lot of pressure to friction, especially with several fixtures open at once. For your main line from the tank, use at least 1-inch pipe, and only narrow down to 3/4 inch or 1/2 inch right at the very end, near individual fixtures.",
      "If your pipe run goes up and down over hilly ground, air can get trapped at the high points and stop water from flowing at all, even though everything looks connected correctly. Adding a simple valve at the top of each rise, which you open briefly to bleed out trapped air, solves this — do it once when you first fill the system, and again any time flow mysteriously stops.",
    ],
  },
  "Ammunition and propellant storage safety": {
    sources: ["National Fire Protection Association (NFPA 495)","Sporting Arms and Ammunition Manufacturers' Institute (SAAMI)"],
    guidance: [
      "Stored ammunition doesn't explode like a bomb in a house fire — individual rounds can pop from the heat and send a case fragment flying a short distance, which is still a real hazard, but it's not the dramatic detonation people picture.",
      "Heat and humidity are what actually damage stored ammunition over time, corroding it and degrading the powder inside. Keep it in a sealed, airtight container — a military-surplus ammo can with a rubber gasket works well — somewhere cool and dry, ideally under 75°F with low humidity. A small silica gel packet inside each container helps absorb moisture; replace it yearly.",
      "Never store a large quantity of loose gunpowder inside a sealed, heavy steel safe with no venting. In a fire, a safe like that can't relieve pressure the way a proper ammunition can does, and a full sealed safe can rupture violently instead. If you store bulk powder, use containers actually designed for that purpose, not a repurposed gun safe.",
    ],
  },
  "Lightning shelter": {
    sources: ["NOAA/National Weather Service Lightning Safety Guidelines","CDC"],
    guidance: [
      "The 30/30 rule: if you count 30 seconds or less between seeing lightning and hearing the thunder, the storm is within about 6 miles — get to real shelter right away. Wait a full 30 minutes after the LAST thunder you hear before going back outside.",
      "Real shelter means a fully enclosed building (stay away from corded appliances, plumbing, and metal window frames once inside) or a hard-topped car with the windows rolled up — it's the metal shell around you that protects you, not the tires.",
      "These are NOT real shelter, even though they feel like cover: open-sided pavilions, carports, tents, lean-tos, shallow caves, rock overhangs, or standing under a lone tall tree. All of these still leave you exposed to a strike.",
      "If you're caught outside with nothing better available: get off ridgelines and hilltops immediately, and stay away from open fields, water, and wire fences. As an absolute last resort, squat down low on the balls of your feet with your heels touching, tuck your head down, and cover your ears — don't lie flat. Keeping your heels together gives electricity a path up one leg and down the other instead of through your chest.",
    ],
  },
  "Heat exhaustion and heat stroke": {
    sources: ["American College of Sports Medicine","Wilderness Medical Society"],
    guidance: [
      "Telling them apart matters: heat exhaustion means heavy sweating, cool or clammy skin, nausea, and weakness, but the person is still thinking clearly. Heat stroke means their body temperature has climbed dangerously high, their skin may be hot and dry or still sweaty, and — the key warning sign — they're confused, acting strangely, stumbling, or losing consciousness. Heat stroke can kill.",
      "For heat stroke, cooling them down fast matters more than almost anything else. The best method is getting them into a tub or container of cold water with ice, keeping their head above water, while getting emergency help on the way at the same time.",
      "No tub available: strip off extra clothing, pour or splash cool water over their torso, fan them hard to speed up evaporation, and pack ice packs or cold wet cloths into the armpits, groin, and around the neck — blood vessels run close to the skin in those spots, so cooling there cools the whole body faster.",
      "Never give anything by mouth to someone who is confused, drifting in and out, or vomiting — they can inhale it into their lungs.",
    ],
  },
  "Structure fire escape": {
    sources: ["National Fire Protection Association (NFPA) Standard 101","U.S. Fire Administration (USFA)"],
    guidance: [
      "You likely have about two minutes from when the smoke alarm sounds to get out safely — modern furniture burns much faster and produces thicker, more toxic smoke than it used to. Don't assume you have longer.",
      "Before opening any closed door: touch the back of your hand to the doorknob and the gap between the door and frame. If it's warm or hot, don't open it — fire is on the other side. If it feels cool, brace your body against the door, turn your face away, and open it just an inch or two first. If heat, pressure, or dark smoke rushes in, slam it shut again immediately.",
      "Smoke and superheated air rise, so the breathable air is close to the floor. Get down and crawl on your hands and knees, keeping your head low the whole way out.",
      "Don't stop for belongings, pets, or anything else. Get out, go to your family's outside meeting spot, and stay there — never go back inside.",
      "If you're trapped and can't get out: close every door between you and the fire, and stuff the cracks around them with wet towels or clothing to slow smoke from coming through. Crack a window at the top and bottom for air, and hang something bright or light-colored out of it so firefighters can see where you are. If smoke starts pouring in through the window, close it partway.",
    ],
  },
  "Wildfire smoke clean room": {
    sources: ["EPA Wildfire Smoke: A Guide for Public Health Officials","CDC"],
    guidance: [
      "Pick one interior room with as few windows and exterior doors as possible, ideally without a fireplace or vents to the outside, and big enough for your whole household to stay in for a while.",
      "Seal it up: close the doors and windows tightly, tape over any gaps around window frames, pet doors, and baseboards, and tape plastic sheeting over any vents or windows you're not using. A rolled, damp towel pressed against the bottom of the entry door blocks smoke from creeping in underneath.",
      "If you have central air: switch it to recirculate mode only, and close the outside air intake if there is one. Run a HEPA air purifier sized for the room if you have one — skip anything marketed as an \"ozone generator,\" which makes indoor air worse, not better.",
      "A simple homemade filter: tape a MERV-13 furnace filter securely over the intake side of a box fan, sealing the edges with duct tape so air has to pass through the filter to get pulled in. This can meaningfully clean the air in a sealed room.",
      "Avoid anything that adds more particles to the air in your clean room: candles, gas stoves, smoking, and vacuuming (it kicks settled dust back into the air) all work against you here.",
    ],
  },
  "Fire without a lighter (ferro rod, steel wool, friction)": {
    sources: ["U.S. Army Survival Manual (FM 21-76 / ATP 3-50.21)","Wilderness firecraft safety literature"],
    guidance: [
      "Ferro (ferrocerium) rod: hold the scraper still and firmly right above your tinder bundle, then pull the rod backward through it, rather than striking the scraper down toward the tinder. This keeps your hand from accidentally smashing into and scattering your tinder nest, and keeps the spark shower aimed where you want it instead of bouncing wildly.",
      "Steel wool and a 9V battery: use only the extra-fine grade (labeled #0000 or #000), fluffed into a loose, airy nest. Touch both battery terminals to the steel wool at once — it heats the strands red-hot almost instantly, so have your tinder ready and be ready to blow it gently into flame right away. Steel wool burns extremely hot, so keep the battery's terminals taped over and stored separately from the steel wool until you're ready to use it, and don't do this near anything else flammable.",
      "Friction fire (bow drill): use a softer, non-resinous wood like cedar, basswood, willow, or cottonwood for both pieces. Carve a notch reaching almost to the center of the burned-in depression, and place a dry leaf or piece of bark underneath to catch the hot wood-dust coal without it touching bare, possibly damp ground. Once you have a coal, transfer it into a nest of dry, shredded bark and blow gently and steadily until it catches flame.",
      "All three methods involve real heat and sparks — practice them somewhere you can safely contain a small fire, not for the first time in an actual emergency.",
    ],
  },
  "Improvised skillet-support / cook-fire rig": {
    sources: ["U.S. Forest Service Campfire Safety Guidelines","Boy Scouts of America Fieldcraft Standards"],
    guidance: [
      "Never use rocks pulled from a riverbed, creek, or anywhere they might be wet or porous (river stones, shale, slate) to build a fire ring or cooking stand. Trapped moisture inside them turns to steam when heated and can make them explode violently, throwing sharp fragments. Only use dry, dense stones collected from high, dry ground.",
      "Three-stone stand: set three flat stones of matching height in a triangle around your coals. Three points naturally sit stable on uneven ground — a fourth stone almost always makes it wobble instead.",
      "Keyhole trench: dig a small round pit for your main fire, connected to a narrower trench (about 6-8 inches wide) running off to the side. Rake hot coals into the narrow trench and set your pan or grate directly across its walls — it holds the cooking surface low, flat, and stable while keeping you a little further from the open flame.",
      "Hanging a pot instead: drive a sturdy forked green branch into the ground at an angle over the fire (or set up two forked posts with a bar across them), and notch a green wooden hook to hang your pot's handle from. This is more stable than trying to balance a pot on rocks or wire.",
    ],
  },
  "Emergency biohazard spill cleanup (blood and body fluids)": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Put on waterproof gloves before touching anything — nitrile or doubled-up latex — and eye protection if there's any risk of splashing. Never touch blood, vomit, or wound drainage with bare hands.",
      "Cover the spill with something absorbent first — paper towels, dry sawdust, even cat litter — to soak it up and stop it from spreading further before you clean.",
      "Mix a disinfecting solution: 1 part regular unscented household bleach to 9 parts water (roughly 1.5 cups of bleach per gallon of water). Make it fresh — bleach solution loses strength within about a day.",
      "Flood the area with the bleach solution and let it sit wet on the surface for a full 10 to 20 minutes before wiping it up — that contact time is what actually kills bloodborne germs like hepatitis and HIV, not just the bleach touching the surface briefly.",
      "Scrape up solid waste into a plastic bag, double-bag it, seal it tightly, and throw it away. Wash your hands thoroughly with soap and warm water for at least 30 seconds afterward, even though you wore gloves.",
    ],
  },
  "Neighborhood/community mutual-aid security": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "With phones and internet down, useful information mostly travels by people actually talking to each other nearby — a habit of checking in with neighbors becomes much more valuable than it normally is.",
      "A simple daily check-in point works well: pick one spot (the end of the street, a specific driveway) and a fixed time each day that neighbors informally gather to share what they've each learned, flag anyone who needs help (elderly neighbors, someone low on medication), and keep an eye on each other's property.",
      "This isn't about forming an armed patrol — it's basic mutual awareness: knowing who's still home, who's struggling, and what's actually happening on your street, which is often more accurate than rumors.",
    ],
  },
  "Femur fracture: making a traction splint": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "This is a special exception to the usual \"don't try to realign a fracture\" rule, and it applies specifically to a broken thigh bone (femur) when real medical help is genuinely hours away. The thigh muscles are strong enough that when the bone breaks, muscle spasm pulls the broken ends past each other — extremely painful, and it can tear blood vessels running through the leg. Gently pulling the leg back to length relieves that spasm and can stop deep internal bleeding.",
      "What you need: something long, straight, and strong enough to bear tension — a sturdy branch, a board, or a hiking pole — reaching from the armpit or hip down past the foot by a few inches, plus strips of cloth or cord.",
      "Setting it up: tie the top of the pole securely to the belt or chest so it can't slide down. Wrap a strip of cloth in a figure-eight around the ankle and under the foot, leaving the heel and toes uncovered so you can check they stay warm and pink. Run a loop of cord from that ankle wrap down to a notch cut in the bottom of the pole.",
      "Creating traction: put a short stick through that cord loop and twist it slowly, the way you'd tighten a tourniquet — this gradually pulls the foot down and stretches the leg back out to roughly match the length of the uninjured leg. Once the leg is straight and the muscle spasm eases off, tie the small stick against the main pole so it can't untwist on its own.",
      "Keep checking the foot for warmth, color, and feeling the whole time you're setting this up and afterward — if it goes pale, cold, or numb, something is wrapped too tight and needs to be loosened right away.",
    ],
  },
  "Broken facial bones and airway protection": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Never lay someone with a badly broken jaw or face flat on their back — gravity pulls the broken jaw and tongue backward into the throat, and blood or loose teeth can choke them.",
      "Keep them sitting up and leaning forward instead, so blood, teeth, and saliva drain out and down rather than backward into the airway.",
      "If they're unconscious: roll them onto their side (the recovery position) with their face angled toward the ground, so fluid drains out instead of pooling in the throat or being inhaled.",
      "If they're struggling to breathe: hook your fingers behind the back corners of the jawbone, just below the ears, and pull the whole lower jaw forward. This pulls the tongue off the back of the throat and can open the airway even when the face itself is badly injured.",
    ],
  },
  "Trench foot (feet wet and cold for too long)": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Trench foot comes from wearing cold, soaked socks and boots for half a day or longer, not from freezing temperatures the way frostbite does. Feet turn pale, wrinkled, numb, and dead-feeling at first, then turn red, swollen, and painfully burning once they warm back up.",
      "Get the wet boots and socks off as soon as you can, and pat the skin dry gently with a clean towel — don't rub.",
      "Let the feet warm up gradually at normal room temperature. Never warm them near an open fire, with hot water, or on a heating pad, and never rub or massage them — the skin is fragile at this point and can peel off.",
      "Prop the feet up on a pack or rolled blanket to help bring the swelling down, and once they're dry, put on clean, completely dry wool socks.",
      "Early signs to watch for, before it progresses this far: cold, pale, wrinkled skin on the soles, numbness, and a heavy, wooden feeling in the feet — burning pain usually shows up later, once the feet start rewarming.",
      "Prevent it with sock rotation: change into a dry pair of wool socks at least twice a day and never sleep in wet socks or boots. With no spare dry pair on hand, dry the wet ones inside your sleeping bag against your chest, or tied to the outside of your pack.",
      "Plain talc or zinc oxide powder on clean, dry feet helps keep skin dry and cuts friction between changes.",
      "Wash the feet gently with warm water and mild soap before drying — then the same warming and no-rubbing care above applies as the skin recovers.",
    ],
  },
  "Choking when you're alone (self-rescue)": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Don't try to drink water to push the blockage down — it just adds liquid on top of an already-blocked airway and makes breathing even harder.",
      "Make a fist and place the thumb side against your belly, just above your belly button and below your rib cage. Grab that fist with your other hand and pull sharply inward and upward, into your gut — the same motion as if someone else were giving you abdominal thrusts.",
      "If you can't get enough force that way: find a sturdy chair back, countertop edge, or the arm of a couch. Lean your upper belly right over the hard edge, then drop your body weight down onto it hard. The sudden pressure forces the air left in your lungs up through your throat and can pop the blockage free, the way an abdominal thrust would.",
      "Keep trying — repeated thrusts, alternating methods if needed — until the blockage clears or you're able to get someone's attention to help.",
    ],
  },
  "Impaled object: never pull it out": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "If a knife, nail, stick, or piece of rebar is stuck deep in the body, do not pull it out. It's acting like a cork, physically blocking a hole in a blood vessel — pulling it free can let serious, uncontrollable bleeding start from deep inside, often impossible to stop outside of a hospital.",
      "Leave the object exactly where it is. Build up padding on both sides of it using rolled towels, bulky gauze, or folded clothing, then wrap tape or cloth strips around the padding and the body to hold the object still so it can't shift or wobble while the person is moved.",
      "The one exception: if the object has gone straight through the cheek or jaw and is actively blocking the airway so the person genuinely can't breathe at all, it may need to come out to save their airway. Outside of that specific situation, leave it in place and get emergency help.",
    ],
  },
  "Abdominal evisceration: organs exposed": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "If a wound is bad enough that internal organs are visibly exposed, never try to push them back inside — doing so carries dirt and bacteria into a space that's normally sterile, and can also kink the intestines.",
      "Keep the exposed organs damp — dried-out tissue dies. Cover them with a clean towel, sheet, or gauze that's soaked in clean warm water or saline, and don't let it dry out.",
      "Lay a piece of plastic wrap or a clean plastic bag loosely over the damp covering — this holds in moisture and body heat without pressing on the wound.",
      "Lay the person flat on their back with their knees bent up toward their chest if possible — this takes tension off the abdominal muscles and eases pressure on the area.",
    ],
  },
  "Blunt internal bleeding recognition": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "After a hard fall or a vehicle crash, internal bleeding doesn't always show on the outside. Watch for: bruising spreading across the belly or sides, a belly that becomes hard, swollen, and tense — almost like a wooden board instead of soft — and signs of shock (pale, cold, sweaty skin, a racing pulse, dizziness, extreme thirst, feeling faint).",
      "Keep them lying flat with their legs propped up slightly, and keep them warm with dry blankets — losing body heat makes bleeding and shock worse.",
      "Don't give them anything to eat or drink, even if they ask for it — only dampen their lips with a wet cloth if they're thirsty. Drinking sends blood to the gut instead of vital organs, can trigger vomiting, and complicates surgery if they need an emergency operation later.",
      "This is always a call-for-help-immediately situation — internal bleeding can be life-threatening even with no obvious external wound.",
    ],
  },
  "Cellulitis: red streaks spreading from a wound": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "A cut, scrape, or bite that's spreading angry redness outward, especially with red streaks running up an arm or leg toward the armpit or groin, along with chills or fever, means the infection may be entering the bloodstream — this can turn serious quickly.",
      "Mark the edge of the redness with a pen and write the time next to it. Check again in a couple of hours — if the redness has spread past your line, the infection is progressing and this needs medical care as soon as you can get it, not a wait-and-see approach.",
      "In the meantime: keep the limb elevated and as still as possible, and apply warm, damp compresses. If you have antibiotics specifically kept on hand for exactly this kind of emergency, and know the right one and dose for it, this is the situation they're meant for — this isn't a reason to start any antibiotics you happen to have lying around from an old prescription.",
    ],
  },
  "Severe nosebleeds that won't stop": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Never tilt the head back — that sends blood down the throat instead of out the nose, which can cause vomiting and doesn't actually help the bleeding stop. Sit upright and lean slightly forward instead, letting it drain out the front into a cloth or bowl.",
      "Pinch the soft lower part of the nose — not the hard bony bridge — firmly between your thumb and finger, and hold continuous pressure while breathing through your mouth.",
      "Hold for a full 10 to 15 minutes without letting go to check. Peeking early breaks apart the clot that's trying to form and resets the clock.",
      "Still bleeding after 15 minutes? Blow the nose once, firmly, to clear out any large clots, then try again — this time, if you have it on hand, soak a small piece of gauze or cotton in a nasal decongestant spray before packing it gently into the nostril and pinching again.",
    ],
  },
  "Black widow, brown recluse, and scorpion stings": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Black widow bites cause sharp pain followed within 30-60 minutes by intense cramping that spreads from the bite into the belly, back, and thighs — the stomach can even feel rigid, similar to appendicitis. Wash the bite, apply a cloth-wrapped ice pack for 10 minutes at a time, keep the person calm and resting, and use ibuprofen or acetaminophen for pain. Get medical care, especially for children, older adults, or anyone with heart problems.",
      "Brown recluse bites are usually painless at first. Over the next several hours, a blister forms with a pale ring around it — over the following days, the center can darken, sink in, and the skin around it can die, leaving an open sore. Wash it, keep it elevated, apply a cool compress, and never apply heat — heat speeds up the tissue damage. Watch daily for spreading redness, which would mean a bacterial infection on top of the bite.",
      "Scorpion stings usually cause intense burning pain with little or no visible mark — the skin can become so sensitive that a light touch nearby hurts. Wash the area and apply a cold compress. If you notice muscle twitching, unusual eye movements, heavy drooling, or trouble swallowing, that's a sign of a more serious reaction — keep them positioned on their side so they don't choke, and get medical care right away.",
    ],
  },
  "Evacuation routes: avoiding gridlock": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Major roads can turn into parking lots within just a couple hours of a mandatory evacuation order or widespread panic. If you didn't leave in the first wave, assume the interstate isn't your best option anymore.",
      "Don't rely only on a GPS app during a real crisis — cell towers can fail, and even when they don't, everyone's app tends to reroute them onto the same few alternate roads, creating new jams. Keep a paper map of your area and know a couple of back routes in advance — smaller roads that locals use, not just the highway.",
      "Keep your vehicle ready before you ever need to evacuate: try to keep the gas tank at least half full at all times, since gas station pumps don't work without grid power. A spare tire, a tow strap, and a portable tire inflator are worth keeping in the vehicle too.",
      "If your vehicle gets permanently stuck in gridlock with real danger — fire or floodwater — closing in: don't wait it out. Grab your go-bag, pull the car to the shoulder if you can so emergency vehicles can still get through, lock it, and continue on foot.",
    ],
  },
  "Carbon-monoxide safe tent and snow-cave heating": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Heating any enclosed shelter — a snow cave, a sealed tent, a small tarp lean-to — with an open flame, candle, or fuel stove uses up the oxygen inside and can build deadly, odorless carbon monoxide fast.",
      "Always poke a ventilation hole through the highest point of the roof (a ski pole or stick works), and keep a second air gap clear near the bottom entrance so fresh air can flow in while stale air vents out the top.",
      "Check the top vent every couple of hours if it's actively snowing — drifting snow can seal it shut without you noticing, turning a ventilated shelter into a sealed one.",
      "A single small candle can genuinely warm a snow cave by 10-15°F if the shelter is well-insulated from the ground — but never fall asleep with a candle or stove still burning and unvented.",
    ],
  },
  "Emergency snow cave construction": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Cold air is heavier than warm air and sinks — a snow cave uses this on purpose. Dig an entrance tunnel that slopes downward into the snow, then carve a step up into the sleeping chamber so it sits higher than the entrance.",
      "Carve the sleeping bench itself higher than the top of the entrance hole. Your body heat collects near the higher ceiling around the sleeping area, while the coldest air sinks down and drains out through the lower entrance tunnel instead of pooling around you.",
      "Smooth the ceiling into a rounded dome rather than leaving it rough or pointed — a rough ceiling drips condensation straight down onto your sleeping bag as it warms, while a smooth dome channels that moisture down the curved walls and away from where you're sleeping.",
    ],
  },
  "Meat smoking: hot smoking vs. cold smoking safety": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Bacteria multiply fastest between about 40°F and 140°F — the whole point of safe smoking is getting meat through that range quickly and then keeping it well outside it.",
      "Cold smoking (under about 90-100°F) adds flavor and some surface protection against insects, but it does not cook meat or reliably kill the bacteria inside it. Never cold-smoke wild game unless it's already been properly cured in an exact salt-and-nitrate brine first — cold-smoking uncured meat, especially in warm weather, can create exactly the low-oxygen conditions that let botulism grow.",
      "Hot smoking is the safe method for raw or wild-game meat: keep the smoker between roughly 160-200°F, and make sure the thickest part of the meat reaches at least 165°F all the way through before eating.",
      "Once meat is fully cooked, you can dry thin strips further with continuous low heat and smoke until the moisture is gone and it snaps rather than bends — that's what makes it shelf-stable.",
    ],
  },
  "Testing stored grains for dangerous mold (mycotoxins)": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Wet or poorly dried grain (wheat, rye, corn, barley) can grow molds that produce toxins dangerous enough to cause organ damage or death — cooking does not neutralize them, so the only real defense is catching contaminated grain before you eat it.",
      "Look closely at the kernels: black or purplish horn-shaped growths replacing normal grains (ergot) mean the whole batch should be thrown out. Powdery green, blue-gray, or chalky white dust on the kernels also means active mold.",
      "Do a clumping test: reach deep into a bucket of stored grain with a dry hand. If it feels damp, warm, or sticks together in clumps instead of flowing loosely like dry sand, moisture has gotten in and fungal growth has likely started.",
      "Trust your nose: a sour, musty, damp-basement smell means the grain isn't safe to eat, even after cooking.",
    ],
  },
  "High-wind window hardening (plywood vs. duct tape)": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Skip the duct-tape \"X\" — taping glass doesn't stop it from shattering in hurricane or tornado-force wind, and it actually makes things worse by holding the broken shards together into bigger, more dangerous flying sheets of glass.",
      "Plywood shutters actually work: use exterior-grade plywood at least 5/8 inch thick, cut to overlap the window frame by 4-5 inches on every side, and screw it directly into the house's structural framing — not just the window trim — every 12 inches or so around the border.",
      "If you can't drill into masonry, spring-steel tension clips made for this purpose can wedge plywood panels tightly into a window's exterior recess without any drilling.",
    ],
  },
  "Z-drag rescue rig (3:1 mechanical advantage)": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "A Z-drag lets one or two people move something far too heavy to pull directly — a stuck vehicle, a fallen beam, a loaded rescue litter — using rope and simple friction hitches instead of a winch, at roughly three times your actual pulling strength.",
      "The basic setup: anchor a rope to something solid (a tree, a boulder) behind you, and run it forward to whatever you're moving. Add a friction hitch (a Prusik loop) at the anchor end, clipped back to the anchor — this acts as a one-way brake that lets the rope slide while you pull but locks solid the instant you stop, so the load can't slip backward.",
      "Then add a second friction hitch further down the same rope, closer to the load, with a pulley or smooth carabiner clipped to it. Run a second length of rope from the anchor, through that traveling pulley, and back to where you're pulling from.",
      "Every 3 feet of rope you pull moves the load about 1 foot — but with three times the force, which is what lets one or two people shift something weighing hundreds of pounds.",
    ],
  },
  "Aggressive dog attack defense": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Don't run or scream — running triggers a dog's instinct to chase, and screaming can escalate things further. Stand your ground, turn your body sideways rather than facing it head-on, and avoid staring directly into its eyes, which dogs read as a challenge.",
      "If it charges, give it something else to bite: a backpack, jacket, stick, or bike held between you and the dog gives it something to grab onto besides you.",
      "If you're knocked down: curl into a ball on your knees, tuck your face down, lace your fingers together behind your neck to protect it, and keep your elbows in tight against your ribs.",
      "If a dog has clamped onto you or someone else, don't pull away — that tears skin and muscle. If you're helping someone else, lifting the dog's back legs off the ground (like a wheelbarrow) or looping a belt around its neck and pulling upward can get it to let go faster than trying to pry the jaws apart.",
    ],
  },
  "Caught in an avalanche": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "In the first seconds, try to move to the side of the slide path rather than straight down it, and shed anything heavy — skis, a snowboard, a heavy pack — unless you're wearing a dedicated avalanche airbag.",
      "While you're being carried, fight to stay near the surface — a strong swimming motion with your arms and legs, like a rough breaststroke, helps keep you higher in the moving snow.",
      "As the slide starts to slow down, this is the critical moment: avalanche snow sets almost like concrete the instant it stops, so you can't dig yourself out afterward. Right as it's slowing, punch one hand straight up toward the surface if you can, and cup your other hand over your mouth and nose to carve out a small air pocket before everything locks solid.",
      "Once stopped, don't waste air screaming — snow muffles sound almost completely, so yelling won't be heard and just burns through the limited air you have. Breathe slowly, stay as calm as you can, and wait for rescuers to probe the snow.",
    ],
  },
  "Escaping quicksand, mudflats, and saturated silt": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "You can't fully sink in quicksand — a person is less dense than saturated sand and water, so you'll bottom out around waist or chest level and float rather than go under. The real danger is panicking, thrashing, and exhausting yourself, especially somewhere the tide is coming in.",
      "Don't try to pull a trapped leg straight up — the suction created by wet silt around a submerged limb can take more force than a person can generate.",
      "Instead: lean back slowly to spread your weight flat across the surface, then gently wiggle and rotate your legs in small circles. This lets water seep down around your feet and breaks the suction gradually. Once your legs feel loose, slide and paddle backward along the surface, like swimming on your back, until you reach solid ground.",
    ],
  },
  "Faraday protection for radios and electronics": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "A solar flare or electromagnetic pulse can induce a damaging voltage spike in small electronics — radios, chargers, spare phones — even when they're switched off.",
      "A single metal box often still leaks enough to matter, so layering helps: first wrap the powered-off device in something non-conductive (cardboard, bubble wrap, thick cloth) so the metal shield never directly touches the device itself.",
      "Then wrap that padded bundle tightly in a few complete layers of heavy-duty aluminum foil, folding and crimping the seams closed rather than leaving them loose.",
      "Finally, place the foil-wrapped bundle inside a sealed metal container — a clean galvanized trash can or steel ammo can with a tight lid works well.",
      "To sanity-check your setup: seal an active cell phone inside it and call that phone from another line. If it rings, something's leaking and the seals need improving.",
    ],
  },
  "Reducing glint and visual signature": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Sunlight flashing off a watch face, binoculars, a vehicle mirror, or a metal water bottle creates a bright flash that's visible from a long way off, including from the air — worth thinking about if avoiding attention matters to your situation.",
      "For glass and optics: crossing strips of dull tape over binocular or scope lenses, or stretching dark mesh fabric over them, cuts the reflection while still letting you see through.",
      "For metal gear: roughing up a shiny surface with sand or rock, or giving it a coat of flat, non-reflective paint, kills the glare. Simply turning a watch face toward the inside of your wrist works too.",
    ],
  },
  "Dog or cat choking": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Watch for: pawing frantically at the mouth, drooling, a blue tinge to the tongue or gums, choking sounds, or collapse.",
      "If you can clearly see the object stuck in their mouth: press their lips inward over their teeth with one hand — so if they bite down, they bite their own lip instead of your fingers — and sweep the object out with a finger or needle-nose pliers if you can see it clearly. Don't poke blindly down the throat, which can push the object deeper instead of out.",
      "For a small dog or cat: hold them with their back against your chest, make a fist in the soft area just below their ribs, and push upward and inward firmly, 4 or 5 times in a row.",
      "For a large dog: stand behind them on all fours, wrap your arms around their belly, make a fist right behind the ribcage, and pull upward and forward toward their spine.",
      "If they're lying on their side: support their ribs with one hand and press the other hand firmly upward and forward into the soft belly area just behind the ribs.",
    ],
  },
  "Livestock bloat: recognizing it and what you can safely do": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Bloat happens when cattle, sheep, or goats eat too much wet clover, lush spring grass, or grain, and gas gets trapped in their first stomach. The left side of their belly (between the last rib and the hip) swells tight, and the pressure can crush their lungs. Watch for a hard, swollen left flank, groaning, a wide-legged stance, and labored breathing — this can kill an animal within an hour if it's not relieved.",
      "This is genuinely an emergency-vet-now situation. If you keep livestock, it's worth asking your vet in advance to show you how to pass a stomach tube safely before you ever need it in a crisis — that's a hands-on skill to learn from them, not something to attempt for the first time from a description.",
      "If you already know how to pass a stomach tube: a hiss and the smell of fermented gas venting means it's working. If instead you get thick foam and no gas escapes (frothy bloat), a few ounces of vegetable or mineral oil poured down the tube can help break up the foam so gas can vent.",
      "If the animal collapses and is struggling to breathe despite this, that's beyond home first aid — get an emergency vet on the phone immediately, since the next step from there is an invasive one that a vet needs to guide or perform.",
    ],
  },
  "Chlorine gas from mixing bleach with other cleaners": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Mixing bleach with ammonia, vinegar, or many toilet-bowl and drain cleaners creates toxic chlorine or chloramine gas — this can happen by accident when different cleaning products are used one after another without rinsing in between.",
      "Signs of exposure: sudden violent coughing, burning eyes, a choking feeling, and tightness in the chest.",
      "Get out into fresh air immediately, and go up rather than down — chlorine gas is heavier than air and sinks into basements and low areas.",
      "Don't try to neutralize the spill with another cleaner — that can make it worse. Open windows and doors from outside if you can, and let the area air out for several hours before going back in.",
      "If you were exposed: strip off contaminated clothing outside, and rinse your eyes and skin with clean water for a full 15 minutes.",
    ],
  },
  "Active chimney or flue fire": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Warning signs it's an actual chimney fire, not just a normal fire: a loud roaring sound from the chimney (often described as a jet engine or freight train), dense sparks shooting from the chimney cap outside, or the stovepipe glowing visibly red.",
      "Cut off the fire's air supply first: close the stove's loading door and shut every air damper and draft control completely. Starving it of oxygen is the fastest way to slow it down.",
      "Smother the fire in the firebox with a generous layer of baking soda or dry wood ash — never throw water into a hot wood or iron stove, since the sudden temperature change can crack or shatter the metal.",
      "If you can safely get outside, hose down the roof around the chimney (or pile snow on it) to keep sparks from catching the roof on fire, and call the fire department even if the fire in the stove seems to be dying down — chimney fires can smolder inside the flue and reignite.",
    ],
  },
  "Emergency tooth extraction (true last resort only)": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "This is genuinely a last resort — only for a tooth that's severely infected, causing a high fever or spreading facial swelling, with zero realistic chance of reaching a dentist. Pulling a healthy or repairable tooth causes real, permanent damage, so this isn't a first response to ordinary tooth pain.",
      "Don't try to pull it straight out with pliers — teeth are held in the jawbone by small fibers all the way around the root, and pulling straight out usually just snaps the tooth off and leaves an infected root buried in the bone, which is worse than where you started.",
      "The tooth has to be loosened first: with a clean, boiled flat tool (a small screwdriver tip or a dedicated dental tool), work gently down along the gumline between the tooth and the bone, working it back and forth to stretch and tear those small fibers loose. This takes patience — rushing it is how teeth break.",
      "Once it's genuinely loose and wiggling on its own, grip it low near the gumline with clean pliers. For a front tooth, twist gently side to side. For a back tooth, rock it slowly toward the cheek and then the tongue side in a figure-eight motion rather than pulling straight up, until it lifts free.",
      "Afterward, control the bleeding: a slightly damp black tea bag pressed firmly into the empty socket, with the person biting down steadily for 45-60 minutes, works better than plain gauze.",
      "Even after this, see a real dentist or doctor as soon as you possibly can — a field extraction like this can leave bone fragments or an incomplete removal that needs proper follow-up care.",
    ],
  },
  "Lost in the woods: what to do first": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "The moment you realize you're lost, stop walking. Moving further while panicked is how a small problem turns into a much bigger one — most people who keep wandering end up farther from any trail, not closer.",
      "Follow STOP: Stop, Think, Observe, Plan. Sit down if you can. Think back to the last point you knew where you were. Look around for landmarks, trail markers, running water, or high ground you recognize. Only then decide on a plan — and the plan is usually to stay put, not to keep moving.",
      "In most cases, staying where you are is safer than trying to self-rescue. You're far easier to find standing still in one place than wandering to a new spot every hour, and most search efforts start from your last known location.",
      "Make yourself easy to find: get to a clearing or high ground if it's close and safe to reach, and use the same rule-of-three signaling that works for any rescue situation — three whistle blasts, three fires, or three of anything, paused and repeated (see Wilderness signaling and search-and-rescue marking for the full technique).",
      "The exceptions where moving on foot makes sense: you're in immediate danger where you are (flooding, wildfire, unstable ground), it's getting dark and you have a specific, sure destination close by, or you have a documented, reliable trail to follow out. If none of those apply, staying put and signaling is almost always the better bet.",
      "Before you ever head out: tell someone your planned route and when you expect to be back. That single step is what actually gets search-and-rescue looking in the right place — nothing else here works as well without it.",
      "If you do decide you have to walk out: people naturally curve in a slow circle when walking through woods with nothing to aim at, since one leg is always slightly stronger than the other. To walk a straight line instead, pick a tree directly ahead of you, walk to it, then from there sight a new tree in line with your direction of travel, and repeat — this keeps correcting your path back to straight.",
      "Without a compass, walking downhill is a reasonable way to eventually find people: small trickles of water lead to creeks, creeks lead to streams, and streams lead to rivers — and roads, bridges, and towns are almost always built along river valleys.",
    ],
  },
  "Lost in an unfamiliar city on foot": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Walking with a blank stare, constantly turning around, or staring at a dead phone marks you as an easy target if the area isn't safe. Walk with a steady pace and upright posture even while you're figuring out where you are.",
      "Look up for reference points instead of down: broadcast towers, highway overpasses, clusters of tall buildings, or stadium lights all work as fixed landmarks that keep you from circling the same few blocks without realizing it.",
      "Infrastructure tends to run in straight lines toward the center of things: following railroad tracks, elevated transit lines, or major power transmission towers usually leads you either into or out of a city, not in circles.",
      "Avoid narrow alleys, dead ends, and recessed doorways that only have one way out. If it's getting dark, head toward places more likely to still be staffed and lit — a hospital, a fire station, an active transit hub — rather than a dark commercial block.",
    ],
  },
  "Lost while driving in a city": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "If navigation drops out in the middle of a complex interchange, don't stop in a live traffic lane — pull into a well-lit parking lot, gas station, or the shoulder to figure out where you are.",
      "Traffic flow itself is a clue: heavy traffic moving toward the center of a city in the morning and back out in the evening is a normal commute pattern you can use to guess which direction is \"in\" versus \"out.\"",
      "Wide multi-lane avenues with large overhead signs tend to connect to highways or beltways eventually — following one consistently is more likely to get you somewhere than winding through side streets.",
      "If you're stuck in a maze of one-way streets, turning the same direction three times in a row brings you back toward your starting cross-street instead of getting more lost by guessing against the arrows.",
      "At a dead stop in traffic, leave enough space to see the rear tires of the car ahead touching the ground — that gap gives you room to steer out if you ever need to.",
    ],
  },
  "Lost on rural backroads while driving": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Unmarked dirt and gravel roads burn fuel fast and risk a flat tire, a high-centered car, or sliding into a ditch — if you're already unsure where you are, that's not the time to keep exploring rougher roads hoping they connect somewhere.",
      "Road quality is a real clue: two-track dirt usually leads to a private driveway or a dead end, gravel usually leads to paved road, and paved county roads lead to state highways. If the road is getting worse instead of better, turn around rather than pushing forward hoping it loops back around.",
      "Power lines can point you toward town: follow them toward where the poles get bigger and carry more wires — that's the direction power is flowing from, usually a substation near a town or highway.",
      "Small metal road signs with a number on them (like \"CR 1200\") are worth writing down even without a map — county road numbering usually follows a grid, so the numbers themselves can tell you roughly which direction you're heading.",
      "If the vehicle gets stuck or dies, staying with it is usually the better move — a car is much easier for a search vehicle or passerby to spot than a person walking down a dark road, and walking exposes you to exhaustion, weather, and loose farm dogs. Only leave it if you can actually see an occupied house or a main road close by.",
    ],
  },
  "Advanced home isolation: negative-pressure room and PPE routine": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "For a more serious airborne illness than typical household sickness, a sealed sick room alone may not be enough — you can improve it by making the room slightly negative-pressure, so air only flows INTO it, never out.",
      "Seal the room's air vents with plastic sheeting and tape, and press a damp towel against the base of the door to the hallway. Then set a box fan in a cracked-open window, facing outward, and seal the rest of the window opening around the fan with cardboard and tape.",
      "Running that fan continuously pulls air in from under the hallway door and pushes it outside — meaning air generally moves INTO the sick room, not out of it and into the rest of the house. You can rough-check this by holding a lit incense stick or smoke source near the gap under the hallway door — the smoke should get pulled inward, not blown back at you.",
      "Set up a clean-to-dirty routine at the door: keep clean masks, gloves, and eye protection on a small table just outside. Put them on before going in. Coming out, take the gloves off inside the room (turning them inside out) and drop them in a lined bin there, wash your hands, then step out, close the door, and only then remove your mask and eye protection — touching only the straps, never the front — and wash your hands again.",
      "Keep the sick room's dishes and laundry fully separate: wash its dishes by hand in scalding, soapy water with a splash of bleach rather than mixing them into the household load, and dedicate a sealed bucket for soiled bedding and clothing — soak it in boiling or chlorinated water before it ever goes through a general wash.",
    ],
  },
  "Trapped in a building collapse: what to do until help arrives": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Cover your nose and mouth with a shirt or cloth right away — dust from collapsed concrete and drywall is fine enough to cause real breathing trouble on its own.",
      "Don't shout continuously — it burns through your energy and the air around you fast, and rescuers often can't hear a voice through rubble anyway. Instead, tap rhythmically on a pipe, duct, or solid piece of the structure — three taps, pause, repeat — since search teams specifically listen for that kind of rhythmic pattern with sensitive equipment.",
      "Don't push or kick at debris around you — shifting the wrong piece can bring more down. Only clear small, loose material you can move without disturbing anything that looks like it's actually holding weight.",
      "If you have a flashlight, save the battery — turn it off once you've gotten your bearings, and only turn it on again when you hear voices or equipment nearby.",
    ],
  },
  "Crush syndrome: why timing matters before freeing a trapped limb": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "If someone's arm or leg has been pinned under something heavy for more than about 2 hours, the crushed muscle tissue builds up toxins and potassium while it's trapped. The danger isn't the trapping itself — it's what happens the moment the weight comes off.",
      "Suddenly freeing a limb that's been crushed that long can send a surge of those toxins straight to the heart all at once, which can stop it. This is why professional rescuers sometimes give IV fluids or apply a tourniquet before lifting the weight, not after.",
      "If you can safely apply a tourniquet high on the limb, above the crush point, before the weight is lifted, that protects against this — it keeps those toxins from suddenly flooding into the rest of the body when the pressure is released. If you can't do that in time, at least get emergency medical help involved before anyone lifts the weight, rather than freeing the limb the moment you're able to.",
      "This only applies to a limb pinned for a genuinely long time (2+ hours) — a shorter entrapment doesn't carry the same risk, and normal rescue (freeing the limb and treating the injury directly) is appropriate.",
    ],
  },
  "Anhydrous ammonia leak": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Anhydrous ammonia (used in agriculture and industrial refrigeration) has a sharp, choking smell like strong smelling salts, and a leak often looks like a low white fog hugging the ground.",
      "It reacts violently with any moisture — including your eyes, mouth, and lungs — so exposure causes real chemical burns, not just irritation.",
      "Move crosswind first, then upwind: check which way smoke or flags are blowing, walk roughly perpendicular to the wind until you're clear of the cloud, then head upwind of the source. Because the gas is heavy and hugs low ground, move to higher terrain and avoid ditches, gullies, or basements.",
      "If you have to move through any of it, breathe through a wet cloth folded several times over your nose and mouth — the moisture absorbs a meaningful amount of the gas before it reaches your lungs.",
    ],
  },
  "Fuel spill containment (gasoline/diesel)": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Gasoline vapor is heavier than air and creeps along the ground — it can reach a pilot light, running vehicle, or a spark from an electrical switch from dozens of feet away and ignite. The moment there's a spill, kill nearby flames, shut down generators, and don't touch any switches in the area.",
      "Never hose a fuel spill toward a storm drain, ditch, or pond — that just spreads it (and if it ignites, spreads burning fuel) over a much larger area.",
      "Instead, contain it: pile bare soil, sand, or gravel into a small berm downhill of the spill to keep it from spreading further, then smother the pooled liquid with dry cat litter, dirt, or sawdust to soak it up. Scoop the saturated material into a metal container for disposal rather than leaving it to evaporate or soak into the ground.",
    ],
  },
  "Livestock fracture management (large animals)": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "A large animal — a horse, cow, or goat — with a broken leg can turn a clean break into a shredded, open injury just by thrashing around. Calm the animal first: a halter and lead rope to steady the head goes a long way before you try to do anything else.",
      "Be realistic about what you can fix: a break above the knee or hock (a femur or shoulder injury) genuinely needs a veterinary surgical facility — there's no field fix for that. A lower-leg break, below the knee or hock, can often be stabilized well enough for transport or comfort.",
      "For a lower-leg fracture: wrap the leg heavily with thick padding (towels, cotton sheeting, a folded blanket — a couple of inches all the way around), then place a rigid support alongside it — a length of PVC pipe split down the middle, a 2x4, or similar — running from the ground past the joint above the break. Wrap it snugly with vet wrap or heavy tape from the bottom up to hold the joint still.",
      "This is about keeping the animal stable and comfortable until a vet can take over, not a substitute for real veterinary care.",
    ],
  },
  "Freeing someone from a live household electrical source": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "This is about ordinary household electricity — a person shocked by an appliance, outlet, or indoor wiring — not a downed outdoor power line, which needs a completely different response (see Downed power lines and electrified water).",
      "Never touch them with your bare hands while they're still in contact with the source — their muscles can be locked in a contraction that pulls your hand in too, making you a second casualty instead of a rescuer.",
      "Cut the power first if you can: flip the breaker or unplug the source. That's always safer and faster than trying to physically separate them.",
      "If you can't reach the power source fast enough, use something completely dry and non-conductive to push or pull them away from it — a dry wooden broom handle, a dry 2x4, a length of PVC pipe, or a thick dry wool blanket looped around them to drag them clear. Never use anything metal, anything wet, or damp cloth — those conduct electricity too.",
      "Once they're clear, check breathing and responsiveness right away and start CPR if needed — electrical shock can stop the heart even without any visible burn.",
    ],
  },
  "Blast injury: lung and ear trauma": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "A powerful explosion's shockwave can injure the lungs and ears without leaving a mark on the outside of the chest — someone can look basically fine right after and get much worse over the following hours.",
      "Watch for, in the hours after being near a blast: coughing up pink or bloody frothy material, real shortness of breath, chest tightness, or bluish lips or fingertips. Any of these after an explosion is an emergency, even if they seemed okay at first.",
      "Keep them sitting upright or propped up rather than lying flat, and keep them as still and calm as possible — exertion makes lung injury worse faster.",
      "Ear symptoms — sudden pain, muffled hearing or ringing, or a little blood or fluid draining from the ear canal — usually mean a ruptured eardrum. Don't rinse or put anything down into the ear canal; just lay a clean, dry piece of gauze loosely over the outer ear to catch drainage, and get it checked out.",
    ],
  },
  "Zeer pot: off-grid evaporative cooling": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "A zeer pot uses plain water evaporating through unglazed clay to cool food by roughly 10-25°F below the outside air temperature, with no electricity or ice needed.",
      "You need two unglazed terra-cotta pots, one that fits inside the other with about an inch or two of gap all around — unglazed is important, since the water needs to be able to seep through the clay itself.",
      "Plug the drainage hole in the bottom of both pots. Pour a couple inches of clean, coarse sand into the bottom of the larger pot, sit the smaller pot on top of it so the rims line up, then fill the gap between the two pot walls completely with more sand.",
      "Soak the sand thoroughly with clean water until it can't hold any more. Put your food in the dry inner pot, cover the top with a damp cloth, and set the whole thing somewhere shaded with a bit of airflow. Re-wet the sand a couple of times a day to keep it working.",
    ],
  },
  "Disposal of medical waste and soiled dressings": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Bloody bandages, used wound packing, and anything soaked in bodily fluid left in open household trash attracts flies and pests and can spread infection around your living space — treat it differently from regular trash.",
      "Double-bag it: put soiled gauze, gloves, and dressings in a dedicated heavy-duty trash bag. When it's about 3/4 full, twist the neck closed, fold it over on itself, tape it shut, and put that whole bag inside a second sealed bag.",
      "If you can burn it: a hot, actively-flaming fire, not a smoldering one, will destroy it quickly — a weak fire just produces toxic smoke without actually burning through the plastic and waste.",
      "If you can't burn it: bury it at least 3 feet deep, well away from where people live, and at least 200 feet from any well, pond, or water source.",
    ],
  },
  "Improvised feminine hygiene pads": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Clean cotton — boiled rags, strips cut from a cotton t-shirt, or flannel — works as an absorbent layer inside a soft cotton outer wrap. Avoid synthetic fabric (polyester, nylon) directly against skin; it traps moisture and makes yeast infections more likely.",
      "To clean and reuse cloth pads: rinse out heavy staining in cold water first (hot water actually sets blood stains rather than removing them), then boil the rinsed cloth in water for 10-15 minutes to kill bacteria, and dry it in direct sunlight, which acts as a natural disinfectant on top of the boiling.",
    ],
  },
  "Generator maintenance: oil, spark plugs, carburetor": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Small generator engines don't have an oil filter, so the oil breaks down faster than a car's — change it every 50-100 hours of run time, and check the dipstick every time you refill the gas tank.",
      "If a generator starts, runs for just a few seconds, then shuts itself off, check the oil level before you assume something else is wrong — most modern generators have a low-oil sensor that shuts the engine down automatically to protect it.",
      "Gas left sitting in the carburetor for more than about a month can turn into a gummy varnish that clogs the tiny internal passages — this is the most common reason a stored generator won't start. If that happens, the float bowl on the bottom of the carburetor can be removed and cleaned with carburetor cleaner spray.",
      "Before putting a generator away for storage, close the fuel valve and let it run until it stalls out on its own from an empty carburetor — this is what actually prevents the gummed-up-carburetor problem in the first place.",
    ],
  },
  "Battery care and revival (lead-acid and AGM)": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Don't let a standard lead-acid battery sit below about 50% charge for long — repeatedly draining it low lets hard crystals form on the internal plates, which permanently reduces how much charge it can hold.",
      "If it's a flooded (not sealed) battery, check the liquid level inside monthly and top it up with distilled water only if the plates are exposed — never tap water, which introduces minerals that damage the cells, and never add acid to a battery that's just low on water.",
      "A battery that reads low and won't take a normal charge anymore isn't necessarily dead — a dedicated desulfation charger, built specifically to break down those hardened crystal deposits, can sometimes bring an old battery back to usable condition.",
    ],
  },
  "Water testing without a lab: turbidity, smell, and color": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Clear water isn't automatically safe, and cloudy water isn't automatically dangerous — but cloudy (turbid) water does make it harder for boiling, chlorine, or UV treatment to work, because suspended particles can shield germs. Let cloudy water settle for a few hours, or run it through a cloth or sand filter, before you treat it.",
      "Smell tells you a lot: a rotten-egg smell is usually naturally occurring sulfur or decaying organic matter, which boiling and aerating (pouring back and forth between two containers) generally handles. A chemical, gasoline, or pesticide smell means don't drink, boil, or filter it at all — boiling just concentrates the chemical, and normal filters don't remove it. A fishy or stale-pond smell suggests algae toxins, which nothing you do at home will neutralize — find a different source.",
      "Color is a rough guide too: green usually means algae, deep tea-brown is often just harmless plant tannins (bitter-tasting but drinkable once filtered), and anything milky or with an oily sheen on top points to industrial or fuel contamination — don't use it.",
    ],
  },
  "Gravity-fed water filter maintenance and the freeze-fracture risk": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "When a ceramic or carbon filter's flow slows from a steady stream to a slow drip, it's usually just clogged with fine sediment on the outside — scrub the outer shell gently with a clean scouring pad under clean water (no soap) until it looks like fresh ceramic again.",
      "For a squeeze or gravity hollow-fiber filter (the Sawyer/LifeStraw style), you can often restore flow by backflushing: push clean water backward through the filter from the clean-water side using the cleaning syringe that comes with it, plunging it firmly several times to push trapped silt back out.",
      "Never let a wet hollow-fiber filter freeze — this is a serious, easy-to-miss danger. Freezing water inside the microscopic hollow fibers expands and cracks them, and afterward the filter will still pass water at a normal rate, but it can let essentially all the bacteria and parasites straight through without you knowing anything's wrong. In cold weather, keep a wet filter in an inside coat pocket, against your body, so it never actually freezes.",
    ],
  },
  "Field laundry: eradicating lice, mites, and bedbugs": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Regular cold-water washing cleans dirt off clothing and bedding, but it doesn't reliably kill lice, scabies mites, or bedbug eggs — those need real heat.",
      "Boiling works best: submerge infested clothing or bedding in a pot of boiling water for a solid 15-20 minutes.",
      "No way to boil? Seal the items in a heavy-duty black plastic bag and leave it in direct, intense summer sun on dark pavement or a tin roof for at least 8 hours — the inside of the bag needs to get hot, above about 120°F, to actually kill both the bugs and their eggs, not just make them uncomfortable.",
      "After washing, hang things to dry in direct sunlight rather than shade — sunlight itself has some disinfecting effect on top of just drying things out.",
    ],
  },
  "Running propane safely to an indoor-rated appliance": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Never bring the propane tank itself indoors — even a 20-lb tank has a safety valve that can vent gas if it gets too warm, and that gas is heavy enough to pool on the floor and find an ignition source. The tank stays outside, upright, shaded, and ventilated, always.",
      "If you have an appliance actually rated for indoor use, run a proper high-pressure hose from the outdoor tank through a wall pass-through or a slightly cracked window to reach it, rather than moving the tank itself.",
      "Before you ever light it: mix dish soap and water and spray every threaded connection on the line. Growing bubbles mean a leak — tighten that fitting before you try to light anything.",
    ],
  },
  "Shoring a sagging ceiling or damaged wall": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Warning signs a ceiling joist or load-bearing wall is failing: doors that suddenly stick in their frames, drywall cracking diagonally out from a door or window corner, or a ceiling that's visibly sagging or bouncy underfoot.",
      "A simple emergency support, a \"T-shore\": nail a roughly 3-foot horizontal board to the top of a vertical post to form a T shape. Set a matching flat board on the floor directly under the sagging spot to spread the weight out, stand the T-shore up between that floor plate and the sagging area, and tap wooden shims under the base until it's wedged in tight and holding the sag from getting worse.",
      "Don't try to jack the ceiling back up to perfectly level — forcing it back into position can tear the roof or crack things further up in the structure. The goal is just to stop it from sagging more until a professional can look at it.",
    ],
  },
  "Preserving eggs without refrigeration (water-glassing)": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "This only works with fresh, unwashed eggs — washing strips off the natural coating on the shell that keeps bacteria and air out, and once that's gone, water-glassing won't help.",
      "Mix pickling lime (calcium hydroxide) into non-chlorinated water — about 1 ounce of lime per quart of water — and stir until it's dissolved (the water will look a bit milky).",
      "Place the unwashed eggs pointy-end down in a food-safe bucket, then pour the lime solution over them until they're covered by at least a couple inches of liquid. Put a tight lid on the bucket and store it somewhere cool and dark.",
      "Eggs kept this way stay good for cooking, baking, and frying for something like 12-18 months — a real long-term option that needs no electricity at all.",
    ],
  },
  "Managing wet crawlspaces and basement flooding": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Don't pump a flooded basement completely dry right away if the ground outside is still saturated — the water sitting in the soil outside is pressing on your foundation walls, and if you remove all the water pressure from inside too fast, that outside pressure alone can crack or cave the wall in. Pump out only a couple feet of water a day as the floodwater outside also recedes.",
      "In a wet crawlspace, pull out any soaked fiberglass insulation — wet fiberglass holds moisture right up against the wood floor joists above it, which grows mold and rots the wood within days.",
      "Laying thick plastic sheeting across the bare dirt floor of a crawlspace, with the seams overlapped, stops ground moisture from evaporating upward into your living space — worth doing any time you're already in there after a flood.",
    ],
  },
  "Maintaining firearms in dusty or freezing conditions": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Standard gun oil thickens in extreme cold and can slow down or jam moving parts — in very cold conditions, some owners strip the oil out entirely and run the action dry, or switch to a dry lubricant like graphite powder made for cold weather.",
      "In dusty or sandy conditions, the opposite problem happens — wet oil collects grit and turns into a gritty paste that jams things up. Wiping exposed moving parts dry, rather than oiling them heavily, works better when the environment is dirty rather than cold.",
      "Whatever the conditions, this is routine maintenance to keep a mechanical tool working reliably — check your specific owner's manual for what your equipment's manufacturer actually recommends, since lubrication needs vary by model.",
    ],
  },
  "Long-term waste, pests, vector control": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Flies can go from egg to flying adult in under a week in warm weather, so any exposed food waste, wet pet bedding, or spilled animal feed needs to be buried under a foot of soil or burned within 2 days, not left sitting.",
      "A simple fly trap: cut the top third off a clear plastic bottle, flip it upside down into the bottom section like a funnel, and bait it with sugar water or meat scraps. Flies find their way in through the cone but can't figure out how to fly back out.",
      "A simple flea trap: a shallow pan of soapy water on the floor overnight with a small light or candle positioned over it — fleas jump toward the warmth and light, land in the water, and the soap breaks the surface tension so they can't climb back out and drown.",
      "For ticks specifically: keep grass cut short within about 30 feet of where people spend time, and put down a 3-foot-wide strip of gravel, dry mulch, or crushed stone between any wooded area and your yard — ticks generally won't cross open, dry, sun-exposed ground to get to you.",
      "For an enclosed outhouse or box privy, build a fly trap into the structure itself: run a 4-inch vent pipe from under the pit up through the roof, extending a foot above the peak, and cover the top with fine steel or bronze mesh. Flies in the dark pit head toward the daylight coming down the pipe and get trapped against the screen — pair this with a tight-sealing gasket on the seat lid.",
    ],
  },
  "Appliance failure and safe restart": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Unplug sensitive electronics, and shut off breakers for the fridge, freezer, and HVAC, as soon as you know the power is out — when the grid comes back, it often sends a surge that can fry control boards and compressors.",
      "Don't plug a fridge, freezer, or AC unit back in the instant the lights come back on. Utilities often cycle power on and off a few times in the first 10-15 minutes of restoration, and those repeated surges are hard on anything with a compressor. Wait until power has stayed on steadily for at least 15 minutes.",
      "Give a compressor-based appliance a few minutes of rest even after that: if it's forced to restart against pressure that hasn't had a chance to equalize, the motor can stall, draw a huge amount of current, and trip its own internal safety switch. A 5-minute wait after plugging it back in before expecting it to run normally is a reasonable buffer.",
      "If you're bringing several big appliances back online, stagger them — one at a time, a few minutes apart — rather than all at once, so you don't overload your home's breaker panel with everything starting up simultaneously.",
    ],
  },
  "Texting vs. calling during network congestion": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "A phone call needs a dedicated, continuously-open connection through the cell network the whole time you're talking. When a lot of people try to call at once after a disaster, those connections fill up fast and calls simply won't go through.",
      "A text message barely uses any of that same capacity — it rides along on a tiny background signal your phone is already sending constantly just to stay connected to the tower. That's why texts often get through even when calls won't connect at all.",
      "If a call fails, don't keep redialing — that just adds to the congestion for everyone. Send a text instead: keep it short and specific (your status, your exact location, what you need), and skip photos or videos, which need much more bandwidth and are more likely to fail to send.",
      "A text that doesn't go through right away isn't necessarily lost — it's common for it to sit and then send the moment a brief gap opens up in network traffic, so it's worth letting it try rather than assuming it failed.",
    ],
  },
  "Paper maps, contacts, critical records backup": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Keep a small waterproof notebook with the phone numbers, addresses, and out-of-town contacts for everyone in your family, written in permanent ink — most people can't actually recall these numbers from memory once their phone is dead or broken, since we rely on contact lists so completely.",
      "Paper maps matter for the same reason digital maps can fail: keep a current state road map and, for your local area, a detailed topographic map, somewhere you can grab them fast. Sealing them or keeping them in a waterproof map case protects them from the weather.",
      "For the document side of this — deeds, insurance policies, IDs, medical records — see Emergency-document inventory, which covers what to include and how to store it safely. Keep that document set together with your maps and contact book so everything critical is in one place.",
    ],
  },
  "Amateur (ham) radio licensing basics": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Ham radio licensing has three tiers, each unlocking more: Technician (entry-level, a 35-question exam on basic theory and rules) gives you local line-of-sight frequencies through repeaters. General adds long-range HF bands that can reach across the country without needing the internet or cell towers at all. Amateur Extra unlocks the rest.",
      "Getting licensed before you need it matters — there's a narrow legal exception allowing an unlicensed person to transmit on ham frequencies, but only in a genuine, immediate, life-threatening emergency with no other way to communicate. For everyday practice, testing your setup, or community radio check-ins, you need an actual license.",
      "The test itself isn't the hard part for most people — it's multiple choice, and the question pools are public, so studying the actual test bank ahead of time, rather than trying to learn amateur radio theory from scratch, is how most people pass the Technician exam.",
    ],
  },
  "Downloading and using offline map packs": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Download offline map areas for your region before you need them, over a strong Wi-Fi connection — offline map data can run into the hundreds of megabytes or more, and that's not something you want to be waiting on during an actual emergency.",
      "If your mapping app offers it, download both a standard street map layer and a satellite or topographic layer — the topographic layer shows elevation, waterways, and tree cover that a plain street map won't, which matters if you end up off the main roads.",
      "Your phone's GPS chip talks directly to satellites and works completely offline, with no cell signal or Wi-Fi needed — but it can take a few minutes longer to get an initial location fix without cell towers to help, so give it time and keep the phone with a clear view of the sky while it locks on.",
      "Offline navigation still drains your battery fast. Keep the phone in airplane mode (GPS still works with airplane mode on) with the screen dimmed and off between checks, rather than leaving the map open and glowing the whole time you're moving.",
    ],
  },
  "Marking private landmarks/hazards on offline maps": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "A simple, consistent pin system is worth setting up in advance: one type of marker for water sources (springs, creeks, a working spigot), another for resources (fuel, medical supplies, a safe meeting spot), and another for hazards (a low-water crossing that floods, an unstable bridge, an area to avoid).",
      "Street addresses can become useless if signs and landmarks are destroyed — learning to read and drop a coordinate (either simple GPS decimal coordinates or a grid system like MGRS/UTM) gives you a way to mark and find a spot that doesn't depend on anything still being standing.",
      "If you're marking sensitive locations — a supply cache, a fallback meeting spot — avoid labeling them in plain language on a device other people might see. A vague nickname, or keeping that layer of the map in a separate password-protected file, keeps the information private without you having to remember complicated codes.",
    ],
  },
  "Hand tool maintenance and rust prevention off-grid": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Scrape tools clean right after use: dirt and sawdust trap moisture against bare steel, so brush or scrape it off with a wire brush or putty knife before storing — never put a tool away caked in dirt.",
      "Seal bare metal with mineral oil, motor oil, or paste wax to block out air and moisture — skip vegetable or cooking oils, which turn gummy and rancid and attract pests.",
      "Wooden handles need oil too: rub hickory or ash handles with boiled linseed oil about twice a year. Dry wood shrinks and cracks, which loosens the tool head. Wipe off the excess, and hang any oily rags outdoors, laid flat — balled-up linseed-oil rags can spontaneously combust.",
      "Remove surface rust without chemicals: scrub it off with steel wool dipped in kerosene, or soak small iron parts in plain white vinegar for 4-8 hours to dissolve the oxidation. Rinse well, dry immediately over heat, and re-oil right away.",
    ],
  },
  "Small engine pull-cord and fuel line replacement": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Replacing a snapped pull cord: unbolt the starter recoil housing from the engine shroud (usually 3-4 small bolts), then manually turn the internal pulley clockwise until the recoil spring is tensioned, backing off one turn until the cord eyelet lines up with the exit hole. Wedge a screwdriver into the pulley to hold it there.",
      "Feed the new nylon starter rope through, tie a figure-eight knot, seat it into the pulley recess, then pull the screwdriver and let the spring draw the rope back in smoothly.",
      "Fuel lines harden and crack faster than people expect: modern ethanol fuel breaks down small rubber or vinyl fuel lines within 2-3 seasons, causing air leaks and stalling. Pull the old line off the carburetor and tank fittings, and cut the new line with an angled tip to make threading it through tight grommets easier.",
      "A drop of WD-40 or soapy water on the fitting lets the new line slide into place without splitting the rubber.",
    ],
  },
  "Field handwashing stations: the tippy-tap build": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Hang a clean 1-gallon jug (water or milk jug) from a tree branch or wooden tripod by its handle, using a cord.",
      "Poke a small nail-sized hole near the bottom corner opposite the handle, and hang a bar of soap in a mesh bag or old stocking from the same branch, right next to the jug.",
      "Tie a second cord to the jug's neck and run it down to a foot-lever stick resting on the ground. Stepping on the lever tilts the jug forward so a thin stream trickles out the hole; releasing your foot lets it swing level and stop.",
      "This keeps hands off any shared spigot, handle, or faucet valve entirely — worth setting up anywhere several people are sharing a wash station.",
    ],
  },
  "Improvised hot and cold packs": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Cold pack for acute swelling or a sprain: double-bag crushed ice, snow, or cold stones in a damp cloth. Never put ice directly against bare skin, and limit any single application to 15-20 minutes to avoid frostbite.",
      "An alcohol-gel slush pack stays flexible: mix 2 parts water with 1 part 70% rubbing alcohol in a sealed freezer bag. The alcohol keeps it from freezing solid, so it molds around an ankle or wrist instead of sitting as a hard block.",
      "Hot pack for muscle aches: fill a clean tube sock with about 2 cups of dry rice, beans, or corn and knot the end. Warm it in a pot over low, indirect heat (or near a wood stove) — test it against your inner wrist before applying — and it'll hold heat for 30-45 minutes.",
    ],
  },
  "Safe indoor kerosene heater maintenance and wick trimming": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Use 1-K clear kerosene only — never red-dyed diesel, jet fuel, or gasoline. Even a pint of gasoline mixed into a kerosene tank can cause an explosive vapor fire when lit. Good kerosene looks crystal-clear; yellow or cloudy fuel means toxic sulfur fumes and a carbon-coated wick.",
      "Dry-burn the wick monthly: let the heater run outdoors until it burns completely out of fuel on its own. This burns off the tar and carbon crust on the wick and restores a clean, bright flame.",
      "Trim the wick edge level with sharp scissors, snipping any frayed threads or uneven spots.",
      "Test the tip-over shutoff before each heating season: bumping the heater should make the weight drop and the wick retract instantly. If it doesn't, the heater isn't safe to use until it's fixed.",
    ],
  },
  "Documenting storm and disaster damage for insurance and legal claims": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Before you clear a single board or rake any debris, walk the property's four corners and take sweeping wide-angle photos and video of everything, showing full structural context (the whole house with the missing roof section) rather than tight close-ups — adjusters can reject an unverified close-up as lacking context.",
      "Photograph the serial and model plates on any wrecked heavy equipment, generators, well control boxes, solar inverters, and major appliances before they're hauled off.",
      "Keep a handwritten paper log — not just your phone — of the date, time, weather conditions, what you observed, and the names and badge numbers of any responders or officials who inspected the site. A physical notebook survives a dead phone or lost cloud backup.",
    ],
  },
  "Offline route downloads (primary/alternate)": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Never rely on a single route: major interstates and state highways routinely gridlock within about two hours of a large-scale evacuation order. Download both a primary route (your fastest normal way out) and at least one alternate that uses rural or farm-to-market roads and county bypasses instead of the highway.",
      "Check that your alternate actually holds up in bad weather: rural low-water bridges and small river crossings are usually the first things to wash out in a regional flood, so verify the alternate route's crossings are solid, not just shorter.",
      "Download a wide corridor, not just a thin line: pad your cached map area at least 15 miles on either side of your route so you can see (and route around) fallen trees, checkpoints, or blocked roads without needing a cell signal.",
    ],
  },
  "Immediate/neighborhood/regional meeting places": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Set three tiers of meeting point, not just one. Immediate: right outside your door or property gate — a specific tree or landmark — for a fast structural evacuation like a house fire.",
      "Neighborhood: a walking-distance spot outside your immediate street, like a crossroads, fire station, or neighborhood entrance, for when the house itself is compromised or cordoned off.",
      "Regional: a specific site 20-50 miles away in a different town or county — a trusted relative's home, a library, a municipal building — for wide-area disasters where cell networks are down and the whole town is evacuating.",
      "Agree on all three ahead of time with everyone in the household, including kids, and write them down somewhere that doesn't depend on a working phone.",
    ],
  },
  "Vehicle evacuation kit": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Core fluids and mechanical reserves: a gallon of drinking water per passenger, a gallon of premixed coolant, a full-size spare tire (check its PSI monthly), a mechanical bottle jack, and a heavy-duty 20-foot tow strap.",
      "Off-grid mobility tools: a 12-volt air compressor that clips onto your battery terminals, a tire plug kit with insertion handles, and a folding shovel for digging a tire out of mud or sand.",
      "Sustenance and shelter: 72 hours of dry rations that won't make you thirstier (ration bars, trail mix), two wool or space blankets, a DC-to-USB inverter, and a paper road atlas in the seatback pocket as backup to any phone map.",
      "Keep the tank above half: grid-down gas stations can't pump fuel, and idle traffic in gridlock burns through gas fast — never let an evacuation vehicle drop below half a tank.",
    ],
  },
  "Household drill schedule and results": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Rotate drills quarterly between a rapid nighttime fire/smoke egress, a storm-shelter staging drill, and a full vehicle bug-out load.",
      "Make it a real test, not a walkthrough: kill the main breaker to practice nighttime navigation in actual darkness, or load the vehicle without phones or spoken directions.",
      "After each drill, log three things: time-to-clear (minutes from alarm to everyone assembled), gear discrepancies (missing boots, dead headlamps, expired batteries), and choke points (a blocked hallway, a jammed gate lock). Fix whatever failed before the next drill, not after the next real emergency.",
    ],
  },
  "Non-escalatory de-escalation techniques": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Stand at an angle, not squared up chest-to-chest, keep your hands open and visible around chest height, and hold 6-8 feet of space — squaring off and closing distance both read as confrontational even when you don't mean them to.",
      "Slow your voice down (roughly 20% slower than normal) and keep your pitch low. Don't match an agitated person's volume or speed, and stick to short, concrete sentences.",
      "Acknowledge the stress without giving up ground: something like \"I hear you — we're both just trying to keep our families safe. Let's step back and figure this out\" works far better than telling someone to \"calm down,\" which tends to do the opposite.",
      "Know when to stop trying: if the person won't lower their volume, makes a direct threat, or keeps closing distance despite you asking for space, stop engaging and get behind physical cover instead.",
    ],
  },
  "Safe-room / panic-room concept": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Pick the lowest interior room with no outside walls or windows — an interior bathroom, a reinforced hallway, or a large central closet.",
      "Harden the door: fit a solid-core wood or steel door with heavy-duty slide-barrel bolts top and bottom (a standard doorknob latch won't hold under pressure), and fasten 3/4-inch exterior-grade plywood to the inside of the door and surrounding wall framing to blunt flying debris.",
      "Stage gear inside ahead of time: helmets for head protection, heavy leather work gloves, thick blankets or a mattress to pull over everyone, and a battery-powered weather radio.",
    ],
  },
  "Pet evacuation plan": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Never leave an animal locked in a stall, barn, or on a short chain if you can't get it out — if there's no time to trailer livestock before roads close, open every stall door and pasture gate instead so they at least have a route to higher, open ground.",
      "Mark livestock in a way that survives losing paperwork: spray-paint your phone number across the animal's side with weather-resistant livestock marking paint, or clip on an aluminum ear tag. A laminated card with contact info braided into a horse's mane works too.",
      "Plan for pets to bolt: a stressed dog or cat will run at the sound of sirens or thunder, so have a secure crate and leash staged and ready, not something you're hunting for while already trying to leave.",
    ],
  },
  "Children in emergencies (age-appropriate prep)": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "In a chaotic evacuation — smoke, a crowd, a structural collapse — kids and disoriented elderly relatives can be separated in seconds. Don't rely on a paper card in a pocket; write key details in permanent waterproof marker on a vinyl wristband, a laminated tag, or the inside cuff of their jacket.",
      "Include: full legal name, date of birth, blood type, any life-threatening allergies (like penicillin or severe asthma), and two out-of-area contact numbers.",
      "Keep identifying details off the outside of clothing or a backpack in plain sight — a stranger reading a child's name off their bag can use it to fake familiarity and lure them away.",
    ],
  },
  "Establishing barter inventory tracking without electronics": {
    sources: ["Not yet sourced — confirm the original source before marking this verified"],
    guidance: [
      "Keep a hardbound ledger in a waterproof pouch, written in permanent ink (pencil fades and can be altered). Split it into sections by category — medical/consumables, fuel/batteries, shelf-stable food, tools/fasteners, trade goods — and log three things per entry: date/action, quantity in or out, and running balance.",
      "Label every storage tote or bucket with a bold stencil letter and number (like BIN-A1), and keep the master list of what's in each one on the ledger's front-cover index page.",
      "Set a hard floor for every category — a minimum reserve you will not trade away, like 30 days of rations or 5 gallons of fuel. Mark that line in the ledger so it isn't a judgment call in the moment.",
      "Physically recount everything every 30 days during an extended grid-down stretch, and spot-check a few sealed container weights against what you recorded when you packed them — a lighter container catches a rodent breach or slow shrinkage early.",
    ],
  },
};
