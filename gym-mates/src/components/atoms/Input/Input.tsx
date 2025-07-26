import React from "react";
import { useTranslation } from "react-i18next";
import { TextStyle } from "react-native";
import Typography, { TypographyStyles } from "../Typography/Typography";
import S from "./styles";

interface InputProps {
  children?: React.ReactNode;
  onChange?: (text: string) => void;
  label?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, onChange, placeholder }) => {
  const { t } = useTranslation();
  const textStyle: TextStyle = TypographyStyles.caption;

  return (
    <S.Container>
      {label && (
        <Typography.BodySmall textColor="text">{t(label)}</Typography.BodySmall>
      )}
      <S.Input
        placeholder={placeholder && t(placeholder)}
        style={[textStyle]}
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={onChange}
      />
    </S.Container>
  );
};

export default Input;
