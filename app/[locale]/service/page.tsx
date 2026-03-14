import { getTranslations, setRequestLocale } from "next-intl/server";

import AreasOfWorkSection from "@/components/sections/homepage/AreasofWorkSection";
import PageHero from "@/components/shared/PageHero";
import { Link } from "@/navigation";
import { getServicePageCta } from "@/sanity/lib/getServicePageCta";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const ServicePage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const tPages = await getTranslations({ locale, namespace: "Pages" });
  const tFooter = await getTranslations({ locale, namespace: "Footer" });
  const ctaData = await getServicePageCta(locale).catch(() => null);

  return (
    <main className="bg-white">
      <PageHero title={nav("programs")} homeLabel={nav("home")} />

      <AreasOfWorkSection />

      <section className="container mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-[2rem] bg-secondary px-6 py-12 text-center text-white md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {ctaData?.kicker || tPages("volunteer.title")}
          </p>
          <h2 className="mt-4 text-3xl font-cairo font-[800] md:text-4xl">
            {ctaData?.title || tPages("aboutPage.features.teamTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-white/85">
            {ctaData?.description || tPages("aboutPage.features.teamDescription")}
          </p>
          <Link
            href={ctaData?.buttonHref || "/volunteer"}
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-primary"
          >
            {ctaData?.buttonLabel || tFooter("becomeVolunteer")}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ServicePage;
