import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPrivacyPolicy } from "@/sanity/lib/getPrivacyPolicy";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type PolicySubsection = {
  title: string;
  items: string[];
};

type PolicySection = {
  title: string;
  description?: string;
  items?: string[];
  note?: string;
  subsections?: PolicySubsection[];
};

type ContactItem = {
  label: string;
  value: string;
};

type PrivacyPolicyContent = {
  title: string;
  organization: string;
  intro: string;
  introNote?: string;
  sections: PolicySection[];
  contact: {
    title: string;
    description?: string;
    items: ContactItem[];
  };
  updatedLabel: string;
  updatedValue: string;
};

const PrivacyPolicyPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const fallback = t.raw("privacy") as PrivacyPolicyContent;
  const privacyData = await getPrivacyPolicy(locale).catch(() => null);
  const content = privacyData
    ? {
        ...fallback,
        ...privacyData,
        sections: privacyData.sections ?? fallback.sections,
        contact: {
          ...fallback.contact,
          ...privacyData.contact,
          items: privacyData.contact?.items ?? fallback.contact.items,
        },
      }
    : fallback;

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-secondary text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,75,28,0.2),_transparent_60%)]" />
        <div className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-32 left-0 h-[360px] w-[360px] rounded-full bg-white/10 blur-[100px]" />

        <div className=" mx-auto container px-6 pb-20 pt-54 relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">
              {content.organization}
            </span>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
              {content.title}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              {content.intro}
            </p>
            {content.introNote ? (
              <p className="text-base text-white/70 leading-relaxed">
                {content.introNote}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {content.sections.map((section, index) => (
            <article
              key={`${section.title}-${index}`}
              className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {section.title}
              </h2>
              {section.description ? (
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {section.description}
                </p>
              ) : null}

              {section.subsections ? (
                <div className="mt-6 space-y-6">
                  {section.subsections.map((subsection, subsectionIndex) => (
                    <div key={`${subsection.title}-${subsectionIndex}`}>
                      <h3 className="text-sm font-semibold text-secondary">
                        {subsection.title}
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {subsection.items.map((item, itemIndex) => (
                          <li
                            key={`${item}-${itemIndex}`}
                            className="flex items-start gap-3"
                          >
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}

              {section.items ? (
                <ul className="mt-5 space-y-2 text-sm text-slate-600">
                  {section.items.map((item, itemIndex) => (
                    <li
                      key={`${item}-${itemIndex}`}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.note ? (
                <p className="mt-6 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {section.note}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl border border-slate-100 bg-white p-10 shadow-md">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">
                {content.contact.title}
              </h2>
              {content.contact.description ? (
                <p className="text-sm leading-relaxed text-slate-600">
                  {content.contact.description}
                </p>
              ) : null}
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {content.updatedLabel}: {content.updatedValue}
              </div>
            </div>
            <div className="space-y-4">
              {content.contact.items.map((item, itemIndex) => (
                <div
                  key={`${item.label}-${itemIndex}`}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
