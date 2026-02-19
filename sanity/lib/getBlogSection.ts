import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client";
import { blogSectionQuery } from "./queries";

export type BlogSectionData = {
  label?: string;
  title?: string;
  subtitle?: string;
  readMore?: string;
  author?: string;
  comment?: string;
  posts?: {
    title?: string;
    excerpt?: string;
    date?: string;
    image?: SanityImageSource;
  }[];
};

export async function getBlogSection(lang: string) {
  return client.fetch<BlogSectionData>(blogSectionQuery, { lang });
}
