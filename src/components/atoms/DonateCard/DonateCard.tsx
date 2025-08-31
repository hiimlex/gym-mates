import React from "react";
import S from "./DonateCard.styles";
import Typography from "../Typography/Typography";
import { CachedImage } from "@georstat/react-native-image-cache";
import { Linking } from "react-native";

interface DonateCardProps {}

const DonateCard: React.FC<DonateCardProps> = () => {
  const openKoFi = () => {
    const url = "https://ko-fi.com/alex717891";
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Não foi possível abrir o link: " + url);
        }
      })
      .catch((err) => console.error("Erro ao abrir o link", err));
  };
  
  return (
    <S.Container activeOpacity={0.6} onPress={openKoFi}>
      <CachedImage
        source="https://storage.ko-fi.com/cdn/logomarkLogo.png"
        style={{ width: 32, height: 32 }}
      />
      <Typography.Button _t>{"profile.donate"}</Typography.Button>
    </S.Container>
  );
};

export default DonateCard;
