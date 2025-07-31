import styled from "@emotion/native";

const Container = styled.View`
  position: relative;
  width: auto;
  height: auto;
  padding: 0;
  gap: 6px;
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
  bottom: 16px;
  right: 12px;
`;

export default {
  Container,
  Input,
  FloatSuffix,
};
