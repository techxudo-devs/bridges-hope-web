export const locales = ["en", "tr", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
  ar: "العربية",
};

export const rtlLocales: Locale[] = ["ar"];
