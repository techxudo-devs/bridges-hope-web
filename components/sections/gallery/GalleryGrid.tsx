import { Link } from "@/navigation";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/sanity/lib/image";

type GalleryItem = {
  title: string;
  heroImage?: SanityImageSource | string;
  slug: string;
};

type GalleryGridProps = {
  items: GalleryItem[];
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1509095087301-02c74a001b06?q=80&w=1200",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200",
  "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1200",
];

const GalleryGrid = ({ items }: GalleryGridProps) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item, index) => {
      const imageUrl = item.heroImage
        ? typeof item.heroImage === "string"
          ? item.heroImage
          : urlFor(item.heroImage).width(1000).quality(80).url()
        : fallbackImages[index % fallbackImages.length];

      return (
        <Link
          key={`${item.title}-${index}`}
          href={`/gallery/${item.slug}`}
          className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
        >
          {imageUrl ? (
            <div className="relative h-full overflow-hidden">
              <img
                src={imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ) : null}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="inline-block rounded-lg bg-black/55 px-3 py-2 text-sm font-bold text-white md:text-base">
              {item.title}
            </h3>
          </div>
        </Link>
      );
    })}
  </div>
);

export default GalleryGrid;
