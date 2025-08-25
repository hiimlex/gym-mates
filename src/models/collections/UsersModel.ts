import { ICrew } from "./CrewsModel";
import { IFile } from "./FileModel";
import { IHealthData } from "./HealthModel";
import { IItem } from "./ItemsModel";
import { IUserJourney } from "./JourneyModel";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  coins: number;
  day_streak: number;
  created_at: string;
  updated_at: string;
  avatar?: IFile;
  healthy?: IHealthData;

  journey: IUserJourney;
  followers?: IUser[];
  following?: IUser[];
  favorites?: string[];
  title?: IItem;

  crews_count: number;
}

export interface IUserState {
  user: IUser | null;
  loadingCurrentUser?: boolean;
  isAuthenticated?: boolean;
  errorLoadingCurrentUser?: unknown;
}

export interface IUserByIdResponse {
  userById: IUser;
}

export interface IEditProfileForm {
  name: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
}

export interface UpdateByIdUsersInput {
  name?: string;
  email?: string;
}

export interface IFollowerInfo {
  user: IUser;
  is_mutual: boolean;
  in_crews?: ICrew[];
}
export interface IGetFollowersInfoResponse {
  followers: IFollowerInfo[];
  following: IFollowerInfo[];
}

export interface IDeviceRegistration {
  pushToken: string;
  deviceInfo: IDeviceInfo;
}

export interface IDeviceInfo {
  os: string;
  model: string;
}
