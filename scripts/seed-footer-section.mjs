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

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "eozh9zww",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token:
    process.env.SANITY_WRITE_TOKEN ||
    "skPy7awwSEIVIKXfpbtYNcmlu9P6BG8FWq916eSCeTUcu589QlPRy5APFsLUbjDYhLzYnNaOI3sVnPYpROHEGEbhIVEuwayPps9GqxfymNDsgrrySOu2GzUYRmIrsWZDvuBjOIlnLgp2I8FSFOX999bFx5wdjF2s7YG0abA8UmALN9akYvMs",
  useCdn: false,
});

if (!client.config().projectId || !client.config().dataset) {
  throw new Error("Missing Sanity projectId or dataset in env vars.");
}

if (!client.config().token) {
  throw new Error("Missing SANITY_WRITE_TOKEN in env vars.");
}

const news = en.Footer.news.map((item, index) => ({
  _type: "footerNewsItem",
  title: {
    en: item.title,
    tr: tr.Footer.news[index]?.title,
    ar: ar.Footer.news[index]?.title,
  },
  date: {
    en: item.date,
    tr: tr.Footer.news[index]?.date,
    ar: ar.Footer.news[index]?.date,
  },
}));

const footerSection = {
  _id: "footerSection",
  _type: "footerSection",
  aboutText: {
    en: en.Footer.aboutText,
    tr: tr.Footer.aboutText,
    ar: ar.Footer.aboutText,
  },
  quickLinks: {
    en: en.Footer.quickLinks,
    tr: tr.Footer.quickLinks,
    ar: ar.Footer.quickLinks,
  },
  contactUs: {
    en: en.Footer.contactUs,
    tr: tr.Footer.contactUs,
    ar: ar.Footer.contactUs,
  },
  rights: {
    en: en.Footer.rights,
    tr: tr.Footer.rights,
    ar: ar.Footer.rights,
  },
  address: {
    en: en.Footer.address,
    tr: tr.Footer.address,
    ar: ar.Footer.address,
  },
  email: {
    en: en.Footer.email,
    tr: tr.Footer.email,
    ar: ar.Footer.email,
  },
  phone: {
    en: en.Footer.phone,
    tr: tr.Footer.phone,
    ar: ar.Footer.phone,
  },
  news,
};

await client.createOrReplace(footerSection);
console.log("Footer section seeded successfully.");
