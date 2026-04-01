import { getTranslations, setRequestLocale } from "next-intl/server";
import { getGalleryPage } from "@/sanity/lib/getGalleryPage";
import GalleryGrid from "@/components/sections/gallery/GalleryGrid";
import PageHero from "@/components/shared/PageHero";
import { mapGalleryItemsWithSlug } from "@/lib/gallery";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type GalleryContent = {
  title: string;
  description: string;
  comingSoon?: string;
  emptyStateMessage?: string;
};

const GalleryPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const fallback = t.raw("gallery") as GalleryContent;
  const galleryData = await getGalleryPage(locale).catch(() => null);
  const content = {
    ...fallback,
    title: galleryData?.title?.trim() || fallback.title,
    description: galleryData?.description?.trim() || fallback.description,
    emptyStateMessage:
      galleryData?.emptyStateMessage?.trim() ||
      fallback.emptyStateMessage ||
      fallback.comingSoon,
  };

  const itemsWithSlug = mapGalleryItemsWithSlug(galleryData?.items ?? []);

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageHero title={content.title} homeLabel={nav("home")} />
      <section className="container mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10">
          <h2 className="text-3xl font-black tracking-tight text-secondary md:text-4xl">
            {content.title}
          </h2>
        </div>

        {itemsWithSlug.length ? (
          <GalleryGrid items={itemsWithSlug} />
        ) : (
          <div className="rounded-3xl border border-dashed border-primary/30 bg-white/60 px-10 py-12 text-center text-sm font-semibold text-slate-500">
            {content.emptyStateMessage}
          </div>
        )}
      </section>
    </main>
  );
};

export default GalleryPage;
