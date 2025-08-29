import { UsersService } from "@api/services";
import { Button, Input, Typography } from "@components/atoms";
import { ScreenWrapper } from "@components/molecules";
import { IEditProfileForm } from "@models/collections";
import { InputRefRecorder } from "@models/generic";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { useHeaderHeight } from "@react-navigation/elements";
import { UserActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { useMutation } from "@tanstack/react-query";
import React, { RefObject, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, TextInput } from "react-native";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import S from "./EditProfile.styles";

const EditProfile: React.FC<ScreenProps<AppRoutes.EditProfile>> = ({
  navigation,
}) => {
  const { user } = useSelector((state: StoreState) => state.user);
  const headerHeight = useHeaderHeight();
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
                  onChangeText={onChange}
                  inputRef={fieldsRef.name}
                  value={value}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="off"
                  textContentType="name"
                  returnKeyType="next"
                  onAccessibilityAction={() => {
                    fieldsRef.email.current?.focus();
                  }}
                  onFocus={() => scrollToFieldRef(fieldsRef.name)}
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
                  onChangeText={onChange}
                  inputRef={fieldsRef.email}
                  value={value}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="off"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    fieldsRef.oldPassword.current?.focus();
                  }}
                  onFocus={() => scrollToFieldRef(fieldsRef.email)}
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
                  onChangeText={onChange}
                  inputRef={fieldsRef.oldPassword}
                  value={value}
                  secureTextEntry
                  onFocus={() => scrollToFieldRef(fieldsRef.oldPassword)}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    fieldsRef.newPassword.current?.focus();
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
                  onChangeText={onChange}
                  inputRef={fieldsRef.newPassword}
                  value={value}
                  secureTextEntry
                  onFocus={() => scrollToFieldRef(fieldsRef.newPassword)}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    fieldsRef.newPassword.current?.blur();
                  }}
                />
              )}
            />
          </S.Group>

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
