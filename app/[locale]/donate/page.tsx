import { getTranslations, setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const DonatePage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const impactItems = t.raw("donate.impact.items") as Array<{
    title: string;
    description: string;
  }>;
  const optionItems = t.raw("donate.options.items") as Array<{
    title: string;
    description: string;
    detail: string;
  }>;
  const amountItems = t.raw("donate.form.amounts") as string[];
  const promiseItems = t.raw("donate.promise.items") as string[];

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-secondary pt-30 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,75,28,0.25),_transparent_55%)]" />
        <div className="absolute -top-24 right-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="container mx-auto px-4 max-w-6xl py-24 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
            {t("donate.badge")}
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            {t("donate.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            {t("donate.description")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#donation-options"
              className="rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-primary"
            >
              {t("donate.primaryCta")}
            </a>
            <a
              href={`/${locale}/contact`}
              className="rounded-full border border-white/30 px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white hover:bg-white hover:text-secondary"
            >
              {t("donate.secondaryCta")}
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {t("donate.impact.kicker")}
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-secondary">
              {t("donate.impact.title")}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {t("donate.impact.description")}
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {impactItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[2.5rem] border border-slate-100 bg-[#F8FAFC] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
              >
                <h3 className="text-xl font-black text-secondary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="donation-options" className="bg-[#FAFAFB] py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {t("donate.options.kicker")}
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-secondary">
              {t("donate.options.title")}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {t("donate.options.description")}
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {optionItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
              >
                <h3 className="text-xl font-black text-secondary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[2.5rem] border border-slate-100 bg-white p-8 md:p-10 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                  {t("donate.form.kicker")}
                </p>
                <h3 className="mt-3 text-2xl md:text-3xl font-black text-secondary">
                  {t("donate.form.title")}
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  {t("donate.form.description")}
                </p>
              </div>
              <button className="rounded-full border border-slate-200 px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-600">
                {t("donate.form.mockLabel")}
              </button>
            </div>

            <form className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div className="grid gap-4">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {t("donate.form.amountLabel")}
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
                    {t("donate.form.customLabel")}
                  </label>
                  <div className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                    <span className="text-sm font-semibold text-slate-500">$</span>
                    <input
                      type="number"
                      placeholder="100"
                      className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-secondary p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                  {t("donate.form.summaryLabel")}
                </p>
                <div className="mt-4 space-y-4 text-sm text-white/80">
                  <div className="flex items-center justify-between">
                    <span>{t("donate.form.summary.amount")}</span>
                    <span className="font-bold text-white">$100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t("donate.form.summary.frequency")}</span>
                    <span className="font-bold text-white">{t("donate.form.summary.once")}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-white hover:text-primary"
                >
                  {t("donate.form.submit")}
                </button>
                <p className="mt-4 text-xs text-white/60">
                  {t("donate.form.note")}
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
                {t("donate.promise.kicker")}
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl font-black">
                {t("donate.promise.title")}
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-white/80">
                {t("donate.promise.description")}
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
