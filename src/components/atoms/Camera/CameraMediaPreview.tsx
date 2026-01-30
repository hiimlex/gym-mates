import { CachedImage } from "@georstat/react-native-image-cache";
import { CameraActions } from "@store/slices/CameraSlice";
import { AppDispatch, StoreState } from "@store/Store";
import { Colors } from "@theme";
import { mountImageURLFromBase64 } from "@utils/file.utils";
import React from "react";
import { View } from "react-native";
import { Check, X } from "react-native-feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Row from "../Row/Row";
import S from "./Camera.styles";

const CameraMediaPreview = () => {
  const insets = useSafeAreaInsets();
  const { asset } = useSelector((state: StoreState) => state.camera);
  const dispatch = useDispatch<AppDispatch>();

  const handleRetry = () => {
    dispatch(CameraActions.setShowPreview(false));
    dispatch(CameraActions.setAsset(undefined));
    dispatch(CameraActions.setShowFullscreen(true));
  };

  const handleConfirm = () => {
    dispatch(CameraActions.setShowPreview(false));
  };

  if (!asset) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        gap: 24,
        paddingTop: insets.top + 18,
        paddingBottom: insets.bottom,
      }}
    >
      {asset.base64 && (
        <CachedImage
          style={{ flex: 1 }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 12, width: "100%" }}
          onError={() => {}}
          source={mountImageURLFromBase64(asset?.base64)}
        />
      )}
      <Row justify="space-between" width={"100%"}>
        <S.RetryButton activeOpacity={0.6} onPress={handleRetry}>
          <X color={Colors.colors.danger} />
        </S.RetryButton>
        <S.AcceptButton activeOpacity={0.6} onPress={handleConfirm}>
          <Check color={Colors.colors.success} />
        </S.AcceptButton>
      </Row>
    </View>
  );
};

export default CameraMediaPreview;
