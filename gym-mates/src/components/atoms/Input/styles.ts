import styled from "@emotion/native";

const Container = styled.View`
  gap: 6px;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 16px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
`;

export default {
  Container,
  Input
};
