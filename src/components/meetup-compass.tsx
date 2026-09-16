import Svg, { Circle, G, Line, Path, Text as SvgText } from 'react-native-svg';

import { Fonts } from '@/constants/calm';

interface MeetupCompassProps {
  /** Where to point, in degrees clockwise. See `headingKnown` for the frame of reference. */
  rotation: number;
  /**
   * True when the phone's compass is working, so the needle points at the real
   * direction you should walk. False means the needle is drawn relative to true
   * north, to be lined up against a map or a baseplate compass.
   */
  headingKnown: boolean;
  size?: number;
  ring: string;
  tick: string;
  needle: string;
  label: string;
}

const VIEWBOX = 120;
const CENTER = VIEWBOX / 2;

// Cardinal letters around the dial. Offsets are from the center of the circle.
const CARDINALS: { letter: string; dx: number; dy: number }[] = [
  { letter: 'N', dx: 0, dy: -41 },
  { letter: 'E', dx: 41, dy: 0 },
  { letter: 'S', dx: 0, dy: 41 },
  { letter: 'W', dx: -41, dy: 0 },
];

export function MeetupCompass({
  rotation,
  headingKnown,
  size = 132,
  ring,
  tick,
  needle,
  label,
}: MeetupCompassProps) {
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} fill="none">
      <Circle cx={CENTER} cy={CENTER} r={52} stroke={ring} strokeWidth={1.6} />
      <Circle cx={CENTER} cy={CENTER} r={33} stroke={ring} strokeWidth={1} strokeDasharray="2 4" />

      {/* Degree ticks every 30° so the dial reads like a real bezel. */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const inner = i % 3 === 0 ? 42 : 46;
        return (
          <Line
            key={i}
            x1={CENTER + Math.sin(angle) * inner}
            y1={CENTER - Math.cos(angle) * inner}
            x2={CENTER + Math.sin(angle) * 51}
            y2={CENTER - Math.cos(angle) * 51}
            stroke={tick}
            strokeWidth={i % 3 === 0 ? 1.8 : 1}
            strokeLinecap="round"
          />
        );
      })}

      {CARDINALS.map(({ letter, dx, dy }) => (
        <SvgText
          key={letter}
          x={CENTER + dx}
          y={CENTER + dy + 4}
          fill={tick}
          fontSize={11}
          fontFamily={Fonts.mono}
          textAnchor="middle">
          {letter}
        </SvgText>
      ))}

      <G transform={`rotate(${rotation} ${CENTER} ${CENTER})`}>
        {/* Arrow head plus shaft, drawn pointing straight up, then rotated. */}
        <Path
          d={`M${CENTER} ${CENTER - 38} L${CENTER - 10} ${CENTER - 16} L${CENTER} ${CENTER - 21} L${CENTER + 10} ${CENTER - 16} Z`}
          fill={needle}
        />
        <Line
          x1={CENTER}
          y1={CENTER - 20}
          x2={CENTER}
          y2={CENTER + 26}
          stroke={needle}
          strokeWidth={3}
          strokeLinecap="round"
          strokeOpacity={headingKnown ? 1 : 0.55}
        />
      </G>

      <Circle cx={CENTER} cy={CENTER} r={4} fill={needle} />

      <SvgText
        x={CENTER}
        y={VIEWBOX - 3}
        fill={tick}
        fontSize={9.5}
        fontFamily={Fonts.mono}
        textAnchor="middle">
        {label}
      </SvgText>
    </Svg>
  );
}
