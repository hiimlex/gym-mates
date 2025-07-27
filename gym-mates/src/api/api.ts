import { AccessTokenKey, BackendIp } from "@models/generic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: `${BackendIp}/api/v1`,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  if (config.withCredentials) {
    const token = await AsyncStorage.getItem(AccessTokenKey.toString());

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
