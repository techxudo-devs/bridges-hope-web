import dotenv from "dotenv";
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

dotenv.config({ path: ".env.local" });

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

const localizedAddress = {
  en: en.TopBar.address,
  tr: tr.TopBar.address,
  ar: ar.TopBar.address,
};

const localizedPhone = {
  en: en.Footer.phone,
  tr: tr.Footer.phone,
  ar: ar.Footer.phone,
};

const aboutPhone = {
  en: en.AboutSection.phoneNumber,
  tr: tr.AboutSection.phoneNumber,
  ar: ar.AboutSection.phoneNumber,
};

const getDocumentIdByType = async (type) =>
  client.fetch(
    `coalesce(*[_type == $type && !(_id in path("drafts.**"))][0]._id, *[_type == $type][0]._id)`,
    { type },
  );

const patchOrCreate = async (type, fallbackId, fields) => {
  const docId = await getDocumentIdByType(type);

  if (docId) {
    await client.patch(docId).set(fields).commit({ autoGenerateArrayKeys: true });
    return;
  }

  await client.create({
    _id: fallbackId,
    _type: type,
    ...fields,
  });
};

await patchOrCreate("aboutSection", "aboutSection", {
  phoneNumber: aboutPhone,
});

await patchOrCreate("contactSection", "contactSection", {
  info: {
    _type: "contactInfo",
    visitDetail: localizedAddress,
  },
});

await patchOrCreate("footerSection", "footerSection", {
  address: localizedAddress,
  phone: localizedPhone,
});

console.log("Contact info fields seeded successfully.");
