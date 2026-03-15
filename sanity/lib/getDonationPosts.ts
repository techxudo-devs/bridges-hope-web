import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client";
import { donationPostsQuery } from "./queries";

export type DonationPostSummary = {
  slug?: string;
  category?: string;
  title?: string;
  description?: string;
  image?: SanityImageSource;
  raisedAmount?: number;
  goalAmount?: number;
  accentColor?: string;
};

export async function getDonationPosts(lang: string) {
  return client.fetch<DonationPostSummary[]>(
    donationPostsQuery,
    { lang },
    { cache: "no-store" },
  );
}
