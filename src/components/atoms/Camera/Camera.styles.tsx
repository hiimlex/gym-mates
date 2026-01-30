import styled from "@emotion/native";
import { setAlphaToColor } from "@theme";
import Animated from "react-native-reanimated";

const Container = styled.View`
  background: #000000;
  border-radius: 12px;
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const ClickButton = styled.TouchableOpacity<{ bottom?: number }>`
  width: 78px;
  height: 78px;
  bottom: ${(props) =>
    props.bottom !== undefined ? `${props.bottom}px` : "20px"};
  position: absolute;
  padding: 6px;
  border-radius: 66px;
  margin: auto 0;

  border-color: rgba(255, 255, 255, 0.3);
  border-style: solid;
  border-width: 2px;

  align-self: center;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.View`
  flex: 1;
  background: #ffffff;
  border-radius: 33px;
  width: 62px;
  height: 62px;
`;

const SwapCameraButton = styled.TouchableOpacity<{ bottom?: number }>`
  position: absolute;
  bottom: ${(props) =>
    props.bottom !== undefined ? `${props.bottom}px` : "38px"};
  right: 20px;
  background: rgba(255, 255, 255, 0.4);
  padding: 12px;
  border-radius: 30px;
`;

const OpenGalleryButton = styled.TouchableOpacity<{ bottom?: number }>`
  position: absolute;
  bottom: ${(props) =>
    props.bottom !== undefined ? `${props.bottom}px` : "38px"};
  left: 20px;
  background: rgba(255, 255, 255, 0.4);
  padding: 12px;
  border-radius: 30px;
`;

const CloseCameraButton = styled.TouchableOpacity<{ top?: number }>`
  position: absolute;
  top: ${(props) => (props.top !== undefined ? `${props.top}px` : "38px")};
  right: 20px;
  background: rgba(255, 255, 255, 0.4);
  padding: 12px;
  border-radius: 30px;
`;

const ProviderOverlay = styled(Animated.View)`
  position: absolute;
  z-index: 1001;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PreviewOverlay = styled(Animated.View)`
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 1001;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const AcceptButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    setAlphaToColor(props.theme.colors.success, 40)};
  padding: 20px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;
const RetryButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    setAlphaToColor(props.theme.colors.danger, 40)};
  padding: 20px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

export default {
  Container,
  ClickButton,
  SwapCameraButton,
  InnerCircle,
  ProviderOverlay,
  PreviewOverlay,
  CloseCameraButton,
  OpenGalleryButton,
  AcceptButton,
  RetryButton,
};
