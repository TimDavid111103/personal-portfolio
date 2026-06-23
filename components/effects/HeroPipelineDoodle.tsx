import { cn } from "@/lib/utils";

type HeroPipelineDoodleProps = {
  className?: string;
};

const RAIL_Y = 80;
const PIPE_TOP = 72;
const PIPE_H = 16;
const TUNNEL_START = 432;
const TUNNEL_END = 568;
const STEP_H = 46;
const VIEW_H = 178;
const ANCHOR_GAP = 26;

function stepCenter(step: { x: number; w: number }) {
  return step.x + step.w / 2;
}

function stepTop() {
  return RAIL_Y - STEP_H / 2;
}

function stepBottom() {
  return RAIL_Y + STEP_H / 2;
}

type StepVariant =
  | "trigger"
  | "queue"
  | "transform"
  | "condition"
  | "agent"
  | "rag"
  | "llm"
  | "output";

function ArrowHead({
  x,
  y,
  size = 4,
  direction = "right",
}: {
  x: number;
  y: number;
  size?: number;
  direction?: "right" | "down" | "up" | "left";
}) {
  if (direction === "down") {
    return <path d={`M${x - size * 0.7} ${y - size} L${x} ${y} L${x + size * 0.7} ${y - size}`} />;
  }
  if (direction === "up") {
    return <path d={`M${x - size * 0.7} ${y + size} L${x} ${y} L${x + size * 0.7} ${y + size}`} />;
  }
  if (direction === "left") {
    return <path d={`M${x + size} ${y - size * 0.7} L${x} ${y} L${x + size} ${y + size * 0.7}`} />;
  }
  return <path d={`M${x - size} ${y - size * 0.7} L${x} ${y} L${x - size} ${y + size * 0.7}`} />;
}

function PipeSegment({
  x,
  width,
  dashed = false,
}: {
  x: number;
  width: number;
  dashed?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={PIPE_TOP}
        width={width}
        height={PIPE_H}
        rx={PIPE_H / 2}
        fill="currentColor"
        fillOpacity="0.07"
      />
      <rect
        x={x}
        y={PIPE_TOP}
        width={width}
        height={PIPE_H}
        rx={PIPE_H / 2}
        strokeWidth="1.35"
        strokeDasharray={dashed ? "4 4" : undefined}
        opacity={dashed ? 0.55 : 1}
      />
      <path
        d={`M${x + 8} ${RAIL_Y} H${x + width - 8}`}
        strokeWidth="1"
        strokeDasharray="2 4"
        opacity="0.35"
      />
    </g>
  );
}

function StepPort({ x, r = 3 }: { x: number; r?: number }) {
  return (
    <circle
      cx={x}
      cy={RAIL_Y}
      r={r}
      fill="currentColor"
      fillOpacity="0.12"
      strokeWidth="1.2"
    />
  );
}

function StepBadge({
  x,
  y,
  w,
  ticks,
}: {
  x: number;
  y: number;
  w: number;
  ticks: number[];
}) {
  return (
    <g opacity="0.7">
      <rect
        x={x}
        y={y}
        width={w}
        height={8}
        rx={4}
        fill="currentColor"
        fillOpacity="0.08"
        strokeWidth="1"
      />
      {ticks.map((len, i) => (
        <path
          key={i}
          d={`M${x + 5 + i * 7} ${y + 4} H${x + 5 + i * 7 + len}`}
          strokeWidth="1.1"
        />
      ))}
    </g>
  );
}

