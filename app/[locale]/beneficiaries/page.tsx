import { getTranslations, setRequestLocale } from "next-intl/server";

import BeneficiariesContent from "@/components/sections/beneficiaries/BeneficiariesContent";
import PageHero from "@/components/shared/PageHero";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const BeneficiariesPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const nav = await getTranslations({ locale, namespace: "Navbar" });

  return (
    <main className="bg-white">
      <PageHero title={nav("beneficiaries")} homeLabel={nav("home")} />
      <BeneficiariesContent locale={locale} />
    </main>
  );
};

export default BeneficiariesPage;
