import { IFile, IUser } from "./users.model";

export interface IWorkoutsByUser {
  workouts: IWorkout[];
}

export interface IWorkout {
  _id: string;
  picture?: IFile;
  title: string;
  date: string;
  created_at: string;
  updated_at: string;
  shared_to: string[]; // Array of user IDs
  earned: number; // Amount earned for the workout
  receipt: object; // Receipt details
  user: IUser;
  duration: number;
}
