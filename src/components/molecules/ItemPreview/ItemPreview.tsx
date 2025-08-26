import { IItem } from "@models/collections";
import { StoreState } from "@store/Store";
import React, { useMemo } from "react";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import S from "./ItemPreview.styles";
import { Row, Typography } from "@components/atoms";
import { ArrowLeft, X } from "react-native-feather";
import { Colors } from "@theme";
import { OverlayActions } from "@store/slices";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Easing,
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";

interface ItemPreviewProps {}

const ItemPreview: React.FC<ItemPreviewProps> = () => {
  const { data } = useSelector((state: StoreState) => state.overlay);
  const item = useMemo(() => data?.item, [data]);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();

  const close = () => {
    dispatch(OverlayActions.hide());
  };

  return (
    <S.FloatingBlur
      style={{
        width,
        height,
        paddingTop: insets.top + 24,
        paddingBottom: insets.bottom + 48,
      }}
      intensity={15}
      entering={FadeIn}
      exiting={FadeOut.easing(Easing.inOut(Easing.ease))}
    >
      <Row gap={12}>
        <TouchableOpacity activeOpacity={0.6} onPress={close}>
          <X stroke={Colors.colors.white} />
        </TouchableOpacity>
        <Typography.HeadingSubtitle textColor="white" _t>
          {"itemViewer.title"}
        </Typography.HeadingSubtitle>
      </Row>

      <S.ExpandedContent>
        <S.MediaWrapper size={height * 0.4}>
          <S.ItemPreview
            source={item?.preview?.url || ""}
            onError={() => {}}
          />
        </S.MediaWrapper>

        <S.ItemInfo>
          <Typography.Heading textColor="white" textAlign="center">
            {item?.name}
          </Typography.Heading>
          <Typography.Body textColor="border">{item?.category}</Typography.Body>
        </S.ItemInfo>
      </S.ExpandedContent>
    </S.FloatingBlur>
  );
};

export default ItemPreview;
