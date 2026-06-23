import projectsData from "@/content/projects.json";

export type Project = {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
};

export type ProjectsData = {
  heading: string;
  subtitle: string;
  projects: Project[];
};

export function getProjects(): ProjectsData {
  return projectsData as ProjectsData;
}
