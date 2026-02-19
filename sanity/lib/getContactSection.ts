import { client } from "./client";
import { contactSectionQuery } from "./queries";

export type ContactSectionData = {
  subtitle?: string;
  title?: string;
  highlight?: string;
  description?: string;
  info?: {
    emailTitle?: string;
    emailDetail?: string;
    visitTitle?: string;
    visitDetail?: string;
    hoursTitle?: string;
    hoursDetail?: string;
  };
  form?: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    button?: string;
  };
  success?: string;
};

export async function getContactSection(lang: string) {
  return client.fetch<ContactSectionData>(contactSectionQuery, { lang });
}
