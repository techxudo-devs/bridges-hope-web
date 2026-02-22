import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client";
import { blogPostsQuery } from "./queries";

export type BlogPostSummary = {
  title?: string;
  excerpt?: string;
  date?: string;
  image?: SanityImageSource;
  slug?: string;
};

export async function getBlogPosts(lang: string) {
  return client.fetch<BlogPostSummary[]>(blogPostsQuery, { lang });
}
