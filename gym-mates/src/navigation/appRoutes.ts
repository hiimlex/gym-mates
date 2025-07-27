export enum AppRoutes {
  Login = "Login",
  Home = "Home",
  Crews = "Crews",
};

export type TRootStackParamList = {
  [AppRoutes.Home]?: {};
  [AppRoutes.Login]?: {};
  [AppRoutes.Crews]?: {};
};
