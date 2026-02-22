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

const about = {
  _id: "aboutSection",
  _type: "aboutSection",
  subtitle: {
    en: en.AboutSection.subtitle,
    tr: tr.AboutSection.subtitle,
    ar: ar.AboutSection.subtitle,
  },
  title: {
    en: en.AboutSection.title,
    tr: tr.AboutSection.title,
    ar: ar.AboutSection.title,
  },
  highlight: {
    en: en.AboutSection.highlight,
    tr: tr.AboutSection.highlight,
    ar: ar.AboutSection.highlight,
  },
  descriptionLead: {
    en: en.AboutSection.descriptionLead,
    tr: tr.AboutSection.descriptionLead,
    ar: ar.AboutSection.descriptionLead,
  },
  descriptionBody: {
    en: en.AboutSection.descriptionBody,
    tr: tr.AboutSection.descriptionBody,
    ar: ar.AboutSection.descriptionBody,
  },
  quote: {
    en: en.AboutSection.quote,
    tr: tr.AboutSection.quote,
    ar: ar.AboutSection.quote,
  },
  features: {
    _type: "aboutFeatures",
    treatmentHelp: {
      en: en.AboutSection.features.treatmentHelp,
      tr: tr.AboutSection.features.treatmentHelp,
      ar: ar.AboutSection.features.treatmentHelp,
    },
    fundRaised: {
      en: en.AboutSection.features.fundRaised,
      tr: tr.AboutSection.features.fundRaised,
      ar: ar.AboutSection.features.fundRaised,
    },
  },
  learnMore: {
    en: en.AboutSection.learnMore,
    tr: tr.AboutSection.learnMore,
    ar: ar.AboutSection.learnMore,
  },
  needHelpLabel: {
    en: en.AboutSection.needHelpLabel,
    tr: tr.AboutSection.needHelpLabel,
    ar: ar.AboutSection.needHelpLabel,
  },
  phoneNumber: {
    en: en.AboutSection.phoneNumber,
    tr: tr.AboutSection.phoneNumber,
    ar: ar.AboutSection.phoneNumber,
  },
  imageAltPrimary: {
    en: en.AboutSection.imageAltPrimary,
    tr: tr.AboutSection.imageAltPrimary,
    ar: ar.AboutSection.imageAltPrimary,
  },
  imageAltSecondary: {
    en: en.AboutSection.imageAltSecondary,
    tr: tr.AboutSection.imageAltSecondary,
    ar: ar.AboutSection.imageAltSecondary,
  },
  fundedLabel: {
    en: en.AboutSection.fundedLabel,
    tr: tr.AboutSection.fundedLabel,
    ar: ar.AboutSection.fundedLabel,
  },
  fundedAmount: {
    en: en.AboutSection.fundedAmount,
    tr: tr.AboutSection.fundedAmount,
    ar: ar.AboutSection.fundedAmount,
  },
  supportLabel: {
    en: en.AboutSection.supportLabel,
    tr: tr.AboutSection.supportLabel,
    ar: ar.AboutSection.supportLabel,
  },
};

await client.createOrReplace(about);
console.log("About Section seeded successfully.");
