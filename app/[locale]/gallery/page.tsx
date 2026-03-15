import { getTranslations, setRequestLocale } from "next-intl/server";
import { getGalleryPage } from "@/sanity/lib/getGalleryPage";
import GalleryGrid from "@/components/sections/gallery/GalleryGrid";
import PageHero from "@/components/shared/PageHero";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type GalleryItem = {
  title?: string | null;
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
  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const fallback = t.raw("gallery") as GalleryContent;
  const galleryData = await getGalleryPage(locale).catch(() => null);
  const content = galleryData
    ? {
        ...fallback,
        ...galleryData,
        items: galleryData.items?.length ? galleryData.items : fallback.items,
      }
    : fallback;

  const toSlug = (value?: string | null) => {
    if (!value) return "gallery-item";
    return value
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/[^\w\u0600-\u06FF-]+/g, "")
      .replace(/--+/g, "-");
  };

  const itemsWithSlug = content.items.map((item, index) => {
    const baseSlug = toSlug(item.slug || item.title || null);

    return {
      ...item,
      title: item.title ?? `Gallery item ${index + 1}`,
      slug: item.slug ?? `${baseSlug}-${index + 1}`,
    };
  });

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageHero title={content.title} homeLabel={nav("home")} />
      <section className="container mx-auto px-6 max-w-6xl py-20">
        <div className="flex flex-col gap-10">
          <p className="max-w-3xl text-lg font-medium leading-relaxed text-slate-500">
            {content.description}
          </p>

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
