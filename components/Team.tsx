"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

const Team = () => {
  const t = useTranslations("Team");

  const teamMembers = [
    {
      name: "Adam Smith",
      role: t("roles.founder"),
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
      color: "#FFB800", // Yellow
    },
    {
      name: "Andre Molas",
      role: t("roles.manager"),
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000",
      color: "#FF5C00", // Orange
    },
    {
      name: "Carly Beitzel",
      role: t("roles.founder"),
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000",
      color: "#28D08F", // Green
    },
    {
      name: "Trent Felter",
      role: t("roles.volunteer"),
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000",
      color: "#7E3AF2", // Purple
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <SectionHeading
          subtitle={t("subtitle")}
          title={t("title")}
          highlight={t("highlight")}
        />

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] bg-white transition-all duration-500 shadow-lg hover:shadow-2xl border border-gray-100"
            >
              {/* Image Section */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale-50 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                />
              </div>

              {/* Info Section */}
              <div
                className="p-8 relative transition-colors duration-500 bg-[#F1F9FB] group-hover:bg-white"
                style={{ borderBottom: `4px solid ${member.color}33` }}
              >
                {/* Colored Bottom Bar (On Hover) */}
                <div
                  className="absolute bottom-0 left-0  h-2 w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: member.color }}
                />

                <h3 className="text-secondary text-2xl font-[800] font-nunito mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-500 font-medium text-sm">
                  {member.role}
                </p>

                {/* Floating Share Button */}
                <div
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 transform group-hover:-translate-y-2 cursor-pointer"
                  style={{ backgroundColor: member.color }}
                >
                  <Share2 size={16} strokeWidth={3} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
