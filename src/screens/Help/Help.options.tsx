import { Typography } from "@components/atoms";
import { Header } from "@components/molecules";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const HelpScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerTitle: () => (
    <Typography.HeadingSubtitle textColor="text" fontWeight="semibold" _t>
      {"links.help"}
    </Typography.HeadingSubtitle>
  ),
  headerTitleAlign: "center",
  headerLeft: () => <Header.BackLeft />,
  headerTransparent: true,
};
