import { useTranslations } from "next-intl";

const ImpactPage = () => {
  const t = useTranslations("Pages");

  return (
    <main className="bg-white">
      <section className="container mx-auto px-4 max-w-4xl py-20">
        <h1 className="text-4xl font-black text-secondary mb-6">
          {t("impact.title")}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          {t("impact.description")}
        </p>
      </section>
    </main>
  );
};

export default ImpactPage;
