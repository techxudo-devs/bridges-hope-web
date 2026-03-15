import { getTranslations, setRequestLocale } from "next-intl/server";

import PageHero from "@/components/shared/PageHero";
import { Link } from "@/navigation";
import { getServicePageCta } from "@/sanity/lib/getServicePageCta";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const BeneficiariesPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const ctaData = await getServicePageCta(locale).catch(() => null);

  return (
    <main className="bg-white">
      <PageHero title={nav("beneficiaries")} homeLabel={nav("home")} />

      <section className="container mx-auto  px-4 py-20">
        <div className="rounded-[2rem] border border-primary/15 bg-[#F8FCFD] p-6 md:p-10">
          <p className="text-lg leading-relaxed text-gray-700">
            {ctaData?.introText || ""}
          </p>

          <h2 className="mt-8 text-2xl font-cairo font-[800] text-secondary md:text-3xl">
            {ctaData?.programsTitle || ""}
          </h2>

          <ul className="mt-4 space-y-3 text-gray-700">
            {(ctaData?.programItems || []).map((item, index) => (
              <li key={`${item}-${index}`} className="leading-relaxed">
                • {item}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-lg leading-relaxed text-gray-700">
            {ctaData?.registrationBenefitText || ""}
          </p>

          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            {ctaData?.confidentialityNote || ""}
          </p>

          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            {ctaData?.expectedTimeText || ""}
          </p>

          <Link
            href={ctaData?.buttonHref || "/volunteer"}
            className="mt-8 inline-flex items-center gap-2 font-cairo font-[800] text-primary hover:text-secondary transition-colors"
          >
            {ctaData?.buttonLabel || "To register, click here"} →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default BeneficiariesPage;
