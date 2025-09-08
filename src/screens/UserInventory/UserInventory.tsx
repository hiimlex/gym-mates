import { UsersService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Badge, Loader, Row, Typography } from "@components/atoms";
import {
  calculateMediaSize,
  ItemCard,
  ScreenWrapper,
} from "@components/molecules";
import {
  IGetInventoryFilters,
  IGetInventoryResponse,
  IItem,
  ItemCategory,
} from "@models/collections";
import { OverlayType } from "@models/generic";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { OverlayActions, UserInventoryActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import React, { useMemo } from "react";
import { useWindowDimensions, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import S from "./UserInventory.styles";

const UserInventory: React.FC<ScreenProps<AppRoutes.UserInventory>> = () => {
  const { width } = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const { user } = useSelector((state: StoreState) => state.user);
  const { filters } = useSelector((state: StoreState) => state.userInventory);
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading } = useQuery<
    IGetInventoryResponse,
    IGetInventoryFilters
  >(UsersService.gql.GET_INVENTORY, {
    variables: { journeyId: user?.journey._id || "", ...filters },
    fetchPolicy: "network-only",
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

  const handleOnItemPress = (item: IItem) => {
    dispatch(
      OverlayActions.show({
        type: OverlayType.ItemPreview,
        data: { item },
      })
    );
  };

  const mediaSize = useMemo(
    () => calculateMediaSize(width, 3, "grid", 6, 0, 24),
    [width]
  );

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
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 24,
          }}
          showsVerticalScrollIndicator={false}
        >
          {inventory.map((inventoryItem) => (
            <ItemCard.View
              key={inventoryItem.item._id}
              item={inventoryItem.item}
              itemsPerRow={2}
              itemsGap={12}
              mediaSize={mediaSize}
              touchableImage
              onImagePress={() => handleOnItemPress(inventoryItem.item)}
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
