import { IBuffer } from "@models/collections";
import { Platform } from "react-native";
import { Asset } from "react-native-image-picker";

export function assetToBuffer(assets: Asset[]): IBuffer[] {
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

export function mountImageURLFromBase64(
  base64: string
) {
  return `data:image/jpeg;base64,${base64}`
}