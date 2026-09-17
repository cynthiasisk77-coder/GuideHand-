// Design tokens.
//
// Everything sits in one deep blue-green family, in three steps: the page is
// the middle tone, cards lift a shade above it, and the header block on each
// screen drops below. That ordering is what gives depth without a single hard
// line — a card reads as raised because it is lighter than the page, not
// because it has been outlined.
//
// Both schemes are dark. A preparedness app gets opened at night, in a power
// cut, by someone whose eyes have adjusted to the dark — and a pale screen in
// that moment is blinding and costs night vision that takes minutes to come
// back. The dark scheme simply goes deeper still.
//
// Colour still lives at the edges: each screen carries its identity in a
// coloured left edge, not a block of fill. Red stays reserved for genuinely
// life-threatening signals — the What To Do In An Emergency row and P0
// priority — and is never used decoratively.
export const Calm = {
  light: {
    // The three steps, lightest to darkest: card, page, header.
    card: "#1E3D37",
    bg: "#16302B",
    headerBg: "#0F2420",
    cardBorder: "#2C544C",
    text: "#E4EFEB",
    textSecondary: "#9BB3AC",
    blue: "#8CC0D8",
    blueSoft: "#1B3C49",
    blueDeep: "#0E2A3A",
    onBlue: "#E4EFEB",
    onBlueSoft: "#A9C0CE",
    sage: "#A3C88C",
    sageSoft: "#213A25",
    plum: "#CBA4C0",
    plumSoft: "#3A2A37",
    // Red has to carry across a dark ground without turning muddy or pink.
    danger: "#FF8A7E",
    dangerSoft: "#45201C",
    orange: "#E8A163",
    orangeSoft: "#432C18",
    priorityUrgent: "#8FB4CC",
    priorityImportant: "#9BC183",
    priorityGoodToKnow: "#D8B863",
  },
  dark: {
    // Same three steps, same family, deeper.
    card: "#122723",
    bg: "#0B1B18",
    headerBg: "#061210",
    cardBorder: "#1F3B35",
    text: "#DFEBE7",
    textSecondary: "#8AA29B",
    blue: "#8FB0C4",
    blueSoft: "#16303A",
    blueDeep: "#0A2030",
    onBlue: "#DFEBE7",
    onBlueSoft: "#A9C0CE",
    sage: "#9EBB88",
    sageSoft: "#1A2C1D",
    plum: "#C6A0BC",
    plumSoft: "#2F222C",
    danger: "#FF8A7E",
    dangerSoft: "#381916",
    orange: "#E0975A",
    orangeSoft: "#33220F",
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
