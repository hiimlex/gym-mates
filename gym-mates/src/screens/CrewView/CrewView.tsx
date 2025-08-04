import { Row, Typography } from "@components/atoms";
import BannerPreview from "@components/atoms/BannerPreview/BannerPreview";
import {
  CrewLastActivities,
  CrewTodayWorkouts,
  CrewViewActions,
  ScreenWrapper,
} from "@components/molecules";
import { AppRoutes, TRootStackParamList } from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CrewsActions } from "@store/slices";
import { AppDispatch } from "@store/store";
import { Colors } from "@theme";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Code, User } from "react-native-feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import S from "./styles";

const CrewView: React.FC<
  NativeStackScreenProps<TRootStackParamList, AppRoutes.CrewView>
> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const crew = route.params?.crew;
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch<AppDispatch>();

  const [scrolled, setScrolled] = useState(false);

  if (!crew) {
    navigation.goBack();
    return null;
  }

  useEffect(() => {
    if (crew) {
      dispatch(CrewsActions.setCrewView(crew));
    }
  }, [crew]);

  return (
    <ScreenWrapper>
      <S.Container
        style={{
          paddingBottom: insets.bottom,
        }}
        contentContainerStyle={{
          padding: 24,
          paddingTop: headerHeight + 24,
          gap: 24,
        }}
      >
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

        <CrewTodayWorkouts />
        <CrewLastActivities />
      </S.Container>
    </ScreenWrapper>
  );
};

export default CrewView;
