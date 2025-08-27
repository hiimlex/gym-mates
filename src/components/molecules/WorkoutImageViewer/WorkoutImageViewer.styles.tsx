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

const WorkoutPreview = styled(CachedImage)`
  width: 100%;
`;

const WorkoutPreviewWrapper = styled(Animated.View)`
  position: relative;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const TabWrapper = styled.View`
  padding: 0 12px;
  gap: 24px;
`;

export default {
  FloatingBlur,
  WorkoutPreview,
  WorkoutPreviewWrapper,
  TabWrapper,
};
