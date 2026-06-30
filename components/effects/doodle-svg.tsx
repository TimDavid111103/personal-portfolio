/**
 * @file components/effects/doodle-svg.tsx
 * Shared SVG primitives for decorative pipeline and background doodles.
 */

/** Cardinal direction for arrow tip orientation. */
export type ArrowDirection = "right" | "down" | "left" | "up";

type ArrowHeadProps = {
  x: number;
  y: number;
  direction?: ArrowDirection;
  size?: number;
};

/** Directional arrow tip for flow and connection lines. */
export function ArrowHead({
  x,
  y,
  direction = "right",
  size = 4,
}: ArrowHeadProps) {
  const s = size;
  const paths: Record<ArrowDirection, string> = {
    right: `M${x - s} ${y - s * 0.7} L${x} ${y} L${x - s} ${y + s * 0.7}`,
    down: `M${x - s * 0.7} ${y - s} L${x} ${y} L${x + s * 0.7} ${y - s}`,
    left: `M${x + s} ${y - s * 0.7} L${x} ${y} L${x + s} ${y + s * 0.7}`,
    up: `M${x - s * 0.7} ${y + s} L${x} ${y} L${x + s * 0.7} ${y + s}`,
  };

  return <path d={paths[direction]} />;
}

type DotProps = {
  cx: number;
  cy: number;
  r?: number;
  className?: string;
};

/** Small filled circle used as nodes, packets, or embedding dots. */
export function Dot({ cx, cy, r = 2.5, className }: DotProps) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="currentColor"
      stroke="none"
      className={className}
    />
  );
}
