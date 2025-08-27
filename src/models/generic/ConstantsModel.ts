import { BlurViewProps } from "expo-blur";
import { Platform } from "react-native";

export const AccessTokenKey = "access_token";
export const SkipSetupHealthKey = "skip_setup_health";
export const SkipSetupAvatarKey = "skip_setup_avatar";

export const BackendIp = "http://192.168.0.10:8383";
export const PersistedStateKey = "persisted_state";
export const BackendImageMulterKey = "image";
export enum ZIndex {
  Notifier = 1000,
}

export const BlurIntensity = Platform.OS === "ios" ? 15 : 8;

export const BlurProps: BlurViewProps = {
  intensity: BlurIntensity,
  blurReductionFactor: 0.8,
  experimentalBlurMethod: "dimezisBlurView",
};
