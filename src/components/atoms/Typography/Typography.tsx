import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Text, StyleSheet, TextStyle } from "react-native";
import { Colors, Fonts, TColors } from "../../../theme";
import Animated from "react-native-reanimated";

export type TTypographyVariants =
  | "title"
  | "subtitle"
  | "heading"
  | "headingSubtitle"
  | "body"
  | "caption"
  | "button"
  | "tip";

export type TFontsWeight = keyof typeof Fonts.weights;

interface TypographyProps {
  children?: React.ReactNode;
  textColor?: TColors;
  fontWeight?: TFontsWeight;
  fontStyle?: TextStyle["fontStyle"];
  fontFamily?: TextStyle["fontFamily"];
  textAlign?: TextStyle["textAlign"];
  _t?: boolean;
  _params?: Record<string, any>;
  width?: TextStyle["width"];
  style?: TextStyle | TextStyle[];
}

const Typography: React.FC<
  TypographyProps & {
    variant?: TTypographyVariants;
  }
> = ({
  children,
  variant = "body",
  textColor = "textDark",
  fontWeight,
  fontStyle,
  fontFamily,
  textAlign,
  width,
  _t,
  _params,
  style,
}) => {
  const { t } = useTranslation();

  const resolvedTextColor = useMemo(
    () => textColor && Colors.colors[textColor],
    [textColor]
  );

  const stylesByVariant = useMemo(
    () => TypographyStyles[variant as keyof typeof TypographyStyles],
    [variant]
  );

  const customStyles: TextStyle = useMemo(() => {
    return {
      ...(fontWeight ? { fontWeight: Fonts.weights[fontWeight] } : {}),
      ...(resolvedTextColor ? { color: resolvedTextColor } : {}),
      ...(fontFamily ? { fontFamily } : {}),
      ...(fontStyle ? { fontStyle } : {}),
      ...(width ? { width } : {}),
      ...(textAlign ? { textAlign } : {}),
    };
  }, [fontWeight, resolvedTextColor, fontFamily, fontStyle, textAlign, width]);

  return (
    <Text style={[stylesByVariant, customStyles, style]}>
      {_t ? t(children?.toString() || "", _params) : children}
    </Text>
  );
};

export const TypographyStyles = StyleSheet.create({
  title: {
    fontWeight: Fonts.weights.bold,
    fontFamily: Fonts.types.bold,
    fontSize: Fonts.sizes.title,
    lineHeight: Fonts.sizes.title * 1.4,
  },
  subtitle: {
    fontWeight: Fonts.weights.semibold,
    fontFamily: Fonts.types.semibold,
    fontSize: Fonts.sizes.subtitle,
    lineHeight: Fonts.sizes.subtitle * 1.4,
  },
  heading: {
    fontWeight: Fonts.weights.bold,
    fontFamily: Fonts.types.bold,
    fontSize: Fonts.sizes.heading,
    lineHeight: Fonts.sizes.heading * 1.4,
  },
  headingSubtitle: {
    fontWeight: Fonts.weights.semibold,
    fontFamily: Fonts.types.semibold,
    fontSize: Fonts.sizes.headingSubtitle,
    lineHeight: Fonts.sizes.headingSubtitle * 1.4,
  },
  body: {
    fontWeight: Fonts.weights.medium,
    fontFamily: Fonts.types.medium,
    fontSize: Fonts.sizes.body,
    lineHeight: Fonts.sizes.body * 1.4,
  },
  caption: {
    fontWeight: Fonts.weights.medium,
    fontFamily: Fonts.types.medium,
    fontSize: Fonts.sizes.caption,
    lineHeight: Fonts.sizes.caption * 1.4,
  },
  button: {
    fontWeight: Fonts.weights.bold,
    fontFamily: Fonts.types.bold,
    fontSize: Fonts.sizes.button,
    lineHeight: Fonts.sizes.button * 1.4,
  },
  tip: {
    fontWeight: Fonts.weights.medium,
    fontFamily: Fonts.types.medium,
    fontSize: Fonts.sizes.tip,
    lineHeight: Fonts.sizes.tip * 1.4,
  },
});

const Title = (props: TypographyProps) => (
  <Typography variant="title" {...props} />
);
const Subtitle = (props: TypographyProps) => (
  <Typography variant="subtitle" {...props} />
);
const Heading = (props: TypographyProps) => (
  <Typography variant="heading" {...props} />
);
const HeadingSubtitle = (props: TypographyProps) => (
  <Typography variant="headingSubtitle" {...props} />
);
const Body = (props: TypographyProps) => (
  <Typography variant="body" {...props} />
);
const Caption = (props: TypographyProps) => (
  <Typography variant="caption" {...props} />
);
const Tip = (props: TypographyProps) => <Typography variant="tip" {...props} />;
const Button = (props: TypographyProps) => (
  <Typography variant="button" {...props} />
);

export default {
  Typography,
  Title,
  Subtitle,
  Heading,
  HeadingSubtitle,
  Body,
  Caption,
  Tip,
  Button,
};
