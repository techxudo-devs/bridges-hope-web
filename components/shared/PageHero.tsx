import { ChevronRight } from "lucide-react";

import { Link } from "@/navigation";

type PageHeroProps = {
  title: string;
  breadcrumbLabel?: string;
  homeLabel?: string;
};

const PageHero = ({
  title,
  breadcrumbLabel,
  homeLabel = "Home",
}: PageHeroProps) => {
  const currentLabel = breadcrumbLabel ?? title;

  return (
    <section
      className="relative w-full min-h-[40vh] lg:min-h-[75vh] flex items-center bg-[#092a24] text-white overflow-hidden"
      style={{
        WebkitMaskImage: "url('/download.png')",
        maskImage: "url('/download.png')",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "cover",
        maskSize: "contain",
      }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale opacity-20"
          style={{ backgroundImage: "url('/hero-1.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#092a24]/70 via-[#092a24]/40 to-transparent" />
        <div
          className="absolute  inset-0 bg-cover bg-no-repeat bg-center grayscale opacity-10"
          style={{ backgroundImage: "url('/hero-bottom-right.webp')" }}
        />
      </div>

      <div className="absolute -bottom-50 -right-16 w-[520px] h-[520px] opacity-70 hidden lg:block animate-dance">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bottom-right.webp')" }}
        />
      </div>
      <div className="absolute -bottom-16 left-0 w-[720px] h-[220px] opacity-20 hidden xl:block animate-dance-slow">
        <div
          className="w-full h-full bg-contain bg-no-repeat bg-left"
          style={{ backgroundImage: "url('/hero-bottom-left.png')" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-28 pb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
          {title}
        </h1>
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-white/70">
          <Link href="/" className="transition-colors hover:text-white">
            {homeLabel}
          </Link>
          <ChevronRight className="h-4 w-4 text-white/50" />
          <span className="text-white">{currentLabel}</span>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
