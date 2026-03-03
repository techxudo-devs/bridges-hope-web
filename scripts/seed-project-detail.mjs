import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadJson = async (relativePath) => {
  const filePath = join(__dirname, "..", relativePath);
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw);
};

const en = await loadJson("messages/en.json");
const tr = await loadJson("messages/tr.json");
const ar = await loadJson("messages/ar.json");

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "eozh9zww";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token:
    "skPy7awwSEIVIKXfpbtYNcmlu9P6BG8FWq916eSCeTUcu589QlPRy5APFsLUbjDYhLzYnNaOI3sVnPYpROHEGEbhIVEuwayPps9GqxfymNDsgrrySOu2GzUYRmIrsWZDvuBjOIlnLgp2I8FSFOX999bFx5wdjF2s7YG0abA8UmALN9akYvMs",
  useCdn: false,
});

if (!client.config().projectId || !client.config().dataset) {
  throw new Error("Missing Sanity projectId or dataset in env vars.");
}

if (!client.config().token) {
  throw new Error("Missing SANITY_WRITE_TOKEN in env vars.");
}

const uploadImage = async (source) => {
  if (!source || typeof source !== "string") return undefined;
  const response = await fetch(source);
  if (!response.ok) return undefined;
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filename = source.split("/").pop()?.split("?")[0] || "project.jpg";
  const asset = await client.assets.upload("image", buffer, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
};

const detail = en.Pages.projectDetail;
const detailTr = tr.Pages.projectDetail;
const detailAr = ar.Pages.projectDetail;

const tags = detail.content.tags.map((item, index) => ({
  _type: "localizedString",
  en: item,
  tr: detailTr.content.tags[index],
  ar: detailAr.content.tags[index],
}));

const description = detail.content.description.map((item, index) => ({
  _type: "localizedString",
  en: item,
  tr: detailTr.content.description[index],
  ar: detailAr.content.description[index],
}));

const checklist = detail.content.checklist.map((item, index) => ({
  _type: "localizedString",
  en: item,
  tr: detailTr.content.checklist[index],
  ar: detailAr.content.checklist[index],
}));

const sideImagesFallback = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600",
];

const sideImages = await Promise.all(
  sideImagesFallback.map((url) => uploadImage(url)),
);

const projectDetail = {
  _id: "projectDetail",
  _type: "projectDetail",
  detailsBadge: {
    en: detail.detailsBadge,
    tr: detailTr.detailsBadge,
    ar: detailAr.detailsBadge,
  },
  labels: {
    _type: "projectDetailLabels",
    name: {
      en: detail.labels.name,
      tr: detailTr.labels.name,
      ar: detailAr.labels.name,
    },
    date: {
      en: detail.labels.date,
      tr: detailTr.labels.date,
      ar: detailAr.labels.date,
    },
    author: {
      en: detail.labels.author,
      tr: detailTr.labels.author,
      ar: detailAr.labels.author,
    },
    tags: {
      en: detail.labels.tags,
      tr: detailTr.labels.tags,
      ar: detailAr.labels.tags,
    },
  },
  content: {
    _type: "projectDetailContent",
    name: {
      en: detail.content.name,
      tr: detailTr.content.name,
      ar: detailAr.content.name,
    },
    date: {
      en: detail.content.date,
      tr: detailTr.content.date,
      ar: detailAr.content.date,
    },
    author: {
      en: detail.content.author,
      tr: detailTr.content.author,
      ar: detailAr.content.author,
    },
    tags,
    title: {
      en: detail.content.title,
      tr: detailTr.content.title,
      ar: detailAr.content.title,
    },
    description,
    checklist,
    business: {
      _type: "projectDetailBusiness",
      title: {
        en: detail.content.business.title,
        tr: detailTr.content.business.title,
        ar: detailAr.content.business.title,
      },
      description: {
        en: detail.content.business.description,
        tr: detailTr.content.business.description,
        ar: detailAr.content.business.description,
      },
    },
  },
  sideImages: sideImages.filter(Boolean),
};

await client.createOrReplace(projectDetail);
console.log("Project detail seeded successfully.");
