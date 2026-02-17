import { setRequestLocale } from "next-intl/server";

import AboutSection from "@/components/AboutSection";
import AreasOfWorkSection from "@/components/AreasofWorkSection";
import Blog from "@/components/Blog";
import FeaturedCauseCard from "@/components/FeaturedCauseCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CoreValues from "@/components/CoreValues";
import MissionVision from "@/components/MissionVision";
import ContactSection from "@/components/ContactSection";
import Team from "@/components/Team";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedCauseCard />
        <AboutSection />
        <CoreValues />
        <MissionVision />
        <AreasOfWorkSection />
        {/* <Team /> */}
        {/* <Causes /> */}
        {/* <Statistics /> */}
        {/* <Testimonials /> */}
        <Blog />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
