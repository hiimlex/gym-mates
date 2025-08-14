import { Typography } from "@components/atoms";
import { Header } from "@components/molecules";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const ShopCartScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerLeft: () => <Header.BackLeft />,
  headerTransparent: true,
  headerTitle: () => (
    <Typography.Heading textColor="text" fontWeight="semibold" _t>
      {"links.shopCart"}
    </Typography.Heading>
  ),
};
