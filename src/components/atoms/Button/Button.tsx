import React, { useMemo } from "react";
import S from "./Button.styles";
import { useTranslation } from "react-i18next";
import Typography, { TTypographyVariants } from "../Typography/Typography";
import { ViewStyle } from "react-native";
import Loader from "../Loader/Loader";
import { Colors, TColors } from "@theme";

export interface ButtonProps {
  title: string;
  colorScheme?: "primary" | "secondary" | "tertiary" | "danger";
  variant?: "filled" | "outlined" | "text";
  styles?: ViewStyle;
  disabled?: boolean;
  onPress?: () => void;
  loading?: boolean;
  textVariant?: TTypographyVariants;
  fillWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  colorScheme = "primary",
  variant = "filled",
  styles,
  disabled,
  onPress,
  loading,
  textVariant = "button",
  fillWidth = false,
}) => {
  const { t } = useTranslation();

  const textColor: TColors = useMemo(() => {
    if (disabled) {
      return "textLight";
    }

    if (variant === "outlined") {
      return colorScheme;
    }

    if (variant === "filled" && colorScheme === "primary") {
      return "white";
    }

    if (colorScheme === "secondary" || colorScheme === "tertiary") {
      return "textDark";
    }

    if (colorScheme === "danger") {
      return "white";
    }

    return "white";
  }, [colorScheme, variant, disabled]);

  return (
    <S.Button
      disabled={disabled}
      buttonVariant={variant}
      colorScheme={colorScheme}
      activeOpacity={0.6}
      onPress={onPress}
      style={styles}
    >
      {!loading && (
        <Typography.Typography variant={textVariant} textColor={textColor}>
          {t(title)}
        </Typography.Typography>
      )}
      {loading && !disabled && (
        <Loader size="42" strokeWidth={2} color={textColor} />
      )}
    </S.Button>
  );
};

export default Button;
