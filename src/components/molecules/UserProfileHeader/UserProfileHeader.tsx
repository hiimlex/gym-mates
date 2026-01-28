import { CachedImage } from "@georstat/react-native-image-cache";
import { IUser, ProfileViewStorageKey } from "@models/collections";
import { BlurProps } from "@models/generic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserActions } from "@store/slices";
import { StoreState } from "@store/Store";
import { Colors } from "@theme";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { Smile } from "react-native-feather";
import { Asset } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Row, Typography } from "../../atoms";
import S from "./UserProfileHeader.styles";

interface UserAvatarViewProps {
  user: IUser;
  onAvatarChange?: (file: Asset) => void;
  isLoading?: boolean;
  onShowSelectTitlePress: () => void;
  crewsCount?: number;
  preview?: string;
}

const UserProfileHeader: React.FC<UserAvatarViewProps> = ({
  user,
  isLoading,
  onAvatarChange,
  onShowSelectTitlePress,
  crewsCount,
  preview,
}) => {
  const { profileView } = useSelector((state: StoreState) => state.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleChangeProfileView = async () => {
    const newView = profileView === "character" ? "avatar" : "character";

    await AsyncStorage.setItem(ProfileViewStorageKey, newView);

    dispatch(UserActions.setProfileView(newView));
  };

  return (
    <Row align="flex-start" gap={18} style={{ marginTop: 6 }}>
      <S.AvatarWrapper>
        {profileView === "avatar" && (
          <Avatar
            size={80}
            preview={preview}
            onAvatarChange={onAvatarChange}
            loading={isLoading}
            iconSize={40}
            activeBorderColor="text"
            borderOffset={0}
          />
        )}
        {profileView === "character" && (
          <View style={{ width: 100 }}>
            <CachedImage
              source={user.character?.preview?.url || ""}
              imageStyle={{ height: 100 }}
            />
          </View>
        )}

        <S.ChangeProfileViewButton
          activeOpacity={0.6}
          onPress={handleChangeProfileView}
        >
          <S.ButtonBlur {...BlurProps}>
            <Smile
              width={20}
              height={20}
              fill={Colors.colors.primary}
              fillOpacity={0.2}
              stroke={Colors.colors.primary}
            />
          </S.ButtonBlur>
        </S.ChangeProfileViewButton>
      </S.AvatarWrapper>
      <View style={{ gap: 12 }}>
        <View style={{ gap: 6 }}>
          <Typography.Heading fontWeight="medium">
            {user.name}
          </Typography.Heading>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onShowSelectTitlePress}
          >
            <Text
              style={{
                fontWeight: "500",
                fontStyle: "italic",
                color: Colors.colors.primary,
              }}
            >
              {user?.title?.title || t("profile.noTitle")}
            </Text>
          </TouchableOpacity>
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
  );
};

export default UserProfileHeader;
