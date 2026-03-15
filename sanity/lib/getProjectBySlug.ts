import type { ProjectData } from "./getProjects";

import { client } from "./client";
import { projectBySlugQuery } from "./queries";

export async function getProjectBySlug(lang: string, slug: string) {
  return client.fetch<ProjectData>(
    projectBySlugQuery,
    { lang, slug },
    { cache: "no-store" },
  );
}
