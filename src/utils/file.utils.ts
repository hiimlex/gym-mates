import { IBuffer } from "@models/collections";
import { ImagePickerAsset } from "expo-image-picker";
import { Platform } from "react-native";

export function assetToBuffer(assets: ImagePickerAsset[]): IBuffer[] {
  const buffers: IBuffer[] = [];

  assets.forEach((asset) => {
    buffers.push({
      name: asset.fileName || "",
      type: asset.type || "",
      uri:
        asset.uri && Platform.OS === "ios"
          ? asset.uri.replace("file://", "")
          : asset.uri || "",
    });
  });

  return buffers;
}

export function mountImageURLFromBase64(base64: string) {
  return `data:image/jpeg;base64,${base64}`;
}
