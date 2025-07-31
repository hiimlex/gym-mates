import { UserActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/store";
import React, { useCallback, useEffect, useState } from "react";
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
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useAppNavigation();

  const handlePersistedUser = async () => {
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
