import { CrewsService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Loader, Menu, Typography } from "@components/atoms";
import {
  Header,
  MyStats,
  ScreenWrapper,
  WeekWorkouts,
} from "@components/molecules";
import { NotJoinedCrews } from "@components/organisms";
import { ICrewsByMember } from "@models/collections";
import { AppRoutes, TRootStackParamList } from "@navigation/appRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ConfigActions, CrewsActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/store";
import { Colors } from "@theme";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Heart, PlusCircle, Users } from "react-native-feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import S from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { useDialogService } from "@hooks";

const Home: React.FC<
  NativeStackScreenProps<TRootStackParamList, AppRoutes.Home>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useSelector((state: StoreState) => state.user);
  const { crews } = useSelector((state: StoreState) => state.crews);
  const isScreenFocused = useIsFocused();
  const { openAddWorkout, openCreateCrew, openJoinCrew } = useDialogService();

  const dispatch = useDispatch<AppDispatch>();

  const { loading: loadingUserCrews } = useQuery<ICrewsByMember>(
    CrewsService.CrewsByMember,
    {
      variables: { userId: user?._id },
      onCompleted: (data) => {
        const hasJoinedCrews = data.crews.length > 0;
        dispatch(CrewsActions.setCrews(data.crews));

        dispatch(ConfigActions.setHideBottomNav(!hasJoinedCrews));
      },
      onError: (error) => {
        console.error("Error fetching crews:", { ...error });
        dispatch(ConfigActions.setHideBottomNav(true));
      },
      fetchPolicy: "network-only",
    }
  );

  const hasJoinedCrews = useMemo(() => crews.length > 0, [crews]);

  if (!user) {
    return null;
  }

  return (
    <ScreenWrapper>
      <S.Container
        contentContainerStyle={{
          padding: 24,
          gap: 24,
          paddingTop: insets.top + 24,
          flex: 1,
        }}
      >
        <Header.Root justifyContent="space-between">
          <Header.User />
          <Header.Coins />
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

        {hasJoinedCrews && !loadingUserCrews && (
          <>
            <WeekWorkouts />
            <MyStats />
            <View style={{ gap: 12 }}>
              <Typography.Body textColor="textDark" _t>
                {"home.menu.title"}
              </Typography.Body>

              <Menu.Root>
                <Menu.Item
                  label="home.menu.addWorkout"
                  onPress={openAddWorkout}
                  _t
                  icon={
                    <Heart
                      width={20}
                      height={20}
                      fill={Colors.colors.text}
                      stroke={Colors.colors.text}
                      fillOpacity={0.2}
                    />
                  }
                />
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
              </Menu.Root>
            </View>
          </>
        )}

        {!hasJoinedCrews && !loadingUserCrews && <NotJoinedCrews />}
      </S.Container>
    </ScreenWrapper>
  );
};

export default Home;
