import styled from "@emotion/native";
import { CachedImage } from "@georstat/react-native-image-cache";

const Container = styled.ScrollView`
  flex: 1;
`;

const CrewBanner = styled(CachedImage)`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export default { Container, CrewBanner };
