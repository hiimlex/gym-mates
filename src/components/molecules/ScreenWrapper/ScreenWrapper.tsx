import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, setAlphaToColor } from "../../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useScreenSize } from "@hooks/useScreenSize/useScreenSize";

interface ScreenWrapperProps {
  children?: React.ReactNode;
  useHeaderHeight?: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  useHeaderHeight,
}) => {
  const { insets, headerHeight } = useScreenSize();

  return (
    <LinearGradient
      colors={[
        setAlphaToColor("#222128", 5),
        setAlphaToColor("#222128", 5),
        setAlphaToColor("#222128", 10),
      ]}
      start={{ x: 1, y: 0.1 }}
      style={{
        flex: 1,
        backgroundColor: Colors.colors.background,
        padding: 24,
        gap: 24,
        paddingTop: useHeaderHeight ? headerHeight + 24 : insets.top + 24,
      }}
    >
      {children}
    </LinearGradient>
  );
};

export default ScreenWrapper;
