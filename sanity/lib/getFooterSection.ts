import { client } from "./client";
import { footerSectionQuery } from "./queries";

export type FooterSectionData = {
  aboutText?: string;
  quickLinks?: string;
  contactUs?: string;
  rights?: string;
  address?: string;
  email?: string;
  phone?: string;
  news?: {
    title?: string;
    date?: string;
  }[];
};

export async function getFooterSection(lang: string) {
  return client.fetch<FooterSectionData>(footerSectionQuery, { lang });
}
