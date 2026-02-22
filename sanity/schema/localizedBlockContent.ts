import { defineField, defineType } from "sanity";

export const localizedBlockContent = defineType({
  name: "localizedBlockContent",
  title: "Localized Block Content",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "tr", title: "Turkish", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "ar", title: "Arabic", type: "array", of: [{ type: "block" }] }),
  ],
});
