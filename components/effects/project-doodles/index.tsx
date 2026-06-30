import type { ComponentType } from "react";
import { AiNewsDoodle } from "./ai-news-doodle";
import { DocentAiDoodle } from "./docent-ai-doodle";
import { EvalSyncDoodle } from "./evalsync-doodle";
import { Scale66Doodle } from "./scale66-doodle";
import { UltraDeep24Doodle } from "./ultra-deep24-doodle";

type DoodleComponent = ComponentType<{ className?: string }>;

/** Maps project doodle keys from content/projects.json to SVG components. */
export const projectDoodles: Record<string, DoodleComponent> = {
  scale66: Scale66Doodle,
  evalsync: EvalSyncDoodle,
  "ai-news": AiNewsDoodle,
  "ultra-deep24": UltraDeep24Doodle,
  "docent-ai": DocentAiDoodle,
};

export function ProjectDoodle({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Doodle = projectDoodles[name];
  if (!Doodle) return null;
  return <Doodle className={className} />;
}
