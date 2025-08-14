import { useHeaderHeight } from "@react-navigation/elements";
import { useWindowDimensions } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

type UseScreenSize = {
  width: number;
  height: number;
  insets: EdgeInsets;
  headerHeight: number;
};

export function useScreenSize(): UseScreenSize {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  return {
    width,
    height,
    insets,
    headerHeight: headerHeight || 0, // Default to 0 if headerHeight is undefined
  };
}
