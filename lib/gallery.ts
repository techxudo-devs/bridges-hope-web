type RawGalleryItem = {
  title?: string | null;
  heroImage?: unknown;
  image?: unknown;
  images?: unknown[];
  slug?: string;
};

export type GalleryItemWithSlug = {
  title: string;
  heroImage?: unknown;
  images?: unknown[];
  slug: string;
  legacySlug: string;
};

const toSlug = (value?: string | null) => {
  if (!value) return "";

  return value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]+/g, "")
    .replace(/--+/g, "-");
};

export const mapGalleryItemsWithSlug = (
  items: RawGalleryItem[] = []
): GalleryItemWithSlug[] =>
  items.map((item, index) => {
    const itemNumber = index + 1;
    const title = item.title ?? `Gallery item ${itemNumber}`;
    const legacyBaseSlug = toSlug(item.title);
    const legacySlug = legacyBaseSlug
      ? `${legacyBaseSlug}-${itemNumber}`
      : `gallery-item-${itemNumber}`;
    const configuredSlug = toSlug(item.slug);
    const fallbackSlug = `gallery-item-${itemNumber}`;

    return {
      title,
      heroImage: item.heroImage ?? item.image,
      images: item.images,
      slug: configuredSlug || fallbackSlug,
      legacySlug,
    };
  });
