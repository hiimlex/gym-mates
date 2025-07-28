import React, { useMemo } from "react";
import S from "./styles";
import { useTranslation } from "react-i18next";
import Typography from "../Typography/Typography";
import { ViewStyle } from "react-native";
import Loader from "../Loader/Loader";
import { Colors, TColors } from "@theme";

export interface ButtonProps {
  title: string;
  colorScheme?: "primary" | "secondary" | "tertiary";
  variant?: "filled" | "outlined" | "text";
  styles?: ViewStyle;
  disabled?: boolean;
  onPress?: () => void;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  colorScheme = "primary",
  variant = "filled",
  styles,
  disabled,
  onPress,
  loading,
}) => {
  const { t } = useTranslation();

  const textColor: TColors = useMemo(() => {
    if (disabled) {
      return "textLight";
    }

    if (variant === "outlined") {
      return colorScheme;
    }

    if (variant === "filled") {
      return "white";
    }

    return "white";
  }, [colorScheme, variant, disabled]);

  return (
    <S.Button
      style={[styles]}
      disabled={disabled}
      buttonVariant={variant}
      colorScheme={colorScheme}
      activeOpacity={0.6}
      onPress={onPress}
    >
      {!loading && (
        <Typography.Button textColor={textColor}>{t(title)}</Typography.Button>
      )}
      {loading && !disabled && <Loader size="42" strokeWidth={2} color={textColor} />}
    </S.Button>
  );
};

export default Button;
