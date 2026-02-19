import { defineField, defineType } from "sanity";

export const footerNewsItem = defineType({
  name: "footerNewsItem",
  title: "Footer News Item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({ name: "date", title: "Date", type: "localizedString" }),
  ],
});

export const footerSection = defineType({
  name: "footerSection",
  title: "Footer Section",
  type: "document",
  fields: [
    defineField({
      name: "aboutText",
      title: "About Text",
      type: "localizedString",
    }),
    defineField({
      name: "quickLinks",
      title: "Quick Links",
      type: "localizedString",
    }),
    defineField({
      name: "contactUs",
      title: "Contact Us",
      type: "localizedString",
    }),
    defineField({ name: "rights", title: "Rights", type: "localizedString" }),
    defineField({ name: "address", title: "Address", type: "localizedString" }),
    defineField({ name: "email", title: "Email", type: "localizedString" }),
    defineField({ name: "phone", title: "Phone", type: "localizedString" }),
    defineField({
      name: "news",
      title: "News",
      type: "array",
      of: [{ type: "footerNewsItem" }],
    }),
  ],
});
