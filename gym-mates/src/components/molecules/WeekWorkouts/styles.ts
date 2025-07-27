import styled from "@emotion/native";

const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  justify-content: space-between;
`;

const DayItem = styled.View`
  gap: 6px;
  padding: 0 6px;
  align-items: center;
`

export default {
  Container,
  DayItem,
};
