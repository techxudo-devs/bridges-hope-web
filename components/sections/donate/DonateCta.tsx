import { ArrowLeft, ArrowRight } from "lucide-react";

import { Link } from "@/navigation";
import { urlFor } from "@/sanity/lib/image";

type DonateCtaContent = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  splashImage?: any;
  photoImage?: any;
};

type DonateCtaProps = {
  content: DonateCtaContent;
  isRtl?: boolean;
};

const renderCtaTitle = (value?: string) => {
  if (!value) return null;
  const parts = value.split(/(<highlight>|<\/highlight>)/g);
  let isHighlight = false;
  return parts.map((part, index) => {
    if (part === "<highlight>") {
      isHighlight = true;
      return null;
    }
    if (part === "</highlight>") {
      isHighlight = false;
      return null;
    }
    if (!part) return null;
    if (isHighlight) {
      return (
        <span key={`highlight-${index}`} className="text-emerald-500">
          {part}
        </span>
      );
    }
    return <span key={`text-${index}`}>{part}</span>;
  });
};

const getImageUrl = (image: any, fallback: string, width = 1400) => {
  if (!image) return fallback;
  if (typeof image === "string") return image;
  return urlFor(image).width(width).quality(90).url();
};

const DonateCta = ({ content, isRtl = false }: DonateCtaProps) => {
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  return (
    <section className="relative bg-white  z-10 -mb-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative  overflow-hidden py-10 rounded-[1rem] bg-[#F1FAFB] px-6 py- text-center  sm:px-10">
          <div
            className="absolute animate-dance inset-0  bg-bottom opacity-30 bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url('${getImageUrl(
                content.splashImage,
                "/wave.png",
              )}')`,
            }}
          />
          <div className="relative z-10 mx-auto flex max-w-3xl  flex-col items-center">
            <h2 className="text-3xl  md:text-4xl font-black text-primary leading-snug">
              {renderCtaTitle(content.title)}
            </h2>
            {content.description ? (
              <p className="mt-4 text-sm md:text-base text-slate-800 leading-relaxed">
                {content.description}
              </p>
            ) : null}
            {content.buttonLabel ? (
              <Link
                href="/donate"
                className="mt-8 inline-flex items-center gap-4 rounded-full border border-primary/40 bg-white px-6 py-2.5 text-sm font-bold text-secondary transition-all hover:border-primary hover:text-primary"
              >
                {content.buttonLabel}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </Link>
            ) : null}
            <div className="mt-10 flex justify-center">
              <div className="size-50 translate-y-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img
                  src={getImageUrl(content.photoImage, "/cta-photo.jpg", 590)}
                  alt={content.title ?? "Donate"}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateCta;
