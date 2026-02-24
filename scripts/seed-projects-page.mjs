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

const projects = en.Pages.projects;
const projectsTr = tr.Pages.projects;
const projectsAr = ar.Pages.projects;

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

const activeItems = projects.active.items.map((item, index) => ({
  _type: "projectsItem",
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
}));

const completedItems = projects.completed.items.map((item, index) => ({
  _type: "projectsItem",
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
}));

const projectsPage = {
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

await client.createOrReplace(projectsPage);
console.log("Projects page seeded successfully.");
