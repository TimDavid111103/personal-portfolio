import { Connector, DoodleFrame, Pipe, RAIL_Y, Step } from "./pipeline-primitives";

const STEPS = [
  { x: 4, w: 58, label: "Scrape" },
  { x: 74, w: 68, label: "Summarize" },
  { x: 154, w: 52, label: "Rank" },
  { x: 218, w: 52, label: "Email" },
];

export function AiNewsDoodle({ className }: { className?: string }) {
  return (
    <DoodleFrame viewWidth={276} className={className}>
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
