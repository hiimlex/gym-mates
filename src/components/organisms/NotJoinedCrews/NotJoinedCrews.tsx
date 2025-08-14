import { useDialogService } from "@hooks/useDialogService/useDialogService";
import { StoreState } from "@store/Store";
import { Colors } from "@theme";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { PlusCircle, Users } from "react-native-feather";
import { useSelector } from "react-redux";
import { Icons, Menu, Row, Typography } from "../../atoms";
import S from "./NotJoinedCrews.styles";

interface NotJoinedCrewsProps {}

const NotJoinedCrews: React.FC<NotJoinedCrewsProps> = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: StoreState) => state.user);
  const { openJoinCrew, openCreateCrew } = useDialogService();

  if (!user) {
    return null;
  }

  return (
    <S.Container>
      <S.AlignCenter style={{ gap: 12 }}>
        <Typography.Subtitle _t _params={{ name: user.name }}>
          {"home.title"}
        </Typography.Subtitle>

        <S.AlignCenter>
          <Typography.Body _t textColor="text">
            {"home.noCrewsSubtitle"}
          </Typography.Body>

          <Row gap={2}>
            <Typography.Body textColor="text">
              {t("home.noCrews.start")}
            </Typography.Body>
            <Typography.Body textColor="primary">
              {t("home.highlight.new")}
            </Typography.Body>
            <Typography.Body textColor="text">
              {t("home.noCrews.oneForEarn")}
            </Typography.Body>
            <Typography.Body textColor="secondary">
              {t("home.highlight.coins")}
            </Typography.Body>
          </Row>
        </S.AlignCenter>

        <Icons.NoCrewSplash />
      </S.AlignCenter>

      <View style={{ width: "100%" }}>
        <Menu.Item
          label="home.menu.createCrew"
          onPress={openCreateCrew}
          _t
          icon={
            <PlusCircle
              width={20}
              height={20}
              fill={Colors.colors.text}
              stroke={Colors.colors.text}
              fillOpacity={0.2}
            />
          }
        />
        <Menu.Item
          label="home.menu.joinCrew"
          onPress={openJoinCrew}
          _t
          isLast
          icon={
            <Users
              width={20}
              height={20}
              fill={Colors.colors.text}
              stroke={Colors.colors.text}
              fillOpacity={0.2}
            />
          }
        />
      </View>
    </S.Container>
  );
};

export default NotJoinedCrews;
