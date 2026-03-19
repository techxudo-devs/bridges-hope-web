import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client";
import { volunteerCtaSectionQuery } from "./queries";

export type VolunteerCtaSectionData = {
  items?: {
    title?: string;
    description?: string;
    buttonLabel?: string;
    href?: string;
    image?: SanityImageSource;
    overlayColor?: string;
  }[];
};

export async function getVolunteerCtaSection(lang: string) {
  return client.fetch<VolunteerCtaSectionData>(volunteerCtaSectionQuery, {
    lang,
  }, { cache: "no-store" });
}
