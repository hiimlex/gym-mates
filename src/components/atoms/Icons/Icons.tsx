import NoCrewSplash from "./NoCrewSplash/NoCrewSplash";
import Gym from "./Gym/Gym";
import Running from "./Running/Running";
import Free from "./Free/Free";
import Aerobic from "./Aerobic/Aerobic";
import Bike from "./Bike/Bike";
import Swimming from "./Swimming/Swimming";
import Yoga from "./Yoga/Yoga";

export interface IIConProps {
  size?: number;
  fill?: string;
  stroke?: string;
  fillOpacity?: number;
  strokeWidth?: number;
}

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