function PipelineStep({
  x,
  w,
  h,
  variant,
  badgeTicks,
  children,
  lines,
  statusDot,
}: {
  x: number;
  w: number;
  h: number;
  variant: StepVariant;
  badgeTicks: number[];
  children: React.ReactNode;
  lines: [number, number, number][];
  statusDot?: "live" | "wait" | "ok";
}) {
  const y = RAIL_Y - h / 2;
  const shellProps = {
    trigger: { rx: 9, fill: 0.11, stroke: 1.55, dash: undefined },
    queue: { rx: 5, fill: 0.08, stroke: 1.4, dash: undefined },
    transform: { rx: 3, fill: 0.09, stroke: 1.45, dash: undefined },
    condition: { rx: 4, fill: 0.1, stroke: 1.5, dash: "3 2" as const },
    agent: { rx: 8, fill: 0.12, stroke: 1.65, dash: undefined },
    rag: { rx: 6, fill: 0.09, stroke: 1.45, dash: undefined },
    llm: { rx: 5, fill: 0.11, stroke: 1.55, dash: undefined },
    output: { rx: 7, fill: 0.13, stroke: 1.7, dash: undefined },
  }[variant];

  return (
    <g>
      <StepBadge x={x + 4} y={y - 11} w={w - 8} ticks={badgeTicks} />

      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={shellProps.rx}
        fill="currentColor"
        fillOpacity={shellProps.fill}
      />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={shellProps.rx}
        strokeWidth={shellProps.stroke}
        strokeDasharray={shellProps.dash}
      />

      {/* Variant accents */}
      {variant === "trigger" && (
        <>
          <path d={`M${x + 6} ${y + 6} H${x + w - 6}`} strokeWidth="1" opacity="0.45" />
          <circle cx={x + 10} cy={y + 6} r={1.5} fill="currentColor" stroke="none" />
          <path
            d={`M${x + w / 2} ${y - 4} a10 10 0 1 1 0.1 0`}
            strokeWidth="1"
            opacity="0.35"
          />
          <path
            d={`M${x + w / 2} ${y - 1} a6 6 0 1 1 0.1 0`}
            strokeWidth="1"
            opacity="0.5"
          />
        </>
      )}

      {variant === "queue" && (
        <>
          <rect
            x={x + 5}
            y={y + h - 8}
            width={w - 10}
            height={4}
            rx={1}
            fill="currentColor"
            fillOpacity="0.1"
            strokeWidth="1"
          />
          <path d={`M${x + 4} ${y + 10} V${y + h - 4}`} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
          <path d={`M${x + w - 4} ${y + 10} V${y + h - 4}`} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
        </>
      )}

      {variant === "transform" && (
        <>
          <path d={`M${x + 3} ${y + 8} L${x + 7} ${y + 4} M${x + 3} ${y + 8} L${x + 7} ${y + 12}`} strokeWidth="1.2" />
          <path d={`M${x + w - 3} ${y + 8} L${x + w - 7} ${y + 4} M${x + w - 3} ${y + 8} L${x + w - 7} ${y + 12}`} strokeWidth="1.2" />
          <path d={`M${x + 3} ${y + h - 8} L${x + 7} ${y + h - 4} M${x + 3} ${y + h - 8} L${x + 7} ${y + h - 12}`} strokeWidth="1.2" />
          <path d={`M${x + w - 3} ${y + h - 8} L${x + w - 7} ${y + h - 4} M${x + w - 3} ${y + h - 8} L${x + w - 7} ${y + h - 12}`} strokeWidth="1.2" />
        </>
      )}

      {variant === "condition" && (
        <>
          <path
            d={`M${x + w / 2} ${y + 4} L${x + w - 6} ${y + h / 2} L${x + w / 2} ${y + h - 4} L${x + 6} ${y + h / 2} Z`}
            strokeWidth="1"
            opacity="0.35"
          />
          <path d={`M${x + w / 2} ${y + h + 2} V${y + h + 8}`} strokeWidth="1.1" opacity="0.5" />
          <path d={`M${x + w / 2 - 4} ${y + h + 8} H${x + w / 2 + 4}`} strokeWidth="1.1" opacity="0.5" />
        </>
      )}

      {variant === "agent" && (
        <>
          <path d={`M${x + 8} ${y + 6} H${x + w - 8}`} strokeWidth="1" opacity="0.4" />
          <circle cx={x + 12} cy={y + 6} r={1.5} fill="currentColor" stroke="none" />
          <circle cx={x + w - 12} cy={y + 6} r={1.5} fill="currentColor" stroke="none" />
          <circle cx={x + w / 2} cy={y + 6} r={1.5} fill="currentColor" stroke="none" />
        </>
      )}

      {variant === "rag" && (
        <>
          <path d={`M${x + w / 2 - 1} ${y + 8} V${y + h - 6}`} strokeWidth="1" opacity="0.35" />
          <path d={`M${x + 8} ${y + 14} H${x + w / 2 - 4}`} strokeWidth="1" opacity="0.3" />
          <path d={`M${x + w / 2 + 4} ${y + 14} H${x + w - 8}`} strokeWidth="1" opacity="0.3" />
        </>
      )}

      {variant === "llm" && (
        <>
          {[18, 24, 30].map((ly) => (
            <path
              key={ly}
              d={`M${x + 8} ${y + ly} H${x + w - 8}`}
              strokeWidth="1"
              opacity="0.25"
            />
          ))}
          <path d={`M${x + w - 6} ${y + 6} L${x + w - 2} ${y + 10} L${x + w - 6} ${y + 14}`} strokeWidth="1.1" opacity="0.5" />
        </>
      )}

      {variant === "output" && (
        <>
          <path d={`M${x + 6} ${y + 6} H${x + w - 6}`} strokeWidth="1.1" opacity="0.45" />
          <path d={`M${x + w - 10} ${y + 8} L${x + w - 6} ${y + 12} L${x + w - 14} ${y + 12} Z`} fill="currentColor" fillOpacity="0.2" strokeWidth="1.1" />
        </>
      )}

      {statusDot === "live" && (
        <circle cx={x + w - 7} cy={y + 7} r={2} fill="currentColor" stroke="none" opacity="0.8" />
      )}
      {statusDot === "wait" && (
        <circle cx={x + w - 7} cy={y + 7} r={2} strokeWidth="1.1" opacity="0.7" />
      )}
      {statusDot === "ok" && (
        <path d={`M${x + w - 10} ${y + 7} L${x + w - 7} ${y + 10} L${x + w - 3} ${y + 4}`} strokeWidth="1.2" />
      )}

      <g transform={`translate(${x + w / 2}, ${y + 17})`}>{children}</g>

      {lines.map(([lx, ly, len], i) => (
        <path
          key={i}
          d={`M${x + lx} ${y + ly} H${x + lx + len}`}
          strokeWidth="1.05"
          opacity={0.55 + i * 0.15}
        />
      ))}

      <StepPort x={x} />
      <StepPort x={x + w} />
    </g>
  );
}

