import styled from "@emotion/native";
import { CachedImage } from "@georstat/react-native-image-cache";
import { setAlphaToColor } from "@theme";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";

const FloatingBlur = styled(Animated.createAnimatedComponent(BlurView))`
  position: absolute;
  z-index: 999;
  bottom: 0;
  left: 0;
  flex: 1;
  background: ${setAlphaToColor("#000000", 60)};
  align-items: flex-start;
  justify-content: flex-start;
  padding: 24px;
  gap: 24px;
`;

const ItemPreview = styled(CachedImage)`
  width: 100%;
  height: 100%;
`;

const ItemPreviewWrapper = styled(Animated.View)`
  position: relative;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ItemInfo = styled.View`
  gap: 6px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const MediaWrapper = styled.View<{ size: number }>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 6px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ExpandedContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

export default {
  FloatingBlur,
  ItemPreview,
  ItemPreviewWrapper,
  ItemInfo,
  MediaWrapper,
  ExpandedContent
};
