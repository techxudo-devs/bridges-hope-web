import { client } from "./client";
import { galleryPageQuery } from "./queries";

export async function getGalleryPage(lang: string) {
  const data = await client.fetch(
    galleryPageQuery,
    { lang },
    { cache: "no-store" }
  );

  return {
    title: data?.settings?.title,
    description: data?.settings?.description,
    emptyStateMessage: data?.settings?.emptyStateMessage,
    items: data?.items ?? [],
  };
}
