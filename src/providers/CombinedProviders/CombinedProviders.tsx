import { ThemeProvider } from "@emotion/react";
import { store, StoreState } from "@store/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StoreProvider, useSelector } from "react-redux";
import AppNavigator from "../../navigation";
import { Colors } from "../../theme";
import NotifierProvider from "../NotifierProvider/NotifierProvider";

import { client } from "@api/apollo";
import { ApolloProvider } from "@apollo/client";
import {
  BottomNav,
  DialogProvider,
  PersistedData,
} from "@components/molecules";
import OverlayProvider from "../OverlayProvider/OverlayProvider";

const queryClient = new QueryClient();

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
                <OverlayProvider />
                <BottomNav />
                <PersistedData />
                <DialogProvider />
                <NotifierProvider />
              </AppNavigator>
            </ThemeProvider>
          </ApolloProvider>
        </QueryClientProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default CombinedProviders;
