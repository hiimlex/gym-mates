import styled from "@emotion/native";
import PagerView from "react-native-pager-view";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  gap: 12px;
`;

const Header = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

const HeaderItem = styled.TouchableOpacity<{ active?: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: 12px;

  ${({ active, theme }) =>
    active &&
    `
    border-bottom-width: 2px;
    border-color: ${theme.colors.primary};
  `}
`;

const Pager = styled(PagerView)`
  flex: 1;
`;

const Page = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

export default { Container, Pager, Header, HeaderItem, Page };
