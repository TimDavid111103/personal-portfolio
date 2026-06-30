import type { CSSProperties } from "react";
import type { MarqueeItem } from "./marquee-items";

/** Tile footprint — regular (1×1), tall (1×2), or long (2×1). No skinny or block shapes. */
export type BentoSpan = {
  col: 1 | 2;
  row: 1 | 2;
};

export type BentoPlacement = {
  item: MarqueeItem;
  index: number;
  span: BentoSpan;
  colStart: number;
  rowStart: number;
};

type Slot = {
  col: 1 | 2;
  row: 1 | 2 | 3;
  span: BentoSpan;
};

/** 2-column × 3-row packs — every slot fills the grid with no gaps. */
const DOUBLE_COL_TEMPLATES: Slot[][] = [
  // Three long bars
  [
    { col: 1, row: 1, span: { col: 2, row: 1 } },
    { col: 1, row: 2, span: { col: 2, row: 1 } },
    { col: 1, row: 3, span: { col: 2, row: 1 } },
  ],
  // Twin tall pillars + regular pair on bottom
  [
    { col: 1, row: 1, span: { col: 1, row: 2 } },
    { col: 2, row: 1, span: { col: 1, row: 2 } },
    { col: 1, row: 3, span: { col: 1, row: 1 } },
    { col: 2, row: 3, span: { col: 1, row: 1 } },
  ],
  // Long top, tall left, regular pair right
  [
    { col: 1, row: 1, span: { col: 2, row: 1 } },
    { col: 1, row: 2, span: { col: 1, row: 2 } },
    { col: 2, row: 2, span: { col: 1, row: 1 } },
    { col: 2, row: 3, span: { col: 1, row: 1 } },
  ],
  // Two long bars + regular pair on bottom
  [
    { col: 1, row: 1, span: { col: 2, row: 1 } },
    { col: 1, row: 2, span: { col: 2, row: 1 } },
    { col: 1, row: 3, span: { col: 1, row: 1 } },
    { col: 2, row: 3, span: { col: 1, row: 1 } },
  ],
  // Tall left + regular column on right
  [
    { col: 1, row: 1, span: { col: 1, row: 2 } },
    { col: 2, row: 1, span: { col: 1, row: 1 } },
    { col: 2, row: 2, span: { col: 1, row: 1 } },
    { col: 1, row: 3, span: { col: 1, row: 1 } },
    { col: 2, row: 3, span: { col: 1, row: 1 } },
  ],
  // Long, regular pair, long
  [
    { col: 1, row: 1, span: { col: 2, row: 1 } },
    { col: 1, row: 2, span: { col: 1, row: 1 } },
    { col: 2, row: 2, span: { col: 1, row: 1 } },
    { col: 1, row: 3, span: { col: 2, row: 1 } },
  ],
];

/** 1-column × 3-row packs. */
const SINGLE_COL_TEMPLATES: Slot[][] = [
  // Tall + regular
  [
    { col: 1, row: 1, span: { col: 1, row: 2 } },
    { col: 1, row: 3, span: { col: 1, row: 1 } },
  ],
  // Three regular
  [
    { col: 1, row: 1, span: { col: 1, row: 1 } },
    { col: 1, row: 2, span: { col: 1, row: 1 } },
    { col: 1, row: 3, span: { col: 1, row: 1 } },
  ],
  // Regular on top, tall below
  [
    { col: 1, row: 1, span: { col: 1, row: 1 } },
    { col: 1, row: 2, span: { col: 1, row: 2 } },
  ],
];

function selectTemplate(
  groupIndex: number,
  remaining: number
): { slots: Slot[]; width: 1 | 2 } | null {
  const preferSingle = groupIndex % 4 === 3;
  const pools: { width: 1 | 2; templates: Slot[][] }[] = preferSingle
    ? [
        { width: 1, templates: SINGLE_COL_TEMPLATES },
        { width: 2, templates: DOUBLE_COL_TEMPLATES },
      ]
    : [
        { width: 2, templates: DOUBLE_COL_TEMPLATES },
        { width: 1, templates: SINGLE_COL_TEMPLATES },
      ];

  for (const pool of pools) {
    const sorted = [...pool.templates].sort((a, b) => b.length - a.length);
    const start = groupIndex % sorted.length;

    for (let offset = 0; offset < sorted.length; offset += 1) {
      const template = sorted[(start + offset) % sorted.length];
      if (template.length <= remaining) {
        return { slots: template, width: pool.width };
      }
    }
  }

  return null;
}

/** Build a gap-free mosaic from pre-packed column templates. */
export function buildBentoLayout(items: MarqueeItem[]): BentoPlacement[] {
  const placements: BentoPlacement[] = [];
  let itemIndex = 0;
  let colOffset = 1;
  let groupIndex = 0;

  while (itemIndex < items.length) {
    const remaining = items.length - itemIndex;
    const selection = selectTemplate(groupIndex, remaining);
    if (!selection) break;

    for (const slot of selection.slots) {
      placements.push({
        item: items[itemIndex],
        index: itemIndex,
        span: slot.span,
        colStart: colOffset + slot.col - 1,
        rowStart: slot.row,
      });
      itemIndex += 1;
    }

    colOffset += selection.width;
    groupIndex += 1;
  }

  return placements;
}

export function placementStyle({
  colStart,
  rowStart,
  span,
}: BentoPlacement): CSSProperties {
  return {
    gridColumn: `${colStart} / span ${span.col}`,
    gridRow: `${rowStart} / span ${span.row}`,
  };
}

export function isRegularTile(span?: BentoSpan): boolean {
  return Boolean(span && span.col === 1 && span.row === 1);
}

export function isLongTile(span?: BentoSpan): boolean {
  return Boolean(span && span.col === 2 && span.row === 1);
}

export function isTallTile(span?: BentoSpan): boolean {
  return Boolean(span && span.col === 1 && span.row === 2);
}
