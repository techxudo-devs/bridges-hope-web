import { defineField, defineType } from "sanity";

export const privacyPolicySubsection = defineType({
  name: "privacyPolicySubsection",
  title: "Privacy Policy Subsection",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
  ],
});

export const privacyPolicySection = defineType({
  name: "privacyPolicySection",
  title: "Privacy Policy Section",
  type: "object",
  fields: [
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
    }),
    defineField({ name: "note", title: "Note", type: "localizedString" }),
    defineField({
      name: "subsections",
      title: "Subsections",
      type: "array",
      of: [{ type: "privacyPolicySubsection" }],
    }),
  ],
});

export const privacyPolicyContactItem = defineType({
  name: "privacyPolicyContactItem",
  title: "Privacy Policy Contact Item",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localizedString" }),
    defineField({ name: "value", title: "Value", type: "localizedString" }),
  ],
});

export const privacyPolicyContact = defineType({
  name: "privacyPolicyContact",
  title: "Privacy Policy Contact",
  type: "object",
  fields: [
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
      of: [{ type: "privacyPolicyContactItem" }],
    }),
  ],
});

export const privacyPolicy = defineType({
  name: "privacyPolicy",
  title: "Privacy Policy",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "localizedString",
    }),
    defineField({ name: "intro", title: "Intro", type: "localizedString" }),
    defineField({
      name: "introNote",
      title: "Intro Note",
      type: "localizedString",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [{ type: "privacyPolicySection" }],
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "privacyPolicyContact",
    }),
    defineField({
      name: "updatedLabel",
      title: "Updated Label",
      type: "localizedString",
    }),
    defineField({
      name: "updatedValue",
      title: "Updated Value",
      type: "localizedString",
    }),
  ],
});
