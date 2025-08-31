import { Badge, Card, Loader, Row, Typography } from "@components/atoms";
import { ScreenWrapper } from "@components/molecules";
import {
  AppRoutes,
  ScreenProps,
  TRootStackParamList,
} from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StoreState } from "@store/Store";
import { Colors } from "@theme";
import React, { useState } from "react";
import { View } from "react-native";
import {
  ArrowDown,
  ArrowRight,
  Code,
  Frown,
  Star,
  User,
} from "react-native-feather";
import { useSelector } from "react-redux";
import S from "./Crews.styles";
import {
  ICrew,
  ICrewsResponse,
  ICrewsByMemberFilters,
} from "@models/collections";
import BannerPreview from "@components/atoms/BannerPreview/BannerPreview";
import { useQuery } from "@apollo/client";
import { CrewsService } from "@api/services";

const Crews: React.FC<ScreenProps<AppRoutes.Crews>> = ({
  navigation: { navigate },
}) => {
  const { user } = useSelector((state: StoreState) => state.user);
  const { bottomNavHeight } = useSelector((state: StoreState) => state.config);
  const headerHeight = useHeaderHeight();

  const [filters, setFilters] = useState<ICrewsByMemberFilters>({
    userId: user?._id,
  });

  const { loading: loadingUserCrews, data: crewsData } = useQuery<
    ICrewsResponse,
    ICrewsByMemberFilters
  >(CrewsService.gql.CREWS_BY_MEMBER, {
    variables: filters,
    fetchPolicy: "cache-and-network",
  });

  const navigateToCrew = (crew: ICrew) => {
    navigate(AppRoutes.CrewView, { crew });
  };

  const isFavorite = (crewId: string): boolean => {
    return !!user?.favorites?.includes(crewId);
  };

  const setMineFilter = () => {
    if (filters.created_by) {
      setFilters({ ...filters, created_by: undefined });
    } else {
      setFilters({ ...filters, created_by: user?._id });
    }
  };

  const setFavoritesFilter = () => {
    if (filters.favorites) {
      setFilters({ ...filters, favorites: undefined });
    } else {
      setFilters({ ...filters, favorites: user?.favorites });
    }
  };

  return (
    <ScreenWrapper>
      <S.Container
        style={{ padding: 24, paddingTop: headerHeight + 24, gap: 24 }}
      >
        <View style={{ gap: 12 }}>
          <Typography.Heading fontWeight="medium" _t>
            {"crews.title"}
          </Typography.Heading>

          <Row gap={12} align="center">
            <S.FilterBadge
              label="crews.filters.mine"
              _t
              touchable
              onPress={setMineFilter}
              active={!!filters.created_by}
            />
            {user?.favorites && user?.favorites?.length > 0 && (
              <S.FilterBadge
                label="crews.filters.favorites"
                _t
                touchable
                onPress={setFavoritesFilter}
                active={!!filters.favorites}
              />
            )}
          </Row>
        </View>

        <S.ScrollList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 24,
            paddingBottom: bottomNavHeight + 24,
          }}
        >
          {crewsData?.crews.map((crew, index) => (
            <S.CrewCard
              key={index}
              touchable
              onPress={() => navigateToCrew(crew)}
            >
              <Row justify="space-between" align="center">
                <Row gap={12} align="center" width="auto">
                  <BannerPreview
                    preview={crew.banner?.url}
                    size={48}
                    iconSize={20}
                  />

                  <View style={{ gap: 6 }}>
                    <Typography.Body textColor="primary" _t>
                      {crew.name}
                    </Typography.Body>

                    <Row gap={12} align="center">
                      <Row gap={3} align="center" width={"auto"}>
                        <Code
                          width={16}
                          height={16}
                          stroke={Colors.colors.text}
                        />
                        <Typography.Caption textColor="text">
                          {crew.code}
                        </Typography.Caption>
                      </Row>
                      <Row gap={3} align="center" width={"auto"}>
                        <User
                          width={16}
                          height={16}
                          stroke={Colors.colors.text}
                          fill={Colors.colors.text}
                          fillOpacity={0.2}
                        />
                        <Typography.Caption textColor="text">
                          {crew.members_w_user.length}
                        </Typography.Caption>
                      </Row>
                      {isFavorite(crew._id) && (
                        <Star
                          width={16}
                          height={16}
                          stroke={Colors.colors.secondary}
                          fill={Colors.colors.secondary}
                          fillOpacity={0.2}
                        />
                      )}
                    </Row>
                  </View>
                </Row>
                <ArrowRight
                  width={24}
                  height={24}
                  stroke={Colors.colors.primary}
                />
              </Row>
            </S.CrewCard>
          ))}

          {crewsData?.crews.length === 0 && (
            <Card
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              gap={6}
            >
              <Frown
                width={24}
                height={24}
                stroke={Colors.colors.text}
                fill={Colors.colors.text}
                fillOpacity={0.2}
              />

              <Typography.Body textColor="text" _t>
                {"crews.empty"}
              </Typography.Body>
            </Card>
          )}

          {loadingUserCrews && <Loader color="primary" />}
        </S.ScrollList>
      </S.Container>
    </ScreenWrapper>
  );
};

export default Crews;
