import { getTranslations, setRequestLocale } from "next-intl/server";

import Team from "@/components/sections/homepage/Team";
import PageHero from "@/components/shared/PageHero";
import { getVolunteerPage } from "@/sanity/lib/getVolunteerPage";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const VolunteerPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const tFeatured = await getTranslations({
    locale,
    namespace: "FeaturedCauseCard",
  });
  const data = await getVolunteerPage(locale).catch(() => null);

  return (
    <main className="bg-white">
      <PageHero
        title={data?.heroTitle || t("volunteer.title")}
        homeLabel={nav("home")}
      />

      <section className="container mx-auto px-4 max-w-4xl py-20">
        <h2 className="text-3xl md:text-4xl font-cairo font-[800] text-secondary text-center">
          {data?.introTitle || t("volunteer.title")}
        </h2>

        <p className="mt-5 text-lg text-gray-600 leading-relaxed text-center">
          {data?.introDescription || t("volunteer.description")}
        </p>

        <div className="mt-8 rounded-2xl border border-primary/15 bg-[#F8FCFD] p-6 md:p-8 text-center">
          <p className="text-sm font-bold tracking-wide uppercase text-primary">
            {data?.highlightLabel || tFeatured("raisedFund")}
          </p>
          <h3 className="mt-3 text-2xl font-cairo font-[800] text-secondary">
            {data?.highlightTitle || tFeatured("title")}
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            {data?.highlightDescription || tFeatured("description")}
          </p>
        </div>
      </section>

      <Team />
    </main>
  );
};

export default VolunteerPage;
