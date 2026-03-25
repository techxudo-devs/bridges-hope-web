import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config({ path: ".env.local" });

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "eozh9zww";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token:
    "skPy7awwSEIVIKXfpbtYNcmlu9P6BG8FWq916eSCeTUcu589QlPRy5APFsLUbjDYhLzYnNaOI3sVnPYpROHEGEbhIVEuwayPps9GqxfymNDsgrrySOu2GzUYRmIrsWZDvuBjOIlnLgp2I8FSFOX999bFx5wdjF2s7YG0abA8UmALN9akYvMs",
  useCdn: false,
});

if (!client.config().projectId || !client.config().dataset) {
  throw new Error("Missing Sanity projectId or dataset in env vars.");
}

if (!client.config().token) {
  throw new Error("Missing SANITY_WRITE_TOKEN in env vars.");
}

const donateQuickPageId = await client.fetch(
  `coalesce(*[_type == "donateQuickPage" && !(_id in path("drafts.**"))][0]._id, *[_type == "donateQuickPage"][0]._id)`,
);

const donateQuickPage = {
  _type: "donateQuickPage",
  leftMessage: {
    en: "A little from you can do a lot for others.",
    tr: "Senden biraz, başkaları için çok şey yapar.",
    ar: "القليل منك يمكن أن يصنع فرقًا كبيرًا للآخرين.",
  },
  amountTitle: {
    en: "Choose donation amount",
    tr: "Bağış tutarını seçin",
    ar: "اختر مبلغ التبرع",
  },
  currencySymbol: "₺",
  defaultAmount: 50,
  amountOptions: [20, 50, 100],
  otherLabel: {
    en: "Other",
    tr: "Diğer",
    ar: "أخرى",
  },
  confirmButtonLabel: {
    en: "Confirm Donation",
    tr: "Bağışı Onayla",
    ar: "تأكيد التبرع",
  },
  modalTitle: {
    en: "Confirm Donation",
    tr: "Bağışı Onayla",
    ar: "تأكيد التبرع",
  },
  totalLabel: {
    en: "Total Donation",
    tr: "Toplam Bağış",
    ar: "إجمالي التبرع",
  },
  modalConfirmButtonLabel: {
    en: "Go to Payment",
    tr: "Ödemeye Git",
    ar: "الانتقال إلى الدفع",
  },
  paymentMethods: [
    {
      _type: "donateQuickPaymentMethod",
      key: "creditCard",
      label: {
        en: "Credit Card (ATM as usual)",
        tr: "Kredi Kartı (ATM gibi)",
        ar: "بطاقة ائتمان (كالمعتاد عبر ATM)",
      },
      href: "https://example.com/donate?amount={amount}",
    },
    {
      _type: "donateQuickPaymentMethod",
      key: "whatsapp",
      label: {
        en: "Whatsapp",
        tr: "Whatsapp",
        ar: "واتساب",
      },
      href: "https://wa.me/9050163666641?text=I%20want%20to%20donate%20{amount}%20TRY",
    },
    {
      _type: "donateQuickPaymentMethod",
      key: "bankTransfer",
      label: {
        en: "Bank Transfer",
        tr: "Banka Havalesi",
        ar: "تحويل بنكي",
      },
      href: "",
      detail: {
        en: "Bank: Türkiye Vakıflar Bankası\nBranch: Vatan Caddesi İstanbul\nSWIFT: TVBATR2A\nAccount: Umut Köprüleri Gelişim ve Rehabilitasyon Derneği\n\n$ USD\nTR15 0001 5001 5804 8017 4949 00\n\n€ EUR\nTR86 0001 5001 5804 8017 4841 16\n\n₺ TRY\nTR96 0001 5001 5800 7308 4781 52",
        tr: "Banka: Türkiye Vakıflar Bankası\nŞube: Vatan Caddesi İstanbul\nSWIFT: TVBATR2A\nHesap: Umut Köprüleri Gelişim ve Rehabilitasyon Derneği\n\n$ USD\nTR15 0001 5001 5804 8017 4949 00\n\n€ EUR\nTR86 0001 5001 5804 8017 4841 16\n\n₺ TRY\nTR96 0001 5001 5800 7308 4781 52",
        ar: "البنك: Türkiye Vakıflar Bankası\nالفرع: Vatan Caddesi İstanbul\nSWIFT: TVBATR2A\nاسم الحساب: Umut Köprüleri Gelişim ve Rehabilitasyon Derneği\n\n$ USD\nTR15 0001 5001 5804 8017 4949 00\n\n€ EUR\nTR86 0001 5001 5804 8017 4841 16\n\n₺ TRY\nTR96 0001 5001 5800 7308 4781 52",
      },
    },
  ],
};

if (donateQuickPageId) {
  await client
    .patch(donateQuickPageId)
    .set(donateQuickPage)
    .commit({ autoGenerateArrayKeys: true });
} else {
  await client.create({
    _id: "donateQuickPage",
    ...donateQuickPage,
  });
}

console.log("Donate quick section seeded successfully.");
