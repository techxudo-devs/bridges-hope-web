import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client";
import { heroQuery } from "./queries";

export type HeroSection = {
  slides?: {
    title?: string;
    subtitle?: string;
    image?: SanityImageSource;
  }[];
  donateNowLabel?: string;
};

export async function getHeroSection(lang: string) {
  return client.fetch<HeroSection>(heroQuery, { lang });
}
