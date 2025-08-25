import styled from "@emotion/native";

const Container = styled.ScrollView`
  flex: 1;
`;

const RequestItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RequestInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export default { Container, RequestItem, RequestInfo };
