import { client } from "./client";
import { servicePageCtaQuery } from "./queries";

export type ServicePageCtaData = {
  kicker?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export async function getServicePageCta(lang: string) {
  return client.fetch<ServicePageCtaData>(servicePageCtaQuery, { lang });
}
