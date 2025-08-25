import { IDeviceInfo, IDeviceRegistration } from "@models/collections";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function getPushToken(): Promise<IDeviceRegistration | null> {
  console.log("Device.isDevice", Device.isDevice);
  if (!Device.isDevice) return null;

  const { status } = await Notifications.requestPermissionsAsync();
  console.log("Notification permission status", status);
  if (status !== "granted") return null;

  const deviceInfo: IDeviceInfo = {
    os: Platform.OS,
    model: Device.modelName || "unknown",
  };

  console.log("deviceInfo", deviceInfo);
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return { pushToken: token, deviceInfo };
}
