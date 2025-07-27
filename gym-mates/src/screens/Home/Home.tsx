import { CrewsService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Menu, Typography } from "@components/atoms";
import {
  Header,
  MyStats,
  ScreenWrapper,
  WeekWorkouts,
} from "@components/molecules";
import { ICrew, ICrewsByMember } from "@models/collections";
import { AppRoutes, TRootStackParamList } from "@navigation/appRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StoreState } from "@store/store";
import { Colors } from "@theme";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Heart, PlusCircle, Users } from "react-native-feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import S from "./styles";

const Home: React.FC<
  NativeStackScreenProps<TRootStackParamList, AppRoutes.Home>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useSelector((state: StoreState) => state.user);
  const [crews, setCrews] = useState<ICrew[]>([]);

  useQuery<ICrewsByMember>(CrewsService.CrewsByMember, {
    variables: { member: user?._id },
    onCompleted: (data) => {
      setCrews(data.crews);
    },
    onError: (error) => {
      // console.error("Error fetching crews:", { ...error });
    },
  });

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
          <Typography.Body textColor="textLight" _t>
            {"home.subtitle"}
          </Typography.Body>
        </View>

        {hasJoinedCrews && (
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
                  onPress={() => {}}
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
                  onPress={() => {}}
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
                  onPress={() => {}}
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
      </S.Container>
    </ScreenWrapper>
  );
};

export default Home;
