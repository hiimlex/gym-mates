import { Typography } from "@components/atoms";
import { Header } from "@components/molecules";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const UserJourneyScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerTitle: () => (
    <Typography.HeadingSubtitle textColor="text" fontWeight="semibold" _t>
      {"links.userJourney"}
    </Typography.HeadingSubtitle>
  ),
  headerTitleAlign: "center",
  headerLeft: () => <Header.BackLeft />,
  headerTransparent: true,
};
