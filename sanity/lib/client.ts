import { createClient } from "next-sanity";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  "";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  process.env.SANITY_DATASET ||
  "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token:
    process.env.SANITY_API_READ_TOKEN ||
    process.env.SANITY_READ_TOKEN ||
    process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});
