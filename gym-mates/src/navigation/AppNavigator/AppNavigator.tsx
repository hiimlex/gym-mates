import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StoreState } from "@store/store";
import { useMemo } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { Loader, ScreenWrapper } from "../../components";
import { HomeScreen, LoginScreen } from "@screens";
import { AppRoutes } from "../appRoutes";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, loadingCurrentUser, isAuthenticated } = useSelector(
    (state: StoreState) => state.user
  );

  const initialRouteName = useMemo(() => {
    if (isAuthenticated) {
      return AppRoutes.Home;
    }

    return AppRoutes.Login;
  }, [isAuthenticated, user]);

  if (loadingCurrentUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loader color="primary" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={AppRoutes.Login}>
          {() => <ScreenWrapper children={<LoginScreen />} />}
        </Stack.Screen>
        <Stack.Screen name={AppRoutes.Home}>
          {() => <ScreenWrapper children={<HomeScreen />} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
