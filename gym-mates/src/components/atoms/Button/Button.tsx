import React, { useMemo } from "react";
import S from "./styles";
import { useTranslation } from "react-i18next";
import Typography from "../Typography/Typography";
import { ViewStyle } from "react-native";

export interface ButtonProps {
  title: string;
  colorScheme?: "primary" | "secondary" | "tertiary";
  variant?: "filled" | "outlined" | "text";
  styles?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  colorScheme = "primary",
  variant = "filled",
  styles,
}) => {
  const { t } = useTranslation();

  const textColor = useMemo(() => {
    if (variant === "outlined") {
      return colorScheme;
    }

    if (variant === "filled") {
      return "white";
    }
  }, [colorScheme, variant]);

  return (
    <S.Button style={[styles]}>
      <Typography.Button textColor={textColor}>{t(title)}</Typography.Button>
    </S.Button>
  );
};

export default Button;
