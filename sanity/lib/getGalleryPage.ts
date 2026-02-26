import { client } from "./client";
import { galleryPageQuery } from "./queries";

export async function getGalleryPage(lang: string) {
  return client.fetch(galleryPageQuery, { lang });
}
