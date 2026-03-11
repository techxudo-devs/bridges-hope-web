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

const slidesSource = [
  { image: "/about-one-img-1.jpg", href: "/projects" },
  { image: "/about-one-img-2.jpg", href: "/projects" },
  { image: "/about-one-img-2.jpg", href: "/projects" },
  { image: "/about-one-img-1.jpg", href: "/projects" },
  { image: "/about-one-img-2.jpg", href: "/projects" },
  { image: "/about-one-img-1.jpg", href: "/projects" },
];

const items = await Promise.all(
  slidesSource.map(async (slide, index) => ({
    _type: "gallerySliderItem",
    image: await uploadImage(slide.image),
    alt: {
      _type: "localizedString",
      en: `Gallery item ${index + 1}`,
      tr: `Galeri öğesi ${index + 1}`,
      ar: `عنصر المعرض ${index + 1}`,
    },
    href: slide.href,
  })),
);

const gallerySliderSection = {
  _id: "gallerySliderSection",
  _type: "gallerySliderSection",
  items,
};

await client.createOrReplace(gallerySliderSection);
console.log("Gallery slider section seeded successfully.");
