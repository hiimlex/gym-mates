import React from "react";
import { ViewStyle } from "react-native";
import S from "./Card.styles";
import { AnimatedProps, EntryOrExitLayoutType } from "react-native-reanimated";

interface CardProps {
  children?: React.ReactNode;
  direction?: ViewStyle["flexDirection"];
  padding?: ViewStyle["padding"];
  gap?: number;
  width?: ViewStyle["width"];
  style?: ViewStyle;
  touchable?: boolean;
  onPress?: () => void;
  active?: boolean;
  entering?: EntryOrExitLayoutType;
  exiting?: EntryOrExitLayoutType;
}

const Card: React.FC<CardProps> = ({
  children,
  direction = "column",
  padding = 12,
  gap = 12,
  width,
  style,
  touchable = false,
  onPress = () => {},
  active,
  entering,
  exiting
}) => {
  return (
    <S.Card
      disabled={!touchable}
      activeOpacity={0.6}
      onPress={onPress}
      touchable={touchable}
      style={[{ flexDirection: direction, padding, gap, width }, style]}
      active={active}
      entering={entering}
      exiting={exiting}
    >
      {children}
    </S.Card>
  );
};

export default Card;
