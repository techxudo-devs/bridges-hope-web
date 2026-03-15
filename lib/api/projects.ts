import type { ProjectData } from "@/sanity/lib/getProjects";

type ProjectsPageData = {
  cta?: {
    title?: string;
    description?: string;
    button?: string;
  };
};

export async function fetchProjects(locale: string): Promise<ProjectData[]> {
  const response = await fetch(`/api/projects?locale=${locale}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export async function fetchProjectsPage(
  locale: string,
): Promise<ProjectsPageData | null> {
  const response = await fetch(`/api/projects-page?locale=${locale}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects page");
  }

  return response.json();
}
