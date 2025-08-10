import { HeaderBack, Typography } from "@components/atoms";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const ShopCartScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerLeft: () => <HeaderBack />,
  headerTransparent: true,
  headerTitle: () => (
    <Typography.Heading textColor="text" fontWeight="semibold" _t>
      {"links.shopCart"}
    </Typography.Heading>
  ),
};
