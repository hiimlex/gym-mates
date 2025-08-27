import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { useNavigationContainerRef } from "@hooks/useNavigationContainer/useNavigationContainer";
import { AppRoutes } from "@navigation/appRoutes";
import { ConfigActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { Colors } from "@theme";
import { BlurView } from "expo-blur";
import React, { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { LayoutChangeEvent, useWindowDimensions } from "react-native";
import { Home, Users } from "react-native-feather";
import { SlideInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../../atoms";
import S from "./BottomNav.styles";
import { BlurProps } from "@models/generic";

const BottomNav: React.FC = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const { isAuthenticated } = useSelector((state: StoreState) => state.user);
  const insets = useSafeAreaInsets();
  const ref = useRef<BlurView>(null);

  const navigation = useAppNavigation();
  const { currentRoute, startUpdateData, stopUpdateData } =
    useNavigationContainerRef();

  const dispatch = useDispatch<AppDispatch>();

  const { hideBottomNav: configHide } = useSelector(
    (state: StoreState) => state.config
  );

  const hideBottomNav = useMemo(
    () => configHide || !(currentRoute?.params as any)?.showBottomNav,
    [currentRoute, configHide]
  );

  const isActive = (checkRoute: string) => {
    if (!currentRoute) {
      return false;
    }

    return currentRoute.name === checkRoute;
  };

  const onBottomNavLayoutChange = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    dispatch(ConfigActions.setBottomNavHeight(height));
  };

  useEffect(() => {
    startUpdateData();
    return () => {
      stopUpdateData();
    };
  }, []);

  if (hideBottomNav || !isAuthenticated) {
    return null;
  }

  return (
    <S.Float
      ref={ref}
      entering={SlideInDown}
      onLayout={onBottomNavLayoutChange}
      {...BlurProps}
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
