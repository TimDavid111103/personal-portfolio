import { Connector, DoodleFrame, Pipe, RAIL_Y, Step } from "./pipeline-primitives";

const STEPS = [
  { x: 8, w: 72, label: "Langfuse" },
  { x: 96, w: 56, label: "MCP" },
  { x: 168, w: 80, label: "Notion/XL" },
];

export function EvalSyncDoodle({ className }: { className?: string }) {
  return (
    <DoodleFrame viewWidth={260} className={className}>
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
