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
    "backgroundImage": backgroundImage,
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
    }
  }
`;

export const projectsPageQuery = `
  *[_type == "projectsPage"][0]{
    "hero": {
      "kicker": hero.kicker[$lang],
      "title": hero.title[$lang],
      "description": hero.description[$lang],
      "primaryCta": hero.primaryCta[$lang],
      "secondaryCta": hero.secondaryCta[$lang],
      "stats": hero.stats[]{
        "label": label[$lang],
        "value": value[$lang]
      }
    },
    "active": {
      "kicker": active.kicker[$lang],
      "title": active.title[$lang],
      "description": active.description[$lang],
      "items": active.items[]{
        "title": title[$lang],
        "description": description[$lang],
        "location": location[$lang],
        "image": image,
        "duration": duration[$lang],
        "target": target[$lang],
        "impact": impact[$lang],
        "status": status[$lang]
      }
    },
    "completed": {
      "kicker": completed.kicker[$lang],
      "title": completed.title[$lang],
      "description": completed.description[$lang],
      "items": completed.items[]{
        "title": title[$lang],
        "description": description[$lang],
        "location": location[$lang],
        "image": image,
        "duration": duration[$lang],
        "target": target[$lang],
        "impact": impact[$lang],
        "status": status[$lang]
      }
    },
    "labels": {
      "impact": labels.impact[$lang],
      "duration": labels.duration[$lang],
      "target": labels.target[$lang]
    },
    "cta": {
      "title": cta.title[$lang],
      "description": cta.description[$lang],
      "button": cta.button[$lang]
    }
  }
`;

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

export const galleryPageQuery = `
  *[_type == "galleryPage"][0]{
    "title": title[$lang],
    "description": description[$lang],
    "items": items[]{
      "title": title[$lang],
      "image": image
    }
  }
`;
