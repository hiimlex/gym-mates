import styled from "@emotion/native";

const Container = styled.View`
  flex: 1;
  gap: 24px;
`;

const SearchWrapper = styled.View`
  width: 100%;
  padding-left: 12px;
`;

const Header = styled.View`
  gap: 12px;
`;

const List = styled.ScrollView`
  flex: 1;
`;

export default {
  SearchWrapper,
  Container,
  List, 
  Header,
};
