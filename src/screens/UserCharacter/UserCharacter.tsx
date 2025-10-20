import { CharCreationUi } from "@components/molecules";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import React from "react";

const UserCharacter: React.FC<ScreenProps<AppRoutes.UserCharacter>> = ({
  navigation,
}) => {
  return <CharCreationUi />;
};

export default UserCharacter;
