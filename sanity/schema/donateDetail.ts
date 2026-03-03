import { defineField, defineType } from "sanity";

export const donateDetailCategory = defineType({
  name: "donateDetailCategory",
  title: "Donate Detail Category",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localizedString" }),
    defineField({ name: "count", title: "Count", type: "number" }),
  ],
});

export const donateDetail = defineType({
  name: "donateDetail",
  title: "Donate Detail",
  type: "document",
  fields: [
    defineField({
      name: "raisedLabel",
      title: "Raised Label",
      type: "localizedString",
    }),
    defineField({
      name: "selectPaymentTitle",
      title: "Select Payment Title",
      type: "localizedString",
    }),
    defineField({
      name: "paymentMethods",
      title: "Payment Methods",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "firstNameLabel",
      title: "First Name Label",
      type: "localizedString",
    }),
    defineField({
      name: "lastNameLabel",
      title: "Last Name Label",
      type: "localizedString",
    }),
    defineField({
      name: "emailLabel",
      title: "Email Label",
      type: "localizedString",
    }),
    defineField({
      name: "donationTotalLabel",
      title: "Donation Total Label",
      type: "localizedString",
    }),
    defineField({
      name: "donateNowLabel",
      title: "Donate Now Label",
      type: "localizedString",
    }),
    defineField({
      name: "amountOptions",
      title: "Amount Options",
      type: "array",
      of: [{ type: "number" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "customAmountLabel",
      title: "Custom Amount Label",
      type: "localizedString",
    }),
    defineField({
      name: "categoriesTitle",
      title: "Categories Title",
      type: "localizedString",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "donateDetailCategory" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "galleryTitle",
      title: "Gallery Title",
      type: "localizedString",
    }),
    defineField({
      name: "detailParagraphs",
      title: "Detail Paragraphs",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
});
