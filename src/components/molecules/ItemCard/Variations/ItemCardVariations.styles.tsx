import styled from "@emotion/native";
import { CachedImage } from "@georstat/react-native-image-cache";
import { IShopListView } from "@models/collections";
import { setAlphaToColor, TColors } from "@theme";
import { TouchableOpacity } from "react-native";

const Container = styled.View<{ locked?: boolean; view?: IShopListView }>`
  flex-direction: column;
  gap: 6px;
  position: relative;
  padding: 0px;

  ${({ locked }) =>
    locked &&
    `
    opacity: 0.6;
  `}

  ${({ view }) =>
    view === "list" &&
    `
    flex-direction: row;
    gap: 12px;
  `}
`;

const MediaWrapper = styled.View<{ size: number; customBg?: string }>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, customBg }) =>
    customBg ? customBg : theme.colors.background};
  justify-content: center;
  align-items: center;
`;

const MediaImage = styled(CachedImage)`
  width: 100%;
  height: 100%;
`;

const FloatingAdd = styled(TouchableOpacity)<{
  isOnCart?: boolean;
  isGridView?: boolean;
  disabled?: boolean;
}>`
  position: absolute;
  top: 6px;
  right: 1px;
  z-index: 1;
  padding: 3px;

  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.borderDark};

  ${({ isOnCart }) =>
    isOnCart &&
    `
    background: red;
  `}

  ${({ disabled, theme }) =>
    disabled &&
    `
    background: ${theme.colors.disabled} !important;
  `}

  ${({ isGridView }) =>
    !isGridView &&
    `
    top: none;
    right: 0px;
    bottom: 3px;
  `}
`;

const FloatingLocked = styled(TouchableOpacity)<{
  isOnCart?: boolean;
  isGridView?: boolean;
  disabled?: boolean;
}>`
  position: absolute;
  top: 6px;
  right: 1px;
  z-index: 1;
  padding: 3px;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.borderDark};

  ${({ isOnCart }) =>
    isOnCart &&
    `
    background: red;
  `}

  ${({ disabled, theme }) =>
    disabled &&
    `
    background: ${theme.colors.disabled} !important;
  `}

  ${({ isGridView }) =>
    !isGridView &&
    `
    top: 0px;
    right: 0px;
    bottom: 0px;
    height: 30px;
    width: 30px;
  `}
`;

const FloatingCoin = styled.View`
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 2;
`;

const Info = styled.View`
  gap: 6px;
`;

const CardButton = styled(TouchableOpacity)<{
  active?: boolean;
  colorScheme: TColors;
}>`
  background: ${({ theme, colorScheme }) => theme.colors[colorScheme]};
  padding: 6px 8px;
  border-radius: 6px;

  ${({ theme, active }) =>
    active &&
    `
  `};

  ${({ disabled, theme }) =>
    disabled &&
    `
    background: ${theme.colors.disabled}
  `}
`;

export default {
  MediaImage,
  FloatingAdd,
  FloatingCoin,
  MediaWrapper,
  Container,
  Info,
  CardButton,
  FloatingLocked,
};