function TriggerIcon() {
  return (
    <g strokeWidth="1.3">
      <path d="M0 -9 L5 0 L-1 0 L3 9 L-5 0 L1 0 Z" fill="currentColor" fillOpacity="0.22" />
      <path d="M0 -9 L5 0 L-1 0 L3 9 L-5 0 L1 0 Z" />
      <path d="M-8 6 H8" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
    </g>
  );
}

function QueueIcon() {
  return (
    <g strokeWidth="1.15">
      <rect x={-10} y={-7} width={20} height={6} rx={1.5} fill="currentColor" fillOpacity="0.1" />
      <rect x={-10} y={-7} width={20} height={6} rx={1.5} />
      <rect x={-8} y={1} width={16} height={6} rx={1.5} fill="currentColor" fillOpacity="0.08" />
      <rect x={-8} y={1} width={16} height={6} rx={1.5} />
      <path d="M-4 4 H4 M-6 10 H2" opacity="0.65" strokeWidth="1" />
    </g>
  );
}

function TransformIcon() {
  return (
    <g strokeWidth="1.2">
      <path d="M-10 -2 H6 M-10 2 H2 M-10 6 H5" opacity="0.8" />
      <path d="M-12 -6 L-8 -2 L-12 2" strokeWidth="1.3" />
      <path d="M8 -6 L12 -2 L8 2" strokeWidth="1.3" />
      <circle cx={9} cy={6} r={1.5} fill="currentColor" stroke="none" />
    </g>
  );
}

function ConditionIcon() {
  return (
    <g strokeWidth="1.25">
      <path d="M0 -10 L10 0 L0 10 L-10 0 Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M0 -10 L10 0 L0 10 L-10 0 Z" />
      <path d="M-4 0 H4" />
      <path d="M0 -4 V4" strokeWidth="1" opacity="0.5" />
      <path d="M-12 0 H-8 M8 0 H12" strokeWidth="1" opacity="0.45" />
    </g>
  );
}

