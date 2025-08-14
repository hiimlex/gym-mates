import { Badge } from "@components/atoms";
import styled from "@emotion/native";

const Container = styled.View`
  flex: 1;
  gap: 24px;
  padding: 24px;
`;

const Header = styled.View`
  gap: 12px;
`;

const ItemsScrollView = styled.ScrollView`
  flex: 1;
`;

const HorizontalScrollView = styled.ScrollView`
  width: 100%;
`;

const SearchWrapper = styled.View`
  width: 100%;
  padding: 0 18px;
`;

const FiltersBadge = styled(Badge)`
  width: auto;
  gap: 3px;
`;

const ShopCartIcon = styled.TouchableOpacity`
  position: relative;
`;

const ItemsCount = styled.View`
  position: absolute;
  top: -8px;
  right: -8px;
  background: red;
  z-index: 1;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`;

export default {
  Container,
  Header,
  ItemsScrollView,
  SearchWrapper,
  HorizontalScrollView,
  FiltersBadge,
  ShopCartIcon,
  ItemsCount,
};
