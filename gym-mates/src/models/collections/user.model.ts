export interface IUser {
  _id: string;
  name: string;
  email: string;
  coins: number;
  day_streak: number;
  created_at: string;
  updated_at: string;
  avatar?: string | IFile;

  journey: IUserJourney;
  friends?: string[] | IUser[];
  requests?: string[] | IUser[];
  title?: string;
}

export interface IUserJourney {}

export interface IHealthData {
  weight: number;
  height: number;
  body_fat: number;
}

export interface IUserState {
  user: IUser | null;
  loadingCurrentUser?: boolean;
  isAuthenticated?: boolean;
}

export interface IFile {
  url: string;
  public_id: string;
  created_at: string;
  updated_at: string;
}