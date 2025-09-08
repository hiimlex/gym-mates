import React from "react";
import { User } from "react-native-feather";
import { Asset } from "react-native-image-picker";
import Typography from "../Typography/Typography";
import S from "./MediaSelect.styles";
import { Colors } from "@theme";
import BannerPreview from "../BannerPreview/BannerPreview";

const ImagePicker = require("react-native-image-picker");

interface MediaSelectProps {
  preview?: string;
  label?: string;
  _t?: boolean;
  onMediaChange?: (media: Asset) => void;
}

const MediaSelect: React.FC<MediaSelectProps> = ({
  preview,
  label,
  _t,
  onMediaChange,
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

      if (onMediaChange) {
        onMediaChange(newAvatar);
      }
    }
  };

  return (
    <S.Container activeOpacity={0.6} onPress={getFile}>
      <BannerPreview size={60} preview={preview} iconSize={24} />

      <S.MediaInfo>
        <Typography.Body _t textColor="text">
          {label || "mediaSelect.mediaPreview"}
        </Typography.Body>

        <Typography.Caption _t textColor="primary">
          {preview ? "mediaSelect.hasPreview" : "mediaSelect.text"}
        </Typography.Caption>
      </S.MediaInfo>
    </S.Container>
  );
};

export default MediaSelect;
