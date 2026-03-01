import { getTranslations, setRequestLocale } from "next-intl/server";
import { getDonatePage } from "@/sanity/lib/getDonatePage";
import { urlFor } from "@/sanity/lib/image";
import PageHero from "@/components/PageHero";
import {
  HandHeart,
  GraduationCap,
  ShieldAlert,
  Gift,
  CalendarHeart,
  Landmark,
  Wallet,
  BadgeCheck,
  ShieldCheck,
  Users,
  ArrowRight,
} from "lucide-react";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const DonatePage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const nav = await getTranslations({ locale, namespace: "Navbar" });
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
    campaigns: {
      kicker?: string;
      title?: string;
      description?: string;
      donateLabel: string;
      goalLabel: string;
      currency: string;
      items: Array<{
        category: string;
        title: string;
        description: string;
        image?: any;
        raisedAmount: number;
        goalAmount: number;
        accentColor?: string;
      }>;
    };
    cta: {
      title: string;
      description: string;
      buttonLabel: string;
      image?: any;
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
        campaigns: {
          ...fallback.campaigns,
          ...donateData.campaigns,
          items: donateData.campaigns?.items ?? fallback.campaigns.items,
        },
        cta: {
          ...fallback.cta,
          ...donateData.cta,
        },
      }
    : fallback;
  const impactItems = content.impact.items;
  const optionItems = content.options.items;
  const amountItems = content.form.amounts;
  const promiseItems = content.promise.items;
  const campaignItems = content.campaigns.items;
  const impactIcons = [HandHeart, GraduationCap, ShieldAlert];
  const optionIcons = [Gift, CalendarHeart, Landmark];
  const promiseIcons = [BadgeCheck, ShieldCheck, Users];
  const mockLabel = content.form.mockLabel.replace(/soom/gi, "soon");
  const campaignColors = ["#F94B1C", "#F5B100", "#28D08F"];
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: content.campaigns.currency || "USD",
    maximumFractionDigits: 0,
  });
  const renderCtaTitle = (value: string) => {
    const parts = value.split(/(<highlight>|<\/highlight>)/g);
    let isHighlight = false;
    return parts.map((part, index) => {
      if (part === "<highlight>") {
        isHighlight = true;
        return null;
      }
      if (part === "</highlight>") {
        isHighlight = false;
        return null;
      }
      if (!part) return null;
      if (isHighlight) {
        return (
          <span key={`highlight-${index}`} className="text-emerald-500">
            {part}
          </span>
        );
      }
      return <span key={`text-${index}`}>{part}</span>;
    });
  };

  return (
    <main className="bg-white">
      <PageHero title={content.title} homeLabel={nav("home")} />

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

      <section className="py-16 bg-[#F7FAFB]">
        <div className="container mx-auto px-4 max-w-6xl">
          {content.campaigns.title || content.campaigns.description ? (
            <div className="max-w-3xl">
              {content.campaigns.kicker ? (
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                  {content.campaigns.kicker}
                </p>
              ) : null}
              {content.campaigns.title ? (
                <h2 className="mt-4 text-3xl md:text-4xl font-black text-secondary">
                  {content.campaigns.title}
                </h2>
              ) : null}
              {content.campaigns.description ? (
                <p className="mt-4 text-lg text-slate-600">
                  {content.campaigns.description}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {campaignItems.map((item, index) => {
              const accent =
                item.accentColor ?? campaignColors[index % campaignColors.length];
              const percent = item.goalAmount
                ? Math.min(
                    100,
                    Math.round((item.raisedAmount / item.goalAmount) * 100),
                  )
                : 0;
              const badgePosition = Math.min(96, Math.max(4, percent));
              return (
                <article
                  key={`${item.title}-${index}`}
                  className="overflow-hidden rounded-[2.5rem] bg-[#F1F8FA] shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
                >
                  <div className="relative h-56">
                    <img
                      src={
                        item.image
                          ? typeof item.image === "string"
                            ? item.image
                            : urlFor(item.image).width(900).quality(85).url()
                          : "https://images.unsplash.com/photo-1509095087301-02c74a001b06?q=80&w=1200"
                      }
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <span
                      className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full px-5 py-1 text-xs font-bold text-white"
                      style={{ backgroundColor: accent }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div className="px-6 pb-8 pt-10">
                    <h3 className="text-xl font-black text-secondary leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-6">
                      <div className="relative h-2 rounded-full bg-white">
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${percent}%`, backgroundColor: accent }}
                        />
                        <span
                          className="absolute -top-6 rounded-md px-2 py-0.5 text-xs font-bold text-white"
                          style={{
                            left: `${badgePosition}%`,
                            transform: "translateX(-50%)",
                            backgroundColor: accent,
                          }}
                        >
                          {percent}%
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm font-semibold text-secondary">
                        <span>
                          {currencyFormatter.format(item.raisedAmount)}
                          {" "}
                          {content.campaigns.donateLabel}
                        </span>
                        <span>
                          {currencyFormatter.format(item.goalAmount)}
                          {" "}
                          {content.campaigns.goalLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
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
              <button className="animate-pulse rounded-full border border-primary/20 bg-primary/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-primary shadow-[0_0_0_0_rgba(249,75,28,0.35)]">
                {mockLabel}
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
                  {mockLabel}
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
                {promiseItems.map((item, index) => {
                  const Icon = promiseIcons[index % promiseIcons.length];
                  return (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>{item}</span>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mb-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative overflow-hidden rounded-[3rem] bg-[#F1FAFB] px-6 py-16 text-center shadow-[0_30px_80px_rgba(15,23,42,0.12)] sm:px-10">
            <div className="absolute inset-0 bg-[url('/wave.png')] bg-top bg-repeat-x opacity-30" />
            <div className="absolute inset-0 bg-[url('/another-wave.png')] bg-bottom bg-repeat-x opacity-30" />
            <div
              className="absolute inset-0 bg-center bg-no-repeat opacity-10"
              style={{ backgroundImage: "url('/about-one-img-2.jpg')" }}
            />
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-black text-primary leading-snug">
                {renderCtaTitle(content.cta.title)}
              </h2>
              <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
                {content.cta.description}
              </p>
              <Link
                href="/donate"
                className="mt-8 inline-flex items-center gap-4 rounded-full border border-primary/40 bg-white px-6 py-2.5 text-sm font-bold text-secondary transition-all hover:border-primary hover:text-primary"
              >
                {content.cta.buttonLabel}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <div className="mt-10 flex justify-center">
                <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg">
                  <img
                    src={
                      content.cta.image
                        ? typeof content.cta.image === "string"
                          ? content.cta.image
                          : urlFor(content.cta.image).width(240).quality(85).url()
                        : "/picture-1.jpeg"
                    }
                    alt={content.cta.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DonatePage;
