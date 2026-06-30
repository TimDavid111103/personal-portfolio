import { Connector, DoodleFrame, Pipe, RAIL_Y, Step } from "./pipeline-primitives";

const STEPS = [
  { x: 4, w: 52, label: "Chunk" },
  { x: 68, w: 56, label: "Embed" },
  { x: 136, w: 60, label: "Retrieve" },
  { x: 208, w: 56, label: "Stream" },
];

export function DocentAiDoodle({ className }: { className?: string }) {
  return (
    <DoodleFrame viewWidth={270} className={className}>
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
