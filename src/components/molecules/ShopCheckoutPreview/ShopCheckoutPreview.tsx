import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { AppDispatch, StoreState } from "@store/Store";
import React, { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Typography } from "../../atoms";
import Header from "../Header/Header";
import S from "./ShopCheckoutPreview.styles";
import { useRoute } from "@react-navigation/native";
import { AppRoutes } from "@navigation/appRoutes";
import { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShopService } from "@api/services";
import { ShopActions, UserActions } from "@store/slices";
import { QueryKeys } from "@models/generic";

interface ShopCheckoutPreviewProps {}

const ShopCheckoutPreview: React.FC<ShopCheckoutPreviewProps> = () => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { cart, cartItemsSum } = useSelector((state: StoreState) => state.shop);
  const { user } = useSelector((state: StoreState) => state.user);
  const { name } = useRoute();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { goBack } = useAppNavigation();

  const donTHaveEnoughCoins = useMemo(() => {
    return (user?.coins || 0) < cartItemsSum;
  }, [user?.coins, cartItemsSum]);

  const isOnCart = useMemo(() => name === AppRoutes.ShopCart, [name]);

  const { mutate: checkoutItems, isPending } = useMutation({
    mutationFn: async () => {
      const cartItemsIds = cart.map((item) => item._id);
      await ShopService.buy({ cart: cartItemsIds });
    },
    onSuccess: async () => {
      // Handle success logic here
      await dispatch(UserActions.fetchCurrentUser());
      dispatch(ShopActions.reset());
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.Shop.Items],
      });
      goBack();
    },
  });

  if (cart.length === 0) {
    return null;
  }

  return (
    <S.FloatBottomContainer style={{ width }} entering={SlideInDown} exiting={SlideOutDown}>
      <S.BlurBackground
        intensity={15}
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <S.Receipt>
          <Row justify="space-between">
            <Typography.Body _t textColor="text" fontWeight="semibold">
              {"shop.cart.total"}
            </Typography.Body>
            <Header.Coins
              disabled
              size={8}
              textVariant="body"
              coinValue={"-" + cartItemsSum}
              textColor="danger"
            ></Header.Coins>
          </Row>

          {isOnCart && (
            <>
              <Row justify="space-between">
                <Typography.Body textColor="text" _t fontWeight="semibold">
                  {"shop.cart.yourCoins"}
                </Typography.Body>
                <Header.Coins
                  disabled
                  size={8}
                  textVariant="body"
                ></Header.Coins>
              </Row>
              <S.HR />

              <Row justify="space-between">
                <Typography.Body textColor="text" _t fontWeight="semibold">
                  {"shop.cart.yourCoinsAfterPurchase"}
                </Typography.Body>
                <Header.Coins
                  disabled
                  size={8}
                  textVariant="body"
                  coinValue={String((user?.coins || 0) - cartItemsSum)}
                ></Header.Coins>
              </Row>
            </>
          )}
        </S.Receipt>

        {isOnCart && (
          <Button
            title={
              donTHaveEnoughCoins
                ? "shop.cart.notEnoughCoins"
                : "shop.cart.checkout"
            }
            disabled={donTHaveEnoughCoins}
            colorScheme="secondary"
            onPress={checkoutItems}
            loading={isPending}
          />
        )}
      </S.BlurBackground>
    </S.FloatBottomContainer>
  );
};

export default ShopCheckoutPreview;
