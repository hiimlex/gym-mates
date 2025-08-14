import styled from "@emotion/native";

const Container = styled.View`
  flex: 1;
`;

const AvatarPlaceholder = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  justify-content: center;
  align-items: center;
`;

const AvatarButton = styled.TouchableOpacity`
  align-self: center;
  flex: 0.2;
  align-items: center;
  justify-content: center;
`;

export default { Container, AvatarPlaceholder, AvatarButton };
