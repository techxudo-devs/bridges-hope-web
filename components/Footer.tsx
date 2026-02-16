"use client";

import React from "react";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import {
  Heart,
  Facebook,
  Instagram,
  Twitter as TwitterIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-secondary pt-24 pb-12 overflow-hidden text-white/80">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 xl:gap-16">
          {/* Column 1: Logo & About */}
          <div className="flex flex-col gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 group cursor-pointer w-fit"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-white rounded-full scale-90 opacity-20 group-hover:scale-110 transition-transform"></div>
                <Heart className="text-white fill-white" size={32} />
                <Heart
                  className="text-primary fill-primary absolute"
                  size={16}
                />
              </div>
              <span className="text-3xl font-black tracking-tight font-nunito text-white">
                Bridges<span className="text-primary">ofHope</span>
              </span>
            </Link>

            <p className="text-[15px] leading-relaxed text-white/50 font-medium max-w-sm">
              Bridges of Hope Association for Development and Rehabilitation
              serves communities affected by disasters, wars, and poverty
              through education, healthcare, relief, and rehabilitation.
            </p>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest transition-all hover:bg-white hover:text-primary w-fit"
            >
              Donate Now
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-8">
            <h3 className="text-white text-2xl font-black font-nunito tracking-tight uppercase">
              Quick Links
            </h3>
            <div className="flex flex-col gap-4 text-sm font-bold text-white/70">
              <Link
                href="/privacy-policy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-conditions"
                className="hover:text-primary transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/volunteer"
                className="hover:text-primary transition-colors"
              >
                Volunteer
              </Link>
              <Link
                href="/impact"
                className="hover:text-primary transition-colors"
              >
                Impact
              </Link>
            </div>
          </div>

          {/* Column 3: Social Links */}
          <div className="flex flex-col gap-8">
            <h3 className="text-white text-2xl font-black font-nunito tracking-tight uppercase">
              Social Links
            </h3>
            <div className="flex flex-col gap-5 text-sm font-bold text-white/70">
              <Link
                href="https://www.facebook.com/UmutKopruleri/"
                className="flex items-center gap-3 hover:text-primary transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-primary">
                  <Facebook size={18} />
                </span>
                Facebook
              </Link>
              <Link
                href="https://www.instagram.com/umutkopruleri/"
                className="flex items-center gap-3 hover:text-primary transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-primary">
                  <Instagram size={18} />
                </span>
                Instagram
              </Link>
              <Link
                href="https://x.com/umutkopruleri"
                className="flex items-center gap-3 hover:text-primary transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-primary">
                  <TwitterIcon size={18} />
                </span>
                X (@umutkopruleri)
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Area */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[14px] font-bold text-white/30 font-nunito">
            © Copyright 2025 by Bridges of Hope
          </p>
          <span className="text-[12px] font-black uppercase tracking-[0.15em] text-white/50">
            @umutkopruleri
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
