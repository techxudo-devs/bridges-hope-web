import { getTranslations, setRequestLocale } from "next-intl/server";
import { getGalleryPage } from "@/sanity/lib/getGalleryPage";
import { urlFor } from "@/sanity/lib/image";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type GalleryItem = {
  title: string;
  image?: any;
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

          {content.items?.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {content.items.map((item, index) => {
                const imageUrl = item.image
                  ? typeof item.image === "string"
                    ? item.image
                    : urlFor(item.image).width(1000).quality(80).url()
                  : undefined;

                return (
                  <div
                    key={`${item.title}-${index}`}
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
                  </div>
                );
              })}
            </div>
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
