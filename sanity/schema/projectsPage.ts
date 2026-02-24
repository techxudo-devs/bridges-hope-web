import { defineField, defineType } from "sanity";

export const projectsStat = defineType({
  name: "projectsStat",
  title: "Projects Stat",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localizedString" }),
    defineField({ name: "value", title: "Value", type: "localizedString" }),
  ],
});

export const projectsItem = defineType({
  name: "projectsItem",
  title: "Projects Item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedString",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "localizedString",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "localizedString",
    }),
    defineField({ name: "impact", title: "Impact", type: "localizedString" }),
    defineField({ name: "status", title: "Status", type: "localizedString" }),
  ],
});

export const projectsSection = defineType({
  name: "projectsSection",
  title: "Projects Section",
  type: "object",
  fields: [
    defineField({ name: "kicker", title: "Kicker", type: "localizedString" }),
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedString",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "projectsItem" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});

export const projectsHero = defineType({
  name: "projectsHero",
  title: "Projects Hero",
  type: "object",
  fields: [
    defineField({ name: "kicker", title: "Kicker", type: "localizedString" }),
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedString",
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "localizedString",
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "localizedString",
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{ type: "projectsStat" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});

export const projectsLabels = defineType({
  name: "projectsLabels",
  title: "Projects Labels",
  type: "object",
  fields: [
    defineField({ name: "impact", title: "Impact", type: "localizedString" }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "localizedString",
    }),
  ],
});

export const projectsCta = defineType({
  name: "projectsCta",
  title: "Projects CTA",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedString",
    }),
    defineField({ name: "button", title: "Button", type: "localizedString" }),
  ],
});

export const projectsPage = defineType({
  name: "projectsPage",
  title: "Projects Page",
  type: "document",
  fields: [
    defineField({ name: "hero", title: "Hero", type: "projectsHero" }),
    defineField({ name: "active", title: "Active", type: "projectsSection" }),
    defineField({
      name: "completed",
      title: "Completed",
      type: "projectsSection",
    }),
    defineField({ name: "labels", title: "Labels", type: "projectsLabels" }),
    defineField({ name: "cta", title: "CTA", type: "projectsCta" }),
  ],
});
