import React from "react";

import { Colors, TColors } from "@theme";
import { User } from "react-native-feather";
import Loader from "../Loader/Loader";
import S from "./Avatar.styles";

import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

interface IAvatarProps {
  size?: number;
  iconSize?: number;
  onAvatarChange?: (file: ImagePicker.ImagePickerAsset) => void;
  borderOffset?: number;
  disabled?: boolean;
  preview?: string;
  loading?: boolean;
  showBorder?: boolean;
  borderColor?: TColors;
  activeBorderColor?: TColors;
}

const Avatar: React.FC<IAvatarProps> = ({
  size = 100,
  iconSize = 42,
  borderOffset = 12,
  onAvatarChange,
  disabled,
  preview,
  loading,
  showBorder = true,
  borderColor = "border",
  activeBorderColor = "primary",
}) => {
  const getFile = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });
    if (result && result.assets && result.assets[0]) {
      const asset = result.assets[0];
      const newAvatar: ImagePicker.ImagePickerAsset = {
        fileName: asset.fileName || `photo_${Date.now()}.jpg`,
        base64: asset.base64 || "",
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: "image",
        mimeType: "image/jpg",
      };

      if (onAvatarChange) {
        onAvatarChange(newAvatar);
      }
    }
  };

  return (
    <S.OffsetContainer
      showBorder={showBorder}
      active={!!preview && !disabled}
      size={size + borderOffset}
      borderColor={borderColor}
      activeBorderColor={activeBorderColor}
    >
      <S.AvatarContent
        size={size}
        activeOpacity={0.6}
        onPress={getFile}
        loading={loading}
        disabled={disabled || loading}
      >
        {!preview && (
          <User
            width={iconSize}
            height={iconSize}
            fill={Colors.colors.border}
            fillOpacity={0.2}
            stroke={Colors.colors.border}
            strokeWidth={1.5}
          />
        )}
        {preview && (
          <S.AvatarPreview
            onError={() => {}}
            resizeMode="cover"
            size={size}
            source={preview}
            imageStyle={{
              width: size,
              height: size,
              borderRadius: size / 2,
            }}
          />
        )}
      </S.AvatarContent>
      {loading && (
        <S.LoaderWrapper>
          <Loader color="primary" size="64" />
        </S.LoaderWrapper>
      )}
    </S.OffsetContainer>
  );
};

export default Avatar;
