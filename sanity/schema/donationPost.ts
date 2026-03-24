import { defineField, defineType } from "sanity";

export const donationPostCategory = defineType({
  name: "donationPostCategory",
  title: "Campaign Category",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localizedString" }),
    defineField({ name: "count", title: "Count", type: "number" }),
  ],
});

export const donationPost = defineType({
  name: "donationPost",
  title: "Campaign",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (document: any) =>
          document?.title?.en ||
          document?.title?.tr ||
          document?.title?.ar ||
          "",
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, ""),
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "category", title: "Category", type: "localizedString" }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedString",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "raisedAmount",
      title: "Raised Amount",
      type: "number",
    }),
    defineField({
      name: "goalAmount",
      title: "Goal Amount",
      type: "number",
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "string",
    }),
    defineField({
      name: "defaultAmount",
      title: "Default Donation Amount",
      type: "number",
      description: "Starting/default amount pre-selected for this campaign.",
    }),
    defineField({
      name: "amountOptions",
      title: "Donation Amount Options",
      type: "array",
      of: [{ type: "number" }],
      description: "Quick-select donation amounts for this specific campaign (overrides global).",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube Video URL",
      type: "string",
      description: "Optional YouTube video URL to embed on this campaign page.",
    }),
    defineField({
      name: "detailParagraphs",
      title: "Detail Paragraphs",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "richContent",
      title: "Rich Content (Body)",
      type: "localizedBlockContent",
      description: "Full rich text body with headings, bold, bullet points, etc. Use this instead of Detail Paragraphs for new content.",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "donationPostCategory" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "image",
      subtitle: "slug.current",
    },
  },
});
