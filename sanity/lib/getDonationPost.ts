import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client";
import { donationPostBySlugQuery } from "./queries";

export type DonationPostDetail = {
  slug?: string;
  category?: string;
  title?: string;
  description?: string;
  image?: SanityImageSource;
  raisedAmount?: number;
  goalAmount?: number;
  accentColor?: string;
  detailParagraphs?: string[];
  categories?: Array<{ label?: string; count?: number }>;
  galleryImages?: SanityImageSource[];
};

export async function getDonationPostBySlug(lang: string, slug: string) {
  return client.fetch<DonationPostDetail>(
    donationPostBySlugQuery,
    { lang, slug },
    { cache: "no-store" },
  );
}
