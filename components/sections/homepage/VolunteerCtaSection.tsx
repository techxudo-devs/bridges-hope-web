import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Link } from "@/navigation";

type VolunteerCtaSectionProps = {
  locale: string;
};

const VolunteerCtaSection = async ({ locale }: VolunteerCtaSectionProps) => {
  const tPages = await getTranslations({ locale, namespace: "Pages" });
  const content = tPages.raw("homeVolunteer") as {
    items: Array<{
      title: string;
      description: string;
      buttonLabel: string;
      href: string;
    }>;
  };
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const images = [
    "https://images.unsplash.com/photo-1509095087301-02c74a001b06?q=80&w=1600",
    "https://images.unsplash.com/photo-1459183885421-5cc683b8dbba?q=80&w=1600",
  ];
  const overlays = ["bg-[#0B2C26]/70", "bg-[#F04B1C]/70"];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2">
          {content.items.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="relative overflow-hidden rounded-[2rem] text-white"
            >
              <img
                src={images[index % images.length]}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className={`absolute inset-0 ${
                  overlays[index % overlays.length]
                }`}
              />
              <div className="relative z-10 flex flex-col items-center text-center px-6 py-14">
                <h3 className="text-3xl md:text-4xl font-caveat font-bold">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm md:text-base text-white/90 max-w-md">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-6 py-2.5 text-sm font-bold text-white transition-all hover:border-white"
                >
                  {item.buttonLabel}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VolunteerCtaSection;
