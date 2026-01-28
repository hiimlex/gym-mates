import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { IUserProfileView, ProfileViewStorageKey } from "@models/collections";
import {
  AccessTokenKey,
  BlurProps,
  PersistedLanguageKey,
} from "@models/generic";
import { AppRoutes } from "@navigation/appRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotifierActions, UserActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../atoms";
import S from "./PersistedData.styles";

const PersistedData: React.FC = () => {
  const { user, loadingCurrentUser, isAuthenticated, errorLoadingCurrentUser } =
    useSelector((state: StoreState) => state.user);
  const { width, height } = useWindowDimensions();
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useAppNavigation();
  const { i18n } = useTranslation();

  const handlePersistedUser = async () => {
    const hasAccessToken = await AsyncStorage.getItem(AccessTokenKey);

    if (!hasAccessToken || hasAccessToken === null) {
      navigation.navigate(AppRoutes.Login);
      return;
    }

    await dispatch(UserActions.fetchCurrentUser());
  };

  const handleGetPersistedProfileView = async () => {
    const profileView = await AsyncStorage.getItem(ProfileViewStorageKey);

    if (profileView) {
      dispatch(UserActions.setProfileView(profileView as IUserProfileView));
    }
  };

  const handlePersistedLanguage = async () => {
    const persistedLanguage = await AsyncStorage.getItem(PersistedLanguageKey);
    if (persistedLanguage) {
      i18n.changeLanguage(persistedLanguage);
    }
  };

  useEffect(() => {
    handlePersistedUser();
    handlePersistedLanguage();
  }, []);

  useEffect(() => {
    handleGetPersistedProfileView();

    if (user && isAuthenticated && firstRender) {
      navigation.navigate(AppRoutes.Home);
      setFirstRender(false);
    }
  }, [user]);

  useEffect(() => {
    if (errorLoadingCurrentUser) {
      dispatch(
        NotifierActions.createNotification({
          id: "fetch-current-user-error",
          type: "error",
          message: "errors.FETCH_CURRENT_USER",
        }),
      );
    }
  }, [errorLoadingCurrentUser]);

  return (
    loadingCurrentUser &&
    firstRender && (
      <S.Container style={{ width, height }} {...BlurProps}>
        <Loader color="primary" />
      </S.Container>
    )
  );
};

export default PersistedData;
