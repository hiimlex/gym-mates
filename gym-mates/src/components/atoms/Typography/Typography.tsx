import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Text, StyleSheet } from "react-native";
import { Colors, Fonts, TColors } from "../../../theme";
import Animated from "react-native-reanimated";

type TTypographyVariants =
  | "title"
  | "subtitle"
  | "heading"
  | "headingSubtitle"
  | "body"
  | "caption"
  | "tip";

interface TypographyProps {
  children?: React.ReactNode;
  textColor?: TColors;
  fontWeight?: keyof typeof Fonts.weights;
  translate?: boolean;
}

const Typography: React.FC<
  TypographyProps & {
    variant?: TTypographyVariants;
  }
> = ({ children, variant = "body", textColor, fontWeight }) => {
  const { t } = useTranslation();

  const resolvedTextColor = useMemo(
    () => textColor && Colors.colors[textColor],
    [textColor]
  );

  const stylesByVariant = useMemo(
    () => TypographyStyles[variant as keyof typeof TypographyStyles],
    [variant]
  );

  return (
    <Text
      style={[
        stylesByVariant,
        {
          color: resolvedTextColor,
          ...(fontWeight ? { fontWeight: Fonts.weights[fontWeight] } : {}),
        },
      ]}
    >
      {children && t(children.toString())}
    </Text>
  );
};

const Title: React.FC<TypographyProps> = (props) => {
  const { t } = useTranslation();

  const resolvedTextColor = useMemo(
    () => props.textColor && Colors.colors[props.textColor],
    [props.textColor]
  );

  return (
    <Text style={[TypographyStyles.title, { color: resolvedTextColor }]}>
      {props.translate ? t((props.children || "").toString()) : props.children}
    </Text>
  );
};

const Subtitle: React.FC<TypographyProps> = (props) => {
  const { t } = useTranslation();

  const resolvedTextColor = useMemo(
    () => props.textColor && Colors.colors[props.textColor],
    [props.textColor]
  );

  return (
    <Text style={[TypographyStyles.subtitle, { color: resolvedTextColor }]}>
      {props.translate ? t((props.children || "").toString()) : props.children}
    </Text>
  );
};

const Heading: React.FC<TypographyProps> = (props) => {
  const { t } = useTranslation();

  const resolvedTextColor = useMemo(
    () => props.textColor && Colors.colors[props.textColor],
    [props.textColor]
  );

  return (
    <Text style={[TypographyStyles.heading, { color: resolvedTextColor }]}>
      {props.translate ? t((props.children || "").toString()) : props.children}
    </Text>
  );
};

const HeadingSubtitle: React.FC<TypographyProps> = (props) => {
  const { t } = useTranslation();

  const resolvedTextColor = useMemo(
    () => props.textColor && Colors.colors[props.textColor],
    [props.textColor]
  );

  return (
    <Text
      style={[TypographyStyles.headingSubtitle, { color: resolvedTextColor }]}
    >
      {props.translate ? t((props.children || "").toString()) : props.children}
    </Text>
  );
};

const Body: React.FC<TypographyProps> = (props) => {
  const { t } = useTranslation();

  const resolvedTextColor = useMemo(
    () => props.textColor && Colors.colors[props.textColor],
    [props.textColor]
  );

  return (
    <Text style={[TypographyStyles.body, { color: resolvedTextColor }]}>
      {props.translate ? t((props.children || "").toString()) : props.children}
    </Text>
  );
};

const Caption: React.FC<TypographyProps> = (props) => {
  const { t } = useTranslation();

  const resolvedTextColor = useMemo(
    () => props.textColor && Colors.colors[props.textColor],
    [props.textColor]
  );

  return (
    <Text style={[TypographyStyles.caption, { color: resolvedTextColor }]}>
      {props.translate ? t((props.children || "").toString()) : props.children}
    </Text>
  );
};

const Tip: React.FC<TypographyProps> = (props) => {
  const { t } = useTranslation();

  const resolvedTextColor = useMemo(
    () => props.textColor && Colors.colors[props.textColor],
    [props.textColor]
  );

  return (
    <Text style={[TypographyStyles.tip, { color: resolvedTextColor }]}>
      {props.translate ? t((props.children || "").toString()) : props.children}
    </Text>
  );
};

const Button: React.FC<TypographyProps> = (props) => {
  const { t } = useTranslation();

  const resolvedTextColor = useMemo(
    () => props.textColor && Colors.colors[props.textColor],
    [props.textColor]
  );

  return (
    <Text style={[TypographyStyles.button, { color: resolvedTextColor }]}>
      {props.translate ? t((props.children || "").toString()) : props.children}
    </Text>
  );
};

export const TypographyStyles = StyleSheet.create({
  title: {
    fontWeight: Fonts.weights.bold,
    fontFamily: Fonts.types.bold,
    fontSize: Fonts.sizes.title,
  },
  subtitle: {
    fontWeight: Fonts.weights.semiBold,
    fontFamily: Fonts.types.semiBold,
    fontSize: Fonts.sizes.subtitle,
  },
  heading: {
    fontWeight: Fonts.weights.bold,
    fontFamily: Fonts.types.bold,
    fontSize: Fonts.sizes.heading,
  },
  headingSubtitle: {
    fontWeight: Fonts.weights.semiBold,
    fontFamily: Fonts.types.semiBold,
    fontSize: Fonts.sizes.headingSubtitle,
  },
  body: {
    fontWeight: Fonts.weights.medium,
    fontFamily: Fonts.types.medium,
    fontSize: Fonts.sizes.body,
  },
  caption: {
    fontWeight: Fonts.weights.medium,
    fontFamily: Fonts.types.medium,
    fontSize: Fonts.sizes.caption,
  },
  button: {
    fontWeight: Fonts.weights.bold,
    fontFamily: Fonts.types.bold,
    fontSize: Fonts.sizes.button,
  },
  tip: {
    fontWeight: Fonts.weights.medium,
    fontFamily: Fonts.types.medium,
    fontSize: Fonts.sizes.tip,
  },
});

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
