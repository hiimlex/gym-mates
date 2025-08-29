import styled from "@emotion/native";
import { CachedImage } from "@georstat/react-native-image-cache";
import { setAlphaToColor, TColors } from "@theme";

const EmptyPreview = styled.View<{ size?: number; bgColor?: TColors }>`
  width: ${({ size }) => size + "px"};
  height: ${({ size }) => size + "px"};
  border-radius: 4px;
  background-color: ${({ theme, bgColor }) =>
    bgColor
      ? theme.colors[bgColor]
      : setAlphaToColor(theme.colors.background, 40)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  justify-content: center;
  align-items: center;
`;

const BannerImage = styled(CachedImage)<{ size?: number }>`
  width: ${({ size }) => size + "px"};
  height: ${({ size }) => size + "px"};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

export default { EmptyPreview, BannerImage };
