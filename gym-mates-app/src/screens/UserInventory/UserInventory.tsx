import { UsersService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Badge, Loader, Row, Typography } from "@components/atoms";
import { ItemCard, ScreenWrapper } from "@components/molecules";
import {
  IGetInventoryFilters,
  IGetInventoryResponse,
  ItemCategory,
} from "@models/collections";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { UserInventoryActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import React, { useEffect, useMemo } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import S from "./UserInventory.styles";

const UserInventory: React.FC<ScreenProps<AppRoutes.UserInventory>> = () => {
  const headerHeight = useHeaderHeight();
  const { user } = useSelector((state: StoreState) => state.user);
  const { filters } = useSelector((state: StoreState) => state.userInventory);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      UserInventoryActions.setFilters({ journeyId: user?.journey._id || "" })
    );
  }, []);

  const { data, loading, error } = useQuery<
    IGetInventoryResponse,
    IGetInventoryFilters
  >(UsersService.gql.GET_INVENTORY, {
    variables: filters,
    fetchPolicy: "cache-and-network",
  });

  const isEmpty = useMemo(
    () => data?.journeyById.inventory.length === 0,
    [data]
  );

  const inventory = useMemo(() => data?.journeyById.inventory || [], [data]);

  const setAchievementsFilter = (category: ItemCategory) => {
    dispatch(
      UserInventoryActions.setFilters({
        category: filters?.category !== category ? category : undefined,
      })
    );
  };

  return (
    <ScreenWrapper>
      <S.Container style={{ paddingTop: headerHeight + 24 }}>
        <S.Header>
          <Typography.Heading _t>{"inventory.title"}</Typography.Heading>

          <Row gap={12}>
            <Badge
              touchable
              _t
              label="inventory.filters.achievements"
              active={filters?.category === ItemCategory.Achievement}
              onPress={() => setAchievementsFilter(ItemCategory.Achievement)}
            ></Badge>

            <Badge
              touchable
              _t
              label="inventory.filters.badges"
              active={filters?.category === ItemCategory.Badge}
              onPress={() => setAchievementsFilter(ItemCategory.Badge)}
            ></Badge>
          </Row>
        </S.Header>

        <S.List
          contentContainerStyle={{
            gap: 24,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {inventory.map((inventoryItem) => (
            <ItemCard
              key={inventoryItem.item._id}
              item={inventoryItem.item}
              mode="view"
              itemsPerRow={3}
            />
          ))}

          {isEmpty && (
            <Row justify="center">
              <Typography.Body textColor="textLight" _t>
                {"inventory.empty"}
              </Typography.Body>
            </Row>
          )}

          {loading && (
            <View style={{ flex: 1 }}>
              <Loader color="primary" />
            </View>
          )}
        </S.List>
      </S.Container>
    </ScreenWrapper>
  );
};

export default UserInventory;
