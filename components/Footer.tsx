"use client";

import React from "react";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  Mail,
  Phone,
  Twitter as TwitterIcon,
} from "lucide-react";

const Footer = () => {
  const galleryImages = [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=150",
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=150",
    "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?q=80&w=150",
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb8?q=80&w=150",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=150",
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=150",
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb8?q=80&w=150",
    "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?q=80&w=150",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=150",
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 xl:gap-16">
          {/* Column 1: Logo & Contact */}
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
                Help<span className="text-primary">est</span>
              </span>
            </Link>

            <p className="text-[15px] leading-relaxed text-white/50 font-medium max-w-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              iaculis lorem augue, at dapibus quam aliquet ex...
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform shrink-0">
                  <MapPin size={18} className="text-white" />
                </div>
                <span className="text-sm font-bold text-white/70">
                  13/A, Miranda Halim City.
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-[#FF5C00] rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform shrink-0">
                  <Mail size={18} className="text-white" />
                </div>
                <span className="text-sm font-bold text-white/70">
                  demo@example.com
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-[#F94B1C] rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform shrink-0">
                  <Phone size={18} className="text-white" />
                </div>
                <span className="text-sm font-bold text-white/70">
                  099 695 695 35
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Gallery */}
          <div className="flex flex-col gap-8">
            <h3 className="text-white text-2xl font-black font-nunito tracking-tight uppercase">
              Gallery
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {galleryImages.map((src, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-md overflow-hidden group relative cursor-pointer shadow-lg"
                >
                  <img
                    src={src}
                    alt="Gallery item"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Latest News */}
          <div className="flex flex-col gap-8">
            <h3 className="text-white text-2xl font-black font-nunito tracking-tight uppercase">
              Latest News
            </h3>
            <div className="flex flex-col gap-4">
              {[
                {
                  title: "Change your Life Through Education",
                  date: "July 29, 2025",
                },
                {
                  title: "Donate your woolens this winter",
                  date: "July 29, 2025",
                },
              ].map((news, i) => (
                <Link
                  key={i}
                  href="#"
                  className="bg-[#0b2420] p-6 rounded-xl hover:bg-black/40 transition-all group border border-white/5 hover:border-primary/20"
                >
                  <h4 className="text-white/90 font-bold mb-2 leading-snug group-hover:text-primary transition-colors text-[16px]">
                    {news.title}
                  </h4>
                  <span className="text-primary text-[11px] font-black uppercase tracking-[0.2em]">
                    {news.date}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Twitter Feed */}
          <div className="flex flex-col gap-8 relative">
            <h3 className="text-white text-2xl font-black font-nunito tracking-tight uppercase">
              Twitter Feed
            </h3>
            <div className="flex flex-col gap-6">
              <p className="text-[15px] underline-offset-4 leading-relaxed text-white/60 italic font-medium">
                Lorem ipsum is simply free text dolor sit amet, consectetur
                adipisicing elit sed do eiusmod tempor incididunt
                <span className="block text-primary mt-2 cursor-pointer hover:underline not-italic font-bold">
                  http://t.twitter.com
                </span>
              </p>

              <div className="flex items-center gap-4">
                <div className="text-primary p-2 bg-primary/10 rounded-full">
                  <TwitterIcon size={24} fill="currentColor" stroke="none" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-black text-[15px] font-nunito">
                      John Smith
                    </span>
                    <span className="text-primary text-sm font-bold">
                      @helpest
                    </span>
                  </div>
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.1em]">
                    18 Hours Ago
                  </span>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex gap-2.5 mt-2">
                <div className="w-3 h-3 bg-primary rounded-sm shadow-sm" />
                <div className="w-3 h-3 bg-white rounded-sm shadow-sm" />
                <div className="w-3 h-3 bg-white rounded-sm shadow-sm" />
              </div>
            </div>

            {/* Vertical BACK TOP Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="absolute -right-12 bottom-0 flex items-center gap-4 rotate-90 origin-right cursor-pointer group hidden xl:flex"
            >
              <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em] whitespace-nowrap group-hover:-translate-x-2 transition-transform">
                BACK TOP
              </span>
              <div className="w-16 h-[2px] bg-primary rounded-full group-hover:w-24 transition-all" />
            </button>
          </div>
        </div>

        {/* Copyright Area */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[14px] font-bold text-white/30 font-nunito">
            © Copyright 2025 by Helpest.com
          </p>
          <div className="flex items-center gap-10 text-[12px] font-black uppercase tracking-[0.15em] text-white/50">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
