import { client } from "./client";
import { missionVisionQuery } from "./queries";

export type MissionVisionData = {
  mission?: {
    title?: string;
    text?: string;
  };
  objectives?: {
    title?: string;
    highlight?: string;
    items?: string[];
    donateNow?: string;
  };
  vision?: {
    title?: string;
    text?: string;
  };
  targetGroups?: {
    title?: string;
    items?: string[];
  };
};

export async function getMissionVision(lang: string) {
  return client.fetch<MissionVisionData>(missionVisionQuery, { lang });
}
