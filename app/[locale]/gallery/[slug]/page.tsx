import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getGalleryPage } from "@/sanity/lib/getGalleryPage";
import { urlFor } from "@/sanity/lib/image";
import { Link } from "@/navigation";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

type GalleryItem = {
  title: string;
  heroImage?: any;
  images?: any[];
  slug?: string;
};

type GalleryContent = {
  title: string;
  description: string;
  items: GalleryItem[];
};

const mockImages = [
  "https://images.unsplash.com/photo-1509095087301-02c74a001b06?q=80&w=1200",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200",
  "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1200",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200",
  "https://images.unsplash.com/photo-1509095087301-02c74a001b06?q=80&w=1200",
  "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1200",
];

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]+/g, "")
    .replace(/--+/g, "-");

const GalleryDetailPage = async ({ params }: PageProps) => {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const fallback = t.raw("gallery") as GalleryContent;
  const galleryData = await getGalleryPage(locale).catch(() => null);
  const content = galleryData
    ? {
        ...fallback,
        ...galleryData,
        items: galleryData.items?.length ? galleryData.items : fallback.items,
      }
    : fallback;

  const itemsWithSlug = content.items.map((item, index) => ({
    ...item,
    slug: item.slug ?? `${toSlug(item.title)}-${index + 1}`,
  }));

  const activeItem = itemsWithSlug.find((item) => item.slug === slug);

  if (!activeItem) {
    notFound();
  }

  const heroImageUrl = activeItem.heroImage
    ? urlFor(activeItem.heroImage).width(1400).quality(80).url()
    : mockImages[0];

  const galleryImages = activeItem.images?.length
    ? activeItem.images
    : mockImages.slice(1);

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <section className="container mx-auto px-6 max-w-6xl pt-46 pb-20">
        <div className="flex flex-col gap-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <Link href="/gallery" className="hover:text-primary">
                {content.title}
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-secondary">{activeItem.title}</span>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              {content.title}
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl font-black text-secondary tracking-tight">
              {activeItem.title}
            </h1>
            <p className="mt-6 text-lg font-medium leading-relaxed text-slate-500">
              {content.description}
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-sm">
            <img
              src={heroImageUrl}
              alt={activeItem.title}
              className="h-72 w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => {
              const imageUrl =
                typeof image === "string"
                  ? image
                  : urlFor(image).width(1200).quality(80).url();

              return (
                <div
                  key={`${activeItem.title}-${index}`}
                  className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-sm"
                >
                  <img
                    src={imageUrl}
                    alt={activeItem.title}
                    className="h-64 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default GalleryDetailPage;
