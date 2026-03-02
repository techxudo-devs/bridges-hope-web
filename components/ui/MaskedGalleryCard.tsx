"use client";

import { Link } from "@/navigation";

type MaskedGalleryCardProps = {
  maskImage: string;
  imageSrc: string;
  alt: string;
  href: string;
};

const MaskedGalleryCard = ({
  maskImage,
  imageSrc,
  alt,
  href,
}: MaskedGalleryCardProps) => {
  return (
    <div
      className="relative block overflow-hidden"
      style={{
        WebkitMaskImage: `url(${maskImage})`,
        maskImage: `url(${maskImage})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    >
      <img src={imageSrc} alt={alt} className="block w-full h-80" />
      <Link
        href={href}
        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100"
        aria-label={alt}
      >
        <span className="text-white text-xl">↗</span>
      </Link>
    </div>
  );
};

export default MaskedGalleryCard;
