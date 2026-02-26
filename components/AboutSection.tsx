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
      learnMore: t("learnMore"),
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

              {/* Action Section */}
              <div className="flex flex-wrap items-center gap-10">
                <Link
                  href="/gallery"
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

          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 mx-auto w-[90%] overflow-hidden ">
                <img
                  src={content.imagePrimaryUrl}
                  alt={content.imageAltPrimary}
                  className="w-full h-auto aspect-[4/5] object-contain"
                />
              </div>

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
