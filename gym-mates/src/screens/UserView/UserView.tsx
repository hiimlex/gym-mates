import { UsersService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Avatar, Row, Typography } from "@components/atoms";
import { IUserByIdResponse } from "@models/collections";
import { AppRoutes, TRootStackParamList } from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Colors } from "@theme";
import { t } from "i18next";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
import ScreenWrapper from "../../components/molecules/ScreenWrapper/ScreenWrapper";
import S from "./styles";

const UserView: React.FC<
  NativeStackScreenProps<TRootStackParamList, AppRoutes.UserView>
> = ({ route }) => {
  const userId = route.params.userId;
  console.log("UserView userId:", userId);
  const headerHeight = useHeaderHeight();

  const { data } = useQuery<IUserByIdResponse, { _id: string }>(
    UsersService.gql.USER_BY_ID,
    {
      variables: { _id: userId },
      fetchPolicy: "cache-and-network",
    }
  );

  const user = useMemo(() => data?.userById, [data]);

  if (!user) {
    return (
      <ScreenWrapper>
        <View style={{ padding: 20 }}>
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
          <Avatar size={80} preview={data?.userById.avatar?.url} />
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
      </S.Container>
    </ScreenWrapper>
  );
};

export default UserView;
