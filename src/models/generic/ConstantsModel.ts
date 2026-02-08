import { BlurViewProps } from "expo-blur";
import { Platform } from "react-native";

export const AccessTokenKey = "access_token";
export const SkipSetupHealthKey = "skip_setup_health";
export const SkipSetupAvatarKey = "skip_setup_avatar";

// export const BackendIp = "http://localhost:8383";
export const BackendIp = "http://192.168.0.120:8383";
export const PersistedStateKey = "persisted_state";
export const PersistedLanguageKey = "persisted_language";
export const BackendImageMulterKey = "image";
export const ZIndex = {
  Dialog: 1000,
  ItemPreview: 1000,
  WorkoutImageViewer: 1000,
  UserSelectTitle: 1000,
  Notifier: 1001,
  Camera: 1001,
};

export const BlurIntensity = Platform.OS === "ios" ? 15 : 8;

export const BlurProps: BlurViewProps = {
  intensity: BlurIntensity,
  blurReductionFactor: 0.8,
  experimentalBlurMethod: "dimezisBlurView",
};

export const Languages = {
  English: "en-US",
  PortugueseBrazil: "pt-BR",
};
