import { Missions } from "@components/dialogs";

export const QueryKeys = {
  Missions: {
    List: "missions.list",
  },
  Shop: {
    Items: "shop.items",
  },
  User: {
    Journey: "user.journey",
    FollowersInfo: "user.followersInfo",
    Skins: "user.skins",
    GetCharacter: "user.getCharacter",
  },
  Crew: {
    GetActivityDays: "crew.getActivityDays",
    GetCrewRank: "crew.getCrewRank",
  },
  Config: {
    GetBaseCharacterAssets: "config.getBaseCharacterAssets",
  },
};

export interface IQueryOperators {
  gte?: number;
  lte?: number;
  gt?: number;
  lt?: number;
  eq?: number;
  ne?: number;
  in?: number[];
  nin?: number[];
}
