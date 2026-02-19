import { defineField, defineType } from "sanity";

export const contactInfo = defineType({
  name: "contactInfo",
  title: "Contact Info",
  type: "object",
  fields: [
    defineField({
      name: "emailTitle",
      title: "Email Title",
      type: "localizedString",
    }),
    defineField({
      name: "emailDetail",
      title: "Email Detail",
      type: "localizedString",
    }),
    defineField({
      name: "visitTitle",
      title: "Visit Title",
      type: "localizedString",
    }),
    defineField({
      name: "visitDetail",
      title: "Visit Detail",
      type: "localizedString",
    }),
    defineField({
      name: "hoursTitle",
      title: "Hours Title",
      type: "localizedString",
    }),
    defineField({
      name: "hoursDetail",
      title: "Hours Detail",
      type: "localizedString",
    }),
  ],
});

export const contactForm = defineType({
  name: "contactForm",
  title: "Contact Form",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "localizedString" }),
    defineField({ name: "email", title: "Email", type: "localizedString" }),
    defineField({ name: "phone", title: "Phone", type: "localizedString" }),
    defineField({
      name: "message",
      title: "Message",
      type: "localizedString",
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "localizedString",
    }),
  ],
});

export const contactSection = defineType({
  name: "contactSection",
  title: "Contact Section",
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
      name: "description",
      title: "Description",
      type: "localizedString",
    }),
    defineField({ name: "info", title: "Info", type: "contactInfo" }),
    defineField({ name: "form", title: "Form", type: "contactForm" }),
    defineField({ name: "success", title: "Success", type: "localizedString" }),
  ],
});
