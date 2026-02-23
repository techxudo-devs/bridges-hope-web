import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { defaultLocale, locales, rtlLocales, type Locale } from "@/i18n";
import InitialPageLoader from "@/components/InitialPageLoader";
import QueryProvider from "@/components/QueryProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
      languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}`])),
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
    <div
      lang={locale}
      dir={rtlLocales.includes(locale) ? "rtl" : "ltr"}
      suppressHydrationWarning
      key={locale}
    >
      <NextIntlClientProvider locale={locale} messages={messages} key={locale}>
        <QueryProvider>
          <InitialPageLoader>
            <Header />
            {children}
            <Footer />
          </InitialPageLoader>
        </QueryProvider>
      </NextIntlClientProvider>
    </div>
  );
}
