import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "localizedString",
    }),
    defineField({ name: "date", title: "Date", type: "localizedString" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
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
      title: "Posts",
      type: "array",
      of: [{ type: "blogPost" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});
