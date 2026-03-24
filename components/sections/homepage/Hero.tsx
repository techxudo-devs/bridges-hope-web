"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getHeroSection } from "@/sanity/lib/getHeroSection";
import { urlFor } from "@/sanity/lib/image";
import { Link } from "@/navigation";

const fallbackImages = ["/hero-1.webp", "/hero-2.webp", "/hero-3.webp"];

const renderHighlight = (value?: string) => {
  if (!value) return null;

  const normalizedValue = value
    .replace(/<br\s*><\/br>/g, "<br />")
    .replace(/<br\s*\/?>/g, "<br />");
  const parts = normalizedValue.split(/(<highlight>|<\/highlight>|<br \/>)/g);
  let isHighlight = false;
  const output: React.ReactNode[] = [];

  parts.forEach((part, index) => {
    if (part === "<highlight>") {
      isHighlight = true;
      return;
    }
    if (part === "</highlight>") {
      isHighlight = false;
      return;
    }
    if (part === "<br />") {
      output.push(<br key={index} />);
      return;
    }
    if (!part) return;

    if (isHighlight) {
      output.push(
        <span
          key={index}
          className="text-primary drop-shadow-[0_0_20px_rgba(249,75,28,0.3)]"
        >
          {part}
        </span>,
      );
      return;
    }

    output.push(<React.Fragment key={index}>{part}</React.Fragment>);
  });

  return output;
};

const Hero = ({ locale }: { locale: string }) => {
  const currentLocale = useLocale();
  const isRtl = currentLocale === "ar";
  const t = useTranslations("Hero");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { data } = useQuery({
    queryKey: ["heroSection", locale],
    queryFn: () => getHeroSection(locale),
  });

  const fallbackSlides = useMemo(() => {
    const rawSlides = t.raw("slides") as
      | {
          subtitle?: string;
          title?: string;
        }[]
      | undefined;

    if (!rawSlides?.length) {
      return fallbackImages.map((image) => ({
        image,
        subtitle: "",
        title: null,
        link: "/donate",
      }));
    }

    return rawSlides.map((slide, index) => ({
      image: fallbackImages[index % fallbackImages.length],
      subtitle: slide.subtitle ?? "",
      title: renderHighlight(slide.title),
      text: undefined as string | undefined,
      link: "/donate",
      buttonLabel: undefined,
    }));
  }, [t]);

  const slides = useMemo(() => {
    if (!data?.slides?.length) {
      return fallbackSlides;
    }

    return data.slides.map((slide, index) => ({
      image: slide.image
        ? urlFor(slide.image).width(2000).quality(80).url()
        : fallbackImages[index % fallbackImages.length],
      subtitle: slide.subtitle ?? fallbackSlides[index]?.subtitle ?? "",
      title: slide.title
        ? renderHighlight(slide.title)
        : fallbackSlides[index]?.title,
      text: slide.text || undefined,
      link: slide.link || fallbackSlides[index]?.link || "/donate",
      buttonLabel: slide.buttonLabel || undefined,
    }));
  }, [data?.slides, fallbackSlides]);

  const paginate = useCallback(
    (newDirection: number) => {
      if (!slides.length) return;
      setDirection(newDirection);
      setActiveIndex(
        (prev) => (prev + newDirection + slides.length) % slides.length,
      );
    },
    [slides.length],
  );

  const nextSlide = useCallback(() => paginate(1), [paginate]);
  const prevSlide = useCallback(() => paginate(-1), [paginate]);
  useEffect(() => {
    if (!slides.length) return undefined;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [slides.length, nextSlide]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 220 : -220,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 220 : -220,
      opacity: 0,
    }),
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#092a24]"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        >
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center grayscale"
              style={{
                backgroundImage: `url('${slides[activeIndex].image}')`,
                opacity: 0.2,
              }}
            />
            <div
              className="absolute inset-0 bg-cover bg-no-repeat bg-center grayscale opacity-10 scale-100"
              style={{
                backgroundImage: "url('/hero-bottom-right.webp')",
              }}
            />
          </div>

          <div className="relative z-20 container mx-auto px-4 max-w-7xl text-center flex min-h-screen flex-col items-center justify-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
                className="flex items-center justify-center gap-5 mb-8"
              >
                <div className="h-[2px] w-14 bg-primary rounded-full"></div>
                <span className="text-primary  font-black tracking-[0.3em] text-sm md:text-md uppercase  leading-none">
                  {slides[activeIndex].subtitle}
                </span>
                <div className="h-[2px] w-14 bg-primary rounded-full"></div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeInOut", delay: 0.3 }}
                className="text-white text-3xl max-w-5xl mx-auto md:text-5xl 2xl:text-[72px] font-[700] font-cairo mb-6 tracking-tight leading-[1.2]"
              >
                {slides[activeIndex].title}
              </motion.h1>

              {slides[activeIndex].text ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.42 }}
                  className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
                >
                  {slides[activeIndex].text}
                </motion.p>
              ) : <div className="mb-6" />}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-10 md:gap-14"
              >
                <Link
                  href={slides[activeIndex].link}
                  className="flex items-center gap-4 bg-white/5 border border-white/20 hover:border-primary pl-8 pr-3 py-2 rounded-full transition-all group relative overflow-hidden active:scale-95 hover:shadow-[0_10px_40px_rgba(249,75,28,0.2)] cursor-pointer"
                >
                  <span className="font-extrabold text-md text-white  relative z-10 transition-colors group-hover:text-white">
                    {slides[activeIndex].buttonLabel
                      ? slides[activeIndex].buttonLabel
                      : t.rich("donateNow", {
                          highlight: (chunks) => (
                            <span className="text-primary">{chunks}</span>
                          ),
                        })}
                  </span>
                  <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                    {isRtl ? (
                      <ArrowLeft
                        size={22}
                        className="text-white"
                        strokeWidth={3}
                      />
                    ) : (
                      <ArrowRight
                        size={22}
                        className="text-white"
                        strokeWidth={3}
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10"></div>
                </Link>

                <button className="flex items-center gap-6 group hover:scale-105 transition-all cursor-pointer"></button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

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

      {/* Modern Pagination Dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              if (index === activeIndex) return;
              paginate(index > activeIndex ? 1 : -1);
            }}
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
