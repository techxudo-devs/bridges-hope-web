import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (document) =>
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
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "localizedString",
    }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "image",
      subtitle: "date",
    },
  },
});

export const blogSection = defineType({
  name: "blogSection",
  title: "Blog Section",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "localizedString" }),
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "localizedString",
    }),
    defineField({
      name: "readMore",
      title: "Read More",
      type: "localizedString",
    }),
    defineField({ name: "author", title: "Author", type: "localizedString" }),
    defineField({ name: "comment", title: "Comment", type: "localizedString" }),
    defineField({
      name: "posts",
      title: "Featured Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
    }),
  ],
});
