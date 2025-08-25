import { Asset } from "react-native-image-picker";
import { IFile } from "./FileModel";
import { IUser } from "./UsersModel";

export enum CrewVisibility {
  Public = "public",
  Private = "private",
}

export enum CrewStreak {
  Weekends = "weekends",
  Weekly = "weekly",
  Monthly = "monthly",
}

export interface ICrewsResponse {
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

export interface ICrewsByMemberFilters {
  userId?: string;
  favorites?: string[];
  created_by?: string;
  search?: string;
}

export interface IEditCrewRulesForm {
  lose_streak_in_days: string;
  gym_focused: boolean;
  pay_on_past: boolean;
  pay_without_picture: boolean;
  show_members_rank: boolean;
  free_weekends: boolean;
}

export interface IUpdateCrewPayload {
  visibility?: CrewVisibility;
  rules?: Partial<ICrewRules>;
  lose_streak_in_days?: number;
  streak?: CrewStreak[];
  crew_id: string;
}

export interface IUpdateCrewBannerPayload {
  file: Asset;
  crew_id: string;
}

export enum CreateCrewSteps {
  Info = "info",
  Settings = "settings",
}
export type ICreateCrewSteps = "info" | "settings";

export interface ICreateCrewInfoForm {
  name: string;
  code: string;
  media: Asset;
  mediaPreview: string;
}

export interface ICreateCrewSettingsForm {
  visibility: CrewVisibility;
  rules: IEditCrewRulesForm;
  streak: CrewStreak[];
}

export interface ICreateCrewPayload {
  name: string;
  code: string;
  banner?: Asset;
  visibility: CrewVisibility;
  rules: IEditCrewRulesForm;
  streak: CrewStreak[];
}

export interface ICreateCrewState {
  step: ICreateCrewSteps;
  banner?: Asset;
  infoForm?: ICreateCrewInfoForm;
  settingsForm?: ICreateCrewSettingsForm;
  error?: string;
}
