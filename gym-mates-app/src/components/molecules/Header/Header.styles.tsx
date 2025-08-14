import styled from "@emotion/native";
import { setAlphaToColor } from "@theme";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 24px;
`;

const CoinsContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const CoinWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => setAlphaToColor(theme.colors.secondary, 30)};
`;

export default {
  Container,
  CoinsContainer,
  CoinWrapper,
};
