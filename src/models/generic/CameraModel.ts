import { Asset } from "react-native-image-picker";

export interface CameraState {
  showFullscreen: boolean;
  showPreview: boolean;
  preview?: string;
  asset?: Asset;
}
