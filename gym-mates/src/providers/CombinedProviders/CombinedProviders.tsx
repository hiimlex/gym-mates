import { ThemeProvider } from "@emotion/react";
import { store } from "@store/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StoreProvider } from "react-redux";
import AppNavigator from "../../navigation";
import { Colors } from "../../theme";

import { client } from "@api/apollo";
import { ApolloProvider } from "@apollo/client";

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
              <AppNavigator />
            </ThemeProvider>
          </ApolloProvider>
        </QueryClientProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default CombinedProviders;
