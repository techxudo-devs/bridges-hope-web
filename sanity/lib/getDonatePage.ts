import { client } from "./client";
import { donatePageQuery } from "./queries";

export async function getDonatePage(lang: string) {
  return client.fetch(donatePageQuery, { lang });
}
