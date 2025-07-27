import styled from "@emotion/native";
import { setAlpha } from "@theme";

const Card = styled.View`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background-color: ${({ theme }) => setAlpha(theme.colors.background, 40)};
`;

export default {
  Card,
};
