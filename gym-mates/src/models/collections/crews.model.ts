import { Asset } from "react-native-image-picker";
import { IFile } from "./file.model";
import { IUser } from "./users.model";

export enum CrewVisibility {
  Public = "public",
  Private = "private",
}

export enum CrewStreak {
  Weekends = "weekends",
  Weekly = "weekly",
  Monthly = "monthly",
}

export interface ICrewsByMember {
  crews: ICrew[];
}

export interface ICrew {
  _id: string;
  name: string;
  banner?: IFile;
  code: string;
  created_by: string;
  members_w_user: ICrewMember[];
  white_list: IUser[];
  created_at: string;
  updated_at: string;
  visibility: CrewVisibility;
  streak: CrewStreak[];
  rules: ICrewRules;
  lose_streak_in_days: number;
}

export interface ICrewMember {
  user: IUser;
  _id: string;
  joined_at: string;
  is_admin: boolean;
}

export interface ICrewRules {
  gym_focused: boolean;
  pay_on_past: boolean;
  pay_without_picture: boolean;
  show_members_rank: boolean;
  free_weekends: boolean;
}

export interface ICrewsState {
  crews: ICrew[];
  crewView?: ICrew;
}

export interface ICrewsFilters {
  favorites?: boolean;
  mine?: boolean;
}

export interface IEditCrewRulesForm {
  lose_streak_in_days: number;
  gym_focused: boolean;
  pay_on_past: boolean;
  pay_without_picture: boolean;
  show_members_rank: boolean;
  free_weekends: boolean;
}

export interface IUpdateCrewPayload {
  visibility?: CrewVisibility;
  lose_streak_in_days?: number;
  gym_focused?: boolean;
  pay_on_past?: boolean;
  pay_without_picture?: boolean;
  show_members_rank?: boolean;
  free_weekends?: boolean;
  streak?: CrewStreak[];
}

export interface IUpdateCrewBannerPayload {
  file: Asset;
}
