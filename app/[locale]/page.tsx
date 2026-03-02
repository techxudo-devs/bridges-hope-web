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
import VolunteerCtaSection from "@/components/sections/homepage/VolunteerCtaSection";
import GallerySliderSection from "@/components/sections/homepage/GallerySliderSection";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <Hero locale={locale} />

      <AboutSection locale={locale} />
      <MissionVision locale={locale} />
      <VolunteerCtaSection locale={locale} />
      <DonationPreviewSection locale={locale} />
      <AreasOfWorkSection />
      <Blog locale={locale} />
      <ContactSection locale={locale} />
      <GallerySliderSection />
    </main>
  );
}
