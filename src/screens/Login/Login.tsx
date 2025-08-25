import React, { useRef } from "react";

import { AuthService } from "@api/services";
import { Button, Input, Typography } from "@components/atoms";
import { ILoginForm } from "@models/collections";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScreenWrapper } from "@components/molecules";
import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import {
  AccessTokenKey,
  InputRefRecorder,
  SkipSetupAvatarKey,
  SkipSetupHealthKey,
} from "@models/generic";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { NotifierActions, UserActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { useDispatch, useSelector } from "react-redux";
import S from "./Login.styles";
import { getMessageFromError } from "@utils/handleAxiosError";

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
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="login.email"
              label="login.email"
              inputRef={fieldsRef.email}
              inputProps={{
                textContentType: "emailAddress",
                keyboardType: "email-address",
                value: value,
                returnKeyType: "next",
                onSubmitEditing: () => {
                  fieldsRef.password.current?.focus();
                },
              }}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="login.password"
              label="login.password"
              inputRef={fieldsRef.password}
              inputProps={{
                secureTextEntry: true,
                textContentType: "password",
                value: value,
                onSubmitEditing: handleLoginSubmit,
              }}
              onChange={onChange}
            />
          )}
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
