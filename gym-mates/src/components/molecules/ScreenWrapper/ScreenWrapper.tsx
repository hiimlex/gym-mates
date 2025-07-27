import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, setAlpha } from "../../../theme";

interface ScreenWrapperProps {
  children?: React.ReactNode;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
  return (
    <LinearGradient
      colors={[
        setAlpha("#222128", 5),
        setAlpha("#222128", 10),
        setAlpha("#222128", 20),
      ]}
      start={{ x: 0.2, y: 0.2 }}
      style={{ flex: 1, backgroundColor: Colors.colors.background }}
    >
      {children}
    </LinearGradient>
  );
};

export default ScreenWrapper;
