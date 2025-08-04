import styled from "@emotion/native";
import { CachedImage } from "@georstat/react-native-image-cache";
import { setAlphaToColor } from "@theme";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 6px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  gap: 12px;
  align-items: center;
`;

const EmptyPreview = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  background-color: ${({ theme }) => setAlphaToColor(theme.colors.border, 20)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  justify-content: center;
  align-items: center;
`;

const Preview = styled(CachedImage)`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const MediaInfo = styled.View`
  gap: 6px;
`;

export default { Container, MediaInfo, EmptyPreview, Preview };
