import { defineField, defineType } from "sanity";

export const donateQuickPaymentMethod = defineType({
  name: "donateQuickPaymentMethod",
  title: "Donate Quick Payment Method",
  type: "object",
  fields: [
    defineField({
      name: "key",
      title: "Method Key",
      type: "string",
      description: "creditCard, whatsapp, or bankTransfer",
    }),
    defineField({ name: "label", title: "Label", type: "localizedString" }),
    defineField({ name: "href", title: "Action URL", type: "string" }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "localizedString",
      description: "Optional info text (e.g. IBAN details for bank transfer).",
    }),
  ],
});

export const donateQuickPage = defineType({
  name: "donateQuickPage",
  title: "Donate Quick Page",
  type: "document",
  fields: [
    defineField({ name: "leftImage", title: "Left Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "leftMessage",
      title: "Left Message",
      type: "localizedString",
    }),
    defineField({
      name: "amountTitle",
      title: "Amount Title",
      type: "localizedString",
    }),
    defineField({
      name: "currencySymbol",
      title: "Currency Symbol",
      type: "string",
    }),
    defineField({
      name: "defaultAmount",
      title: "Default Amount",
      type: "number",
    }),
    defineField({
      name: "amountOptions",
      title: "Amount Options",
      type: "array",
      of: [{ type: "number" }],
      validation: (Rule) => Rule.min(3),
    }),
    defineField({
      name: "otherLabel",
      title: "Other Label",
      type: "localizedString",
    }),
    defineField({
      name: "confirmButtonLabel",
      title: "Confirm Button Label",
      type: "localizedString",
    }),
    defineField({
      name: "modalTitle",
      title: "Modal Title",
      type: "localizedString",
    }),
    defineField({
      name: "totalLabel",
      title: "Total Label",
      type: "localizedString",
    }),
    defineField({
      name: "modalConfirmButtonLabel",
      title: "Modal Confirm Button Label",
      type: "localizedString",
    }),
    defineField({
      name: "paymentMethods",
      title: "Payment Methods",
      type: "array",
      of: [{ type: "donateQuickPaymentMethod" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});
