import styled from "@emotion/native";
import { Badge } from "../../atoms";

const Container = styled.ScrollView`
  flex-grow: 1;
`;

const CustomBadge = styled(Badge)`
  background: ${({ theme }) => theme.colors.background};

  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const TakePictureButton = styled.TouchableOpacity`
  flex-direction: row;
  padding: 6px;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  gap: 12px;
  align-self: center;
  width: 160px;
  height: 160px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

export default { Container, CustomBadge, TakePictureButton };
