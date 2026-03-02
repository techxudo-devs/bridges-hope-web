"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { rtlLocales, type Locale } from "@/i18n";
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
  primary: "#1cab2d",
  dark: "#092a24",
  accent: "#fdf2f0",
  muted: "#64748b",
};

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
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[160] h-full w-full max-w-lg bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] p-10 overflow-y-auto"
          >
            <motion.button
              onClick={onClose}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="group mb-12 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-black  cursor-pointer transition-colors"
            >
              <X size={18} /> Close
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="flex h-20 w-20 items-center justify-center rounded-3xl mb-8"
              style={{
                backgroundColor: `${THEME.primary}10`,
                color: THEME.primary,
              }}
            >
              <Icon size={30} strokeWidth={1.2} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold mb-4 tracking-tight"
              style={{ color: THEME.dark }}
            >
              {service.name}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-md leading-relaxed text-slate-600 mb-10"
            >
              {service.description}
            </motion.p>

            {service.subItems && (
              <div className="grid grid-cols-1 gap-4">
                {service.subItems.map((item: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: THEME.primary }}
                    />
                    <span className="font-medium text-slate-800">{item}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {service.name.toLowerCase().includes("amputation") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-10 p-8 rounded-[2.5rem] bg-emerald-50 border border-emerald-100"
              >
                <Info className="text-emerald-600 mb-4" />
                <p className="text-emerald-900 font-medium">
                  Over 21,000 recorded cases in Gaza. Our mission is to
                  transform injury into empowerment.
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const WorkCard = ({
  pillar,
  keyProgramsLabel,
  isRtl,
  index,
}: {
  pillar: any;
  keyProgramsLabel: string;
  isRtl: boolean;
  index: number;
}) => {
  const [selectedService, setSelectedService] = useState(null);
  const Icon = pillar.icon;
  const contentAlignment = isRtl ? "text-right" : "text-center lg:text-left";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.4, 0.25, 1],
          delay: index * 0.15,
        }}
        whileHover={{
          scale: 1.02,
          y: -8,
          transition: { duration: 0.4, ease: "easeOut" },
        }}
        className="group relative overflow-hidden rounded-[3rem] bg-white p-8 md:p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center gap-8">
          {/* Index and Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4 shrink-0"
          >
            <div className="flex size-16 items-center justify-center rounded-[2rem] bg-slate-50 text-slate-900 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-3">
              <Icon size={40} strokeWidth={1.2} />
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
            className={`flex-grow ${contentAlignment}`}
          >
            <h3
              className="text-2xl font-bold mb-4 tracking-tight"
              style={{ color: THEME.dark }}
            >
              {pillar.title}
            </h3>
            <p className="max-w-xl text-slate-500 text-sm leading-relaxed mb-4 mx-auto lg:mx-0">
              {pillar.description}
            </p>
          </motion.div>

          {/* Programs Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + index * 0.15, duration: 0.6 }}
            className="w-full lg:w-1/3 xl:w-2/5"
          >
            <p
              className={`text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-5 ${
                isRtl ? "text-right" : "text-center lg:text-left"
              }`}
            >
              {keyProgramsLabel}
            </p>
            <div
              className={`flex flex-wrap gap-2 ${
                isRtl
                  ? "justify-end flex-row-reverse"
                  : "justify-center lg:justify-start"
              }`}
            >
              {pillar.services.map((service: any, idx: number) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedService(service)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + idx * 0.1,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 rounded-full border cursor-pointer bg-white px-5 py-2.5 text-xs font-semibold text-slate-600 transition-all border-primary hover:text-primary hover:shadow-md ${
                    isRtl ? "flex-row-reverse text-right" : ""
                  }`}
                >
                  {service.name}
                  <motion.span
                    whileHover={{ x: 2, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight size={14} className="opacity-40" />
                  </motion.span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Subtle Decorative Background Gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl transition-all duration-700 group-hover:opacity-100 group-hover:scale-125"
        />
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
  const locale = useLocale() as Locale;
  const isRtl = rtlLocales.includes(locale);

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
    <section
      id="programs"
      className="relative bg-[#fafafa] py-32 px-6 sm:px-10 lg:px-18"
    >
      <div className="container mx-auto ">
        {/* Header Design: Clean & Editorial */}
        <div className="mb-24 flex flex-col items-start md:flex-row md:items-center justify-between gap-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="h-[1px] bg-primary"
              />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
                {t("label")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="text-5xl md:text-6xl font-bold leading-[0.95] tracking-tighter"
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
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="lg:max-w-xl 2xl:max-w-3xl max-w-xl text-slate-500 text-sm border-l border-slate-200 pl-8"
          >
            {t("summary")}
          </motion.p>
        </div>

        {/* Horizontal Card List */}
        <div className="flex flex-col gap-5">
          {areasOfWork.map((pillar, index) => (
            <WorkCard
              key={index}
              pillar={pillar}
              keyProgramsLabel={t("keyPrograms")}
              isRtl={isRtl}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.4 },
          }}
          className="group mt-16 flex flex-col items-center justify-between rounded-[4rem] bg-[#092a24] p-6 lg:flex-row lg:p-8 overflow-hidden relative"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative z-10"
          >
            <h3 className="text-3xl md:text-2xl 2xl:text-3xl font-bold text-white tracking-tight">
              {t("cta.title")}
            </h3>
            <p className="text-white/50 text-md">{t("cta.description")}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/donate"
              className="relative z-10 mt-10 shrink-0 rounded-full bg-primary px-12 py-6 text-sm font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-primary lg:mt-0 inline-block"
            >
              {t("cta.button")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/5 blur-3xl group-hover:bg-primary/10 transition-colors duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AreasOfWorkSection;
