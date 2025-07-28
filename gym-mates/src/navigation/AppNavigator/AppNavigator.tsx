import { navigationRef } from "@hooks";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  SetupAvatarScreen,
  SetupHealthScreen,
  SignUpScreen,
} from "@screens";
import { StoreState } from "@store/store";
import { Colors } from "@theme";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "react-native-feather";
import { useSelector } from "react-redux";
import { BottomNav, Header, Typography } from "../../components";
import { AppRoutes, TRootStackParamList } from "../appRoutes";
import { PersistedData } from "@components/molecules";

const Stack = createNativeStackNavigator<TRootStackParamList>();

const AppNavigator = () => {
  const { user, loadingCurrentUser, isAuthenticated } = useSelector(
    (state: StoreState) => state.user
  );

  const BackLeft = () => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigationRef.current?.goBack()}
    >
      <ArrowLeft
        color={Colors.colors.text}
        width={24}
        height={24}
        stroke={Colors.colors.text}
      />
    </TouchableOpacity>
  );

  return (
    <NavigationContainer<TRootStackParamList> ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={AppRoutes.Login}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={AppRoutes.Login}
          component={LoginScreen}
          initialParams={{ hideBottomNav: true }}
        />
        <Stack.Screen
          name={AppRoutes.SignUp}
          component={SignUpScreen}
          initialParams={{ hideBottomNav: true }}
        />
        <Stack.Screen
          name={AppRoutes.SetupAvatar}
          component={SetupAvatarScreen}
          initialParams={{ hideBottomNav: true }}
        />
        <Stack.Screen
          name={AppRoutes.SetupHealth}
          component={SetupHealthScreen}
          initialParams={{ hideBottomNav: true }}
        />

        {isAuthenticated && user && (
          <>
            <Stack.Screen name={AppRoutes.Home} component={HomeScreen} />
            <Stack.Screen
              name={AppRoutes.Profile}
              component={ProfileScreen}
              initialParams={{ hideBottomNav: true }}
              options={{
                headerShown: true,
                headerTitle: () => (
                  <Typography.HeadingSubtitle
                    textColor="text"
                    fontWeight="semibold"
                    _t
                  >
                    {"links.profile"}
                  </Typography.HeadingSubtitle>
                ),
                headerLeft: BackLeft,
                headerRight: () => <Header.Coins size={10} />,
                headerTransparent: true,
              }}
            />
          </>
        )}
      </Stack.Navigator>

      {isAuthenticated && <BottomNav />}
      <PersistedData />
    </NavigationContainer>
  );
};

export default AppNavigator;
