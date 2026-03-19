/**
 * Sanity Queries - Central Export
 *
 * This file organizes all GROQ queries by category for better maintainability.
 * All queries use the `$lang` parameter to fetch localized content (en/tr/ar).
 *
 * ## How Localization Works
 *
 * Every query in this project uses `[$lang]` syntax to access localized fields.
 * For example:
 *   - `title[$lang]` becomes `title.en`, `title.tr`, or `title.ar`
 *   - The `$lang` parameter is passed when executing the query
 *
 * ## Query Categories
 *
 * - **Homepage**: Hero, About, Mission/Vision, Contact, Footer, etc.
 * - **Donations**: Donate page, campaigns, donation posts
 * - **Projects**: Projects page, individual projects
 * - **Blog**: Blog posts and blog section
 * - **Volunteer**: Volunteer opportunities and CTAs
 * - **Gallery**: Gallery pages and sliders
 * - **Legal**: Privacy policy and other legal documents
 *
 * ## Usage Example
 *
 * ```typescript
 * import { client } from '@/sanity/lib/client';
 * import { heroQuery } from '@/sanity/lib/queries';
 *
 * const data = await client.fetch(heroQuery, { lang: 'en' });
 * ```
 *
 * @see /sanity/lib/client.ts - Sanity client configuration
 * @see /sanity/schema/ - Sanity schema definitions
 */

// Homepage section queries
export {
  heroQuery,
  aboutSectionQuery,
  coreValuesQuery,
  missionVisionQuery,
  contactSectionQuery,
  footerSectionQuery,
} from './homepage.queries';

// Donation system queries
export {
  donatePageQuery,
  donateQuickPageQuery,
  donationPostsQuery,
  donationPostBySlugQuery,
  donateDetailQuery,
} from './donation.queries';

// Projects queries
export {
  projectsPageQuery,
  projectDetailQuery,
  allProjectsQuery,
  projectBySlugQuery,
} from './projects.queries';

// Blog queries
export {
  blogSectionQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
} from './blog.queries';

// Volunteer queries
export {
  volunteerCtaSectionQuery,
  volunteerPageQuery,
  servicePageCtaQuery,
} from './volunteer.queries';

// Gallery queries
export {
  galleryPageQuery,
  gallerySliderSectionQuery,
} from './gallery.queries';

// Legal/policy queries
export {
  privacyPolicyQuery,
} from './legal.queries';
