import { TouchableOpacity, ViewStyle } from "react-native";

import { Avatar, TTypographyVariants, Typography } from "@components/atoms";
import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { AppRoutes } from "@navigation/appRoutes";
import Feather from "@react-native-vector-icons/feather";
import { StoreState } from "@store/Store";
import { Colors, TColors } from "@theme";
import { useSelector } from "react-redux";
import S from "./Header.styles";
import { ArrowLeft } from "react-native-feather";

const User = () => {
  const { user } = useSelector((state: StoreState) => state.user);
  const { navigate } = useAppNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigate(AppRoutes.Profile)}
    >
      <Avatar
        size={50}
        disabled
        preview={user?.avatar?.url}
        iconSize={24}
        borderOffset={1}
      />
    </TouchableOpacity>
  );
};

interface CoinsProps {
  size?: number;
  disabled?: boolean;
  textVariant?: TTypographyVariants;
  textColor?: TColors;
  coinValue?: string;
}

const Coins = ({
  size = 10,
  disabled = false,
  textVariant = "headingSubtitle",
  coinValue,
  textColor = "text",
}: CoinsProps) => {
  const { user } = useSelector((state: StoreState) => state.user);
  const { navigate } = useAppNavigation();

  return (
    <S.CoinsContainer
      activeOpacity={0.6}
      disabled={disabled}
      onPress={() => navigate(AppRoutes.Shop)}
    >
      <Typography.Typography variant={textVariant} textColor={textColor}>
        {coinValue?.toString() || user?.coins.toString() || 0}
      </Typography.Typography>
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

interface BackLeftProps {
  backTo?: keyof typeof AppRoutes;
}

const BackLeft = ({ backTo }: BackLeftProps) => {
  const { goBack, canGoBack, navigate } = useAppNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        if (backTo) {
          navigate(backTo as any);
          return;
        }

        canGoBack() && goBack();
      }}
    >
      <ArrowLeft
        color={Colors.colors.text}
        width={24}
        height={24}
        stroke={Colors.colors.text}
      />
    </TouchableOpacity>
  );
};

interface RootProps {
  children: React.ReactNode;
  styles?: ViewStyle;
  justifyContent?: ViewStyle["justifyContent"];
}

const Root: React.FC<RootProps> = ({ children, styles, justifyContent }) => {
  return (
    <S.Container style={[styles, { justifyContent }]}>{children}</S.Container>
  );
};

export default {
  User,
  Root,
  Coins,
  BackLeft,
};
