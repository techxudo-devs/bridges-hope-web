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

const objectivesItems = en.MissionVision.objectives.items.map((item, index) => ({
  _type: "localizedString",
  en: item,
  tr: tr.MissionVision.objectives.items[index],
  ar: ar.MissionVision.objectives.items[index],
}));

const targetGroupItems = en.MissionVision.targetGroups.items.map(
  (item, index) => ({
    _type: "localizedString",
    en: item,
    tr: tr.MissionVision.targetGroups.items[index],
    ar: ar.MissionVision.targetGroups.items[index],
  })
);

const missionVision = {
  _id: "missionVisionSection",
  _type: "missionVision",
  mission: {
    _type: "missionVisionBlock",
    title: {
      en: en.MissionVision.mission.title,
      tr: tr.MissionVision.mission.title,
      ar: ar.MissionVision.mission.title,
    },
    text: {
      en: en.MissionVision.mission.text,
      tr: tr.MissionVision.mission.text,
      ar: ar.MissionVision.mission.text,
    },
  },
  objectives: {
    _type: "missionObjectives",
    title: {
      en: en.MissionVision.objectives.title,
      tr: tr.MissionVision.objectives.title,
      ar: ar.MissionVision.objectives.title,
    },
    highlight: {
      en: en.MissionVision.objectives.highlight,
      tr: tr.MissionVision.objectives.highlight,
      ar: ar.MissionVision.objectives.highlight,
    },
    items: objectivesItems,
    donateNow: {
      en: en.MissionVision.objectives.donateNow,
      tr: tr.MissionVision.objectives.donateNow,
      ar: ar.MissionVision.objectives.donateNow,
    },
  },
  vision: {
    _type: "missionVisionBlock",
    title: {
      en: en.MissionVision.vision.title,
      tr: tr.MissionVision.vision.title,
      ar: ar.MissionVision.vision.title,
    },
    text: {
      en: en.MissionVision.vision.text,
      tr: tr.MissionVision.vision.text,
      ar: ar.MissionVision.vision.text,
    },
  },
  targetGroups: {
    _type: "missionTargetGroups",
    title: {
      en: en.MissionVision.targetGroups.title,
      tr: tr.MissionVision.targetGroups.title,
      ar: ar.MissionVision.targetGroups.title,
    },
    items: targetGroupItems,
  },
};

await client.createOrReplace(missionVision);
console.log("Mission & Vision section seeded successfully.");
