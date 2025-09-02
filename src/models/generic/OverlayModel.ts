import { IItem, IWorkout } from "@models/collections";

export interface IOverlayState {
  showing?: OverlayType;
  data?: {
    workouts?: IWorkout[];
    initialIndex?: number;
    item?: IItem;
  };
}

export enum OverlayType {
  WorkoutImageViewer = 'WorkoutImageViewer',
  UserSelectTitle = 'UserSelectTitle',
  ItemPreview = 'ItemPreview',
  Missions = 'Missions',
}

export interface IShowOverlayPayload {
  type: OverlayType;
  data?: IOverlayState['data'];
}