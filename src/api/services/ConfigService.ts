import api from "@api/api";
import { Endpoints, IBaseCharacterAssets } from "@models/generic";

const getBaseCharacterAssets = async (): Promise<{
  resources: IBaseCharacterAssets;
}> => {
  const response = await api.get(Endpoints.ConfigCharacters);

  return response.data;
};

export default {
  getBaseCharacterAssets,
};
