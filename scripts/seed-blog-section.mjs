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

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const toDate = (value) => {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString().slice(0, 10);
};

const posts = en.Blog.posts.map((post, index) => {
  const title = post.title || `Blog post ${index + 1}`;
  const postId = `blogPost-${index + 1}`;
  const excerpt = post.excerpt || "";

  return {
    _id: postId,
    _type: "blogPost",
    title: {
      en: title,
      tr: tr.Blog.posts[index]?.title,
      ar: ar.Blog.posts[index]?.title,
    },
    slug: {
      _type: "slug",
      current: slugify(title),
    },
    excerpt: {
      en: excerpt,
      tr: tr.Blog.posts[index]?.excerpt,
      ar: ar.Blog.posts[index]?.excerpt,
    },
    date: toDate(post.date) || "2024-08-03",
    body: [
      {
        _type: "block",
        _key: `body-${index + 1}`,
        style: "normal",
        children: [
          {
            _type: "span",
            _key: `body-${index + 1}-span-1`,
            text: excerpt || title,
          },
        ],
      },
    ],
  };
});

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
  posts: posts.map((post) => ({
    _type: "reference",
    _ref: post._id,
  })),
};

for (const post of posts) {
  await client.createOrReplace(post);
}

await client.createOrReplace(blogSection);
console.log("Blog section seeded successfully.");
