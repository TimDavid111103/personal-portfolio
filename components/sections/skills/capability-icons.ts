import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Brain,
  ClipboardCheck,
  GitBranch,
  Lightbulb,
  MessageSquare,
  Package,
  Search,
  Shield,
  TrendingUp,
} from "lucide-react";

/** Lucide icons for capability titles — consistent, muted primary styling in chips. */
export const CAPABILITY_ICONS: Record<string, LucideIcon> = {
  "0 to 1 Product Builder": Package,
  "Evaluation-Driven Developer": ClipboardCheck,
  "Multi-Agent Pipeline Design": GitBranch,
  "RAG Architecture": Search,
  "Systems Thinking": Boxes,
  "Business & Product Thinking": TrendingUp,
  "Philosophy-Informed Problem Solving": Brain,
  "Communication & Leadership": MessageSquare,
  "Resilient System Design": Shield,
};

export function getCapabilityIcon(title: string): LucideIcon {
  return CAPABILITY_ICONS[title] ?? Lightbulb;
}
