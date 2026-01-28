import { UsersService } from "@api/services";
import { DonateCard, Menu, Typography } from "@components/atoms";
import { ScreenWrapper, UserProfileHeader } from "@components/molecules";
import { OverlayType } from "@models/generic";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { NotifierActions, OverlayActions, UserActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { useMutation } from "@tanstack/react-query";
import { Colors } from "@theme";
import { getMessageFromError } from "@utils/handleAxiosError";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import {
  Award,
  Edit,
  HelpCircle,
  LogOut,
  Map,
  Settings,
  Smile,
  User,
} from "react-native-feather";
import { Asset } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import S from "./Profile.styles";

const Profile: React.FC<ScreenProps<AppRoutes.Profile>> = ({
  navigation: { navigate },
}) => {
  const { t } = useTranslation();
  const { user } = useSelector((state: StoreState) => state.user);
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
          }),
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

  const showSelectTitleOverlay = () => {
    dispatch(OverlayActions.show({ type: OverlayType.UserSelectTitle }));
  };

  if (!user) {
    return null;
  }
  return (
    <ScreenWrapper useHeaderHeight>
      <S.Container
        contentContainerStyle={{ gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <UserProfileHeader
          user={user}
          isLoading={isPending}
          onAvatarChange={onAvatarChange}
          onShowSelectTitlePress={showSelectTitleOverlay}
          crewsCount={crewsCount}
          preview={preview}
        />
        {/* Profile Menu */}
        <View style={{ gap: 12 }}>
          <Typography.Body textColor="textDark" _t>
            {"profile.personal.title"}
          </Typography.Body>
          <Menu.Root>
            <Menu.Item
              icon={
                <User
                  width={20}
                  height={20}
                  fill={Colors.colors.text}
                  stroke={Colors.colors.text}
                  fillOpacity={0.2}
                />
              }
              onPress={() => navigate(AppRoutes.UserCharacter)}
              label="profile.personal.character"
              _t
            ></Menu.Item>
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
              label="profile.personal.mates"
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
                <HelpCircle
                  width={20}
                  height={20}
                  fill={Colors.colors.text}
                  stroke={Colors.colors.text}
                  fillOpacity={0.2}
                />
              }
              onPress={() => navigate(AppRoutes.Help)}
              label="profile.settings.help"
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
              onPress={() => navigate(AppRoutes.Settings)}
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

        <DonateCard />
      </S.Container>
    </ScreenWrapper>
  );
};

export default Profile;
