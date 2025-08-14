import api from "@api/api";
import { IShopBuyBody, IShopFilters, IShopListItemsResponse } from "@models/collections";
import { Endpoints } from "@models/generic";
import { queryBuilder } from "@utils/queryBuilder";
import { AxiosResponse } from "axios";

const list = async (
  filters?: IShopFilters
): Promise<AxiosResponse<IShopListItemsResponse>> => {
  const queryString = queryBuilder(filters);
  const response = await api.get(
    Endpoints.ShopListItems + (queryString ? `?${queryString}` : "")
  );
  return response;
};

const buy = async (
  body: IShopBuyBody
): Promise<AxiosResponse<null>> => {
  const response = await api.post(Endpoints.ShopBuy, body);
  return response;
};

export default {
  list,
  buy,
};
