import { TextStyle } from "react-native";

const types = {
  regular: "SF-Pro-Rounded-Regular",
  medium: "SF-Pro-Rounded-Medium",
  semibold: "SF-Pro-Rounded-Semibold",
  bold: "SF-Pro-Rounded-Bold",
};

const weights: Record<string, TextStyle["fontWeight"]> = {
  regular: "400",
  medium: "500",
  semibold: "600",
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
  tip: 12,
};

export default {
  types,
  weights,
  sizes,
};
