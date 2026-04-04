import { ShopService } from "@api/services";
import { Coin, Loader, Row, Typography } from "@components/atoms";
import {
  calculateMediaSize,
  ItemCard,
  ScreenWrapper,
  ShopCheckoutPreview,
} from "@components/molecules";
import { IItem } from "@models/collections";
import { OverlayType, QueryKeys } from "@models/generic";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { OverlayActions, ShopActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { useWindowDimensions, View, ViewStyle } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ShopFilters from "./components/ShopFilters";
import S from "./Shop.styles";

const Shop: React.FC<ScreenProps<AppRoutes.Shop>> = ({ navigation }) => {
  const { width } = useWindowDimensions();

  const { view, filters, cartItemsSum, cart } = useSelector(
    (state: StoreState) => state.shop,
  );
  const { user } = useSelector((state: StoreState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await ShopService.list(filters);
      return response;
    },
    queryKey: [
      QueryKeys.Shop.Items,
      filters?.search,
      filters?.price_sort,
      filters?.locked,
      filters?.sex,
    ],
  });

  const scrollStyles: ViewStyle = useMemo(() => {
    const paddingBottom = cart.length === 0 ? 24 : 84;

    if (view === "grid") {
      return {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 24,
        paddingBottom,
        paddingTop: 12,
      };
    }

    return {
      flexDirection: "column",
      gap: 24,
      paddingBottom,
    };
  }, [view, cart.length]);

  const items = useMemo(() => data?.data.items || [], [data?.data.items]);

  const userCannotAfford = (itemPrice: number) => {
    if (cartItemsSum + itemPrice > (user?.coins || 0)) {
      return true;
    }
  };

  const handleOnItemPress = (item: IItem) => {
    dispatch(
      OverlayActions.show({
        type: OverlayType.ItemPreview,
        data: { item },
      }),
    );
  };

  useEffect(() => {
    return () => {
      dispatch(ShopActions.setFilters({ search: "" }));
    };
  }, []);

  return (
    <ScreenWrapper useHeaderHeight>
      <S.Header>
        <Row justify="space-between" align="center">
          <Typography.Heading fontWeight="medium" _t>
            {"shop.title"}
          </Typography.Heading>

          <Coin showUserCoins textVariant="body" />
        </Row>

        <ShopFilters />
      </S.Header>

      <S.ItemsScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={scrollStyles}
      >
        {items?.map((item) => (
          <ItemCard.Buy
            item={item}
            key={item._id}
            disabled={userCannotAfford(item?.price || 0)}
            touchableImage
            mediaSize={calculateMediaSize(width, 2, view, 24, 0, 12)}
            onImagePress={handleOnItemPress}
          />
        ))}
        {isLoading && (
          <View
            style={{
              flex: 1,
            }}
          >
            <Loader color="primary" />
          </View>
        )}

        {items?.length === 0 && !isLoading && (
          <Row justify="center">
            <Typography.Body textColor="textLight" _t>
              {"shop.empty"}
            </Typography.Body>
          </Row>
        )}
      </S.ItemsScrollView>

      <ShopCheckoutPreview />
    </ScreenWrapper>
  );
};

export default Shop;
