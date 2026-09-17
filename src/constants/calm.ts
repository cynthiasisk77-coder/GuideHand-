// Design tokens.
//
// One blue family, run as a proper scale from near-black to near-white, so the
// app has range instead of sitting in a single pastel band. Pastel is the thing
// that makes a tool look like a toy: everything at the same lightness, nothing
// carrying weight.
//
// The scale, and where each step is used:
//
//   ink      #10202F   the darkest thing on screen — pinned rows, header block
//   deep     #1B3A52   headings and strong edges
//   mid      #2E5F80   links, active state, icons that need to carry
//   steel    #6C8CA4   secondary text on light ground
//   haze     #C3D2DE   borders
//   page     #DDE6EE   the ground everything sits on
//   card     #FFFFFF   white, always, with a coloured edge for identity
//
// Cards stay white with a border because a filled card reads as a warning even
// when it is only a category. The two pinned rows are the exception and are
// filled dark on purpose: they are the only rows that should look like
// equipment rather than paper.
//
// Red is reserved for genuinely life-threatening signals and never used
// decoratively.

export const Calm = {
  light: {
    card: "#FFFFFF",
    bg: "#DDE6EE",
    headerBg: "#10202F",
    cardBorder: "#C3D2DE",
    text: "#10202F",
    textSecondary: "#5A7387",
    blue: "#2E5F80",
    blueSoft: "#D6E4EE",
    blueDeep: "#1B3A52",
    // Text sitting on the dark header block.
    onBlue: "#EAF1F6",
    onBlueSoft: "#9DB6C7",
    sage: "#3F6B58",
    sageSoft: "#D8E7E0",
    plum: "#5E4A6B",
    plumSoft: "#E1DAE8",
    // Signal red, at the strength a warning light is. Paler goes pink.
    danger: "#A3160C",
    dangerSoft: "#F6DCD9",
    // Safety orange rather than tan — the colour of actual rescue equipment.
    orange: "#9A4A08",
    orangeSoft: "#F8E2CE",
    priorityUrgent: "#45708F",
    priorityImportant: "#4E7A63",
    priorityGoodToKnow: "#8C6F2A",
  },
  dark: {
    // Same scale, read from the other end.
    card: "#152430",
    bg: "#0A141C",
    headerBg: "#050D13",
    cardBorder: "#27404F",
    text: "#E6EFF5",
    textSecondary: "#8FA8B9",
    blue: "#7FAECD",
    blueSoft: "#152F3F",
    blueDeep: "#0F2433",
    onBlue: "#E6EFF5",
    onBlueSoft: "#9DB6C7",
    sage: "#83B39B",
    sageSoft: "#162A22",
    plum: "#A992BB",
    plumSoft: "#241C2C",
    danger: "#F0655A",
    dangerSoft: "#33130F",
    orange: "#E08B3C",
    orangeSoft: "#2E1C0A",
    priorityUrgent: "#8DB2CC",
    priorityImportant: "#8FB89F",
    priorityGoodToKnow: "#C6A65C",
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
