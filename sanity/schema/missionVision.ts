import { defineField, defineType } from "sanity";

export const missionVisionBlock = defineType({
  name: "missionVisionBlock",
  title: "Mission or Vision",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({ name: "text", title: "Text", type: "localizedString" }),
  ],
});

export const missionObjectives = defineType({
  name: "missionObjectives",
  title: "Mission Objectives",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "highlight",
      title: "Highlight",
      type: "localizedString",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "donateNow",
      title: "Donate Now",
      type: "localizedString",
    }),
  ],
});

export const missionTargetGroups = defineType({
  name: "missionTargetGroups",
  title: "Target Groups",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});

export const missionVision = defineType({
  name: "missionVision",
  title: "Mission & Vision",
  type: "document",
  fields: [
    defineField({ name: "mission", title: "Mission", type: "missionVisionBlock" }),
    defineField({
      name: "objectives",
      title: "Objectives",
      type: "missionObjectives",
    }),
    defineField({ name: "vision", title: "Vision", type: "missionVisionBlock" }),
    defineField({
      name: "targetGroups",
      title: "Target Groups",
      type: "missionTargetGroups",
    }),
  ],
});
