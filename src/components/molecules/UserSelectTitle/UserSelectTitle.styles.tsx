import styled from "@emotion/native";
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

const Float = styled(Animated.createAnimatedComponent(TouchableOpacity))`
  position: absolute;
  z-index: 999;
  bottom: 0;
  left: 0;
  flex: 1;
  background: #00000011;
  align-items: flex-end;
  justify-content: flex-end;
`;

const BottomSheet = styled(Animated.createAnimatedComponent(TouchableOpacity))`
  height: 160px;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 12px;
  z-index: 1000;
  position: absolute;
  bottom: 0;
`;

const VerticalList = styled(Animated.ScrollView)``;

const TitleView = styled.TouchableOpacity`
  height: 24px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default { Float, VerticalList, TitleView, BottomSheet };
