import { useScreenSize } from "@hooks/useScreenSize/useScreenSize";
import { useWindowDimensions, View } from "react-native";
import S from "./NotifierProvider.styles";
import { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { StoreState } from "@store/Store";
import { Notification } from "@components/atoms";

const NotifierProvider: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { notifications } = useSelector((state: StoreState) => state.notifier);

  return (
    <S.AbsoluteContainer
      aria-disabled
      style={{
        width,
        height,
        paddingTop: insets.top + 32,
      }}
    >
      {notifications.map((notification, index) => (
        <Notification key={index} {...notification} />
      ))}
    </S.AbsoluteContainer>
  );
};

export default NotifierProvider;
