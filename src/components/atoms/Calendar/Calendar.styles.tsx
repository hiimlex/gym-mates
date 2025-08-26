import styled from "@emotion/native";
import Animated from "react-native-reanimated";

const Container = styled.View`
`;

const Card = styled.View`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  gap: 12px;
  justify-content: center;
`;

const MonthHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MonthHeaderActions = styled.View`
  flex-direction: row;
  gap: 6px;
`;

const MonthHR = styled.View`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.colors.border};
`;

const WeekDaysGrid = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const DayItem = styled.TouchableOpacity<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  padding: 3px 0;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

const HasWorkoutDot = styled.View<{ active?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: ${({ theme, active }) =>
    active ? theme.colors.tertiary : "transparent"};
`;

export default {
  Container,
  Card,
  MonthHeader,
  MonthHeaderActions,
  WeekDaysGrid,
  MonthHR,
  DayItem,
  HasWorkoutDot,
};
