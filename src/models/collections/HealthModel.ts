import { IUser } from "./UsersModel";

export interface IHealthData {
  user: IUser;
  weight: number;
  height: number;
  body_fat: number;
  created_at: string;
  updated_at: string;
}

export interface IUpdateHealthForm {
  weight: string;
  height: string;
  body_fat: string;
}
