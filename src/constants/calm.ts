// Design tokens.
//
// Dark by default: if the grid is down the battery is the lifeline, and a dark
// ground draws measurably less of it on an OLED screen.
//
//   Deep Navy     #101A2E   the ground
//   Soft Dusty Blue #9FB2BF  the header. It is the one light, soft thing on
//                            the page, and it fades — #B3C3CE at the top down
//                            to #8499A8 at the bottom — rather than sitting as
//                            a flat block.
//
// Because it is light, the type on it is dark like the cards rather than cream.
// That was forced by measurement, not taste: a colour pale enough to read as
// soft cannot carry cream text at 7:1, but it carries near-black at 8.2:1.
//   Off-White     #F2F0EA   every card, warmed and dimmed rather than pure white
//
// The signals are muted on purpose. They still mean exactly what they meant —
// red for danger to life, orange for severe weather, green for clear — but a
// card is outlined in them rather than filled with them, so the page reads as
// quiet until something on it actually matters.
//
//   Brick Red     #A8524C   immediate danger to life, and nothing else
//   Clay Orange   #B57A46   severe weather and evacuation
//   Moss Green    #5E8468   clear, safe, handled
//   Slate Teal    #42707E   everything else
//
// Contrast is measured, not assumed. Somebody may be reading this in glare or
// in a dark basement, so every piece of text clears WCAG AAA at 7:1. The muted
// signals sit between 3.2 and 4.8 on off-white, which is right for an outline
// and not readable as small type — so each carries a darker twin used only for
// words, same meaning, readable.

export const Calm = {
  light: {
    // --- surfaces -------------------------------------------------------
    bg: "#101A2E",
    headerBg: "#9FB2BF",
    headerFadeTop: "#B3C3CE",
    headerFadeBottom: "#8499A8",
    // The raised panel that holds the header and the two things somebody
    // reaches for first. A light edge does nearly all the work of looking
    // lifted on a dark ground — a drop shadow on navy is almost invisible.
    panelEdge: "#9FB2BF",
    panelFill: "#17243D",
    card: "#F2F0EA",
    cardBorder: "#D3D0C8",

    // --- text (all AAA) ---------------------------------------------------
    text: "#15171A",
    textSecondary: "#3F444A",
    onBg: "#F2F0EA",
    onBgSoft: "#D8DDE0",
    onBlue: "#15171A",
    onBlueSoft: "#39424A",

    // --- signals: the outline colour, then the colour for words -----------
    blue: "#42707E",
    blueText: "#274753",
    blueSoft: "#E2E9EB",
    blueDeep: "#18333C",

    danger: "#A8524C",
    dangerText: "#7E2A24",
    dangerSoft: "#EFE2E0",

    orange: "#B57A46",
    orangeText: "#734418",
    orangeSoft: "#F0E7DC",

    sage: "#5E8468",
    sageText: "#335743",
    sageSoft: "#E1E9E3",

    plum: "#6B5A76",
    plumText: "#453A4D",
    plumSoft: "#E7E3EA",

    priorityUrgent: "#A8524C",
    priorityImportant: "#B57A46",
    priorityGoodToKnow: "#42707E",
  },
  dark: {
    // Identical to the other scheme on purpose. The app is dark either way, and
    // letting the phone's setting swap the navy ground for true black meant two
    // people could install the same build and see two different apps.
    // --- surfaces -------------------------------------------------------
    bg: "#101A2E",
    headerBg: "#9FB2BF",
    headerFadeTop: "#B3C3CE",
    headerFadeBottom: "#8499A8",
    // The raised panel that holds the header and the two things somebody
    // reaches for first. A light edge does nearly all the work of looking
    // lifted on a dark ground — a drop shadow on navy is almost invisible.
    panelEdge: "#9FB2BF",
    panelFill: "#17243D",
    card: "#F2F0EA",
    cardBorder: "#D3D0C8",

    // --- text (all AAA) ---------------------------------------------------
    text: "#15171A",
    textSecondary: "#3F444A",
    onBg: "#F2F0EA",
    onBgSoft: "#D8DDE0",
    onBlue: "#15171A",
    onBlueSoft: "#39424A",

    // --- signals: the outline colour, then the colour for words -----------
    blue: "#42707E",
    blueText: "#274753",
    blueSoft: "#E2E9EB",
    blueDeep: "#18333C",

    danger: "#A8524C",
    dangerText: "#7E2A24",
    dangerSoft: "#EFE2E0",

    orange: "#B57A46",
    orangeText: "#734418",
    orangeSoft: "#F0E7DC",

    sage: "#5E8468",
    sageText: "#335743",
    sageSoft: "#E1E9E3",

    plum: "#6B5A76",
    plumText: "#453A4D",
    plumSoft: "#E7E3EA",

    priorityUrgent: "#A8524C",
    priorityImportant: "#B57A46",
    priorityGoodToKnow: "#42707E",
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
