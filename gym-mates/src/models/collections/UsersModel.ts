import { ICrew } from "./CrewsModel";
import { IFile } from "./FileModel";
import { IHealthData } from "./HealthModel";
import { ITitle } from "./ItemsModel";
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
  title?: ITitle;

  crews_count: number;
}

export interface IUserState {
  user: IUser | null;
  loadingCurrentUser?: boolean;
  isAuthenticated?: boolean;
}

export interface IUserByIdResponse {
  userById: IUser;
}
