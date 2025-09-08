import React, { useEffect, useMemo } from "react";
import { useWindowDimensions, View } from "react-native";
import S from "./Notification.styles";
import { ICreateNotification, INotificationType } from "@models/generic";
import Typography from "../Typography/Typography";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
} from "react-native-feather";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/Store";
import { NotifierActions } from "@store/slices";
import { Colors, TColors, TColorsType } from "@theme";
import { SvgProps } from "react-native-svg";
import { FadeInDown, FadeInUp, FadeOutUp } from "react-native-reanimated";

const Notification: React.FC<ICreateNotification> = ({
  id,
  message,
  duration = 3000,
  type = "info",
  showDefaultIcon = true,
  closable = true,
  icon,
  onClose,
  onPress,
  _params,
  _t = true,
}) => {
  const { width } = useWindowDimensions();

  const textColor: TColors = useMemo(() => {
    if (type === "info" || type === "warning") return "textDark";

    return "white";
  }, [type]);

  const iconProps: SvgProps = {
    fill: Colors.colors[textColor],
    fillOpacity: 0.2,
    stroke: Colors.colors[textColor],
    width: 16,
    height: 16,
  };

  const iconByType: Record<INotificationType, React.ReactNode> = {
    error: <XCircle {...iconProps} />,
    info: <Info {...iconProps} />,
    success: <CheckCircle {...iconProps} />,
    warning: <AlertTriangle {...iconProps} />,
  };

  const dispatch = useDispatch<AppDispatch>();

  const closeNotification = () => {
    if (onPress) {
      onPress();
    }

    if (closable) {
      dispatch(NotifierActions.removeNotification({ id }));
    }
  };

  useEffect(() => {
    if (duration) {
      setTimeout(() => {
        dispatch(NotifierActions.removeNotification({ id }));
      }, duration);
    }
  }, [duration]);

  return (
    <S.Notification
      type={type}
      activeOpacity={0.6}
      onPress={closeNotification}
      disabled={!closable}
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={{ maxWidth: width * 0.8 }}
    >
      {showDefaultIcon && !icon && iconByType[type]}
      {icon && <View>{icon}</View>}
      <Typography.Button
        style={{ flex: 1 }}
        _t={_t}
        _params={_params}
        textColor={textColor}
      >
        {message}
      </Typography.Button>
    </S.Notification>
  );
};

export default Notification;
