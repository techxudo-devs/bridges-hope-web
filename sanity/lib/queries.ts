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

export const blogPostsQuery = `
  *[_type == "blogPost"] | order(date desc){
    "title": title[$lang],
    "excerpt": excerpt[$lang],
    "date": date,
    "image": image,
    "slug": slug.current
  }
`;

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
