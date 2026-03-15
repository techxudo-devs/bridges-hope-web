import { createClient } from "@sanity/client";

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
    process.env.SANITY_WRITE_TOKEN ||
    "skPy7awwSEIVIKXfpbtYNcmlu9P6BG8FWq916eSCeTUcu589QlPRy5APFsLUbjDYhLzYnNaOI3sVnPYpROHEGEbhIVEuwayPps9GqxfymNDsgrrySOu2GzUYRmIrsWZDvuBjOIlnLgp2I8FSFOX999bFx5wdjF2s7YG0abA8UmALN9akYvMs",
  useCdn: false,
});

const toLocalizedString = (value = {}) => ({
  _type: "localizedString",
  en: value?.en ?? "",
  tr: value?.tr ?? "",
  ar: value?.ar ?? "",
});

const projectsPage = await client.fetch(`*[_type == "projectsPage"][0]{
  galleryItems[]{slug, category, title, description, image, location, duration, target, impact, status},
  active{items[]{slug, category, title, description, image, location, duration, target, impact, status}},
  completed{items[]{slug, category, title, description, image, location, duration, target, impact, status}}
}`);

if (!projectsPage) {
  throw new Error("projectsPage document not found.");
}

const projectDetail = await client.fetch(`*[_type == "projectDetail"][0]{
  content{name, date, author, tags, description, checklist, business},
  sideImages
}`);

const allItems = [
  ...(projectsPage?.galleryItems || []),
  ...(projectsPage?.active?.items || []),
  ...(projectsPage?.completed?.items || []),
];

const uniqueBySlug = new Map();
for (const item of allItems) {
  if (!item?.slug) continue;
  if (!uniqueBySlug.has(item.slug)) {
    uniqueBySlug.set(item.slug, item);
  }
}

let seededCount = 0;

for (const [slug, item] of uniqueBySlug.entries()) {
  const doc = {
    _id: `project.${slug}`,
    _type: "project",
    slug: { _type: "slug", current: slug },
    title: toLocalizedString(item?.title),
    category: toLocalizedString(item?.category),
    description: toLocalizedString(item?.description),
    image: item?.image,
    location: toLocalizedString(item?.location),
    date: toLocalizedString(projectDetail?.content?.date),
    author: toLocalizedString(projectDetail?.content?.author),
    tags: (projectDetail?.content?.tags || []).map((tag) => toLocalizedString(tag)),
    body: (projectDetail?.content?.description || []).map((paragraph) =>
      toLocalizedString(paragraph),
    ),
    checklist: (projectDetail?.content?.checklist || []).map((entry) =>
      toLocalizedString(entry),
    ),
    business: {
      _type: "projectBusiness",
      title: toLocalizedString(projectDetail?.content?.business?.title),
      description: toLocalizedString(projectDetail?.content?.business?.description),
    },
    gallery: projectDetail?.sideImages || [],
  };

  await client.createOrReplace(doc);
  seededCount += 1;
  console.log(`Seeded project.${slug}`);
}

console.log(`Done. Seeded ${seededCount} project document(s).`);
