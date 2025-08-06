import { ICrew } from "@models/collections";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum AppRoutes {
  // General
  Login = "Login",
  SignUp = "SignUp",
  // Authenticated
  SetupAvatar = "SetupAvatar",
  SetupHealth = "SetupHealth",
  Home = "Home",
  Crews = "Crews",
  CrewView = "CrewView",
  Inventory = "Inventory",
  Shop = "Shop",
  ShopCart = "ShopCart",
  Profile = "Profile",
  Friends = "Friends",
  Settings = "Settings",
  EditProfile = "EditProfile",

  UserView = "UserView",
  UserJourney = "UserJourney",
}

export type TRootStackParamList = {
  [AppRoutes.Login]?: {};
  [AppRoutes.SignUp]?: {};
  [AppRoutes.Home]?: {
    showBottomNav?: boolean;
  };
  [AppRoutes.Crews]?: {
    showBottomNav?: boolean;
  };

  [AppRoutes.Profile]?: {};
  [AppRoutes.SetupAvatar]?: {};
  [AppRoutes.SetupHealth]?: {};
  [AppRoutes.CrewView]?: {
    crew: ICrew;
  };
  [AppRoutes.UserJourney]?: {};
  [AppRoutes.Inventory]?: {};
  [AppRoutes.Shop]?: {};
  [AppRoutes.ShopCart]?: {};
  [AppRoutes.Friends]?: {};
  [AppRoutes.Settings]?: {};
  [AppRoutes.EditProfile]?: {};
  [AppRoutes.UserView]: {
    userId: string;
  };
};

export type ScreenProps<T extends keyof TRootStackParamList> =
  NativeStackScreenProps<TRootStackParamList, T>;
