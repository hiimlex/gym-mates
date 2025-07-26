import React from "react";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import S from "./styles";
import { Button as NativeButton } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Input, Typography } from "@components/atoms";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <S.Container
      style={{ paddingTop: insets.top + 60, paddingHorizontal: 24, gap: 24 }}
    >
      <View style={{ gap: 12 }}>
        <Typography.Subtitle translate textColor="textDark">
          {"login.title"}
        </Typography.Subtitle>
        <Typography.Body translate textColor="text">
          {"login.subtitle"}
        </Typography.Body>
      </View>
      <Input placeholder="login.email" label="login.email" />
      <Input placeholder="login.password" label="login.password" />
      <Button title="login.title" />

      <S.FloatLinkWrapper
        style={{
          paddingBottom: insets.bottom,
          width: width,
        }}
      >
        <Typography.Caption translate textColor="textLight">
          {"login.link"}
        </Typography.Caption>
        <TouchableOpacity>
          <Typography.Button translate textColor="primary">
            {"login.signUp"}
          </Typography.Button>
        </TouchableOpacity>
      </S.FloatLinkWrapper>
    </S.Container>
  );
};

export default Login;
