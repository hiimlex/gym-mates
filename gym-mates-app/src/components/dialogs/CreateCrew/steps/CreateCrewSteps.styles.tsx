import { Card } from "@components/atoms";
import styled from "@emotion/native";
import Animated from "react-native-reanimated";

const Container = styled(Animated.View)`
  flex: 1;
  gap: 24px;
`;

const Group = styled.View`
  gap: 12px;
`;

const FormView = styled.ScrollView`
`;

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

const RulesPanel = styled.View`
  padding: 12px;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
`;

export default { Container, Group, FormView, VisibilityCard, RulesPanel };
