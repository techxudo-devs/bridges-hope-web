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

const posts = en.Blog.posts.map((post, index) => ({
  _type: "blogPost",
  title: {
    en: post.title,
    tr: tr.Blog.posts[index]?.title,
    ar: ar.Blog.posts[index]?.title,
  },
  excerpt: {
    en: post.excerpt,
    tr: tr.Blog.posts[index]?.excerpt,
    ar: ar.Blog.posts[index]?.excerpt,
  },
  date: {
    en: post.date,
    tr: tr.Blog.posts[index]?.date,
    ar: ar.Blog.posts[index]?.date,
  },
}));

const blogSection = {
  _id: "blogSection",
  _type: "blogSection",
  label: {
    en: en.Blog.label,
    tr: tr.Blog.label,
    ar: ar.Blog.label,
  },
  title: {
    en: en.Blog.title,
    tr: tr.Blog.title,
    ar: ar.Blog.title,
  },
  subtitle: {
    en: en.Blog.subtitle,
    tr: tr.Blog.subtitle,
    ar: ar.Blog.subtitle,
  },
  readMore: {
    en: en.Blog.readMore,
    tr: tr.Blog.readMore,
    ar: ar.Blog.readMore,
  },
  author: {
    en: en.Blog.author,
    tr: tr.Blog.author,
    ar: ar.Blog.author,
  },
  comment: {
    en: en.Blog.comment,
    tr: tr.Blog.comment,
    ar: ar.Blog.comment,
  },
  posts,
};

await client.createOrReplace(blogSection);
console.log("Blog section seeded successfully.");
