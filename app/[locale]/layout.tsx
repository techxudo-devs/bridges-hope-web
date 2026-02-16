import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { Caveat, Nunito, Figtree } from "next/font/google";

import { defaultLocale, locales, type Locale } from "@/i18n";
import "../globals.css";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export async function generateMetadata({ params }: LayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        tr: `${siteUrl}/tr`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale || defaultLocale) as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning key={locale}>
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body
        className={`${nunito.variable} ${figtree.variable} ${caveat.variable} font-figtree antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages} key={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
