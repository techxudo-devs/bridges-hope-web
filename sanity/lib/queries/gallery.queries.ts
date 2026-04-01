/**
 * Gallery Queries
 *
 * These queries handle gallery-related content:
 * - Gallery page settings and items
 * - Gallery slider section for homepage
 *
 * All queries use the `$lang` parameter for multi-language support (en/tr/ar).
 *
 * @see /app/[locale]/gallery - Gallery page
 * @see /components/sections/GallerySliderSection.tsx - Homepage gallery slider
 */

/**
 * Gallery Page Query
 * Fetches both gallery settings and all gallery items.
 * Returns an object with two properties:
 * - settings: Page title and description
 * - items: Array of all gallery items (ordered by most recently updated)
 *
 * Each gallery item includes:
 * - Title and slug
 * - Hero image (featured image)
 * - Additional images array
 *
 * Note: This uses object notation {} instead of array [] to return multiple queries.
 */
export const galleryPageQuery = `
  {
    "settings": *[_type == "galleryPage" && _id == "galleryPageSettings"][0]{
      "title": title[$lang],
      "description": description[$lang],
      "emptyStateMessage": emptyStateMessage[$lang]
    },
    "items": *[_type == "galleryItem"] | order(_updatedAt desc){
      "title": title[$lang],
      "slug": slug.current,
      "heroImage": heroImage,
      "images": images
    }
  }
`;

/**
 * Gallery Slider Section Query
 * Fetches images for the homepage gallery slider/carousel.
 * Each slide includes:
 * - Image asset
 * - Alt text (for accessibility)
 * - Optional link/href
 *
 * Used to display a simple image carousel on the homepage.
 */
export const gallerySliderSectionQuery = `
  *[_type == "gallerySliderSection"][0]{
    "items": items[]{
      "image": image,
      "alt": alt[$lang],
      "href": href
    }
  }
`;
