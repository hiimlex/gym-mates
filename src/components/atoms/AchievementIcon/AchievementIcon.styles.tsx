import styled from "@emotion/native";
import { setAlphaToColor } from "@theme";

const Container = styled.View<{ asCard?: boolean }>`
  justify-content: center;
  align-items: center;

  ${({ asCard, theme }) =>
    asCard &&
    `
    border-radius: 4px;
    background-color: ${setAlphaToColor(theme.colors.background, 40)};
    border: 1px solid ${theme.colors.border};
    shadow-color: #000;
    `}
`;

export default { Container };
