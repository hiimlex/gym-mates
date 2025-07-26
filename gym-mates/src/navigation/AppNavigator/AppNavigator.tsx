import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../../screens/Login";
import Home from "../../screens/Home";
import { AppRoutes } from "../appRoutes";
import { Colors } from "../../theme";
import { ScreenWrapper } from "../../components";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const initialRouteName = AppRoutes.Login;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={AppRoutes.Login}>
          {() => <ScreenWrapper children={<Login />} />}
        </Stack.Screen>
        <Stack.Screen name={AppRoutes.Home}>
          {() => <ScreenWrapper children={<Home />} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
