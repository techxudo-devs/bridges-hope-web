import { getTranslations, setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const DonatePage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });

  return (
    <main className="bg-white">
      <section className="container mx-auto px-4 max-w-4xl py-20">
        <h1 className="text-4xl font-black text-secondary mb-6">
          {t("donate.title")}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          {t("donate.description")}
        </p>
      </section>
    </main>
  );
};

export default DonatePage;
