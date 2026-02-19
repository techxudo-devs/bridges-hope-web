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

const values = en.CoreValues.values.map((value, index) => ({
  _type: "coreValueItem",
  title: {
    en: value.title,
    tr: tr.CoreValues.values[index]?.title,
    ar: ar.CoreValues.values[index]?.title,
  },
  description: {
    en: value.description,
    tr: tr.CoreValues.values[index]?.description,
    ar: ar.CoreValues.values[index]?.description,
  },
}));

const coreValues = {
  _id: "coreValuesSection",
  _type: "coreValues",
  subtitle: {
    en: en.CoreValues.subtitle,
    tr: tr.CoreValues.subtitle,
    ar: ar.CoreValues.subtitle,
  },
  title: {
    en: en.CoreValues.title,
    tr: tr.CoreValues.title,
    ar: ar.CoreValues.title,
  },
  readMore: {
    en: en.CoreValues.readMore,
    tr: tr.CoreValues.readMore,
    ar: ar.CoreValues.readMore,
  },
  values,
};

await client.createOrReplace(coreValues);
console.log("Core Values section seeded successfully.");
