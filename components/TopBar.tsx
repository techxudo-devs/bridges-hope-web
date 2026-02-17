"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Mail, MapPin, Twitter, Facebook, Instagram } from "lucide-react";

const TopBar = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("TopBar");

  return (
    <div className="bg-primary text-white py-1.5 px-3 sm:px-4 lg:px-8 2xl:px-16">
      <div className="mx-auto flex flex-col lg:flex-row justify-between items-center text-xs sm:text-sm lg:text-[15px] font-medium gap-3 lg:gap-0 max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center text-sm gap-2">
            <Mail className="h-4 w-4 lg:h-[18px] lg:w-[18px] text-white" />
            <span>{t("email")}</span>
          </div>
          <div className="hidden lg:flex text-sm items-center gap-2 border-l border-r px-4 border-white/20 pl-6">
            <MapPin className="h-4 w-4 lg:h-[18px] lg:w-[18px] text-white" />
            <span>{t("address")}</span>
          </div>
        </div>

        <div className="hidden lg:block text-sm font-normal text-white/90">
          {t("welcome")}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <a
              href={
                isArabic
                  ? "https://x.com/UmutKopruleriAr"
                  : "https://x.com/umutkopruleri"
              }
              target="_blank"
              rel="noreferrer"
              className="size-8 sm:size-9 lg:size-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-primary transition-all duration-300"
            >
              <Twitter className="h-4 w-4 lg:h-[18px] lg:w-[18px]" />
            </a>
            <a
              href={
                isArabic
                  ? "https://www.facebook.com/UmutKopruleriAr/"
                  : "https://www.facebook.com/UmutKopruleri/"
              }
              target="_blank"
              rel="noreferrer"
              className="size-8 sm:size-9 lg:size-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-primary transition-all duration-300"
            >
              <Facebook className="h-4 w-4 lg:h-[18px] lg:w-[18px]" />
            </a>

            <a
              href={
                isArabic
                  ? "https://www.instagram.com/umutkopruleriar/"
                  : "https://www.instagram.com/umutkopruleri/"
              }
              target="_blank"
              rel="noreferrer"
              className="size-8 sm:size-9 lg:size-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-primary transition-all duration-300"
            >
              <Instagram className="h-4 w-4 lg:h-[18px] lg:w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
