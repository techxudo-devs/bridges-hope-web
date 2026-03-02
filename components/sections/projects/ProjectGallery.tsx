"use client";

import { Link } from "@/navigation";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

type ProjectGalleryItem = {
  _id: string;
  slug: string;
  title: string;
  image: any;
  category?: string;
};

type ProjectGalleryProps = {
  projects: ProjectGalleryItem[];
};

const ProjectGallery = ({ projects }: ProjectGalleryProps) => {
  const getImageUrl = (image: any) => {
    if (!image) return "/placeholder.jpg";
    if (typeof image === "string") return image;
    return urlFor(image).width(800).quality(90).url();
  };

  // Create a grid pattern - varying sizes for visual interest
  const gridPatterns = [
    "col-span-2 row-span-2", // Large
    "col-span-1 row-span-1", // Small
    "col-span-1 row-span-2", // Small
    "col-span-1 row-span-1", // Tall
    "col-span-2 row-span-1", // Wide
    "col-span-1 row-span-1", // Small
    "col-span-1 row-span-2", // Small
    "col-span-2 row-span-1", // Wide
    "col-span-1 row-span-1", // Tall
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[280px]">
        {projects.map((project, index) => {
          const pattern = gridPatterns[index % gridPatterns.length];

          return (
            <Link
              key={project._id}
              href={`/projects/${project.slug}`}
              className={`group relative overflow-hidden rounded-3xl ${pattern}`}
            >
              {/* Image */}
              <img
                src={getImageUrl(project.image)}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient Overlay (always visible) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Hover Color Overlay */}
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content - visible on hover */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.category && (
                  <span className="inline-block w-fit px-4 py-2 mb-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold">
                    {project.category}
                  </span>
                )}
                <h3 className="text-white text-xl md:text-2xl font-black mb-4">
                  {project.title}
                </h3>
              </div>

              {/* Arrow Button */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectGallery;
