import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import PageHero from "@/components/shared/PageHero";
import DonationPreviewSection from "@/components/sections/homepage/DonationPreviewSection";
import MissionVision from "@/components/sections/homepage/MissionVision";
import Blog from "@/components/sections/homepage/Blog";
import GallerySliderSection from "@/components/sections/homepage/GallerySliderSection";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const renderHighlight = (value?: string) => {
  if (!value) return null;
  const parts = value.split(/(<highlight>|<\/highlight>)/g);
  let isHighlight = false;
  return parts.map((part, index) => {
    if (part === "<highlight>") {
      isHighlight = true;
      return null;
    }
    if (part === "</highlight>") {
      isHighlight = false;
      return null;
    }
    if (!part) return null;
    return (
      <span
        key={`${part}-${index}`}
        className={isHighlight ? "text-primary" : undefined}
      >
        {part}
      </span>
    );
  });
};

const AboutPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const tPages = await getTranslations({ locale, namespace: "Pages" });
  const content = tPages.raw("aboutPage") as {
    pageTitle: string;
    kicker: string;
    title: string;
    description: string;
    imageAlt: string;
    features: {
      teamTitle: string;
      teamDescription: string;
      fundraiseTitle: string;
      fundraiseDescription: string;
    };
  };

  const featureItems = [
    {
      title: content.features.teamTitle,
      description: content.features.teamDescription,
      color: "text-amber-500",
    },
    {
      title: content.features.fundraiseTitle,
      description: content.features.fundraiseDescription,
      color: "text-primary",
    },
  ];

  return (
    <main className="bg-white">
      <PageHero title={content.pageTitle} homeLabel={nav("home")} />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-xl">
            <Image
              src="/hero-3.webp"
              alt={content.imageAlt}
              width={1501}
              height={661}
              className="h-[600px] w-full object-cover"
              priority
            />
          </div>
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {content.kicker}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-secondary leading-tight">
              {renderHighlight(content.title)}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {content.description}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 pt-2">
              {featureItems.map((item) => (
                <div key={item.title} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 ${item.color}`}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MissionVision locale={locale} />
      <DonationPreviewSection locale={locale} />
      <Blog locale={locale} />
      <GallerySliderSection />
    </main>
  );
};

export default AboutPage;
