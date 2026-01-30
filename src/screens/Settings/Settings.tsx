import { ScreenWrapper } from "@components/molecules";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";

import { Menu, Typography } from "@components/atoms";
import { Languages, PersistedLanguageKey } from "@models/generic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCameraPermissions } from "expo-camera";
import { useMediaLibraryPermissions } from "expo-image-picker";
import { useTranslation } from "react-i18next";
import S from "./Settings.styles";

import { Linking, Platform } from "react-native";

const Settings: React.FC<ScreenProps<AppRoutes.Settings>> = ({}) => {
  const { i18n } = useTranslation();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    useMediaLibraryPermissions();

  const handleChangeLanguage = async (language: string) => {
    await AsyncStorage.setItem(PersistedLanguageKey, language);
    i18n.changeLanguage(language);
  };

  const handleOpenAppSettings = () => {
    if (Platform.OS === "android") {
      Linking.openSettings().catch((err) => {
        console.error("An error occurred", err);
      });
      return;
    }

    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:").catch((err) => {
        console.error("An error occurred", err);
      });
      return;
    }
  };

  return (
    <ScreenWrapper useHeaderHeight>
      <S.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 24,
          flexGrow: 1,
        }}
      >
        <S.Group>
          <Typography.Body _t>{"settings.selectLanguage"}</Typography.Body>
          <S.ButtonSwitchContainer>
            <S.ButtonSwitchItem
              active={i18n.language === Languages.English}
              activeOpacity={0.8}
              onPress={() => handleChangeLanguage(Languages.English)}
            >
              <Typography.Button
                _t
                textColor={
                  i18n.language === Languages.English ? "white" : "textLight"
                }
              >
                {"languages.en"}
              </Typography.Button>
            </S.ButtonSwitchItem>
            <S.ButtonSwitchItem
              active={i18n.language === Languages.PortugueseBrazil}
              activeOpacity={0.8}
              onPress={() => handleChangeLanguage(Languages.PortugueseBrazil)}
            >
              <Typography.Button
                _t
                textColor={
                  i18n.language === Languages.PortugueseBrazil
                    ? "white"
                    : "text"
                }
              >
                {"languages.ptBR"}
              </Typography.Button>
            </S.ButtonSwitchItem>
          </S.ButtonSwitchContainer>
        </S.Group>
        <S.Group>
          <Typography.Body _t>{"settings.permissions"}</Typography.Body>
          <Menu.Root>
            <Menu.Item
              label="settings.openAppSettings"
              onPress={handleOpenAppSettings}
              _t
            ></Menu.Item>
            <Menu.Item
              label="settings.cameraPermission"
              onPress={() => {
                if (!cameraPermission?.granted) {
                  requestCameraPermission();
                }
              }}
              _t
              rightIcon={
                <>
                  <Typography.Typography
                    variant={cameraPermission?.granted ? "caption" : "button"}
                    _t
                    textColor={cameraPermission?.granted ? "success" : "danger"}
                  >
                    {cameraPermission?.granted
                      ? "settings.granted"
                      : "settings.request"}
                  </Typography.Typography>
                </>
              }
            ></Menu.Item>
            <Menu.Item
              label="settings.mediaLibraryPermission"
              onPress={() => {
                if (!mediaLibraryPermission?.granted) {
                  requestMediaLibraryPermission();
                }
              }}
              _t
              isLast
              rightIcon={
                <>
                  <Typography.Typography
                    variant={
                      mediaLibraryPermission?.granted ? "caption" : "button"
                    }
                    _t
                    textColor={
                      mediaLibraryPermission?.granted ? "success" : "danger"
                    }
                  >
                    {mediaLibraryPermission?.granted
                      ? "settings.granted"
                      : "settings.request"}
                  </Typography.Typography>
                </>
              }
            ></Menu.Item>
          </Menu.Root>
        </S.Group>
      </S.ScrollView>
    </ScreenWrapper>
  );
};

export default Settings;
