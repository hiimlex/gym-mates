import styled from "@emotion/native";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AvatarAndInfo = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

const Info = styled.View`
  gap: 6px;
`;

export default { Container, AvatarAndInfo, Info };
