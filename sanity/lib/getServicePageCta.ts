import { client } from "./client";
import { servicePageCtaQuery } from "./queries";

export type ServicePageCtaData = {
  introText?: string;
  programsTitle?: string;
  programItems?: string[];
  registrationBenefitText?: string;
  confidentialityNote?: string;
  expectedTimeText?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export async function getServicePageCta(lang: string) {
  return client.fetch<ServicePageCtaData>(servicePageCtaQuery, { lang });
}
