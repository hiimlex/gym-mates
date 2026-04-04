import { IItem, SkinSex } from "./ItemsModel";

export interface IShopFilters {
  locked?: boolean;
  price_sort?: "PRICE_ASC" | "PRICE_DESC";
  search?: string;
  sex?: SkinSex;
}

export interface IShopState {
  cart: IItem[];
  filters?: IShopFilters;
  view: IShopListView; // Assuming view can be either 'list' or 'grid'
  cartItemsSum: number;
}

export type IShopListView = "list" | "grid";

export interface IShopListItemsResponse {
  items?: IItem[];
}

export interface IShopBuyBody {
  cart: string[]; // Array of item IDs
}
