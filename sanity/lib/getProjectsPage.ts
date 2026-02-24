import { client } from "./client";
import { projectsPageQuery } from "./queries";

export async function getProjectsPage(lang: string) {
  return client.fetch(projectsPageQuery, { lang });
}
