import AppNavigator from "../../navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@emotion/react";
import { Colors } from "../../theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as StoreProvider } from "react-redux";
import { store } from "@store/store";
import PersistedData from "../PersistedData/PersistedData";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BackendIp } from "@models/generic";
import { client } from "@api/apollo";
import { ScreenWrapper } from "@components/molecules";

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
              <PersistedData />
              <AppNavigator />
            </ThemeProvider>
          </ApolloProvider>
        </QueryClientProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default CombinedProviders;
