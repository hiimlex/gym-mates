import { ScreenWrapper } from "@components/molecules";
import React from "react";
import S from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Button, Input, Typography } from "@components/atoms";
import { Controller, useForm } from "react-hook-form";
import { ISignUpForm } from "@models/collections";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRoutes, TRootStackParamList } from "@navigation/appRoutes";
import { AuthService } from "@api/services";
import { useMutation } from "@tanstack/react-query";
import { AccessTokenKey } from "@models/generic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/store";
import { UserActions } from "@store/slices";
import { AxiosError } from "axios";

const SignUp: React.FC<
  NativeStackScreenProps<TRootStackParamList, AppRoutes.SignUp>
> = ({ navigation: { navigate, goBack } }) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const { control, formState, getValues } = useForm<ISignUpForm>({
    mode: "all",
  });
  const dispatch = useDispatch<AppDispatch>();

  const { mutate: signUpUser, isPending } = useMutation({
    mutationFn: AuthService.signUp,
    onSuccess: async (data) => {
      await AsyncStorage.setItem(AccessTokenKey, data.data.access_token);
      await dispatch(UserActions.fetchCurrentUser());
    },
    onError: (error) => {
      console.log("Error signing up:", error);
    },
  });

  const handleSignSubmit = () => {
    const values = getValues();
    signUpUser(values);
  };

  return (
    <ScreenWrapper>
      <S.Container
        style={{ paddingTop: insets.top + 60, paddingHorizontal: 24, gap: 24 }}
      >
        <View style={{ gap: 12 }}>
          <Typography.Subtitle _t textColor="textDark">
            {"signup.title"}
          </Typography.Subtitle>
          <Typography.Body _t textColor="text">
            {"signup.subtitle"}
          </Typography.Body>
        </View>

        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="signup.fields.name"
              label="signup.fields.name"
              inputProps={{
                textContentType: "name",
                keyboardType: "default",
                value: value,
              }}
              onChange={onChange}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="signup.fields.email"
              label="signup.fields.email"
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
              placeholder="signup.fields.password"
              label="signup.fields.password"
              inputProps={{
                secureTextEntry: true,
                value: value,
              }}
              onChange={onChange}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: true,
            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match",
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="signup.fields.confirmPassword"
              label="signup.fields.confirmPassword"
              inputProps={{
                secureTextEntry: true,
                value: value,
              }}
              onChange={onChange}
            />
          )}
        />

        <Button
          title="signup.sign"
          loading={isPending}
          onPress={handleSignSubmit}
          disabled={!formState.isValid}
        />

        <S.FloatLinkWrapper
          style={{
            paddingBottom: insets.bottom + 12,
            width: width,
          }}
        >
          <Typography.Caption _t textColor="textLight">
            {"signup.link"}
          </Typography.Caption>
          <TouchableOpacity activeOpacity={0.6} onPress={goBack}>
            <Typography.Button _t textColor="primary">
              {"signup.login"}
            </Typography.Button>
          </TouchableOpacity>
        </S.FloatLinkWrapper>
      </S.Container>
    </ScreenWrapper>
  );
};

export default SignUp;
