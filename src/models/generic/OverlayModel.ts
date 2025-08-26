import { IWorkout } from "@models/collections";

export interface IOverlayState {
  showing?: OverlayType;
  data?: {
    workouts?: IWorkout[];
    initialIndex?: number;
  };
}

export enum OverlayType {
  WorkoutImageViewer = 'WorkoutImageViewer',
  UserSelectTitle = 'UserSelectTitle',
}

export interface IShowOverlayPayload {
  type: OverlayType;
  data?: IOverlayState['data'];
}