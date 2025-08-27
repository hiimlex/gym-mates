import { Typography } from "@components/atoms";
import { Header } from "@components/molecules";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const ProfileScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerLeft: () => <Header.BackLeft />,
  headerTransparent: true,
  headerRight: () => <Header.Coins size={10} />,
  headerTitleAlign: "center",
  headerTitle: () => (
    <Typography.HeadingSubtitle textColor="text" fontWeight="semibold" _t>
      {"links.profile"}
    </Typography.HeadingSubtitle>
  ),
};
