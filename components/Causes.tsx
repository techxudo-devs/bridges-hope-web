"use client";

import { useTranslations } from "next-intl";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { ArrowRight } from "lucide-react";
export default function Causes() {
  const t = useTranslations("Causes");
  const causesData = t.raw("items");

  const causes = [
    {
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000",
      title: causesData[0].title,
      description: causesData[0].description,
      raised: 20000,
      goal: 30000,
      category: causesData[0].category,
    },
    {
      image:
        "https://images.unsplash.com/photo-1509095087301-02c74a001b06?q=80&w=1000",
      title: causesData[1].title,
      description: causesData[1].description,
      raised: 55000,
      goal: 65000,
      category: causesData[1].category,
    },
    {
      image:
        "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1000",
      title: causesData[2].title,
      description: causesData[2].description,
      raised: 45000,
      goal: 50000,
      category: causesData[2].category,
    },
  ];

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading
          subtitle={t("subtitle")}
          title={t("title")}
          highlight={t("highlight")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {causes.map((cause, idx) => {
            const percentage = Math.round((cause.raised / cause.goal) * 100);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 bg-[#F3FBFD]"
              >
                {/* Image Box */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={cause.image}
                    alt={cause.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    {cause.category}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-8 lg:p-10 pt-10">
                  <h3 className="text-secondary text-2xl font-black font-cairo mb-4 hover:text-primary transition-colors line-clamp-2">
                    <Link href="#">{cause.title}</Link>
                  </h3>
                  <p className="text-slate-500 text-[15px] mb-8 line-clamp-2 font-medium leading-relaxed">
                    {cause.description}
                  </p>

                  {/* Progress Container */}
                  <div className="mb-6">
                    <div className="relative w-full bg-[#F3D7CF] rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-primary h-full rounded-full relative"
                      />
                      <div
                        className="absolute -top-10"
                        style={{ left: `calc(${percentage}% - 18px)` }}
                      >
                        <div className="relative bg-primary text-white text-[11px] font-black px-2 py-1 rounded-md">
                          {percentage}%
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-secondary font-black font-nunito text-sm">
                    <span>
                      ${cause.raised.toLocaleString()} {t("raisedLabel")}
                    </span>
                    <span>
                      ${cause.goal.toLocaleString()} {t("goalLabel")}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
