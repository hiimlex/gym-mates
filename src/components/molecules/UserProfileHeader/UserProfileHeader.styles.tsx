import styled from "@emotion/native";
import { BlurView } from "expo-blur";
import { Animated } from "react-native";

const AvatarWrapper = styled.View`
  position: relative;
  overflow: visible;
  width: 90px;
`;

const ChangeProfileViewButton = styled.TouchableOpacity`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 32px;
  height: 32px;
`;

const ButtonBlur = styled(Animated.createAnimatedComponent(BlurView))`
  width: 32px;
  height: 32px;
  border-radius: 24px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  padding: 6px;
  align-items: center;
  justify-content: center;
`;

export default { AvatarWrapper, ChangeProfileViewButton, ButtonBlur };
