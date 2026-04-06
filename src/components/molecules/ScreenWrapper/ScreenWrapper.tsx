import { useScreenSize } from "@hooks/useScreenSize/useScreenSize";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Colors, setAlphaToColor } from "../../../theme";

interface ScreenWrapperProps {
  children?: React.ReactNode;
  useHeaderHeight?: boolean;
  padding?: number;
  gap?: number;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  useHeaderHeight,
  padding = 24,
  gap = 24,
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
        padding,
        gap,
        paddingTop: useHeaderHeight ? headerHeight + 24 : insets.top + 24,
      }}
    >
      {children}
    </LinearGradient>
  );
};

export default ScreenWrapper;
