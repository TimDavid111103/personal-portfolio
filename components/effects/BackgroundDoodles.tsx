/**
 * @file components/effects/BackgroundDoodles.tsx
 * Fixed decorative SVG doodles scattered across the page background.
 * Each doodle illustrates an AI/engineering concept (agents, RAG, pipelines, etc.).
 */
import type { ReactNode } from "react";
import { ArrowHead, Dot } from "@/components/effects/doodle-svg";
import { cn } from "@/lib/utils";

type DoodleProps = {
  className?: string;
  viewBox: string;
  children: ReactNode;
};

/** Wrapper SVG with shared stroke styling for all background doodles. */
function Doodle({ className, viewBox, children }: DoodleProps) {
  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      fill="none"
      className={cn(
        "absolute text-primary/20 dark:text-primary/26",
        className
      )}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/** Circular agent node with horizontal detail lines inside. */
function AgentNode({
  cx,
  cy,
  r,
  lines,
}: {
  cx: number;
  cy: number;
  r: number;
  lines: [number, number, number, number][];
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="currentColor" fillOpacity="0.06" />
      <circle cx={cx} cy={cy} r={r} />
      {lines.map(([x1, y1, x2], i) => (
        <path key={i} d={`M${x1} ${y1} H${x2}`} strokeWidth="1.1" />
      ))}
    </g>
  );
}

/** Gear shape with alternating inner/outer teeth for the optimization doodle. */
function GearTeeth({ cx, cy, r, teeth }: { cx: number; cy: number; r: number; teeth: number }) {
  const inner = r * 0.72;
  const outer = r;
  const points: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const angle = (Math.PI * 2 * i) / (teeth * 2) - Math.PI / 2;
    const radius = i % 2 === 0 ? outer : inner;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return (
    <g>
      <path d={`${points.join(" ")} Z`} fill="currentColor" fillOpacity="0.05" />
      <path d={`${points.join(" ")} Z`} />
      <circle cx={cx} cy={cy} r={r * 0.28} fill="currentColor" fillOpacity="0.08" />
      <circle cx={cx} cy={cy} r={r * 0.28} />
    </g>
  );
}

/** Preset width/height classes for doodle SVGs. */
const doodleSizes = {
  standard: "h-[7em] w-[8em]",
  square: "h-[6.75em] w-[6.75em]",
  tall: "h-[7.5em] w-[6.5em]",
  wide: "h-[6em] w-[9em]",
  wideLg: "h-[5.5em] w-[10em]",
} as const;

/** Screen position, rotation, and size for each of the ten background doodles. */
const placements = [
  { position: "top-[7%] left-[4%] -rotate-6", size: doodleSizes.standard },
  { position: "top-[7%] right-[4%] rotate-4", size: doodleSizes.standard },
  { position: "top-[20%] left-[10%] -rotate-3", size: doodleSizes.square },
  { position: "top-[20%] right-[10%] rotate-5", size: doodleSizes.wideLg },
  { position: "top-[36%] left-[5%] rotate-2", size: doodleSizes.wide },
  { position: "top-[36%] right-[5%] -rotate-5", size: doodleSizes.wideLg },
  { position: "top-[52%] left-[16%] rotate-1", size: doodleSizes.tall },
  { position: "top-[52%] right-[14%] -rotate-2", size: doodleSizes.square },
  { position: "top-[70%] left-[8%] rotate-6", size: doodleSizes.standard },
  { position: "top-[84%] right-[8%] rotate-3", size: doodleSizes.wideLg },
] as const;

/** Renders all floating background doodles in a fixed full-screen layer. */
export function BackgroundDoodles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden text-[clamp(0.55rem,1.45vmin,1.3rem)]"
    >
      {/* 1. Multi-agent orchestration */}
      <Doodle
        className={cn("doodle-float", placements[0].position, placements[0].size)}
        viewBox="0 0 136 120"
      >
        <rect x="52" y="44" width="32" height="32" rx="9" fill="currentColor" fillOpacity="0.07" />
        <rect x="52" y="44" width="32" height="32" rx="9" />
        <path d="M60 54 H76 M60 60 H72 M60 66 H76" strokeWidth="1.1" />

        <AgentNode cx={24} cy={28} r={12} lines={[[18, 26, 30, 26], [18, 30, 26, 30]]} />
        <AgentNode cx={112} cy={28} r={12} lines={[[106, 26, 118, 26], [106, 30, 114, 30]]} />
        <AgentNode cx={24} cy={92} r={12} lines={[[18, 90, 30, 90], [18, 94, 26, 94]]} />
        <AgentNode cx={112} cy={92} r={12} lines={[[106, 90, 118, 90], [106, 94, 114, 94]]} />

        <path d="M36 32 C42 36, 48 40, 54 46" strokeDasharray="3 4" />
        <path d="M100 32 C94 36, 88 40, 82 46" strokeDasharray="3 4" />
        <path d="M36 88 C42 84, 48 80, 54 74" strokeDasharray="3 4" />
        <path d="M100 88 C94 84, 88 80, 82 74" strokeDasharray="3 4" />

        <path d="M68 44 C72 36, 80 30, 90 28" strokeWidth="1.1" />
        <Dot cx={90} cy={28} className="doodle-packet" />
        <path d="M84 50 C92 52, 100 56, 106 64" strokeWidth="1.1" />
        <Dot cx={106} cy={64} r={2} />
      </Doodle>

      {/* 2. Document chunking into embeddings */}
      <Doodle
        className={cn("doodle-float", placements[1].position, placements[1].size)}
        viewBox="0 0 136 108"
      >
        <path
          d="M12 16 H68 L76 24 V80 H12 Z"
          fill="currentColor"
          fillOpacity="0.06"
        />
        <path d="M12 16 H68 L76 24 V80 H12 Z" />
        <path d="M68 16 V24 H76" strokeWidth="1.1" />
        <path d="M22 34 H62 M22 44 H56 M22 54 H60 M22 64 H48" strokeWidth="1.1" />

        <rect x="20" y="72" width="14" height="4" rx="1" strokeWidth="1.1" />
        <rect x="38" y="72" width="14" height="4" rx="1" strokeWidth="1.1" />
        <rect x="56" y="72" width="14" height="4" rx="1" strokeWidth="1.1" />

        <path d="M76 44 C84 44, 90 42, 94 40" strokeDasharray="2 3" />
        <ArrowHead x={94} y={40} size={3.5} />

        {[
          [96, 28],
          [108, 24],
          [120, 30],
          [100, 40],
          [112, 38],
          [124, 42],
          [98, 52],
          [110, 50],
          [122, 54],
          [104, 62],
          [116, 60],
          [128, 64],
          [102, 72],
          [114, 70],
          [126, 74],
        ].map(([x, y]) => (
          <Dot key={`${x}-${y}`} cx={x} cy={y} r={2.2} />
        ))}

        <rect
          x="94"
          y="82"
          width="32"
          height="20"
          rx="3"
          strokeDasharray="3 3"
          strokeWidth="1.1"
        />
        <path d="M100 90 H120 M100 96 H116" strokeWidth="1.1" />
      </Doodle>

      {/* 3. Eval feedback loop */}
      <Doodle
        className={cn("doodle-float", placements[2].position, placements[2].size)}
        viewBox="0 0 108 108"
      >
        <path d="M54 14 C76 14, 90 30, 90 50 C90 70, 76 86, 54 86 C32 86, 18 70, 18 50 C18 30, 32 14, 54 14" />
        <path
          d="M82 18 C88 24, 92 32, 92 40"
          strokeWidth="1.6"
        />
        <ArrowHead x={92} y={40} direction="down" size={4.5} />

        <rect x="38" y="42" width="32" height="20" rx="5" fill="currentColor" fillOpacity="0.06" />
        <rect x="38" y="42" width="32" height="20" rx="5" />
        <path d="M46 50 L52 56 L64 44" strokeWidth="1.6" />

        <circle cx={28} cy={50} r={7} strokeWidth="1.1" />
        <path d="M25 50 H31 M28 47 V53" strokeWidth="1.1" />
        <circle cx={80} cy={50} r={7} strokeWidth="1.1" />
        <path d="M77 48 H83 M77 52 H83" strokeWidth="1.1" />

        <path d="M35 50 H31" strokeDasharray="2 2" strokeWidth="1.1" />
        <path d="M73 50 H77" strokeDasharray="2 2" strokeWidth="1.1" />
      </Doodle>

      {/* 4. Staged data pipeline */}
      <Doodle
        className={cn("doodle-float", placements[3].position, placements[3].size)}
        viewBox="0 0 144 96"
      >
        {([12, 40, 68] as const).map((y, i) => (
          <g key={y}>
            <rect x="6" y={y} width="22" height="18" rx="4" fill="currentColor" fillOpacity="0.05" />
            <rect x="6" y={y} width="22" height="18" rx="4" />
            <path d={`M12 ${y + 7} H22 M12 ${y + 13} H18`} strokeWidth="1.1" />

            <path d={`M28 ${y + 9} H40`} />
            <path d={`M40 ${y + 5} V${y + 13}`} strokeWidth="1.1" />
            <path d={`M36 ${y + 5} H44 M36 ${y + 13} H44`} strokeWidth="1.1" />

            <path d={`M44 ${y + 9} H56`} />
            <ArrowHead x={56} y={y + 9} size={3.5} />

            <rect x="58" y={y} width="22" height="18" rx="4" fill="currentColor" fillOpacity="0.05" />
            <rect x="58" y={y} width="22" height="18" rx="4" />
            <path d={`M64 ${y + 7} H74 M64 ${y + 13} H70`} strokeWidth="1.1" />

            <path d={`M80 ${y + 9} H92`} />
            <path d={`M92 ${y + 3} L98 ${y + 9} L92 ${y + 15} Z`} strokeWidth="1.1" />

            <path d={`M98 ${y + 9} H110`} />
            <ArrowHead x={110} y={y + 9} size={3.5} />

            <rect x="112" y={y + 2} width="18" height="14" rx="3" strokeWidth="1.1" />
            <path d={`M116 ${y + 9} H126`} strokeWidth="1.1" />

            <circle
              className={cn(
                "doodle-flow-dot",
                i === 1 && "doodle-flow-dot-delay",
                i === 2 && "doodle-flow-dot-delay-2"
              )}
              cx={32}
              cy={y + 9}
              r={2.5}
              fill="currentColor"
              stroke="none"
            />
          </g>
        ))}
      </Doodle>

      {/* 5. MCP plug-and-socket integration */}
      <Doodle
        className={cn("doodle-float", placements[4].position, placements[4].size)}
        viewBox="0 0 120 88"
      >
        <rect x="6" y="30" width="38" height="28" rx="5" fill="currentColor" fillOpacity="0.06" />
        <rect x="6" y="30" width="38" height="28" rx="5" />
        <path d="M14 40 H36 M14 48 H30" strokeWidth="1.1" />
        <path d="M6 44 H2 M6 50 H2" strokeWidth="1.1" />

        <rect x="16" y="58" width="6" height="4" rx="1" strokeWidth="1.1" />
        <rect x="26" y="58" width="6" height="4" rx="1" strokeWidth="1.1" />

        <path d="M44 44 H54" />
        <path d="M54 36 V52" strokeWidth="1.6" />
        <path d="M50 36 H58 M50 52 H58" strokeWidth="1.1" />

        <rect x="60" y="32" width="28" height="24" rx="4" fill="currentColor" fillOpacity="0.05" />
        <rect x="60" y="32" width="28" height="24" rx="4" />
        <path d="M68 40 H80 M68 48 H76" strokeWidth="1.1" />
        <path d="M82 38 V50" strokeWidth="1.1" />
        <path d="M78 38 H86 M78 50 H86" strokeWidth="1.1" />

        <path d="M88 44 H98" />
        <ArrowHead x={98} y={44} size={3.5} />

        <rect x="100" y="34" width="16" height="20" rx="3" strokeWidth="1.1" />
        <path d="M104 40 H112 M104 48 H110" strokeWidth="1.1" />
        <Dot cx={108} cy={54} r={2} />
      </Doodle>

      {/* 6. Terminal session */}
      <Doodle
        className={cn("doodle-float", placements[5].position, placements[5].size)}
        viewBox="0 0 128 80"
      >
        <rect x="4" y="6" width="120" height="68" rx="7" fill="currentColor" fillOpacity="0.05" />
        <rect x="4" y="6" width="120" height="68" rx="7" />
        <path d="M4 20 H124" strokeWidth="1.1" />
        <Dot cx={14} cy={13} r={2} />
        <Dot cx={22} cy={13} r={2} />
        <Dot cx={30} cy={13} r={2} />

        <path d="M14 30 H18" strokeWidth="1.1" opacity="0.5" />
        <path d="M14 42 H18" strokeWidth="1.1" opacity="0.5" />
        <path d="M14 54 H18" strokeWidth="1.1" opacity="0.5" />
        <path d="M14 66 H18" strokeWidth="1.1" opacity="0.5" />

        <path d="M24 30 L30 34 L24 38" strokeWidth="1.1" />
        <path d="M34 34 H72" strokeWidth="1.1" />
        <path d="M24 42 H58" strokeWidth="1.1" opacity="0.7" />
        <path d="M28 42 H34" strokeWidth="1.1" opacity="0.7" />
        <path d="M24 54 H68" strokeWidth="1.1" opacity="0.7" />
        <path d="M24 66 H48" strokeWidth="1.1" opacity="0.7" />
        <rect
          className="doodle-cursor-blink"
          x={50}
          y={62}
          width="2"
          height="7"
          fill="currentColor"
          stroke="none"
        />
      </Doodle>

      {/* 7. Funnel triage */}
      <Doodle
        className={cn("doodle-float", placements[6].position, placements[6].size)}
        viewBox="0 0 100 112"
      >
        <path d="M10 14 H90 L62 48 H38 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M10 14 H90 L62 48 H38 Z" />
        <path d="M22 22 H78 M26 30 H74 M30 38 H70" strokeWidth="1.1" opacity="0.6" />

        <rect x="18" y="6" width="8" height="8" rx="1" strokeWidth="1.1" />
        <circle cx={42} cy={10} r={4} strokeWidth="1.1" />
        <path d="M58 6 L64 14 L52 14 Z" strokeWidth="1.1" />
        <circle cx={76} cy={10} r={3} strokeWidth="1.1" />

        <path d="M38 48 V58 M62 48 V58" strokeWidth="1.1" />
        <path d="M34 58 H66" strokeWidth="1.1" />

        <rect x="14" y="66" width="14" height="14" rx="2" fill="currentColor" fillOpacity="0.06" />
        <rect x="14" y="66" width="14" height="14" rx="2" />
        <rect x="14" y="84" width="14" height="14" rx="2" strokeWidth="1.1" />

        <circle cx={50} cy={73} r={7} fill="currentColor" fillOpacity="0.06" />
        <circle cx={50} cy={73} r={7} />
        <circle cx={50} cy={91} r={7} strokeWidth="1.1" />

        <rect x="72" y="70" width="14" height="14" rx="2" fill="currentColor" fillOpacity="0.06" />
        <rect x="72" y="70" width="14" height="14" rx="2" />
        <rect x="72" y="88" width="14" height="14" rx="2" strokeWidth="1.1" />
      </Doodle>

      {/* 8. Robotic automation arm */}
      <Doodle
        className={cn("doodle-float", placements[7].position, placements[7].size)}
        viewBox="0 0 112 108"
      >
        <rect x="36" y="78" width="40" height="10" rx="3" fill="currentColor" fillOpacity="0.06" />
        <rect x="36" y="78" width="40" height="10" rx="3" />
        <path d="M42 78 V72 M70 78 V72" strokeWidth="1.1" />

        <rect x="46" y="8" width="20" height="14" rx="4" fill="currentColor" fillOpacity="0.06" />
        <rect x="46" y="8" width="20" height="14" rx="4" />
        <Dot cx={52} cy={15} r={1.8} />
        <Dot cx={60} cy={15} r={1.8} />

        <path d="M56 22 V36" strokeWidth="1.6" />
        <circle cx={56} cy={36} r={4} fill="currentColor" fillOpacity="0.08" />
        <circle cx={56} cy={36} r={4} />

        <path d="M56 40 L78 52" strokeWidth="1.6" />
        <circle cx={78} cy={52} r={4} fill="currentColor" fillOpacity="0.08" />
        <circle cx={78} cy={52} r={4} />

        <path d="M78 56 V68" strokeWidth="1.6" />
        <path d="M70 68 H86 M70 74 H86" strokeWidth="1.1" />

        <rect x="18" y="92" width="16" height="10" rx="2" />
        <rect x="38" y="96" width="16" height="10" rx="2" fill="currentColor" fillOpacity="0.06" />
        <rect x="38" y="96" width="16" height="10" rx="2" />
        <rect x="58" y="92" width="16" height="10" rx="2" />

        <path d="M82 74 L88 80 M84 72 L90 78" strokeWidth="1.1" strokeDasharray="2 2" />
      </Doodle>

      {/* 9. Conditional routing tree */}
      <Doodle
        className={cn("doodle-float", placements[8].position, placements[8].size)}
        viewBox="0 0 108 112"
      >
        <circle cx={54} cy={14} r={9} fill="currentColor" fillOpacity="0.06" />
        <circle cx={54} cy={14} r={9} />
        <path d="M50 12 H58" strokeWidth="1.1" />

        <path d="M54 23 V34" />
        <path d="M42 42 L66 42 L54 34 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M42 42 L66 42 L54 34 Z" />
        <path d="M48 40 H60" strokeWidth="1.1" />

        <path d="M48 42 L28 62" />
        <path d="M60 42 L80 62" />
        <path d="M22 58 H34" strokeWidth="1.1" />
        <path d="M74 58 H86" strokeWidth="1.1" />

        <circle cx={20} cy={72} r={8} fill="currentColor" fillOpacity="0.06" />
        <circle cx={20} cy={72} r={8} />
        <path d="M16 72 H24" strokeWidth="1.1" />

        <circle cx={88} cy={72} r={8} fill="currentColor" fillOpacity="0.06" />
        <circle cx={88} cy={72} r={8} />
        <path d="M84 70 L90 74 L84 78" strokeWidth="1.1" />

        <path d="M16 80 L12 94" strokeWidth="1.1" />
        <path d="M24 80 L28 94" strokeWidth="1.1" />
        <rect x="8" y="94" width="12" height="10" rx="2" strokeWidth="1.1" />
        <rect x="24" y="94" width="12" height="10" rx="2" strokeWidth="1.1" />

        <path d="M84 80 L80 94" strokeWidth="1.1" />
        <path d="M92 80 L96 94" strokeWidth="1.1" />
        <rect x="76" y="94" width="12" height="10" rx="2" strokeWidth="1.1" />
        <rect x="92" y="94" width="12" height="10" rx="2" strokeWidth="1.1" />
      </Doodle>

      {/* 10. Optimization gears */}
      <Doodle
        className={cn("doodle-float", placements[9].position, placements[9].size)}
        viewBox="0 0 120 88"
      >
        <g transform="translate(38, 44)">
          <g className="doodle-gear-spin">
            <GearTeeth cx={0} cy={0} r={22} teeth={8} />
          </g>
        </g>
        <g transform="translate(72, 44)">
          <g className="doodle-gear-spin-reverse">
            <GearTeeth cx={0} cy={0} r={16} teeth={6} />
          </g>
        </g>

        <path
          d="M56 38 L60 32 L64 38 L60 44 Z"
          fill="currentColor"
          fillOpacity="0.35"
          stroke="none"
        />
        <path d="M60 26 V30 M56 32 H64" strokeWidth="1.1" />
        <path d="M52 48 C54 52, 58 54, 62 52" strokeWidth="1.1" strokeDasharray="2 2" />
      </Doodle>
    </div>
  );
}
