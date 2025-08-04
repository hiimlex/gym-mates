import { ScreenWrapper } from "@components/molecules";
import { AppRoutes, TRootStackParamList } from "@navigation/appRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import S from "./EditProfile.styles";

const EditProfile: React.FC<
  NativeStackScreenProps<TRootStackParamList, AppRoutes.EditProfile>
> = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <S.Container></S.Container>
    </ScreenWrapper>
  );
};

export default EditProfile;
