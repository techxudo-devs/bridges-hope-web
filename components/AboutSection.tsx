"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Link } from "@/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAboutSection } from "@/sanity/lib/getAboutSection";
import { urlFor } from "@/sanity/lib/image";

const AboutSection = ({ locale }: { locale: string }) => {
  const t = useTranslations("AboutSection");
  const { data } = useQuery({
    queryKey: ["aboutSection", locale],
    queryFn: () => getAboutSection(locale),
  });

  const content = useMemo(
    () => ({
      subtitle: data?.subtitle ?? t("subtitle"),
      title: data?.title ?? t("title"),
      highlight: data?.highlight ?? t("highlight"),
      descriptionLead: data?.descriptionLead,
      descriptionBody: data?.descriptionBody ?? t("descriptionBody"),
      quote: data?.quote ?? t("quote"),
      features: {
        treatmentHelp:
          data?.features?.treatmentHelp ?? t("features.treatmentHelp"),
        fundRaised: data?.features?.fundRaised ?? t("features.fundRaised"),
      },
      learnMore: data?.learnMore ?? t("learnMore"),
      needHelpLabel: data?.needHelpLabel ?? t("needHelpLabel"),
      phoneNumber: data?.phoneNumber ?? t("phoneNumber"),
      imageAltPrimary: data?.imageAltPrimary ?? t("imageAltPrimary"),
      imageAltSecondary: data?.imageAltSecondary ?? t("imageAltSecondary"),
      fundedLabel: data?.fundedLabel ?? t("fundedLabel"),
      fundedAmount: data?.fundedAmount ?? t("fundedAmount"),
      supportLabel: data?.supportLabel ?? t("supportLabel"),
      imagePrimaryUrl: data?.imagePrimary
        ? urlFor(data.imagePrimary).width(1000).quality(80).url()
        : "/picture-1.jpeg",
      imageSecondaryUrl: data?.imageSecondary
        ? urlFor(data.imageSecondary).width(800).quality(80).url()
        : "/picture-2.jpeg",
    }),
    [data, t],
  );

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
          <span key={index} className="text-secondary font-bold">
            {part}
          </span>,
        );
        return;
      }

      output.push(<React.Fragment key={index}>{part}</React.Fragment>);
    });

    return output;
  };

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-6 sm:px-10 lg:px-14 overflow-hidden bg-white"
    >
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-center">
          {/* Left Content Side */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionHeading
                subtitle={content.subtitle}
                title={content.title}
                highlight={content.highlight}
                centered={false}
                className="mb-4"
              />

              <div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-10">
                <p className="font-medium text-secondary/80">
                  {content.descriptionLead
                    ? renderHighlight(content.descriptionLead)
                    : t.rich("descriptionLead", {
                        highlight: (chunks) => (
                          <span className="text-secondary font-bold">
                            {chunks}
                          </span>
                        ),
                      })}
                </p>
                <p>{content.descriptionBody}</p>
                <p className="italic border-l-4 border-primary pl-6 bg-primary/5 py-4 rounded-r-xl font-nunito font-semibold text-secondary">
                  “{content.quote}”
                </p>
              </div>

              {/* Feature Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
                <div className="flex items-center gap-6 group">
                  <div className="relative w-18 h-18 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 bg-[#FFB800] rounded-[1.8rem] rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-[0_10px_25px_rgba(255,184,0,0.3)]"></div>
                    <div className="relative z-10 text-white">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="32"
                          cy="32"
                          r="10"
                          stroke="white"
                          strokeWidth="3"
                        />
                        <path
                          d="M32 27V37M27 32H37"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M15 25C12 28 12 32 12 32C12 32 12 36 15 39M49 39C52 36 52 32 52 32C52 32 52 28 49 25"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 32H6C4 32 4 34 4 36C4 38 6 38 7 38H14M52 32H58C60 32 60 30 60 28C60 26 58 26 57 26H50"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-secondary font-black text-2xl font-cairo tracking-tight">
                      {content.features.treatmentHelp}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="relative w-18 h-18 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 bg-[#28D08F] rounded-[1.8rem] rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-[0_10px_25px_rgba(40,208,143,0.3)]"></div>
                    <div className="relative z-10 text-white">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M42 42C46 38 46 28 42 24L32 12L22 24C18 28 18 38 22 42S33 46 42 42Z"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M32 22V32M28 27H36"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M18 48C22 46 27 46 32 48C37 50 42 50 46 48M18 48V56C18 58 19 59 21 59H43C45 59 46 58 46 56V52"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-secondary font-black text-2xl font-cairo tracking-tight">
                      {content.features.fundRaised}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Action Section */}
              <div className="flex flex-wrap items-center gap-10">
                <Link
                  href={{ pathname: "/", hash: "contact" }}
                  className="flex items-center gap-3 bg-white border-2 border-primary text-secondary px-8 py-3.5 rounded-full font-black font-nunito group hover:bg-primary hover:text-white transition-all duration-300"
                >
                  {content.learnMore}
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-colors">
                    <ArrowRight size={18} strokeWidth={3} />
                  </div>
                </Link>

                <div className="flex items-center gap-4"></div>
              </div>
            </motion.div>
          </div>

          {/* Right Image Side */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main Image with Brush-like Clip Path */}
              <div className="relative z-10 mx-auto w-[90%] overflow-hidden ">
                <img
                  src={content.imagePrimaryUrl}
                  alt={content.imageAltPrimary}
                  className="w-full h-auto aspect-[4/5] object-contain"
                />
              </div>

              {/* Smaller Overlapping Image with Brush-like Clip Path */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-10 -left-4 w-[55%] z-20 overflow-hidden "
              >
                <img
                  src={content.imageSecondaryUrl}
                  alt={content.imageAltSecondary}
                  className="w-full h-auto aspect-square object-cover "
                />
              </motion.div>

              {/* Floating Stat Hexagon */}
              <div className="absolute -right-8 top-[40%] -translate-y-1/2 z-30 bg-primary px-6 py-12 clip-path-hex text-white border-4 border-white shadow-2xl flex flex-col items-center justify-center min-w-[200px]">
                <div className="w-10 h-10 mb-4 text-white">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    className="w-full h-full text-white"
                  >
                    <path
                      d="M32 12C24 12 18 18 18 26C18 34 24 40 32 40C40 40 46 34 46 26C46 18 40 12 32 12Z"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M32 20V32M28 26H36"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 48C12 42 18 36 24 34L32 44L40 34C46 36 52 42 52 48V54"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none mt-1">
                    {content.fundedLabel}
                  </span>
                  <span className="text-xl font-black font-nunito mt-1">
                    {content.fundedAmount}
                  </span>
                </div>
              </div>

              {/* Circular Play Button Overlay */}

              <div className="absolute -top-10 -right-10 w-full h-full bg-primary/5 rounded-full -z-10 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .clip-path-hex {
          clip-path: polygon(
            25% 0%,
            75% 0%,
            100% 50%,
            75% 100%,
            25% 100%,
            0% 50%
          );
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
