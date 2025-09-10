import { IItem } from "@models/collections";
import { StoreState } from "@store/Store";
import React, { useEffect, useMemo, useState } from "react";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import S from "./ItemPreview.styles";
import { Button, Card, Coin, Row, Typography } from "@components/atoms";
import { ArrowLeft, Circle, Code, Eye, Lock, X } from "react-native-feather";
import { Colors } from "@theme";
import { OverlayActions, ShopActions } from "@store/slices";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Easing,
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";
import { BlurProps } from "@models/generic";
import { Dot } from "../../molecules";

interface ItemPreviewProps {}

const ItemPreview: React.FC<ItemPreviewProps> = () => {
  const { data } = useSelector((state: StoreState) => state.overlay);
  const item = useMemo(() => data?.item, [data]);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { cart, cartItemsSum } = useSelector((state: StoreState) => state.shop);
  const { user } = useSelector((state: StoreState) => state.user);

  const [count, setCount] = useState(0);
  const countLimit = 10;

  const userCannotAfford = useMemo(() => {
    if (!item) return false;
    const itemPrice = item.price || 0;
    if (cartItemsSum + itemPrice > (user?.coins || 0)) {
      return true;
    }
  }, [cartItemsSum, item, user]);

  const isOnCart = useMemo(
    () => cart.some((ci) => ci._id === item?._id),
    [cart, item]
  );

  const showRequirements = useMemo(
    () => count === countLimit,
    [count, countLimit]
  );

  const dispatch = useDispatch();

  const close = () => {
    dispatch(OverlayActions.hide());
  };

  const addToCart = () => {
    if (item) {
      dispatch(ShopActions.addItemToCard(item));
    }
  };

  const removeFromCart = () => {
    if (item) {
      dispatch(ShopActions.removeItemFromCart(item));
    }
  };

  const incrementCount = () => {
    if (item?.requirements.length === 0) return;

    if (count < countLimit) {
      setCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (showRequirements) {
      setTimeout(() => {
        setCount(0);
      }, 3000);
    }
  }, [showRequirements]);

  return (
    <S.FloatingBlur
      style={{
        width,
        height,
        paddingTop: insets.top + 24,
        paddingBottom: insets.bottom + 48,
      }}
      {...BlurProps}
      entering={FadeIn}
      exiting={FadeOut.easing(Easing.inOut(Easing.ease))}
    >
      <Row gap={12} align="center">
        <TouchableOpacity activeOpacity={0.6} onPress={close}>
          <X stroke={Colors.colors.white} />
        </TouchableOpacity>
        <Typography.HeadingSubtitle textColor="white" _t>
          {"itemViewer.title"}
        </Typography.HeadingSubtitle>
      </Row>

      <S.ExpandedContent>
        <S.MediaWrapper size={height * 0.4}>
          <S.ItemPreview source={item?.preview?.url || ""} onError={() => {}} />
        </S.MediaWrapper>

        <S.ItemInfo>
          <S.InfoGroup>
            <Typography.Heading textColor="white">
              {item?.name}
            </Typography.Heading>
            <Row gap={6} align="center">
              <Typography.Body
                textColor="disabled"
                _t
              >{`itemCategoryTypes.${item?.category}`}</Typography.Body>
              {item?.sex && (
                <>
                  <Dot />
                  <Typography.Body
                    textColor="disabled"
                    _t
                  >{`itemSex.${item.sex}`}</Typography.Body>
                </>
              )}
            </Row>
          </S.InfoGroup>
          {!item?.locked ? (
            <Coin
              label={item?.price.toString()}
              textColor="white"
              textVariant="body"
            />
          ) : (
            <S.LockIconWrapper activeOpacity={1} onPress={incrementCount}>
              <Lock
                width={20}
                height={20}
                stroke={Colors.colors.text}
                fill={Colors.colors.text}
                fillOpacity={0.2}
              />
            </S.LockIconWrapper>
          )}
        </S.ItemInfo>

        {!isOnCart && !item?.locked && (
          <Button
            variant="filled"
            colorScheme="primary"
            title="shop.add"
            styles={{ width: "100%" }}
            onPress={addToCart}
            disabled={userCannotAfford}
          />
        )}

        {isOnCart && !item?.locked && (
          <Button
            variant="filled"
            colorScheme="danger"
            title="shop.remove"
            styles={{ width: "100%" }}
            onPress={removeFromCart}
          />
        )}

        {showRequirements && (item?.requirements || []).length > 0 && (
          <S.RequirementsWrapper width={"100%"} entering={FadeInDown} exiting={FadeOutDown}>
            <Eye
              width={20}
              height={20}
              stroke={Colors.colors.white}
              fill={Colors.colors.white}
              fillOpacity={0.2}
            />
            <Row gap={3} align="center">
              <Typography.Body textColor="white" _t>
                {"shop.hint"}
              </Typography.Body>
              <Typography.Body textColor="white">
                {item?.requirements}
              </Typography.Body>
            </Row>
          </S.RequirementsWrapper>
        )}
      </S.ExpandedContent>
    </S.FloatingBlur>
  );
};

export default ItemPreview;
