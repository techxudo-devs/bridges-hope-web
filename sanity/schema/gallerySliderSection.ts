import { defineField, defineType } from "sanity";

export const gallerySliderItem = defineType({
  name: "gallerySliderItem",
  title: "Gallery Slider Item",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Image", type: "image" }),
    defineField({ name: "alt", title: "Alt Text", type: "localizedString" }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      initialValue: "/gallery",
    }),
  ],
  preview: {
    select: {
      title: "alt.en",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Gallery slide",
        media,
      };
    },
  },
});

export const gallerySliderSection = defineType({
  name: "gallerySliderSection",
  title: "Gallery Slider Section",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Slides",
      type: "array",
      of: [{ type: "gallerySliderItem" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});
