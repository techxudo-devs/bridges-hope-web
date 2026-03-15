import { getTranslations, setRequestLocale } from "next-intl/server";

import DonateCampaignsSection from "@/components/sections/donate/DonateCampaignsSection";
import PageHero from "@/components/shared/PageHero";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const DonatePage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const tPages = await getTranslations({ locale, namespace: "Pages" });

  return (
    <main className="bg-white">
      <PageHero title={tPages("donate.title")} homeLabel={nav("home")} />
      <DonateCampaignsSection locale={locale} />
    </main>
  );
};

export default DonatePage;
