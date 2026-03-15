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
      name: "whyVolunteerTitle",
      title: "Why Volunteer Title",
      type: "localizedString",
    }),
    defineField({
      name: "whyVolunteerItems",
      title: "Why Volunteer Items",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
    defineField({
      name: "whoCanVolunteerTitle",
      title: "Who Can Volunteer Title",
      type: "localizedString",
    }),
    defineField({
      name: "whoCanVolunteerDescription",
      title: "Who Can Volunteer Description",
      type: "localizedString",
    }),
    defineField({
      name: "volunteerAreas",
      title: "Volunteer Areas",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
    defineField({
      name: "joinTeamTitle",
      title: "Join Team Title",
      type: "localizedString",
    }),
    defineField({
      name: "joinTeamDescription",
      title: "Join Team Description",
      type: "localizedString",
    }),
    defineField({
      name: "applyCtaLabel",
      title: "Apply CTA Label",
      type: "localizedString",
    }),
    defineField({
      name: "applyCtaHref",
      title: "Apply CTA Href",
      type: "string",
      initialValue: "#",
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
