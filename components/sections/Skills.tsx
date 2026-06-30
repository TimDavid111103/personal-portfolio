"use client";

import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { getCapabilityIcon } from "@/components/sections/skills/capability-icons";
import { buildMarqueeItems } from "@/components/sections/skills/marquee-items";
import { SkillsMarquee } from "@/components/sections/skills/SkillsMarquee";
import { getSkills } from "@/lib/content";

const skillsData = getSkills();
const marqueeItems = buildMarqueeItems(skillsData, getCapabilityIcon);

/** Skills — full-section lazy bento mosaic of tools and capabilities. */
export function Skills() {
  return (
    <Section fluid className="grid-rows-1 py-5 sm:py-8">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col">
        <SectionHeader
          id="skills"
          title={skillsData.heading}
          subtitle={skillsData.subtitle}
          className="mb-4 shrink-0 sm:mb-6"
        />
        <SkillsMarquee items={marqueeItems} />
      </div>
    </Section>
  );
}
