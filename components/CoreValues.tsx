"use client";

import React from "react";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { HeartHandshake, ShieldCheck, Scale, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getCoreValues } from "@/sanity/lib/getCoreValues";

const iconStyles = [
  {
    icon: <HeartHandshake size={32} strokeWidth={1.5} />,
    color: "#ff9c81",
  },
  {
    icon: <Rocket size={32} strokeWidth={1.5} />,
    color: "#ffb800",
  },
  {
    icon: <ShieldCheck size={32} strokeWidth={1.5} />,
    color: "#28d08f",
  },
  {
    icon: <Scale size={32} strokeWidth={1.5} />,
    color: "#d444d4",
  },
];

const CoreValues = ({ locale }: { locale: string }) => {
  const t = useTranslations("CoreValues");
  const { data } = useQuery({
    queryKey: ["coreValues", locale],
    queryFn: () => getCoreValues(locale),
  });

  const valuesData = (data?.values?.length
    ? data.values
    : (t.raw("values") as {
        title: string;
        description: string;
      }[])) as {
    title: string;
    description: string;
  }[];
  const values = valuesData.map((value, index) => ({
    ...value,
    ...iconStyles[index],
  }));

  const renderHighlight = (value?: string) => {
    if (!value) return null;

    const parts = value.split(/(<highlight>|<\/highlight>)/g);
    let isHighlight = false;
    const output: React.ReactNode[] = [];

    parts.forEach((part, index) => {
      if (part === "<highlight>") {
        isHighlight = true;
        return;
      }
      if (part === "</highlight>") {
        isHighlight = false;
        return;
      }

      if (!part) return;

      if (isHighlight) {
        output.push(
          <span key={index} className="text-primary">
            {part}
          </span>
        );
        return;
      }

      output.push(<React.Fragment key={index}>{part}</React.Fragment>);
    });

    return output;
  };

  const titleContent = data?.title
    ? renderHighlight(data.title)
    : t.rich("title", {
        highlight: (chunks) => <span className="text-primary">{chunks}</span>,
      });

  return (
    <section className="relative py-24 px-12 bg-white overflow-hidden">
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
            className="text-primary font-medium text-lg block mb-4 uppercase tracking-widest"
          >
            {data?.subtitle ?? t("subtitle")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary text-4xl md:text-5xl font-bold leading-tight"
          >
            {titleContent}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
