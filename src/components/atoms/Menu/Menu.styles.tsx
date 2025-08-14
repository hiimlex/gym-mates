import styled from "@emotion/native";
import { setAlphaToColor } from "@theme";
import { LinearGradient } from "expo-linear-gradient";

const Menu = styled(LinearGradient)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background-color: ${({ theme }) => setAlphaToColor(theme.colors.background, 40)};
`;

const Item = styled.TouchableOpacity<{ isLast?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  padding: 18px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};

  ${({ isLast }) =>
    isLast &&
    `
    border-bottom-width: 0;
  `}
`;

export default {
  Menu,
  Item,
};
