import { Row, Typography } from "@components/atoms";
import { ShopActions } from "@store/slices";
import { StoreState } from "@store/Store";
import { Colors } from "@theme";
import React, { useMemo } from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { CameraOff, Minus, Plus } from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Header/Header";
import { calculateMediaSize, Dot, ItemCardProps } from "../ItemCard.utils";
import S from "./ItemCardVariations.styles";

const ItemCardBuy: React.FC<Omit<ItemCardProps, "mode">> = ({
  item,
  forcedView,
  disabled = false,
  itemsPerRow = 2,
  touchableImage = false,
  onImagePress,
}) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const {
    cart,
    view: stateView,
    cartItemsSum,
  } = useSelector((state: StoreState) => state.shop);

  const view = useMemo(() => {
    if (forcedView) {
      return forcedView;
    }

    return stateView;
  }, [forcedView, stateView]);

  const mediaSize = useMemo(
    () => calculateMediaSize(width, itemsPerRow, 24, 24, view),
    [view, itemsPerRow]
  );

  const isOnCart = useMemo(
    () => cart?.some((i) => i._id === item?._id),
    [cart]
  );

  const addToCart = () => {
    dispatch(ShopActions.addItemToCard(item));
  };

  const removeFromCart = () => {
    dispatch(ShopActions.removeItemFromCart(item));
  };

  const isGridView = useMemo(() => view === "grid", [view]);

  return (
    <S.Container view={view}>
      {!item.locked && (
        <S.FloatingAdd
          activeOpacity={1}
          onPress={isOnCart ? removeFromCart : addToCart}
          isOnCart={isOnCart}
          disabled={disabled && !isOnCart}
          isGridView={isGridView}
        >
          {isOnCart && (
            <Minus width={20} height={20} stroke={Colors.colors.white} />
          )}
          {!isOnCart && (
            <Plus
              width={20}
              height={20}
              stroke={disabled ? Colors.colors.text : Colors.colors.white}
            />
          )}
        </S.FloatingAdd>
      )}

      <S.MediaWrapper size={mediaSize}>
        {item.preview?.url && (
          <TouchableOpacity
            style={{ width: "100%", height: "100%" }}
            disabled={!touchableImage}
            activeOpacity={0.6}
            onPress={() => onImagePress?.(item)}
          >
            <S.MediaImage source={item.preview?.url} onError={() => {}} />
          </TouchableOpacity>
        )}
        {!item.preview?.url && (
          <CameraOff
            width={mediaSize / 4}
            height={mediaSize / 4}
            stroke={Colors.colors.border}
            fill={Colors.colors.border}
            fillOpacity={0.2}
            strokeWidth={2}
          />
        )}
      </S.MediaWrapper>

      <S.Info
        style={{
          flex: 1,
          gap: 6,
        }}
      >
        <Row align="center" justify="space-between" width={"auto"}>
          <Typography.Body>{item.name}</Typography.Body>

          <Header.Coins
            size={6}
            textVariant="button"
            coinValue={item.price.toString()}
            disabled
            textColor="tertiary"
          />
        </Row>

        <Row gap={3} align="center" style={{ flexWrap: "wrap", flex: 1 }}>
          <Typography.Caption
            textColor="textLight"
            _t
          >{`itemCategoryTypes.${item.category}`}</Typography.Caption>
          {item.sex && (
            <>
              <Dot />
              <Typography.Caption
                textColor="textLight"
                _t
              >{`itemSex.${item.sex}`}</Typography.Caption>
            </>
          )}
        </Row>
      </S.Info>
    </S.Container>
  );
};

export default ItemCardBuy;
