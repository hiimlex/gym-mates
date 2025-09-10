import { UsersService } from "@api/services";
import { ControlledInput, Input, Row, Typography } from "@components/atoms";
import { ScreenWrapper } from "@components/molecules";
import { IUpdateHealthForm } from "@models/collections";
import { InputRefRecorder, SkipSetupHealthKey } from "@models/generic";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotifierActions, UserActions } from "@store/slices";
import { AppDispatch } from "@store/Store";
import { useMutation } from "@tanstack/react-query";
import { getMessageFromError } from "@utils/handleAxiosError";
import Masks from "@utils/masks.utils";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import S from "./SetupAvatar.styles";

const SetupHealth: React.FC<ScreenProps<AppRoutes.SetupHealth>> = ({
  navigation: { navigate, goBack },
}) => {
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
      const message = getMessageFromError(error);

      if (message) {
        dispatch(
          NotifierActions.createNotification({
            id: "setup-health-error",
            type: "error",
            message,
          })
        );
      }
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

      <ControlledInput
        control={control}
        name="weight"
        rules={{ required: true }}
        placeholder="setupHealth.fields.weight"
        label="setupHealth.fields.weight"
        inputRef={fieldsRef.weight}
        keyboardType="number-pad"
        returnKeyType="next"
        onSubmitEditing={() => {
          fieldsRef.height.current?.focus();
        }}
        suffix={
          <Typography.Caption textColor="textLight">kg</Typography.Caption>
        }
        maskFn={(e) => Masks.maxLength(Masks.number(e), 3)}
      />

      <ControlledInput
        control={control}
        name="height"
        rules={{ required: true }}
        placeholder="setupHealth.fields.height"
        label="setupHealth.fields.height"
        inputRef={fieldsRef.height}
        keyboardType="number-pad"
        returnKeyType="next"
        onSubmitEditing={() => {
          fieldsRef.body_fat.current?.focus();
        }}
        suffix={
          <Typography.Caption textColor="textLight">cm</Typography.Caption>
        }
        maskFn={(e) => Masks.maxLength(Masks.number(e), 3)}
      />

      <ControlledInput
        control={control}
        name="body_fat"
        rules={{ required: true }}
        placeholder="setupHealth.fields.body_fat"
        label="setupHealth.fields.body_fat"
        inputRef={fieldsRef.body_fat}
        keyboardType="number-pad"
        returnKeyType="done"
        onSubmitEditing={() => {
          fieldsRef.body_fat.current?.blur();
        }}
        suffix={
          <Typography.Caption textColor="textLight">%</Typography.Caption>
        }
        maskFn={(e) => Masks.maxLength(Masks.number(e), 3)}
      />
    </ScreenWrapper>
  );
};

export default SetupHealth;
