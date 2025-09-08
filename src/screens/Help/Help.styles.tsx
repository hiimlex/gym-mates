import styled from "@emotion/native";
import Animated from "react-native-reanimated";

const Container = styled(Animated.ScrollView)`
  flex: 1;
`;

const Group = styled.View`
  gap: 12px;
`;

const HR = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  width: 100%;
`;

export default { Container, Group, HR };
