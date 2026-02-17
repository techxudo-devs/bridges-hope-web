"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";

const testimonials = [
  {
    name: "Jessica Miller",
    role: "Donor & Volunteer",
    content:
      "Working with this organization has been incredibly rewarding. I have seen firsthand the positive impact they make in communities. Their dedication and transparency are truly commendable.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000",
  },
  {
    name: "Robert Anderson",
    role: "Corporate Partner",
    content:
      "Our company has been partnering with them for 3 years. The professionalism and impact of their programs are outstanding. They truly make every dollar count.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000",
  },
  {
    name: "Maria Garcia",
    role: "Monthly Donor",
    content:
      "I started donating monthly last year and I am amazed by the regular updates and transparency. Knowing exactly where my contribution goes makes me feel connected to the cause.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading
          subtitle="Testimonials"
          title="What People Say"
          highlight="Say"
        />

        <div className="max-w-5xl mx-auto relative">
          {/* Decorative Large Quote */}
          <div className="absolute -top-10 -left-10 text-primary/10 select-none pointer-events-none">
            <Quote size={200} strokeWidth={1} />
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-[#F8FAFC] rounded-[4rem] p-10 md:p-16 lg:p-20 shadow-sm border border-slate-100 flex flex-col items-center text-center"
              >
                {/* User Image */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg z-20">
                    <Quote size={16} fill="currentColor" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-8">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-[#FFB800] text-[#FFB800]"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-secondary text-xl md:text-2xl font-medium font-nunito leading-relaxed mb-10 max-w-3xl">
                  "{testimonials[activeIndex].content}"
                </p>

                {/* Info */}
                <div>
                  <h4 className="text-secondary text-2xl font-[900] font-cairo mb-1">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-primary font-bold text-sm uppercase tracking-widest">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex justify-center gap-4 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? "bg-primary w-12"
                      : "bg-slate-200 w-2.5 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
