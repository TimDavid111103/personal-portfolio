import type { GeneralSkill, SkillsData, TechnicalSkill, TextOnlyTool } from "@/lib/content";
import type { LucideIcon } from "lucide-react";

export type ToolItem = {
  kind: "tool";
  id: string;
  name: string;
  icon?: string;
};

export type CapabilityItem = {
  kind: "capability";
  id: string;
  title: string;
  icon: LucideIcon;
};

export type MarqueeItem = ToolItem | CapabilityItem;

function mergeTools(
  technical: TechnicalSkill[],
  textOnly: TextOnlyTool[]
): Omit<ToolItem, "kind">[] {
  return [
    ...technical.map((t) => ({
      id: `tool-${t.name}`,
      name: t.name,
      icon: t.icon,
    })),
    ...textOnly.map((t) => ({
      id: `tool-${t.name}`,
      name: t.name,
    })),
  ];
}

/** Interleave capabilities into the tool list for a mixed free-flowing stream. */
function interleaveItems(
  tools: Omit<ToolItem, "kind">[],
  capabilities: GeneralSkill[],
  getIcon: (title: string) => LucideIcon
): MarqueeItem[] {
  const caps: CapabilityItem[] = capabilities.map((c) => ({
    kind: "capability",
    id: `cap-${c.title}`,
    title: c.title,
    icon: getIcon(c.title),
  }));

  const items: MarqueeItem[] = [];
  let capIndex = 0;
  const interval = Math.max(3, Math.floor(tools.length / caps.length));

  tools.forEach((tool, index) => {
    items.push({ kind: "tool", ...tool });
    if ((index + 1) % interval === 0 && capIndex < caps.length) {
      items.push(caps[capIndex++]);
    }
  });

  while (capIndex < caps.length) {
    items.push(caps[capIndex++]);
  }

  return items;
}

export function buildMarqueeItems(
  data: SkillsData,
  getIcon: (title: string) => LucideIcon
): MarqueeItem[] {
  const tools = mergeTools(data.technical, data.toolsWithoutIcons);
  return interleaveItems(tools, data.general, getIcon);
}

