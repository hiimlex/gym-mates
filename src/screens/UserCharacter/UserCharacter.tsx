import { Typography } from "@components/atoms";
import { ScreenWrapper } from "@components/molecules";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import React from "react";
import { View } from "react-native";

const UserCharacter: React.FC<ScreenProps<AppRoutes.UserCharacter>> = ({
  navigation,
}) => {
  return (
    <ScreenWrapper useHeaderHeight>
      <Typography.Body>Hello</Typography.Body>
    </ScreenWrapper>
  );
};

export default UserCharacter;
