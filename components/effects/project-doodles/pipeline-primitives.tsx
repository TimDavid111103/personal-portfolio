/**
 * @file components/effects/project-doodles/pipeline-primitives.tsx
 * Shared SVG building blocks for compact project pipeline doodles.
 */
import type { ReactNode } from "react";
import { ArrowHead } from "@/components/effects/doodle-svg";
import { cn } from "@/lib/utils";

export const RAIL_Y = 52;
const PIPE_TOP = 44;
const PIPE_H = 16;

type PipelineDoodleProps = {
  className?: string;
};

type StepProps = {
  x: number;
  w: number;
  label: string;
  short?: boolean;
};

/** Horizontal pipe between steps. */
export function Pipe({ x, width }: { x: number; width: number }) {
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
        strokeWidth="1.2"
        fill="none"
      />
      <circle
        cx={x + width / 2}
        cy={RAIL_Y}
        r={2.5}
        className="doodle-hero-pipeline-dot"
        fill="currentColor"
      />
    </g>
  );
}

/** A labeled pipeline step box. */
export function Step({ x, w, label }: StepProps) {
  const h = 36;
  const y = RAIL_Y - h / 2;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill="currentColor"
        fillOpacity="0.08"
        strokeWidth="1.3"
      />
      <text
        x={x + w / 2}
        y={RAIL_Y + 4}
        textAnchor="middle"
        className="fill-current font-mono text-[7px] font-medium"
        opacity="0.85"
      >
        {label}
      </text>
    </g>
  );
}

/** Arrow connector between steps. */
export function Connector({ x, y = RAIL_Y }: { x: number; y?: number }) {
  return <ArrowHead x={x} y={y} direction="right" size={4} />;
}

/** Wrapper SVG for all project doodles. */
export function DoodleFrame({
  className,
  viewWidth,
  children,
}: PipelineDoodleProps & { viewWidth: number; children: ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${viewWidth} 100`}
      className={cn("h-24 w-full text-primary", className)}
      aria-hidden
    >
      {children}
    </svg>
  );
}
