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
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

if (!client.config().projectId || !client.config().dataset) {
  throw new Error("Missing Sanity projectId or dataset in env vars.");
}

if (!client.config().token) {
  throw new Error("Missing SANITY_WRITE_TOKEN in env vars.");
}

const items = en.Pages.homeVolunteer.items.map((item, index) => ({
  _type: "volunteerCtaItem",
  title: {
    en: item.title,
    tr: tr.Pages.homeVolunteer.items[index]?.title,
    ar: ar.Pages.homeVolunteer.items[index]?.title,
  },
  description: {
    en: item.description,
    tr: tr.Pages.homeVolunteer.items[index]?.description,
    ar: ar.Pages.homeVolunteer.items[index]?.description,
  },
  buttonLabel: {
    en: item.buttonLabel,
    tr: tr.Pages.homeVolunteer.items[index]?.buttonLabel,
    ar: ar.Pages.homeVolunteer.items[index]?.buttonLabel,
  },
  href: item.href,
}));

const volunteerCtaSection = {
  _id: "volunteerCtaSection",
  _type: "volunteerCtaSection",
  items,
};

await client.createOrReplace(volunteerCtaSection);
console.log("Volunteer CTA section seeded successfully.");
