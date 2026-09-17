// Design tokens.
//
// A dark ground with white cards on it. The page is the darkest thing, the
// header block sits a step above it, and the cards are white — so the eye goes
// to the content, and the app itself recedes. That ordering is deliberate: at
// night, in a power cut, a wall of bright screen is the wrong thing to hand
// somebody, but the words they need to read should still be black on white.
//
// The scale, darkest to lightest:
//
//   page     #0F1A21   the ground
//   header   #263A47   a step up from it, on every screen
//   edge     #3A5464   borders on the dark, dividers
//   steel    #8FA9B9   labels and secondary text sitting on the dark
//   mist     #D5E0E7   borders on white cards
//   card     #FFFFFF   white, always
//
// Cards carry their identity in a coloured left edge, never a fill. Red is
// reserved for genuinely life-threatening signals and is never decorative.

export const Calm = {
  light: {
    card: "#FFFFFF",
    bg: "#0F1A21",
    headerBg: "#263A47",
    cardBorder: "#D5E0E7",
    // Text on a white card.
    text: "#12202A",
    textSecondary: "#5A7080",
    // Text and labels sitting directly on the dark ground.
    onBg: "#E8F0F5",
    onBgSoft: "#8FA9B9",
    blue: "#2E6083",
    blueSoft: "#DCEAF2",
    blueDeep: "#1B3A52",
    onBlue: "#EAF2F7",
    onBlueSoft: "#A2BCCB",
    sage: "#3F6B58",
    sageSoft: "#DAE8E2",
    plum: "#5E4A6B",
    plumSoft: "#E3DCEA",
    danger: "#A3160C",
    dangerSoft: "#F7DEDB",
    orange: "#8F4507",
    orangeSoft: "#F9E5D0",
    priorityUrgent: "#45708F",
    priorityImportant: "#4E7A63",
    priorityGoodToKnow: "#8C6F2A",
  },
  dark: {
    // Already dark by default, so this only deepens the ground a little.
    card: "#FFFFFF",
    bg: "#080F14",
    headerBg: "#1D2E39",
    cardBorder: "#D5E0E7",
    text: "#12202A",
    textSecondary: "#5A7080",
    onBg: "#E8F0F5",
    onBgSoft: "#8FA9B9",
    blue: "#2E6083",
    blueSoft: "#DCEAF2",
    blueDeep: "#1B3A52",
    onBlue: "#EAF2F7",
    onBlueSoft: "#A2BCCB",
    sage: "#3F6B58",
    sageSoft: "#DAE8E2",
    plum: "#5E4A6B",
    plumSoft: "#E3DCEA",
    danger: "#A3160C",
    dangerSoft: "#F7DEDB",
    orange: "#8F4507",
    orangeSoft: "#F9E5D0",
    priorityUrgent: "#45708F",
    priorityImportant: "#4E7A63",
    priorityGoodToKnow: "#8C6F2A",
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
