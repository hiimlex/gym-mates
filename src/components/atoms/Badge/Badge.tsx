import React, { useMemo } from "react";
import S from "./Badge.styles";
import Typography from "../Typography/Typography";
import { TColors } from "@theme";
import { ViewStyle } from "react-native";

interface BadgeProps {
  children?: React.ReactNode;
  touchable?: boolean;
  onPress?: () => void;
  label?: string;
  _t?: boolean;
  active?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  touchable,
  onPress,
  label,
  _t,
  active,
  style,
  disabled = false,
}) => {
  const textColor: TColors = useMemo(() => {
    return active ? "white" : "text";
  }, [active]);

  return (
    <S.Container
      activeOpacity={0.6}
      disabled={!touchable || disabled}
      active={active}
      onPress={onPress}
      style={style}
    >
      {label ? (
        <Typography.Button width={'auto'} textColor={textColor} _t={_t}>
          {label}
        </Typography.Button>
      ) : (
        children
      )}
    </S.Container>
  );
};

export default Badge;
