import styled from "@emotion/native";
import Animated from "react-native-reanimated";

const Container = styled.View`
  flex: 1;
  gap: 24px;
`;

const RankRow = styled.View`
  justify-content: center;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
  height: 200px;
  width: 100%;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.borderDark};
`;

const RankColumnWrapper = styled(Animated.View)`
  gap: 6px;
  align-items: center;
  justify-content: center;
`;

const RankColumn = styled(Animated.View)<{ height?: number; bg: string }>`
  height: ${(props) => props.height}px;
  width: 88px;
  background-color: ${({ bg }) => bg};
  padding: 6px;
`;

const LoaderWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 12px;
`;

export default {
  Container,
  RankRow,
  RankColumn,
  RankColumnWrapper,
  LoaderWrapper,
};
