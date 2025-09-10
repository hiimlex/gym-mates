import api from "@api/api";
import { IListMissionsResponse } from "@models/collections";
import { Endpoints } from "@models/generic";
import { AxiosResponse } from "axios";

const list = async (): Promise<AxiosResponse<IListMissionsResponse>> => {
  const res = await api.get(Endpoints.Missions);

  return res;
};

export default {
  list,
}
