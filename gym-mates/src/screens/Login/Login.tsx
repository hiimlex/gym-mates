import React from "react";

import { AuthService } from "@api/services";
import { Button, Input, Typography } from "@components/atoms";
import { ILoginForm } from "@models/collections";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScreenWrapper } from "@components/molecules";
import { useAppNavigation } from "@hooks";
import { AccessTokenKey } from "@models/generic";
import { AppRoutes } from "@navigation/appRoutes";
import { UserActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";
import S from "./styles";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { control, watch, formState } = useForm<ILoginForm>({ mode: "all" });
  const values = watch();
  const { user } = useSelector((state: StoreState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { navigate } = useAppNavigation();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: AuthService.login,
    onSuccess: async (data) => {
      await AsyncStorage.setItem(AccessTokenKey, data.data.access_token);
      await dispatch(UserActions.fetchCurrentUser());
    },
    onError: (error) => {
      console.log("Error logging in:", error);
    },
  });

  const handleLoginSubmit = () => {
    loginUser({ ...values });
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
              inputProps={{
                textContentType: "emailAddress",
                keyboardType: "email-address",
                value: value,
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
              inputProps={{
                secureTextEntry: true,
                textContentType: "password",
                value: value,
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
