import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Facebook, Instagram, Twitter } from "lucide-react";

import PageHero from "@/components/shared/PageHero";
import { getProjectBySlug } from "@/sanity/lib/getProjectBySlug";
import { getProjectDetail } from "@/sanity/lib/getProjectDetail";
import { urlFor } from "@/sanity/lib/image";
import RichText from "@/components/ui/RichText";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const getImageUrl = (image: any, fallback: string, width = 1400) => {
  if (!image) return fallback;
  if (typeof image === "string") return image;
  return urlFor(image).width(width).quality(90).url();
};

const ProjectDetailPage = async ({ params }: PageProps) => {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const nav = await getTranslations({ locale, namespace: "Navbar" });
  const tPages = await getTranslations({ locale, namespace: "Pages" });

  const projectData = await getProjectBySlug(locale, slug);
  const projectDetailData = await getProjectDetail(locale);

  if (!projectData) {
    notFound();
  }

  const projectDetail = tPages.raw("projectDetail") as {
    detailsBadge: string;
    labels: { name: string; date: string; author: string; tags: string };
    content: {
      name: string;
      date: string;
      author: string;
      tags: string[];
      title: string;
      description: string[];
      checklist: string[];
      business: { title: string; description: string };
    };
  };

  const detail = {
    detailsBadge:
      projectDetailData?.detailsBadge ?? projectDetail.detailsBadge,
    labels: {
      name: projectDetailData?.labels?.name ?? projectDetail.labels.name,
      date: projectDetailData?.labels?.date ?? projectDetail.labels.date,
      author: projectDetailData?.labels?.author ?? projectDetail.labels.author,
      tags: projectDetailData?.labels?.tags ?? projectDetail.labels.tags,
    },
    content: {
      name: projectData.title ?? projectDetailData?.content?.name,
      date:
        projectData.date ??
        projectDetailData?.content?.date ??
        projectDetail.content.date,
      author:
        projectData.author ??
        projectDetailData?.content?.author ??
        projectDetail.content.author,
      tags: projectData.tags?.length
        ? projectData.tags
        : projectDetailData?.content?.tags?.length
          ? projectDetailData.content.tags
          : projectDetail.content.tags,
      title:
        projectData.title ??
        projectDetailData?.content?.title ??
        projectDetail.content.title,
      description: projectData.body?.length
        ? projectData.body
        : projectDetailData?.content?.description?.length
          ? projectDetailData.content.description
          : projectDetail.content.description,
      checklist: projectData.checklist?.length
        ? projectData.checklist
        : projectDetailData?.content?.checklist?.length
          ? projectDetailData.content.checklist
          : projectDetail.content.checklist,
      business: {
        title:
          projectData.business?.title ??
          projectDetailData?.content?.business?.title ??
          projectDetail.content.business.title,
        description:
          projectData.business?.description ??
          projectDetailData?.content?.business?.description ??
          projectDetail.content.business.description,
      },
    },
    sideImages: projectData.gallery ?? projectDetailData?.sideImages ?? [],
  };

  const fallbackHero =
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200";
  const heroImage = getImageUrl(projectData.image, fallbackHero);

  const sideImagesFallback = [
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600",
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600",
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600",
  ];

  const sidebarImages = detail.sideImages.length
    ? detail.sideImages.map((image: any, index: number) =>
        getImageUrl(image, sideImagesFallback[index % sideImagesFallback.length], 800),
      )
    : sideImagesFallback;

  const project = {
    ...detail.content,
    title: projectData.title ?? detail.content.title,
    heroImage,
    sideImages: sidebarImages,
  };

  return (
    <main className="bg-[#FAFAFA] min-h-screen">
      <PageHero title={nav("projects")} homeLabel={nav("home")} />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-6 py-2 rounded-full bg-primary text-white text-sm font-bold">
                    {detail.detailsBadge}
                  </span>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors">
                      <Instagram className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors">
                      <Facebook className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-bold text-slate-900">
                      {detail.labels.name}:
                    </span>{" "}
                    <span className="text-slate-600">{project.name}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">
                      {detail.labels.date}:
                    </span>{" "}
                    <span className="text-slate-600">{project.date}</span>
                  </div>
                  <div className="md:col-span-1" />
                  <div>
                    <span className="font-bold text-slate-900">
                      {detail.labels.author}:
                    </span>{" "}
                    <span className="text-slate-600">{project.author}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">
                      {detail.labels.tags}:
                    </span>{" "}
                    <span className="text-slate-600">{project.tags.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10 mb-8">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                {project.title}
              </h1>

              {projectData.richBody?.length ? (
                <RichText blocks={projectData.richBody} />
              ) : (
                <div className="prose prose-lg max-w-none">
                  {project.description.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-slate-600 leading-relaxed mb-6 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-8 space-y-3">
                {project.checklist.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-slate-900 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                {project.business.title}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {project.business.description}
              </p>
            </div>

            {projectData.youtubeUrl ? (
              <div className="overflow-hidden rounded-3xl aspect-video">
                <iframe
                  src={projectData.youtubeUrl.replace("watch?v=", "embed/")}
                  title="Project Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : null}
          </div>

          <div className="lg:w-1/3 space-y-6">
            {project.sideImages.map((image, index) => (
              <div
                key={index}
                className="relative h-64 rounded-3xl overflow-hidden group"
              >
                <img
                  src={image}
                  alt={`Project image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetailPage;
