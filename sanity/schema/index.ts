import { aboutFeatures, aboutSection } from "./aboutSection";
import { blogPost, blogSection } from "./blogSection";
import { coreValueItem, coreValues } from "./coreValues";
import { contactForm, contactInfo, contactSection } from "./contactSection";
import { footerNewsItem, footerSection } from "./footerSection";
import { hero, heroSlide } from "./hero";
import { localizedString } from "./localizedString";
import { localizedBlockContent } from "./localizedBlockContent";
import {
  missionObjectives,
  missionTargetGroups,
  missionVision,
  missionVisionBlock,
} from "./missionVision";

export const schemaTypes = [
  localizedString,
  localizedBlockContent,
  heroSlide,
  hero,
  aboutFeatures,
  aboutSection,
  blogPost,
  blogSection,
  coreValueItem,
  coreValues,
  contactInfo,
  contactForm,
  contactSection,
  footerNewsItem,
  footerSection,
  missionVisionBlock,
  missionObjectives,
  missionTargetGroups,
  missionVision,
];
