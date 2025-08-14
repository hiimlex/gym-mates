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
import React, { useMemo } from "react";
import S from "./ShopCart.styles";
import { ArrowDown, Box, Frown } from "react-native-feather";
import { Colors } from "@theme";
import { useWindowDimensions, View } from "react-native";
import { StoreState } from "@store/Store";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ShopCart: React.FC<ScreenProps<AppRoutes.ShopCart>> = ({
  navigation,
}) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { cart, cartItemsSum } = useSelector((state: StoreState) => state.shop);
  const { user } = useSelector((state: StoreState) => state.user);

  const donTHaveEnoughCoins = useMemo(() => {
    return (user?.coins || 0) < cartItemsSum;
  }, [user?.coins, cartItemsSum]);

  return (
    <ScreenWrapper>
      <S.Container
        style={{
          paddingTop: headerHeight + 24,
        }}
      >
        <S.Header>
          <Typography.Heading fontWeight="medium" _t>
            {"shop.cart.title"}
          </Typography.Heading>
          <Row>
            <Badge touchable>
              <Typography.Button textColor="text" _t>
                {"shop.filters.cost"}
              </Typography.Button>

              <ArrowDown
                width={14}
                height={14}
                stroke={Colors.colors.text}
                strokeWidth={2}
              />
            </Badge>
          </Row>
        </S.Header>
        <S.VerticalScroll
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24, gap: 24 }}
        >
          {cart.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              forcedView="list"
              mode="checkout"
            />
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
