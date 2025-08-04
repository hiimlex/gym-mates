import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, setAlphaToColor } from "../../../theme";

interface ScreenWrapperProps {
  children?: React.ReactNode;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
  return (
    <LinearGradient
      colors={[
        setAlphaToColor("#222128", 5),
        setAlphaToColor("#222128", 5),
        setAlphaToColor("#222128", 10),
      ]}
      start={{ x: 1, y: 0.1 }}
      style={{ flex: 1, backgroundColor: Colors.colors.background }}
    >
      {children}
    </LinearGradient>
  );
};

export default ScreenWrapper;
