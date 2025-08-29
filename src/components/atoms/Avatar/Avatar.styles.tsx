import styled from "@emotion/native";
import { CachedImage } from "@georstat/react-native-image-cache";
import { TColors } from "@theme";

const LoaderWrapper = styled.View`
  position: absolute;
`;

const AvatarContent = styled.TouchableOpacity<{
  size: number;
  loading?: boolean;
}>`
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};

  ${({ loading }) =>
    loading &&
    `
    opacity: 0.5;
  `}
`;

const AvatarPreview = styled(CachedImage)<{ size: number }>`
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
`;

const OffsetContainer = styled.View<{
  active: boolean;
  size: number;
  showBorder?: boolean;
  borderColor: TColors;
}>`
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  

  ${({ showBorder, theme, borderColor }) =>
    showBorder &&
    `
     border-width: 1px;
     border-style: solid;
     border-color: ${theme.colors[borderColor]};
  `}

  ${({ active, theme }) =>
    active &&
    `
    border-color: ${theme.colors.primary};
  `}
`;

export default {
  LoaderWrapper,
  AvatarContent,
  AvatarPreview,
  OffsetContainer,
};
