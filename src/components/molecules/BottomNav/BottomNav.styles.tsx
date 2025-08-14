import styled from "@emotion/native";
import { setAlphaToColor } from "@theme";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";

const Float = styled(Animated.createAnimatedComponent(BlurView))`
  background-color: ${({ theme }) =>
    setAlphaToColor(theme.colors.background, 40)};
  position: absolute;
  left: 0;
  flex-direction: row;
  justify-content: space-between;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

const Item = styled.TouchableOpacity<{ isActive?: boolean }>`
  gap: 6px;
  flex: 1;
  align-items: center;
  justify-content: center;

  opacity: ${({ isActive }) => (isActive ? 1 : 0.6)};
`;

export default {
  Float,
  Item,
};
