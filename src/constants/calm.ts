// Calm design tokens: white/gray shell, one quiet teal accent, red reserved
// only for Call 911 and the Emergency Now row — never used decoratively.
export const RED = "#B3261E";
export const RED_DARK = "#7A1913";
export const TEAL = "#3B6E71";

export const Calm = {
  light: {
    bg: "#F6F7F8",
    card: "#FFFFFF",
    cardBorder: "#ECEEF1",
    iconBg: "#EEF3F3",
    emergencyIconBg: "#FBEAE7",
    text: "#1C2126",
    textSecondary: "#6B7280",
    chevron: "#C7CCD2",
  },
  dark: {
    bg: "#15181C",
    card: "#1E2227",
    cardBorder: "#2A2F35",
    iconBg: "#232B2B",
    emergencyIconBg: "#331E1B",
    text: "#EDEFF2",
    textSecondary: "#9AA3AD",
    chevron: "#4A515A",
  },
} as const;
