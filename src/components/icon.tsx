import Svg, { Path, Circle } from "react-native-svg";

// Hand-drawn line icons (no emoji, no external icon font) matching the calm
// design: single stroke color per icon, transparent fill.
const PATHS: Record<string, string> = {
  siren: "M6 18h12M7 18v-6a5 5 0 0 1 10 0v6M12 3v2M4.2 7.2 5.6 8.6M19.8 7.2 18.4 8.6M3 21h18",
  medical: "M3 12h3.5l2-4.5 3 9 2.5-6 1.5 3H21 M4 8.5a4.2 4.2 0 0 1 8-2 4.2 4.2 0 0 1 8 2c0 1-.2 1.9-.6 2.7M19 14.5c-1.6 2.5-4.4 4.6-7 6.2-2.6-1.6-5.4-3.7-7-6.2",
  storm: "M4 5h16M6 9h13M9 13h9M12 17h5M13 13l-3 8",
  water: "M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3z",
  home: "M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5M10 20v-5.5h4V20",
  car: "M4 16v-3.5l2-4.5h12l2 4.5V16M3 16h18v2.5h-3V16M6 18.5H3V16 M7 12.5h.01M17 12.5h.01",
  paw: "M12 11c-2.6 0-4.7 2-4.7 4.2 0 1.7 1.3 2.6 2.6 2.6 1 0 1.4-.4 2.1-.4s1.1.4 2.1.4c1.3 0 2.6-.9 2.6-2.6C16.7 13 14.6 11 12 11z",
  tools: "M15.5 3.5a4.5 4.5 0 0 0-5.2 6.2L4 16v4h4l6.3-6.3a4.5 4.5 0 0 0 6.2-5.2l-3 3-2.8-2.8z",
  plan: "M5 4h14v17H5z M9 3.5h6v2.5H9zM9 11h6M9 15h4",
  phone:
    "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  chevron: "m9 6 6 6-6 6",
};

const CIRCLES: Record<string, { cx: number; cy: number; r: number }[]> = {
  paw: [
    { cx: 7.5, cy: 8.5, r: 1.8 },
    { cx: 12, cy: 6.5, r: 1.8 },
    { cx: 16.5, cy: 8.5, r: 1.8 },
  ],
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 20, color = "#141413", strokeWidth = 1.9 }: IconProps) {
  const d = PATHS[name];
  if (!d) return null;
  const circles = CIRCLES[name];
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d={d} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {circles?.map((c, i) => (
        <Circle key={i} cx={c.cx} cy={c.cy} r={c.r} stroke={color} strokeWidth={strokeWidth} />
      ))}
    </Svg>
  );
}
