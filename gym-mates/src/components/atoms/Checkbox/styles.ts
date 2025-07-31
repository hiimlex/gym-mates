import styled from "@emotion/native";
import { setAlpha } from "@theme";

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  gap: 6px;
  align-items: center;
`;

const Checkbox = styled.View<{ checked?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => setAlpha(theme.colors.border, 20)};

  justify-content: center;
  align-items: center;
  width: 19px;
  height: 19px;
  border-radius: 4px;

  ${({ checked, theme }) =>
    checked &&
    `
    background-color: ${setAlpha(theme.colors.primary, 20)};
    border-color: ${theme.colors.primary};
  `}
`;

export default { Wrapper, Checkbox };
