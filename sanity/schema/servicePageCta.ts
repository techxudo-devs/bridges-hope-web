import { defineField, defineType } from "sanity";

export const servicePageCta = defineType({
  name: "servicePageCta",
  title: "Service Page CTA",
  type: "document",
  fields: [
    defineField({ name: "kicker", title: "Kicker", type: "localizedString" }),
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
    defineField({
      name: "buttonHref",
      title: "Button Link",
      type: "string",
      initialValue: "/volunteer",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "buttonHref",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Service CTA",
        subtitle,
      };
    },
  },
});
