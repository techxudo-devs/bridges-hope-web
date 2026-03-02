"use client";

import Slider from "react-slick";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import MaskedGalleryCard from "@/components/ui/MaskedGalleryCard";
import { getGallerySliderSection } from "@/sanity/lib/getGallerySliderSection";
import { urlFor } from "@/sanity/lib/image";

const fallbackItems = [
  {
    imageSrc: "/about-one-img-1.jpg",
    href: "/projects",
    alt: "Gallery item 1",
  },
  {
    imageSrc: "/about-one-img-2.jpg",
    href: "/projects",
    alt: "Gallery item 2",
  },
  {
    imageSrc: "/about-one-img-2.jpg",
    href: "/projects",
    alt: "Gallery item 3",
  },
  {
    imageSrc: "/about-one-img-2.jpg",
    href: "/projects",
    alt: "Gallery item 4",
  },
  {
    imageSrc: "/about-one-img-2.jpg",
    href: "/projects",
    alt: "Gallery item 5",
  },
  {
    imageSrc: "/about-one-img-2.jpg",
    href: "/projects",
    alt: "Gallery item 6",
  },
];

const GallerySliderSection = () => {
  const locale = useLocale();
  const { data } = useQuery({
    queryKey: ["gallerySliderSection", locale],
    queryFn: () => getGallerySliderSection(locale),
  });
  const items =
    data?.items?.length
      ? data.items.map((item, index) => ({
          imageSrc: item.image
            ? urlFor(item.image).width(1000).quality(80).url()
            : fallbackItems[index % fallbackItems.length].imageSrc,
          href: item.href || "/projects",
          alt: item.alt || `Gallery item ${index + 1}`,
        }))
      : fallbackItems;
  const maskImage = "/last-cta.png";
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-white py-16">
      <div className="px-4">
        <Slider {...settings}>
          {items.map((item, index) => (
            <div key={`${item.alt}-${index}`} className="w-full h-full px-2">
              <MaskedGalleryCard
                maskImage={maskImage}
                imageSrc={item.imageSrc}
                alt={item.alt}
                href={item.href}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default GallerySliderSection;
