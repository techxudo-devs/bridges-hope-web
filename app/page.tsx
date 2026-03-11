import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { defaultLocale } from "@/i18n";

function resolveLocaleFromAcceptLanguage(acceptLanguage: string | null) {
  if (!acceptLanguage) return defaultLocale;

  const languageTokens = acceptLanguage
    .split(",")
    .map((entry) => entry.trim().split(";")[0]?.toLowerCase())
    .filter(Boolean);

  for (const token of languageTokens) {
    if (token === "ar" || token.startsWith("ar-")) return "ar";
    if (token === "tr" || token.startsWith("tr-")) return "tr";
    if (token === "en" || token.startsWith("en-")) return "en";
  }

  return defaultLocale;
}

export default async function RootPage() {
  const requestHeaders = await headers();
  const locale = resolveLocaleFromAcceptLanguage(
    requestHeaders.get("accept-language")
  );

  redirect(`/${locale}`);
}
