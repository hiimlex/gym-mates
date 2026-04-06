import { Typography } from "@components/atoms";
import { Header } from "@components/molecules";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const WorkoutPostScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerTitle: () => (
    <Typography.HeadingSubtitle textColor="text" fontWeight="semibold" _t>
      {"links.post"}
    </Typography.HeadingSubtitle>
  ),
  headerLeft: () => <Header.BackLeft />,
  headerTransparent: true,
};
