"use client";

import type { CSSProperties } from "react";
import { StackIconWrapper } from "@/components/ui/stack-icon";
import { cn } from "@/lib/utils";
import {
  isLongTile,
  isTallTile,
  type BentoSpan,
} from "./bento-layouts";
import type { MarqueeItem } from "./marquee-items";

const chipStyles = [
  "border-primary/25 bg-primary/10",
  "border-primary/28 bg-primary/12",
  "border-primary/26 bg-primary/11",
  "border-primary/30 bg-primary/13",
] as const;

type SkillChipProps = {
  item: MarqueeItem;
  index: number;
  span?: BentoSpan;
  style?: CSSProperties;
};

function iconSize(span?: BentoSpan): number {
  if (!span) return 22;
  if (isLongTile(span)) return 40;
  if (isTallTile(span)) return 34;
  return 22;
}

function capabilityIconClass(long?: boolean, tall?: boolean): string {
  if (long) return "size-9 sm:size-10";
  if (tall) return "size-8 sm:size-9";
  return "size-5 sm:size-6";
}

function fallbackBadgeClass(long?: boolean, tall?: boolean): string {
  if (long) return "size-10 text-xs sm:size-11";
  if (tall) return "size-8 text-[10px] sm:size-9";
  return "size-6 text-[9px]";
}

/** Bento tile with green skill-box styling. */
export function SkillChip({ item, index, span, style }: SkillChipProps) {
  const isCapability = item.kind === "capability";
  const Icon = isCapability ? item.icon : null;
  const long = isLongTile(span);
  const tall = isTallTile(span);

  return (
    <div
      style={style}
      className={cn(
        "flex min-h-0 min-w-0 flex-col items-center justify-center rounded-xl border",
        "transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/15 hover:shadow-sm",
        "gap-1.5 p-2",
        isCapability
          ? "border-primary/40 bg-primary/12 shadow-sm"
          : chipStyles[index % chipStyles.length],
        long && "gap-2 px-3 py-2",
        tall && "gap-2 py-3"
      )}
    >
      {isCapability && Icon ? (
        <Icon
          className={cn(
            "shrink-0 text-primary",
            capabilityIconClass(long, tall)
          )}
          strokeWidth={1.75}
          aria-hidden
        />
      ) : item.kind === "tool" && item.icon ? (
        <StackIconWrapper
          name={item.icon}
          label={item.name}
          size={iconSize(span)}
        />
      ) : item.kind === "tool" ? (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-md bg-primary/15 font-mono font-bold text-primary",
            fallbackBadgeClass(long, tall)
          )}
        >
          {item.name.slice(0, 2).toUpperCase()}
        </span>
      ) : null}

      <span
        className={cn(
          "max-w-full text-center leading-snug",
          isCapability
            ? cn(
                "font-serif font-semibold text-foreground",
                long
                  ? "line-clamp-2 text-xs sm:text-sm"
                  : tall
                    ? "line-clamp-4 text-[11px] sm:text-xs"
                    : "line-clamp-2 text-[11px] sm:text-xs"
              )
            : cn(
                "font-mono font-medium text-primary",
                long
                  ? "line-clamp-2 text-[10px] sm:text-xs"
                  : tall
                    ? "line-clamp-4 text-[10px] sm:text-xs"
                    : "line-clamp-2 text-[9px] sm:text-[10px]"
              )
        )}
      >
        {isCapability ? item.title : item.name}
      </span>
    </div>
  );
}
