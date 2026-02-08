export interface ButtonProps {
  title: string;
  colorScheme?: "primary" | "secondary" | "tertiary" | "danger";
  variant?: "filled" | "outlined" | "text";
  styles?: import("react-native").ViewStyle;
  disabled?: boolean;
  onPress?: () => void;
  loading?: boolean;
  textVariant?: import("../Typography/Typography").TTypographyVariants;
  fillWidth?: boolean;
}
