import React from "react";
import { ViewStyle } from "react-native";
import S from "./styles";

interface CardProps {
  children?: React.ReactNode;
  direction?: ViewStyle["flexDirection"];
  padding?: ViewStyle["padding"];
  gap?: number;
  width?: ViewStyle["width"];
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({
  children,
  direction = "column",
  padding = 12,
  gap = 12,
  width,
  style,
}) => {
  return (
    <S.Card style={{ ...style, flexDirection: direction, padding, gap, width }}>
      {children}
    </S.Card>
  );
};

export default Card;
