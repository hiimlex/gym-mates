import { CameraActions } from "@store/slices";
import { AppDispatch } from "@store/Store";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Image, Repeat, X } from "react-native-feather";
import { Asset } from "react-native-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import S from "./Camera.styles";

const ImagePicker = require("react-native-image-picker");

const CameraFullscreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef<CameraView>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();

  const handleCloseCamera = () => {
    dispatch(CameraActions.setShowFullscreen(false));
  };

  const handleSwapCamera = () => {
    setFacing((prevFacing) => (prevFacing === "front" ? "back" : "front"));
  };

  const handleShowPreview = () => {
    handleCloseCamera();
    dispatch(CameraActions.setShowPreview(true));
  };

  const handleTakePicture = async () => {
    const photo = await ref.current?.takePictureAsync({
      base64: true,
      quality: 1,
    });

    if (photo?.base64) {
      const asset: Asset = {
        fileName: `photo_${Date.now()}.jpg`,
        base64: photo.base64,
        uri: photo.uri,
        width: photo.width,
        height: photo.height,
        type: "image/jpg",
      };

      dispatch(CameraActions.setAsset(asset));

      handleShowPreview();
    }
  };

  const handleMediaLibraryFile = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,
      selectionLimit: 1,
      quality: 0.8,
    });

    if (result && result.assets && result.assets[0]) {
      const newAvatar: Asset = result.assets[0];

      dispatch(CameraActions.setAsset(newAvatar));
      handleShowPreview();
    }
  };

  if (!permission) {
    return null;
  }

  return (
    <S.Container>
      {!permission.granted && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Button title="Grant Camera Permission" onPress={requestPermission} />
        </View>
      )}
      {permission.granted && (
        <>
          <CameraView
            mirror={true}
            ref={ref}
            facing={facing}
            mode="picture"
            style={{ flex: 1 }}
            responsiveOrientationWhenOrientationLocked
          />
          {/* Top actions */}

          <S.CloseCameraButton
            activeOpacity={0.6}
            onPress={handleCloseCamera}
            top={insets.top + 24}
          >
            <X color="#ffffff" />
          </S.CloseCameraButton>
          {/* Bottom actions */}
          <S.OpenGalleryButton
            activeOpacity={0.6}
            bottom={insets.bottom + 16}
            onPress={handleMediaLibraryFile}
          >
            <Image color="#ffffff" />
          </S.OpenGalleryButton>
          <S.ClickButton
            activeOpacity={0.6}
            onPress={handleTakePicture}
            bottom={insets.bottom}
          >
            <S.InnerCircle />
          </S.ClickButton>
          <S.SwapCameraButton
            activeOpacity={0.6}
            onPress={handleSwapCamera}
            bottom={insets.bottom + 16}
          >
            <Repeat color="#ffffff" />
          </S.SwapCameraButton>
        </>
      )}
    </S.Container>
  );
};

export default CameraFullscreen;
