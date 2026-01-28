import styled from "@emotion/native";
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

const Bg = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  flex: 1;
  flex-direction: row;
`;

const HalfLightBg = styled.View`
  flex: 1;
  background: #9d4539;
`;

const HalfDarkBg = styled.View`
  flex: 1;
  background: #66282c;
`;

const ItemBox = styled.ImageBackground`
  width: 48px;
  height: 48px;
  padding: 2px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const ItemBoxSelected = styled.Image`
  width: 52px;
  height: 52px;
  position: absolute;
  top: -2px;
  left: -2px;
`;

const Menu = styled.ImageBackground`
  padding: 36px;
  padding-top: 28px;
  gap: 12px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ItemPage = styled.View`
  padding: 2px;
  gap: 24px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

const ItemBoxTouchAnimated = styled(
  Animated.createAnimatedComponent(TouchableOpacity)
)`
  width: 48px;
  height: 48px;
`;

const CharBaseView = styled.View<{ width: number; height: number }>`
  position: relative;
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  justify-content: center;
  align-items: center;
  margin-left: -24px;
`;

const Floor = styled.Image`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 440px;
`;

const Mirror = styled.ImageBackground`
  position: absolute;
  left: 10px;
  bottom: 360px;
  width: 140px;
  height: 300px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const Palette = styled.ImageBackground`
  position: absolute;
  bottom: 360px;
  right: 24px;
  padding: 28px;
  gap: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default {
  ItemBox,
  ItemBoxSelected,
  Menu,
  ItemPage,
  ItemBoxTouchAnimated,
  CharBaseView,
  Floor,
  HalfLightBg,
  HalfDarkBg,
  Bg,
  Mirror,
  Palette,
};
