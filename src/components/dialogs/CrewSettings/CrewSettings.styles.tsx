import { Card } from "../../atoms";
import styled from "@emotion/native";
import { CachedImage } from "@georstat/react-native-image-cache";
import Animated from "react-native-reanimated";

const Container = styled(Animated.ScrollView)`
  flex: 1;
`;

const MembersCard = styled(Card)`
  border-radius: 6px;
  padding: 18px 12px;
  background: ${({ theme }) => theme.colors.background};
  flex-direction: row;
  justify-content: space-between;
`;


const EmptyPreview = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  align-items: center;
  justify-content: center;
`;

const Banner = styled(CachedImage)`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const Group = styled.View`
  gap: 12px;
`;

const RulesPanel = styled.View`
  padding: 12px;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
`;

const Rule = styled.View`
  flex-direction: row;
  gap: 6px;
  align-items: center;
`;

const HR = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  width: 100%;
`;

const ButtonCard = styled(Card)`
  border-radius: 6px;
  padding: 18px 12px;
  background-color: ${({ theme }) => theme.colors.background};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonCardRow = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

export default {
  Container,
  MembersCard,
  Group,
  Banner,
  EmptyPreview,
  RulesPanel,
  Rule,
  HR,
  ButtonCard,
  ButtonCardRow,
};
