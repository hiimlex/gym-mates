import { UserActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/store";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../atoms";
import S from "./styles";
import { useAppNavigation } from "@hooks";
import { AppRoutes } from "@navigation/appRoutes";
import { useWindowDimensions } from "react-native";
import { SkipSetupAvatarKey, SkipSetupHealthKey } from "@models/generic";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PersistedData: React.FC = () => {
  const { user, loadingCurrentUser, isAuthenticated } = useSelector(
    (state: StoreState) => state.user
  );
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useAppNavigation();

  const handlePersistedUser = useCallback(async () => {
    await dispatch(UserActions.fetchCurrentUser());
  }, []);

  useEffect(() => {
    handlePersistedUser();
  }, [handlePersistedUser]);

  const navigateTo = async () => {
    if (!loadingCurrentUser && isAuthenticated && user) {
      const skipSetupAvatar = await AsyncStorage.getItem(SkipSetupAvatarKey);
      const skipSetupHealth = await AsyncStorage.getItem(SkipSetupHealthKey);

      const skipAvatar = skipSetupAvatar === "true" || !!user.avatar;
      const skipHealth = skipSetupHealth === "true" || !!user.healthy;

      if (!skipAvatar) {
        navigation.navigate(AppRoutes.SetupAvatar);
        return;
      }

      if (!skipHealth) {
        navigation.navigate(AppRoutes.SetupHealth);
        return;
      }

      navigation.navigate(AppRoutes.Home);
    }
  };

  useEffect(() => {
    navigateTo();
  }, [loadingCurrentUser, user, isAuthenticated]);

  return (
    loadingCurrentUser && (
      <S.Container style={{ width, height }} intensity={15}>
        <Loader color="primary" />
      </S.Container>
    )
  );
};

export default PersistedData;
