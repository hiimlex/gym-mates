import { RegisterOptions, UseControllerProps } from "react-hook-form";
import { TextInput } from "react-native";

export type InputRefRecorder<T> = Record<
  keyof T,
  React.RefObject<TextInput | null>
>;

export const DateFormat = "MM-dd-yy";
export const DateTimeFormat = "MM-dd-yyyy HH:mm";

type OmitRegisterOptions =
  | "disabled"
  | "deps"
  | "setValueAs"
  | "valueAsNumber"
  | "shouldUnregister"
  | "onBlur"
  | "onChange"
  | "value"
  | "valueAsDate"
  | "validate";

export const FieldErrors: Record<
  keyof Omit<RegisterOptions, OmitRegisterOptions>,
  string
> = {
  required: "fieldErrors.required",
  maxLength: "fieldErrors.maxLength",
  minLength: "fieldErrors.minLength",
  pattern: "fieldErrors.pattern",
  max: "fieldErrors.max",
  min: "fieldErrors.min",
};
