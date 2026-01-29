import { AuthService } from "@api/services";
import { Button, ControlledInput, Input, Typography } from "@components/atoms";
import { ScreenWrapper } from "@components/molecules";
import { useNotifier } from "@hooks/useNotifier";
import { ISignUpForm } from "@models/collections";
import { AccessTokenKey, InputRefRecorder } from "@models/generic";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "@store/Store";
import { UserActions } from "@store/slices";
import { useMutation } from "@tanstack/react-query";
import { getMessageFromError } from "@utils/handleAxiosError";
import Masks from "@utils/masks.utils";
import { scrollToFieldRef } from "@utils/scrollToFieldRef";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
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
  const [code, setCode] = useState<string>("");
  const [step, setStep] = useState<"code" | "form">("code");
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
  const { notify } = useNotifier();

  const { mutate: signUpUser, isPending } = useMutation({
    mutationFn: async () => await AuthService.signUp(getValues(), code),
    onSuccess: async (data) => {
      reset();
      await AsyncStorage.setItem(AccessTokenKey, data.data.access_token);
      await dispatch(UserActions.fetchCurrentUser());
      navigate(AppRoutes.SetupAvatar);
    },
    onError: (error) => {
      const message = getMessageFromError(error);

      if (message) {
        notify({
          id: "sign-up-error",
          type: "error",
          message,
        });
      }
    },
  });

  const { mutate: validateCode, isPending: isValidatingCode } = useMutation({
    mutationFn: async () => await AuthService.validateInviteCode(code),
    onSuccess: async (data) => {
      setStep("form");
    },
    onError: (error) => {
      const message = getMessageFromError(error);

      if (message) {
        notify({
          id: "validate-code-error",
          type: "error",
          message,
        });
      }
    },
  });

  const handleSignSubmit = () => {
    if (formState.isValid) {
      signUpUser();
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <S.Container
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
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

          {step === "code" && (
            <>
              <S.Group>
                <Typography.Body _t textColor="text">
                  {"signup.enterCode"}
                </Typography.Body>
                <Input
                  placeholder="signup.enterCodePlaceholder"
                  onChangeText={(text) => {
                    const newText = text.toLocaleUpperCase().substring(0, 6);
                    setCode(newText);
                  }}
                  value={code}
                />
              </S.Group>
              <Button
                title="signup.validate"
                loading={isValidatingCode}
                disabled={!code || code.length < 6}
                onPress={validateCode}
              />
            </>
          )}

          {step === "form" && (
            <>
              <ControlledInput
                control={control}
                name="name"
                placeholder="signup.fields.name"
                label="signup.fields.name"
                inputRef={fieldsRef.name}
                onFocus={() => scrollToFieldRef(fieldsRef.name, scrollRef)}
                rules={{ required: true }}
                keyboardType="default"
                textContentType="name"
                returnKeyType="next"
                onSubmitEditing={() => {
                  fieldsRef.email.current?.focus();
                }}
                showErrorMessage
                onChangeText={(text) => {}}
              />

              <ControlledInput
                control={control}
                name="email"
                placeholder="signup.fields.email"
                label="signup.fields.email"
                inputRef={fieldsRef.email}
                onFocus={() => scrollToFieldRef(fieldsRef.email, scrollRef)}
                rules={{ required: true }}
                keyboardType="email-address"
                textContentType="emailAddress"
                returnKeyType="next"
                onSubmitEditing={() => {
                  fieldsRef.password.current?.focus();
                }}
                maskFn={Masks.email}
                showErrorMessage
              />

              <ControlledInput
                control={control}
                name="password"
                placeholder="signup.fields.password"
                label="signup.fields.password"
                inputRef={fieldsRef.password}
                onFocus={() => scrollToFieldRef(fieldsRef.password, scrollRef)}
                rules={{ required: true }}
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  fieldsRef.confirmPassword.current?.focus();
                }}
                showErrorMessage
              />

              <ControlledInput
                control={control}
                name="confirmPassword"
                placeholder="signup.fields.confirmPassword"
                label="signup.fields.confirmPassword"
                inputRef={fieldsRef.confirmPassword}
                onFocus={() =>
                  scrollToFieldRef(fieldsRef.confirmPassword, scrollRef)
                }
                rules={{
                  required: true,
                  validate: (value, formValues) =>
                    value === formValues.password ||
                    "fieldErrors.passwordMatch",
                }}
              />

              <Button
                title="signup.sign"
                loading={isPending}
                onPress={handleSignSubmit}
                disabled={!formState.isValid}
              />
            </>
          )}
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
