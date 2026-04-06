import React from "react";
import { Animated, ViewStyle } from "react-native";

interface RowProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  justify?: ViewStyle["justifyContent"];
  align?: ViewStyle["alignItems"];
  gap?: number;
  width?: ViewStyle["width"];
  wrap?: ViewStyle["flexWrap"];
}

const Row: React.FC<RowProps> = ({
  children,
  style,
  justify,
  align,
  gap,
  width,
  wrap,
}) => {
  return (
    <Animated.View
      style={[
        {
          flexDirection: "row",
          justifyContent: justify,
          alignItems: align,
          gap,
          width,
          flexWrap: wrap,
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default Row;
