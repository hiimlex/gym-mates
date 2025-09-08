import { UsersService, WorkoutService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Avatar, Loader, Row, Tabs, Typography } from "@components/atoms";
import { ItemCard, WorkoutInfo } from "@components/molecules";
import { useNavigationContainerRef } from "@hooks/useNavigationContainer/useNavigationContainer";
import {
  IGetInventoryFilters,
  IGetInventoryResponse,
  IItem,
  ItemCategory,
  IUserByIdResponse,
  IWorkoutsByUser,
  IWorkoutsFilters,
} from "@models/collections";
import { OverlayType, TabHeader } from "@models/generic";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { OverlayActions } from "@store/slices";
import { Colors } from "@theme";
import { t } from "i18next";
import React, { useEffect, useMemo, useRef } from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import ScreenWrapper from "../../components/molecules/ScreenWrapper/ScreenWrapper";
import S from "./UserView.styles";

const UserView: React.FC<ScreenProps<AppRoutes.UserView>> = ({ route }) => {
  const userId = route.params.userId;
  const headerHeight = useHeaderHeight();
  const pagerRef = useRef(null);

  const { data: userData } = useQuery<IUserByIdResponse, { _id: string }>(
    UsersService.gql.USER_BY_ID,
    {
      variables: { _id: userId },
      fetchPolicy: "cache-and-network",
    }
  );
  const user = useMemo(() => userData?.userById, [userData]);

  const { data: workoutsData, loading: loadingUserWorkouts } = useQuery<
    IWorkoutsByUser,
    IWorkoutsFilters
  >(WorkoutService.gql.WORKOUTS_BY_USER, {
    variables: { userId, sort: "DATE_DESC" },
    fetchPolicy: "cache-and-network",
  });

  const { data: achievementsData, loading: loadingAchievements } = useQuery<
    IGetInventoryResponse,
    IGetInventoryFilters
  >(UsersService.gql.GET_INVENTORY, {
    variables: {
      journeyId: user?.journey._id || "",
      category: ItemCategory.Achievement,
    },
    fetchPolicy: "cache-and-network",
  });

  const tabsHeader: TabHeader[] = [
    {
      title: "userView.tabs.activities",
      key: 0,
    },
    {
      title: "userView.tabs.achievements",
      key: 1,
    },
  ];

  const dispatch = useDispatch();
  const showImageViewerOnPress = (initialIndex: number) => {
    dispatch(
      OverlayActions.show({
        type: OverlayType.WorkoutImageViewer,
        data: {
          workouts: workoutsData?.workouts || [],
          initialIndex,
        },
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

  if (!user) {
    return (
      <ScreenWrapper>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Typography.Body textColor="text" fontWeight="semibold">
            {t("userView.loading")}
          </Typography.Body>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <S.Container style={{ paddingTop: headerHeight + 24 }}>
        <Row gap={12} align="center">
          <Avatar size={80} preview={user.avatar?.url} disabled />
          <View style={{ gap: 12 }}>
            <View style={{ gap: 6 }}>
              <Typography.Heading fontWeight="medium">
                {user.name}
              </Typography.Heading>

              <Text
                style={{
                  fontWeight: "500",
                  fontStyle: "italic",
                  color: Colors.colors.primary,
                }}
              >
                {t(
                  user?.title
                    ? `items.title.${user?.title?.name}`
                    : "items.title.noTitle"
                )}
              </Text>
            </View>

            <Row gap={12}>
              <View style={{ gap: 6 }}>
                <Typography.Tip _t textColor="textLight" fontWeight="medium">
                  {"profile.followers"}
                </Typography.Tip>
                <Typography.Button textColor="text" fontWeight="semibold">
                  {user.followers?.length || 0}
                </Typography.Button>
              </View>
              <View style={{ gap: 6 }}>
                <Typography.Tip _t textColor="textLight" fontWeight="medium">
                  {"profile.following"}
                </Typography.Tip>
                <Typography.Button textColor="text" fontWeight="semibold">
                  {user.following?.length || 0}
                </Typography.Button>
              </View>
              <View style={{ gap: 6 }}>
                <Typography.Tip _t textColor="textLight" fontWeight="medium">
                  {"profile.crews"}
                </Typography.Tip>
                <Typography.Button textColor="text" fontWeight="semibold">
                  {user.crews_count || 0}
                </Typography.Button>
              </View>
              <View style={{ gap: 6 }}>
                <Typography.Tip _t textColor="textLight" fontWeight="medium">
                  {"profile.streak"}
                </Typography.Tip>
                <Typography.Button textColor="text" fontWeight="semibold">
                  {user.day_streak} {t("units.days")}
                </Typography.Button>
              </View>
            </Row>
          </View>
        </Row>

        <Tabs.Root pagerRef={pagerRef} initialPage={0} header={tabsHeader}>
          <Tabs.Item key={0} contentContainerStyle={{ gap: 12 }}>
            {workoutsData?.workouts.map((workout, index) => (
              <WorkoutInfo
                key={workout._id}
                workout={workout}
                showCrewName
                showImageViewerOnPress
                onImagePress={() => showImageViewerOnPress(index)}
              ></WorkoutInfo>
            ))}
            {loadingUserWorkouts && <Loader color="primary" />}
            {!loadingUserWorkouts && workoutsData?.workouts.length === 0 && (
              <Typography.Body textColor="textLight" _t>
                {"userView.noWorkouts"}
              </Typography.Body>
            )}
          </Tabs.Item>
          <Tabs.Item
            key={1}
            contentContainerStyle={{
              gap: 24,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {achievementsData?.journeyById.inventory.map((achievement) => (
              <ItemCard.View
                item={achievement.item}
                key={achievement.item._id}
                itemsPerRow={3}
                touchableImage
                onImagePress={() => handleOnItemPress(achievement.item)}
              />
            ))}
            {loadingAchievements && <Loader color="primary" />}
            {!loadingAchievements &&
              achievementsData?.journeyById.inventory.length === 0 && (
                <Typography.Body textColor="textLight" _t>
                  {"userView.noAchievements"}
                </Typography.Body>
              )}
          </Tabs.Item>
        </Tabs.Root>
      </S.Container>
    </ScreenWrapper>
  );
};

export default UserView;
