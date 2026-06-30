/**
 * @file lib/content.ts
 * Typed loaders for all JSON content under content/.
 * Edit the JSON files to update copy — components import via getSite(), getProjects(), etc.
 */
import projectsData from "@/content/projects.json";
import siteData from "@/content/site.json";
import skillsData from "@/content/skills.json";

/** A single nav or CTA link (label + hash href). */
export type NavLink = {
  label: string;
  href: string;
};

/** A social profile or contact link with platform metadata. */
export type SocialLink = {
  platform: string;
  handle: string;
  url: string;
  icon: string;
};

/** Full site content shape matching content/site.json. */
export type SiteData = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  nav: {
    links: NavLink[];
    cta: NavLink;
  };
  socials: {
    heading: string;
    description: string;
    links: SocialLink[];
  };
  contact: {
    heading: string;
    description: string;
    buttonLabel: string;
    email: string;
  };
  footer: {
    copyright: string;
  };
};

/** A labeled group of technologies in a project's layer stack. */
export type ProjectLayer = {
  label: string;
  items: string[];
};

/** A featured project card from content/projects.json. */
export type Project = {
  id: string;
  title: string;
  role?: string;
  status?: string;
  featured?: boolean;
  goal: string;
  highlights: string[];
  layerStack: ProjectLayer[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  doodle: string;
};

/** Projects section content from content/projects.json. */
export type ProjectsData = {
  heading: string;
  subtitle: string;
  projects: Project[];
};

/** A technical skill with a tech-stack-icons slug. */
export type TechnicalSkill = {
  name: string;
  icon: string;
  category: string;
};

/** A tool without an icon on tech-stack-icons.com. */
export type TextOnlyTool = {
  name: string;
  category: string;
};

/** A higher-level capability, not tied to a specific tool. */
export type GeneralSkill = {
  title: string;
  description: string;
};

/** Skills section content from content/skills.json. */
export type SkillsData = {
  heading: string;
  subtitle: string;
  technical: TechnicalSkill[];
  toolsWithoutIcons: TextOnlyTool[];
  general: GeneralSkill[];
};

/** Loads site.json as typed SiteData. */
export function getSite(): SiteData {
  return siteData as SiteData;
}

/** Loads projects.json as typed ProjectsData. */
export function getProjects(): ProjectsData {
  return projectsData as ProjectsData;
}

/** Loads skills.json as typed SkillsData. */
export function getSkills(): SkillsData {
  return skillsData as SkillsData;
}
