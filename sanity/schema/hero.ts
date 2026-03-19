import { defineField, defineType } from "sanity";

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "localizedString",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
    }),
    defineField({
      name: "link",
      title: "Slide Link",
      type: "string",
      description: "Button URL for this specific slide (e.g. /donate).",
    }),
  ],
});

export const hero = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      of: [{ type: "heroSlide" }],
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "donateNowLabel",
      title: "Donate Now Label",
      type: "localizedString",
    }),
  ],
});
