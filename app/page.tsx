import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CoreValues from "@/components/CoreValues";
import Causes from "@/components/Causes";
import Statistics from "@/components/Statistics";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

import FeaturedCauseCard from "@/components/FeaturedCauseCard";
import AboutSection from "@/components/AboutSection";
import MissionVision from "@/components/MissionVision";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedCauseCard />
        <AboutSection />
        <CoreValues />
        <MissionVision />
        <Team />
        {/* <Causes /> */}
        {/* <Statistics /> */}
        {/* <Testimonials /> */}
        <Blog />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
