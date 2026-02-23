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

const donate = en.Pages.donate;
const donateTr = tr.Pages.donate;
const donateAr = ar.Pages.donate;

const impactItems = donate.impact.items.map((item, index) => ({
  _type: "donateImpactItem",
  title: {
    en: item.title,
    tr: donateTr.impact.items[index]?.title,
    ar: donateAr.impact.items[index]?.title,
  },
  description: {
    en: item.description,
    tr: donateTr.impact.items[index]?.description,
    ar: donateAr.impact.items[index]?.description,
  },
}));

const optionItems = donate.options.items.map((item, index) => ({
  _type: "donateOptionItem",
  title: {
    en: item.title,
    tr: donateTr.options.items[index]?.title,
    ar: donateAr.options.items[index]?.title,
  },
  description: {
    en: item.description,
    tr: donateTr.options.items[index]?.description,
    ar: donateAr.options.items[index]?.description,
  },
  detail: {
    en: item.detail,
    tr: donateTr.options.items[index]?.detail,
    ar: donateAr.options.items[index]?.detail,
  },
}));

const amountItems = donate.form.amounts.map((amount, index) => ({
  _type: "localizedString",
  en: amount,
  tr: donateTr.form.amounts[index],
  ar: donateAr.form.amounts[index],
}));

const promiseItems = donate.promise.items.map((item, index) => ({
  _type: "localizedString",
  en: item,
  tr: donateTr.promise.items[index],
  ar: donateAr.promise.items[index],
}));

const donatePage = {
  _id: "donatePage",
  _type: "donatePage",
  badge: {
    en: donate.badge,
    tr: donateTr.badge,
    ar: donateAr.badge,
  },
  title: {
    en: donate.title,
    tr: donateTr.title,
    ar: donateAr.title,
  },
  description: {
    en: donate.description,
    tr: donateTr.description,
    ar: donateAr.description,
  },
  primaryCta: {
    en: donate.primaryCta,
    tr: donateTr.primaryCta,
    ar: donateAr.primaryCta,
  },
  secondaryCta: {
    en: donate.secondaryCta,
    tr: donateTr.secondaryCta,
    ar: donateAr.secondaryCta,
  },
  impact: {
    _type: "donateImpactSection",
    kicker: {
      en: donate.impact.kicker,
      tr: donateTr.impact.kicker,
      ar: donateAr.impact.kicker,
    },
    title: {
      en: donate.impact.title,
      tr: donateTr.impact.title,
      ar: donateAr.impact.title,
    },
    description: {
      en: donate.impact.description,
      tr: donateTr.impact.description,
      ar: donateAr.impact.description,
    },
    items: impactItems,
  },
  options: {
    _type: "donateOptionsSection",
    kicker: {
      en: donate.options.kicker,
      tr: donateTr.options.kicker,
      ar: donateAr.options.kicker,
    },
    title: {
      en: donate.options.title,
      tr: donateTr.options.title,
      ar: donateAr.options.title,
    },
    description: {
      en: donate.options.description,
      tr: donateTr.options.description,
      ar: donateAr.options.description,
    },
    items: optionItems,
  },
  form: {
    _type: "donateForm",
    kicker: {
      en: donate.form.kicker,
      tr: donateTr.form.kicker,
      ar: donateAr.form.kicker,
    },
    title: {
      en: donate.form.title,
      tr: donateTr.form.title,
      ar: donateAr.form.title,
    },
    description: {
      en: donate.form.description,
      tr: donateTr.form.description,
      ar: donateAr.form.description,
    },
    mockLabel: {
      en: donate.form.mockLabel,
      tr: donateTr.form.mockLabel,
      ar: donateAr.form.mockLabel,
    },
    amountLabel: {
      en: donate.form.amountLabel,
      tr: donateTr.form.amountLabel,
      ar: donateAr.form.amountLabel,
    },
    amounts: amountItems,
    customLabel: {
      en: donate.form.customLabel,
      tr: donateTr.form.customLabel,
      ar: donateAr.form.customLabel,
    },
    summaryLabel: {
      en: donate.form.summaryLabel,
      tr: donateTr.form.summaryLabel,
      ar: donateAr.form.summaryLabel,
    },
    summary: {
      _type: "donateFormSummary",
      amount: {
        en: donate.form.summary.amount,
        tr: donateTr.form.summary.amount,
        ar: donateAr.form.summary.amount,
      },
      frequency: {
        en: donate.form.summary.frequency,
        tr: donateTr.form.summary.frequency,
        ar: donateAr.form.summary.frequency,
      },
      once: {
        en: donate.form.summary.once,
        tr: donateTr.form.summary.once,
        ar: donateAr.form.summary.once,
      },
    },
    submit: {
      en: donate.form.submit,
      tr: donateTr.form.submit,
      ar: donateAr.form.submit,
    },
    note: {
      en: donate.form.note,
      tr: donateTr.form.note,
      ar: donateAr.form.note,
    },
  },
  promise: {
    _type: "donatePromiseSection",
    kicker: {
      en: donate.promise.kicker,
      tr: donateTr.promise.kicker,
      ar: donateAr.promise.kicker,
    },
    title: {
      en: donate.promise.title,
      tr: donateTr.promise.title,
      ar: donateAr.promise.title,
    },
    description: {
      en: donate.promise.description,
      tr: donateTr.promise.description,
      ar: donateAr.promise.description,
    },
    items: promiseItems,
  },
};

await client.createOrReplace(donatePage);
console.log("Donate page seeded successfully.");
