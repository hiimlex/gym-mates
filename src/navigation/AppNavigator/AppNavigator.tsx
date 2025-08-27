import { CrewViewActions, UserViewActions } from "@components/molecules";
import { navigationRef } from "@hooks/useNavigationContainer/useNavigationContainer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CrewViewScreen,
  CrewViewScreenOptions,
  CrewsScreen,
  CrewsScreenOptions,
  EditProfileScreen,
  EditProfileScreenOptions,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  ProfileScreenOptions,
  SetupAvatarScreen,
  SetupHealthScreen,
  ShopCartScreen,
  ShopCartScreenOptions,
  ShopScreen,
  ShopScreenOptions,
  SignUpScreen,
  UserFollowsScreen,
  UserFollowsScreenOptions,
  UserInventoryScreen,
  UserInventoryScreenOptions,
  UserJourneyScreen,
  UserJourneyScreenOptions,
  UserViewScreen,
  UserViewScreenOptions,
} from "@screens";
import { StoreState } from "@store/Store";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../../components/atoms";
import { Header } from "../../components/molecules";
import { AppRoutes, TRootStackParamList } from "../appRoutes";

const Stack = createNativeStackNavigator<TRootStackParamList>();

const AppNavigator: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, isAuthenticated } = useSelector(
    (state: StoreState) => state.user
  );

  return (
    <NavigationContainer<TRootStackParamList> ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={AppRoutes.Login}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={AppRoutes.Login} component={LoginScreen} />
        <Stack.Screen name={AppRoutes.SignUp} component={SignUpScreen} />
        <Stack.Screen
          name={AppRoutes.SetupAvatar}
          component={SetupAvatarScreen}
        />
        <Stack.Screen
          name={AppRoutes.SetupHealth}
          component={SetupHealthScreen}
        />

        {isAuthenticated && user && (
          <>
            <Stack.Screen
              name={AppRoutes.Home}
              component={HomeScreen}
              initialParams={{ showBottomNav: true }}
              options={{
                animation: "slide_from_left",
              }}
            />
            <Stack.Screen
              name={AppRoutes.Crews}
              component={CrewsScreen}
              initialParams={{ showBottomNav: true }}
              options={CrewsScreenOptions}
            />

            <Stack.Screen
              name={AppRoutes.CrewView}
              component={CrewViewScreen}
              options={CrewViewScreenOptions}
            />

            <Stack.Screen
              name={AppRoutes.Profile}
              component={ProfileScreen}
              options={ProfileScreenOptions}
            />

            <Stack.Screen
              name={AppRoutes.UserJourney}
              component={UserJourneyScreen}
              options={UserJourneyScreenOptions}
            />

            <Stack.Screen
              name={AppRoutes.UserView}
              component={UserViewScreen}
              options={UserViewScreenOptions}
            />

            <Stack.Screen
              name={AppRoutes.EditProfile}
              component={EditProfileScreen}
              options={EditProfileScreenOptions}
            />
            <Stack.Screen
              name={AppRoutes.Shop}
              component={ShopScreen}
              options={ShopScreenOptions}
            />

            <Stack.Screen
              name={AppRoutes.ShopCart}
              component={ShopCartScreen}
              options={ShopCartScreenOptions}
            />

            <Stack.Screen
              name={AppRoutes.UserInventory}
              component={UserInventoryScreen}
              options={UserInventoryScreenOptions}
            />

            <Stack.Screen
              name={AppRoutes.UserFollows}
              component={UserFollowsScreen}
              options={UserFollowsScreenOptions}
            />
          </>
        )}
      </Stack.Navigator>
      {/* Children that need to be inner NavigationContainer */}
      {children}
    </NavigationContainer>
  );
};

export default AppNavigator;
