import AppNavigator from "../../navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@emotion/react";
import { Colors } from "../../theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as StoreProvider } from "react-redux";
import { store } from "@store/store";
import PersistedData from "../PersistedData/PersistedData";

const queryClient = new QueryClient();

const CombinedProviders: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider
        theme={{
          colors: Colors.colors,
        }}
      >
        <StoreProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <PersistedData />
            <AppNavigator />
          </QueryClientProvider>
        </StoreProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default CombinedProviders;
