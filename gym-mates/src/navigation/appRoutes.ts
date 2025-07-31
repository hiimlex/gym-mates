import { ICrew } from "@models/collections";

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
  Journey = "Journey",
  Inventory = "Inventory",
  Shop = "Shop",
  ShopCart = "ShopCart",
  Profile = "Profile",
  Friends = "Friends",
  Settings = "Settings",
  EditProfile = "EditProfile",
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
  [AppRoutes.Journey]?: {};
  [AppRoutes.Inventory]?: {};
  [AppRoutes.Shop]?: {};
  [AppRoutes.ShopCart]?: {};
  [AppRoutes.Friends]?: {};
  [AppRoutes.Settings]?: {};
  [AppRoutes.EditProfile]?: {};
};
