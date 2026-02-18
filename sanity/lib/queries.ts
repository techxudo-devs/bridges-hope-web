export const heroQuery = `
  *[_type == "hero"][0]{
    "slides": slides[]{
      "title": title[$lang],
      "subtitle": subtitle[$lang],
      "image": image
    },
    "donateNowLabel": donateNowLabel[$lang]
  }
`;

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
