import styled from "@emotion/native";
import { ButtonProps } from "./Button";
import { setAlphaToColor } from "@theme";

const Button = styled.TouchableOpacity<{
  colorScheme?: ButtonProps["colorScheme"];
  buttonVariant?: ButtonProps["variant"];
}>`
  padding: 12px;
  border-radius: 5px;
  align-items: center;
  background-color: ${({ colorScheme, theme }) =>
    colorScheme ? theme.colors[colorScheme] : theme.colors.primary};

  ${({ buttonVariant, colorScheme, theme }) =>
    buttonVariant === "outlined" &&
    `
      background-color: ${setAlphaToColor(
        colorScheme ? theme.colors[colorScheme] : theme.colors.primary,
        10
      )};
      border-width: 1px;
      border-color: ${colorScheme ? theme.colors[colorScheme] : theme.colors.primary};
    `};

  ${({ disabled, theme }) =>
    disabled &&
    `
    background-color: ${theme.colors.disabled};
  `}
`;

export default {
  Button,
};
