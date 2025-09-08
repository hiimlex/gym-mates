import React, { useRef } from "react";

import { AuthService } from "@api/services";
import { Button, ControlledInput, Typography } from "@components/atoms";
import { ILoginForm } from "@models/collections";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScreenWrapper } from "@components/molecules";
import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { AccessTokenKey, InputRefRecorder } from "@models/generic";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { NotifierActions, UserActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { getMessageFromError } from "@utils/handleAxiosError";
import { useDispatch, useSelector } from "react-redux";
import S from "./Login.styles";
import Masks from "@utils/masks.utils";

const Login: React.FC<ScreenProps<AppRoutes.Login>> = () => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { control, watch, formState, reset } = useForm<ILoginForm>({
    mode: "all",
  });
  const { user } = useSelector((state: StoreState) => state.user);
  const values = watch();
  const dispatch = useDispatch<AppDispatch>();
  const { navigate } = useAppNavigation();
  const fieldsRef: InputRefRecorder<ILoginForm> = {
    email: useRef(null),
    password: useRef(null),
  };

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: AuthService.login,
    onSuccess: async (data) => {
      await AsyncStorage.setItem(AccessTokenKey, data.data.access_token);
      await dispatch(UserActions.fetchCurrentUser());

      // Register device for push notifications
      // const tokenData = await getPushToken();

      // console.log("tokenData", tokenData);
      // if (tokenData) {
      //   await UsersService.registerDevice(tokenData);
      // }

      navigate(AppRoutes.Home);

      fieldsRef.email.current?.focus();
      reset();
    },
    onError: (error) => {
      const message = getMessageFromError(error);

      if (message) {
        dispatch(
          NotifierActions.createNotification({
            id: "login-error",
            type: "error",
            message,
          })
        );
      }
    },
  });

  const handleLoginSubmit = () => {
    if (formState.isValid) {
      loginUser({ ...values });
    }
  };

  return (
    <ScreenWrapper>
      <S.Container
        style={{ paddingTop: insets.top + 60, paddingHorizontal: 24, gap: 24 }}
      >
        <View style={{ gap: 12 }}>
          <Typography.Subtitle _t textColor="textDark">
            {"login.title"}
          </Typography.Subtitle>
          <Typography.Body _t textColor="text">
            {"login.subtitle"}
          </Typography.Body>
        </View>
        <ControlledInput
          control={control}
          name="email"
          label="login.email"
          placeholder="login.email"
          rules={{ required: true }}
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          inputRef={fieldsRef.email}
          maskFn={(e) => Masks.email(e)}
          onSubmitEditing={() => {
            fieldsRef.password.current?.focus();
          }}
        />

        <ControlledInput
          control={control}
          name="password"
          label="login.password"
          placeholder="login.password"
          rules={{ required: true }}
          secureTextEntry
          textContentType="password"
          returnKeyType="done"
          inputRef={fieldsRef.password}
          onSubmitEditing={handleLoginSubmit}
        />

        <Button
          title="login.title"
          disabled={!formState.isValid}
          loading={isPending}
          onPress={handleLoginSubmit}
        />

        <S.FloatLinkWrapper
          style={{
            paddingBottom: insets.bottom + 12,
            width: width,
          }}
        >
          <Typography.Caption _t textColor="textLight">
            {"login.link"}
          </Typography.Caption>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigate(AppRoutes.SignUp)}
          >
            <Typography.Button _t textColor="primary">
              {"login.signUp"}
            </Typography.Button>
          </TouchableOpacity>
        </S.FloatLinkWrapper>
      </S.Container>
    </ScreenWrapper>
  );
};

export default Login;
