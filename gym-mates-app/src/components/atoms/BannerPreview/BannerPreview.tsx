import React from "react";
import { View, ViewStyle } from "react-native";
import S from "./BannerPreview.styles";
import { CameraOff } from "react-native-feather";
import { Colors, TColors } from "@theme";

interface BannerPreviewProps {
  preview?: string;
  size?: number;
  noPreviewIcon?: React.ReactNode;
  iconSize?: number;
  styles?: ViewStyle;
  emptyBgColor?: TColors;
}

const BannerPreview: React.FC<BannerPreviewProps> = ({
  preview,
  size = 60,
  iconSize = 24,
  noPreviewIcon,
  emptyBgColor,
}) => {
  if (!preview) {
    return (
      <S.EmptyPreview size={size} bgColor={emptyBgColor}>
        {noPreviewIcon || (
          <CameraOff
            width={iconSize}
            height={iconSize}
            stroke={Colors.colors.borderDark}
            fill={Colors.colors.borderDark}
            fillOpacity={0.2}
          />
        )}
      </S.EmptyPreview>
    );
  }

  return (
    <S.BannerImage
      resizeMode="cover"
      source={preview}
      size={size}
      onError={() => {}}
    />
  );
};

export default BannerPreview;
