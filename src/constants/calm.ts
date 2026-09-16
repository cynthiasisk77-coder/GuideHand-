// Design tokens. Surfaces are white and the colour lives at the edges: a card
// is defined by its border, not by a fill, and each screen carries its identity
// in a coloured edge rather than a block of solid colour. Red stays reserved for
// genuinely life-threatening signals — the What To Do In An Emergency row and P0
// priority — and is never used decoratively.
export const Calm = {
  light: {
    bg: "#FFFFFF",
    card: "#FFFFFF",
    cardBorder: "#DFDCD5",
    text: "#221D17",
    textSecondary: "#7C7263",
    blue: "#3D5D77",
    blueSoft: "#CFDEE5",
    blueDeep: "#1E3A54",
    onBlue: "#F5EFE1",
    onBlueSoft: "#A9C0CE",
    sage: "#6E8659",
    sageSoft: "#DEE5D0",
    plum: "#7D5C74",
    plumSoft: "#E7DBE3",
    danger: "#B3261E",
    dangerSoft: "#F5DBD8",
    orange: "#B8641C",
    orangeSoft: "#F3DFC7",
    priorityUrgent: "#7C99B3",
    priorityImportant: "#7A9B5E",
    priorityGoodToKnow: "#C9A54A",
  },
  dark: {
    bg: "#0F0F11",
    card: "#17171A",
    cardBorder: "#31313A",
    text: "#F0E8D9",
    textSecondary: "#AA9E8B",
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
