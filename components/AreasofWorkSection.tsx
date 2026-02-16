"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

const primaryColor = "#f94b1c";
const darkColor = "#092a24";

const areasOfWork = [
  {
    id: 1,
    title: "Rehabilitation & Capacity Building",
    icon: Heart,
    description:
      "We believe rehabilitation is the bridge from disability to self-reliance, and from isolation to inclusion.",
    services: [
      { name: "Down Syndrome", icon: Users },
      { name: "Speech Disorders", icon: MessageCircle },
      { name: "Autism (ASD)", icon: Brain },
      { name: "Psych Support", icon: HeartPulse },
    ],
  },
  {
    id: 2,
    title: "Healthcare & Medical Services",
    icon: Stethoscope,
    description:
      "Health is the foundation of a dignified life. We aim to relieve pain and protect individuals in fragile environments.",
    services: [
      { name: "Physical Paralysis", icon: Activity },
      { name: "Cerebral Palsy", icon: Baby },
      { name: "Hearing Impairment", icon: Ear },
      { name: "Prosthetics", icon: PersonStanding },
    ],
  },
  {
    id: 3,
    title: "Inclusive Education",
    icon: GraduationCap,
    description:
      "Education is a gateway to empowerment. We protect generations from ignorance and marginalization.",
    services: [
      { name: "Intellectual Disability", icon: Brain },
      { name: "Learning Difficulties", icon: BookOpen },
      { name: "Special Needs", icon: UserCircle },
      { name: "Literacy", icon: FileText },
    ],
  },
  {
    id: 4,
    title: "Humanitarian Response",
    icon: HandHeart,
    description:
      "Relief is a humanitarian stance that preserves life and protects dignity when crises intensify.",
    services: [
      { name: "Food Assistance", icon: Utensils },
      { name: "Clean Water", icon: Droplet },
      { name: "Shelter & Tents", icon: Home },
      { name: "Cash Assistance", icon: DollarSign },
    ],
  },
];

const WorkPillar = ({
  pillar,
  index,
}: {
  pillar: (typeof areasOfWork)[0];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-[#f94b1c] to-[#f94b1c]/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-8 transition-all duration-500 hover:border-[#f94b1c]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        {/* Decorative background number */}
        <span className="absolute -right-4 -top-8 select-none text-9xl font-black text-gray-50 transition-colors group-hover:text-[#f94b1c]/5">
          0{index + 1}
        </span>

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon Header */}
          <div className="mb-8 flex items-center justify-between">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:rotate-6"
              style={{
                backgroundColor: `${primaryColor}10`,
                color: primaryColor,
              }}
            >
              <Icon size={32} strokeWidth={1.5} />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 text-gray-400 transition-colors group-hover:bg-[#f94b1c] group-hover:text-white">
              <ArrowUpRight size={20} />
            </div>
          </div>

          <h3
            className="mb-4 text-2xl font-bold tracking-tight"
            style={{ color: darkColor }}
          >
            {pillar.title}
          </h3>

          <p className="mb-8 text-sm leading-relaxed text-gray-500 lg:text-base">
            {pillar.description}
          </p>

          {/* Quick Service Tags */}
          <div className="mt-auto">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Key Programs
            </div>
            <div className="flex flex-wrap gap-2">
              {pillar.services.map((service, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50/50 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-[#f94b1c]/20 hover:bg-white"
                >
                  <service.icon size={12} style={{ color: primaryColor }} />
                  {service.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Accent Bar */}
        <div
          className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: primaryColor }}
        />
      </div>
    </motion.div>
  );
};

const AreasOfWorkSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Background Micro-patterns */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(${darkColor} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Large Decorative Circles */}
      <div
        className="absolute -left-20 top-20 h-96 w-96 rounded-full blur-[120px] opacity-10"
        style={{ backgroundColor: primaryColor }}
      />
      <div
        className="absolute -right-20 bottom-20 h-96 w-96 rounded-full blur-[120px] opacity-10"
        style={{ backgroundColor: darkColor }}
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-8 mb-20 lg:flex-row lg:items-end">
          <div className="max-w-2xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4 flex items-center justify-center gap-3 lg:justify-start"
            >
              <div
                className="h-[2px] w-12"
                style={{ backgroundColor: primaryColor }}
              />
              <span
                className="text-sm font-bold uppercase tracking-[0.3em]"
                style={{ color: primaryColor }}
              >
                Our Mission in Action
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black md:text-5xl lg:text-7xl lg:leading-[1.1]"
              style={{ color: darkColor }}
            >
              How We Create <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: `1px ${darkColor}` }}
              >
                Real Change.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden lg:block max-w-sm"
          >
            <p className="text-lg leading-relaxed text-gray-500 border-l-2 pl-6 border-gray-100">
              Integrated humanitarian systems preserving dignity through
              education, relief, and medical care.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {areasOfWork.map((pillar, index) => (
            <WorkPillar key={pillar.id} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Bottom CTA Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center justify-center rounded-[3rem] bg-[#092a24] p-12 text-center text-white lg:flex-row lg:text-left lg:justify-between"
        >
          <div>
            <h3 className="mb-2 text-2xl font-bold md:text-3xl">
              Want to support these initiatives?
            </h3>
            <p className="text-white/60">
              Every contribution helps us expand our reach to those who need it
              most.
            </p>
          </div>
          <button className="mt-8 shrink-0 rounded-full bg-[#f94b1c] px-10 py-5 text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 hover:shadow-2xl active:scale-95 lg:mt-0">
            Become a Partner
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AreasOfWorkSection;
