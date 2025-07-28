import { CrewsService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Menu, Row, Typography } from "@components/atoms";
import { ScreenWrapper } from "@components/molecules";
import { CachedImage } from "@georstat/react-native-image-cache";
import { ICrewsByMember } from "@models/collections";
import { AppRoutes, TRootStackParamList } from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppDispatch, StoreState } from "@store/store";
import { Colors } from "@theme";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  Award,
  Edit,
  LogOut,
  Map,
  Settings,
  Smile,
} from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import S from "./styles";
import { UserActions } from "@store/slices";

const Profile: React.FC<
  NativeStackScreenProps<TRootStackParamList, AppRoutes.Profile>
> = ({ navigation: { navigate } }) => {
  const { t } = useTranslation();
  const { user } = useSelector((state: StoreState) => state.user);
  const headerHeight = useHeaderHeight();
  const [crewsCount, setCrewsCount] = useState(0);

  const dispatch = useDispatch<AppDispatch>();

  useQuery<ICrewsByMember>(CrewsService.CrewsByMember, {
    variables: { member: user?._id },
    onCompleted: (data) => {
      setCrewsCount(data.crews.length);
    },
    onError: (error) => {
      // console.error("Error fetching crews:", { ...error });
    },
  });

  const logout = async () => {
    await dispatch(UserActions.logout());

    navigate(AppRoutes.Login);
  };

  if (!user) {
    return null;
  }
  return (
    <ScreenWrapper>
      <S.Container
        style={{ padding: 24, paddingTop: headerHeight + 24 }}
        contentContainerStyle={{ gap: 24 }}
      >
        <Row align="flex-start" gap={18}>
          <View style={{ width: 80, height: 80 }}>
            {user && user?.avatar && typeof user?.avatar !== "string" && (
              <CachedImage
                style={{ width: 80, height: 80 }}
                imageStyle={{
                  borderRadius: 40,
                  borderWidth: 1,
                  borderColor: Colors.colors.border,
                }}
                source={user.avatar.url}
              />
            )}
          </View>
          <View style={{ gap: 12 }}>
            <View style={{ gap: 6 }}>
              <Typography.Heading fontWeight="medium">
                {user.name}
              </Typography.Heading>

              {user.title && (
                <Text
                  style={{
                    fontWeight: "500",
                    fontStyle: "italic",
                    color: Colors.colors.primary,
                  }}
                >
                  {user.title.title}
                </Text>
              )}
            </View>

            <Row gap={12}>
              <View style={{ gap: 6 }}>
                <Typography.Caption
                  _t
                  textColor="textLight"
                  fontWeight="medium"
                >
                  {"profile.friends"}
                </Typography.Caption>
                <Typography.Body textColor="text" fontWeight="semibold">
                  {user.friends?.length}
                </Typography.Body>
              </View>
              <View style={{ gap: 6 }}>
                <Typography.Caption
                  _t
                  textColor="textLight"
                  fontWeight="medium"
                >
                  {"profile.crews"}
                </Typography.Caption>
                <Typography.Body textColor="text" fontWeight="semibold">
                  {crewsCount}
                </Typography.Body>
              </View>
              <View style={{ gap: 6 }}>
                <Typography.Caption
                  _t
                  textColor="textLight"
                  fontWeight="medium"
                >
                  {"profile.streak"}
                </Typography.Caption>
                <Typography.Body textColor="text" fontWeight="semibold">
                  {user.day_streak} {t("units.days")}
                </Typography.Body>
              </View>
            </Row>
          </View>
        </Row>
        <View style={{ gap: 12 }}>
          <Typography.Body textColor="textDark" _t>
            {"profile.personal.title"}
          </Typography.Body>
          <Menu.Root>
            <Menu.Item
              icon={
                <Map
                  width={20}
                  height={20}
                  fill={Colors.colors.text}
                  stroke={Colors.colors.text}
                  fillOpacity={0.2}
                />
              }
              onPress={() => {}}
              label="profile.personal.journey"
              _t
            ></Menu.Item>
            <Menu.Item
              icon={
                <Award
                  width={20}
                  height={20}
                  fill={Colors.colors.text}
                  stroke={Colors.colors.text}
                  fillOpacity={0.2}
                />
              }
              onPress={() => {}}
              label="profile.personal.inventory"
              _t
            ></Menu.Item>
            <Menu.Item
              icon={
                <Smile
                  width={20}
                  height={20}
                  fill={Colors.colors.text}
                  stroke={Colors.colors.text}
                  fillOpacity={0.2}
                />
              }
              onPress={() => {}}
              label="profile.personal.friends"
              _t
              isLast
            ></Menu.Item>
          </Menu.Root>
        </View>
        <View style={{ gap: 12 }}>
          <Typography.Body textColor="textDark" _t>
            {"profile.settings.title"}
          </Typography.Body>
          <Menu.Root>
            <Menu.Item
              icon={
                <Edit
                  width={20}
                  height={20}
                  fill={Colors.colors.text}
                  stroke={Colors.colors.text}
                  fillOpacity={0.2}
                />
              }
              onPress={() => {}}
              label="profile.settings.edit"
              _t
            ></Menu.Item>
            <Menu.Item
              icon={
                <Settings
                  width={20}
                  height={20}
                  fill={Colors.colors.text}
                  stroke={Colors.colors.text}
                  fillOpacity={0.2}
                />
              }
              onPress={() => {}}
              label="profile.settings.settings"
              _t
            ></Menu.Item>
            <Menu.Item
              icon={
                <LogOut
                  width={20}
                  height={20}
                  fill={Colors.colors.text}
                  stroke={Colors.colors.text}
                  fillOpacity={0.2}
                />
              }
              onPress={logout}
              label="profile.settings.logout"
              _t
              isLast
            ></Menu.Item>
          </Menu.Root>
        </View>
      </S.Container>
    </ScreenWrapper>
  );
};

export default Profile;
