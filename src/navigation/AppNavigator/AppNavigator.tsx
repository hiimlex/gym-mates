import {
  CrewViewActions,
  DialogProvider,
  PersistedData,
  UserViewActions,
} from "@components/molecules";
import { navigationRef } from "@hooks/useNavigationContainer/useNavigationContainer";
import { PersistedStateKey } from "@models/generic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CrewsScreen,
  CrewViewScreen,
  EditProfileScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
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
  UserViewScreen,
} from "@screens";
import { StoreState } from "@store/Store";
import { PropsWithChildren, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../../components/atoms";
import { BottomNav, Header } from "../../components/molecules";
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
              options={{
                headerShown: true,
                headerTransparent: true,
                headerBackVisible: false,
                headerTitle: () => (
                  <Typography.HeadingSubtitle
                    textColor="text"
                    fontWeight="semibold"
                    _t
                  >
                    {"links.crews"}
                  </Typography.HeadingSubtitle>
                ),
                animation: "slide_from_right",
              }}
            />

            <Stack.Screen
              name={AppRoutes.CrewView}
              component={CrewViewScreen}
              options={{
                headerShown: true,
                headerTransparent: true,
                headerLeft: () => <Header.BackLeft />,
                headerTitle: () => (
                  <Typography.HeadingSubtitle
                    textColor="text"
                    fontWeight="semibold"
                    _t
                  >
                    {"links.crew"}
                  </Typography.HeadingSubtitle>
                ),
                headerRight: () => <CrewViewActions />,
              }}
            />

            <Stack.Screen
              name={AppRoutes.Profile}
              component={ProfileScreen}
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
                headerLeft: () => <Header.BackLeft />,
                headerRight: () => <Header.Coins size={10} />,
                headerTransparent: true,
              }}
            />

            <Stack.Screen
              name={AppRoutes.UserJourney}
              component={UserJourneyScreen}
              options={{
                headerShown: true,
                headerTitle: () => (
                  <Typography.HeadingSubtitle
                    textColor="text"
                    fontWeight="semibold"
                    _t
                  >
                    {"links.userJourney"}
                  </Typography.HeadingSubtitle>
                ),
                headerLeft: () => <Header.BackLeft />,
                headerTransparent: true,
              }}
            />

            <Stack.Screen
              name={AppRoutes.UserView}
              component={UserViewScreen}
              options={{
                headerShown: true,
                headerTitle: () => (
                  <Typography.HeadingSubtitle
                    textColor="text"
                    fontWeight="semibold"
                    _t
                  >
                    {"links.user"}
                  </Typography.HeadingSubtitle>
                ),
                headerLeft: () => <Header.BackLeft />,
                headerTransparent: true,
                headerRight: () => <UserViewActions />,
              }}
            />

            <Stack.Screen
              name={AppRoutes.EditProfile}
              component={EditProfileScreen}
              options={{
                headerShown: true,
                headerTitle: () => (
                  <Typography.HeadingSubtitle
                    textColor="text"
                    fontWeight="semibold"
                    _t
                  >
                    {"links.editProfile"}
                  </Typography.HeadingSubtitle>
                ),
                headerLeft: () => <Header.BackLeft />,
                headerTransparent: true,
              }}
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
