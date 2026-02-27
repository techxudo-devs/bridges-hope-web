import { Link } from "@/navigation";
import { urlFor } from "@/sanity/lib/image";

type GalleryItem = {
  title: string;
  heroImage?: any;
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
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          className="group overflow-hidden rounded-3xl border border-white/70 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
        >
          {imageUrl ? (
            <div className="relative overflow-hidden">
              <img
                src={imageUrl}
                alt={item.title}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80" />
            </div>
          ) : null}
          <div className="p-6">
            <h3 className="text-lg font-black text-secondary tracking-tight">
              {item.title}
            </h3>
            <div className="mt-3 h-1 w-10 rounded-full bg-primary/70" />
          </div>
        </Link>
      );
    })}
  </div>
);

export default GalleryGrid;
