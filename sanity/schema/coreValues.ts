import { defineField, defineType } from "sanity";

export const coreValueItem = defineType({
  name: "coreValueItem",
  title: "Core Value Item",
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

export const coreValues = defineType({
  name: "coreValues",
  title: "Core Values Section",
  type: "document",
  fields: [
    defineField({ name: "subtitle", title: "Subtitle", type: "localizedString" }),
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "readMore",
      title: "Read More",
      type: "localizedString",
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [{ type: "coreValueItem" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});