function AgentIcon() {
  return (
    <g strokeWidth="1.1">
      <circle cx={0} cy={-2} r={5} fill="currentColor" fillOpacity="0.1" />
      <circle cx={0} cy={-2} r={5} />
      <circle cx={-9} cy={6} r={3.5} />
      <circle cx={9} cy={6} r={3.5} />
      <path d="M-3 1 L-7 4 M3 1 L7 4" />
      <circle cx={0} cy={-2} r={1.5} fill="currentColor" stroke="none" />
    </g>
  );
}

function RagIcon() {
  return (
    <g strokeWidth="1.1">
      <path d="M-11 -5 H-1 L1 -1 V7 H-11 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M-11 -5 H-1 L1 -1 V7 H-11 Z" />
      <path d="M-9 0 H-3 M-9 4 H-5" opacity="0.65" />
      {[
        [4, -4],
        [8, -2],
        [5, 2],
        [9, 4],
        [6, 7],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.5} fill="currentColor" stroke="none" opacity="0.75" />
      ))}
    </g>
  );
}

function LlmIcon() {
  return (
    <g strokeWidth="1.1">
      <rect x={-10} y={-8} width={20} height={16} rx={3} fill="currentColor" fillOpacity="0.1" />
      <rect x={-10} y={-8} width={20} height={16} rx={3} />
      <path d="M-6 -3 H6 M-6 1 H4 M-6 5 H5" opacity="0.75" />
      <path d="M8 -10 L11 -5 L8 0 L11 5" strokeWidth="1" opacity="0.55" />
      <circle cx={-7} cy={-5} r={1.2} fill="currentColor" stroke="none" />
      <circle cx={-7} cy={3} r={1.2} fill="currentColor" stroke="none" />
    </g>
  );
}

function OutputIcon() {
  return (
    <g strokeWidth="1.3">
      <rect x={-9} y={-6} width={18} height={12} rx={2} fill="currentColor" fillOpacity="0.1" />
      <rect x={-9} y={-6} width={18} height={12} rx={2} />
      <path d="M-5 0 L-1 4 L5 -4" strokeWidth="1.4" />
      <path d="M0 -9 V-6 M-3 -9 H3" strokeWidth="1.1" opacity="0.55" />
    </g>
  );
}

function CurvedArrow({
  d,
  endX,
  endY,
  endDirection,
}: {
  d: string;
  endX: number;
  endY: number;
  endDirection: "left" | "down" | "right";
}) {
  return (
    <g>
      <path d={d} strokeWidth="1.45" />
      <ArrowHead x={endX} y={endY} size={3.5} direction={endDirection} />
    </g>
  );
}

function Connector({ x1, x2, label }: { x1: number; x2: number; label?: "async" | "ok" }) {
  const mid = (x1 + x2) / 2;
  return (
    <g>
      <path d={`M${x1} ${RAIL_Y} H${x2 - 6}`} strokeWidth="1.5" />
      <ArrowHead x={x2} y={RAIL_Y} />
      {label === "async" && (
        <path
          d={`M${mid - 4} ${RAIL_Y - 5} H${mid + 4} M${mid} ${RAIL_Y - 5} V${RAIL_Y + 5}`}
          strokeWidth="1"
          opacity="0.4"
        />
      )}
      {label === "ok" && (
        <path d={`M${mid - 3} ${RAIL_Y} L${mid} ${RAIL_Y + 3} L${mid + 5} ${RAIL_Y - 4}`} strokeWidth="1.1" opacity="0.45" />
      )}
    </g>
  );
}

function GmailSource({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={-20}
        y={-16}
        width={40}
        height={32}
        rx={8}
        fill="currentColor"
        fillOpacity="0.1"
      />
      <rect x={-20} y={-16} width={40} height={32} rx={8} strokeWidth="1.5" />
      <path d="M-14 -8 L0 2 L14 -8" strokeWidth="1.3" />
      <path d="M-14 -8 V8 H14 V-8" strokeWidth="1.3" />
      <path
        d="M-6 0 L0 6 L6 0 L0 -4 Z"
        fill="currentColor"
        fillOpacity="0.18"
        strokeWidth="1.2"
      />
      <path d="M-6 0 L0 6 L6 0 L0 -4 Z" strokeWidth="1.2" />
      <StepBadge x={-16} y={-26} w={32} ticks={[5, 4]} />
    </g>
  );
}

