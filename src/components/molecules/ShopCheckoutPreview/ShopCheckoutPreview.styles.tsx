import styled from "@emotion/native";
import { setAlphaToColor } from "@theme";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";

const FloatBottomContainer = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const BlurBackground = styled(BlurView)`
  background: ${(props) => setAlphaToColor(props.theme.colors.background, 60)};
  padding: 24px;
  gap: 24px;
`;

const Receipt = styled.View`
  gap: 12px;
`;

const HR = styled.View`
  height: 1px;
  background: ${(props) => setAlphaToColor(props.theme.colors.text, 20)};
  width: 100%;
`;

export default { BlurBackground, FloatBottomContainer, HR, Receipt };
