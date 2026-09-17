// Design tokens.
//
// Everything sits in one pale blue-green family, in three steps: the page is
// the middle tone, cards lift a shade above it, and the header block on each
// screen drops two shades below. That ordering is what gives depth without any
// white and without a single hard line — a card reads as raised because it is
// lighter than the page, not because it has been outlined.
//
// The text is a deep blue-green rather than a warm black, because warm text on
// a cool ground reads as a mistake.
//
// Colour still lives at the edges: each screen carries its identity in a
// coloured left edge, not a block of fill. Red stays reserved for genuinely
// life-threatening signals — the What To Do In An Emergency row and P0
// priority — and is never used decoratively.
export const Calm = {
  light: {
    // The three steps, lightest to darkest: card, page, header.
    card: "#F3F9F7",
    bg: "#E6F0ED",
    headerBg: "#D1E3DE",
    cardBorder: "#C2D6D1",
    text: "#1C2A27",
    textSecondary: "#5F7169",
    blue: "#33607A",
    blueSoft: "#C4DBE6",
    blueDeep: "#1E3A54",
    onBlue: "#F3F9F7",
    onBlueSoft: "#A9C0CE",
    sage: "#5E7F55",
    sageSoft: "#D2E3C5",
    plum: "#7A5670",
    plumSoft: "#E3D2DD",
    danger: "#B3261E",
    dangerSoft: "#F6D9D4",
    orange: "#B0601A",
    orangeSoft: "#F2DBBE",
    priorityUrgent: "#6E8FA8",
    priorityImportant: "#6E9455",
    priorityGoodToKnow: "#BE9A3E",
  },
  dark: {
    // Same three steps, same family, inverted: the card is the lightest.
    card: "#15201E",
    bg: "#0D1614",
    headerBg: "#1B2926",
    cardBorder: "#2B3C38",
    text: "#E5EFEC",
    textSecondary: "#8FA39D",
    blue: "#8FB0C4",
    blueSoft: "#263A44",
    blueDeep: "#2E4E6C",
    onBlue: "#F2ECDF",
    onBlueSoft: "#A9C0CE",
    sage: "#9EBB88",
    sageSoft: "#2C3924",
    plum: "#C6A0BC",
    plumSoft: "#3A2C37",
    danger: "#E8897F",
    dangerSoft: "#3A1F1C",
    orange: "#E0975A",
    orangeSoft: "#3D2A1A",
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
