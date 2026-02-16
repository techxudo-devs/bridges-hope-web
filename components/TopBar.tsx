"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Twitter, Facebook, Instagram } from "lucide-react";

const TopBar = () => {
  const t = useTranslations("TopBar");

  return (
    <div className="bg-primary text-white py-1 px-4 md:px-10">
      <div className="mx-auto flex flex-col md:flex-row justify-between items-center text-[17px] font-medium gap-3 md:gap-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-white" />
            <span>{t("email")}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 border-l border-white/20 pl-6">
            <MapPin size={18} className="text-white" />
            <span>{t("address")}</span>
          </div>
        </div>

        <div className="hidden lg:block font-normal text-white/90">
          {t("welcome")}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white/90">{t("follow")}</span>
          <div className="flex items-center gap-2">
            <a
              href="https://x.com/umutkopruleri"
              target="_blank"
              rel="noreferrer"
              className="size-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-primary transition-all duration-300"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://www.facebook.com/UmutKopruleri/"
              target="_blank"
              rel="noreferrer"
              className="size-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-primary transition-all duration-300"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://www.instagram.com/umutkopruleri/"
              target="_blank"
              rel="noreferrer"
              className="size-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-primary transition-all duration-300"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
