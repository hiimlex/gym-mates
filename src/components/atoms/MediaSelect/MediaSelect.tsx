import { Colors } from "@theme";
import React from "react";
import { ViewStyle } from "react-native";
import { Image } from "react-native-feather";
import { Asset } from "react-native-image-picker";
import BannerPreview from "../BannerPreview/BannerPreview";
import Typography from "../Typography/Typography";
import S from "./MediaSelect.styles";

const ImagePicker = require("react-native-image-picker");

interface MediaSelectProps {
  preview?: string;
  label?: string;
  _t?: boolean;
  onMediaChange?: (media: Asset) => void;
  minified?: boolean;
  style?: ViewStyle;
}

const MediaSelect: React.FC<MediaSelectProps> = ({
  preview,
  label,
  _t,
  onMediaChange,
  minified = false,
  style,
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
    <>
      {minified && (
        <S.Container
          activeOpacity={0.6}
          onPress={getFile}
          style={{ ...style, justifyContent: "center" }}
        >
          <Image
            color={Colors.colors.primary}
            fill={Colors.colors.primary}
            fillOpacity={0.1}
          />
        </S.Container>
      )}
      {!minified && (
        <S.Container activeOpacity={0.6} onPress={getFile} style={style}>
          <>
            <BannerPreview size={60} preview={preview} iconSize={24} />

            <S.MediaInfo>
              <Typography.Body _t textColor="text">
                {label || "mediaSelect.mediaPreview"}
              </Typography.Body>

              <Typography.Caption _t textColor="primary">
                {preview ? "mediaSelect.hasPreview" : "mediaSelect.text"}
              </Typography.Caption>
            </S.MediaInfo>
          </>
        </S.Container>
      )}
    </>
  );
};

export default MediaSelect;
