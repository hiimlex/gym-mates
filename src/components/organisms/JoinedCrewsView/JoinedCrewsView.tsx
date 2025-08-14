import { useDialogService } from "@hooks/useDialogService/useDialogService";
import { Colors } from "@theme";
import React from "react";
import { View } from "react-native";
import { Heart, PlusCircle, Users } from "react-native-feather";
import { Menu, Typography } from "../../atoms";
import { FollowingActivities, MyStats, WeekWorkouts } from "../../molecules";

interface JoinedCrewsViewProps {
  children?: React.ReactNode;
}

const JoinedCrewsView: React.FC<JoinedCrewsViewProps> = ({ children }) => {
  const { openAddWorkout, openCreateCrew, openJoinCrew } = useDialogService();

  return (
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
      <FollowingActivities />
    </>
  );
};

export default JoinedCrewsView;