function SlackSink({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={-22}
        y={-16}
        width={44}
        height={36}
        rx={8}
        fill="currentColor"
        fillOpacity="0.1"
      />
      <rect x={-22} y={-16} width={44} height={36} rx={8} strokeWidth="1.55" />
      <path d="M-10 -4 H-4 V2 H-10 Z M2 -4 H8 V2 H2 Z M-10 8 H-4 V14 H-10 Z M2 8 H8 V14 H2 Z" strokeWidth="1.15" />
      <path d="M-7 5 H-1 M5 5 H11 M-7 11 H-1" strokeWidth="1" opacity="0.45" />
      <StepBadge x={-18} y={-26} w={36} ticks={[4, 5]} />
      <circle cx={18} cy={-10} r={2} fill="currentColor" stroke="none" opacity="0.75" />
    </g>
  );
}

export function HeroPipelineDoodle({ className }: HeroPipelineDoodleProps) {
  const steps = {
    trigger: { x: 48, w: 52 },
    queue: { x: 144, w: 52 },
    transform: { x: 240, w: 52 },
    condition: { x: 336, w: 48 },
    agent: { x: 604, w: 54 },
    rag: { x: 700, w: 52 },
    llm: { x: 796, w: 52 },
    output: { x: 892, w: 52 },
  } as const;

  const queueCx = stepCenter(steps.queue);
  const triggerCx = stepCenter(steps.trigger);
  const llmCx = stepCenter(steps.llm);
  const outputCx = stepCenter(steps.output);

  const top = stepTop();
  const bottom = stepBottom();

  const gmailY = top - ANCHOR_GAP - 16;
  const slackY = bottom + ANCHOR_GAP + 16;

  const gmailArrowStart = { x: queueCx, y: top - ANCHOR_GAP };
  const gmailArrowEnd = { x: triggerCx, y: top };
  const slackArrowStart = { x: outputCx, y: bottom };
  const slackArrowEnd = { x: llmCx, y: bottom + ANCHOR_GAP };

  return (
    <svg
      aria-hidden
      viewBox={`0 0 1000 ${VIEW_H}`}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={cn(
        "pointer-events-none text-primary/20 dark:text-primary/26",
        className
      )}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <PipeSegment x={24} width={TUNNEL_START - 24} />
      <PipeSegment x={TUNNEL_END} width={976 - TUNNEL_END} />
      <PipeSegment x={TUNNEL_START} width={TUNNEL_END - TUNNEL_START} dashed />

      {/* Balanced radial arms — Gmail above 2nd-left, Slack below 2nd-right */}
      <GmailSource x={queueCx} y={gmailY} />
      <SlackSink x={llmCx} y={slackY} />

      <CurvedArrow
        d={`M ${gmailArrowStart.x} ${gmailArrowStart.y} C ${gmailArrowStart.x} ${top - 6}, ${triggerCx + 40} ${top - 2}, ${gmailArrowEnd.x} ${gmailArrowEnd.y}`}
        endX={gmailArrowEnd.x}
        endY={gmailArrowEnd.y}
        endDirection="left"
      />

      <CurvedArrow
        d={`M ${slackArrowStart.x} ${slackArrowStart.y} C ${slackArrowStart.x} ${bottom + 12}, ${llmCx + 52} ${slackArrowEnd.y - 10}, ${slackArrowEnd.x} ${slackArrowEnd.y}`}
        endX={slackArrowEnd.x}
        endY={slackArrowEnd.y}
        endDirection="down"
      />

      <circle className="doodle-hero-intake-dot" cx={gmailArrowStart.x} cy={gmailArrowStart.y - 4} r={2} fill="currentColor" stroke="none" />
      <circle className="doodle-hero-outtake-dot" cx={slackArrowStart.x} cy={slackArrowStart.y + 4} r={2} fill="currentColor" stroke="none" />

      <Connector x1={steps.trigger.x + steps.trigger.w} x2={steps.queue.x} />
      <Connector x1={steps.queue.x + steps.queue.w} x2={steps.transform.x} label="async" />
      <Connector x1={steps.transform.x + steps.transform.w} x2={steps.condition.x} />
      <Connector x1={steps.condition.x + steps.condition.w} x2={TUNNEL_START} />
      <Connector x1={TUNNEL_END} x2={steps.agent.x} />
      <Connector x1={steps.agent.x + steps.agent.w} x2={steps.rag.x} />
      <Connector x1={steps.rag.x + steps.rag.w} x2={steps.llm.x} />
      <Connector x1={steps.llm.x + steps.llm.w} x2={steps.output.x} label="ok" />

      <PipelineStep
        x={steps.trigger.x}
        w={steps.trigger.w}
        h={STEP_H}
        variant="trigger"
        badgeTicks={[5, 4, 3]}
        statusDot="live"
        lines={[
          [7, 30, 30],
          [10, 36, 22],
        ]}
      >
        <TriggerIcon />
      </PipelineStep>

      <PipelineStep
        x={steps.queue.x}
        w={steps.queue.w}
        h={STEP_H}
        variant="queue"
        badgeTicks={[4, 5]}
        statusDot="wait"
        lines={[
          [7, 30, 32],
          [10, 36, 24],
        ]}
      >
        <QueueIcon />
      </PipelineStep>

      <PipelineStep
        x={steps.transform.x}
        w={steps.transform.w}
        h={STEP_H}
        variant="transform"
        badgeTicks={[6, 3]}
        lines={[
          [7, 30, 28],
          [10, 36, 20],
        ]}
      >
        <TransformIcon />
      </PipelineStep>

      <PipelineStep
        x={steps.condition.x}
        w={steps.condition.w}
        h={STEP_H}
        variant="condition"
        badgeTicks={[4, 4, 2]}
        lines={[
          [6, 30, 22],
          [9, 36, 14],
        ]}
      >
        <ConditionIcon />
      </PipelineStep>

      <PipelineStep
        x={steps.agent.x}
        w={steps.agent.w}
        h={STEP_H}
        variant="agent"
        badgeTicks={[5, 5]}
        statusDot="live"
        lines={[
          [7, 30, 34],
          [10, 36, 26],
        ]}
      >
        <AgentIcon />
      </PipelineStep>

      <PipelineStep
        x={steps.rag.x}
        w={steps.rag.w}
        h={STEP_H}
        variant="rag"
        badgeTicks={[3, 5]}
        lines={[
          [7, 30, 28],
          [10, 36, 18],
        ]}
      >
        <RagIcon />
      </PipelineStep>

      <PipelineStep
        x={steps.llm.x}
        w={steps.llm.w}
        h={STEP_H}
        variant="llm"
        badgeTicks={[3, 4, 3]}
        lines={[
          [7, 30, 30],
          [10, 36, 22],
        ]}
      >
        <LlmIcon />
      </PipelineStep>

      <PipelineStep
        x={steps.output.x}
        w={steps.output.w}
        h={STEP_H}
        variant="output"
        badgeTicks={[4, 3]}
        statusDot="ok"
        lines={[
          [7, 30, 26],
          [10, 36, 16],
        ]}
      >
        <OutputIcon />
      </PipelineStep>

      <g className="doodle-hero-pipeline-dot">
        <circle r={3.5} fill="currentColor" stroke="none" />
      </g>
      <g className="doodle-hero-pipeline-dot-secondary">
        <circle r={2.5} fill="currentColor" stroke="none" opacity="0.6" />
      </g>

      <circle cx={468} cy={RAIL_Y} r={2} fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx={500} cy={RAIL_Y} r={2.5} fill="currentColor" stroke="none" opacity="0.65" />
      <circle cx={532} cy={RAIL_Y} r={2} fill="currentColor" stroke="none" opacity="0.5" />
    </svg>
  );
}
