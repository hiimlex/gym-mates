import { Typography } from "@components/atoms";
import { CrewViewActions, Header } from "@components/molecules";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const CrewViewScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerTransparent: true,
  headerLeft: () => <Header.BackLeft />,
  headerTitle: () => (
    <Typography.HeadingSubtitle textColor="text" fontWeight="semibold" _t>
      {"links.crew"}
    </Typography.HeadingSubtitle>
  ),
  headerTitleAlign: "center",
  headerRight: () => <CrewViewActions />,
};
