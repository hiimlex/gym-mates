import React from "react";
import { useTranslation } from "react-i18next";
import { TextInput, TextInputProps, TextStyle, ViewStyle } from "react-native";
import Typography, { TypographyStyles } from "../Typography/Typography";
import S from "./Input.styles";

export interface InputProps extends TextInputProps {
  children?: React.ReactNode;
  label?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
  inputRef?: React.RefObject<TextInput | null>;
  style?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  suffix,
  inputRef,
  style,
  ...inputProps
}) => {
  const { t } = useTranslation();
  const textStyle: TextStyle = TypographyStyles.caption;

  return (
    <S.Container>
      {label && (
        <Typography.Caption textColor="text">{t(label)}</Typography.Caption>
      )}
      <S.Input
        placeholder={placeholder && t(placeholder)}
        style={[textStyle, { fontSize: 14 }, style]}
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        {...inputProps}
        ref={inputRef}
      />
      {suffix && <S.FloatSuffix>{suffix}</S.FloatSuffix>}
    </S.Container>
  );
};

export default Input;
