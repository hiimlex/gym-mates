import {
  IItem,
  IShopFilters,
  IShopListView,
  IShopState,
} from "@models/collections";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IShopState = {
  cart: [],
  filters: undefined,
  view: "grid", // Default view can be "grid" or "list"
  cartItemsSum: 0,
};

const ShopSlice = createSlice({
  name: "shop",
  initialState: initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<IShopFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addItemToCard: (state, action: PayloadAction<IItem>) => {
      state.cart.push(action.payload);
      state.cartItemsSum = state.cart.reduce((sum, item) => sum + item.price, 0);
    },
    removeItemFromCart: (state, action: PayloadAction<IItem>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
      state.cartItemsSum = state.cart.reduce((sum, item) => sum + item.price, 0);
    },
    setView: (state, action: PayloadAction<IShopListView>) => {
      state.view = action.payload;
    },
    reset: (state) => {
      state.cart = [];
      state.cartItemsSum = 0;
    }
  },
});

export const ShopActions = ShopSlice.actions;
export default ShopSlice.reducer;
