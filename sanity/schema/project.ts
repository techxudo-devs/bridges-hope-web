import { defineField, defineType } from "sanity";

export const projectBusiness = defineType({
  name: "projectBusiness",
  title: "Project Business",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedString",
    }),
  ],
});

export const project = defineType({
  name: "project",
  title: "Project",
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
      title: "Card Description",
      type: "localizedString",
    }),
    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "location", title: "Location", type: "localizedString" }),
    defineField({ name: "date", title: "Date", type: "localizedString" }),
    defineField({ name: "author", title: "Author", type: "localizedString" }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
    defineField({
      name: "body",
      title: "Body Paragraphs",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
    defineField({
      name: "richBody",
      title: "Rich Body Content",
      type: "localizedBlockContent",
      description: "Full rich text with headings, bold, bullet points, etc. Use this instead of Body Paragraphs.",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube Video URL",
      type: "string",
      description: "Optional YouTube video URL to embed on this project page.",
    }),
    defineField({
      name: "checklist",
      title: "Checklist",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
    defineField({
      name: "business",
      title: "Business",
      type: "projectBusiness",
    }),
    defineField({
      name: "gallery",
      title: "Sidebar Gallery",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "slug.current",
      media: "image",
    },
  },
});
