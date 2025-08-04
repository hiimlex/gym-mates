import { Card } from "@components/atoms";
import styled from "@emotion/native";
import { setAlphaToColor } from "@theme";

const Container = styled.View``;

const EventCard = styled(Card)`
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  flex-direction: row;
  align-items: center;
  width: auto;
`;

const EventRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const EventWithBanner = styled.View`
  flex-direction: row;
  align-items: center;

  gap: 12px;
`;

const EventInfo = styled.View`
  gap: 6px;
`;

const CoinWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) =>
    setAlphaToColor(theme.colors.secondary, 20)};
`;

export default {
  Container,
  EventCard,
  EventRow,
  EventWithBanner,
  EventInfo,
  CoinWrapper,
};
