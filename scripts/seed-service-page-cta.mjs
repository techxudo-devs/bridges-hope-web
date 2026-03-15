import { createClient } from "@sanity/client";

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

const servicePageCta = {
  _id: "servicePageCta",
  _type: "servicePageCta",
  introText: {
    en: "You can register your information through this form to benefit from the programs and assistance offered by the association to people with disabilities and their families in the Gaza Strip.",
    ar: "يمكنكم تسجيل بياناتكم من خلال هذا النموذج للاستفادة من البرامج والمساعدات التي تقدمها الجمعية للأشخاص ذوي الإعاقة وأسرهم في قطاع غزة.",
    tr: "Engelli bireyler ve ailelerine yönelik sunduğumuz destek ve hizmetlerden faydalanabilmek için bu form üzerinden bilgilerinizi kaydedebilirsiniz.",
  },
  programsTitle: {
    en: "Through our humanitarian programs, we work to:",
    ar: "نعمل من خلال برامجنا الإنسانية على:",
    tr: "Derneğimizin yürüttüğü insani programlar kapsamında:",
  },
  programItems: [
    {
      _type: "localizedString",
      en: "Provide urgent assistance such as prosthetic devices, medications, and food parcels.",
      ar: "تقديم مساعدات عاجلة مثل الأجهزة التعويضية، والأدوية، والطرود الغذائية.",
      tr: "Acil yardımlar sağlıyoruz (protez ve yardımcı cihazlar, ilaç desteği, gıda kolileri vb.).",
    },
    {
      _type: "localizedString",
      en: "Design specialized rehabilitation programs tailored to the abilities and needs of each individual.",
      ar: "تصميم برامج تأهيل متخصصة تتناسب مع قدرات واحتياجات كل حالة.",
      tr: "Her bireyin durumuna uygun özel rehabilitasyon ve destek programları planlıyoruz.",
    },
    {
      _type: "localizedString",
      en: "Provide job opportunities, particularly in remote work, to help people with disabilities secure a dignified income.",
      ar: "توفير فرص عمل خاصة في مجالات العمل عن بُعد لمساعدة الأشخاص ذوي الإعاقة في الحصول على مصدر دخل كريم.",
      tr: "Engelli bireylerin gelir elde edebilmesi için özellikle uzaktan çalışma imkânlarına yönelik iş fırsatları oluşturmaya çalışıyoruz.",
    },
  ],
  registrationBenefitText: {
    en: "Registering this information helps us better understand your needs and contact you when suitable programs or assistance become available.",
    ar: "يساعدنا تسجيل هذه البيانات في التعرف على احتياجاتكم بشكل أدق، والتواصل معكم عند توفر البرامج أو المساعدات المناسبة.",
    tr: "Formda paylaştığınız bilgiler, ihtiyaçlarınızı daha doğru şekilde anlamamıza ve uygun destek programları açıldığında sizinle iletişime geçmemize yardımcı olacaktır.",
  },
  confidentialityNote: {
    en: "Note: All entered data is confidential and secure and will only be used for the purpose of providing humanitarian aid and support.",
    ar: "ملاحظة: جميع البيانات المدخلة سرية وآمنة، ولن تُستخدم إلا لغرض تقديم المساعدة والدعم الإنساني.",
    tr: "Not: Paylaştığınız tüm bilgiler gizli tutulur ve yalnızca yardım ve destek süreçlerinde kullanılacaktır.",
  },
  expectedTimeText: {
    en: "Expected time to complete the form: Approximately 7 to 10 minutes.",
    ar: "⏱ الوقت المتوقع لتعبئة النموذج: من 7 إلى 10 دقائق تقريبًا.",
    tr: "⏱ Formu doldurma süresi: Yaklaşık 7–10 dakika.",
  },
  buttonLabel: {
    en: "To register, click here",
    ar: "للتسجيل ، اضغط هنا",
    tr: "Kayıt olmak için buraya tıklayın.",
  },
  buttonHref: "#",
};

await client.createOrReplace(servicePageCta);
console.log("Service page CTA seeded successfully.");
