import { IFile, IUser } from "./user.model";

export enum CrewVisibility {
  Public = "public",
  Private = "private",
}

export enum CrewStreak {
  Weekends = "weekends",
  Weekly = "weekly",
  Monthly = "monthly",
  Yearly = "yearly",
}

export interface ICrewsByMember {
  crews: ICrew[];
}

export interface ICrew {
  _id: string;
  name: string;
  banner?: IFile;
  code: string;
  members: string[] | IUser[];
  white_list: string[] | IUser[];
  created_at: string;
  updated_at: string;
  visibility: CrewVisibility;
  streak: CrewStreak[];
  rules: {
    gym_focused: boolean;
    pay_on_past: boolean;
    pay_without_picture: boolean;
    show_members_rank: boolean;
    free_weekends: boolean;
  };
  lose_streak_in_days: number;
}
