import { getTranslations, setRequestLocale } from "next-intl/server";
import { getDonatePage } from "@/sanity/lib/getDonatePage";
import {
  HandHeart,
  GraduationCap,
  ShieldAlert,
  Gift,
  CalendarHeart,
  Landmark,
  Sparkles,
  Wallet,
} from "lucide-react";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const DonatePage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const fallback = t.raw("donate") as {
    badge: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    impact: {
      kicker: string;
      title: string;
      description: string;
      items: Array<{ title: string; description: string }>;
    };
    options: {
      kicker: string;
      title: string;
      description: string;
      items: Array<{ title: string; description: string; detail: string }>;
    };
    form: {
      kicker: string;
      title: string;
      description: string;
      mockLabel: string;
      amountLabel: string;
      amounts: string[];
      customLabel: string;
      summaryLabel: string;
      summary: { amount: string; frequency: string; once: string };
      submit: string;
      note: string;
    };
    promise: {
      kicker: string;
      title: string;
      description: string;
      items: string[];
    };
  };
  const donateData = await getDonatePage(locale).catch(() => null);
  const content = donateData
    ? {
        ...fallback,
        ...donateData,
        impact: {
          ...fallback.impact,
          ...donateData.impact,
          items: donateData.impact?.items ?? fallback.impact.items,
        },
        options: {
          ...fallback.options,
          ...donateData.options,
          items: donateData.options?.items ?? fallback.options.items,
        },
        form: {
          ...fallback.form,
          ...donateData.form,
          amounts: donateData.form?.amounts ?? fallback.form.amounts,
          summary: {
            ...fallback.form.summary,
            ...donateData.form?.summary,
          },
        },
        promise: {
          ...fallback.promise,
          ...donateData.promise,
          items: donateData.promise?.items ?? fallback.promise.items,
        },
      }
    : fallback;
  const impactItems = content.impact.items;
  const optionItems = content.options.items;
  const amountItems = content.form.amounts;
  const promiseItems = content.promise.items;
  const impactIcons = [HandHeart, GraduationCap, ShieldAlert];
  const optionIcons = [Gift, CalendarHeart, Landmark];

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-secondary pt-30 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,75,28,0.25),_transparent_55%)]" />
        <div className="absolute -top-24 right-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="container mx-auto px-4 max-w-6xl py-24 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
            {content.badge}
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            {content.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            {content.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#donation-options"
              className="rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-primary"
            >
              {content.primaryCta}
            </a>
            <a
              href={`/${locale}#contact`}
              className="rounded-full border border-white/30 px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white hover:bg-white hover:text-secondary"
            >
              {content.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {content.impact.kicker}
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-secondary">
              {content.impact.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {content.impact.description}
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {impactItems.map((item, index) => {
              const Icon = impactIcons[index % impactIcons.length];
              return (
                <div
                  key={item.title}
                  className="rounded-[2.5rem] border border-slate-100 bg-[#F8FAFC] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black text-secondary">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="donation-options" className="bg-[#FAFAFB] py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {content.options.kicker}
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-secondary">
              {content.options.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {content.options.description}
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {optionItems.map((item, index) => {
              const Icon = optionIcons[index % optionIcons.length];
              return (
                <div
                  key={item.title}
                  className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black text-secondary">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 rounded-[2.5rem] border border-slate-100 bg-white p-8 md:p-10 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                  {content.form.kicker}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-secondary">
                    {content.form.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  {content.form.description}
                </p>
              </div>
              <button className="rounded-full border border-slate-200 px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-600">
                {content.form.mockLabel}
              </button>
            </div>

            <form className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div className="grid gap-4">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {content.form.amountLabel}
                </label>
                <div className="flex flex-wrap gap-3">
                  {amountItems.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition-all hover:border-primary hover:text-primary"
                    >
                      {amount}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {content.form.customLabel}
                  </label>
                  <div className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                    <span className="text-sm font-semibold text-slate-500">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="100"
                      className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-secondary p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                    {content.form.summaryLabel}
                  </p>
                </div>
                <div className="mt-4 space-y-4 text-sm text-white/80">
                  <div className="flex items-center justify-between">
                    <span>{content.form.summary.amount}</span>
                    <span className="font-bold text-white">$100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{content.form.summary.frequency}</span>
                    <span className="font-bold text-white">
                      {content.form.summary.once}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  disabled
                  className="mt-6 w-full cursor-not-allowed rounded-full bg-primary/60 px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-white"
                >
                  {content.form.mockLabel}
                </button>
                <p className="mt-4 text-xs text-white/60">
                  {content.form.note}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="rounded-[3rem] bg-secondary px-8 py-12 md:px-12 md:py-16 text-white relative overflow-hidden">
            <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                {content.promise.kicker}
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl font-black">
                {content.promise.title}
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-white/80">
                {content.promise.description}
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {promiseItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DonatePage;
