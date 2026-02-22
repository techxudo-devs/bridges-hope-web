"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import SectionHeading from "./SectionHeading";
import { getBlogPosts } from "@/sanity/lib/getBlogPosts";
import { getBlogSection } from "@/sanity/lib/getBlogSection";
import { urlFor } from "@/sanity/lib/image";
import { Link } from "@/navigation";

const fallbackImages = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000",
  "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?q=80&w=1000",
];

const cardColors = ["#FFB800", "#F94B1C", "#28D08F"];

export default function BlogPage({ locale }: { locale: string }) {
  const t = useTranslations("Blog");
  const { data: sectionData } = useQuery({
    queryKey: ["blogSection", locale],
    queryFn: () => getBlogSection(locale),
  });
  const { data: postsData } = useQuery({
    queryKey: ["blogPosts", locale],
    queryFn: () => getBlogPosts(locale),
  });

  const fallbackPosts = t.raw("posts") as {
    title: string;
    excerpt: string;
    date: string;
  }[];

  const posts = postsData?.length
    ? postsData
    : sectionData?.posts?.length
      ? sectionData.posts
      : fallbackPosts;

  const formatDate = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <section className="py-20 px-6 sm:px-10 lg:px-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={sectionData?.title ?? t.rich("title", {
            highlight: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
          subtitle={sectionData?.label ?? t("label")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {posts.map((post, idx) => (
            <motion.article
              key={`${post.title ?? "post"}-${idx}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-[320px] overflow-hidden">
                <img
                  src={
                    post.image
                      ? urlFor(post.image).width(1000).quality(80).url()
                      : fallbackImages[idx % fallbackImages.length]
                  }
                  alt={post.title ?? "Blog image"}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />

                <div className="absolute top-8 left-8 z-20 bg-white px-5 py-2' rounded-full shadow-md flex items-center gap-2">
                  <div className="p-1 rounded-sm bg-gray-50">
                    <Calendar
                      size={12}
                      style={{ color: cardColors[idx % cardColors.length] }}
                    />
                  </div>
                  <span className="text-slate-500 text-[12px] font-black font-nunito italic">
                    {formatDate(post.date)}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-secondary text-2xl lg:text-[22px] font-[600] font-cairo mb-5 leading-[1.3] transition-colors group-hover:text-primary">
                  {post.title}
                </h4>

                <p className="text-gray-400 text-[15px] leading-none mb-10 flex-grow font-medium">
                  {post.excerpt}
                </p>

                {post.slug ? (
                  <Link
                    href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors"
                  >
                    {sectionData?.readMore ?? t("readMore")}
                    <ArrowRight size={16} />
                  </Link>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
