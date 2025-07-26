import { CombinedProviders } from "./src/providers";
import "./src/i18n/i18n";

import { enableScreens } from "react-native-screens";

enableScreens();

export default function App() {
  return <CombinedProviders />;
}
