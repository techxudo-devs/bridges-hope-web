import { defineField, defineType } from "sanity";

export const donationPostCategory = defineType({
  name: "donationPostCategory",
  title: "Donation Category",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localizedString" }),
    defineField({ name: "count", title: "Count", type: "number" }),
  ],
});

export const donationPost = defineType({
  name: "donationPost",
  title: "Donation Post",
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
      name: "detailParagraphs",
      title: "Detail Paragraphs",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: (Rule) => Rule.min(1),
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
