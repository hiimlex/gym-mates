import { CrewsService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Coin, Loader, Row, Typography } from "@components/atoms";
import { MissionIcon } from "@components/dialogs";
import { Header, ScreenWrapper } from "@components/molecules";
import { JoinedCrewsView, NotJoinedCrews } from "@components/organisms";
import { ICrewsResponse } from "@models/collections";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { useIsFocused } from "@react-navigation/native";
import { ConfigActions, CrewsActions, NotifierActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { getCrewRules } from "@utils/getCrewRules";
import { getMessageFromError } from "@utils/handleAxiosError";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import S from "./Home.styles";

const Home: React.FC<ScreenProps<AppRoutes.Home>> = ({
  navigation: { navigate },
}) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useSelector((state: StoreState) => state.user);
  const { crews } = useSelector((state: StoreState) => state.crews);
  const { bottomNavHeight } = useSelector((state: StoreState) => state.config);
  const isScreenFocused = useIsFocused();

  const dispatch = useDispatch<AppDispatch>();

  const {
    loading: loadingUserCrews,
    data,
    error,
  } = useQuery<ICrewsResponse>(CrewsService.gql.CREWS_BY_MEMBER, {
    variables: { userId: user?._id },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (!data || !data.crews || data.crews.length === 0) {
      dispatch(CrewsActions.setCrews([]));
      dispatch(ConfigActions.setHideBottomNav(true));
    }

    if (data?.crews && data?.crews.length > 0) {
      dispatch(CrewsActions.setCrews(data.crews));
      dispatch(ConfigActions.setHideBottomNav(false));

      // Check crew rules by all crews
      // E.G: If the user is in a crew that has no free weekends, the rule apply to user rules
      const userRules = getCrewRules(data.crews);

      if (userRules) {
        dispatch(CrewsActions.setRules(userRules));
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      const message = getMessageFromError(error);

      if (message) {
        dispatch(
          NotifierActions.createNotification({
            id: "home-fetch-crews-error",
            type: "error",
            message,
          })
        );
      }
      dispatch(ConfigActions.setHideBottomNav(true));
    }
  }, [error]);

  const hasJoinedCrews = useMemo(() => crews.length > 0, [crews]);

  if (!user) {
    return null;
  }

  return (
    <ScreenWrapper>
      <S.Container
        contentContainerStyle={{
          gap: 24,
          flexGrow: 1,
          paddingBottom: bottomNavHeight + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header.Root justifyContent="space-between">
          <Header.User />

          <Row gap={24} align="center" width={"auto"}>
            <MissionIcon />

            <Coin
              showUserCoins
              textVariant="body"
              touchable
              onPress={() => navigate(AppRoutes.Shop)}
            />
          </Row>
        </Header.Root>

        {hasJoinedCrews && (
          <View style={{ gap: 6 }}>
            <Typography.Subtitle textColor="textDark">
              {t("home.title", { name: user.name })}
            </Typography.Subtitle>
            <Typography.Body textColor="textLight" _t>
              {"home.subtitle"}
            </Typography.Body>
          </View>
        )}

        {loadingUserCrews && (
          <View style={{ flex: 1 }}>
            <Loader color="primary" />
          </View>
        )}

        {hasJoinedCrews && !loadingUserCrews && <JoinedCrewsView />}

        {!hasJoinedCrews && !loadingUserCrews && <NotJoinedCrews />}
      </S.Container>
    </ScreenWrapper>
  );
};

export default Home;
