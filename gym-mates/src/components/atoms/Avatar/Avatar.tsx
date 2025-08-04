import React from "react";

import { Colors } from "@theme";
import { Asset } from "react-native-image-picker";
import Loader from "../Loader/Loader";
import S from "./Avatar.styles";
import { User } from "react-native-feather";

const ImagePicker = require("react-native-image-picker");

interface IAvatarProps {
  size?: number;
  iconSize?: number;
  onAvatarChange?: (file: Asset) => void;
  borderOffset?: number;
  disabled?: boolean;
  preview?: string;
  loading?: boolean;
  showBorder?: boolean;
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
}) => {
  const getFile = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,
      selectionLimit: 1,
      quality: 0.8,
    });

    if (result && result.assets && result.assets[0]) {
      const newAvatar: Asset = result.assets[0];

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
