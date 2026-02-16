"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Heart,
  Stethoscope,
  GraduationCap,
  HandHeart,
  ChevronRight,
  Users,
  MessageCircle,
  Brain,
  HeartPulse,
  Activity,
  Ear,
  PersonStanding,
  Droplet,
  BookOpen,
  FileText,
  UserCircle,
  Utensils,
  Home,
  Shirt,
  Hammer,
  DollarSign,
  Baby,
  ArrowUpRight,
  X,
  Sparkles,
  Info,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Color Palette
const THEME = {
  primary: "#f94b1c",
  dark: "#092a24",
  accent: "#fdf2f0",
  muted: "#64748b",
};

/**
 * Enhanced Service Modal - Sleek Side Reveal
 */
const ServiceModal = ({ service, isOpen, onClose, pillarColor }: any) => {
  if (!service) return null;
  const Icon = service.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[160] h-full w-full max-w-lg bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] p-10 overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="group mb-12 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors"
            >
              <X size={18} /> Close
            </button>

            <div
              className="flex h-20 w-20 items-center justify-center rounded-3xl mb-8"
              style={{
                backgroundColor: `${THEME.primary}10`,
                color: THEME.primary,
              }}
            >
              <Icon size={40} strokeWidth={1.2} />
            </div>

            <h2
              className="text-4xl font-bold mb-6 tracking-tight"
              style={{ color: THEME.dark }}
            >
              {service.name}
            </h2>
            <p className="text-xl leading-relaxed text-slate-600 mb-10">
              {service.description}
            </p>

            {service.subItems && (
              <div className="grid grid-cols-1 gap-4">
                {service.subItems.map((item: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: THEME.primary }}
                    />
                    <span className="font-medium text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {service.name.toLowerCase().includes("amputation") && (
              <div className="mt-10 p-8 rounded-[2.5rem] bg-emerald-50 border border-emerald-100">
                <Info className="text-emerald-600 mb-4" />
                <p className="text-emerald-900 font-medium">
                  Over 21,000 recorded cases in Gaza. Our mission is to
                  transform injury into empowerment.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const WorkCard = ({
  pillar,
  index,
  keyProgramsLabel,
}: {
  pillar: any;
  index: number;
  keyProgramsLabel: string;
}) => {
  const [selectedService, setSelectedService] = useState(null);
  const Icon = pillar.icon;

  // Visual logic for bento grid spanning
  const isLarge = index === 0 || index === 3;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`group relative overflow-hidden rounded-[3rem] bg-white p-10 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 ${isLarge ? "md:col-span-2" : "md:col-span-1"}`}
      >
        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-10 flex items-start justify-between">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 transition-colors group-hover:bg-[#f94b1c] group-hover:text-white">
              <Icon size={30} strokeWidth={1.5} />
            </div>
            <span className="text-xs font-black tracking-widest text-slate-200 group-hover:text-[#f94b1c]/20 transition-colors">
              0{index + 1}
            </span>
          </div>

          <h3
            className="text-3xl font-bold mb-4 tracking-tight"
            style={{ color: THEME.dark }}
          >
            {pillar.title}
          </h3>
          <p className="text-slate-500 leading-relaxed mb-10 max-w-md">
            {pillar.description}
          </p>

          <div className="mt-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">
              {keyProgramsLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {pillar.services.map((service: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedService(service)}
                  className="flex items-center gap-2 cursor-pointer rounded-full border border-slate-100 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-[#f94b1c] hover:text-[#f94b1c] hover:shadow-md"
                >
                  {service.name}
                  <ArrowUpRight size={14} className="opacity-40" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Subtle Decorative Background Gradient */}
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#f94b1c]/5 blur-3xl transition-opacity group-hover:opacity-100" />
      </motion.div>

      <ServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        pillarColor={THEME.primary}
      />
    </>
  );
};

const AreasOfWorkSection = () => {
  const t = useTranslations("AreasOfWorkSection");

  // Logic for icon mapping (remains similar to original for functionality)
  const pillarIcons = [Heart, Stethoscope, GraduationCap, HandHeart];
  const serviceIcons = [
    [Users, MessageCircle, Brain, HeartPulse],
    [Activity, Baby, Ear, PersonStanding],
    [Brain, BookOpen, UserCircle, FileText],
    [Utensils, Droplet, Home, Hammer],
  ];

  const pillarsData = t.raw("pillars") as any[];
  const areasOfWork = pillarsData.map((p, i) => ({
    ...p,
    icon: pillarIcons[i],
    services: p.services.map((s: any, si: number) => ({
      ...s,
      icon: serviceIcons[i][si % 4],
    })),
  }));

  return (
    <section id="programs" className="relative bg-[#fafafa] py-32 px-6">
      <div className="container mx-auto ">
        {/* Header Design: Clean & Editorial */}
        <div className="mb-24 flex flex-col items-start md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-[1px] w-10 bg-[#f94b1c]" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#f94b1c]">
                {t("label")}
              </span>
            </motion.div>

            <h2
              className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tighter"
              style={{ color: THEME.dark }}
            >
              {t.rich("title", {
                outline: (chunks) => (
                  <span
                    className="text-transparent font-outline-1"
                    style={{ WebkitTextStroke: `1px ${THEME.dark}` }}
                  >
                    {chunks}
                  </span>
                ),
                br: () => <br className="hidden lg:block" />,
              })}
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-4xl text-slate-500 text-lg border-l border-slate-200 pl-8"
          >
            {t("summary")}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {areasOfWork.map((pillar, index) => (
            <WorkCard
              key={index}
              pillar={pillar}
              index={index}
              keyProgramsLabel={t("keyPrograms")}
            />
          ))}
        </div>

        {/* Sleek CTA */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="group mt-16 flex flex-col items-center justify-between rounded-[4rem] bg-[#092a24] p-12 lg:flex-row lg:p-16 overflow-hidden relative"
        >
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {t("cta.title")}
            </h3>
            <p className="text-white/50 text-xl">{t("cta.description")}</p>
          </div>
          <button className="relative z-10 mt-10 shrink-0 rounded-full bg-[#f94b1c] px-12 py-6 text-sm font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-[#f94b1c] lg:mt-0">
            {t("cta.button")}
          </button>

          {/* Abstract background shape for CTA */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/5 blur-3xl group-hover:bg-[#f94b1c]/10 transition-colors" />
        </motion.div>
      </div>
    </section>
  );
};

export default AreasOfWorkSection;
