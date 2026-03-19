/**
 * Blog Queries
 *
 * These queries handle blog-related content:
 * - Blog section preview for homepage
 * - Blog post listings
 * - Individual blog post details
 *
 * All queries use the `$lang` parameter for multi-language support (en/tr/ar).
 *
 * @see /components/sections/Blog.tsx - Homepage blog preview
 * @see /app/[locale]/blog - Blog listing page
 * @see /app/[locale]/blog/[slug] - Individual blog post
 */

/**
 * Blog Section Query
 * Fetches the blog preview section for the homepage including:
 * - Section header (label, title, subtitle)
 * - UI labels (read more, author, comments)
 * - Featured blog posts (linked via reference)
 *
 * This query uses Sanity references (->) to link to actual blogPost documents.
 */
export const blogSectionQuery = `
  *[_type == "blogSection"][0]{
    "label": label[$lang],
    "title": title[$lang],
    "subtitle": subtitle[$lang],
    "readMore": readMore[$lang],
    "author": author[$lang],
    "comment": comment[$lang],
    "posts": posts[]->{
      "title": title[$lang],
      "excerpt": excerpt[$lang],
      "date": date,
      "image": image,
      "slug": slug.current
    }
  }
`;

/**
 * Blog Posts Query
 * Fetches all blog posts ordered by date (newest first).
 * Each post includes:
 * - Title and excerpt
 * - Publication date
 * - Featured image
 * - URL slug
 *
 * Used for blog listing pages to show all available posts.
 */
export const blogPostsQuery = `
  *[_type == "blogPost"] | order(date desc){
    "title": title[$lang],
    "excerpt": excerpt[$lang],
    "date": date,
    "image": image,
    "slug": slug.current
  }
`;

/**
 * Blog Post By Slug Query
 * Fetches a single blog post by its URL slug.
 * Includes all fields from the list query plus:
 * - Full rich text body content
 *
 * @param $slug - The blog post slug (e.g., "our-latest-mission")
 *
 * Used for individual blog post pages at /blog/[slug]
 */
export const blogPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0]{
    "title": title[$lang],
    "excerpt": excerpt[$lang],
    "date": date,
    "image": image,
    "slug": slug.current,
    "body": body[$lang]
  }
`;
