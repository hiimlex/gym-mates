import { IFile } from "./file.model";
import { IHealthData } from "./health.model";
import { ITitle } from "./items.model";
import { IUserJourney } from "./journey.model";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  coins: number;
  day_streak: number;
  created_at: string;
  updated_at: string;
  avatar?: string | IFile;
  healthy?: IHealthData;

  journey: IUserJourney;
  friends?: string[] | IUser[];
  requests?: string[] | IUser[];
  title?: ITitle;
}

export interface IUserState {
  user: IUser | null;
  loadingCurrentUser?: boolean;
  isAuthenticated?: boolean;
}
