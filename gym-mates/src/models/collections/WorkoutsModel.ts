import { Asset } from "react-native-image-picker";
import { IFile } from "./FileModel";
import { IUser } from "./UsersModel";
import { ICrew } from "./CrewsModel";

export interface IWorkoutsByUser {
  workouts: IWorkout[];
}

export interface IWorkoutsByCrew {  
  workouts: IWorkout[];
}

export interface IWorkoutsFilters {
  userId?: string; // User ID to filter workouts by a specific user
  range?: [string, string]; // Date range in MM-dd-yy format
  from?: string[]; // Array of crew IDs to filter workouts shared with specific crews
  sort?: '_ID_ASC' | '_ID_DESC' | 'DATE_ASC' | 'DATE_DESC'; // Sorting options
}

export interface IWorkout {
  _id: string;
  picture?: IFile;
  title: string;
  date: string;
  type: string;
  created_at: string;
  updated_at: string;
  shared_to: ICrew[]; // Array of user IDs
  earned: number; // Amount earned for the workout
  receipt: Record<string, number>; // Receipt details
  user: IUser;
  duration: number;
}

export interface ICreateWorkoutForm {
  title: string;
  date: Date;
  type: string;
  duration: number;
}

export interface ICreateWorkoutPayload {
  title: string;
  date: string;
  type: string;
  duration: number;
  picture?: Asset;
  shared_to: string[]; // Array of crew IDs to share
}

export enum WorkoutType {
  Gym = "gym",
  Aerobics = "aerobics",
  Cardio = "cardio",
  CrossFit = "cross_fit",
  Cycling = "cycling",
  Running = "running",
  Swimming = "swimming",
  Yoga = "yoga",
  Other = "other",
}

export interface IAddWorkoutState {
  step?: "info" | "sharing";
  formData?: ICreateWorkoutForm;
  picture?: Asset;
  shared_to?: string[];
  createdWorkout?: IWorkout;
}
