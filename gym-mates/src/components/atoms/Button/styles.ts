import styled from "@emotion/native";
import { ButtonProps } from "./Button";

const Button = styled.TouchableOpacity<{
  colorScheme?: ButtonProps["colorScheme"];
  variant?: ButtonProps["variant"];
}>`
  padding: 12px;
  border-radius: 5px;
  align-items: center;
  background-color: ${({ colorScheme, theme }) =>
    colorScheme ? theme.colors[colorScheme] : theme.colors.primary};
`;

export default {
  Button,
};
