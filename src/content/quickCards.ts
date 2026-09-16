// Restructured presentation of a handful of high-priority First Aid articles
// as scannable step cards, instead of a flat bullet list. The underlying
// facts are the same ones already in ARTICLE_BODIES for these exact titles —
// this is a display layer, not a second source of truth.
export interface QuickStep {
  headline: string;
  detail: string;
}

export interface QuickCard {
  subtitle: string;
  callNow: string;
  steps: QuickStep[];
  cautionLabel: string;
  caution: string;
}

export const QUICK_CARDS: Record<string, QuickCard> = {
  "Thermal burns": {
    subtitle: "For burns from flame, steam, hot liquid, grease, or a hot surface",
    callNow:
      "A full-thickness burn, a burn bigger than the person's palm, a burn on the face, hands, feet, or genitals, an electrical or chemical burn, or any sign of smoke inhalation needs real medical care — get there, or get help moving toward you, any way you actually have.",
    steps: [
      {
        headline: "Stop the burning",
        detail:
          "If clothes or skin are on fire, put the fire out first — don't run, drop and roll, or smother with a blanket or coat. Only then move on to cooling the burn.",
      },
      {
        headline: "Cool it now",
        detail:
          "Cool the burn with clean running water for 5-20 minutes. Never use ice or ice-cold water — it kills more tissue underneath and can push the body into shock.",
      },
      {
        headline: "Remove tight items",
        detail: "Take off rings, watches, and tight items before swelling starts. Don't pull away anything stuck to the burn.",
      },
      {
        headline: "Cover loosely",
        detail:
          "After cooling, cover loosely with a clean, nonstick dry dressing. Protect the person from hypothermia, especially a child or a large burn.",
      },
    ],
    cautionLabel: "Do not",
    caution: "Do not use butter, oil, toothpaste, or ice directly on a burn. Do not break blisters or pull off melted-in clothing.",
  },

  "Adult CPR/AED": {
    subtitle: "For a teen or adult who is unresponsive and not breathing normally",
    callNow:
      "Shout for help and send someone for an AED. Try every way you actually have to reach real help — call 911 if you have signal, radio it in, send someone running — but don't wait on that to start CPR.",
    steps: [
      {
        headline: "Check",
        detail: "Tap both shoulders and shout. Gasping is not normal breathing — don't delay CPR trying to find a pulse.",
      },
      {
        headline: "Position",
        detail: "Place the person on their back on a firm surface if it can be done safely.",
      },
      {
        headline: "Push",
        detail:
          "Push hard and fast, center of the chest, 100-120 compressions a minute, at least 2 inches deep (not more than 2.4). Let the chest fully recoil.",
      },
      {
        headline: "Use the AED",
        detail: "Turn it on as soon as it arrives and follow its prompts. Resume compressions immediately when it says to.",
      },
    ],
    cautionLabel: "Keep going",
    caution:
      "Continue until the person shows clear signs of life, a trained responder takes over, the scene becomes unsafe, or you're physically unable to continue. If trained and willing, 30 compressions to 2 breaths — otherwise, compression-only CPR is fine.",
  },

  "Fractures, splints, circulation checks": {
    subtitle: "Treat a badly injured or deformed limb as a fracture",
    callNow:
      "An open fracture (bone visible through the skin), a limb that turns pale, blue, or cold, or any injury with heavy bleeding needs real medical care fast — get there, or get help moving toward you, any way you actually have.",
    steps: [
      {
        headline: "Don't move it",
        detail: "Treat any suspected fracture as real until ruled out. Don't try to realign it — keep the limb exactly in the position it was found.",
      },
      {
        headline: "Check circulation first",
        detail:
          "Check circulation, movement, and feeling in the fingers or toes before splinting, not just after — that way you know if something was already wrong before you touched it.",
      },
      {
        headline: "Splint if trained",
        detail:
          "If trained and help will be delayed, splint the area past the joints above and below the injury, padded and secure — firm, but not tight enough to cut off circulation.",
      },
      {
        headline: "Recheck often",
        detail: "Check circulation regularly after splinting. Toes or fingers beyond the splint should stay pink and warm.",
      },
    ],
    cautionLabel: "If bone is visible",
    caution:
      "Never push exposed bone back under the skin, and never pour alcohol, peroxide, or iodine directly on it. Gently rinse away loose dirt with clean water, cover with a clean damp cloth, then splint over that as usual.",
  },

  "Severe bleeding and tourniquet": {
    subtitle: "For life-threatening bleeding from an arm or leg wound",
    callNow:
      "Pooling or spurting blood, bleeding that continues despite pressure, or bleeding with drowsiness, dizziness, chest pain, or loss of consciousness is life-threatening — get help moving any way you actually have (call, radio, transport) while you control the bleeding below.",
    steps: [
      {
        headline: "Apply pressure",
        detail: "Use gloves or a barrier, expose the wound, and apply firm continuous direct pressure with gauze or clean cloth.",
      },
      {
        headline: "Tourniquet if needed",
        detail: "If direct pressure alone doesn't stop it, apply a commercial tourniquet above the wound — never over a joint — and tighten until bleeding stops. Note the time.",
      },
      {
        headline: "Don't loosen it",
        detail: "Do not loosen or remove a working tourniquet — leave that decision to medical professionals. Never use a cord, wire, or shoelace as a substitute.",
      },
      {
        headline: "Add a second if needed",
        detail: "If one fully-tightened tourniquet doesn't stop the bleeding, add a second one right above the first, closer to the body.",
      },
    ],
    cautionLabel: "Never",
    caution: "Never use a tourniquet on a neck, chest, abdomen, or groin wound. Keep the person warm and monitor breathing.",
  },

  "Chest and abdominal trauma (open chest wound)": {
    subtitle: "For a wound that penetrates the chest wall",
    callNow:
      "Treat any open chest wound as immediately life-threatening. Get help moving any way you actually have (call, radio, transport) while you manage the wound below.",
    steps: [
      {
        headline: "Don't remove objects",
        detail: "Do not remove an embedded object. Stabilize it in place with bulky dressings.",
      },
      {
        headline: "Cover the wound",
        detail: "It's reasonable to leave the wound open to air, use a clean nonocclusive dressing, or use a purpose-made vented chest seal.",
      },
      {
        headline: "Watch breathing",
        detail: "Watch breathing continuously. If it worsens after any dressing or seal is applied, loosen or remove it.",
      },
      {
        headline: "Never seal and walk away",
        detail: "Do not insert anything into the chest yourself, and do not seal it fully airtight and then stop watching.",
      },
    ],
    cautionLabel: "Never",
    caution: "Never insert anything into the wound yourself, and never seal it fully airtight without continuing to watch the person's breathing.",
  },
};
