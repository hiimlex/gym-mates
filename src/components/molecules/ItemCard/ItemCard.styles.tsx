import { Badge, Button } from "@components/atoms";
import styled from "@emotion/native";
import { CachedImage } from "@georstat/react-native-image-cache";
import { IShopListView } from "@models/collections";
import { TColors } from "@theme";
import { TouchableOpacity } from "react-native";

const Container = styled.View<{ locked?: boolean; view?: IShopListView }>`
  flex-direction: column;
  gap: 6px;

  ${({ locked }) =>
    locked &&
    `
    opacity: 0.6;
  `}

  ${({ view }) =>
    view === "list" &&
    `
    flex-direction: row;
    align-items: center;
    gap: 12px;
  `}
`;

const MediaWrapper = styled.View<{ size: number }>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MediaImage = styled(CachedImage)`
  width: 100%;
  height: 100%;
`;

const FloatingPrice = styled.View`
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 1;
`;

const Info = styled.View`
  gap: 6px;
`;

const CardButton = styled(TouchableOpacity)<{
  active?: boolean;
  colorScheme: TColors;
}>`
  background: ${({ theme, colorScheme }) => theme.colors[colorScheme]};
  padding: 8px 12px;
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
  FloatingPrice,
  MediaWrapper,
  Container,
  Info,
  CardButton,
};
