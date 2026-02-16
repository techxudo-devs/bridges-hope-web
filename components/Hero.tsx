"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  ArrowRight as ArrowIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const t = useTranslations("Hero");
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      image: "/hero-1.webp",
      subtitle: t("slides.0.subtitle"),
      title: t.rich("slides.0.title", {
        br: () => <br />,
        highlight: (chunks) => (
          <span className="text-primary drop-shadow-[0_0_20px_rgba(249,75,28,0.3)]">
            {chunks}
          </span>
        ),
      }),
    },
    {
      image: "/hero-2.webp",
      subtitle: t("slides.1.subtitle"),
      title: t.rich("slides.1.title", {
        br: () => <br />,
        highlight: (chunks) => (
          <span className="text-primary drop-shadow-[0_0_20px_rgba(249,75,28,0.3)]">
            {chunks}
          </span>
        ),
      }),
    },
    {
      image: "/hero-3.webp",
      subtitle: t("slides.2.subtitle"),
      title: t.rich("slides.2.title", {
        br: () => <br />,
        highlight: (chunks) => (
          <span className="text-primary drop-shadow-[0_0_20px_rgba(249,75,28,0.3)]">
            {chunks}
          </span>
        ),
      }),
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#092a24]"
    >
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.2, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center grayscale"
            style={{ backgroundImage: `url('${slides[activeIndex].image}')` }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-tr from-[#092a24]/50 via-[#092a24]/30 to-transparent" />

        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center grayscale opacity-10 scale-100"
          style={{
            backgroundImage: "url('/hero-bottom-right.webp')",
          }}
        />
      </div>

      {/* Organic Brush Splash Image - Bottom Right */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`right-splash-${activeIndex}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute -bottom-70 -right-20 w-[600px] xl:w-[560px] h-[600px] xl:h-[500px] z-10 hidden lg:block animate-dance"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/hero-bottom-right.webp')",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Image - Bottom Left */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`left-decor-${activeIndex}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.2, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute -bottom-16 left-0 w-[900px] h-[250px] pointer-events-none hidden xl:block animate-dance-slow"
        >
          <div
            className="w-full h-full bg-contain bg-no-repeat bg-left"
            style={{
              backgroundImage: "url('/hero-bottom-left.png')",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Side Navigation Arrows */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <button
          onClick={prevSlide}
          className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 backdrop-blur-sm group cursor-pointer"
        >
          <ArrowLeft
            size={24}
            className="group-hover:-translate-x-1 transition-transform"
          />
        </button>
      </div>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <button
          onClick={nextSlide}
          className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 backdrop-blur-sm group cursor-pointer"
        >
          <ArrowRight
            size={24}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Main Content Content */}
      <div className="relative z-20 container mx-auto px-4 max-w-7xl text-center pt-32 md:pt-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Animated Subtitle */}
            <div className="flex items-center justify-center gap-5 mb-8">
              <div className="h-[2px] w-14 bg-primary rounded-full"></div>
              <span className="text-primary font-caveat font-black tracking-[0.3em] text-sm md:text-md uppercase font-nunito leading-none">
                {slides[activeIndex].subtitle}
              </span>
              <div className="h-[2px] w-14 bg-primary rounded-full"></div>
            </div>

            {/* Massive Impact Heading */}
            <h1 className="text-white text-4xl max-w-4xl mx-auto md:text-6xl 2xl:text-[90px] font-[700] font-nunito mb-12 tracking-tight leading-[0.95]">
              {slides[activeIndex].title}
            </h1>

            {/* Professional Buttons Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 md:gap-14">
              {/* Donate Button */}
              <button className="flex items-center gap-4 bg-white/5 border border-white/20 hover:border-primary pl-8 pr-3 py-2 rounded-full transition-all group relative overflow-hidden active:scale-95 hover:shadow-[0_10px_40px_rgba(249,75,28,0.2)] cursor-pointer">
                <span className="font-extrabold text-md text-white font-nunito relative z-10 transition-colors group-hover:text-white">
                  {t("donateNow")}
                </span>
                <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                  <ArrowIcon size={22} className="text-white" strokeWidth={3} />
                </div>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10"></div>
              </button>

              {/* Video Play Button */}
              <button className="flex items-center gap-6 group hover:scale-105 transition-all cursor-pointer"></button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modern Pagination Dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer transition-all duration-300 rounded-full ${
              index === activeIndex
                ? "w-4 h-4 border-2 border-primary bg-primary scale-125"
                : "w-2.5 h-2.5 bg-white/20 hover:bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
