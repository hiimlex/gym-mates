import { Avatar, Row, Typography } from "@components/atoms";
import { ScreenWrapper } from "@components/molecules";
import { SkipSetupAvatarKey } from "@models/generic";
import { AppRoutes, ScreenProps, TRootStackParamList } from "@navigation/appRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppDispatch } from "@store/Store";
import { Colors } from "@theme";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { User } from "react-native-feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import S from "./SetupAvatar.styles";
import { Asset } from "react-native-image-picker";
import { UsersService } from "@api/services";
import { useMutation } from "@tanstack/react-query";
import { UserActions } from "@store/slices";

const SetupAvatar: React.FC<
  ScreenProps<AppRoutes.SetupAvatar>
> = ({ navigation: { navigate, goBack } }) => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch<AppDispatch>();

  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [avatar, setAvatar] = useState<Asset | null>(null);

  const onAvatarChange = (file: Asset) => {
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
      console.error("Error signing up:", error);
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
      <S.Container
        style={{
          paddingTop: insets.top + 60,
          paddingHorizontal: 24,
          gap: 24,
          flex: 1,
        }}
      >
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
      </S.Container>
    </ScreenWrapper>
  );
};

export default SetupAvatar;
