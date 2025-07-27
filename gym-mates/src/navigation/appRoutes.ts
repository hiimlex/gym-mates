export enum AppRoutes {
  Login = "Login",
  Home = "Home",
}

export type TRootStackParamList = {
  [AppRoutes.Login]: undefined;
  [AppRoutes.Home]: undefined;
}
