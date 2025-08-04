import styled from "@emotion/native";
import { CachedImage } from "@georstat/react-native-image-cache";
import { setAlphaToColor } from "@theme";

const Container = styled.View`
  gap: 12px;
`;

const MemberAvatar = styled(CachedImage)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const EmptyAvatar = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => setAlphaToColor(theme.colors.background, 40)};
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export default { Container, MemberAvatar, EmptyAvatar };
