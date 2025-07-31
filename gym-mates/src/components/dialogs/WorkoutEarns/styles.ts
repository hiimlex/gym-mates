import styled from "@emotion/native";
import { setAlpha } from "@theme";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const Coin = styled.View`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => setAlpha(theme.colors.secondary, 20)};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  justify-content: center;
  align-items: center;
`;

export default { Container, Coin };
