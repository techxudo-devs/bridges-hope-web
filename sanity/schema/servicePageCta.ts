import { defineField, defineType } from "sanity";

export const servicePageCta = defineType({
  name: "servicePageCta",
  title: "Beneficiaries Page Content",
  type: "document",
  fields: [
    defineField({
      name: "introText",
      title: "Intro Text",
      type: "localizedString",
    }),
    defineField({
      name: "programsTitle",
      title: "Programs Title",
      type: "localizedString",
    }),
    defineField({
      name: "programItems",
      title: "Program Items",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
    defineField({
      name: "registrationBenefitText",
      title: "Registration Benefit Text",
      type: "localizedString",
    }),
    defineField({
      name: "confidentialityNote",
      title: "Confidentiality Note",
      type: "localizedString",
    }),
    defineField({
      name: "expectedTimeText",
      title: "Expected Time Text",
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
      title: "introText.en",
      subtitle: "buttonHref",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Beneficiaries Page Content",
        subtitle,
      };
    },
  },
});
