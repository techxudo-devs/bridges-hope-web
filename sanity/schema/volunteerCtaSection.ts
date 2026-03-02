import { defineField, defineType } from "sanity";

export const volunteerCtaItem = defineType({
  name: "volunteerCtaItem",
  title: "Volunteer CTA Item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedString",
    }),
    defineField({
      name: "buttonLabel",
      title: "Button Label",
      type: "localizedString",
    }),
    defineField({ name: "href", title: "Link", type: "string" }),
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "overlayColor",
      title: "Overlay Color",
      type: "string",
      description: "Hex or rgba value.",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Volunteer CTA",
        media,
      };
    },
  },
});

export const volunteerCtaSection = defineType({
  name: "volunteerCtaSection",
  title: "Volunteer CTA Section",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "volunteerCtaItem" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});
