import styled from "@emotion/native";

const Container = styled.View`
  gap: 6px;
  position: relative;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 16px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
`;

const FloatSuffix = styled.View`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;

export default {
  Container,
  Input,
  FloatSuffix,
};
