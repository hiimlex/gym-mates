import { WorkoutType } from "@models/collections";
import { ReactElement } from "react";
import Aerobic from "./Aerobic/Aerobic";
import Bike from "./Bike/Bike";
import Free from "./Free/Free";
import Gym from "./Gym/Gym";
import type { IIConProps } from "./Icons.types";
import NoCrewSplash from "./NoCrewSplash/NoCrewSplash";
import Running from "./Running/Running";
import Swimming from "./Swimming/Swimming";
import Yoga from "./Yoga/Yoga";

export type { IIConProps };

export const iconByWorkoutType: Record<
  WorkoutType,
  (props?: IIConProps) => ReactElement
> = {
  gym: (props) => <Gym {...props} />,
  aerobics: (props) => <Aerobic {...props} />,
  running: (props) => <Running {...props} />,
  cycling: (props) => <Bike {...props} />,
  cross_fit: (props) => <Free {...props} />,
  cardio: (props) => <Running {...props} />,
  yoga: (props) => <Yoga {...props} />,
  swimming: (props) => <Swimming {...props} />,
  other: (props) => <Free {...props} />,
};

export default {
  NoCrewSplash,
  Gym,
  Running,
  Free,
  Aerobic,
  Bike,
  Swimming,
  Yoga,
};
