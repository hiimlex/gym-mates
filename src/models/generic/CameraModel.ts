import { ImagePickerAsset } from "expo-image-picker";

export interface CameraState {
  showFullscreen: boolean;
  showPreview: boolean;
  preview?: string;
  asset?: ImagePickerAsset;
}
