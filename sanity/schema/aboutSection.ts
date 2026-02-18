import { defineField, defineType } from "sanity";

export const aboutFeatures = defineType({
  name: "aboutFeatures",
  title: "About Features",
  type: "object",
  fields: [
    defineField({
      name: "treatmentHelp",
      title: "Treatment Help",
      type: "localizedString",
    }),
    defineField({
      name: "fundRaised",
      title: "Fund Raised",
      type: "localizedString",
    }),
  ],
});

export const aboutSection = defineType({
  name: "aboutSection",
  title: "About Section",
  type: "document",
  fields: [
    defineField({ name: "subtitle", title: "Subtitle", type: "localizedString" }),
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "highlight",
      title: "Highlight",
      type: "localizedString",
    }),
    defineField({
      name: "descriptionLead",
      title: "Description Lead",
      type: "localizedString",
    }),
    defineField({
      name: "descriptionBody",
      title: "Description Body",
      type: "localizedString",
    }),
    defineField({ name: "quote", title: "Quote", type: "localizedString" }),
    defineField({
      name: "features",
      title: "Features",
      type: "aboutFeatures",
    }),
    defineField({
      name: "learnMore",
      title: "Learn More Button",
      type: "localizedString",
    }),
    defineField({
      name: "needHelpLabel",
      title: "Need Help Label",
      type: "localizedString",
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "localizedString",
    }),
    defineField({
      name: "imagePrimary",
      title: "Primary Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageSecondary",
      title: "Secondary Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageAltPrimary",
      title: "Primary Image Alt",
      type: "localizedString",
    }),
    defineField({
      name: "imageAltSecondary",
      title: "Secondary Image Alt",
      type: "localizedString",
    }),
    defineField({
      name: "fundedLabel",
      title: "Funded Label",
      type: "localizedString",
    }),
    defineField({
      name: "fundedAmount",
      title: "Funded Amount",
      type: "localizedString",
    }),
    defineField({
      name: "supportLabel",
      title: "Support Label",
      type: "localizedString",
    }),
  ],
});
