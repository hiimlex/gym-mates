import { Header } from "@components/molecules";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import S from "./styles";
import { Typography } from "@components/atoms";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { StoreState } from "@store/store";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useSelector((state: StoreState) => state.user);

  if (!user) {
    return null;
  }

  return (
    <S.Container
      style={{
        paddingTop: insets.top + 24,
      }}
    >
      <Header.Root justifyContent="space-between">
        <Header.User />
        <Header.Coins />
      </Header.Root>

      <View style={{ gap: 6 }}>
        <Typography.Subtitle textColor="textDark">
          {t("home.title", { name: user.name })}
        </Typography.Subtitle>
        <Typography.Body textColor="textLight">
          {t("home.subtitle")}
        </Typography.Body>
      </View>
    </S.Container>
  );
};

export default Home;
