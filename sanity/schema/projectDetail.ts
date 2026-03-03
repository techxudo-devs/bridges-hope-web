import { defineField, defineType } from "sanity";

export const projectDetailLabels = defineType({
  name: "projectDetailLabels",
  title: "Project Detail Labels",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "localizedString" }),
    defineField({ name: "date", title: "Date", type: "localizedString" }),
    defineField({ name: "author", title: "Author", type: "localizedString" }),
    defineField({ name: "tags", title: "Tags", type: "localizedString" }),
  ],
});

export const projectDetailBusiness = defineType({
  name: "projectDetailBusiness",
  title: "Project Detail Business",
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

export const projectDetailContent = defineType({
  name: "projectDetailContent",
  title: "Project Detail Content",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "localizedString" }),
    defineField({ name: "date", title: "Date", type: "localizedString" }),
    defineField({ name: "author", title: "Author", type: "localizedString" }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "checklist",
      title: "Checklist",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "business",
      title: "Business",
      type: "projectDetailBusiness",
    }),
  ],
});

export const projectDetail = defineType({
  name: "projectDetail",
  title: "Project Detail",
  type: "document",
  fields: [
    defineField({
      name: "detailsBadge",
      title: "Details Badge",
      type: "localizedString",
    }),
    defineField({
      name: "labels",
      title: "Labels",
      type: "projectDetailLabels",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "projectDetailContent",
    }),
    defineField({
      name: "sideImages",
      title: "Side Images",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
});
