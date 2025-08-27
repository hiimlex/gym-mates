import { Typography } from "@components/atoms";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const CrewsScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerTransparent: true,
  headerBackVisible: false,
  headerTitleAlign: "center",
  headerTitle: () => (
    <Typography.HeadingSubtitle textColor="text" fontWeight="semibold" _t>
      {"links.crews"}
    </Typography.HeadingSubtitle>
  ),
  animation: "slide_from_right",
};
