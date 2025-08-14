import styled from "@emotion/native";

const Container = styled.TouchableOpacity<{ active?: boolean }>`
  padding: 8px 16px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.border};

  border-radius: 6px;
  gap: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default { Container };
