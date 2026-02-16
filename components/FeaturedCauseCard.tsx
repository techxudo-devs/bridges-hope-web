"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const FeaturedCauseCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show card after scrolling 200px down from the top (past the main hero content area)
    if (latest > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <div className="relative z-40 max-w-6xl mx-auto px-4 -mt-20 md:-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 50,
          scale: isVisible ? 1 : 0.98,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-2xl"
      >
        {/* Left Side: Stats */}
        <div className="relative w-full md:w-[45%] min-h-[220px] md:min-h-[260px] flex flex-col justify-center p-6 md:p-10 overflow-hidden bg-secondary">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 grayscale opacity-20 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000')",
            }}
          />
          <div className="absolute inset-0 bg-secondary/70" />

          <div className="relative z-10 w-full">
            <h3 className="text-white text-2xl md:text-3xl font-black mb-6 md:mb-8 font-nunito">
              Total Raised Fund
            </h3>

            {/* Progress Bar Container */}
            <div className="relative mb-4 md:mb-5">
              <div className="h-1.5 w-full bg-white/10 rounded-full" />
              <div className="absolute top-0 left-0 h-1.5 w-[90%] bg-primary rounded-full">
                {/* Percentage Tooltip */}
                <div className="absolute -right-3 -top-10 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-sm flex flex-col items-center">
                  90%
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
                </div>
              </div>
            </div>

            {/* Stats Footer */}
            <div className="flex justify-between items-center text-white/90">
              <span className="text-sm md:text-base font-black font-nunito">
                $65,00 Raised
              </span>
              <span className="text-sm md:text-base font-black font-nunito">
                $35,00 Goal
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Message */}
        <div className="relative w-full md:w-[55%] min-h-[220px] md:min-h-[260px] flex flex-col justify-center p-6 md:p-10 overflow-hidden bg-primary px-10">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 mix-blend-overlay opacity-30 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000')",
            }}
          />

          <div className="relative z-10 flex flex-col items-start gap-3 md:gap-4">
            <span className="px-4 py-1 rounded-full border border-white/40 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
              Nutrition
            </span>

            <h3 className="text-white text-2xl md:text-[34px] font-black leading-[1.1] font-nunito max-w-sm">
              We start by listening to communities
            </h3>

            <p className="text-white/80 text-sm md:text-[15px] leading-relaxed max-w-md font-medium">
              Poverty is the act of extending love and kindness to others which
              is a conscious act but the decision is made by the heart.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedCauseCard;
