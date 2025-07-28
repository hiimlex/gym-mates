import { UsersService } from "@api/services";
import { Button, Input, Row, Typography } from "@components/atoms";
import { ScreenWrapper } from "@components/molecules";
import { IUpdateHealthForm } from "@models/collections";
import { AppRoutes, TRootStackParamList } from "@navigation/appRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppDispatch } from "@store/store";
import { useMutation } from "@tanstack/react-query";
import Masks from "@utils/masks.utils";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import S from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SkipSetupHealthKey } from "@models/generic";
import { UserActions } from "@store/slices";

const SetupHealth: React.FC<
  NativeStackScreenProps<TRootStackParamList, AppRoutes.SetupHealth>
> = ({ navigation: { navigate, goBack } }) => {
  const insets = useSafeAreaInsets();

  const { control, formState, getValues } = useForm<IUpdateHealthForm>({
    mode: "all",
  });

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
      console.log("Error signing up:", error);
    },
  });

  const skip = async () => {
    await AsyncStorage.setItem(SkipSetupHealthKey, "true");
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

          <TouchableOpacity activeOpacity={0.6} onPress={handleButtonPress} disabled={isPending}>
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
              inputProps={{
                keyboardType: "number-pad",
                value: value,
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
              inputProps={{
                keyboardType: "number-pad",
                value: value,
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
              inputProps={{
                keyboardType: "number-pad",
                value: value,
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
