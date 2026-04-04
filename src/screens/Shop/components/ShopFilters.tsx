import { Typography } from "@components/atoms";
import { Colors } from "@theme";
import { ArrowDown, ArrowUp, Grid, List } from "react-native-feather";

import { IShopFilters, IShopListView, SkinSex } from "@models/collections";
import { AppDispatch, StoreState } from "@store/Store";
import { ShopActions } from "@store/slices";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import S from "../Shop.styles";

interface ShopFiltersProps {
  showLockedItems: () => void;
  filters?: IShopFilters;
}

export default function ShopFilters() {
  const { view, filters } = useSelector((state: StoreState) => state.shop);
  const dispatch = useDispatch<AppDispatch>();

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

  const changeSexFilter = () => {
    let newSexFilterValue: IShopFilters["sex"] = filters?.sex;

    if (!newSexFilterValue) {
      newSexFilterValue = SkinSex.male;
    } else if (newSexFilterValue === SkinSex.male) {
      newSexFilterValue = SkinSex.female;
    } else {
      newSexFilterValue = undefined;
    }

    dispatch(ShopActions.setFilters({ sex: newSexFilterValue }));
  };

  const showLockedItems = () => {
    dispatch(ShopActions.setFilters({ locked: !filters?.locked }));
  };

  const hasPriceFilter = useMemo(
    () => filters?.price_sort !== undefined,
    [filters?.price_sort],
  );

  return (
    <S.HorizontalScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
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
      <S.FiltersBadge touchable onPress={sortByCost} active={hasPriceFilter}>
        <Typography.Button textColor={hasPriceFilter ? "white" : "text"} _t>
          {"shop.filters.cost"}
        </Typography.Button>

        {filters?.price_sort && filters.price_sort === "PRICE_DESC" && (
          <ArrowDown
            width={14}
            height={14}
            stroke={hasPriceFilter ? Colors.colors.white : Colors.colors.text}
            strokeWidth={2}
          />
        )}

        {filters?.price_sort && filters.price_sort === "PRICE_ASC" && (
          <ArrowUp
            width={14}
            height={14}
            stroke={hasPriceFilter ? Colors.colors.white : Colors.colors.text}
            strokeWidth={2}
          />
        )}
      </S.FiltersBadge>

      <S.FiltersBadge
        touchable
        onPress={changeSexFilter}
        active={!!filters?.sex}
      >
        <Typography.Button textColor={!!filters?.sex ? "white" : "text"} _t>
          {!!filters?.sex
            ? `itemSex.${filters.sex.toLocaleLowerCase()}`
            : "shop.filters.sex"}
        </Typography.Button>
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
  );
}
