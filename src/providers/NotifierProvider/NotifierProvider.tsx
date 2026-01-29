import { Notification } from "@components/atoms";
import { StoreState } from "@store/Store";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import S from "./NotifierProvider.styles";

const NotifierProvider: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { notifications } = useSelector((state: StoreState) => state.notifier);

  return (
    notifications &&
    notifications.length > 0 && (
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
    )
  );
};

export default NotifierProvider;
