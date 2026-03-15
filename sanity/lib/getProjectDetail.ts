import { client } from "./client";
import { projectDetailQuery } from "./queries";

export async function getProjectDetail(lang: string) {
  return client.fetch(projectDetailQuery, { lang }, { cache: "no-store" });
}
