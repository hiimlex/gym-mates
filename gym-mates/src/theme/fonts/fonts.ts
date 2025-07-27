import { TextStyle } from "react-native";

const types = {
  light: "SF Pro Rounded",
  regular: "SF Pro Rounded",
  medium: "SF Pro Rounded",
  semiBold: "SF Pro Rounded",
  bold: "SF Pro Rounded",
};

const weights: Record<string, TextStyle["fontWeight"]> = {
  light: "300",
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
};

const sizes = {
  title: 32,
  subtitle: 24,
  heading: 20,
  headingSubtitle: 18,
  body: 16,
  button: 14,
  caption: 14,
  tip: 10,
};

export default {
  types,
  weights,
  sizes,
};
