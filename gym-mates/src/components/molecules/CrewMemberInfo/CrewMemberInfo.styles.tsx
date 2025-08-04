import styled from "@emotion/native";
import { CachedImage } from "@georstat/react-native-image-cache";
import { setAlphaToColor } from "@theme";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MemberAvatar = styled(CachedImage)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const Content = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

const Info = styled.View`
  gap: 6px;
`;

const CoinWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => setAlphaToColor(theme.colors.secondary, 20)};
`;

export default { Container, MemberAvatar, Content, Info, CoinWrapper };
