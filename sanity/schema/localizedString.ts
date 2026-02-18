import { defineType } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "string" },
    { name: "tr", title: "Turkish", type: "string" },
    { name: "ar", title: "Arabic", type: "string" },
  ],
});
