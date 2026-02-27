"use client";

import React from "react";
import { Link } from "@/navigation";
import {
  Facebook,
  Instagram,
  Twitter as TwitterIcon,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getFooterSection } from "@/sanity/lib/getFooterSection";
const Footer = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const tFooter = useTranslations("Footer");
  const tNavbar = useTranslations("Navbar");
  const tPages = useTranslations("Pages");
  const { data } = useQuery({
    queryKey: ["footerSection", locale],
    queryFn: () => getFooterSection(locale),
  });
  const quickLinks = [
    { hash: "home", label: tNavbar("home") },
    { hash: "programs", label: tNavbar("areaOfWork") },
    { href: "/projects", label: tNavbar("contributeProjects") },
    {
      href: { pathname: "/projects", hash: "completed-projects" },
      label: tNavbar("completedProjects"),
    },
    { href: "/blog", label: tNavbar("storiesImpact") },
    { hash: "about", label: tNavbar("about") },
    { hash: "contact", label: tNavbar("contact") },
  ];

  const socialLinks = [
    {
      href: isArabic
        ? "https://www.facebook.com/UmutKopruleriAr/"
        : "https://www.facebook.com/UmutKopruleri/",
      label: "Facebook",
      icon: Facebook,
    },
    {
      href: isArabic
        ? "https://www.instagram.com/umutkopruleriar/"
        : "https://www.instagram.com/umutkopruleri/",
      label: "Instagram",
      icon: Instagram,
    },
    {
      href: isArabic
        ? "https://x.com/UmutKopruleriAr"
        : "https://x.com/umutkopruleri",
      label: "X (@umutkopruleri)",
      icon: TwitterIcon,
    },
    {
      href: isArabic
        ? "https://www.youtube.com/@UmutKopruleriAr"
        : "https://www.youtube.com/@UmutKopruleri",
      label: "YouTube",
      icon: Youtube,
    },
  ];

  const contactItems = [
    { icon: Mail, value: data?.email ?? tFooter("email") },
    { icon: Phone, value: data?.phone ?? tFooter("phone") },
    { icon: MapPin, value: data?.address ?? tFooter("address") },
  ];

  return (
    <footer className="relative bg-secondary pt-16 pb-8 overflow-hidden text-white/80">
      {/* Background Overlay Image */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600')",
        }}
      />
      <div className="absolute inset-0 bg-[#092A24]/90" />{" "}
      {/* Darkened secondary overlay */}
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Column 1: Logo & About */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 group bg-white rounded-full cursor-pointer w-fit"
            >
              <Image src="/logo.png" width={100} alt="Logo" height={100} />
            </Link>

            <p className="text-[14px] leading-relaxed text-white/50 font-medium max-w-sm">
              {data?.aboutText ?? tFooter("aboutText")}
            </p>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest transition-all hover:bg-white hover:text-primary w-fit"
            >
              {tNavbar("donateNow")}
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-xl font-black font-cairo tracking-tight uppercase">
              {data?.quickLinks ?? tFooter("quickLinks")}
            </h3>
            <div className="flex flex-col gap-3 text-sm font-bold text-white/70">
              {quickLinks.map((link) => {
                const linkKey =
                  link.hash ??
                  (typeof link.href === "string"
                    ? link.href
                    : `${link.href?.pathname ?? ""}#${link.href?.hash ?? ""}`);

                return (
                  <Link
                    key={linkKey}
                    href={link.href ?? { pathname: "/", hash: link.hash }}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/privacy-policy"
                className="hover:text-primary transition-colors"
              >
                {tPages("privacy.title")}
              </Link>
            </div>
          </div>

          {/* Column 3: Social Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-xl font-black font-cairo tracking-tight uppercase">
              {data?.contactUs ?? tFooter("contactUs")}
            </h3>
            <div className="flex flex-col gap-4 text-sm font-bold text-white/70">
              <div className="flex flex-col gap-2.5">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.value}
                      className="flex items-center gap-3 footer-item"
                    >
                      <span className="flex size-9 items-center justify-center rounded-full bg-white/10 text-primary">
                        <Icon className="size-4" />
                      </span>
                      <span className="text-white/60 font-semibold text-[13px] text-start">
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 hover:text-primary transition-colors footer-item text-start"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright Area */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] font-bold text-white/30 font-nunito">
            {data?.rights ?? tFooter("rights")}
          </p>
          <span className="text-[11px] font-black uppercase tracking-[0.15em] text-white/50">
            @umutkopruleri
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
