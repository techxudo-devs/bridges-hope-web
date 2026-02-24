import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/navigation";
import {
  ArrowRight,
  MapPin,
  Activity,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

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
    <main className="bg-[#FAFAFA]">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-secondary text-white rounded-b-[3rem] shadow-2xl pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,75,28,0.15),_transparent_60%)]" />
        <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 left-0 h-[400px] w-[400px] rounded-full bg-white/10 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl pt-42 pb-24 relative z-10">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white backdrop-blur-md shadow-sm">
                <Sparkles className="h-3 w-3 text-primary" />
                {t("projects.hero.kicker")}
              </span>

              <h1 className="mt-8 text-5xl font-black tracking-tighter text-white md:text-6xl lg:text-7xl leading-[1.05]">
                {t.rich("projects.hero.title", {
                  highlight: (chunks) => (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                      {chunks}
                    </span>
                  ),
                })}
              </h1>

              <p className="mt-6 text-lg font-medium leading-relaxed text-white/70 max-w-xl">
                {t("projects.hero.description")}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/donate"
                  className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-primary hover:scale-105 active:scale-95 shadow-lg shadow-primary/30"
                >
                  {t("projects.hero.primaryCta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={{ pathname: "/", hash: "contact" }}
                  className="flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:border-white hover:bg-white hover:text-secondary active:scale-95"
                >
                  {t("projects.hero.secondaryCta")}
                </Link>
              </div>
            </div>

            <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2 lg:shrink-0">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:bg-white/10 hover:-translate-y-1 shadow-2xl"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 bg-primary/10 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110" />
                  <div className="text-4xl font-black text-white tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-px w-6 bg-primary" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- ACTIVE PROJECTS --- */}
      <section className="py-16 md:py-22">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                  {t("projects.active.kicker")}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">
                {t("projects.active.title")}
              </h2>
              <p className="mt-6 text-lg font-medium leading-relaxed text-slate-500 max-w-xl">
                {t("projects.active.description")}
              </p>
            </div>
            <Link
              href="/donate"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-primary/20 bg-primary/5 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary hover:text-white hover:border-primary active:scale-95"
            >
              {t("projects.hero.primaryCta")}
              <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {activeProjects.map((project) => (
              <div
                key={project.title}
                className="group flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      {project.status}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      <MapPin size={12} className="text-primary/50" />
                      {project.location}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-secondary tracking-tight mb-4">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-500 mb-8">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5">
                      {t("projects.labels.impact")}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-secondary">
                      <Activity size={14} className="text-primary" />
                      {project.impact}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5">
                      {t("projects.labels.duration")}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-secondary">
                      <Clock size={14} className="text-primary" />
                      {project.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMPLETED PROJECTS --- */}
      <div id="completed-projects" className="relative -top-24" />
      <section className="bg-[#fdf2f0] py-16 md:py-22 rounded-[3rem] mx-2 md:mx-6 mb-10 overflow-hidden relative border border-white/50">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom,_rgba(249,75,28,0.05),_transparent_60%)] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="max-w-3xl mb-16 text-center mx-auto flex flex-col items-center">
            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">
              {t("projects.completed.kicker")}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">
              {t("projects.completed.title")}
            </h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-slate-500 max-w-xl mx-auto">
              {t("projects.completed.description")}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {completedProjects.map((project) => (
              <div
                key={project.title}
                className="group flex flex-col justify-between rounded-[2.5rem] border border-white bg-white/60 p-8 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:bg-white"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                      <CheckCircle2 size={12} className="mr-1.5" />
                      {project.status}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      <MapPin size={12} className="text-secondary/30" />
                      {project.location}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-secondary tracking-tight mb-4">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-500 mb-8">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-secondary/10 grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5">
                      {t("projects.labels.impact")}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-secondary">
                      <Activity size={14} className="text-secondary/60" />
                      {project.impact}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5">
                      {t("projects.labels.duration")}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-secondary">
                      <Clock size={14} className="text-secondary/60" />
                      {project.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="group relative overflow-hidden rounded-[3rem] bg-secondary px-8 py-16 text-white lg:px-16 lg:py-20 shadow-2xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-colors duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  {t("projects.cta.title")}
                </h3>
                <p className="mt-6 text-lg font-medium text-white/70 max-w-lg leading-relaxed">
                  {t("projects.cta.description")}
                </p>
              </div>
              <Link
                href="/donate"
                className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-primary hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
              >
                {t("projects.cta.button")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
