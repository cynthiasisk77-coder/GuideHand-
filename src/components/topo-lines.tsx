// Contour lines, drawn faintly behind the header.
//
// A flat block of colour has nothing to look at. This is the cheapest honest
// way to give the top of the app some texture without decorating it: the same
// nested closed curves a topographic map uses for terrain, which is what this
// app is about in the first place. It reads as a field document rather than as
// a coloured rectangle.
//
// Deliberately faint and non-repeating. It should register as texture at a
// glance and never compete with the words on top of it.

import Svg, { G, Path } from 'react-native-svg';

interface TopoLinesProps {
  width: number;
  height: number;
  color: string;
  /** How strongly the lines read. Kept low — this is texture, not a picture. */
  opacity?: number;
}

// Two ridges of nested contours. The inner rings are tighter, the way real
// contours crowd where ground rises steeply.
const RIDGE_A = [
  'M-20 96 C 30 62, 78 60, 118 82 S 196 118, 250 94 S 330 48, 400 70',
  'M-20 82 C 28 50, 80 46, 122 70 S 198 106, 252 80 S 332 34, 400 56',
  'M-20 68 C 26 38, 82 32, 126 58 S 200 94, 254 66 S 334 20, 400 42',
  'M-6 54 C 30 28, 84 20, 128 46 S 202 82, 256 52 S 336 6, 400 28',
  'M 16 42 C 44 22, 88 12, 130 36 S 204 70, 258 40 S 338 -4, 400 16',
];

const RIDGE_B = [
  'M-20 150 C 40 128, 92 136, 140 156 S 214 186, 268 168 S 342 132, 400 148',
  'M-20 164 C 42 144, 94 152, 144 170 S 216 200, 270 182 S 344 148, 400 162',
  'M-20 178 C 44 160, 96 168, 148 184 S 218 214, 272 196 S 346 164, 400 176',
];

export function TopoLines({ width, height, color, opacity = 0.14 }: TopoLinesProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 380 200" preserveAspectRatio="xMidYMid slice">
      <G stroke={color} strokeWidth={1.1} fill="none" strokeLinecap="round" opacity={opacity}>
        {RIDGE_A.map((d, i) => (
          // The innermost rings sit slightly stronger, which is what gives the
          // impression of a rise rather than a stack of stripes.
          <Path key={`a${i}`} d={d} opacity={0.55 + i * 0.11} />
        ))}
        {RIDGE_B.map((d, i) => (
          <Path key={`b${i}`} d={d} opacity={0.5 - i * 0.08} />
        ))}
      </G>
    </Svg>
  );
}
