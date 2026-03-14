import { defineField, defineType } from "sanity";

export const volunteerPage = defineType({
  name: "volunteerPage",
  title: "Volunteer Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "localizedString",
    }),
    defineField({
      name: "introTitle",
      title: "Intro Title",
      type: "localizedString",
    }),
    defineField({
      name: "introDescription",
      title: "Intro Description",
      type: "localizedString",
    }),
    defineField({
      name: "highlightLabel",
      title: "Highlight Label",
      type: "localizedString",
    }),
    defineField({
      name: "highlightTitle",
      title: "Highlight Title",
      type: "localizedString",
    }),
    defineField({
      name: "highlightDescription",
      title: "Highlight Description",
      type: "localizedString",
    }),
  ],
  preview: {
    select: {
      title: "heroTitle.en",
      subtitle: "introTitle.en",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Volunteer Page",
        subtitle,
      };
    },
  },
});
