"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeartHandshake, ShieldCheck, Scale, Rocket } from "lucide-react";

const values = [
  {
    title: "Health Services",
    description:
      "Providing basic healthcare and specialized medical support to those in need.",
    icon: <HeartHandshake size={32} strokeWidth={1.5} />,
    color: "#ff9c81", // Added missing color property
  },
  {
    title: "Education & Development",
    description:
      "Developing educational programs and specialized rehabilitation training.",
    icon: <Rocket size={32} strokeWidth={1.5} />,
    color: "#ffb800",
  },
  {
    title: "Humanitarian Relief",
    description:
      "Emergency aid and long-term support for victims of wars and disasters.",
    icon: <ShieldCheck size={32} strokeWidth={1.5} />,
    color: "#28d08f",
  },
  {
    title: "Social Inclusion",
    description:
      "Integrating marginalized groups into society with dignity and justice.",
    icon: <Scale size={32} strokeWidth={1.5} />,
    color: "#d444d4",
  },
];

const CoreValues = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Heart Decoration */}
      <div className="absolute top-10 right-10 w-[600px] h-[600px] pointer-events-none opacity-10">
        <img
          src="/core-values.png"
          alt="decoration"
          className="w-full h-full object-contain animate-pulse"
        />
      </div>

      <div className="container mx-auto px-4  relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-lg block mb-4 uppercase tracking-widest"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary text-4xl md:text-5xl font-black leading-tight"
          >
            Guided by Our <span className="text-primary">Core Values</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-[#F1F9FB] p-10 rounded-[2.5rem] flex flex-col items-center text-center transition-all duration-500 border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-xl hover:shadow-gray-100"
            >
              {/* Hexagon Icon Container */}
              <div className="relative mb-8 w-24 h-24 flex items-center justify-center">
                <div
                  className="absolute inset-0 transition-all duration-500 group-hover:rotate-90 group-hover:scale-110 shadow-lg"
                  style={{
                    backgroundColor: val.color,
                    clipPath:
                      "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  }}
                />
                <div
                  className="absolute inset-2 transition-transform duration-500 group-hover:rotate-45"
                  style={{
                    border: `2px solid rgba(255, 255, 255, 0.5)`,
                    clipPath:
                      "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  }}
                />
                <div className="relative z-10 text-white">{val.icon}</div>

                {/* Floating Dot */}
                <div className="absolute -right-1 top-1/2 w-4 h-4 rounded-full border-2 border-white bg-white shadow-sm group-hover:scale-125 transition-transform duration-500 flex items-center justify-center">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: val.color }}
                  />
                </div>
              </div>

              <h3 className="text-secondary text-2xl font-bold mb-4 tracking-tight">
                {val.title}
              </h3>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-8 font-medium">
                {val.description}
              </p>

              <Link
                href="#"
                className="group/btn mt-auto flex items-center gap-2 text-secondary font-black text-sm uppercase tracking-widest transition-colors hover:text-primary"
              >
                Read More
                <div className="w-6 h-[2px] bg-primary relative transition-all group-hover/btn:w-10">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-primary rotate-45" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
