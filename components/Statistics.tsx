"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Users2, Heart, Target, Trophy } from "lucide-react";
import SectionHeading from "./SectionHeading";

const stats = [
  {
    icon: <Users2 size={40} />,
    label: "Active Volunteers",
    target: 2500,
    suffix: "+",
    color: "#FFB800",
  },
  {
    icon: <Heart size={40} />,
    label: "Funds Raised",
    target: 5000,
    prefix: "$",
    suffix: "k",
    color: "#F94B1C",
  },
  {
    icon: <Target size={40} />,
    label: "Projects Completed",
    target: 850,
    suffix: "+",
    color: "#28D08F",
  },
  {
    icon: <Trophy size={40} />,
    label: "Global Presence",
    target: 120,
    suffix: "+",
    color: "#7E3AF2",
  },
];

export default function Statistics() {
  const t = useTranslations("Statistics");
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const localizedStats = [
    { ...stats[0], label: t("stats.volunteers") },
    { ...stats[1], label: t("stats.funds") },
    { ...stats[2], label: t("stats.projects") },
    { ...stats[3], label: t("stats.presence") },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          stats.forEach((stat, index) => {
            const duration = 2000;
            const steps = 60;
            const increment = stat.target / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.target) {
                current = stat.target;
                clearInterval(timer);
              }
              setCounters((prev) => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(current);
                return newCounters;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="py-10 bg-white relative overflow-hidden"
    >
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <SectionHeading
          subtitle={t("subtitle")}
          title={t("title")}
          highlight={t("highlight")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {localizedStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-[#F8FAFC] rounded-[3rem] p-10 flex flex-col items-center transition-all duration-500 hover:shadow-2xl border border-slate-100"
            >
              <div
                className="w-20 h-20 rounded-[1.8rem] flex items-center justify-center text-white mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 rotate-45"
                style={{ backgroundColor: stat.color }}
              >
                <div className="-rotate-45">{stat.icon}</div>
              </div>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-secondary text-5xl font-[900] font-nunito flex">
                  {stat.prefix}
                  {counters[idx].toLocaleString()}
                  {stat.suffix}
                </span>
              </div>
              <p className="text-slate-400 font-black uppercase text-[11px] tracking-widest text-center">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
