"use client";

import React from "react";
import { Link } from "@/navigation";
import {
  Facebook,
  Instagram,
  Twitter as TwitterIcon,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
const Footer = () => {
  const tFooter = useTranslations("Footer");
  const tNavbar = useTranslations("Navbar");
  const tPages = useTranslations("Pages");
  const quickLinks = [
    { hash: "about", label: tNavbar("about") },
    { hash: "programs", label: tNavbar("programs") },
    { hash: "projects", label: tNavbar("projects") },
    { hash: "news", label: tNavbar("news") },
    { hash: "contact", label: tNavbar("contact") },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/UmutKopruleri/",
      label: "Facebook",
      icon: Facebook,
    },
    {
      href: "https://www.instagram.com/umutkopruleri/",
      label: "Instagram",
      icon: Instagram,
    },
    {
      href: "https://x.com/umutkopruleri",
      label: "X (@umutkopruleri)",
      icon: TwitterIcon,
    },
  ];

  const contactItems = [
    { icon: Mail, value: tFooter("email") },
    { icon: Phone, value: tFooter("phone") },
    { icon: MapPin, value: tFooter("address") },
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
              className="flex items-center gap-2 group bg-white cursor-pointer w-fit"
            >
              <Image src="/logo.png" width={100} alt="Logo" height={100} />
            </Link>

            <p className="text-[14px] leading-relaxed text-white/50 font-medium max-w-sm">
              {tFooter("aboutText")}
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
            <h3 className="text-white text-xl font-black font-nunito tracking-tight uppercase">
              {tFooter("quickLinks")}
            </h3>
            <div className="flex flex-col gap-3 text-sm font-bold text-white/70">
              {quickLinks.map((link) => (
                <Link
                  key={link.hash}
                  href={{ pathname: "/", hash: link.hash }}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
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
            <h3 className="text-white text-xl font-black font-nunito tracking-tight uppercase">
              {tFooter("contactUs")}
            </h3>
            <div className="flex flex-col gap-4 text-sm font-bold text-white/70">
              <div className="flex flex-col gap-2.5">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.value} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-primary">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-white/60 font-semibold text-[13px]">
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
                    className="flex items-center gap-3 hover:text-primary transition-colors"
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
            {tFooter("rights")}
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
