import { ICrew } from "@models/collections";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum AppRoutes {
  // General
  Login = "Login",
  SignUp = "SignUp",
  // Authenticated
  SetupHealth = "SetupHealth",
  SetupAvatar = "SetupAvatar",
  Home = "Home",
  // Crews
  Crews = "Crews",
  CrewView = "CrewView",
  Shop = "Shop",
  ShopCart = "ShopCart",
  // User
  Profile = "Profile",
  EditProfile = "EditProfile",
  UserView = "UserView",
  UserJourney = "UserJourney",
  UserInventory = "UserInventory",
  UserFollows = "UserFollows",
  UserCharacter = "Character",
  // Settings
  Help = "Help",
  Settings = "Settings",
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
  [AppRoutes.Help]?: {};
  [AppRoutes.UserCharacter]?: {};
};

export type ScreenProps<T extends keyof TRootStackParamList> =
  NativeStackScreenProps<TRootStackParamList, T>;
