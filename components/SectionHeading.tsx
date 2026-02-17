"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  subtitle: React.ReactNode;
  title: React.ReactNode;
  highlight?: string;
  centered?: boolean;
  className?: string;
  dark?: boolean;
}

const SectionHeading = ({
  subtitle,
  title,
  highlight,
  centered = true,
  className = "",
  dark = false,
}: SectionHeadingProps) => {
  // Split the title if highlight is provided
  const renderTitle = () => {
    if (!highlight || typeof title !== "string") return title;

    const parts = title.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="text-primary">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div
      className={`relative mb-16 ${centered ? "text-center flex flex-col items-center" : "text-left items-start"} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        <div
          className={`relative inline-block mb-2     ${centered ? "mx-auto" : ""}`}
        >
          <span className="text-primary italic font-caveat font-bold text-sm uppercase tracking-[0.2em] relative inline-block pb-1">
            {subtitle}
            <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary/20"></div>
          </span>
        </div>

        <h2
          className={`${dark ? "text-white" : "text-secondary"} text-3xl md:text-4xl lg:text-4xl 2xl:text-5xl font-[800] font-cairo leading-tight max-w-4xl`}
        >
          {renderTitle()}
        </h2>
      </motion.div>
    </div>
  );
};

export default SectionHeading;
