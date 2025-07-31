import { Card } from "../../atoms";
import styled from "@emotion/native";

const Container = styled.ScrollView`
  flex: 1;
`;

const FloatButton = styled.View`
  position: absolute;
  bottom: -36px;
  padding: 24px;
  padding-top: 12px;
  z-index: 1;
  left: -24px;
`;

const CrewCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${({ theme, active }) => active && `
    border: 1px solid ${theme.colors.primary};
  `};
`;

export default { Container, FloatButton, CrewCard };
