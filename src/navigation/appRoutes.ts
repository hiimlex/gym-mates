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
  Shop = "Shop",
  ShopCart = "ShopCart",
  Profile = "Profile",
  Settings = "Settings",
  EditProfile = "EditProfile",
  
  UserView = "UserView",
  UserJourney = "UserJourney",
  UserInventory = "UserInventory",
  UserFollows = "UserFollows",
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
  [AppRoutes.UserInventory]?: {};
  [AppRoutes.Shop]?: {};
  [AppRoutes.ShopCart]?: {};
  [AppRoutes.Settings]?: {};
  [AppRoutes.EditProfile]?: {};
  [AppRoutes.UserView]: {
    userId: string;
  };
  [AppRoutes.UserFollows]?: {}
};

export type ScreenProps<T extends keyof TRootStackParamList> =
  NativeStackScreenProps<TRootStackParamList, T>;
