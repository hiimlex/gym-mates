import styled from "@emotion/native";
import { setAlphaToColor } from "@theme";
import { BlurView } from "expo-blur";
import { ImageBackground } from "react-native";
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
  gap: 24px;
`;

const MissionButton = styled.TouchableOpacity`
  shadow-color: ${({ theme }) => theme.colors.borderDark};
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 2px;
  elevation: 5;
`;

const MissionItem = styled(Animated.View)`
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  gap: 6px;
  padding: 6px 0px;
`;

const CoinWrapper = styled.View`
  padding-top: 6px;
`;

const AchievementIconWrapper = styled(ImageBackground)`
  border-radius: 4px;
  image-rendering: pixelated;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

const MissionInfo = styled.View`
  gap: 6px;
  flex: 1;
  padding-top: 3px;
`;

export default {
  FloatingBlur,
  MissionItem,
  AchievementIconWrapper,
  MissionInfo,
  CoinWrapper,
  MissionButton,
};
