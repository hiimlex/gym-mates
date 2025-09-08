import { CachedImage } from "@georstat/react-native-image-cache";
import { AchievementRarity } from "@models/collections";
import React from "react";
import { Image } from "react-native";
import S from "./AchievementIcon.styles";

const common = require("../../../assets/achievement_common.png");
const epic = require("../../../assets/achievement_epic.png");
const rare = require("../../../assets/achievement_rare.png");
const legendary = require("../../../assets/achievement_legendary.png");

const imageByRarity: Record<AchievementRarity, any> = {
  common,
  epic,
  rare,
  legendary,
};

interface AchievementIconProps {
  rarity: AchievementRarity;
  size?: number;
}

const AchievementIcon: React.FC<AchievementIconProps> = ({
  rarity = "common",
  size = 48,
}) => {
  return (
    <S.Container style={{ width: size, height: size }}>
      <Image
        source={imageByRarity[rarity]}
        resizeMode="cover"
        style={{ width: size, height: size }}
      />
    </S.Container>
  );
};

export default AchievementIcon;
