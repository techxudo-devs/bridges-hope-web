import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config({ path: ".env.local" });
dotenv.config();

const isApplyMode = process.argv.includes("--apply");

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

const toSlug = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]+/g, "")
    .replace(/--+/g, "-")
    .slice(0, 96);

const toIdFragment = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

const localizedFromUnknown = (value, index) => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return {
      _type: "localizedString",
      en: value.en || value.tr || value.ar || `Gallery item ${index + 1}`,
      tr: value.tr,
      ar: value.ar,
    };
  }

  if (typeof value === "string") {
    return {
      _type: "localizedString",
      en: value,
    };
  }

  return {
    _type: "localizedString",
    en: `Gallery item ${index + 1}`,
  };
};

const preferredTitle = (localizedTitle) =>
  localizedTitle?.en || localizedTitle?.tr || localizedTitle?.ar || "";

const createUniqueSlug = (baseSlug, usedSlugs, index) => {
  const fallback = `gallery-item-${index + 1}`;
  const base = toSlug(baseSlug) || fallback;

  if (!usedSlugs.has(base)) {
    usedSlugs.add(base);
    return base;
  }

  let counter = 2;
  let candidate = `${base}-${counter}`;

  while (usedSlugs.has(candidate)) {
    counter += 1;
    candidate = `${base}-${counter}`;
  }

  usedSlugs.add(candidate);
  return candidate;
};

const legacyPages = await client.fetch(
  `*[_type == "galleryPage"] | order(_updatedAt desc){
    _id,
    _type,
    title,
    description,
    items
  }`
);

if (!legacyPages.length) {
  console.log("No galleryPage document found. Nothing to migrate.");
  process.exit(0);
}

const settingsSource =
  legacyPages.find((doc) => doc._id === "galleryPageSettings") || legacyPages[0];

const legacyItems = legacyPages.flatMap((doc) =>
  Array.isArray(doc.items) ? doc.items : []
);

const existingItems = await client.fetch(
  `*[_type == "galleryItem"]{ _id, "slug": slug.current }`
);
const usedSlugs = new Set(
  existingItems.map((doc) => doc.slug).filter((slug) => typeof slug === "string")
);

const docsToCreate = [];
const skipped = [];

legacyItems.forEach((legacyItem, index) => {
  const title = localizedFromUnknown(legacyItem?.title, index);
  const baseSlug =
    (typeof legacyItem?.slug === "string" && legacyItem.slug) ||
    legacyItem?.slug?.current ||
    preferredTitle(title);
  const slug = createUniqueSlug(baseSlug, usedSlugs, index);
  const heroImage = legacyItem?.heroImage || legacyItem?.image;
  const images = Array.isArray(legacyItem?.images)
    ? legacyItem.images.filter(Boolean)
    : legacyItem?.image
      ? [legacyItem.image]
      : [];

  if (!heroImage) {
    skipped.push({ index: index + 1, reason: "Missing hero/image" });
    return;
  }

  docsToCreate.push({
    _id: `galleryItem.${toIdFragment(slug) || `item-${index + 1}`}`,
    _type: "galleryItem",
    title,
    slug: {
      _type: "slug",
      current: slug,
    },
    heroImage,
    images,
  });
});

console.log(`Found ${legacyPages.length} galleryPage document(s).`);
console.log(`Found ${legacyItems.length} embedded gallery item(s).`);
console.log(`Will create ${docsToCreate.length} galleryItem document(s).`);

if (skipped.length) {
  console.log(`Skipped ${skipped.length} item(s) without hero/image.`);
}

if (!isApplyMode) {
  console.log("Dry run only. Re-run with --apply to perform migration.");
  process.exit(0);
}

const tx = client.transaction();

tx.createOrReplace({
  _id: "galleryPageSettings",
  _type: "galleryPage",
  title: settingsSource.title,
  description: settingsSource.description,
});

for (const doc of docsToCreate) {
  tx.createIfNotExists(doc);
}

for (const page of legacyPages) {
  tx.patch(page._id, (patch) => patch.unset(["items"]));
}

await tx.commit();

console.log("Migration completed.");
console.log("- galleryPageSettings is ensured as singleton settings document.");
console.log("- Embedded items were migrated to galleryItem documents.");
console.log("- Legacy embedded items were removed from galleryPage documents.");
