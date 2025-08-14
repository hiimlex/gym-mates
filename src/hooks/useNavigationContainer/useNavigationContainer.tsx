import { NavigationContainerRef, Route } from "@react-navigation/native";
import { createRef, useState } from "react";
import { TRootStackParamList } from "@navigation/appRoutes";

export const navigationRef =
  createRef<NavigationContainerRef<TRootStackParamList>>();

// This is the function you want, it will return the complete navigation state
function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute();
}

function getCurrentOptions() {
  return navigationRef.current?.getCurrentOptions();
}

export function useNavigationContainerRef(): {
  currentRoute?: Route<string>;
  currentOptions?: object;
  startUpdateData: () => void;
  stopUpdateData: () => void;
} {
  const [intervalId, setIntervalId] = useState<any | null>(null);
  const [currentRoute, setCurrentRoute] = useState(getCurrentRoute());
  const [currentOptions, setCurrentOptions] = useState(getCurrentOptions());

  const startUpdateData = () => {
    const intervalId = setInterval(() => {
      setCurrentRoute(getCurrentRoute());
      setCurrentOptions(getCurrentOptions());
    }, 100);
    setIntervalId(intervalId);
  };

  const stopUpdateData = () => {
    clearInterval(intervalId);
  };

  return {
    currentRoute,
    currentOptions,
    startUpdateData,
    stopUpdateData,
  };
}
