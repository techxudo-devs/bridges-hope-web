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

const volunteerPage = {
  _id: "volunteerPage",
  _type: "volunteerPage",
  heroTitle: {
    en: "Volunteer",
    tr: "Gönüllü",
    ar: "التطوع",
  },
  introTitle: {
    en: "Volunteer",
    tr: "Gönüllü",
    ar: "التطوع",
  },
  introDescription: {
    en: "Join our volunteer network to support education, healthcare, rehabilitation, and relief programs. Registration details will be available here.",
    tr: "Eğitim, sağlık, rehabilitasyon ve yardım programlarını desteklemek için gönüllü ağımıza katılın. Kayıt detayları burada paylaşılacaktır.",
    ar: "انضم إلى شبكة المتطوعين لدينا لدعم برامج التعليم والرعاية الصحية والتأهيل والإغاثة. سيتم توفير تفاصيل التسجيل هنا.",
  },
  highlightLabel: {
    en: "Fields of Work",
    tr: "Çalışma Alanları",
    ar: "مجالات العمل",
  },
  highlightTitle: {
    en: "Support for Disaster and Crisis Cases",
    tr: "Afet ve Kriz Vakalarına Destek",
    ar: "دعم حالات الكوارث والأزمات",
  },
  highlightDescription: {
    en: "Education - Healthcare - Support for Disaster and Crisis Cases.",
    tr: "Eğitim - Sağlık - Afet ve Kriz Vakalarına Destek.",
    ar: "التعليم - الرعاية الصحية - دعم حالات الكوارث والأزمات.",
  },
};

await client.createOrReplace(volunteerPage);
console.log("Volunteer page seeded successfully.");
