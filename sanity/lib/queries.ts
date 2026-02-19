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

export const coreValuesQuery = `
  *[_type == "coreValues"][0]{
    "subtitle": subtitle[$lang],
    "title": title[$lang],
    "readMore": readMore[$lang],
    "values": values[]{
      "title": title[$lang],
      "description": description[$lang]
    }
  }
`;

export const missionVisionQuery = `
  *[_type == "missionVision"][0]{
    "mission": {
      "title": mission.title[$lang],
      "text": mission.text[$lang]
    },
    "objectives": {
      "title": objectives.title[$lang],
      "highlight": objectives.highlight[$lang],
      "items": objectives.items[][$lang],
      "donateNow": objectives.donateNow[$lang]
    },
    "vision": {
      "title": vision.title[$lang],
      "text": vision.text[$lang]
    },
    "targetGroups": {
      "title": targetGroups.title[$lang],
      "items": targetGroups.items[][$lang]
    }
  }
`;
