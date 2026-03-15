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

const volunteerPage = {
  _id: "volunteerPage",
  _type: "volunteerPage",
  heroTitle: {
    en: "Volunteer",
    tr: "Gönüllü",
    ar: "التطوع",
  },
  introTitle: {
    en: "Join Us as a Volunteer",
    tr: "Gönüllü Olarak Bize Katılın",
    ar: "انضم إلينا كمتطوع",
  },
  introDescription: {
    en: "Becoming a volunteer with Bridges of Hope means joining a dedicated team committed to making a real difference in the lives of vulnerable communities. Our volunteers are an essential part of our mission, helping us deliver humanitarian support, educational programs, rehabilitation services, and community-based initiatives with compassion and professionalism.",
    tr: "Umut Köprüleri (Bridges of Hope) ile gönüllü olmak, dezavantajlı toplulukların hayatlarında gerçek bir fark yaratmaya kendini adamış bir ekibin parçası olmak demektir. Gönüllülerimiz, insani yardım faaliyetleri, eğitim programları, rehabilitasyon hizmetleri ve toplumsal girişimleri şefkat ve profesyonellikle yürütmemizde önemli bir rol oynamaktadır.",
    ar: "أن تصبح متطوعًا مع جسور الأمل (Bridges of Hope) يعني الانضمام إلى فريق ملتزم يسعى لإحداث فرق حقيقي في حياة المجتمعات الأكثر احتياجًا. يُعد المتطوعون جزءًا أساسيًا من رسالتنا، حيث يساهمون في تقديم الدعم الإنساني والبرامج التعليمية وخدمات التأهيل والمبادرات المجتمعية بروح من العطاء والمهنية.",
  },
  whyVolunteerTitle: {
    en: "Why Volunteer with Us?",
    tr: "Neden Bizimle Gönüllü Olmalısınız?",
    ar: "لماذا تتطوع معنا؟",
  },
  whyVolunteerItems: [
    {
      _type: "localizedString",
      en: "Be part of a humanitarian mission that serves people with dignity",
      tr: "İnsanlara onur ve saygı temelinde hizmet eden insani bir misyonun parçası olun",
      ar: "كن جزءًا من رسالة إنسانية تخدم الناس بكرامة واحترام",
    },
    {
      _type: "localizedString",
      en: "Support impactful programs in education, health, rehabilitation, and relief",
      tr: "Eğitim, sağlık, rehabilitasyon ve insani yardım alanlarında etkili programlara destek verin",
      ar: "ساهم في دعم برامج مؤثرة في التعليم والصحة والتأهيل والإغاثة",
    },
    {
      _type: "localizedString",
      en: "Gain valuable experience in teamwork, community service, and field engagement",
      tr: "Takım çalışması, toplum hizmeti ve saha deneyimi konusunda değerli tecrübeler kazanın",
      ar: "اكتسب خبرات قيّمة في العمل الجماعي وخدمة المجتمع والعمل الميداني",
    },
    {
      _type: "localizedString",
      en: "Use your skills to help create positive and lasting change",
      tr: "Becerilerinizi kullanarak olumlu ve kalıcı değişime katkı sağlayın",
      ar: "استخدم مهاراتك للمساهمة في إحداث تغيير إيجابي ومستدام",
    },
    {
      _type: "localizedString",
      en: "Join a network of passionate individuals working toward a shared purpose",
      tr: "Ortak bir amaç doğrultusunda çalışan tutkulu bireylerden oluşan bir ağın parçası olun",
      ar: "انضم إلى شبكة من الأفراد الشغوفين الذين يعملون لتحقيق هدف مشترك",
    },
  ],
  whoCanVolunteerTitle: {
    en: "Who Can Volunteer?",
    tr: "Kimler Gönüllü Olabilir?",
    ar: "من يمكنه التطوع؟",
  },
  whoCanVolunteerDescription: {
    en: "We welcome individuals who are motivated, responsible, and eager to serve. Volunteering opportunities may be available in different areas, such as:",
    tr: "Topluma hizmet etmeye istekli, sorumluluk sahibi ve motive bireyleri gönüllü olarak aramızda görmekten memnuniyet duyarız. Gönüllülük fırsatları aşağıdaki alanlarda olabilir:",
    ar: "نرحب بجميع الأفراد المتحمسين والمسؤولين والراغبين في خدمة المجتمع. وقد تتوفر فرص التطوع في مجالات مختلفة مثل:",
  },
  volunteerAreas: [
    {
      _type: "localizedString",
      en: "Community outreach",
      tr: "Toplumsal saha çalışmaları",
      ar: "العمل المجتمعي والتواصل الميداني",
    },
    {
      _type: "localizedString",
      en: "Education support",
      tr: "Eğitim destek faaliyetleri",
      ar: "دعم البرامج التعليمية",
    },
    {
      _type: "localizedString",
      en: "Media and communication",
      tr: "Medya ve iletişim",
      ar: "الإعلام والتواصل",
    },
    {
      _type: "localizedString",
      en: "Administrative assistance",
      tr: "İdari destek",
      ar: "المساعدة الإدارية",
    },
    {
      _type: "localizedString",
      en: "Event and campaign support",
      tr: "Etkinlik ve kampanya organizasyonu",
      ar: "دعم الفعاليات والحملات الإنسانية",
    },
    {
      _type: "localizedString",
      en: "Translation and content creation",
      tr: "Çeviri ve içerik üretimi",
      ar: "الترجمة وكتابة المحتوى",
    },
    {
      _type: "localizedString",
      en: "Specialized professional services",
      tr: "Uzmanlık gerektiren profesyonel hizmetler",
      ar: "الخدمات المهنية المتخصصة",
    },
  ],
  joinTeamTitle: {
    en: "Become Part of the Team",
    tr: "Ekibimizin Bir Parçası Olun",
    ar: "كن جزءًا من الفريق",
  },
  joinTeamDescription: {
    en: "If you are passionate about humanitarian work and would like to contribute to our mission, we would be happy to hear from you. Click the link below to fill out the volunteer registration form and join our team.",
    tr: "İnsani çalışmalara ilgi duyuyor ve misyonumuza katkıda bulunmak istiyorsanız, sizi aramızda görmekten mutluluk duyarız. Gönüllü başvuru formunu doldurmak ve ekibimize katılmak için aşağıdaki bağlantıya tıklayın.",
    ar: "إذا كنت شغوفًا بالعمل الإنساني وترغب في المساهمة في تحقيق رسالتنا، يسعدنا انضمامك إلى فريقنا. اضغط على الرابط أدناه لتعبئة نموذج التطوع والانضمام إلى فريقنا.",
  },
  applyCtaLabel: {
    en: "Apply as a Volunteer",
    tr: "Gönüllü Olarak Başvur",
    ar: "التقديم كمتطوع",
  },
  applyCtaHref: "#",
  highlightLabel: {
    en: "Volunteer Impact",
    tr: "Gönüllü Etkisi",
    ar: "أثر التطوع",
  },
  highlightTitle: {
    en: "Every Effort Matters",
    tr: "Her Katkı Değerlidir",
    ar: "كل جهد له قيمة",
  },
  highlightDescription: {
    en: "At Bridges of Hope, we believe that every effort matters. Whether you contribute your time, skills, ideas, or experience, your role as a volunteer can create meaningful impact and bring hope to those who need it most.",
    tr: "Umut Köprüleri olarak, her katkının değerli olduğuna inanıyoruz. Zamanınızı, becerilerinizi, fikirlerinizi ya da deneyiminizi paylaşmanız fark etmez; gönüllü olarak sunduğunuz katkı gerçek bir etki yaratabilir ve en çok ihtiyaç duyan insanlara umut verebilir.",
    ar: "في جسور الأمل نؤمن بأن كل جهد له قيمة. سواء ساهمت بوقتك أو مهاراتك أو أفكارك أو خبراتك، فإن دورك كمتطوع يمكن أن يحدث أثرًا حقيقيًا ويمنح الأمل لمن هم في أمسّ الحاجة إليه.",
  },
};

await client.createOrReplace(volunteerPage);
console.log("Volunteer page seeded successfully.");
