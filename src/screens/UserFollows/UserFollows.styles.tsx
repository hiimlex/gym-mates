import styled from "@emotion/native";

const Container = styled.View`
  flex: 1;
  padding: 24px;
  gap: 24px;
`;

const Header = styled.View`
  gap: 12px;
`;

const FollowingList = styled.ScrollView``;

const FollowBackList = styled.ScrollView``;

export default { Container, Header, FollowingList, FollowBackList };
