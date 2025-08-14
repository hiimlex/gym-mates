import { Typography } from "@components/atoms";
import { Header } from "@components/molecules";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const UserFollowsScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerTransparent: true,
  headerLeft: () => <Header.BackLeft />,
  headerTitle: () => (
    <Typography.Heading textColor="text" fontWeight="semibold" _t>
      {"links.userFollows"}
    </Typography.Heading>
  ),
};
