/**
 * Volunteer Queries
 *
 * These queries handle volunteer-related content:
 * - Volunteer page with opportunities
 * - Volunteer call-to-action sections
 * - Beneficiary/service page CTAs
 *
 * All queries use the `$lang` parameter for multi-language support (en/tr/ar).
 *
 * @see /app/[locale]/volunteer - Volunteer opportunities page
 * @see /components/sections/VolunteerCtaSection.tsx - Homepage CTA
 */

/**
 * Volunteer CTA Section Query
 * Fetches volunteer call-to-action cards for homepage.
 * Each item includes:
 * - Title and description
 * - Button label and link
 * - Background image
 * - Overlay color
 *
 * Typically used to promote volunteer opportunities on the homepage.
 */
export const volunteerCtaSectionQuery = `
  *[_type == "volunteerCtaSection"][0]{
    "items": items[]{
      "title": title[$lang],
      "description": description[$lang],
      "buttonLabel": buttonLabel[$lang],
      "href": href,
      "image": image,
      "overlayColor": overlayColor
    }
  }
`;

/**
 * Volunteer Page Query
 * Fetches the complete volunteer opportunities page including:
 * - Hero section
 * - Introduction text
 * - "Why volunteer?" reasons
 * - Eligibility criteria
 * - Volunteer areas/roles
 * - Join team section
 * - Application CTA
 * - Highlight section
 *
 * This provides all content for a comprehensive volunteer recruitment page.
 */
export const volunteerPageQuery = `
  *[_type == "volunteerPage"][0]{
    "heroTitle": heroTitle[$lang],
    "introTitle": introTitle[$lang],
    "introDescription": introDescription[$lang],
    "whyVolunteerTitle": whyVolunteerTitle[$lang],
    "whyVolunteerItems": whyVolunteerItems[][$lang],
    "whoCanVolunteerTitle": whoCanVolunteerTitle[$lang],
    "whoCanVolunteerDescription": whoCanVolunteerDescription[$lang],
    "volunteerAreas": volunteerAreas[][$lang],
    "joinTeamTitle": joinTeamTitle[$lang],
    "joinTeamDescription": joinTeamDescription[$lang],
    "applyCtaLabel": applyCtaLabel[$lang],
    "applyCtaHref": applyCtaHref,
    "highlightLabel": highlightLabel[$lang],
    "highlightTitle": highlightTitle[$lang],
    "highlightDescription": highlightDescription[$lang]
  }
`;

/**
 * Service Page CTA Query
 * Fetches content for beneficiary/service recipient pages:
 * - Introduction text
 * - Program offerings
 * - Registration benefits
 * - Confidentiality notice
 * - Expected timeline
 * - Apply button
 *
 * Used for pages targeting people who need help (vs. volunteers).
 */
export const servicePageCtaQuery = `
  *[_type == "servicePageCta"][0]{
    "introText": introText[$lang],
    "programsTitle": programsTitle[$lang],
    "programItems": programItems[][$lang],
    "registrationBenefitText": registrationBenefitText[$lang],
    "confidentialityNote": confidentialityNote[$lang],
    "expectedTimeText": expectedTimeText[$lang],
    "buttonLabel": buttonLabel[$lang],
    "buttonHref": buttonHref
  }
`;
