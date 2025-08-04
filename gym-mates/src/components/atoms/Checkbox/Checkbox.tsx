import React from "react";
import { View } from "react-native";
import Typography from "../Typography/Typography";
import S from "./Checkbox.styles";
import { Check } from "react-native-feather";
import { Colors } from "@theme";

interface CheckboxProps {
  label?: string;
  _t?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  _t,
  checked,
  onChange,
  disabled
}) => {
  const handlePress = () => {
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <S.Wrapper onPress={handlePress} activeOpacity={0.6} disabled={disabled}>
      <S.Checkbox checked={checked}>
        {checked && <Check width={16} height={16} stroke={Colors.colors.primary} />}
      </S.Checkbox>
      <Typography.Body textColor="text" _t={_t}>{label}</Typography.Body>
    </S.Wrapper>
  );
};

export default Checkbox;
