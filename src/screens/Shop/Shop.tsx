import { ShopService } from "@api/services";
import { Loader, Row, Typography } from "@components/atoms";
import {
  GridShopGap,
  Header,
  ItemCard,
  ScreenWrapper,
  ShopCheckoutPreview,
} from "@components/molecules";
import { IItem, IShopFilters, IShopListView } from "@models/collections";
import { OverlayType, QueryKeys } from "@models/generic";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { OverlayActions, ShopActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { useQuery } from "@tanstack/react-query";
import { Colors } from "@theme";
import React, { useMemo } from "react";
import { View, ViewStyle } from "react-native";
import { ArrowDown, ArrowUp, Grid, List } from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import S from "./Shop.styles";

const Shop: React.FC<ScreenProps<AppRoutes.Shop>> = ({ navigation }) => {
  const { view, filters, cartItemsSum, cart } = useSelector(
    (state: StoreState) => state.shop
  );
  const { user } = useSelector((state: StoreState) => state.user);
  const headerHeight = useHeaderHeight();
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
    ],
  });

  const scrollStyles: ViewStyle = useMemo(() => {
    const paddingBottom = cart.length === 0 ? 24 : 84;

    if (view === "grid") {
      return {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: GridShopGap,
        paddingBottom,
        paddingTop: 12,
      };
    }

    return {
      flexDirection: "column",
      gap: 12,
      paddingBottom,
    };
  }, [view, cart.length]);

  const items = useMemo(() => data?.data.items || [], [data?.data.items]);

  const changeCurrentView = () => {
    let newView: IShopListView = view === "grid" ? "list" : "grid";
    dispatch(ShopActions.setView(newView));
  };

  const sortByCost = () => {
    let newCostSortValue: IShopFilters["price_sort"] =
      filters?.price_sort === "PRICE_ASC" ? "PRICE_DESC" : undefined;

    if (!newCostSortValue) {
      newCostSortValue = "PRICE_ASC";
    }
    if (filters?.price_sort === "PRICE_DESC") {
      newCostSortValue = undefined;
    }

    dispatch(ShopActions.setFilters({ price_sort: newCostSortValue }));
  };

  const showLockedItems = () => {
    dispatch(ShopActions.setFilters({ locked: !filters?.locked }));
  };

  const hasPriceFilter = useMemo(
    () => filters?.price_sort !== undefined,
    [filters?.price_sort]
  );

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
      })
    );
  };

  return (
    <ScreenWrapper>
      <S.Container style={{ paddingTop: headerHeight + 24 }}>
        <S.Header>
          <Row justify="space-between" align="center">
            <Typography.Heading fontWeight="medium" _t>
              {"shop.title"}
            </Typography.Heading>

            <Header.Coins disabled />
          </Row>

          <S.HorizontalScrollView
            horizontal
            contentContainerStyle={{
              flexDirection: "row",
              gap: 12,
              flexGrow: 1,
            }}
          >
            <S.FiltersBadge
              touchable
              onPress={showLockedItems}
              active={filters?.locked || false}
              _t
              label="shop.filters.all"
            />
            <S.FiltersBadge
              touchable
              onPress={sortByCost}
              active={hasPriceFilter}
            >
              <Typography.Button
                textColor={hasPriceFilter ? "white" : "text"}
                _t
              >
                {"shop.filters.cost"}
              </Typography.Button>

              {filters?.price_sort && filters.price_sort === "PRICE_DESC" && (
                <ArrowDown
                  width={14}
                  height={14}
                  stroke={
                    hasPriceFilter ? Colors.colors.white : Colors.colors.text
                  }
                  strokeWidth={2}
                />
              )}

              {filters?.price_sort && filters.price_sort === "PRICE_ASC" && (
                <ArrowUp
                  width={14}
                  height={14}
                  stroke={
                    hasPriceFilter ? Colors.colors.white : Colors.colors.text
                  }
                  strokeWidth={2}
                />
              )}
            </S.FiltersBadge>

            <S.FiltersBadge touchable onPress={changeCurrentView}>
              {view === "list" && (
                <Grid
                  width={14}
                  height={14}
                  stroke={Colors.colors.text}
                  strokeWidth={2}
                  fill={Colors.colors.text}
                  fillOpacity={0.2}
                />
              )}
              {view === "grid" && (
                <List
                  width={14}
                  height={14}
                  stroke={Colors.colors.text}
                  strokeWidth={2}
                />
              )}
              <Typography.Button textColor="text" _t>
                {view === "grid" ? "shop.filters.list" : "shop.filters.grid"}
              </Typography.Button>
            </S.FiltersBadge>
          </S.HorizontalScrollView>
        </S.Header>

        <S.ItemsScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={scrollStyles}
        >
          {items?.map((item) => (
            <ItemCard.Buy
              item={item}
              key={item._id}
              disabled={userCannotAfford(item.price)}
              touchableImage
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
      </S.Container>
    </ScreenWrapper>
  );
};

export default Shop;
