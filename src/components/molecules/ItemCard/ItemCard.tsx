import { Badge, Button, Row, Typography } from "@components/atoms";
import React, { useMemo } from "react";
import S from "./ItemCard.styles";
import { useWindowDimensions } from "react-native";
import Header from "../Header/Header";
import { IItem, ItemCategory } from "@models/collections";
import { CameraOff, Lock } from "react-native-feather";
import { Colors } from "@theme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreState } from "@store/Store";
import { ShopActions } from "@store/slices";

interface ItemCardProps {
  item: IItem;
  forcedView?: "grid" | "list";
  disabled?: boolean;
  mode?: "view" | "buy" | "checkout";
  itemsPerRow?: number;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  forcedView,
  disabled = false,
  mode = "buy",
  itemsPerRow = 2,
}) => {
  const { width } = useWindowDimensions();

  const dispatch = useDispatch<AppDispatch>();

  const { cart, view: stateView } = useSelector(
    (state: StoreState) => state.shop
  );

  const view = useMemo(() => {
    if (forcedView) {
      return forcedView;
    }

    return stateView;
  }, [forcedView, stateView]);

  const paddings = 24;
  const mediaSize = useMemo(() => {
    if (view === "grid") {
      return width / itemsPerRow - paddings - 12;
    }

    if (view === "list") {
      return 70;
    }

    return 0;
  }, [view, itemsPerRow]);

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
  const isListView = useMemo(() => view === "list", [view]);

  return (
    <S.Container
      view={view}
      locked={item.locked}
      style={{ width: isGridView ? mediaSize : "100%" }}
    >
      <S.MediaWrapper size={mediaSize}>
        {item.preview?.url && (
          <S.MediaImage source={item.preview.url} onError={() => {}} />
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
        {isGridView && !item.locked && mode === "buy" && (
          <S.FloatingPrice>
            <Header.Coins
              size={6}
              textVariant="button"
              coinValue={item.price.toString()}
              disabled
              textColor="tertiary"
            />
          </S.FloatingPrice>
        )}
      </S.MediaWrapper>
      <Row
        justify="space-between"
        align={!item.locked && isGridView ? "flex-end" : "center"}
        width={isListView ? "75%" : "100%"}
      >
        {/* Only View mode */}
        {mode === "view" && (
          <S.Info
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography.Button textAlign="center">{item.name}</Typography.Button>
            {!item.locked && isListView && (
              <Header.Coins
                size={8}
                textVariant="button"
                coinValue={item?.price.toString()}
                disabled
              />
            )}
            <Typography.Tip
              textColor="textLight"
              _t
            >{`itemCategoryTypes.${item.category}`}</Typography.Tip>
          </S.Info>
        )}

        {/* Buy view mode */}
        {mode === "buy" && (
          <>
            <S.Info>
              <Typography.Typography
                variant={isGridView ? "button" : "headingSubtitle"}
              >
                {item.name}
              </Typography.Typography>
              {!item.locked && isListView && mode === "buy" && (
                <Header.Coins
                  size={8}
                  textVariant="button"
                  coinValue={item?.price.toString()}
                  disabled
                />
              )}
              <Typography.Tip
                textColor="textLight"
                _t
              >{`itemCategoryTypes.${item.category}`}</Typography.Tip>
            </S.Info>
            <S.Info>
              {/* Add button */}
              {!item.locked && !isOnCart && (
                <S.CardButton
                  colorScheme="primary"
                  activeOpacity={0.6}
                  onPress={addToCart}
                  disabled={disabled}
                >
                  <Typography.Tip textColor="white" _t>
                    {"shop.add"}
                  </Typography.Tip>
                </S.CardButton>
              )}
              {/* Remove button */}
              {!item.locked && isOnCart && (
                <S.CardButton
                  activeOpacity={0.6}
                  onPress={removeFromCart}
                  colorScheme="danger"
                >
                  <Typography.Tip textColor="white" _t>
                    {"shop.remove"}
                  </Typography.Tip>
                </S.CardButton>
              )}
              {/* Lock item */}
              {item.locked && (
                <Lock
                  width={20}
                  height={20}
                  stroke={Colors.colors.text}
                  fill={Colors.colors.text}
                  fillOpacity={0.2}
                />
              )}
            </S.Info>
          </>
        )}

        {/* Checkout mode */}
        {mode === "checkout" && (
          <>
            <S.Info>
              <Typography.Button>{item.name}</Typography.Button>
              <Typography.Tip
                textColor="textLight"
                _t
              >{`itemCategoryTypes.${item.category}`}</Typography.Tip>
            </S.Info>
            <S.Info>
              <Header.Coins
                size={8}
                textVariant="button"
                coinValue={"-" + item?.price.toString()}
                textColor="danger"
                disabled
              />
            </S.Info>
          </>
        )}
      </Row>
    </S.Container>
  );
};

export default ItemCard;
