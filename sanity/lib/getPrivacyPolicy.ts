import { client } from "./client";
import { privacyPolicyQuery } from "./queries";

export async function getPrivacyPolicy(lang: string) {
  return client.fetch(privacyPolicyQuery, { lang });
}
