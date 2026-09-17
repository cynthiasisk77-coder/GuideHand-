// Design tokens.
//
// The page is a pale blue-green. Cards sitting on it are white, and their
// identity comes from a coloured border, never a coloured fill — a filled card
// reads as a warning even when it is only a category, and a pale red fill in
// particular reads as pink rather than as danger. The header block on each
// screen is the same blue-green two shades down, so the page has depth without
// the cards having to carry it.
//
// Red stays reserved for genuinely life-threatening signals — the What To Do In
// An Emergency row and P0 priority — and is never used decoratively.

export const Calm = {
  light: {
    // White cards on a pale blue-green page, header two shades down.
    card: "#FFFFFF",
    bg: "#E7F1EE",
    headerBg: "#CDE1DC",
    cardBorder: "#C6D9D4",
    text: "#1C2A27",
    textSecondary: "#5C6E67",
    blue: "#2F5D78",
    blueSoft: "#DCEAF1",
    blueDeep: "#1E3A54",
    onBlue: "#FFFFFF",
    onBlueSoft: "#A9C0CE",
    sage: "#587A4F",
    sageSoft: "#E1EDD6",
    plum: "#74506B",
    plumSoft: "#EEE0EA",
    // A true red, on white, at full strength. Anything paler goes pink.
    danger: "#B3261E",
    dangerSoft: "#FBE4E1",
    orange: "#A85715",
    orangeSoft: "#FAE7D2",
    priorityUrgent: "#5E82A0",
    priorityImportant: "#638C4C",
    priorityGoodToKnow: "#B08B31",
  },
  dark: {
    // Same relationships, inverted: the card is the lightest thing on screen.
    card: "#16211F",
    bg: "#0D1615",
    headerBg: "#1A2A27",
    cardBorder: "#2C3E3A",
    text: "#E4EFEB",
    textSecondary: "#93A8A2",
    blue: "#8FB0C4",
    blueSoft: "#1B303A",
    blueDeep: "#2E4E6C",
    onBlue: "#E4EFEB",
    onBlueSoft: "#A9C0CE",
    sage: "#9EBB88",
    sageSoft: "#20301F",
    plum: "#C6A0BC",
    plumSoft: "#31242E",
    danger: "#F2867A",
    dangerSoft: "#3A1F1C",
    orange: "#E0975A",
    orangeSoft: "#35240F",
    priorityUrgent: "#9FB8CC",
    priorityImportant: "#9CBB86",
    priorityGoodToKnow: "#D9BC72",
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
