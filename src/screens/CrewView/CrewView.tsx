import { Row, Tabs, Typography } from "@components/atoms";
import BannerPreview from "@components/atoms/BannerPreview/BannerPreview";
import { ScreenWrapper } from "@components/molecules";
import { CrewCalendarView, CrewRankView } from "@components/organisms";
import { TabHeader } from "@models/generic";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { Colors } from "@theme";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Code, User } from "react-native-feather";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import S from "./CrewView.styles";

const CrewView: React.FC<ScreenProps<AppRoutes.CrewView>> = ({
  navigation,
  route,
}) => {
  const crew = route.params?.crew;
  const headerHeight = useHeaderHeight();
  const pagerRef = useRef<PagerView | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const headerTabs: TabHeader[] = [
    {
      title: "crewView.rank",
      key: 0,
    },
    {
      title: "crewView.calendar",
      key: 1,
    },
  ];

  if (!crew) {
    navigation.goBack();
    return null;
  }

  return (
    <ScreenWrapper>
      <S.Container paddingTop={headerHeight + 24}>
        <Row gap={12} align="center" width={"auto"}>
          <BannerPreview preview={crew?.banner?.url} size={60} iconSize={24} />

          <View style={{ gap: 6 }}>
            <Typography.Heading fontWeight="medium" textColor="text" _t>
              {crew.name}
            </Typography.Heading>

            <Row gap={12}>
              <Row gap={3} align="center" width={"auto"}>
                <Code width={16} height={16} stroke={Colors.colors.textLight} />
                <Typography.Caption textColor="textLight">
                  {crew.code}
                </Typography.Caption>
              </Row>
              <Row gap={3}>
                <User
                  width={16}
                  height={16}
                  stroke={Colors.colors.textLight}
                  fill={Colors.colors.textLight}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Typography.Caption textColor="textLight">
                  {crew.members_w_user.length}
                </Typography.Caption>
              </Row>
            </Row>
          </View>
        </Row>

        <Tabs.Root
          pagerRef={pagerRef}
          initialPage={0}
          scrollEnabled
          header={headerTabs}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
          <Tabs.Item key={0}>{currentPage === 0 && <CrewRankView />}</Tabs.Item>
          <Tabs.Item key={1}>
            {currentPage === 1 && <CrewCalendarView />}
          </Tabs.Item>
        </Tabs.Root>
      </S.Container>
    </ScreenWrapper>
  );
};

export default CrewView;
