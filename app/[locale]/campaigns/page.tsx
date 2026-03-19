import { getTranslations, setRequestLocale } from "next-intl/server";

import DonateCampaignsSection from "@/components/sections/donate/DonateCampaignsSection";
import PageHero from "@/components/shared/PageHero";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const CampaignsPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const nav = await getTranslations({ locale, namespace: "Navbar" });

  return (
    <main className="bg-white">
      <PageHero title={nav("contributeProjects")} homeLabel={nav("home")} />
      <DonateCampaignsSection locale={locale} />
    </main>
  );
};

export default CampaignsPage;

