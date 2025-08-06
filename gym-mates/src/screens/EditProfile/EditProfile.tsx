import { ScreenWrapper } from "@components/molecules";
import {
  AppRoutes,
  ScreenProps,
  TRootStackParamList,
} from "@navigation/appRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { RefObject, useMemo, useRef } from "react";
import { KeyboardAvoidingView, TextInput, View } from "react-native";
import S from "./EditProfile.styles";
import { Controller, useForm } from "react-hook-form";
import {
  ICreateWorkoutForm,
  IEditProfileForm,
  IUpdateHealthForm,
} from "@models/collections";
import { Button, Input, Typography } from "@components/atoms";
import { useHeaderHeight } from "@react-navigation/elements";
import { useTranslation } from "react-i18next";
import { InputRefRecorder } from "@models/generic";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import Masks from "@utils/masks.utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreState } from "@store/Store";
import { useMutation } from "@tanstack/react-query";
import { UsersService } from "@api/services";
import { UserActions } from "@store/slices";

const EditProfile: React.FC<ScreenProps<AppRoutes.EditProfile>> = ({
  navigation,
}) => {
  const { user } = useSelector((state: StoreState) => state.user);
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { t } = useTranslation();
  const {
    control: editControl,
    formState: editState,
    watch,
  } = useForm<IEditProfileForm>({
    mode: "all",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      oldPassword: "",
      newPassword: "",
    },
  });
  const dispatch = useDispatch<AppDispatch>();

  const values = watch();

  const fieldsRef: InputRefRecorder<IEditProfileForm> = {
    name: useRef<TextInput>(null),
    email: useRef<TextInput>(null),
    oldPassword: useRef<TextInput>(null),
    newPassword: useRef<TextInput>(null),
  };

  const scrollToFieldRef = (ref: RefObject<TextInput | null>) => {
    if (ref.current) {
      ref.current.measureInWindow((x, y, width, height) => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            y: y - headerHeight,
            animated: true,
          });
        }
      });
    }
  };

  const scrollRef = useRef<ScrollView>(null);

  const hasChangedEmailOrName = useMemo(() => {
    return values.name !== user?.name || values.email !== user?.email;
  }, [values.name, values.email, user]);

  const hasChangedPassword = useMemo(() => {
    return values.oldPassword && values.newPassword;
  }, [values.oldPassword, values.newPassword]);

  const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationFn: async () => {
      if (!user) return;

      const payload: Partial<IEditProfileForm> = {};

      if (hasChangedEmailOrName) {
        payload.name = values.name;
        payload.email = values.email;
      }

      if (hasChangedPassword) {
        payload.oldPassword = values.oldPassword;
        payload.newPassword = values.newPassword;
      }

      await UsersService.updateProfile(user?._id, payload);
    },
    onSuccess: async () => {
      await dispatch(UserActions.fetchCurrentUser());
    },
  });

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={12}
      >
        <S.Container
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 24,
            gap: 24,
            flexGrow: 1,
            paddingTop: headerHeight + 24,
          }}
        >
          <S.Group>
            <Typography.Body _t>{"editProfile.account"}</Typography.Body>

            <Controller
              control={editControl}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={"editProfile.fields.name"}
                  placeholder={"editProfile.fields.name"}
                  onChange={onChange}
                  inputRef={fieldsRef.name}
                  inputProps={{
                    value,
                    autoCapitalize: "none",
                    autoCorrect: false,
                    autoComplete: undefined,
                    textContentType: "name",
                    returnKeyType: "next",
                    onSubmitEditing: () => {
                      fieldsRef.email.current?.focus();
                    },
                    onFocus: () => scrollToFieldRef(fieldsRef.name),
                  }}
                />
              )}
            />

            <Controller
              control={editControl}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={"editProfile.fields.email"}
                  placeholder={"editProfile.fields.email"}
                  onChange={onChange}
                  inputRef={fieldsRef.email}
                  inputProps={{
                    value,
                    autoCapitalize: "none",
                    autoCorrect: false,
                    autoComplete: undefined,
                    textContentType: "emailAddress",
                    returnKeyType: "next",
                    onSubmitEditing: () => {
                      fieldsRef.oldPassword.current?.focus();
                    },
                    onFocus: () => scrollToFieldRef(fieldsRef.email),
                  }}
                />
              )}
            />

            <Controller
              control={editControl}
              name="oldPassword"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={"editProfile.fields.oldPassword"}
                  placeholder={"editProfile.fields.oldPassword"}
                  onChange={onChange}
                  inputRef={fieldsRef.oldPassword}
                  inputProps={{
                    value,
                    secureTextEntry: true,
                    onFocus: () => scrollToFieldRef(fieldsRef.oldPassword),
                    returnKeyType: "next",
                    onSubmitEditing: () => {
                      fieldsRef.newPassword.current?.focus();
                    },
                  }}
                />
              )}
            />
            <Controller
              control={editControl}
              name="newPassword"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={"editProfile.fields.newPassword"}
                  placeholder={"editProfile.fields.newPassword"}
                  onChange={onChange}
                  inputRef={fieldsRef.newPassword}
                  inputProps={{
                    value,
                    secureTextEntry: true,
                    onFocus: () => scrollToFieldRef(fieldsRef.newPassword),
                    returnKeyType: "done",
                    onSubmitEditing: () => {
                      fieldsRef.newPassword.current?.blur();
                    },
                  }}
                />
              )}
            />
          </S.Group>
          {/* <S.Group>
            <Typography.Body _t>{"editProfile.healthy"}</Typography.Body>

            <Controller
              name="weight"
              control={healthControl}
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
                    onFocus: () => scrollToFieldRef(fieldsRef.weight),
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
              control={healthControl}
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
                    onFocus: () => scrollToFieldRef(fieldsRef.height),
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
              control={healthControl}
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
                    onFocus: () => scrollToFieldRef(fieldsRef.body_fat),
                  }}
                  suffix={
                    <Typography.Caption textColor="textLight">
                      %
                    </Typography.Caption>
                  }
                  onChange={(value) => onChange(Masks.number(value))}
                />
              )}
            />
          </S.Group> */}

          <Button
            title="editProfile.save"
            disabled={!hasChangedEmailOrName && !hasChangedPassword}
            loading={isUpdatingProfile}
            onPress={updateProfile}
          />
        </S.Container>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default EditProfile;
