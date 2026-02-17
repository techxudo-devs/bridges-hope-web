"use client";

import React from "react";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { User, MessageCircle, ArrowRight, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionHeading from "./SectionHeading";

export default function Blog() {
  const t = useTranslations("Blog");
  const blogPosts = [
    {
      title: t("posts.0.title"),
      excerpt: t("posts.0.excerpt"),
      date: t("posts.0.date"),
      author: t("author"),
      comments: t("comment"),
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000",
      color: "#FFB800", // Yellow/Orange
    },
    {
      title: t("posts.1.title"),
      excerpt: t("posts.1.excerpt"),
      date: t("posts.1.date"),
      author: t("author"),
      comments: t("comment"),
      image:
        "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000",
      color: "#F94B1C", // Main Orange
    },
    {
      title: t("posts.2.title"),
      excerpt: t("posts.2.excerpt"),
      date: t("posts.2.date"),
      author: t("author"),
      comments: t("comment"),
      image:
        "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?q=80&w=1000",
      color: "#28D08F", // Green
    },
  ];

  return (
    <section id="news" className="py-24 px-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 ">
        {/* Header */}
        <SectionHeading
          title={t.rich("title", {
            highlight: (chunks) => (
              <span className="text-primary">{chunks}</span>
            ),
          })}
          subtitle={t("label")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container with Jagged Top */}
              <div className="relative h-[320px] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />

                {/* Shredded/Torn Effect at Top (Matches image) */}

                {/* Date Badge (Pill Style) */}
                <div className="absolute top-8 left-8 z-20 bg-white px-5 py-2' rounded-full shadow-md flex items-center gap-2">
                  <div className="p-1 rounded-sm bg-gray-50">
                    <Calendar size={12} style={{ color: post.color }} />
                  </div>
                  <span className="text-slate-500 text-[12px] font-black font-nunito italic">
                    {post.date}
                  </span>
                </div>
              </div>

              {/* Content area */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta Information (Handwritten style labels) */}
                <div className="flex items-center gap-8 mb-6"></div>

                <h4 className="text-secondary text-2xl lg:text-[22px] font-[600] font-cairo mb-5 leading-[1.3] transition-colors group-hover:text-primary">
                  {post.title}
                </h4>

                <p className="text-gray-400 text-[15px] leading-none mb-10 flex-grow font-medium">
                  {post.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
