import { IItem } from "@models/collections";
import { Colors } from "@theme";
import { Circle } from "react-native-feather";

export interface ItemCardProps {
  item: IItem;
  forcedView?: "grid" | "list";
  disabled?: boolean;
  mode?: "view" | "buy" | "checkout";
  itemsPerRow?: number;
  itemsGap?: number;
  mediaSize?: number;
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


export function calculateMediaSize(
  width: number,
  itemsPerRow: number,
  view: ItemCardProps["forcedView"] = "grid",
  gridGap = 12,
  innerPadding = 12,
  screenPadding = 24,
): number {
  if (view === "list") {
    return 70;
  }

  const gap = (itemsPerRow - 1) * gridGap;
  const padding = itemsPerRow * innerPadding;

  return width / itemsPerRow - gap - padding - screenPadding;
}
