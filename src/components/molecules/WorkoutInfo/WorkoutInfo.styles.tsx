import styled from "@emotion/native";
import { CachedImage } from "@georstat/react-native-image-cache";
import { setAlphaToColor } from "@theme";

const Container = styled.View`
  flex: 1;
`;

const WorkoutGroup = styled.View`
  gap: 12px;
`;

const WorkoutRow = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
`;

const WorkoutInfo = styled.View`
  gap: 6px;
`;

const WorkoutPicture = styled(CachedImage)`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const WorkoutEmptyPicture = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background-color: ${({ theme }) => setAlphaToColor(theme.colors.background, 40)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  justify-content: center;
  align-items: center;
`;

const CoinWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => setAlphaToColor(theme.colors.secondary, 20)};
`;

export default {
  Container,
  WorkoutGroup,
  WorkoutRow,
  WorkoutInfo,
  CoinWrapper,
  WorkoutPicture,
  WorkoutEmptyPicture,
};
