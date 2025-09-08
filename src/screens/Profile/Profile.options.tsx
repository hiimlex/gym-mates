import { Coin, Typography } from "@components/atoms";
import { Header } from "@components/molecules";
import { navigationRef } from "@hooks/useNavigationContainer/useNavigationContainer";
import { AppRoutes } from "@navigation/appRoutes";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const ProfileScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerLeft: () => <Header.BackLeft />,
  headerTransparent: true,
  headerRight: () => (
    <Coin
      showUserCoins
      textVariant="body"
      touchable
      onPress={() => navigationRef.current?.navigate(AppRoutes.Shop)}
    />
  ),
  headerTitleAlign: "center",
  headerTitle: () => (
    <Typography.HeadingSubtitle textColor="text" fontWeight="semibold" _t>
      {"links.profile"}
    </Typography.HeadingSubtitle>
  ),
};
