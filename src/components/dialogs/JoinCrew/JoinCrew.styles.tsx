import { Card } from "@components/atoms";
import styled from "@emotion/native";
import { setAlphaToColor } from "@theme";

const Container = styled.View`
  flex: 1;
  gap: 24px;
`;

const Content = styled.View`
  flex: 1;
`;

const AlreadyJoinedBadge = styled.View`
  border-radius: 4px;
  padding: 12px;
  background: ${({ theme }) => setAlphaToColor(theme.colors.danger, 20)};
  border: 1px solid ${({ theme }) => theme.colors.danger};
`;

const InputGroup = styled.View`
  gap: 12px;
`;

const CrewCard = styled(Card)`
  background: ${({ theme }) => theme.colors.background};
`;

export default { Container, Content, InputGroup, CrewCard, AlreadyJoinedBadge };
