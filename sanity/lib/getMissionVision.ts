import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client";
import { missionVisionQuery } from "./queries";

export type MissionVisionData = {
  mission?: {
    title?: string;
    text?: string;
  };
  missionBackgroundImage?: SanityImageSource;
  objectives?: {
    title?: string;
    highlight?: string;
    items?: string[];
    donateNow?: string;
  };
  objectivesBackgroundImage?: SanityImageSource;
  vision?: {
    title?: string;
    text?: string;
  };
  visionBackgroundImage?: SanityImageSource;
  targetGroups?: {
    title?: string;
    items?: string[];
  };
};

export async function getMissionVision(lang: string) {
  return client.fetch<MissionVisionData>(missionVisionQuery, { lang });
}
