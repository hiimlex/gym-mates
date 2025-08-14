import Animated from "react-native-reanimated";
import { Card } from "../../atoms";
import styled from "@emotion/native";

const Container = styled(Animated.ScrollView)``;

const VisibilityCard = styled(Card)<{ isActive?: boolean }>`
  flex-direction: column;
  gap: 6px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.background};

  ${({ isActive, theme }) => `
    opacity: ${isActive ? 1 : 0.8};
    border-color: ${isActive ? theme.colors.primary : theme.colors.border};
  `}
`;

const Group = styled.View`
  gap: 12px;
`;

const RulesPanel = styled.View`
  padding: 12px;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
`;

export default { Container, VisibilityCard, Group, RulesPanel };
