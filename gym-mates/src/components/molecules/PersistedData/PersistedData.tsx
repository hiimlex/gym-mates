import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { AccessTokenKey } from "@models/generic";
import { AppRoutes } from "@navigation/appRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../atoms";
import S from "./PersistedData.styles";

const PersistedData: React.FC = () => {
  const { user, loadingCurrentUser, isAuthenticated } = useSelector(
    (state: StoreState) => state.user
  );
  const { width, height } = useWindowDimensions();
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useAppNavigation();

  const handlePersistedUser = async () => {
    const hasAccessToken = await AsyncStorage.getItem(AccessTokenKey);

    if (!hasAccessToken || hasAccessToken === null) {
      navigation.navigate(AppRoutes.Login);
      return;
    }

    await dispatch(UserActions.fetchCurrentUser());
  };

  useEffect(() => {
    handlePersistedUser();
  }, []);

  useEffect(() => {
    if (user && isAuthenticated && firstRender) {
      navigation.navigate(AppRoutes.Home);
      setFirstRender(false);
    }
  }, [user]);

  return (
    loadingCurrentUser &&
    firstRender && (
      <S.Container style={{ width, height }} intensity={15}>
        <Loader color="primary" />
      </S.Container>
    )
  );
};

export default PersistedData;
