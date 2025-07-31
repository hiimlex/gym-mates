import { TextInput } from "react-native";

export type InputRefRecorder<T> = Record<keyof T, React.RefObject<TextInput | null>>;

export const DateFormat = 'MM-dd-yy';
export const DateTimeFormat = 'MM-dd-yyyy HH:mm';