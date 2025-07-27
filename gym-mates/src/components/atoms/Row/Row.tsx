import React from "react";
import { ViewStyle, View, Animated } from "react-native";

interface RowProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  justify?: ViewStyle["justifyContent"];
  align?: ViewStyle["alignItems"];
  gap?: number;
  width?: ViewStyle["width"];
}

const Row: React.FC<RowProps> = ({
  children,
  style,
  justify,
  align,
  gap,
  width = "100%",
}) => {
  return (
    <Animated.View
      style={{
        flexDirection: "row",
        ...style,
        justifyContent: justify,
        alignItems: align,
        gap,
        width,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default Row;
