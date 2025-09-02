import { IItem } from "@models/collections";
import { Colors } from "@theme";
import { Circle } from "react-native-feather";

export interface ItemCardProps {
  item: IItem;
  forcedView?: "grid" | "list";
  disabled?: boolean;
  mode?: "view" | "buy" | "checkout";
  itemsPerRow?: number;
  touchableImage?: boolean;
  onImagePress?: (item: IItem) => void;
}

export const Dot = () => (
  <Circle
    width={3}
    height={3}
    stroke={Colors.colors.textLight}
    fill={Colors.colors.textLight}
  />
);

export const GridShopGap = 24;
export const ScreenPadding = 24;
export const InnerPadding = 12;

export function calculateMediaSize(
  width: number,
  itemsPerRow: number,
  view: ItemCardProps["forcedView"] = "grid"
): number {
  if (view === "list") {
    return 70;
  }

  const gap = (itemsPerRow - 1) * GridShopGap;

  return width / itemsPerRow - ScreenPadding - itemsPerRow * InnerPadding - gap;
}
