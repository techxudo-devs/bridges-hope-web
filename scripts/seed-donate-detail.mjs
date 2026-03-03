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
  let buffer;
  let filename;

  if (source.startsWith("http")) {
    const response = await fetch(source);
    if (!response.ok) return undefined;
    const arrayBuffer = await response.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
    filename = source.split("/").pop()?.split("?")[0] || "donate.jpg";
  } else {
    const relativePath = source.startsWith("/") ? source.slice(1) : source;
    const filePath = join(__dirname, "..", "public", relativePath);
    buffer = await readFile(filePath);
    filename = relativePath.split("/").pop() || "donate.jpg";
  }

  const asset = await client.assets.upload("image", buffer, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
};

const detail = en.Pages.donateDetail;
const detailTr = tr.Pages.donateDetail;
const detailAr = ar.Pages.donateDetail;

const paymentMethods = detail.paymentMethods.map((item, index) => ({
  _type: "localizedString",
  en: item,
  tr: detailTr.paymentMethods[index],
  ar: detailAr.paymentMethods[index],
}));

const categories = detail.categories.map((item, index) => ({
  _type: "donateDetailCategory",
  label: {
    en: item.label,
    tr: detailTr.categories[index]?.label,
    ar: detailAr.categories[index]?.label,
  },
  count: item.count,
}));

const detailParagraphs = detail.detailParagraphs.map((item, index) => ({
  _type: "localizedString",
  en: item,
  tr: detailTr.detailParagraphs[index],
  ar: detailAr.detailParagraphs[index],
}));

const galleryFallback = [
  "https://images.unsplash.com/photo-1509095087301-02c74a001b06?q=80&w=1200",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200",
  "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1200",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200",
];

const galleryImages = await Promise.all(
  galleryFallback.map((url) => uploadImage(url)),
);

const donateDetail = {
  _id: "donateDetail",
  _type: "donateDetail",
  raisedLabel: {
    en: detail.raisedLabel,
    tr: detailTr.raisedLabel,
    ar: detailAr.raisedLabel,
  },
  selectPaymentTitle: {
    en: detail.selectPaymentTitle,
    tr: detailTr.selectPaymentTitle,
    ar: detailAr.selectPaymentTitle,
  },
  paymentMethods,
  firstNameLabel: {
    en: detail.firstNameLabel,
    tr: detailTr.firstNameLabel,
    ar: detailAr.firstNameLabel,
  },
  lastNameLabel: {
    en: detail.lastNameLabel,
    tr: detailTr.lastNameLabel,
    ar: detailAr.lastNameLabel,
  },
  emailLabel: {
    en: detail.emailLabel,
    tr: detailTr.emailLabel,
    ar: detailAr.emailLabel,
  },
  donationTotalLabel: {
    en: detail.donationTotalLabel,
    tr: detailTr.donationTotalLabel,
    ar: detailAr.donationTotalLabel,
  },
  donateNowLabel: {
    en: detail.donateNowLabel,
    tr: detailTr.donateNowLabel,
    ar: detailAr.donateNowLabel,
  },
  amountOptions: detail.amountOptions,
  customAmountLabel: {
    en: detail.customAmountLabel,
    tr: detailTr.customAmountLabel,
    ar: detailAr.customAmountLabel,
  },
  categoriesTitle: {
    en: detail.categoriesTitle,
    tr: detailTr.categoriesTitle,
    ar: detailAr.categoriesTitle,
  },
  categories,
  galleryTitle: {
    en: detail.galleryTitle,
    tr: detailTr.galleryTitle,
    ar: detailAr.galleryTitle,
  },
  detailParagraphs,
  galleryImages: galleryImages.filter(Boolean),
};

await client.createOrReplace(donateDetail);
console.log("Donate detail seeded successfully.");
