import { UsersService } from "@api/services";
import { Avatar, Row, Typography } from "@components/atoms";
import { ScreenWrapper } from "@components/molecules";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { NotifierActions, UserActions } from "@store/slices";
import { AppDispatch } from "@store/Store";
import { useMutation } from "@tanstack/react-query";
import { getMessageFromError } from "@utils/handleAxiosError";
import { ImagePickerAsset } from "expo-image-picker";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const SetupAvatar: React.FC<ScreenProps<AppRoutes.SetupAvatar>> = ({
  navigation: { navigate, goBack },
}) => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch<AppDispatch>();

  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [avatar, setAvatar] = useState<ImagePickerAsset | null>(null);

  const onAvatarChange = (file: ImagePickerAsset) => {
    if (file.base64) {
      setPreview(`data:image/jpeg;base64,${file.base64}`);
    }

    setAvatar(file);
  };

  const { mutate: updateAvatar, isPending } = useMutation({
    mutationFn: UsersService.updateAvatar,
    onSuccess: async (data) => {
      await dispatch(UserActions.fetchCurrentUser());
      navigate(AppRoutes.SetupHealth);
    },
    onError: (error) => {
      const message = getMessageFromError(error);

      if (message) {
        dispatch(
          NotifierActions.createNotification({
            id: "setup-avatar-error",
            type: "error",
            message,
          }),
        );
      }
    },
  });

  const skip = async () => {
    navigate(AppRoutes.SetupHealth);
  };

  const handleButtonPress = () => {
    if (avatar) {
      updateAvatar(avatar);
    }

    if (!avatar) {
      skip();
    }
  };

  return (
    <ScreenWrapper>
      <Row align="center" justify="space-between">
        <View style={{ gap: 12 }}>
          <Typography.Subtitle _t textColor="textDark">
            {"setupAvatar.title"}
          </Typography.Subtitle>
          <Typography.Body _t textColor="text">
            {"setupAvatar.subtitle"}
          </Typography.Body>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleButtonPress}
          disabled={isPending}
        >
          <Typography.Button textColor="primary" _t>
            {!!avatar ? "setupAvatar.save" : "setupAvatar.skip"}
          </Typography.Button>
        </TouchableOpacity>
      </Row>

      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar preview={preview} onAvatarChange={onAvatarChange} />
      </View>
    </ScreenWrapper>
  );
};

export default SetupAvatar;
