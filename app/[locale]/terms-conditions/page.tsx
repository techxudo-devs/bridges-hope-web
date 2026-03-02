import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/shared/PageHero";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const TermsConditionsPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const nav = await getTranslations({ locale, namespace: "Navbar" });

  return (
    <main className="bg-white">
      <PageHero title={t("terms.title")} homeLabel={nav("home")} />
      <section className="container mx-auto px-4 max-w-4xl py-20">
        <p className="text-lg text-gray-600 leading-relaxed">
          {t("terms.description")}
        </p>
      </section>
    </main>
  );
};

export default TermsConditionsPage;
