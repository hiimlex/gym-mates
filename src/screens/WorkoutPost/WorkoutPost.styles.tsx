import styled from "@emotion/native";

const Container = styled.ScrollView`
  flex: 1;
  gap: 24px;
  padding: 12px;
`;

const WorkoutPostImagePlacement = styled.View<{ hasImage?: boolean }>`
  width: 100%;
  height: 300px;
  background: ${({ theme, hasImage }) =>
    hasImage ? "transparent" : theme.colors.border};
`;

const WorkoutInteractions = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const UserInfoColumn = styled.View`
  gap: 3px;
`;

const HR = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;

const CommentsSection = styled.View`
  flex: 1;
  gap: 12px;
`;

export default {
  Container,
  WorkoutPostImagePlacement,
  WorkoutInteractions,
  UserInfoColumn,
  HR,
  CommentsSection,
};
