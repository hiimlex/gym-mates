import { ScreenWrapper } from "@components/molecules";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import React from "react";
import S from "./Help.styles";
import { Avatar, Card, Menu, Row, Typography } from "@components/atoms";
import { useSelector } from "react-redux";
import { StoreState } from "@store/Store";
import { useScreenSize } from "@hooks/useScreenSize/useScreenSize";
import { View } from "react-native";
import { useDialogService } from "@hooks/useDialogService/useDialogService";

const Help: React.FC<ScreenProps<AppRoutes.Help>> = ({}) => {
  const { user } = useSelector((state: StoreState) => state.user);
  const { insets, headerHeight } = useScreenSize();
  const { openCoinSystemInfo, openStreakSystemInfo, openCrewRulesInfo } =
    useDialogService();

  return (
    <ScreenWrapper useHeaderHeight>
      <S.Container
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 24,
        }}
      >
        <S.Group>
          <Typography.HeadingSubtitle
            _t
            textColor="textDark"
            _params={{ name: user?.name }}
          >
            {"help.title"}
          </Typography.HeadingSubtitle>
          <Typography.Body _t textColor="text">
            {"help.body"}
          </Typography.Body>

          <Menu.Root>
            <Menu.Item
              _t
              isLast
              label="help.contact"
              onPress={() => {}}
            ></Menu.Item>
          </Menu.Root>
        </S.Group>

        <S.Group>
          <Typography.Body _t _params={{ name: user?.name }}>
            {"help.faq"}
          </Typography.Body>

          <Menu.Root>
            <Menu.Item
              _t
              label="help.faqList.rulesSystem"
              onPress={openCrewRulesInfo}
            ></Menu.Item>
            <Menu.Item
              _t
              label="help.faqList.coinSystem"
              onPress={openCoinSystemInfo}
              isLast
            ></Menu.Item>
          </Menu.Root>
        </S.Group>

        <S.HR></S.HR>

        <Card>
          <Row gap={12} align="flex-start">
            <Avatar
              preview="https://avatars.githubusercontent.com/u/49082043?v=4"
              size={48}
              iconSize={24}
              disabled
              borderColor="tertiary"
            />
            <View>
              <Typography.Caption
                _t
                textColor="textLight"
                style={{ maxWidth: "90%" }}
              >
                {"help.future"}
              </Typography.Caption>
            </View>
          </Row>
        </Card>
      </S.Container>
    </ScreenWrapper>
  );
};

export default Help;
