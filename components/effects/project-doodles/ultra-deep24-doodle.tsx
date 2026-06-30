import { Connector, DoodleFrame, Pipe, RAIL_Y, Step } from "./pipeline-primitives";

const STEPS = [
  { x: 12, w: 56, label: "Voice" },
  { x: 84, w: 72, label: "Profile" },
  { x: 172, w: 56, label: "Route" },
];

export function UltraDeep24Doodle({ className }: { className?: string }) {
  return (
    <DoodleFrame viewWidth={240} className={className}>
      {STEPS.map((step, i) => (
        <g key={step.label}>
          <Step x={step.x} w={step.w} label={step.label} />
          {i < STEPS.length - 1 && (
            <>
              <Pipe x={step.x + step.w + 2} width={12} />
              <Connector x={step.x + step.w + 16} y={RAIL_Y} />
            </>
          )}
        </g>
      ))}
    </DoodleFrame>
  );
}
