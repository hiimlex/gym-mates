import styled from "@emotion/native";

const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  justify-content: space-between;
`;

const DayItem = styled.View<{ opacity?: number }>`
  gap: 6px;
  padding: 0 6px;
  align-items: center;
  opacity: ${({ opacity }) => (opacity !== undefined ? opacity : 1)};
`

export default {
  Container,
  DayItem,
};
