import styled from "@emotion/native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const Container = styled.View`
  flex: 1;
`;

const FloatLinkWrapper = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  flex-direction: row;
  gap: 6px;
  justify-content: center;
`;

export default { Container, FloatLinkWrapper };
