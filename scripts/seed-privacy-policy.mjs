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
  token: "" + process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

if (!client.config().projectId || !client.config().dataset) {
  throw new Error("Missing Sanity projectId or dataset in env vars.");
}

if (!client.config().token) {
  throw new Error("Missing SANITY_WRITE_TOKEN in env vars.");
}

const privacy = en.Pages.privacy;
const privacyTr = tr.Pages.privacy;
const privacyAr = ar.Pages.privacy;

const buildLocalizedValue = (value, trValue, arValue) => {
  if (value === undefined && trValue === undefined && arValue === undefined) {
    return undefined;
  }
  return {
    en: value,
    tr: trValue,
    ar: arValue,
  };
};

const buildLocalizedItemList = (items, trItems, arItems) =>
  items?.map((item, index) => ({
    _type: "localizedString",
    en: item,
    tr: trItems?.[index],
    ar: arItems?.[index],
  }));

const sections = privacy.sections.map((section, sectionIndex) => {
  const sectionTr = privacyTr.sections?.[sectionIndex];
  const sectionAr = privacyAr.sections?.[sectionIndex];

  const subsections = section.subsections?.map(
    (subsection, subsectionIndex) => {
      const subsectionTr = sectionTr?.subsections?.[subsectionIndex];
      const subsectionAr = sectionAr?.subsections?.[subsectionIndex];

      return {
        _type: "privacyPolicySubsection",
        title: buildLocalizedValue(
          subsection.title,
          subsectionTr?.title,
          subsectionAr?.title,
        ),
        items: buildLocalizedItemList(
          subsection.items,
          subsectionTr?.items,
          subsectionAr?.items,
        ),
      };
    },
  );

  return {
    _type: "privacyPolicySection",
    title: buildLocalizedValue(
      section.title,
      sectionTr?.title,
      sectionAr?.title,
    ),
    description: buildLocalizedValue(
      section.description,
      sectionTr?.description,
      sectionAr?.description,
    ),
    items: buildLocalizedItemList(
      section.items,
      sectionTr?.items,
      sectionAr?.items,
    ),
    note: buildLocalizedValue(section.note, sectionTr?.note, sectionAr?.note),
    subsections,
  };
});

const contactItems = privacy.contact.items.map((item, index) => ({
  _type: "privacyPolicyContactItem",
  label: {
    en: item.label,
    tr: privacyTr.contact.items[index]?.label,
    ar: privacyAr.contact.items[index]?.label,
  },
  value: {
    en: item.value,
    tr: privacyTr.contact.items[index]?.value,
    ar: privacyAr.contact.items[index]?.value,
  },
}));

const privacyPolicy = {
  _id: "privacyPolicy",
  _type: "privacyPolicy",
  title: buildLocalizedValue(privacy.title, privacyTr.title, privacyAr.title),
  organization: buildLocalizedValue(
    privacy.organization,
    privacyTr.organization,
    privacyAr.organization,
  ),
  intro: buildLocalizedValue(privacy.intro, privacyTr.intro, privacyAr.intro),
  introNote: buildLocalizedValue(
    privacy.introNote,
    privacyTr.introNote,
    privacyAr.introNote,
  ),
  sections,
  contact: {
    _type: "privacyPolicyContact",
    title: buildLocalizedValue(
      privacy.contact.title,
      privacyTr.contact.title,
      privacyAr.contact.title,
    ),
    description: buildLocalizedValue(
      privacy.contact.description,
      privacyTr.contact.description,
      privacyAr.contact.description,
    ),
    items: contactItems,
  },
  updatedLabel: buildLocalizedValue(
    privacy.updatedLabel,
    privacyTr.updatedLabel,
    privacyAr.updatedLabel,
  ),
  updatedValue: buildLocalizedValue(
    privacy.updatedValue,
    privacyTr.updatedValue,
    privacyAr.updatedValue,
  ),
};

await client.createOrReplace(privacyPolicy);
console.log("Privacy policy seeded successfully.");
