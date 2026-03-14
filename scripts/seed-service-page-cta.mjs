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
    "skPy7awwSEIVIKXfpbtYNcmlu9P6BG8FWq916eSCeTUcu589QlPRy5APFsLUbjDYhLzYnNaOI3sVnPYpROHEGEbhIVEuwayPps9GqxfymNDsgrrySOu2GzUYRmIrsWZDvuBjOIlnLgp2I8FSFOX999bFx5wdjF2s7YG0abA8UmALN9akYvMs",
  useCdn: false,
});

if (!client.config().projectId || !client.config().dataset) {
  throw new Error("Missing Sanity projectId or dataset in env vars.");
}

if (!client.config().token) {
  throw new Error("Missing SANITY_WRITE_TOKEN in env vars.");
}

const servicePageCta = {
  _id: "servicePageCta",
  _type: "servicePageCta",
  kicker: {
    en: "Volunteer",
    tr: "Gönüllü",
    ar: "التطوع",
  },
  title: {
    en: "Join our Team",
    tr: "Ekibimize Katılın",
    ar: "انضم إلى فريقنا",
  },
  description: {
    en: "Volunteer alongside our field teams to deliver direct relief and long-term services.",
    tr: "Sahadaki ekiplerimizle birlikte doğrudan yardım ve uzun vadeli hizmetler sunun.",
    ar: "تطوّع مع فرقنا الميدانية لتقديم الإغاثة المباشرة والخدمات المستدامة.",
  },
  buttonLabel: {
    en: "Become a Volunteer",
    tr: "Gönüllü Ol",
    ar: "كن متطوعاً",
  },
  buttonHref: "/volunteer",
};

await client.createOrReplace(servicePageCta);
console.log("Service page CTA seeded successfully.");
