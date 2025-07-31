import { Card } from "@components/atoms";
import styled from "@emotion/native";
import { CachedImage } from "@georstat/react-native-image-cache";

const Container = styled.View`
  flex: 1;
`;

const ScrollList = styled.ScrollView`
  flex: 1;
`;

const FilterItem = styled.TouchableOpacity`
  flex-direction: row;
  gap: 3px;
  align-items: center;
`;

const CrewCard = styled(Card)`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export default { Container, ScrollList, FilterItem, CrewCard };
