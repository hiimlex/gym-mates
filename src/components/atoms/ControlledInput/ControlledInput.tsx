import React, { useMemo } from "react";

import { FieldErrors } from "@models/generic";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { View } from "react-native";
import Input, { InputProps } from "../Input/Input";
import Typography from "../Typography/Typography";

interface ControlledInputProps<T extends FieldValues = FieldValues>
  extends InputProps {
  control: Control<T>;
  name: FieldPath<T>;
  disabled?: boolean;
  rules?: UseControllerProps["rules"];
  showErrorMessage?: boolean;
  maskFn?: (value: string) => string;
}

const ControlledInput = <T extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  disabled = false,
  showErrorMessage = false,
  maskFn,
  ...inputProps
}: ControlledInputProps<T>) => {
  const rulesWithMessage: UseControllerProps["rules"] = useMemo(
    () =>
      Object.keys(rules || {})
        .map((key) => {
          const errorMessage = FieldErrors[key as keyof typeof FieldErrors];

          if (!!errorMessage) {
            return {
              [key]: { value: (rules as any)[key], message: errorMessage },
            };
          }

          return { [key]: (rules as any)[key] };
        })
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    [rules]
  );

  return (
    <Controller
      control={control as Control<any>}
      name={name}
      rules={rulesWithMessage}
      disabled={disabled}
      render={({ field, fieldState }) => (
        <View style={{ gap: 6 }}>
          <Input
            {...inputProps}
            onChangeText={(e) => {
              const maskedValue = maskFn ? maskFn(e) : e;
              inputProps.onChangeText && inputProps.onChangeText(maskedValue);
              field.onChange(maskedValue);
            }}
            onBlur={(e) => {
              inputProps.onBlur && inputProps.onBlur(e);
              field.onBlur();
            }}
            value={field.value}
          />
          {fieldState.error && showErrorMessage && (
            <Typography.Tip _t textColor="danger">
              {fieldState.error.message}
            </Typography.Tip>
          )}
        </View>
      )}
    />
  );
};

export default ControlledInput;
