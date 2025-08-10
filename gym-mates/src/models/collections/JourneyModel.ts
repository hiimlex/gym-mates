import { IHealthData } from "./HealthModel";
import { IItem } from "./ItemsModel";
import { IUser } from "./UsersModel";
import { IWorkout } from "./WorkoutsModel";

export interface IUserJourney {
  user: IUser;
  _id: string;
  events: IUserJourneyEvent[];
  workouts: IWorkout[];
  inventory: IItem[];
}

export interface IUserJourneyEvent {
  action: JourneyEventAction;
  schema: JourneyEventSchemaType;
  data: {
    workout?: IWorkout;
    user?: IUser;
    friend?: IUser;
    healthy_info?: IHealthData;
    item?: IItem;
  };
  created_at: string;
}

export enum JourneyEventAction {
  ADD = "add",
  REMOVE = "remove",
  UPDATE = "update",
  BUY = "buy",
  ACHIEVE = "achieve",
  JOIN = "join",
  LEAVE = "leave",
  PAID = "paid",
  LOSE_STREAK = "lose_streak",
  START = "start",
}

export enum JourneyEventSchemaType {
  Healthy = "healthy",
  Workout = "workout",
  Item = "item",
  Friend = "friend",
  Crew = "crew",
  User = "user",
}

export interface IGetJourneyFilters {
  sort?: "recent";
  action?: JourneyEventAction;
  schema?: JourneyEventSchemaType;
}
