import { client } from "./client";
import { volunteerPageQuery } from "./queries";

export type VolunteerPageData = {
  heroTitle?: string;
  introTitle?: string;
  introDescription?: string;
  highlightLabel?: string;
  highlightTitle?: string;
  highlightDescription?: string;
};

export async function getVolunteerPage(lang: string) {
  return client.fetch<VolunteerPageData>(volunteerPageQuery, { lang });
}
