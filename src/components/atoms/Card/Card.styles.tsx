import styled from "@emotion/native";
import { setAlphaToColor } from "@theme";
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

const Card = styled(Animated.createAnimatedComponent(TouchableOpacity))<{
  touchable?: boolean;
  active?: boolean;
}>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background-color: ${({ theme, touchable }) =>
    setAlphaToColor(theme.colors.background, 40)};
`;

export default {
  Card,
};
