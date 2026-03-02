import { getTranslations, setRequestLocale } from "next-intl/server";

import BlogPage from "@/components/sections/blog/BlogPage";
import PageHero from "@/components/shared/PageHero";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function BlogRoute({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const t = await getTranslations({ locale, namespace: "Blog" });

  return (
    <main>
      <PageHero title={t("heroTitle")} homeLabel={nav("home")} />
      <BlogPage locale={locale} />
    </main>
  );
}
