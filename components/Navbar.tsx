"use client";

import React, { useState } from "react";
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
import Image from "next/image";

const Navbar = ({ isSticky = false }: { isSticky?: boolean }) => {
  const t = useTranslations("Navbar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const navLinks = [
    { hash: "home", label: t("home"), isActive: true },
    { hash: "programs", label: t("areaOfWork") },
    { href: "/projects", label: t("contributeProjects") },
    {
      href: { pathname: "/projects", hash: "completed-projects" },
      label: t("completedProjects"),
    },
    { href: "/blog", label: t("storiesImpact") },
    { hash: "about", label: t("about") },
    { hash: "contact", label: t("contact") },
  ];
  const primaryLinks = navLinks.slice(0, 4);
  const overflowLinks = navLinks.slice(4);

  return (
    <header
      className={`${isSticky ? "bg-secondary py-3 shadow-lg" : "bg-secondary/30 py-2 border-b border-white/10"} text-white w-full px-4 md:px-6 lg:px-6 2xl:px-10 transition-all duration-300 font-cairo`}
    >
      <div className="mx-auto flex items-center justify-between container ">
        <Link
          href="/"
          className="flex bg-white rounded-full items-center gap-2 group cursor-pointer"
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={90}
            height={90}
            className="h-12 w-12 md:h-12 md:w-12 2xl:h-[90px] 2xl:w-[90px] lg:h-[60px] lg:w-[60px]"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex xl:hidden items-center gap-6">
          {primaryLinks.map((link) => {
            const linkKey =
              link.hash ??
              (typeof link.href === "string"
                ? link.href
                : `${link.href?.pathname ?? ""}#${link.href?.hash ?? ""}`);

            return (
              <Link
                key={linkKey}
                href={link.href ?? { pathname: "/", hash: link.hash }}
                className={
                  link.isActive
                    ? "flex flex-col group cursor-pointer relative py-1"
                    : "font-bold text-[15px] hover:text-primary transition-colors py-2"
                }
              >
                <div
                  className={
                    link.isActive
                      ? "flex items-center gap-1 text-primary font-medium"
                      : "font-medium"
                  }
                >
                  {link.label}
                </div>
                {link.isActive ? (
                  <div className="absolute -bottom-[20px] left-0 h-0.5 bg-primary w-full"></div>
                ) : null}
              </Link>
            );
          })}
          <div
            className="relative"
            onMouseEnter={() => setIsMoreOpen(true)}
            onMouseLeave={() => setIsMoreOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsMoreOpen((open) => !open)}
              className="flex items-center gap-2 font-bold text-[15px] hover:text-primary transition-colors py-2"
            >
              {t("more")}
              <ChevronDown size={16} />
            </button>
            {isMoreOpen ? (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-secondary/95 border border-white/10 shadow-xl p-3 z-50">
                <div className="flex flex-col gap-2">
                  {overflowLinks.map((link) => {
                    const linkKey =
                      link.hash ??
                      (typeof link.href === "string"
                        ? link.href
                        : `${link.href?.pathname ?? ""}#${link.href?.hash ?? ""}`);

                    return (
                      <Link
                        key={linkKey}
                        href={link.href ?? { pathname: "/", hash: link.hash }}
                        className="font-bold text-[14px] text-white/80 hover:text-primary transition-colors"
                        onClick={() => setIsMoreOpen(false)}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </nav>

        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => {
            const linkKey =
              link.hash ??
              (typeof link.href === "string"
                ? link.href
                : `${link.href?.pathname ?? ""}#${link.href?.hash ?? ""}`);

            return (
              <Link
                key={linkKey}
                href={link.href ?? { pathname: "/", hash: link.hash }}
                className={
                  link.isActive
                    ? "flex flex-col group cursor-pointer relative py-1"
                    : "font-bold  lg:text-[12px] 2xl:text-[15px] hover:text-primary transition-colors py-2"
                }
              >
                <div
                  className={
                    link.isActive
                      ? "flex items-center gap-1 text-primary font-medium"
                      : "font-medium"
                  }
                >
                  {link.label}
                </div>
                {link.isActive ? (
                  <div className="absolute -bottom-[20px] left-0 h-0.5 bg-primary w-full"></div>
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Call Section */}

          <LanguageSwitcher className="hidden lg:block" />

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex lg:hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:text-primary hover:border-primary transition-colors"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            <Menu size={20} />
          </button>

          {/* Donate Button */}
          <Link
            href="/donate"
            className="hidden cursor-pointer lg:flex items-center gap-4 bg-white/5 border border-white/10 hover:border-primary px-7 py-2 rounded-full transition-all group relative overflow-hidden"
          >
            <span className="font-extrabold text-[13px] font-nunito relative z-10 transition-colors group-hover:text-white">
              {t("donateNow")}
            </span>
            <div className="size-6  bg-primary rounded-full flex items-center justify-center -mr-3 relative z-10 group-hover:scale-110 transition-transform shadow-lg">
              <ArrowRight size={18} strokeWidth={3} />
            </div>
            <div className="absolute cursor-pointer inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
        </div>
      </div>

      {isMenuOpen ? (
        <nav className="lg:hidden mt-6 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const linkKey =
                link.hash ??
                (typeof link.href === "string"
                  ? link.href
                  : `${link.href?.pathname ?? ""}#${link.href?.hash ?? ""}`);

              return (
                <Link
                  key={linkKey}
                  href={link.href ?? { pathname: "/", hash: link.hash }}
                  className="font-bold text-[15px] text-white/80 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-6">
            <LanguageSwitcher className="block lg:hidden" />
          </div>
        </nav>
      ) : null}
    </header>
  );
};

export default Navbar;
