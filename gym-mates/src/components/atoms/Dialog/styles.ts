import styled from "@emotion/native";
import { setAlphaToColor } from "@theme";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";

const Wrapper = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Container = styled(Animated.View)`
  flex: 1;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  overflow: hidden;
`;

const Blur = styled(BlurView)`
  flex: 1;
  gap: 24px;
  background-color: ${({ theme }) => setAlphaToColor(theme.colors.background, 80)};
  padding: 24px;
`;

const Title = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TitleInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  gap: 12px;
`;

const TitleAction = styled.TouchableOpacity``;

export default { Container, Title, Blur, Wrapper, TitleInfo, TitleAction };
