export enum MissionContext {
  Workout = "workout",
  Social = "social",
  Shop = "shop",
  Secret = "secret",
}

export interface IMission {
  _id: string;
  achievement: string;
  hidden: boolean;
  name: string;
  description: string;
  reward: number;
  requirements?: string[];
  context: MissionContext;
  created_at: string;
  updated_at: string;
}
