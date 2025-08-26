export const QueryKeys = {
  Shop: {
    Items: "shop.items",
  },
  User: {
    Journey: "user.journey",
    FollowersInfo: "user.followersInfo",
  },
  Crew: {
    GetActivityDays: "crew.getActivityDays",
  }
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