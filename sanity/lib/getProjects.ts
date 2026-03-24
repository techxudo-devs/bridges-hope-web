import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client";
import { allProjectsQuery } from "./queries";

export type ProjectData = {
  _id?: string;
  slug?: string;
  title?: string;
  category?: string;
  description?: string;
  image?: SanityImageSource;
  location?: string;
  date?: string;
  author?: string;
  tags?: string[];
  body?: string[];
  richBody?: Array<{ _key?: string; _type?: string; style?: string; listItem?: string; level?: number; children?: Array<{ _key?: string; _type?: string; text?: string; marks?: string[] }> }>;
  youtubeUrl?: string;
  checklist?: string[];
  business?: { title?: string; description?: string };
  gallery?: SanityImageSource[];
};

export async function getProjects(lang: string) {
  return client.fetch<ProjectData[]>(allProjectsQuery, { lang }, { cache: "no-store" });
}
