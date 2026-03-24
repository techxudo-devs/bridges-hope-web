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
  defaultAmount?: number;
  amountOptions?: number[];
  youtubeUrl?: string;
  detailParagraphs?: string[];
  richContent?: Array<{ _key?: string; _type?: string; style?: string; listItem?: string; level?: number; children?: Array<{ _key?: string; _type?: string; text?: string; marks?: string[] }> }>;
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
