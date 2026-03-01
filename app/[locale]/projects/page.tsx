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
  const donateFallback = tPages.raw("donate") as {
    cta: {
      title: string;
      description: string;
      buttonLabel: string;
      splashImage?: any;
      photoImage?: any;
    };
  };

  // Sample projects data - replace with actual Sanity data later
  const sampleProjects = [
    {
      _id: "1",
      slug: "education-for-children",
      title: "Education For All Children",
      category: "Education",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000",
    },
    {
      _id: "2",
      slug: "clean-water-initiative",
      title: "Clean Water Initiative",
      category: "Water",
      image:
        "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000",
    },
    {
      _id: "3",
      slug: "food-security-program",
      title: "Food Security Program",
      category: "Food",
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000",
    },
    {
      _id: "4",
      slug: "healthcare-support",
      title: "Healthcare Support",
      category: "Health",
      image:
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1000",
    },
    {
      _id: "5",
      slug: "shelter-construction",
      title: "Shelter Construction",
      category: "Housing",
      image:
        "https://images.unsplash.com/photo-1509099652299-30938b0aeb63?q=80&w=1000",
    },
    {
      _id: "6",
      slug: "elderly-care",
      title: "Caring for the Elderly",
      category: "Elder Care",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000",
    },
    {
      _id: "7",
      slug: "youth-empowerment",
      title: "Youth Empowerment",
      category: "Youth",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000",
    },
    {
      _id: "8",
      slug: "community-development",
      title: "Community Development",
      category: "Community",
      image:
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000",
    },
    {
      _id: "9",
      slug: "emergency-relief",
      title: "Emergency Relief",
      category: "Emergency",
      image:
        "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=1000",
    },
  ];

  return (
    <main className="bg-[#FAFAFA]">
      <PageHero title={nav("projects")} homeLabel={nav("home")} />

      <ProjectGallery projects={sampleProjects} />
      <DonateCta content={donateFallback.cta} />
    </main>
  );
};

export default ProjectsPage;
