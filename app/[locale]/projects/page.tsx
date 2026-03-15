import { getTranslations, setRequestLocale } from "next-intl/server";

import ProjectsGallerySection from "@/components/sections/projects/ProjectsGallerySection";
import PageHero from "@/components/shared/PageHero";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const ProjectsPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "Navbar" });

  return (
    <main className="bg-[#FAFAFA]">
      <PageHero title={nav("projects")} homeLabel={nav("home")} />
      <ProjectsGallerySection locale={locale} />
    </main>
  );
};

export default ProjectsPage;
