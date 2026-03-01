import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import ProjectGallery from "@/components/ProjectGallery";
import DonateCta from "@/components/DonateCta";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const ProjectsPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const tPages = await getTranslations({ locale, namespace: "Pages" });
  const projectsContent = tPages.raw("projectsPage") as {
    items: Array<{ slug: string; title: string; category: string }>;
  };
  const donateFallback = tPages.raw("donate") as {
    cta: {
      title: string;
      description: string;
      buttonLabel: string;
      splashImage?: any;
      photoImage?: any;
    };
  };

  const projectImages: Record<string, string> = {
    "education-for-children":
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000",
    "clean-water-initiative":
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000",
    "food-security-program":
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000",
    "healthcare-support":
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1000",
    "shelter-construction":
      "https://images.unsplash.com/photo-1509099652299-30938b0aeb63?q=80&w=1000",
    "elderly-care":
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000",
    "youth-empowerment":
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000",
    "community-development":
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000",
    "emergency-relief":
      "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=1000",
  };
  const fallbackImage =
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000";

  const sampleProjects = projectsContent.items.map((item) => ({
    _id: item.slug,
    slug: item.slug,
    title: item.title,
    category: item.category,
    image: projectImages[item.slug] ?? fallbackImage,
  }));

  return (
    <main className="bg-[#FAFAFA]">
      <PageHero title={nav("projects")} homeLabel={nav("home")} />

      <ProjectGallery projects={sampleProjects} />
      <DonateCta content={donateFallback.cta} isRtl={locale === "ar"} />
    </main>
  );
};

export default ProjectsPage;
