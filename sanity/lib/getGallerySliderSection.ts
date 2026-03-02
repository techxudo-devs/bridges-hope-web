import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client";
import { gallerySliderSectionQuery } from "./queries";

export type GallerySliderSection = {
  items?: {
    image?: SanityImageSource;
    alt?: string;
    href?: string;
  }[];
};

export async function getGallerySliderSection(lang: string) {
  return client.fetch<GallerySliderSection>(gallerySliderSectionQuery, {
    lang,
  });
}
