import React from "react";
import { View } from "react-native";
import S from "./styles";
import { CameraOff } from "react-native-feather";
import { Colors } from "@theme";

interface BannerPreviewProps {
  preview?: string;
  size?: number;
  noPreviewIcon?: React.ReactNode;
}

const BannerPreview: React.FC<BannerPreviewProps> = ({
  preview,
  size = 60,
  noPreviewIcon,
}) => {
  if (!preview) {
    return (
      <S.EmptyPreview size={size}>
        {noPreviewIcon || (
          <CameraOff
            width={24}
            height={24}
            stroke={Colors.colors.borderDark}
            fill={Colors.colors.borderDark}
            fillOpacity={0.2}
          />
        )}
      </S.EmptyPreview>
    );
  }

  return (
    <S.BannerImage resizeMode="cover" source={preview} size={size} onError={() => {}} />
  );
};

export default BannerPreview;
