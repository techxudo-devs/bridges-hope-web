import { setRequestLocale } from "next-intl/server";

import AboutSection from "@/components/AboutSection";
import AreasOfWorkSection from "@/components/AreasofWorkSection";
import Blog from "@/components/Blog";
import FeaturedCauseCard from "@/components/FeaturedCauseCard";
import Hero from "@/components/Hero";
import SanityHeroSection from "@/components/SanityHeroSection";
import CoreValues from "@/components/CoreValues";
import MissionVision from "@/components/MissionVision";
import ContactSection from "@/components/ContactSection";
import Team from "@/components/Team";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero locale={locale} />
      <FeaturedCauseCard />
      <AboutSection locale={locale} />
      {/* <SanityHeroSectionn locale={locale} /> */}
      {/* <CoreValues locale={locale} /> */}
      <MissionVision locale={locale} />
      <AreasOfWorkSection />

      <Blog locale={locale} />
      <ContactSection locale={locale} />
    </main>
  );
}
