"use client";

import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import DonateCta from "@/components/sections/donate/DonateCta";
import ProjectGallery from "@/components/sections/projects/ProjectGallery";
import { fetchProjects, fetchProjectsPage } from "@/lib/api/projects";

type ProjectsGallerySectionProps = {
  locale: string;
};

const ProjectsGallerySection = ({ locale }: ProjectsGallerySectionProps) => {
  const tPages = useTranslations("Pages");

  const { data: projects } = useQuery({
    queryKey: ["projects", locale],
    queryFn: () => fetchProjects(locale),
    refetchInterval: 8000,
    refetchIntervalInBackground: true,
    retry: 1,
  });

  const { data: projectsPageData } = useQuery({
    queryKey: ["projectsPage", locale],
    queryFn: () => fetchProjectsPage(locale),
    refetchInterval: 8000,
    refetchIntervalInBackground: true,
    retry: 1,
  });

  const donateFallback = tPages.raw("donate") as {
    cta: {
      title: string;
      description: string;
      buttonLabel: string;
      splashImage?: any;
      photoImage?: any;
    };
  };

  const fallbackImage =
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000";

  const galleryItems = projects?.length ? projects : [];

  const projectCards = galleryItems.map((item: any) => ({
    _id: item._id ?? item.slug,
    slug: item.slug,
    title: item.title,
    category: item.category,
    image: item.image ?? fallbackImage,
  }));

  const cta = {
    title: projectsPageData?.cta?.title ?? donateFallback.cta.title,
    description:
      projectsPageData?.cta?.description ?? donateFallback.cta.description,
    buttonLabel: projectsPageData?.cta?.button ?? donateFallback.cta.buttonLabel,
    splashImage: donateFallback.cta.splashImage,
    photoImage: donateFallback.cta.photoImage,
  };

  return (
    <>
      <ProjectGallery projects={projectCards} />
      <DonateCta content={cta} isRtl={locale === "ar"} />
    </>
  );
};

export default ProjectsGallerySection;
