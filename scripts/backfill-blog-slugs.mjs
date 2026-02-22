import { createClient } from "@sanity/client";

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

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const posts = await client.fetch(
  `*[_type == "blogPost" && (!defined(slug.current) || slug.current == "")]{
    _id,
    title
  }`,
);

for (const post of posts) {
  const title = post.title?.en || post.title?.tr || post.title?.ar || "";
  if (!title) continue;
  const slug = slugify(title);
  if (!slug) continue;

  await client
    .patch(post._id)
    .set({
      slug: {
        _type: "slug",
        current: slug,
      },
    })
    .commit();
  console.log(`Updated slug for ${post._id} -> ${slug}`);
}

console.log("Blog slug backfill complete.");
