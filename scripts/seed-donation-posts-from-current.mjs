import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config({ path: ".env.local" });
dotenv.config();

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

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const toLocalizedString = (value) => ({
  _type: "localizedString",
  en: value?.en ?? "",
  tr: value?.tr ?? "",
  ar: value?.ar ?? "",
});

const donatePage = await client.fetch(
  `*[_type == "donatePage"][0]{
    campaigns{
      items[]{
        slug,
        category,
        title,
        description,
        image,
        raisedAmount,
        goalAmount,
        accentColor
      }
    }
  }`,
);

if (!donatePage?.campaigns?.items?.length) {
  throw new Error("No donate campaigns found in donatePage.");
}

const donateDetail = await client.fetch(
  `*[_type == "donateDetail"][0]{
    detailParagraphs,
    categories,
    galleryImages
  }`,
);

const detailParagraphs = (donateDetail?.detailParagraphs || []).map((item) => ({
  _type: "localizedString",
  en: item?.en ?? "",
  tr: item?.tr ?? "",
  ar: item?.ar ?? "",
}));

const categories = (donateDetail?.categories || []).map((item) => ({
  _type: "donationPostCategory",
  label: toLocalizedString(item?.label),
  count: Number(item?.count || 0),
}));

const galleryImages = donateDetail?.galleryImages || [];

let seededCount = 0;

for (const item of donatePage.campaigns.items) {
  const titleSource =
    item?.title?.en || item?.title?.tr || item?.title?.ar || "";
  const currentSlug = item?.slug || slugify(titleSource);

  if (!currentSlug) {
    console.log("Skipping donation without slug/title:", item?.title);
    continue;
  }

  const documentId = `donationPost.${currentSlug}`;

  const donationPost = {
    _id: documentId,
    _type: "donationPost",
    title: toLocalizedString(item?.title),
    slug: {
      _type: "slug",
      current: currentSlug,
    },
    category: toLocalizedString(item?.category),
    description: toLocalizedString(item?.description),
    image: item?.image,
    raisedAmount: Number(item?.raisedAmount || 0),
    goalAmount: Number(item?.goalAmount || 0),
    accentColor: item?.accentColor || "",
    detailParagraphs,
    categories,
    galleryImages,
  };

  await client.createOrReplace(donationPost);

  const duplicates = await client.fetch(
    `*[_type == "donationPost" && slug.current == $slug && _id != $id]{ _id }`,
    { slug: currentSlug, id: documentId },
  );

  for (const duplicate of duplicates || []) {
    await client.delete(duplicate._id);
    console.log(`Deleted duplicate ${duplicate._id}`);
  }

  seededCount += 1;
  console.log(`Seeded ${documentId}`);
}

console.log(`Done. Seeded ${seededCount} donation post(s).`);
