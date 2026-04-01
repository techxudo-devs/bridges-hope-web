import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getGalleryPage } from "@/sanity/lib/getGalleryPage";
import { urlFor } from "@/sanity/lib/image";
import PageHero from "@/components/shared/PageHero";
import { mapGalleryItemsWithSlug } from "@/lib/gallery";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

type GalleryContent = {
  title: string;
  description: string;
};

const GalleryDetailPage = async ({ params }: PageProps) => {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const fallback = t.raw("gallery") as GalleryContent;
  const galleryData = await getGalleryPage(locale).catch(() => null);
  const content = {
    ...fallback,
    title: galleryData?.title?.trim() || fallback.title,
    description: galleryData?.description?.trim() || fallback.description,
  };

  const itemsWithSlug = mapGalleryItemsWithSlug(galleryData?.items ?? []);

  const activeItem = itemsWithSlug.find(
    (item) => item.slug === slug || item.legacySlug === slug
  );

  if (!activeItem) {
    notFound();
  }

  const heroImageUrl = activeItem.heroImage
    ? urlFor(activeItem.heroImage).width(1400).quality(80).url()
    : null;

  const galleryImages = activeItem.images ?? [];

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageHero title={content.title} homeLabel={nav("home")} />
      <section className="container mx-auto px-6 max-w-6xl py-20">
        <div className="flex flex-col gap-10">
          <div className="max-w-3xl">
            <h1 className="mt-6 text-4xl md:text-5xl font-black text-secondary tracking-tight">
              {activeItem.title}
            </h1>
            <p className="mt-6 text-lg font-medium leading-relaxed text-slate-500">
              {content.description}
            </p>
          </div>

          {heroImageUrl ? (
            <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-sm">
              <img
                src={heroImageUrl}
                alt={activeItem.title}
                className="h-72 w-full object-cover"
                loading="lazy"
              />
            </div>
          ) : null}

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
