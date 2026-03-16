import dotenv from "dotenv";
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config({ path: ".env.local" });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

if (!client.config().projectId || !client.config().dataset) {
  throw new Error("Missing Sanity projectId or dataset in env vars.");
}

if (!client.config().token) {
  throw new Error("Missing SANITY_WRITE_TOKEN in env vars.");
}

const uploadImage = async (relativePath) => {
  const normalizedPath = relativePath.startsWith("/")
    ? relativePath.slice(1)
    : relativePath;
  const filePath = join(__dirname, "..", "public", normalizedPath);
  const fileBuffer = await readFile(filePath);
  const filename = normalizedPath.split("/").pop() || "gallery.jpg";
  const asset = await client.assets.upload("image", fileBuffer, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
};

const gallerySource = [
  {
    title: {
      en: "Rehabilitation Center Opening",
      tr: "Rehabilitasyon Merkezi Açılışı",
      ar: "افتتاح مركز التأهيل",
    },
    hero: "/about-one-img-1.jpg",
    images: ["/about-one-img-1.jpg", "/picture-1.jpeg", "/picture-2.jpeg"],
  },
  {
    title: {
      en: "Community Nutrition Support",
      tr: "Toplum Beslenme Desteği",
      ar: "دعم التغذية المجتمعية",
    },
    hero: "/about-one-img-2.jpg",
    images: ["/about-one-img-2.jpg", "/picture-2.jpeg", "/picture-1.jpeg"],
  },
  {
    title: {
      en: "Youth Learning Program",
      tr: "Gençlik Öğrenme Programı",
      ar: "برنامج تعلم الشباب",
    },
    hero: "/hero-1.webp",
    images: ["/hero-1.webp", "/hero-2.webp", "/hero-3.webp"],
  },
];

const items = await Promise.all(
  gallerySource.map(async (item) => {
    const baseSlug = item.title.en
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/[^\w\u0600-\u06FF-]+/g, "")
      .replace(/--+/g, "-")
      .slice(0, 96);

    return {
      _id: `galleryItem.${baseSlug}`,
      _type: "galleryItem",
      title: {
        _type: "localizedString",
        en: item.title.en,
        tr: item.title.tr,
        ar: item.title.ar,
      },
      slug: {
        _type: "slug",
        current: baseSlug,
      },
      heroImage: await uploadImage(item.hero),
      images: await Promise.all(item.images.map((image) => uploadImage(image))),
    };
  })
);

const galleryPage = {
  _id: "galleryPageSettings",
  _type: "galleryPage",
  title: {
    _type: "localizedString",
    en: "Gallery",
    tr: "Galeri",
    ar: "المعرض",
  },
  description: {
    _type: "localizedString",
    en: "Photos from our activities and community programs.",
    tr: "Faaliyetlerimizden ve toplum programlarımızdan fotoğraflar.",
    ar: "صور من أنشطتنا وبرامجنا المجتمعية.",
  },
};

for (const item of items) {
  await client.createOrReplace(item);
}

await client.createOrReplace(galleryPage);
console.log("Gallery page settings and gallery items seeded successfully.");
