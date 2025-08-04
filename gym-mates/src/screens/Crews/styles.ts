import { Badge, Card } from "@components/atoms";
import styled from "@emotion/native";
import { CachedImage } from "@georstat/react-native-image-cache";
import { act } from "react";

const Container = styled.View`
  flex: 1;
`;

const ScrollList = styled.ScrollView`
  flex: 1;
`;

const FilterBadge = styled(Badge)`
  ${({ active, theme }) =>
    active &&
    `
    background-color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
  `}
`;
const CrewCard = styled(Card)`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export default { Container, ScrollList, FilterBadge, CrewCard };
