import { Badge, Row, Typography } from "@components/atoms";
import {
  ItemCard,
  ScreenWrapper,
  ShopCheckoutPreview,
} from "@components/molecules";
import { IShopFilters } from "@models/collections";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { StoreState } from "@store/Store";
import { Colors } from "@theme";
import React, { useMemo, useState } from "react";
import { useWindowDimensions } from "react-native";
import { ArrowDown, ArrowUp } from "react-native-feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import S from "./ShopCart.styles";

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
    <ScreenWrapper useHeaderHeight>
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
    </ScreenWrapper>
  );
};

export default ShopCart;
