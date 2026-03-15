import { client } from "./client";
import { donateDetailQuery } from "./queries";

export async function getDonateDetail(lang: string) {
  return client.fetch(donateDetailQuery, { lang }, { cache: "no-store" });
}
