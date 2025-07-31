import { Badge } from "../../atoms";
import styled from "@emotion/native";

const Container = styled.ScrollView`
  flex-grow: 1;
`;

const CustomBadge = styled(Badge)`
  background: ${({ theme }) => theme.colors.background};

  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const FloatButton = styled.View`
  position: absolute;
  bottom: -36px;
  padding: 24px;
  padding-top: 12px;
  z-index: 1;
  left: -24px;
`;

export default { Container, CustomBadge, FloatButton };
