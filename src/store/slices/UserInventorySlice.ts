import { IGetInventoryFilters, IInventoryState } from "@models/collections";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IInventoryState = {
  filters: undefined,
};

const UserInventorySlice = createSlice({
  name: "userInventory",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<IGetInventoryFilters>>
    ) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },
});

export const UserInventoryActions = UserInventorySlice.actions;
export default UserInventorySlice.reducer;
