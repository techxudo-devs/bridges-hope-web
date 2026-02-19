import { client } from "./client";
import { coreValuesQuery } from "./queries";

export type CoreValuesData = {
  subtitle?: string;
  title?: string;
  readMore?: string;
  values?: {
    title?: string;
    description?: string;
  }[];
};

export async function getCoreValues(lang: string) {
  return client.fetch<CoreValuesData>(coreValuesQuery, { lang });
}
