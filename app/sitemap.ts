import type { MetadataRoute } from "next";

import { locales } from "@/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const paths = [
  "",
  "/privacy-policy",
  "/terms-conditions",
  "/volunteer",
  "/impact",
  "/donate",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
    }))
  );
}
