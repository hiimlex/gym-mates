import { Colors } from "@theme";
import React from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { ArrowLeft } from "react-native-feather";
import {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Typography from "../Typography/Typography";
import S from "./Dialog.styles";
import { BlurProps } from "@models/generic";

export interface DialogProps {
  children?: React.ReactNode;
  title?: string;
  _t?: boolean; // Translation key for the title
  onBackPress?: () => void; // Optional callback for back press
  action?: () => void; // Optional action callback
  actionLabel?: string; // Optional label for the action button
  showAction?: () => boolean; // Optional flag to disable actions
  showTitle?: boolean; // Optional flag to disable title rendering
}

const Dialog: React.FC<DialogProps> = ({
  children,
  title,
  _t,
  onBackPress,
  action,
  actionLabel,
  showAction = () => true,
  showTitle = true,
}) => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  return (
    <S.Wrapper
      style={{ width, height, paddingTop: insets.top }}
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(150)}
    >
      <S.Container entering={SlideInDown} exiting={SlideOutDown}>
        <S.Blur {...BlurProps} style={{ paddingBottom: insets.bottom }}>
          {showTitle && (
            <S.Title>
              <S.TitleInfo>
                <TouchableOpacity activeOpacity={0.6} onPress={onBackPress}>
                  <ArrowLeft stroke={Colors.colors.text} />
                </TouchableOpacity>

                {title && (
                  <Typography.HeadingSubtitle textColor="text" _t={_t}>
                    {title}
                  </Typography.HeadingSubtitle>
                )}
              </S.TitleInfo>

              {actionLabel && showAction() && (
                <TouchableOpacity onPress={action}>
                  <Typography.Button textColor="primary" _t>
                    {actionLabel}
                  </Typography.Button>
                </TouchableOpacity>
              )}
            </S.Title>
          )}
          {children}
        </S.Blur>
      </S.Container>
    </S.Wrapper>
  );
};

export default Dialog;
