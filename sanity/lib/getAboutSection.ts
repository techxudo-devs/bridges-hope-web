import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client";
import { aboutSectionQuery } from "./queries";

export type AboutSectionData = {
  subtitle?: string;
  title?: string;
  highlight?: string;
  descriptionLead?: string;
  descriptionBody?: string;
  quote?: string;
  features?: {
    treatmentHelp?: string;
    fundRaised?: string;
  };
  learnMore?: string;
  needHelpLabel?: string;
  phoneNumber?: string;
  imagePrimary?: SanityImageSource;
  imageSecondary?: SanityImageSource;
  imageAltPrimary?: string;
  imageAltSecondary?: string;
  fundedLabel?: string;
  fundedAmount?: string;
  supportLabel?: string;
};

export async function getAboutSection(lang: string) {
  return client.fetch<AboutSectionData>(aboutSectionQuery, { lang });
}
