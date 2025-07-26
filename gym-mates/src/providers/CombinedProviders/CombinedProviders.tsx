import AppNavigator from "../../navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@emotion/react";
import { Colors } from "../../theme";

const CombinedProviders: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider
        theme={{
          colors: Colors.colors,
        }}
      >
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default CombinedProviders;
