import { defineField, defineType } from "sanity";

export const donateImpactItem = defineType({
  name: "donateImpactItem",
  title: "Donate Impact Item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedString",
    }),
  ],
});

export const donateImpactSection = defineType({
  name: "donateImpactSection",
  title: "Donate Impact Section",
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
      of: [{ type: "donateImpactItem" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});

export const donateOptionItem = defineType({
  name: "donateOptionItem",
  title: "Donate Option Item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedString",
    }),
    defineField({ name: "detail", title: "Detail", type: "localizedString" }),
  ],
});

export const donateOptionsSection = defineType({
  name: "donateOptionsSection",
  title: "Donate Options Section",
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
      of: [{ type: "donateOptionItem" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});

export const donateFormSummary = defineType({
  name: "donateFormSummary",
  title: "Donate Form Summary",
  type: "object",
  fields: [
    defineField({ name: "amount", title: "Amount", type: "localizedString" }),
    defineField({
      name: "frequency",
      title: "Frequency",
      type: "localizedString",
    }),
    defineField({ name: "once", title: "Once", type: "localizedString" }),
  ],
});

export const donateForm = defineType({
  name: "donateForm",
  title: "Donate Form",
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
      name: "mockLabel",
      title: "Mock Label",
      type: "localizedString",
    }),
    defineField({
      name: "amountLabel",
      title: "Amount Label",
      type: "localizedString",
    }),
    defineField({
      name: "amounts",
      title: "Amounts",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "customLabel",
      title: "Custom Label",
      type: "localizedString",
    }),
    defineField({
      name: "summaryLabel",
      title: "Summary Label",
      type: "localizedString",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "donateFormSummary",
    }),
    defineField({ name: "submit", title: "Submit", type: "localizedString" }),
    defineField({ name: "note", title: "Note", type: "localizedString" }),
  ],
});

export const donatePromiseSection = defineType({
  name: "donatePromiseSection",
  title: "Donate Promise Section",
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
      of: [{ type: "localizedString" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});

export const donatePage = defineType({
  name: "donatePage",
  title: "Donate Page",
  type: "document",
  fields: [
    defineField({ name: "badge", title: "Badge", type: "localizedString" }),
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
    defineField({ name: "impact", title: "Impact", type: "donateImpactSection" }),
    defineField({
      name: "options",
      title: "Options",
      type: "donateOptionsSection",
    }),
    defineField({ name: "form", title: "Form", type: "donateForm" }),
    defineField({
      name: "promise",
      title: "Promise",
      type: "donatePromiseSection",
    }),
  ],
});
