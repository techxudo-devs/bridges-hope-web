"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Heart,
  ChevronDown,
  Phone,
  Search,
  ShoppingCart,
  Menu,
  ArrowRight,
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "@/navigation";

const Navbar = ({ isSticky = false }: { isSticky?: boolean }) => {
  const t = useTranslations("Navbar");
  const tFooter = useTranslations("Footer");

  return (
    <header
      className={`${isSticky ? "bg-secondary py-3 shadow-lg" : "bg-secondary/30 py-5 border-b border-white/10"} text-white w-full px-4 md:px-8 transition-all duration-300`}
    >
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-white rounded-full scale-90 opacity-20 group-hover:scale-110 transition-transform"></div>
            <Heart className="text-white fill-white" size={32} />
            <Heart className="text-primary fill-primary absolute" size={16} />
          </div>
          <span className="text-3xl font-black tracking-tight font-nunito leading-none">
            Help<span className="text-primary">est</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center gap-8">
          <Link
            href="/"
            className="flex flex-col group cursor-pointer relative py-2"
          >
            <div className="flex items-center gap-1 text-primary font-bold">
              {t("home")}
            </div>
            <div className="absolute -bottom-[20px] left-0 h-0.5 bg-primary w-full"></div>
          </Link>
          <Link
            href="/about"
            className="font-bold text-[15px] hover:text-primary transition-colors py-2"
          >
            {t("about")}
          </Link>
          <Link
            href="/programs"
            className="font-bold text-[15px] hover:text-primary transition-colors py-2"
          >
            {t("programs")}
          </Link>
          <Link
            href="/projects"
            className="font-bold text-[15px] hover:text-primary transition-colors py-2"
          >
            {t("projects")}
          </Link>
          <Link
            href="/news"
            className="font-bold text-[15px] hover:text-primary transition-colors py-2"
          >
            {t("news")}
          </Link>
          <Link
            href="/contact"
            className="font-bold text-[15px] hover:text-primary transition-colors py-2"
          >
            {t("contact")}
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Call Section */}

          <LanguageSwitcher />

          {/* Donate Button */}
          <button className="hidden lg:flex items-center gap-4 bg-white/5 border border-white/10 hover:border-primary px-7 py-3 rounded-full transition-all group relative overflow-hidden">
            <span className="font-extrabold text-[15px] font-nunito relative z-10 transition-colors group-hover:text-white">
              {t("donateNow")}
            </span>
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center -mr-3 relative z-10 group-hover:scale-110 transition-transform shadow-lg">
              <ArrowRight size={18} strokeWidth={3} />
            </div>
            <div className="absolute cursor-pointer inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
