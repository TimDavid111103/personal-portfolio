"use client";

import type { CSSProperties } from "react";
import { buildBentoLayout, placementStyle } from "./bento-layouts";
import type { MarqueeItem } from "./marquee-items";
import { SkillChip } from "./SkillChip";

const MARQUEE_DURATION_SEC = 140;

type SkillsMarqueeProps = {
  items: MarqueeItem[];
};

/** One continuous bento mosaic — slow horizontal drift, no panel boxes. */
export function SkillsMarquee({ items }: SkillsMarqueeProps) {
  const loop = [...items, ...items];
  const placements = buildBentoLayout(loop);

  return (
    <div className="skills-marquee-row group/row relative flex min-h-0 w-full flex-1 items-stretch overflow-hidden py-2 sm:py-3">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent sm:w-16"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent sm:w-16"
      />

      <div
        className="skills-marquee-track flex h-full w-max items-stretch"
        style={
          { "--marquee-duration": `${MARQUEE_DURATION_SEC}s` } as CSSProperties
        }
      >
        <div className="skills-bento-mosaic grid h-full min-h-[13rem] auto-cols-[4.75rem] grid-rows-3 gap-2 sm:min-h-[15rem] sm:auto-cols-[5.5rem] sm:gap-2.5">
          {placements.map((placement) => (
            <SkillChip
              key={`${placement.item.id}-${placement.index}`}
              item={placement.item}
              index={placement.index}
              span={placement.span}
              style={placementStyle(placement)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
