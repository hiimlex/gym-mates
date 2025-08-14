import { UsersService } from "@api/services";
import { Button, Input, Row, Typography } from "@components/atoms";
import { ScreenWrapper } from "@components/molecules";
import { IUpdateHealthForm } from "@models/collections";
import { AppRoutes, ScreenProps, TRootStackParamList } from "@navigation/appRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppDispatch } from "@store/Store";
import { useMutation } from "@tanstack/react-query";
import Masks from "@utils/masks.utils";
import React, { useEffect, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import S from "./SetupAvatar.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InputRefRecorder, SkipSetupHealthKey } from "@models/generic";
import { UserActions } from "@store/slices";

const SetupHealth: React.FC<
  ScreenProps<AppRoutes.SetupHealth>
> = ({ navigation: { navigate, goBack } }) => {
  const insets = useSafeAreaInsets();

  const { control, formState, getValues, reset } = useForm<IUpdateHealthForm>({
    mode: "all",
  });
  const fieldsRef: InputRefRecorder<IUpdateHealthForm> = {
    weight: useRef(null),
    height: useRef(null),
    body_fat: useRef(null),
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    AsyncStorage.getItem(SkipSetupHealthKey).then((value) => {
      if (value === "true") {
        navigate(AppRoutes.Home);
      }
    });
  });

  const { mutate: createHealthy, isPending } = useMutation({
    mutationFn: UsersService.createHealthy,
    onSuccess: async () => {
      await dispatch(UserActions.fetchCurrentUser());
      navigate(AppRoutes.Home);
    },
    onError: (error) => {
      console.error("Error signing up:", error);
    },
  });

  const skip = async () => {
    navigate(AppRoutes.Home);
  };

  const handleButtonPress = () => {
    if (formState.isValid) {
      createHealthy(getValues());
    }

    if (!formState.isValid) {
      skip();
    }
  };

  return (
    <ScreenWrapper>
      <S.Container
        style={{ paddingTop: insets.top + 60, paddingHorizontal: 24, gap: 24 }}
      >
        <Row justify="space-between">
          <View style={{ gap: 12 }}>
            <Typography.Subtitle _t textColor="textDark">
              {"setupHealth.title"}
            </Typography.Subtitle>
            <Typography.Body _t textColor="text">
              {"setupHealth.subtitle"}
            </Typography.Body>
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleButtonPress}
            disabled={isPending}
          >
            <Typography.Button textColor="primary" _t>
              {formState.isValid ? "setupAvatar.save" : "setupAvatar.skip"}
            </Typography.Button>
          </TouchableOpacity>
        </Row>

        <Controller
          name="weight"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="setupHealth.fields.weight"
              label="setupHealth.fields.weight"
              inputRef={fieldsRef.weight}
              inputProps={{
                keyboardType: "number-pad",
                value: value,
                returnKeyType: "next",
                onSubmitEditing: () => {
                  fieldsRef.height.current?.focus();
                },
              }}
              suffix={
                <Typography.Caption textColor="textLight">
                  kg
                </Typography.Caption>
              }
              onChange={(value) => onChange(Masks.number(value))}
            />
          )}
        />

        <Controller
          name="height"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="setupHealth.fields.height"
              label="setupHealth.fields.height"
              inputRef={fieldsRef.height}
              inputProps={{
                keyboardType: "number-pad",
                value: value,
                returnKeyType: "next",
                onSubmitEditing: () => {
                  fieldsRef.body_fat.current?.focus();
                },
              }}
              suffix={
                <Typography.Caption textColor="textLight">
                  cm
                </Typography.Caption>
              }
              onChange={(value) => onChange(Masks.number(value))}
            />
          )}
        />

        <Controller
          name="body_fat"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="setupHealth.fields.body_fat"
              label="setupHealth.fields.body_fat"
              inputRef={fieldsRef.body_fat}
              inputProps={{
                keyboardType: "number-pad",
                value: value,
                returnKeyType: "done",
                onSubmitEditing: () => {
                  fieldsRef.body_fat.current?.blur();
                },
              }}
              suffix={
                <Typography.Caption textColor="textLight">%</Typography.Caption>
              }
              onChange={(value) => onChange(Masks.number(value))}
            />
          )}
        />
      </S.Container>
    </ScreenWrapper>
  );
};

export default SetupHealth;
