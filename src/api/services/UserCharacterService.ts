import api from "@api/api";
import {
  BackendImageMulterKey,
  Endpoints,
  ICreateCharacterPayload,
  IUserCharacter,
} from "@models/generic";

const createUserCharacter = async (
  url: string,
  fileName: string,
  payload: ICreateCharacterPayload
) => {
  const formData = new FormData();
  formData.append(BackendImageMulterKey, {
    uri: url,
    name: fileName,
    type: "image/png",
  } as any);
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value as any);
  });

  const response = await api.post(Endpoints.UsersCreateCharacter, formData);

  return response;
};

const updateUserCharacter = async (
  previewUrl: string,
  fileName: string,
  payload: Partial<ICreateCharacterPayload>
) => {
  const formData = new FormData();
  formData.append(BackendImageMulterKey, {
    uri: previewUrl,
    name: fileName,
    type: "image/png",
  } as any);
  formData.append("body", JSON.stringify(payload));
  const response = await api.put(Endpoints.UsersUpdateCharacter, formData);

  return response;
};

const getUserCharacter = async (): Promise<IUserCharacter> => {
  const response = await api.get(Endpoints.UsersGetCharacter);
  return response.data;
}

export default {
  getUserCharacter,
  createUserCharacter,
  updateUserCharacter,
};
