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

const contactSection = {
  _id: "contactSection",
  _type: "contactSection",
  subtitle: {
    en: en.ContactSection.subtitle,
    tr: tr.ContactSection.subtitle,
    ar: ar.ContactSection.subtitle,
  },
  title: {
    en: en.ContactSection.title,
    tr: tr.ContactSection.title,
    ar: ar.ContactSection.title,
  },
  highlight: {
    en: en.ContactSection.highlight,
    tr: tr.ContactSection.highlight,
    ar: ar.ContactSection.highlight,
  },
  description: {
    en: en.ContactSection.description,
    tr: tr.ContactSection.description,
    ar: ar.ContactSection.description,
  },
  info: {
    _type: "contactInfo",
    emailTitle: {
      en: en.ContactSection.info.emailTitle,
      tr: tr.ContactSection.info.emailTitle,
      ar: ar.ContactSection.info.emailTitle,
    },
    emailDetail: {
      en: en.ContactSection.info.emailDetail,
      tr: tr.ContactSection.info.emailDetail,
      ar: ar.ContactSection.info.emailDetail,
    },
    visitTitle: {
      en: en.ContactSection.info.visitTitle,
      tr: tr.ContactSection.info.visitTitle,
      ar: ar.ContactSection.info.visitTitle,
    },
    visitDetail: {
      en: en.ContactSection.info.visitDetail,
      tr: tr.ContactSection.info.visitDetail,
      ar: ar.ContactSection.info.visitDetail,
    },
    hoursTitle: {
      en: en.ContactSection.info.hoursTitle,
      tr: tr.ContactSection.info.hoursTitle,
      ar: ar.ContactSection.info.hoursTitle,
    },
    hoursDetail: {
      en: en.ContactSection.info.hoursDetail,
      tr: tr.ContactSection.info.hoursDetail,
      ar: ar.ContactSection.info.hoursDetail,
    },
  },
  form: {
    _type: "contactForm",
    name: {
      en: en.ContactSection.form.name,
      tr: tr.ContactSection.form.name,
      ar: ar.ContactSection.form.name,
    },
    email: {
      en: en.ContactSection.form.email,
      tr: tr.ContactSection.form.email,
      ar: ar.ContactSection.form.email,
    },
    phone: {
      en: en.ContactSection.form.phone,
      tr: tr.ContactSection.form.phone,
      ar: ar.ContactSection.form.phone,
    },
    message: {
      en: en.ContactSection.form.message,
      tr: tr.ContactSection.form.message,
      ar: ar.ContactSection.form.message,
    },
    button: {
      en: en.ContactSection.form.button,
      tr: tr.ContactSection.form.button,
      ar: ar.ContactSection.form.button,
    },
  },
  success: {
    en: en.ContactSection.success,
    tr: tr.ContactSection.success,
    ar: ar.ContactSection.success,
  },
};

await client.createOrReplace(contactSection);
console.log("Contact section seeded successfully.");
