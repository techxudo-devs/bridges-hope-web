/**
 * Projects Queries
 *
 * These queries handle all project-related data:
 * - Projects landing page
 * - Individual project details
 * - Project listings (active and completed)
 *
 * All queries use the `$lang` parameter for multi-language support (en/tr/ar).
 *
 * @see /app/[locale]/projects - Projects listing page
 * @see /app/[locale]/projects/[slug] - Individual project detail page
 */

/**
 * Projects Page Query
 * Fetches the complete projects landing page structure including:
 * - Hero section with stats
 * - Gallery items (featured projects)
 * - Active projects section
 * - Completed projects section
 * - UI labels (impact, duration, target)
 * - Call-to-action section
 *
 * This organizes projects into "active" vs "completed" for better UX.
 */
export const projectsPageQuery = `
  *[_type == "projectsPage"][0]{
    "hero": {
      "kicker": hero.kicker[$lang],
      "title": hero.title[$lang],
      "description": hero.description[$lang],
      "primaryCta": hero.primaryCta[$lang],
      "secondaryCta": hero.secondaryCta[$lang],
      "stats": hero.stats[]{
        "label": label[$lang],
        "value": value[$lang]
      }
    },
    "galleryItems": galleryItems[]{
      "slug": slug,
      "category": category[$lang],
      "title": title[$lang],
      "description": description[$lang],
      "image": image
    },
    "active": {
      "kicker": active.kicker[$lang],
      "title": active.title[$lang],
      "description": active.description[$lang],
      "items": active.items[]{
        "slug": slug,
        "category": category[$lang],
        "title": title[$lang],
        "description": description[$lang],
        "location": location[$lang],
        "image": image,
        "duration": duration[$lang],
        "target": target[$lang],
        "impact": impact[$lang],
        "status": status[$lang]
      }
    },
    "completed": {
      "kicker": completed.kicker[$lang],
      "title": completed.title[$lang],
      "description": completed.description[$lang],
      "items": completed.items[]{
        "slug": slug,
        "category": category[$lang],
        "title": title[$lang],
        "description": description[$lang],
        "location": location[$lang],
        "image": image,
        "duration": duration[$lang],
        "target": target[$lang],
        "impact": impact[$lang],
        "status": status[$lang]
      }
    },
    "labels": {
      "impact": labels.impact[$lang],
      "duration": labels.duration[$lang],
      "target": labels.target[$lang]
    },
    "cta": {
      "title": cta.title[$lang],
      "description": cta.description[$lang],
      "button": cta.button[$lang]
    }
  }
`;

/**
 * Project Detail Query
 * Fetches template configuration for individual project detail pages:
 * - Section labels (name, date, author, tags)
 * - Content structure (title, description, checklist)
 * - Business impact section
 * - Side images for gallery
 *
 * Note: This is the TEMPLATE configuration, not actual project data.
 * For actual project data, use `projectBySlugQuery`.
 */
export const projectDetailQuery = `
  *[_type == "projectDetail"][0]{
    "detailsBadge": detailsBadge[$lang],
    "labels": {
      "name": labels.name[$lang],
      "date": labels.date[$lang],
      "author": labels.author[$lang],
      "tags": labels.tags[$lang]
    },
    "content": {
      "name": content.name[$lang],
      "date": content.date[$lang],
      "author": content.author[$lang],
      "tags": content.tags[][$lang],
      "title": content.title[$lang],
      "description": content.description[][$lang],
      "checklist": content.checklist[][$lang],
      "business": {
        "title": content.business.title[$lang],
        "description": content.business.description[$lang]
      }
    },
    "sideImages": sideImages
  }
`;

/**
 * All Projects Query
 * Fetches all project documents ordered by most recently updated.
 * Each project includes complete information:
 * - Basic info (title, category, description, slug)
 * - Metadata (location, date, author, tags)
 * - Content (rich text body, checklist)
 * - Business impact section
 * - Image gallery
 *
 * Used for project listing pages.
 */
export const allProjectsQuery = `
  *[_type == "project"] | order(_updatedAt desc){
    _id,
    "slug": slug.current,
    "title": title[$lang],
    "category": category[$lang],
    "description": description[$lang],
    "image": image,
    "location": location[$lang],
    "date": date[$lang],
    "author": author[$lang],
    "tags": tags[][$lang],
    "body": body[][$lang],
    "richBody": richBody[$lang],
    "youtubeUrl": youtubeUrl,
    "checklist": checklist[][$lang],
    "business": {
      "title": business.title[$lang],
      "description": business.description[$lang]
    },
    "gallery": gallery[]
  }
`;

/**
 * Project By Slug Query
 * Fetches a single project by its URL slug.
 * Returns the same fields as `allProjectsQuery` but for one specific project.
 *
 * @param $slug - The project slug (e.g., "clean-water-initiative")
 *
 * Used for individual project detail pages at /projects/[slug]
 */
export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug] | order(_updatedAt desc)[0]{
    _id,
    "slug": slug.current,
    "title": title[$lang],
    "category": category[$lang],
    "description": description[$lang],
    "image": image,
    "location": location[$lang],
    "date": date[$lang],
    "author": author[$lang],
    "tags": tags[][$lang],
    "body": body[][$lang],
    "richBody": richBody[$lang],
    "youtubeUrl": youtubeUrl,
    "checklist": checklist[][$lang],
    "business": {
      "title": business.title[$lang],
      "description": business.description[$lang]
    },
    "gallery": gallery[]
  }
`;
