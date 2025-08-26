import { Input, Typography } from "@components/atoms";
import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { AppRoutes } from "@navigation/appRoutes";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { ShopActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { Colors } from "@theme";
import { useState } from "react";
import { ShoppingBag } from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import S from "./Shop.styles";
import { Header } from "@components/molecules";
import { FadeIn, FadeOut } from "react-native-reanimated";

const ShopSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [oldTimeout, setOldTimeout] = useState<NodeJS.Timeout | null>(null);

  const onShopSearch = (text: string) => {
    if (oldTimeout) {
      clearTimeout(oldTimeout);
    }

    const newTimeout = setTimeout(() => {
      dispatch(ShopActions.setFilters({ search: text }));
    }, 300);

    setOldTimeout(newTimeout);
  };

  return (
    <S.SearchWrapper>
      <Input
        placeholder="Search"
        style={{ paddingTop: 12, paddingBottom: 12 }}
        onChange={onShopSearch}
      />
    </S.SearchWrapper>
  );
};

const ShopCart = () => {
  const { navigate } = useAppNavigation();
  const { cart } = useSelector((state: StoreState) => state.shop);

  return (
    <S.ShopCartIcon
      activeOpacity={0.6}
      onPress={() => navigate(AppRoutes.ShopCart)}
    >
      {!!cart && cart?.length > 0 && (
        <S.ItemsCount
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <Typography.Tip textColor="white">{cart?.length}</Typography.Tip>
        </S.ItemsCount>
      )}
      <ShoppingBag
        width={24}
        height={24}
        strokeWidth={1.5}
        stroke={Colors.colors.text}
        fill={Colors.colors.text}
        fillOpacity={0.2}
      />
    </S.ShopCartIcon>
  );
};

export const ShopScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerLeft: () => <Header.BackLeft />,
  headerTransparent: true,
  headerTitle: ShopSearch,
  headerRight: ShopCart,
};
