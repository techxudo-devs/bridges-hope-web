import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc: { title?: { en?: string; tr?: string; ar?: string } }) =>
          doc?.title?.en || doc?.title?.tr || doc?.title?.ar || "",
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[\s_]+/g, "-")
            .replace(/[^\w\u0600-\u06FF-]+/g, "")
            .replace(/--+/g, "-")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
});

export const galleryPage = defineType({
  name: "galleryPage",
  title: "Gallery Page Settings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedString",
    }),
    defineField({
      name: "emptyStateMessage",
      title: "Empty State Message",
      type: "localizedString",
      description: "Shown when there are no gallery items.",
    }),
  ],
});
