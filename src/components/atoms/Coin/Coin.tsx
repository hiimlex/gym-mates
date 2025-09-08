import { TColors } from "@theme";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import Row from "../Row/Row";
import { useSelector } from "react-redux";
import { StoreState } from "@store/Store";

interface CoinProps {
  label?: string;
  showLabel?: boolean;
  textVariant?: "button" | "headingSubtitle" | "body";
  textColor?: TColors;
  size?: number;
  rowGap?: number;
  showUserCoins?: boolean;
  touchable?: boolean;
  onPress?: () => void;
}

const coinIcon = require("../../../assets/coin.png");

const Coin: React.FC<CoinProps> = ({
  label = "0",
  textVariant = "button",
  textColor = "text",
  size = 24,
  rowGap = 6,
  showUserCoins = false,
  touchable = false,
  showLabel = true,
  onPress,
}) => {
  const userCoins =
    useSelector((state: StoreState) => state.user.user?.coins) || 0;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{ flexDirection: "row", alignItems: "center", gap: rowGap }}
      onPress={onPress}
      disabled={!touchable}
    >
      {showLabel && (
        <Typography.Typography
          textColor={textColor}
          fontWeight="semibold"
          variant={textVariant}
          _t={false}
        >
          {showUserCoins ? userCoins : label}
        </Typography.Typography>
      )}

      <Image source={coinIcon} style={{ height: size, width: size }} />
    </TouchableOpacity>
  );
};

export default Coin;
