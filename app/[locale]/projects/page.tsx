import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type ProjectItem = {
  title: string;
  description: string;
  location: string;
  duration: string;
  impact: string;
  status: string;
};

type StatItem = {
  label: string;
  value: string;
};

const ProjectsPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });

  const heroStats = t.raw("projects.hero.stats") as StatItem[];
  const activeProjects = t.raw("projects.active.items") as ProjectItem[];
  const completedProjects = t.raw("projects.completed.items") as ProjectItem[];

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-secondary text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,75,28,0.25),_transparent_55%)]" />
        <div className="absolute -top-24 right-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="container mx-auto px-4 max-w-6xl py-20 lg:py-28 relative z-10">
          <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-white/70">
                {t("projects.hero.kicker")}
              </span>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
                {t.rich("projects.hero.title", {
                  highlight: (chunks) => (
                    <span className="text-primary">{chunks}</span>
                  ),
                })}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
                {t("projects.hero.description")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/donate"
                  className="rounded-full bg-primary px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
                >
                  {t("projects.hero.primaryCta")}
                </Link>
                <Link
                  href={{ pathname: "/", hash: "contact" }}
                  className="rounded-full border border-white/30 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:border-primary hover:text-primary"
                >
                  {t("projects.hero.secondaryCta")}
                </Link>
              </div>
            </div>

            <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <div className="text-3xl font-black text-white">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
              {t("projects.active.kicker")}
            </span>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-black text-secondary md:text-4xl">
                  {t("projects.active.title")}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base">
                  {t("projects.active.description")}
                </p>
              </div>
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-full border border-primary/30 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-white"
              >
                {t("projects.hero.primaryCta")}
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {activeProjects.map((project) => (
              <div
                key={project.title}
                className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-primary">
                    {project.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {project.location}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black text-secondary">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {project.description}
                </p>
                <div className="mt-6 space-y-3 text-xs font-semibold text-slate-500">
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.3em] text-primary/70">
                      {t("projects.labels.impact")}
                    </span>
                    <span className="text-slate-600">{project.impact}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.3em] text-primary/70">
                      {t("projects.labels.duration")}
                    </span>
                    <span className="text-slate-600">{project.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="completed-projects" className="relative -top-24" />
      <section className="bg-[#fdf2f0] py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
              {t("projects.completed.kicker")}
            </span>
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black text-secondary md:text-4xl">
                {t("projects.completed.title")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base">
                {t("projects.completed.description")}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {completedProjects.map((project) => (
              <div
                key={project.title}
                className="rounded-3xl border border-white bg-white/70 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-secondary">
                    {project.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {project.location}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black text-secondary">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {project.description}
                </p>
                <div className="mt-6 space-y-3 text-xs font-semibold text-slate-500">
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.3em] text-primary/70">
                      {t("projects.labels.impact")}
                    </span>
                    <span className="text-slate-600">{project.impact}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.3em] text-primary/70">
                      {t("projects.labels.duration")}
                    </span>
                    <span className="text-slate-600">{project.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="rounded-[3rem] bg-secondary px-8 py-12 text-white lg:px-12 lg:py-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-black md:text-3xl">
                  {t("projects.cta.title")}
                </h3>
                <p className="mt-4 text-sm text-white/70 md:text-base">
                  {t("projects.cta.description")}
                </p>
              </div>
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
              >
                {t("projects.cta.button")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
