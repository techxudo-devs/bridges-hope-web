import { useTranslations } from "next-intl";

const PrivacyPolicyPage = () => {
  const t = useTranslations("Pages");

  return (
    <main className="bg-white">
      <section className="container mx-auto px-4 max-w-4xl py-20">
        <h1 className="text-4xl font-black text-secondary mb-6">
          {t("privacy.title")}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          {t("privacy.description")}
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
