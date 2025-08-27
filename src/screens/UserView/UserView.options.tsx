import { Typography } from "@components/atoms";
import { Header, UserViewActions } from "@components/molecules";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const UserViewScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerTitle: () => (
    <Typography.HeadingSubtitle textColor="text" fontWeight="semibold" _t>
      {"links.user"}
    </Typography.HeadingSubtitle>
  ),
  headerLeft: () => <Header.BackLeft />,
  headerTransparent: true,
  headerRight: () => <UserViewActions />,
};
