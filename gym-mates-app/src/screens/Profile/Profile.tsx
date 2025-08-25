import { UsersService } from "@api/services";
import { Avatar, Menu, Row, Typography } from "@components/atoms";
import { ScreenWrapper } from "@components/molecules";
import {
  AppRoutes,
  ScreenProps,
  TRootStackParamList,
} from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NotifierActions, UserActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { useMutation } from "@tanstack/react-query";
import { Colors } from "@theme";
import React, { useMemo, useState } from "react";
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
import { Asset } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import S from "./Profile.styles";
import { getMessageFromError } from "@utils/handleAxiosError";

const Profile: React.FC<ScreenProps<AppRoutes.Profile>> = ({
  navigation: { navigate },
}) => {
  const { t } = useTranslation();
  const { user } = useSelector((state: StoreState) => state.user);
  const headerHeight = useHeaderHeight();
  const { crews } = useSelector((state: StoreState) => state.crews);
  const [preview, setPreview] = useState<string | undefined>(user?.avatar?.url);

  const crewsCount = useMemo(() => crews.length, [crews]);

  const dispatch = useDispatch<AppDispatch>();

  const { mutate: updateAvatar, isPending } = useMutation({
    mutationFn: UsersService.updateAvatar,
    onSuccess: async (data) => {
      await dispatch(UserActions.fetchCurrentUser());
    },
    onError: (error) => {
      const message = getMessageFromError(error);

      if (message) {
        dispatch(
          NotifierActions.createNotification({
            id: "update-avatar-error",
            type: "error",
            message,
          })
        );
      }
    },
  });

  const onAvatarChange = (file: Asset) => {
    if (file.base64) {
      setPreview(`data:image/jpeg;base64,${file.base64}`);
    }

    updateAvatar(file);
  };

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
          <Avatar
            size={80}
            preview={preview}
            onAvatarChange={onAvatarChange}
            loading={isPending}
            iconSize={40}
          />
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

            <Row gap={6}>
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
                  {crewsCount}
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
              onPress={() => navigate(AppRoutes.UserJourney)}
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
              onPress={() => navigate(AppRoutes.UserInventory)}
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
              onPress={() => navigate(AppRoutes.UserFollows)}
              label="profile.personal.followers"
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
              onPress={() => navigate(AppRoutes.EditProfile)}
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
