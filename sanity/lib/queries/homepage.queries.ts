/**
 * Homepage Section Queries
 *
 * These queries fetch data for the various sections displayed on the homepage.
 * All queries use the `$lang` parameter to fetch localized content (en/tr/ar).
 *
 * @see /app/[locale]/page.tsx - Homepage that uses these queries
 */

/**
 * Hero Section Query
 * Fetches the hero carousel with multiple slides, each containing:
 * - Localized title and subtitle
 * - Background image
 * - Donate now button label
 */
export const heroQuery = `
  *[_type == "hero"][0]{
    "slides": slides[]{
      "title": title[$lang],
      "subtitle": subtitle[$lang],
      "text": text[$lang],
      "image": image,
      "link": link,
      "buttonLabel": buttonLabel[$lang]
    },
    "donateNowLabel": donateNowLabel[$lang]
  }
`;

/**
 * About Section Query
 * Fetches the "About Us" section with:
 * - Main content (title, description, quote)
 * - Features (treatment help, fund raised stats)
 * - Images (primary and secondary)
 * - Contact information
 */
export const aboutSectionQuery = `
  *[_type == "aboutSection"][0]{
    "subtitle": subtitle[$lang],
    "title": title[$lang],
    "highlight": highlight[$lang],
    "descriptionLead": descriptionLead[$lang],
    "descriptionBody": descriptionBody[$lang],
    "quote": quote[$lang],
    "features": {
      "treatmentHelp": features.treatmentHelp[$lang],
      "fundRaised": features.fundRaised[$lang]
    },
    "learnMore": learnMore[$lang],
    "needHelpLabel": needHelpLabel[$lang],
    "phoneNumber": phoneNumber[$lang],
    "imagePrimary": imagePrimary,
    "imageSecondary": imageSecondary,
    "imageAltPrimary": imageAltPrimary[$lang],
    "imageAltSecondary": imageAltSecondary[$lang],
    "fundedLabel": fundedLabel[$lang],
    "fundedAmount": fundedAmount[$lang],
    "supportLabel": supportLabel[$lang]
  }
`;

/**
 * Core Values Query
 * Fetches the organization's core values section with:
 * - Section title and subtitle
 * - Array of values (each with title and description)
 * - Background image
 */
export const coreValuesQuery = `
  *[_type == "coreValues"][0]{
    "subtitle": subtitle[$lang],
    "title": title[$lang],
    "readMore": readMore[$lang],
    "backgroundImage": backgroundImage,
    "values": values[]{
      "title": title[$lang],
      "description": description[$lang]
    }
  }
`;

/**
 * Mission, Vision, Objectives Query
 * Fetches the complex mission/vision section with:
 * - Mission statement
 * - Vision statement
 * - Strategic objectives list
 * - Target groups
 * - Background images for each subsection
 */
export const missionVisionQuery = `
  *[_type == "missionVision"][0]{
    "mission": {
      "title": mission.title[$lang],
      "text": mission.text[$lang]
    },
    "missionBackgroundImage": missionBackgroundImage,
    "objectives": {
      "title": objectives.title[$lang],
      "highlight": objectives.highlight[$lang],
      "items": objectives.items[][$lang],
      "donateNow": objectives.donateNow[$lang]
    },
    "objectivesBackgroundImage": objectivesBackgroundImage,
    "vision": {
      "title": vision.title[$lang],
      "text": vision.text[$lang]
    },
    "visionBackgroundImage": visionBackgroundImage,
    "targetGroups": {
      "title": targetGroups.title[$lang],
      "items": targetGroups.items[][$lang]
    }
  }
`;

/**
 * Contact Section Query
 * Fetches the contact section with:
 * - Section header (title, description)
 * - Contact information (email, address, hours)
 * - Form field labels
 * - Success message
 */
export const contactSectionQuery = `
  *[_type == "contactSection"][0]{
    "subtitle": subtitle[$lang],
    "title": title[$lang],
    "highlight": highlight[$lang],
    "description": description[$lang],
    "info": {
      "emailTitle": info.emailTitle[$lang],
      "emailDetail": info.emailDetail[$lang],
      "visitTitle": info.visitTitle[$lang],
      "visitDetail": info.visitDetail[$lang],
      "hoursTitle": info.hoursTitle[$lang],
      "hoursDetail": info.hoursDetail[$lang]
    },
    "form": {
      "name": form.name[$lang],
      "email": form.email[$lang],
      "phone": form.phone[$lang],
      "message": form.message[$lang],
      "button": form.button[$lang]
    },
    "success": success[$lang]
  }
`;

/**
 * Footer Section Query
 * Fetches footer content including:
 * - About text
 * - Quick links
 * - Contact information
 * - Recent news items
 * - Copyright text
 */
export const footerSectionQuery = `
  *[_type == "footerSection"][0]{
    "aboutText": aboutText[$lang],
    "quickLinks": quickLinks[$lang],
    "contactUs": contactUs[$lang],
    "rights": rights[$lang],
    "address": address[$lang],
    "email": email[$lang],
    "phone": phone[$lang],
    "news": news[]{
      "title": title[$lang],
      "date": date[$lang]
    }
  }
`;
