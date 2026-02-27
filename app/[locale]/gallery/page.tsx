import { getTranslations, setRequestLocale } from "next-intl/server";
import { getGalleryPage } from "@/sanity/lib/getGalleryPage";
import GalleryGrid from "@/components/GalleryGrid";

type PageProps = {
  params: Promise<{ locale: string }>;
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
  comingSoon?: string;
  items: GalleryItem[];
};

const GalleryPage = async ({ params }: PageProps) => {
  const { locale } = await params;
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

  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/[^\w\u0600-\u06FF-]+/g, "")
      .replace(/--+/g, "-");

  const itemsWithSlug = content.items.map((item, index) => ({
    ...item,
    slug: item.slug ?? `${toSlug(item.title)}-${index + 1}`,
  }));

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <section className="container mx-auto px-6 max-w-6xl pt-46 pb-20">
        <div className="flex flex-col gap-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              {content.title}
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl font-black text-secondary tracking-tight">
              {content.title}
            </h1>
            <p className="mt-6 text-lg font-medium leading-relaxed text-slate-500">
              {content.description}
            </p>
          </div>

          {itemsWithSlug.length ? (
            <GalleryGrid items={itemsWithSlug} />
          ) : (
            <div className="rounded-3xl border border-dashed border-primary/30 bg-white/60 px-10 py-12 text-center text-sm font-semibold text-slate-500">
              {content.comingSoon}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;
