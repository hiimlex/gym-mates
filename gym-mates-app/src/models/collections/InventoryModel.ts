import { IItem, ItemCategory } from "./ItemsModel";

export interface IGetInventoryResponse {
  journeyById: {
    inventory: {
      item: IItem;
      owned_at: string;
    }[];
  };
}

export interface IGetInventoryFilters {
  journeyId?: string;
  category?: ItemCategory;
  search?: string;
}

export interface IInventoryState {
  filters?: IGetInventoryFilters;
}