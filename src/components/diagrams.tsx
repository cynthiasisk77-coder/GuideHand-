import Svg, { Circle, Line, Path, Rect, Text as SvgText } from 'react-native-svg';

export interface DiagramProps {
  stroke: string;
  accent: string;
}

function StepMarker({ cx, cy, stroke, n }: { cx: number; cy: number; stroke: string; n: number }) {
  return (
    <>
      <Circle cx={cx} cy={cy} r={9} stroke={stroke} strokeWidth={1.6} fill="none" />
      <SvgText x={cx} y={cy + 3.5} fontSize={10} textAnchor="middle" fill={stroke}>
        {n}
      </SvgText>
    </>
  );
}

export function TourniquetDiagram({ stroke, accent }: DiagramProps) {
  return (
    <Svg width="100%" height={150} viewBox="0 0 280 150">
      {/* limb */}
      <Rect x={28} y={60} width={210} height={34} rx={17} stroke={stroke} strokeWidth={2} fill="none" />
      {/* wound mark near the hand end */}
      <Line x1={222} y1={68} x2={232} y2={80} stroke={accent} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={232} y1={68} x2={222} y2={80} stroke={accent} strokeWidth={2.5} strokeLinecap="round" />
      {/* band wrapped above the wound, toward the body */}
      <Line x1={140} y1={54} x2={140} y2={104} stroke={stroke} strokeWidth={3} />
      <Line x1={160} y1={54} x2={160} y2={104} stroke={stroke} strokeWidth={3} />
      <Rect x={136} y={46} width={28} height={12} rx={3} stroke={stroke} strokeWidth={2} fill="none" />
      {/* windlass rod, T-handle */}
      <Line x1={150} y1={46} x2={150} y2={20} stroke={stroke} strokeWidth={3} strokeLinecap="round" />
      <Line x1={137} y1={20} x2={163} y2={20} stroke={stroke} strokeWidth={3} strokeLinecap="round" />
      {/* twist arrow around the rod */}
      <Path d="M166 32a15 15 0 1 1 -5 -11" stroke={stroke} strokeWidth={1.6} fill="none" strokeLinecap="round" />
      <Path d="M159 18l4 4-6 1z" fill={stroke} />
      {/* clip securing the rod once twisted */}
      <Path d="M150 104v10a6 6 0 0 0 12 0v-6" stroke={stroke} strokeWidth={2} fill="none" strokeLinecap="round" />

      <StepMarker cx={150} cy={128} stroke={stroke} n={1} />
      <StepMarker cx={188} cy={128} stroke={stroke} n={2} />
      <StepMarker cx={226} cy={128} stroke={stroke} n={3} />
      <Line x1={150} y1={100} x2={150} y2={119} stroke={stroke} strokeWidth={1} strokeDasharray="2,2" />
      <Line x1={188} y1={30} x2={188} y2={119} stroke={stroke} strokeWidth={1} strokeDasharray="2,2" />
      <Line x1={226} y1={108} x2={226} y2={119} stroke={stroke} strokeWidth={1} strokeDasharray="2,2" />
    </Svg>
  );
}

export function CPRDiagram({ stroke, accent }: DiagramProps) {
  return (
    <Svg width="100%" height={150} viewBox="0 0 280 150">
      {/* simplified torso, front view */}
      <Path
        d="M90 20h100a18 18 0 0 1 18 18v70a18 18 0 0 1-18 18H90a18 18 0 0 1-18-18V38a18 18 0 0 1 18-18z"
        stroke={stroke}
        strokeWidth={2}
        fill="none"
      />
      {/* sternum centerline */}
      <Line x1={140} y1={24} x2={140} y2={122} stroke={stroke} strokeWidth={1} strokeDasharray="2,3" opacity={0.5} />
      {/* stacked hands at the center of the chest */}
      <Rect x={112} y={62} width={56} height={22} rx={11} stroke={accent} strokeWidth={2.2} fill="none" />
      <Rect x={118} y={56} width={44} height={18} rx={9} stroke={accent} strokeWidth={2.2} fill="none" />
      {/* downward compression arrow */}
      <Line x1={140} y1={96} x2={140} y2={122} stroke={stroke} strokeWidth={2} strokeLinecap="round" />
      <Path d="M132 114l8 12 8-12z" fill={stroke} />

      <StepMarker cx={210} cy={70} stroke={stroke} n={1} />
      <SvgText x={224} y={74} fontSize={9} fill={stroke}>
        center of chest
      </SvgText>
      <StepMarker cx={210} cy={98} stroke={stroke} n={2} />
      <SvgText x={224} y={102} fontSize={9} fill={stroke}>
        hard and fast
      </SvgText>
      <StepMarker cx={210} cy={126} stroke={stroke} n={3} />
      <SvgText x={224} y={130} fontSize={9} fill={stroke}>
        full recoil
      </SvgText>
    </Svg>
  );
}

export function ChestSealDiagram({ stroke, accent }: DiagramProps) {
  return (
    <Svg width="100%" height={150} viewBox="0 0 280 150">
      {/* simplified torso, front view */}
      <Path
        d="M85 18h110a16 16 0 0 1 16 16v78a16 16 0 0 1-16 16H85a16 16 0 0 1-16-16V34a16 16 0 0 1 16-16z"
        stroke={stroke}
        strokeWidth={2}
        fill="none"
      />
      {/* wound mark, upper chest */}
      <Circle cx={112} cy={58} r={4} stroke={accent} strokeWidth={2} fill="none" />
      {/* seal patch: taped on 3 sides, one side left open (dashed = vented) */}
      <Line x1={92} y1={40} x2={92} y2={78} stroke={stroke} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={92} y1={40} x2={134} y2={40} stroke={stroke} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={134} y1={40} x2={134} y2={78} stroke={stroke} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={92} y1={78} x2={134} y2={78} stroke={stroke} strokeWidth={2} strokeDasharray="3,3" />
      {/* small outward arrow at the open edge, showing trapped air/blood venting out */}
      <Path d="M113 84l0 10M108 90l5 6 5-6" stroke={accent} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />

      <StepMarker cx={190} cy={44} stroke={stroke} n={1} />
      <SvgText x={204} y={48} fontSize={9} fill={stroke}>
        cover the wound
      </SvgText>
      <StepMarker cx={190} cy={66} stroke={stroke} n={2} />
      <SvgText x={204} y={70} fontSize={9} fill={stroke}>
        tape 3 sides
      </SvgText>
      <StepMarker cx={190} cy={88} stroke={stroke} n={3} />
      <SvgText x={204} y={92} fontSize={9} fill={stroke}>
        leave one open
      </SvgText>
    </Svg>
  );
}
