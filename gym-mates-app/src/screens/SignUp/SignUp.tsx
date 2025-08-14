import { AuthService } from "@api/services";
import { Button, Input, Typography } from "@components/atoms";
import { ScreenWrapper } from "@components/molecules";
import { ISignUpForm } from "@models/collections";
import { AccessTokenKey, InputRefRecorder } from "@models/generic";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "@store/Store";
import { UserActions } from "@store/slices";
import { useMutation } from "@tanstack/react-query";
import React, { RefObject, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import S from "./SignUp.styles";

const SignUp: React.FC<ScreenProps<AppRoutes.SignUp>> = ({
  navigation: { navigate, goBack },
}) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const scrollRef = useRef<ScrollView>(null);
  const { control, formState, getValues, reset } = useForm<ISignUpForm>({
    mode: "all",
  });
  const fieldsRef: InputRefRecorder<ISignUpForm> = {
    name: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  const dispatch = useDispatch<AppDispatch>();

  const { mutate: signUpUser, isPending } = useMutation({
    mutationFn: AuthService.signUp,
    onSuccess: async (data) => {
      reset();
      await AsyncStorage.setItem(AccessTokenKey, data.data.access_token);
      await dispatch(UserActions.fetchCurrentUser());
      navigate(AppRoutes.SetupAvatar);
    },
    onError: (error) => {
      console.error("Error signing up:", error);
    },
  });

  const handleSignSubmit = () => {
    if (formState.isValid) {
      const values = getValues();
      signUpUser(values);
    }
  };

  const scrollToFieldRef = (ref: RefObject<TextInput | null>) => {
    if (ref.current) {
      ref.current.measureInWindow((x, y, width, height) => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            y: y - height,
            animated: true,
          });
        }
      });
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <S.Container
          contentContainerStyle={{
            padding: 24,
            paddingTop: insets.top + 60,
            gap: 24,
          }}
          ref={scrollRef}
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
                inputRef={fieldsRef.name}
                inputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  value: value,
                  returnKeyType: "next",
                  onSubmitEditing: () => {
                    fieldsRef.email.current?.focus();
                  },
                  onFocus: () => scrollToFieldRef(fieldsRef.name),
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
                inputRef={fieldsRef.email}
                inputProps={{
                  textContentType: "emailAddress",
                  keyboardType: "email-address",
                  value: value,
                  returnKeyType: "next",
                  onSubmitEditing: () => {
                    fieldsRef.password.current?.focus();
                  },
                  onFocus: () => scrollToFieldRef(fieldsRef.email),
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
                inputRef={fieldsRef.password}
                inputProps={{
                  secureTextEntry: true,
                  value: value,
                  returnKeyType: "next",
                  onSubmitEditing: () => {
                    fieldsRef.confirmPassword.current?.focus();
                  },
                  onFocus: () => scrollToFieldRef(fieldsRef.password),
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
                inputRef={fieldsRef.confirmPassword}
                inputProps={{
                  secureTextEntry: true,
                  value: value,
                  onSubmitEditing: handleSignSubmit,
                  onFocus: () => scrollToFieldRef(fieldsRef.confirmPassword),
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
        </S.Container>
      </KeyboardAvoidingView>

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
    </ScreenWrapper>
  );
};

export default SignUp;
