import { Connector, DoodleFrame, Pipe, RAIL_Y, Step } from "./pipeline-primitives";

const STEPS = [
  { x: 4, w: 58, label: "Format" },
  { x: 74, w: 62, label: "Template" },
  { x: 148, w: 52, label: "Copy" },
  { x: 212, w: 52, label: "Image" },
  { x: 276, w: 52, label: "Style" },
];

export function Scale66Doodle({ className }: { className?: string }) {
  return (
    <DoodleFrame viewWidth={332} className={className}>
      {STEPS.map((step, i) => (
        <g key={step.label}>
          <Step x={step.x} w={step.w} label={step.label} />
          {i < STEPS.length - 1 && (
            <>
              <Pipe x={step.x + step.w + 2} width={10} />
              <Connector x={step.x + step.w + 14} y={RAIL_Y} />
            </>
          )}
        </g>
      ))}
    </DoodleFrame>
  );
}
