export enum AppRoutes {
  Login = "Login",
  SignUp = "SignUp",
  Home = "Home",
  Crews = "Crews",
  Profile = "Profile",
  SetupAvatar = "SetupAvatar",
  SetupHealth = "SetupHealth",
}

export type TRootStackParamList = {
  [AppRoutes.Home]?: {
    hideBottomNav?: boolean;
  };
  [AppRoutes.Login]?: {
    hideBottomNav?: boolean;
  };
  [AppRoutes.Crews]?: {};
  [AppRoutes.Profile]?: {
    hideBottomNav?: boolean;
  };
  [AppRoutes.SignUp]?: {
    hideBottomNav?: boolean;
  };
  [AppRoutes.SetupAvatar]?: {
    hideBottomNav?: boolean;
  };
  [AppRoutes.SetupHealth]?: {
    hideBottomNav?: boolean;
  };
};
