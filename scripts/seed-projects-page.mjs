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

const uploadImage = async (source) => {
  if (!source || typeof source !== "string") return undefined;
  let buffer;
  let filename;

  if (source.startsWith("http")) {
    const response = await fetch(source);
    if (!response.ok) return undefined;
    const arrayBuffer = await response.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
    filename = source.split("/").pop()?.split("?")[0] || "project.jpg";
  } else {
    const relativePath = source.startsWith("/") ? source.slice(1) : source;
    const filePath = join(__dirname, "..", "public", relativePath);
    buffer = await readFile(filePath);
    filename = relativePath.split("/").pop() || "project.jpg";
  }

  const asset = await client.assets.upload("image", buffer, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
};

const projects = en.Pages.projects;
const projectsTr = tr.Pages.projects;
const projectsAr = ar.Pages.projects;
const projectsPage = en.Pages.projectsPage;
const projectsPageTr = tr.Pages.projectsPage;
const projectsPageAr = ar.Pages.projectsPage;

const projectImages = {
  "education-for-children":
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000",
  "clean-water-initiative":
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000",
  "food-security-program":
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000",
  "healthcare-support":
    "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1000",
  "shelter-construction":
    "https://images.unsplash.com/photo-1509099652299-30938b0aeb63?q=80&w=1000",
  "elderly-care":
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000",
  "youth-empowerment":
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000",
  "community-development":
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000",
  "emergency-relief":
    "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=1000",
};

const heroStats = projects.hero.stats.map((stat, index) => ({
  _type: "projectsStat",
  label: {
    en: stat.label,
    tr: projectsTr.hero.stats[index]?.label,
    ar: projectsAr.hero.stats[index]?.label,
  },
  value: {
    en: stat.value,
    tr: projectsTr.hero.stats[index]?.value,
    ar: projectsAr.hero.stats[index]?.value,
  },
}));

const activeItems = await Promise.all(
  projects.active.items.map(async (item, index) => ({
    _type: "projectsItem",
    slug: item.slug,
    category: item.category
      ? {
          en: item.category,
          tr: projectsTr.active.items[index]?.category,
          ar: projectsAr.active.items[index]?.category,
        }
      : undefined,
    title: {
      en: item.title,
      tr: projectsTr.active.items[index]?.title,
      ar: projectsAr.active.items[index]?.title,
    },
    description: {
      en: item.description,
      tr: projectsTr.active.items[index]?.description,
      ar: projectsAr.active.items[index]?.description,
    },
    location: {
      en: item.location,
      tr: projectsTr.active.items[index]?.location,
      ar: projectsAr.active.items[index]?.location,
    },
    image: await uploadImage(item.image),
    duration: {
      en: item.duration,
      tr: projectsTr.active.items[index]?.duration,
      ar: projectsAr.active.items[index]?.duration,
    },
    impact: {
      en: item.impact,
      tr: projectsTr.active.items[index]?.impact,
      ar: projectsAr.active.items[index]?.impact,
    },
    status: {
      en: item.status,
      tr: projectsTr.active.items[index]?.status,
      ar: projectsAr.active.items[index]?.status,
    },
  })),
);

const completedItems = await Promise.all(
  projects.completed.items.map(async (item, index) => ({
    _type: "projectsItem",
    slug: item.slug,
    category: item.category
      ? {
          en: item.category,
          tr: projectsTr.completed.items[index]?.category,
          ar: projectsAr.completed.items[index]?.category,
        }
      : undefined,
    title: {
      en: item.title,
      tr: projectsTr.completed.items[index]?.title,
      ar: projectsAr.completed.items[index]?.title,
    },
    description: {
      en: item.description,
      tr: projectsTr.completed.items[index]?.description,
      ar: projectsAr.completed.items[index]?.description,
    },
    location: {
      en: item.location,
      tr: projectsTr.completed.items[index]?.location,
      ar: projectsAr.completed.items[index]?.location,
    },
    image: await uploadImage(item.image),
    duration: {
      en: item.duration,
      tr: projectsTr.completed.items[index]?.duration,
      ar: projectsAr.completed.items[index]?.duration,
    },
    impact: {
      en: item.impact,
      tr: projectsTr.completed.items[index]?.impact,
      ar: projectsAr.completed.items[index]?.impact,
    },
    status: {
      en: item.status,
      tr: projectsTr.completed.items[index]?.status,
      ar: projectsAr.completed.items[index]?.status,
    },
  })),
);

const galleryItems = await Promise.all(
  projectsPage.items.map(async (item, index) => ({
    _type: "projectsItem",
    slug: item.slug,
    category: {
      en: item.category,
      tr: projectsPageTr.items[index]?.category,
      ar: projectsPageAr.items[index]?.category,
    },
    title: {
      en: item.title,
      tr: projectsPageTr.items[index]?.title,
      ar: projectsPageAr.items[index]?.title,
    },
    image: await uploadImage(projectImages[item.slug]),
  })),
);

const projectsPageDoc = {
  _id: "projectsPage",
  _type: "projectsPage",
  hero: {
    _type: "projectsHero",
    kicker: {
      en: projects.hero.kicker,
      tr: projectsTr.hero.kicker,
      ar: projectsAr.hero.kicker,
    },
    title: {
      en: projects.hero.title,
      tr: projectsTr.hero.title,
      ar: projectsAr.hero.title,
    },
    description: {
      en: projects.hero.description,
      tr: projectsTr.hero.description,
      ar: projectsAr.hero.description,
    },
    primaryCta: {
      en: projects.hero.primaryCta,
      tr: projectsTr.hero.primaryCta,
      ar: projectsAr.hero.primaryCta,
    },
    secondaryCta: {
      en: projects.hero.secondaryCta,
      tr: projectsTr.hero.secondaryCta,
      ar: projectsAr.hero.secondaryCta,
    },
    stats: heroStats,
  },
  galleryItems,
  active: {
    _type: "projectsSection",
    kicker: {
      en: projects.active.kicker,
      tr: projectsTr.active.kicker,
      ar: projectsAr.active.kicker,
    },
    title: {
      en: projects.active.title,
      tr: projectsTr.active.title,
      ar: projectsAr.active.title,
    },
    description: {
      en: projects.active.description,
      tr: projectsTr.active.description,
      ar: projectsAr.active.description,
    },
    items: activeItems,
  },
  completed: {
    _type: "projectsSection",
    kicker: {
      en: projects.completed.kicker,
      tr: projectsTr.completed.kicker,
      ar: projectsAr.completed.kicker,
    },
    title: {
      en: projects.completed.title,
      tr: projectsTr.completed.title,
      ar: projectsAr.completed.title,
    },
    description: {
      en: projects.completed.description,
      tr: projectsTr.completed.description,
      ar: projectsAr.completed.description,
    },
    items: completedItems,
  },
  labels: {
    _type: "projectsLabels",
    impact: {
      en: projects.labels.impact,
      tr: projectsTr.labels.impact,
      ar: projectsAr.labels.impact,
    },
    duration: {
      en: projects.labels.duration,
      tr: projectsTr.labels.duration,
      ar: projectsAr.labels.duration,
    },
    target: {
      en: projects.labels.target,
      tr: projectsTr.labels.target,
      ar: projectsAr.labels.target,
    },
  },
  cta: {
    _type: "projectsCta",
    title: {
      en: projects.cta.title,
      tr: projectsTr.cta.title,
      ar: projectsAr.cta.title,
    },
    description: {
      en: projects.cta.description,
      tr: projectsTr.cta.description,
      ar: projectsAr.cta.description,
    },
    button: {
      en: projects.cta.button,
      tr: projectsTr.cta.button,
      ar: projectsAr.cta.button,
    },
  },
};

await client.createOrReplace(projectsPageDoc);
console.log("Projects page seeded successfully.");
