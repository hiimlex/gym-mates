import { Colors } from "@theme";
import React from "react";
import { Alert, ViewStyle } from "react-native";
import { Image } from "react-native-feather";
import BannerPreview from "../BannerPreview/BannerPreview";
import Typography from "../Typography/Typography";
import S from "./MediaSelect.styles";

import * as ImagePicker from "expo-image-picker";

interface MediaSelectProps {
  preview?: string;
  label?: string;
  _t?: boolean;
  onMediaChange?: (media: ImagePicker.ImagePickerAsset) => void;
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
