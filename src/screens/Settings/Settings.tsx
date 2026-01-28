import { ScreenWrapper } from "@components/molecules";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Typography } from "@components/atoms";
import { Languages, PersistedLanguageKey } from "@models/generic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import S from "./Settings.styles";

const Settings: React.FC<ScreenProps<AppRoutes.Settings>> = ({}) => {
  const insets = useSafeAreaInsets();
  const { i18n } = useTranslation();

  const handleChangeLanguage = async (language: string) => {
    await AsyncStorage.setItem(PersistedLanguageKey, language);
    i18n.changeLanguage(language);
  };

  return (
    <ScreenWrapper useHeaderHeight>
      <S.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 0,
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
        <S.Group></S.Group>
      </S.ScrollView>
    </ScreenWrapper>
  );
};

export default Settings;
