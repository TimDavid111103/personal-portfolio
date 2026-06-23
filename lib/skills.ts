import skillsData from "@/content/skills.json";

export type Skill = {
  name: string;
  level: number;
};

export type SkillCategory = {
  name: string;
  skills: Skill[];
};

export type SkillsData = {
  heading: string;
  subtitle: string;
  categories: SkillCategory[];
};

export function getSkills(): SkillsData {
  return skillsData as SkillsData;
}
