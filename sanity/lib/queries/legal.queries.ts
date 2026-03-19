/**
 * Legal & Policy Queries
 *
 * These queries handle legal documents and policies:
 * - Privacy policy
 * - Terms of service (if added later)
 * - Other legal documents
 *
 * All queries use the `$lang` parameter for multi-language support (en/tr/ar).
 *
 * @see /app/[locale]/privacy-policy - Privacy policy page
 */

/**
 * Privacy Policy Query
 * Fetches the complete privacy policy document with:
 * - Title and organization name
 * - Introduction text and note
 * - Main sections (each can have subsections)
 *   - Section title and description
 *   - Items (bulleted lists)
 *   - Optional note
 *   - Nested subsections with their own items
 * - Contact information
 * - Last updated date
 *
 * This query handles complex nested structures for legal documents.
 */
export const privacyPolicyQuery = `
  *[_type == "privacyPolicy"][0]{
    "title": title[$lang],
    "organization": organization[$lang],
    "intro": intro[$lang],
    "introNote": introNote[$lang],
    "sections": sections[]{
      "title": title[$lang],
      "description": description[$lang],
      "items": items[][$lang],
      "note": note[$lang],
      "subsections": subsections[]{
        "title": title[$lang],
        "items": items[][$lang]
      }
    },
    "contact": {
      "title": contact.title[$lang],
      "description": contact.description[$lang],
      "items": contact.items[]{
        "label": label[$lang],
        "value": value[$lang]
      }
    },
    "updatedLabel": updatedLabel[$lang],
    "updatedValue": updatedValue[$lang]
  }
`;
