import { setRequestLocale } from "next-intl/server";

import AboutSection from "@/components/sections/homepage/AboutSection";
import AreasOfWorkSection from "@/components/sections/homepage/AreasofWorkSection";
import Blog from "@/components/sections/homepage/Blog";
import FeaturedCauseCard from "@/components/ui/FeaturedCauseCard";
import Hero from "@/components/sections/homepage/Hero";
import SanityHeroSection from "@/components/sections/homepage/SanityHeroSection";
import CoreValues from "@/components/sections/homepage/CoreValues";
import MissionVision from "@/components/sections/homepage/MissionVision";
import ContactSection from "@/components/sections/homepage/ContactSection";
import Team from "@/components/sections/homepage/Team";
import DonationPreviewSection from "@/components/sections/homepage/DonationPreviewSection";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <Hero locale={locale} />
      {/* <FeaturedCauseCard /> */}
      <AboutSection locale={locale} />
      {/* <SanityHeroSectionn locale={locale} /> */}
      {/* <CoreValues locale={locale} /> */}
      <MissionVision locale={locale} />
      <DonationPreviewSection locale={locale} />
      <AreasOfWorkSection />
      <Blog locale={locale} />
      <ContactSection locale={locale} />
    </main>
  );
}
