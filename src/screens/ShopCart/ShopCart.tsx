import { Badge, Button, Row, Typography } from "@components/atoms";
import {
  Header,
  ItemCard,
  ScreenWrapper,
  ShopCheckoutPreview,
} from "@components/molecules";
import {
  AppRoutes,
  ScreenProps,
  TRootStackParamList,
} from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import S from "./ShopCart.styles";
import { ArrowDown, ArrowUp, Box, Frown } from "react-native-feather";
import { Colors } from "@theme";
import { useWindowDimensions, View } from "react-native";
import { StoreState } from "@store/Store";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IShopFilters } from "@models/collections";

const ShopCart: React.FC<ScreenProps<AppRoutes.ShopCart>> = ({
  navigation,
}) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { cart, cartItemsSum } = useSelector((state: StoreState) => state.shop);
  const { user } = useSelector((state: StoreState) => state.user);
  const [filters, setFilters] = useState<IShopFilters>({});

  const donTHaveEnoughCoins = useMemo(() => {
    return (user?.coins || 0) < cartItemsSum;
  }, [user?.coins, cartItemsSum]);

  const setSortByCost = () => {
    const newFilterValue =
      filters.price_sort === undefined
        ? "PRICE_ASC"
        : filters.price_sort === "PRICE_ASC"
          ? "PRICE_DESC"
          : undefined;

    setFilters({
      ...filters,
      price_sort: newFilterValue,
    });
  };

  const cartItems = useMemo(() => {
    if (filters.price_sort) {
      return [...cart].sort((a, b) => {
        if (filters.price_sort === "PRICE_ASC") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    return cart;
  }, [cart, filters]);

  return (
    <ScreenWrapper>
      <S.Container
        style={{
          paddingTop: headerHeight + 24,
        }}
      >
        <S.Header>
          <Row>
            <Badge
              touchable
              active={!!filters.price_sort}
              onPress={setSortByCost}
            >
              <Typography.Button
                textColor={!!filters.price_sort ? "white" : "text"}
                _t
              >
                {"shop.filters.cost"}
              </Typography.Button>

              {filters.price_sort === "PRICE_DESC" && (
                <ArrowDown
                  width={14}
                  height={14}
                  stroke={
                    !!filters.price_sort
                      ? Colors.colors.white
                      : Colors.colors.text
                  }
                  strokeWidth={2}
                />
              )}

              {filters.price_sort === "PRICE_ASC" && (
                <ArrowUp
                  width={14}
                  height={14}
                  stroke={
                    !!filters.price_sort
                      ? Colors.colors.white
                      : Colors.colors.text
                  }
                  strokeWidth={2}
                />
              )}
            </Badge>
          </Row>
        </S.Header>
        <S.VerticalScroll
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24, gap: 24 }}
        >
          {cart.map((item) => (
            <ItemCard.Checkout key={item._id} item={item} />
          ))}

          {cart.length === 0 && (
            <Row justify="center">
              <Typography.Body textColor="textLight" _t>
                {"shop.cart.empty"}
              </Typography.Body>
            </Row>
          )}
        </S.VerticalScroll>

        <ShopCheckoutPreview />
      </S.Container>
    </ScreenWrapper>
  );
};

export default ShopCart;
