import { ThemeProvider } from "@emotion/react";
import { store } from "@store/Store";
import { QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StoreProvider } from "react-redux";
import AppNavigator from "../../navigation";
import { Colors } from "../../theme";
import NotifierProvider from "../NotifierProvider/NotifierProvider";

import { client } from "@api/apollo";
import { ApolloProvider } from "@apollo/client";
import { Camera } from "@components/atoms";
import {
  BottomNav,
  DialogProvider,
  PersistedData,
} from "@components/molecules";
import { queryClient } from "@config/queryClient";
import OverlayProvider from "../OverlayProvider/OverlayProvider";

const CombinedProviders: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={client}>
            <ThemeProvider
              theme={{
                colors: Colors.colors,
              }}
            >
              <AppNavigator>
                <PersistedData />
                <OverlayProvider />
                <DialogProvider />
                <NotifierProvider />
                <Camera.Provider />
                <BottomNav />
              </AppNavigator>
            </ThemeProvider>
          </ApolloProvider>
        </QueryClientProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default CombinedProviders;
