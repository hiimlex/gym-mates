import { Typography } from "@components/atoms";
import { Colors } from "@theme";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useWindowDimensions } from "react-native";
import { Home, Users } from "react-native-feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import S from "./styles";
import { useAppNavigation, useNavigationContainerRef } from "@hooks";
import { AppRoutes } from "@navigation/appRoutes";

const BottomNav: React.FC = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const insets = useSafeAreaInsets();

  const navigation = useAppNavigation();
  const { currentRoute, startUpdateData, stopUpdateData } =
    useNavigationContainerRef();

  const hideBottomNav = useMemo(
    () => (currentRoute?.params as any)?.hideBottomNav,
    [currentRoute]
  );

  const isActive = (checkRoute: string) => {
    if (!currentRoute) {
      return false;
    }

    return currentRoute.name === checkRoute;
  };

  useEffect(() => {
    startUpdateData();
    return () => {
      stopUpdateData();
    };
  }, []);

  if (hideBottomNav) {
    return null;
  }

  return (
    <S.Float
      intensity={10}
      style={{ width, bottom: 0, padding: 12, paddingBottom: insets.bottom }}
    >
      <S.Item
        activeOpacity={0.6}
        isActive={isActive(AppRoutes.Home)}
        onPress={() => navigation.navigate(AppRoutes.Home)}
      >
        <Home
          width={24}
          height={24}
          fill={
            isActive(AppRoutes.Home)
              ? Colors.colors.text
              : Colors.colors.textLight
          }
          fillOpacity={0.2}
          stroke={
            isActive(AppRoutes.Home)
              ? Colors.colors.text
              : Colors.colors.textLight
          }
        />
        <Typography.Caption
          textColor={isActive(AppRoutes.Home) ? "text" : "textLight"}
          _t
        >
          {"bottomNav.home"}
        </Typography.Caption>
      </S.Item>
      <S.Item
        activeOpacity={0.6}
        isActive={isActive(AppRoutes.Crews)}
        onPress={() => navigation.navigate(AppRoutes.Crews)}
      >
        <Users
          width={24}
          height={24}
          fill={
            isActive(AppRoutes.Crews)
              ? Colors.colors.text
              : Colors.colors.textLight
          }
          stroke={
            isActive(AppRoutes.Crews)
              ? Colors.colors.text
              : Colors.colors.textLight
          }
          fillOpacity={0.2}
        />
        <Typography.Caption
          textColor={isActive(AppRoutes.Crews) ? "text" : "textLight"}
          _t
        >
          {"bottomNav.crews"}
        </Typography.Caption>
      </S.Item>
    </S.Float>
  );
};

export default BottomNav;
