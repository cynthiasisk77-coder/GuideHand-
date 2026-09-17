// Design tokens.
//
// Dark by default, on purpose. If the grid is down and there is no signal, the
// battery is the lifeline — and a dark ground on the OLED and AMOLED screens
// most phones now have draws measurably less of it. A bright app is a shorter
// one.
//
//   Deep Charcoal   #1C1F22   the ground
//   Deep Teal       #1A4D62   the calming anchor — headers, the app's own voice
//   Cream White     #F8F9FA   every card, and text on the dark
//   Vivid Crimson   #D9383A   immediate danger to life. Nothing else, ever.
//   Safety Orange   #FF7A00   severe weather, and warnings about being offline
//   Medical Green   #27AE60   clear, safe, or handled
//
// Contrast is the other half of this. Somebody reading it may be outdoors in
// glare or in a dark basement, so text is near-black on cream or cream on
// charcoal and never a soft grey in between — both of those pairs clear 15:1,
// well past WCAG AAA.
//
// The signal colours are tuned for being seen, not for being read. #D9383A and
// #FF7A00 are right on a button or a border and fail badly as small text on
// cream — 4.4:1 and 2.5:1, well under the 7:1 AAA needs. So each has a darker
// twin used only for words:
//
//   dangerText  #9B1B14   7.8:1
//   orangeText  #853F00   7.4:1
//   sageText    #0E5A2E   7.9:1
//
// Same meaning, readable in glare. The bright versions stay for anything the
// eye is meant to catch rather than parse.

export const Calm = {
  light: {
    // --- surfaces -------------------------------------------------------
    bg: "#1C1F22",
    headerBg: "#1A4D62",
    card: "#F8F9FA",
    cardBorder: "#D4DADE",

    // --- text ------------------------------------------------------------
    // On a cream card. 17:1 — AAA with room to spare.
    text: "#121417",
    // Still dark enough to clear AAA rather than being a soft grey.
    textSecondary: "#3D4549",
    // On the charcoal ground. 15:1.
    onBg: "#F8F9FA",
    onBgSoft: "#DCE1E4",

    // --- the anchor -------------------------------------------------------
    blue: "#1A4D62",
    blueSoft: "#DCE9EE",
    blueDeep: "#123A4B",
    onBlue: "#F8F9FA",
    onBlueSoft: "#D9E7EC",

    // --- signals ----------------------------------------------------------
    // Life-threatening, and nothing else.
    danger: "#D9383A",
    dangerText: "#9B1B14",
    dangerSoft: "#FBE0E0",
    // Severe weather, evacuation, and offline warnings.
    orange: "#FF7A00",
    orangeText: "#853F00",
    orangeSoft: "#FFE8D1",
    // Clear, safe, handled.
    sage: "#1F8A4C",
    sageText: "#0E5A2E",
    sageSoft: "#DCF0E4",
    plum: "#5E4A6B",
    plumSoft: "#E6DFEC",

    priorityUrgent: "#D9383A",
    priorityImportant: "#FF7A00",
    priorityGoodToKnow: "#1A4D62",
  },
  dark: {
    // Already dark-first, so this only deepens the ground for OLED.
    // --- surfaces -------------------------------------------------------
    bg: "#000000",
    headerBg: "#1A4D62",
    card: "#F8F9FA",
    cardBorder: "#D4DADE",

    // --- text ------------------------------------------------------------
    // On a cream card. 17:1 — AAA with room to spare.
    text: "#121417",
    // Still dark enough to clear AAA rather than being a soft grey.
    textSecondary: "#3D4549",
    // On the charcoal ground. 15:1.
    onBg: "#F8F9FA",
    onBgSoft: "#DCE1E4",

    // --- the anchor -------------------------------------------------------
    blue: "#1A4D62",
    blueSoft: "#DCE9EE",
    blueDeep: "#123A4B",
    onBlue: "#F8F9FA",
    onBlueSoft: "#D9E7EC",

    // --- signals ----------------------------------------------------------
    // Life-threatening, and nothing else.
    danger: "#D9383A",
    dangerText: "#9B1B14",
    dangerSoft: "#FBE0E0",
    // Severe weather, evacuation, and offline warnings.
    orange: "#FF7A00",
    orangeText: "#853F00",
    orangeSoft: "#FFE8D1",
    // Clear, safe, handled.
    sage: "#1F8A4C",
    sageText: "#0E5A2E",
    sageSoft: "#DCF0E4",
    plum: "#5E4A6B",
    plumSoft: "#E6DFEC",

    priorityUrgent: "#D9383A",
    priorityImportant: "#FF7A00",
    priorityGoodToKnow: "#1A4D62",
  },
} as const;

export const Fonts = {
  display: "Fraunces_700Bold",
  displaySemibold: "Fraunces_600SemiBold",
  body: "Karla_400Regular",
  bodyMedium: "Karla_500Medium",
  bodySemibold: "Karla_600SemiBold",
  bodyBold: "Karla_700Bold",
  mono: "IBMPlexMono_600SemiBold",
  monoMedium: "IBMPlexMono_500Medium",
} as const;
