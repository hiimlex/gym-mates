import styled from "@emotion/native";
import { setAlphaToColor } from "@theme";
import { Pressable, View } from "react-native";

const AnchorContainer = styled(View)``;

const Backdrop = styled(Pressable)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Menu = styled(View)<{
  top: number;
  left: number;
  width: number;
  maxHeight: number;
}>`
  position: absolute;
  top: ${({ top }) => top + "px"};
  left: ${({ left }) => left + "px"};
  width: ${({ width }) => width + "px"};
  max-height: ${({ maxHeight }) => maxHeight + "px"};
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) =>
    setAlphaToColor(theme.colors.background, 95)};
  overflow: hidden;
`;

const ItemButton = styled.TouchableOpacity<{ isLast?: boolean }>`
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom-width: ${({ isLast }) => (isLast ? "0px" : "1px")};
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export default { AnchorContainer, Backdrop, Menu, ItemButton };
