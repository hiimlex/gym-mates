import api from "@api/api";
import { IUpdateHealthForm } from "@models/collections";
import { Endpoints } from "@models/generic";
import { assetToBuffer } from "@utils/file.utils";
import { Asset } from "react-native-image-picker";

const createHealthy = async (body: IUpdateHealthForm) => {
  const response = await api.post(Endpoints.UsersCreateHealthy, body);

  return response;
};

const updateAvatar = async (file: Asset) => {
  const formData = new FormData();
  formData.append("image", assetToBuffer([file])[0] as any);

  const response = await api.put(Endpoints.UsersUpdateAvatar, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export default {
  createHealthy,
  updateAvatar,
};
