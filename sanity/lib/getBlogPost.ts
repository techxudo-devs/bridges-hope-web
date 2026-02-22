import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client";
import { blogPostBySlugQuery } from "./queries";

type BlogPostBodyBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  children?: { text?: string }[];
};

export type BlogPostDetail = {
  title?: string;
  excerpt?: string;
  date?: string;
  image?: SanityImageSource;
  slug?: string;
  body?: BlogPostBodyBlock[];
};

export async function getBlogPostBySlug(lang: string, slug: string) {
  return client.fetch<BlogPostDetail>(blogPostBySlugQuery, { lang, slug });
}
