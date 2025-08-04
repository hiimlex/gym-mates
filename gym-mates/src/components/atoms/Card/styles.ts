import styled from "@emotion/native";
import { setAlphaToColor } from "@theme";

const Card = styled.TouchableOpacity<{ touchable?: boolean; active?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background-color: ${({ theme, touchable }) =>
    setAlphaToColor(theme.colors.background, 40)};
`;

export default {
  Card,
};
