"use client";

import { useQuery } from "@tanstack/react-query";

import { getHeroSection } from "@/sanity/lib/getHeroSection";
import { urlFor } from "@/sanity/lib/image";
import { rtlLocales, type Locale } from "@/i18n";
import { Link } from "@/navigation";

type SanityHeroSectionProps = {
  locale: Locale;
};

export default function SanityHeroSection({ locale }: SanityHeroSectionProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hero", locale],
    queryFn: () => getHeroSection(locale),
  });

  if (isLoading) {
    return (
      <section className="py-10 text-center">Loading hero content...</section>
    );
  }

  if (error || !data) {
    return (
      <section className="py-10 text-center text-red-500">
        Failed to load hero content.
      </section>
    );
  }

  const firstSlide = data.slides?.[0];
  const imageUrl = firstSlide?.image
    ? urlFor(firstSlide.image).width(1400).quality(80).url()
    : null;

  return (
    <section
      className={`py-10 text-center ${
        rtlLocales.includes(locale) ? "text-right" : "text-left"
      }`}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={firstSlide?.title ?? "Hero image"}
            className="w-full rounded-2xl mb-6 object-cover"
          />
        ) : null}
        <h2 className="text-3xl font-bold">{firstSlide?.title}</h2>
        {firstSlide?.subtitle ? (
          <p className="mt-4 text-lg text-slate-600">
            {firstSlide.subtitle}
          </p>
        ) : null}
        {data.donateNowLabel ? (
          <Link
            href="/donate"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-white"
          >
            {data.donateNowLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
