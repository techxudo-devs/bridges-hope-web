/**
 * Donation System Queries
 *
 * These queries handle all donation-related data:
 * - Main donate page content
 * - Individual donation campaigns
 * - Donation detail pages
 *
 * All queries use the `$lang` parameter for multi-language support (en/tr/ar).
 *
 * @see /app/[locale]/donate - Donate page
 * @see /components/sections/DonationPreviewSection.tsx - Campaign previews
 */

/**
 * Donate Page Query
 * Fetches the complete donate page structure including:
 * - Hero section (title, description, CTAs)
 * - Impact section (how donations help)
 * - Donation options (one-time, recurring, etc.)
 * - Donation form configuration
 * - Promise section (what we guarantee)
 * - Active campaigns list
 * - Call-to-action section
 *
 * This is a complex query with deeply nested structures.
 */
export const donatePageQuery = `
  *[_type == "donatePage"][0]{
    "badge": badge[$lang],
    "title": title[$lang],
    "description": description[$lang],
    "primaryCta": primaryCta[$lang],
    "secondaryCta": secondaryCta[$lang],
    "impact": {
      "kicker": impact.kicker[$lang],
      "title": impact.title[$lang],
      "description": impact.description[$lang],
      "items": impact.items[]{
        "title": title[$lang],
        "description": description[$lang]
      }
    },
    "options": {
      "kicker": options.kicker[$lang],
      "title": options.title[$lang],
      "description": options.description[$lang],
      "items": options.items[]{
        "title": title[$lang],
        "description": description[$lang],
        "detail": detail[$lang]
      }
    },
    "form": {
      "kicker": form.kicker[$lang],
      "title": form.title[$lang],
      "description": form.description[$lang],
      "mockLabel": form.mockLabel[$lang],
      "amountLabel": form.amountLabel[$lang],
      "amounts": form.amounts[][$lang],
      "customLabel": form.customLabel[$lang],
      "summaryLabel": form.summaryLabel[$lang],
      "summary": {
        "amount": form.summary.amount[$lang],
        "frequency": form.summary.frequency[$lang],
        "once": form.summary.once[$lang]
      },
      "submit": form.submit[$lang],
      "note": form.note[$lang]
    },
    "promise": {
      "kicker": promise.kicker[$lang],
      "title": promise.title[$lang],
      "description": promise.description[$lang],
      "items": promise.items[][$lang]
    },
    "campaigns": {
      "kicker": campaigns.kicker[$lang],
      "title": campaigns.title[$lang],
      "description": campaigns.description[$lang],
      "donateLabel": campaigns.donateLabel[$lang],
      "goalLabel": campaigns.goalLabel[$lang],
      "currency": campaigns.currency,
      "items": campaigns.items[]{
        "slug": slug,
        "category": category[$lang],
        "title": title[$lang],
        "description": description[$lang],
        "image": image,
        "raisedAmount": raisedAmount,
        "goalAmount": goalAmount,
        "accentColor": accentColor
      }
    },
    "cta": {
      "title": cta.title[$lang],
      "description": cta.description[$lang],
      "buttonLabel": cta.buttonLabel[$lang],
      "splashImage": cta.splashImage,
      "photoImage": cta.photoImage
    }
  }
`;

export const donateQuickPageQuery = `
  *[_type == "donateQuickPage"][0]{
    "leftImage": leftImage,
    "leftMessage": leftMessage[$lang],
    "amountTitle": amountTitle[$lang],
    "currencySymbol": currencySymbol,
    "defaultAmount": defaultAmount,
    "amountOptions": amountOptions,
    "otherLabel": otherLabel[$lang],
    "confirmButtonLabel": confirmButtonLabel[$lang],
    "modalTitle": modalTitle[$lang],
    "totalLabel": totalLabel[$lang],
    "modalConfirmButtonLabel": modalConfirmButtonLabel[$lang],
    "paymentMethods": paymentMethods[]{
      "key": key,
      "label": label[$lang],
      "href": href,
      "detail": detail[$lang]
    }
  }
`;

/**
 * Donation Posts Query
 * Fetches all donation campaigns/posts ordered by most recently updated.
 * Each campaign includes:
 * - Basic info (slug, category, title, description)
 * - Progress tracking (raised amount, goal amount)
 * - Visual elements (image, accent color)
 *
 * Used for campaign listing pages and preview sections.
 */
export const donationPostsQuery = `
  *[_type == "donationPost"] | order(_updatedAt desc){
    "slug": slug.current,
    "category": category[$lang],
    "title": title[$lang],
    "description": description[$lang],
    "image": image,
    "raisedAmount": raisedAmount,
    "goalAmount": goalAmount,
    "accentColor": accentColor
  }
`;

/**
 * Donation Post By Slug Query
 * Fetches a single donation campaign by its URL slug.
 * Includes all fields from the list query plus:
 * - Detailed paragraphs/content
 * - Category breakdown with counts
 * - Gallery images
 *
 * @param $slug - The campaign slug (e.g., "emergency-relief-syria")
 */
export const donationPostBySlugQuery = `
  *[_type == "donationPost" && slug.current == $slug] | order(_updatedAt desc)[0]{
    "slug": slug.current,
    "category": category[$lang],
    "title": title[$lang],
    "description": description[$lang],
    "image": image,
    "raisedAmount": raisedAmount,
    "goalAmount": goalAmount,
    "accentColor": accentColor,
    "defaultAmount": defaultAmount,
    "amountOptions": amountOptions,
    "youtubeUrl": youtubeUrl,
    "detailParagraphs": detailParagraphs[][$lang],
    "richContent": richContent[$lang],
    "categories": categories[]{
      "label": label[$lang],
      "count": count
    },
    "galleryImages": galleryImages
  }
`;

/**
 * Donate Detail Query
 * Fetches configuration for the donation detail/checkout page:
 * - Payment method options
 * - Form field labels
 * - Amount presets
 * - Category filters
 * - Gallery settings
 *
 * This is separate from individual campaigns - it's the template configuration.
 */
export const donateDetailQuery = `
  *[_type == "donateDetail"][0]{
    "raisedLabel": raisedLabel[$lang],
    "selectPaymentTitle": selectPaymentTitle[$lang],
    "paymentMethods": paymentMethods[][$lang],
    "firstNameLabel": firstNameLabel[$lang],
    "lastNameLabel": lastNameLabel[$lang],
    "emailLabel": emailLabel[$lang],
    "donationTotalLabel": donationTotalLabel[$lang],
    "donateNowLabel": donateNowLabel[$lang],
    "amountOptions": amountOptions,
    "customAmountLabel": customAmountLabel[$lang],
    "categoriesTitle": categoriesTitle[$lang],
    "categories": categories[]{
      "label": label[$lang],
      "count": count
    },
    "galleryTitle": galleryTitle[$lang],
    "detailParagraphs": detailParagraphs[][$lang],
    "galleryImages": galleryImages
  }
`;
