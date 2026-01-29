import styled from "@emotion/native";

const Container = styled.ScrollView`
  flex: 1;
`;

const FloatLinkWrapper = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  flex-direction: row;
  gap: 6px;
  justify-content: center;
`;

const Group = styled.View`
  flex-direction: column;
  gap: 6px;
`;

export default { Container, FloatLinkWrapper, Group };
