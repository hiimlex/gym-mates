import styled from "@emotion/native";
import { setAlpha } from "@theme";
import { BlurView } from "expo-blur";

const Container = styled(BlurView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => setAlpha(theme.colors.background, 20)};
`;

export default { Container };
