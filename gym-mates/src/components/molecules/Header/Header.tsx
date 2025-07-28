import { TouchableOpacity, View, ViewStyle } from "react-native";

import S from "./styles";
import { useSelector } from "react-redux";
import { StoreState } from "@store/store";
import { CachedImage } from "@georstat/react-native-image-cache";
import { PropsWithChildren, useMemo } from "react";
import { Typography } from "@components/atoms";
import Feather from "@react-native-vector-icons/feather";
import { Colors } from "@theme";
import { useAppNavigation } from "@hooks";
import { AppRoutes } from "@navigation/appRoutes";

const User = () => {
  const { user } = useSelector((state: StoreState) => state.user);
  const { navigate } = useAppNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigate(AppRoutes.Profile)}
    >
      {user && user?.avatar && typeof user?.avatar !== "string" && (
        <CachedImage
          style={{ width: 48, height: 48 }}
          imageStyle={{
            borderRadius: 30,
            borderWidth: 1,
            borderColor: Colors.colors.border,
          }}
          source={user.avatar.url}
        />
      )}
    </TouchableOpacity>
  );
};

interface CoinsProps {
  size?: number;
}

const Coins = ({ size = 10 }: CoinsProps) => {
  const { user } = useSelector((state: StoreState) => state.user);

  return (
    <S.CoinsContainer>
      <Typography.HeadingSubtitle>
        {user?.coins || 0}
      </Typography.HeadingSubtitle>
      <S.CoinWrapper>
        <Feather
          name="dollar-sign"
          size={size}
          color={Colors.colors.secondary}
        />
      </S.CoinWrapper>
    </S.CoinsContainer>
  );
};

interface RootProps {
  children: React.ReactNode;
  styles?: ViewStyle;
  justifyContent?: ViewStyle["justifyContent"];
}

const Root: React.FC<RootProps> = ({ children, styles, justifyContent }) => {
  const memoizedStyle = useMemo(() => [], []);

  return (
    <S.Container style={[styles, { justifyContent }]}>{children}</S.Container>
  );
};

export default {
  User,
  Root,
  Coins,
};
